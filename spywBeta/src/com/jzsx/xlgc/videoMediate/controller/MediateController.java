package com.jzsx.xlgc.videoMediate.controller;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.Duration;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.chainsaw.Main;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Strings;
import com.huawei.esdk.tp.professional.local.bean.ConferenceInfoEx;
import com.jzsx.xlgc.area.Dao.AreaDao;
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.DataByCode;
import com.jzsx.xlgc.bean.TMediatePerson;
import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.bean.TVideoMediate;
import com.jzsx.xlgc.resSmutils.service.ConferenceService;
import com.jzsx.xlgc.resSmutils.service.resService;
import com.jzsx.xlgc.utils.Application;
import com.jzsx.xlgc.utils.ConferenceTemplate;
import com.jzsx.xlgc.utils.ExportExcel;
import com.jzsx.xlgc.utils.IDUtils;
import com.jzsx.xlgc.utils.ReadExcel;
import com.jzsx.xlgc.utils.Result;
import com.jzsx.xlgc.utils.ResultMessage;
import com.jzsx.xlgc.utils.SessionUtil;
import com.jzsx.xlgc.videoMediate.service.MediateService;
import com.zte.ccs.os.meeting.util.JsonUtil;
import com.zte.ccs.os.meeting.util.RandomUtil;

@Controller
@RequestMapping("/mediate")
public class MediateController {

	@Autowired
	private MediateService service;

	@Autowired
	private AreaDao dao;

	@Autowired
	private resService res;

	@Autowired
	private ConferenceService con;

	/**
	 * 视频调解的添加与修改
	 * 
	 * @param mediate
	 *            视频调解信息的pojo类
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/addMediate", method = RequestMethod.POST)
	@ResponseBody
	public ResultMessage addMediate(TVideoMediate mediate, TVideoConference conference, String information,
			HttpServletRequest request) {
		String msg = "";
		String status = "";
		String code = "";
		List<String> mcu=new ArrayList<String>();
		List<TMediatePerson> list = JsonUtil.jsonList2JavaList(information, TMediatePerson.class);
		for (TMediatePerson tMediatePerson : list) {
			if (Strings.isNullOrEmpty(tMediatePerson.getCellPhone()))
				tMediatePerson.setCellPhone("");
			if (Strings.isNullOrEmpty(tMediatePerson.getUnit()))
				tMediatePerson.setUnit("");
			if (Strings.isNullOrEmpty(tMediatePerson.getIdentityType()))
				tMediatePerson.setIdentityType("");
			code = code + tMediatePerson.getMediationAddress() + ",";
			mcu.add(tMediatePerson.getMcu());
		}
		List<String> hphone = dao.selectByCode(code.substring(0, code.length() - 1));
		CasUser user = SessionUtil.getSession(request);
		mcu.add(user.getAreas().getMcu());
		List<String> id = new ArrayList<String>();
		id.add(user.getAreas().getHphone());
		id.addAll(hphone);
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			if (StringUtils.isNotEmpty(mediate.getMediateDate())) {
				Date date = format.parse(mediate.getMediateDate());
				mediate.setMediateDate(String.valueOf(date.getTime()));
			}
			if (StringUtils.isNotEmpty(mediate.getMediateRegisDate())) {
				Date date = format.parse(mediate.getMediateRegisDate());
				mediate.setMediateRegisDate(String.valueOf(date.getTime()));
			}

			// mediateid不存在，即新添加
			if (Strings.isNullOrEmpty(mediate.getMediateid())) {
				String accessCode = String.valueOf(new Date().getTime()).substring(6, 12);
				String name = String.valueOf(new Date().getTime()) + "调解会议";
				if (conference.getBeginTime() != null) {
					ConferenceInfoEx cfinfo = new ConferenceInfoEx();
					conference.setCreateName(user.getRealname());
					conference.setAccessCode(accessCode);
					cfinfo.setName("TJ:" + RandomUtil.RanInt(6));
					cfinfo.setBeginTime(conference.getBeginTime());
					cfinfo.setAccessCode(accessCode);
					cfinfo.setMediaEncryptType(0);
					cfinfo.setDuration(durationInt2dur(Integer.parseInt(conference.getDuration()) * 60));
					cfinfo.setMainMcuId(16);
					String addTemplate = ConferenceTemplate.addTemplate(id,mcu,conference, user.getAreas().getHphone(),
							"TJ", res);
					if ("error".equals(addTemplate))
						return new ResultMessage("模板创建失败", Application.STATUS_ADD_FAIL);
					com.jzsx.xlgc.resSmutils.Result result = res.scheduleConfEx(cfinfo);
					if (result.getResultCode() != 0) {
						return new ResultMessage("会议创建失败", Application.STATUS_ADD_FAIL);
					}
					int j = res.deletetemplate(addTemplate);
					conference.setConfId(result.getConf().getConfId());
					conference.setStatus(0);
					conference.setType(4);
					conference.setName(name);
					conference.setUserId(user.getUsergroupid().toString());
					con.addConference(conference);
					mediate.setConfId(result.getConf().getConfId());
				}

				if (!Strings.isNullOrEmpty(mediate.getVillage())) {
					mediate.setMediateAddress(mediate.getVillage());
				} else if (!Strings.isNullOrEmpty(mediate.getCounty())) {
					mediate.setMediateAddress(mediate.getCounty());
				} else if (!Strings.isNullOrEmpty(mediate.getDistrict())) {
					mediate.setMediateAddress(mediate.getDistrict());
				} else {
					mediate.setMediateAddress("1");
				}
				String mediateid = String.valueOf(IDUtils.genItemId());
				mediate.setMediateid(mediateid);
				mediate.setMediateCode(user.getUsergroupid().toString());
				// 0为失败 1为解决 2为解决中
				mediate.setMediaterStatus(BigDecimal.valueOf(2));
				for (TMediatePerson person : list) {
					person.setMediateid(mediateid);
				}
				int i = service.addMediate(mediate, true, list);
				msg = i > 0 ? Application.MSG_ADD_SUCCESS : Application.MSG_ADD_FAIL;
				status = i > 0 ? Application.STATUS_ADD_SUCCESS : Application.STATUS_ADD_FAIL;
				return new ResultMessage(msg, status);
			}
			// 修改
			int i = service.addMediate(mediate, false, list);
			msg = i == 1 ? Application.MSG_UPDATE_SUCCESS : Application.MSG_UPDATE_FAIL;
			status = i == 1 ? Application.STATUS_UPDATE_SUCCESS : Application.STATUS_UPDATE_FAIL;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResultMessage(msg, status);
	}

	/**
	 * 获取默认视频调解的分页数据信息，
	 * 
	 * @param pages
	 *            页数
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getPageList", produces = "application/json;charset=utf-8")
	@ResponseBody
	public Result<TVideoMediate> getPageList(@RequestParam(defaultValue = "1") Integer pages,
			HttpServletRequest request) {
		CasUser user = SessionUtil.getSession(request);
		Result<TVideoMediate> result = service.getPageList(pages, user.getUsergroupid().toString());
		return result;
	}

	/**
	 * 获取搜索条件的视频调解分页信息
	 * 
	 * @param pages
	 *            页数
	 * @param mediate
	 *            搜索参数pojo类
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getSearchPageList", produces = "application/json;charset=utf-8")
	@ResponseBody
	public Result<TVideoMediate> getSearchPageList(@RequestParam(defaultValue = "1") Integer pages,
			TVideoMediate mediate, HttpServletRequest request) {
		CasUser user = SessionUtil.getSession(request);
		if (Strings.isNullOrEmpty(mediate.getDistrict())) {
			mediate.setMediateAddress(user.getUsergroupid().toString());
		} else if (!Strings.isNullOrEmpty(mediate.getCounty()) && Strings.isNullOrEmpty(mediate.getVillage())) {
			mediate.setMediateAddress(mediate.getCounty());
		} else if (!Strings.isNullOrEmpty(mediate.getVillage())) {
			mediate.setMediateAddress(mediate.getVillage());
		} else {
			mediate.setMediateAddress(mediate.getDistrict());
		}
		Result<TVideoMediate> result = null;
		try {
			result = service.getSearchPageList(pages, mediate, user.getUsergroupid().toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 根据mediateid删除信息
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/delete")
	@ResponseBody
	public ResultMessage deleteMedia(String id) {
		if (Strings.isNullOrEmpty(id)) {
			return new ResultMessage(Application.MSG_ERROR, Application.STATUS_ERROR);
		}
		int i = service.deleteMedia(id);
		String msg = i == 1 ? Application.MSG_DELETE_SUCCESS : Application.MSG_DELETE_FAIL;
		String status = i == 1 ? Application.STATUS_DELETE_SUCCESS : Application.STATUS_DELETE_FAIL;
		return new ResultMessage(msg, status);
	}

	/**
	 * 视频调解信息导出
	 * 
	 * @param mediate
	 *            搜索条件pojo类
	 * @param response
	 * @param request
	 * @return
	 */
	@SuppressWarnings("deprecation")
	@RequestMapping("/export")
	@ResponseBody
	public ResultMessage importMediate(TVideoMediate mediate, HttpServletResponse response,
			HttpServletRequest request) {
		CasUser user = SessionUtil.getSession(request);
		try {
			if (Strings.isNullOrEmpty(mediate.getDistrict())) {
				mediate.setMediateAddress(user.getUsergroupid().toString());
			} else if (!Strings.isNullOrEmpty(mediate.getCounty()) && Strings.isNullOrEmpty(mediate.getVillage())) {
				mediate.setMediateAddress(mediate.getCounty());
			} else if (!Strings.isNullOrEmpty(mediate.getVillage())) {
				mediate.setMediateAddress(mediate.getVillage());
			} else {
				mediate.setMediateAddress(mediate.getDistrict());
			}
			Result<TVideoMediate> result = service.importMediate(mediate, user.getUsergroupid().toString());
			for (TVideoMediate tVideoMediate : result.getList()) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				String string = dateFormat.format(Long.parseLong(tVideoMediate.getMediateDate()));
				String string2 = dateFormat.format(Long.parseLong(tVideoMediate.getMediateRegisDate()));
				tVideoMediate.setMediateDate(string);
				tVideoMediate.setMediateRegisDate(string2);
				tVideoMediate.setMediateAddress(tVideoMediate.getAreas().getName());

			}
			// poi导出excel表格 工具类
			ExportExcel<TVideoMediate> excel = new ExportExcel<TVideoMediate>();
			excel.exportExcelString("调解信息", Application.MEDIATE_HEADERS, result.getList(), Application.MEDIATE_DATASTR,
					"yyyy-MM-dd", response);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResultMessage("导出失败", "0");
		}
		return new ResultMessage("导出成功", "1");
	}

	/**
	 * 视频调解导入功能
	 * 
	 * @param file
	 *            导入的Excel文件
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/import",produces="text/html;charset=utf-8")
	@ResponseBody
	public String exportMediate(@RequestParam(value = "file") MultipartFile file, HttpServletRequest request) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String msg = "模板内容不能为空";
		String status = "0";
		CasUser user = SessionUtil.getSession(request);
		try {
			List<List<Object>> list = ReadExcel.readExcel(file);
			List<TVideoMediate> list3 = new ArrayList<TVideoMediate>();
			for (int j = 0; j < list.size(); j++) {
				if (j > 0) {
					List<Object> list2 = list.get(j);
					TVideoMediate mediate = new TVideoMediate();
					int statu = (list2.get(11).toString().equals("已解决") ? 1
							: (list2.get(11).toString().equals("未解决") ? 0 : 2));
					mediate.setMediateName(list2.get(0).toString());
					// mediate.setMediatePid(list2.get(1).toString());
					mediate.setMediateAddress(user.getUsergroupid().toString());
					// mediate.setMediatePidNumber(list2.get(2).toString());
					// mediate.setMediateTelephone(list2.get(3).toString());
					// mediate.setMediateCellphone(list2.get(4).toString());
					mediate.setMediateCompleteAdd(list2.get(1).toString());
					mediate.setMediateIdentifier(list2.get(2).toString());
					mediate.setMediateRegisUnit(list2.get(3).toString());
					mediate.setMediatePurpose(list2.get(4).toString());
					if (!Strings.isNullOrEmpty(list2.get(5).toString())) {
						Date date = dateFormat.parse(list2.get(5).toString());
						mediate.setMediateDate(String.valueOf(date.getTime()));
					} else {
						mediate.setMediateDate(list2.get(5).toString());
					}
					mediate.setMediateRegisName(list2.get(6).toString());
					mediate.setMediateRegisBranch(list2.get(7).toString());
					if (!Strings.isNullOrEmpty(list2.get(8).toString())) {
						Date date = dateFormat.parse(list2.get(8).toString());
						mediate.setMediateRegisDate(String.valueOf(date.getTime()));
					} else {
						mediate.setMediateRegisDate(list2.get(8).toString());
					}
					mediate.setMediateNumber(list2.get(9).toString());
					mediate.setMediateReason(list2.get(10).toString());
					mediate.setMediaterStatus(BigDecimal.valueOf(statu));
					mediate.setMediateid(String.valueOf(IDUtils.genItemId()));
					mediate.setMediateCode(user.getUsergroupid().toString());
					list3.add(mediate);
				}
			}

			int i = service.insertByExport(list3);
			msg = i > 0 ? Application.MSG_ADD_SUCCESS : Application.MSG_ADD_FAIL;
			status = i > 0 ? Application.STATUS_ADD_SUCCESS : Application.STATUS_ADD_FAIL;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return JSON.toJSONString(new ResultMessage(msg, status));
	}

	/**
	 * 根据id获取调解的信息
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("/getMediateById")
	@ResponseBody
	public Map<String, Object> getMediateById(String id) {
		TVideoMediate mediate = service.getMediateById(id);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String string = dateFormat.format(Long.parseLong(mediate.getMediateDate()));
		String string2 = dateFormat.format(Long.parseLong(mediate.getMediateRegisDate()));
		mediate.setMediateDate(string);
		mediate.setMediateRegisDate(string2);
		//获取被调解人
		List<TMediatePerson> mediated = service.selectByMediateId(id, 1);
		//获取调解人
		List<TMediatePerson> mediation= service.selectByMediateId(id, 2);
		
		TVideoConference conference = con.selectByPrimaryKey(mediate.getConfId());
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("mediate", mediate);
		map.put("mediated", mediated);
		map.put("mediation", mediation);
		map.put("conference", conference);
		return map;
	}

	/**
	 * 调解信息的统计
	 * 
	 * @param category
	 *            想要预览信息的类型，0为按区县统计，其他为按具体的乡/镇统计，
	 * @param year
	 *            年份
	 * @param month
	 *            月份
	 * @return
	 */
	@RequestMapping("/getData")
	@ResponseBody
	public Map<String, Object> getData(String category, String year) {
		if (Strings.isNullOrEmpty(category) || Strings.isNullOrEmpty(year)) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("error", "非法参数");
			return map;
		} else {
			Map<String, String> map = new HashMap<String, String>();
			List<DataAnalysis> analysis = new ArrayList<DataAnalysis>();
			try {
				// 统计是按月，因此获取月份数据之后需要再加上一个月的时间作为某月的所有时间
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy");
				Date date = dateFormat.parse(year);
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(date);
				calendar.add(Calendar.YEAR, 1);
				Date time = calendar.getTime();
				map.put("start", String.valueOf(date.getTime()));
				map.put("stop", String.valueOf(time.getTime()));
				if (Integer.parseInt(category) == 0) {
					analysis = service.dataAnalysis(map);
				} else {
					map.put("area", category);
					analysis = service.allDataAnalysis(map);
				}
			} catch (ParseException e) {
				e.printStackTrace();
			}
			List<String> areas = new ArrayList<String>();
			List<String> success = new ArrayList<String>();
			List<String> defeated = new ArrayList<String>();
			List<String> unknown = new ArrayList<String>();
			List<String> code = new ArrayList<String>();
			Map<String, List<String>> map2 = new HashMap<String, List<String>>();
			Map<String, Object> map3 = new HashMap<String, Object>();
			for (DataAnalysis data : analysis) {
				areas.add(data.getName());
				success.add(String.valueOf(data.getSuccess()));
				defeated.add(String.valueOf(data.getFail()));
				unknown.add(String.valueOf(data.getMiddle()));
				code.add(data.getCode());
			}
			map2.put("area", areas);
			map2.put("success", success);
			map2.put("defeated", defeated);
			map2.put("unknown", unknown);
			map2.put("code", code);
			map3.put("status", 0);
			map3.put("data", map2);
			return map3;
		}
	}

	@RequestMapping("/updateStatus")
	@ResponseBody
	public ResultMessage updateStatusByPrimaryKey(String type, String id) {
		if (Strings.isNullOrEmpty(type) || Strings.isNullOrEmpty(id)) {
			return new ResultMessage(Application.MSG_ERROR, Application.STATUS_ERROR);
		}
		Map<String, String> map = new HashMap<String, String>();
		map.put("type", type);
		map.put("id", id);
		int i = service.updateStatusByPrimaryKey(map);
		if (i == 1)
			return new ResultMessage(Application.MSG_UPDATE_SUCCESS, Application.STATUS_UPDATE_SUCCESS);
		return new ResultMessage(Application.MSG_UPDATE_FAIL, Application.STATUS_UPDATE_FAIL);

	}

	@RequestMapping("/exportModel")
	@ResponseBody
	public ResultMessage exportModel(HttpServletRequest request, HttpServletResponse response) {
		List<TVideoMediate> list = new ArrayList<TVideoMediate>();
		ExportExcel<TVideoMediate> excel = new ExportExcel<TVideoMediate>();
		excel.exportExcelString("调解导入模板", Application.MEDIATE_HEADERS_MODEL, list, Application.MEDIATE_DATASTR_MODEL,
				"yyyy-MM-dd", response);
		return null;

	}

	@RequestMapping("getDataByCode")
	@ResponseBody
	public Map<String, Object> getDataByCode(String code, String year) throws ParseException {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy");
		Date date = dateFormat.parse(year);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.YEAR,1);
		Date time = calendar.getTime();
		String start = String.valueOf(date.getTime());
		String stop = String.valueOf(time.getTime());
		List<DataByCode> list = service.selectByCode(code, start, stop);
		List<DataByCode> format = format(list);
		List<Object> area = new ArrayList<Object>();
		List<Object> success = new ArrayList<Object>();
		List<Object> defeated = new ArrayList<Object>();
		List<Object> unknown = new ArrayList<Object>();
		Map<String, List<Object>> map2 = new HashMap<String, List<Object>>();
		Map<String, Object> map3 = new HashMap<String, Object>();
		for (DataByCode dataByCode : format) {
			area.add(dataByCode.getCurrent_month());
			success.add(dataByCode.getSuccess());
			defeated.add(dataByCode.getFail());
			unknown.add(dataByCode.getMiddle());
		}
		map2.put("area", area);
		map2.put("success", success);
		map2.put("defeated", defeated);
		map2.put("unknown", unknown);
		map3.put("status", 0);
		map3.put("data", map2);
		return map3;
	}

	@RequestMapping("/ceshi")
	@ResponseBody
	public Result<TVideoMediate> ceshi() {
		Result<TVideoMediate> result = service.selectByExampleJoinTable();

		return result;
	}

	public List<DataByCode> format(List<DataByCode> list) {
		for (DataByCode dataByCode : list) {
			switch (Integer.parseInt(dataByCode.getCurrent_month())) {
			case 1:
				dataByCode.setCurrent_month("一月");
				break;
			case 2:
				dataByCode.setCurrent_month("二月");
				break;
			case 3:
				dataByCode.setCurrent_month("三月");
				break;
			case 4:
				dataByCode.setCurrent_month("四月");
				break;
			case 5:
				dataByCode.setCurrent_month("五月");
				break;
			case 6:
				dataByCode.setCurrent_month("六月");
				break;
			case 7:
				dataByCode.setCurrent_month("七月");
				break;
			case 8:
				dataByCode.setCurrent_month("八月");
				break;
			case 9:
				dataByCode.setCurrent_month("九月");
				break;
			case 10:
				dataByCode.setCurrent_month("十月");
				break;
			case 11:
				dataByCode.setCurrent_month("十一月");
				break;
			case 12:
				dataByCode.setCurrent_month("十二月");
				break;

			default:
				break;
			}
		}
		return list;
	}

	/**
	 * 输入以分钟为单位的数据，返回duration类型数据 * @param dur /** * @return
	 */
	public static Duration durationInt2dur(Integer dur) {
		Duration duration = null;
		try {
			if (0 <= dur) {
				duration = DatatypeFactory.newInstance().newDuration("PT" + Math.abs(dur) + "M");
			} else {
				duration = DatatypeFactory.newInstance().newDuration("-PT" + Math.abs(dur) + "M");
			}
		} catch (DatatypeConfigurationException e) {
			e.printStackTrace();

		}
		return duration;
	}

}
