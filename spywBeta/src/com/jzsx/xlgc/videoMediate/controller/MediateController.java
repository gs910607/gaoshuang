package com.jzsx.xlgc.videoMediate.controller;

import java.io.File;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.print.attribute.standard.Media;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.Duration;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
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
import com.google.common.collect.Maps;
import com.google.gson.Gson;
import com.huawei.esdk.tp.professional.local.bean.ConferenceInfoEx;
import com.huawei.esdk.tp.professional.local.bean.SiteInfoEx;
import com.jzsx.xlgc.area.Dao.AreaDao;
import com.jzsx.xlgc.bean.Area;
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.DataByCode;
import com.jzsx.xlgc.bean.DisputeData;
import com.jzsx.xlgc.bean.TMediatePerson;
import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.bean.TVideoMediate;
import com.jzsx.xlgc.resSmutils.service.ConferenceService;
import com.jzsx.xlgc.resSmutils.service.resService;
import com.jzsx.xlgc.utils.AppResult;
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

	private static Logger log = Logger.getLogger(MediateController.class);

	@Autowired
	private MediateService service;

	@Autowired
	private AreaDao dao;

	@Autowired
	private resService res;

	@Autowired
	private ConferenceService con;

	/**
	 * 
	 * 
	 * @param mediate
	 * 
	 * @param request
	 * @return
	 */
	/**
	 * 视频调解的添加与修改
	 * 
	 * @param mediate
	 *            视频调解信息的pojo类
	 * @param conference
	 *            视频会议pojo类
	 * @param information
	 *            调解人 被调解人信息字符串
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/addMediate", method = RequestMethod.POST)
	@ResponseBody
	public ResultMessage addMediate(TVideoMediate mediate, TVideoConference conference, String information,
			HttpServletRequest request) {
		log.info("调解添加模块入参----mediate:" + mediate + "----conference:" + conference + "----information:" + information);
		int y=0;
		String msg = "";
		String status = "";
		List<String> code = new ArrayList<String>() ;
		List<String> mcu = new ArrayList<String>();
		CasUser user = SessionUtil.getSession(request);
		mcu.add(user.getAreas().getMcu());
		List<TMediatePerson> list = JsonUtil.jsonList2JavaList(information, TMediatePerson.class);
		for (TMediatePerson tMediatePerson : list) {
			if (Strings.isNullOrEmpty(tMediatePerson.getCellPhone()))
				tMediatePerson.setCellPhone("");
			if (Strings.isNullOrEmpty(tMediatePerson.getUnit()))
				tMediatePerson.setUnit("");
			if (Strings.isNullOrEmpty(tMediatePerson.getIdentityType()))
				tMediatePerson.setIdentityType("");
			//code = code + tMediatePerson.getMediationAddress() + ",";
			code.add(tMediatePerson.getMediationAddress());
			tMediatePerson.setCreateTime(new Date());
		}
		List<Area> hphone = service.selectArea(code);
		List<Area> mcuByCode = service.selectArea(code);
		List<String> id = new ArrayList<String>();
		id.add(user.getAreas().getHphone());
		for (Area string : hphone) {
			id.add(string.getHphone());
		}
		for (Area string : hphone) {
			mcu.add(user.getAreas().getMcu());
		}

		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			// 格式化页面传递的时间字符串为时间戳
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
				//String name = String.valueOf(new Date().getTime()) + "调解会议";
				String name = mediate.getTitle();
				// 预约会议代码开始
				if (conference.getBeginTime() != null) {
					ConferenceInfoEx cfinfo = new ConferenceInfoEx();
					conference.setCreateName(user.getRealname());
					conference.setAccessCode(accessCode);
					cfinfo.setName(mediate.getTitle());
					cfinfo.setBeginTime(conference.getBeginTime());
					cfinfo.setAccessCode(accessCode);
					cfinfo.setMediaEncryptType(0);
					//duration为7表示一直持续,而一直持续duration要设置null
					if( !"7".equals(conference.getDuration())) {
						cfinfo.setDuration(durationInt2dur(Integer.parseInt(conference.getDuration()) * 60));
					}
					cfinfo.setMainMcuId(16);
					String addTemplate = ConferenceTemplate.addTemplate(id, mcu, conference,
							user.getAreas().getHphone(), mediate.getTitle(), res);
					if ("error".equals(addTemplate))
						return new ResultMessage("模板创建失败", Application.STATUS_ADD_FAIL);
					List<SiteInfoEx> sites = new ArrayList<SiteInfoEx>();
					for (String url : id) {
						//新建一个SiteInfoEx对象 
					      SiteInfoEx siteInfo1 = new SiteInfoEx();
					      //会场URI为01010086 
					      siteInfo1.setUri(url);
					      //会场速率为1920k 
					      siteInfo1.setRate("1920K");
					      //会场名称为site1 
					      siteInfo1.setName("会场"+RandomUtil.RanInt(6));
					      //呼叫方式为MCU主动呼叫会场 
					      siteInfo1.setDialingMode(0);
					      //会场来源为内部会场 
					      siteInfo1.setFrom(0);
					      //会场类型为H.323会场类型 
					      siteInfo1.setType(4);
					      //会场视频格式为Auto 
					      siteInfo1.setVideoFormat(0);
					      //会场视频协议为H.261 
					      siteInfo1.setVideoProtocol(0);
					      siteInfo1.setVideoFormat(0);
					      siteInfo1.setMcuId(Integer.parseInt(mcu.get(y)));
					      sites.add(siteInfo1);
					      y++;
					}
					cfinfo.setSites(sites); 
					com.jzsx.xlgc.resSmutils.Result result = res.scheduleConfEx(cfinfo,user.getAreas().getHphone());
					if (result.getResultCode() != 0) {
						log.error("调解会议创建失败，错误码为----" + result.getResultCode());
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
					// 以上三个条件判断为区县、乡镇、街道/村,如果都为空,则填充当前账号的groupid
					mediate.setMediateAddress(user.getUsergroupid().toString());
				}
				String mediateid = String.valueOf(IDUtils.genItemId());
				int j = service.queryIdentityCount(user.getUsergroupid().toString());
				mediate.setMediateIdentifier("TJ" + user.getUsergroupid().toString() + "-"
						+ Calendar.getInstance().get(Calendar.YEAR) + "-" + (j + 1));
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
		log.info("视频调解信息分页查找模块入参----mediate:" + mediate + "----pages:" + pages);
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
			log.error("发生错误----" + e);
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
			log.error("id为空");
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
				String string = "";
				if(tVideoMediate.getMediateDate() != null) {
					string = dateFormat.format(Long.parseLong(tVideoMediate.getMediateDate()));
				}
				String string2 = "";
				if(tVideoMediate.getMediateRegisDate() !=null) {
					string2 = dateFormat.format(Long.parseLong(tVideoMediate.getMediateRegisDate()));
				}
				tVideoMediate.setMediateDate(string);
				tVideoMediate.setMediateRegisDate(string2);
				tVideoMediate.setMediateAddress(tVideoMediate.getAreas().getName());
				String status=tVideoMediate.getMediaterStatus().toString();
				tVideoMediate.setStaus(status.equals("1")?"调解成功":(status.equals("0")?"调解失败":"调解中"));

			}
			// poi导出excel表格 工具类
			ExportExcel<TVideoMediate> excel = new ExportExcel<TVideoMediate>();
			excel.exportExcelString("调解信息", Application.MEDIATE_HEADERS, result.getList(), Application.MEDIATE_DATASTR,
					"yyyy-MM-dd", response, request);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("视频调解导出失败----" + e);
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
	@RequestMapping(value = "/import", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String exportMediate(@RequestParam(value = "file") MultipartFile file, HttpServletRequest request) {
		log.info("视频调解导入模块入参----file:" + file.getOriginalFilename());
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String msg = "模板内容不能为空";
		String status = "0";
		CasUser user = SessionUtil.getSession(request);
		Map map = new HashMap<String, Object>();
		List<String> info = new ArrayList();
		try {
			List<List<Object>> list = ReadExcel.readExcel(file);
			log.debug("import params :" + new Gson().toJson(list));
			List<TVideoMediate> list3 = new ArrayList<TVideoMediate>();
			for (int j = 0; j < list.size(); j++) {
				if (j > 0) {
					//判断是否有错误参数的
					boolean bl = true ; 
					List<Object> list2 = list.get(j);
					TVideoMediate mediate = new TVideoMediate();
					int statu = (list2.get(10).toString().equals("已解决") ? 1
							: (list2.get(10).toString().equals("未解决") ? 0 : 2));
					if(list2.get(0) == null || list2.get(0) == "") {
						bl = false ;
						info.add("第"+j+"行的书记员姓名为空,该行导入失败!");
					}else {
						mediate.setMediateName(list2.get(0).toString());
					}
					if(list2.get(1) == null || list2.get(1) == "") {
						bl = false ;
						info.add("第"+j+"行的书记员单位为空,该行导入失败!");
					}else {
						mediate.setMediateCompleteAdd(list2.get(1).toString());
					}
					mediate.setMediateAddress(user.getUsergroupid().toString());
					
					int h = service.queryIdentityCount(user.getUsergroupid().toString());
					mediate.setMediateIdentifier("TJ" + user.getUsergroupid().toString() + "-"
							+ Calendar.getInstance().get(Calendar.YEAR) + "-" + (h + 1));
					if(list2.get(2) == null || list2.get(2) == "") {
						bl = false ;
						info.add("第"+j+"行的登记单位为空,该行导入失败!");
					}else {
						mediate.setMediateRegisUnit(list2.get(2).toString());
					}
					
					mediate.setMediatePurpose(list2.get(3).toString());
					// 获取到时间字符串格式化为时间戳
					if(list2.get(4) == null || list2.get(4) == "") {
						bl = false ;
						info.add("第"+j+"行的调节日期为空,该行导入失败!");
					}else {
						try {
							Date date = dateFormat.parse(list2.get(4).toString());
							mediate.setMediateDate(String.valueOf(date.getTime()));
						}catch(Exception e) {
							bl = false ;
							info.add("第"+j+"行的调解日期格式不对,请修改(例如2018-1-1)");
							e.printStackTrace();
						}
					}
					if(list2.get(5) == null || list2.get(5) == "") {
						bl = false ;
						info.add("第"+j+"行的登记人为空,该行导入失败!");
					}else {
						mediate.setMediateRegisName(list2.get(5).toString());
					}
					
					mediate.setMediateRegisBranch(list2.get(6).toString());
					// 获取到时间字符串格式化为时间戳
					if(list2.get(7) == null || list2.get(7) == "") {
						bl = false ;
						info.add("第"+j+"行的登记日期为空,该行导入失败!");
					}else {
						try {
							Date date = dateFormat.parse(list2.get(7).toString());
							mediate.setMediateRegisDate(String.valueOf(date.getTime()));
						}catch(Exception e) {
							bl = false ;
							info.add("第"+j+"行的登记日期格式不对,请修改(例如2018-1-1)");
							e.printStackTrace();
						}
					}
					mediate.setMediateNumber(list2.get(8).toString());
					mediate.setMediateReason(list2.get(9).toString());
					mediate.setMediaterStatus(BigDecimal.valueOf(statu));
					/*if(list2.get(11) == null || list2.get(11) == "") {
						bl = false ;
						info.add("第"+j+"行的调解标题为空,该行导入失败!");
					}else {
						mediate.setTitle(list2.get(11).toString());
					}*/
					mediate.setMediateid(String.valueOf(IDUtils.genItemId()));
					mediate.setMediateCode(user.getUsergroupid().toString());
					if(!bl) {
						continue ;
					}
					list3.add(mediate);
				}
			}
			if(list3.size() > 0) {
				log.debug("import params:" + new Gson().toJson(list3));
				int i = service.insertByExport(list3);
				msg = i > 0 ? Application.MSG_ADD_SUCCESS : Application.MSG_ADD_FAIL;
				status = i > 0 ? Application.STATUS_ADD_SUCCESS : Application.STATUS_ADD_FAIL;
			}
			map.put("msg",msg);
			map.put("status",status);
		} catch (Exception e) {
			info.add("导入调解信息出错");
			log.error("导入调解信息出错----" + e);
		}
		map.put("info",info);
		return JSON.toJSONString(map);
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
		// 获取被调解人
		List<TMediatePerson> mediated = service.selectByMediateId(id, 1);
		// 获取调解人
		List<TMediatePerson> mediation = service.selectByMediateId(id, 2);

		TVideoConference conference = con.selectByPrimaryKey(mediate.getConfId());
		Map<String, Object> map = new HashMap<String, Object>();
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
		log.info("调解信息统计模块入参----category:" + category + "----year:" + year);
		if (Strings.isNullOrEmpty(category) || Strings.isNullOrEmpty(year)) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("error", "非法参数");
			return map;
		} else {
			Map<String, String> map = new HashMap<String, String>();
			List<DataAnalysis> analysis = new ArrayList<DataAnalysis>();
			try {
				// 统计是按年，因此获取年份数据之后需要再加上一年的时间作为某年的所有时间
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
			List<String> duration = new ArrayList<String>();
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
				duration.add(String.valueOf(data.getDuration()));
			}
			map2.put("area", areas);
			map2.put("duration", duration);
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
				"yyyy-MM-dd", response, request);
		return null;

	}

	@RequestMapping("getDataByCode")
	@ResponseBody
	public Map<String, Object> getDataByCode(String code, String year) throws ParseException {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy");
		Date date = dateFormat.parse(year);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.YEAR, 1);
		Date time = calendar.getTime();
		String start = String.valueOf(date.getTime());
		String stop = String.valueOf(time.getTime());
		List<DataByCode> list = service.selectByCode(code, start, stop);
		List<DataByCode> format = format(list);
		List<Object> area = new ArrayList<Object>();
		List<Object> duration = new ArrayList<Object>();
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
			duration.add(String.valueOf(dataByCode.getDuration()));
		}
		map2.put("area", area);
		map2.put("duration", duration);
		map2.put("success", success);
		map2.put("defeated", defeated);
		map2.put("unknown", unknown);
		map3.put("status", 0);
		map3.put("data", map2);
		return map3;
	}

	/**
	 * 
	 * @param year
	 * @return
	 */
	@RequestMapping("/queryDisputeType")
	@ResponseBody
	public Map<String, Object> queryDisputeType(String year) {
		if (Strings.isNullOrEmpty(year))
			return (Map<String, Object>) Maps.newHashMap().put("error", "缺少必要参数年份");
		List<DisputeData> disputeData = service.queryDisputeType(year);
		List<Object> type = new ArrayList<Object>();
		List<Object> name = new ArrayList<Object>();
		List<Object> success = new ArrayList<Object>();
		List<Object> defeated = new ArrayList<Object>();
		List<Object> unknown = new ArrayList<Object>();
		Map<String, List<Object>> map2 = new HashMap<String, List<Object>>();
		Map<String, Object> map3 = new HashMap<String, Object>();
		for (DisputeData data : disputeData) {
			name.add(data.getName());
			type.add(data.getType());
			success.add(data.getSuccess());
			defeated.add(data.getFail());
			unknown.add(data.getMiddle());
		}
		map2.put("name", name);
		map2.put("type", type);
		map2.put("success", success);
		map2.put("defeated", defeated);
		map2.put("unknown", unknown);
		map3.put("status", 0);
		map3.put("data", map2);
		return map3;
	}

	@RequestMapping("/queryDisputeByType")
	@ResponseBody
	public Map<String, Object> queryDisputeByType(String type, String year) {
		if (Strings.isNullOrEmpty(year) || Strings.isNullOrEmpty(type))
			return (Map<String, Object>) Maps.newHashMap().put("error", "参数不完整");
		List<DisputeData> disputeData = service.queryDisputeByType(type, year);
		List<Object> month = new ArrayList<Object>();
		List<Object> success = new ArrayList<Object>();
		List<Object> defeated = new ArrayList<Object>();
		List<Object> unknown = new ArrayList<Object>();
		Map<String, List<Object>> map2 = new HashMap<String, List<Object>>();
		Map<String, Object> map3 = new HashMap<String, Object>();
		for (DisputeData data : disputeData) {
			month.add(data.getCurrent_month());
			success.add(data.getSuccess());
			defeated.add(data.getFail());
			unknown.add(data.getMiddle());
		}
		map2.put("month", month);
		map2.put("success", success);
		map2.put("defeated", defeated);
		map2.put("unknown", unknown);
		map3.put("status", 0);
		map3.put("data", map2);
		return map3;
	}

	@RequestMapping("/importProtocol")
	@ResponseBody
	public Map<String, String> importProtocol(@RequestParam("file") MultipartFile file, String[] ids,
			HttpServletRequest request) {
		Map<String, String> map = Maps.newHashMap();
		if (file == null) {
			map.put("status", "0");
			map.put("msg", "文件不能为空");
			return map;
		}
		try {
			String url = uploadImage(file, request, Application.PROTOCOL_URL);
			log.info("协议上传的地址为----" + url);
			int i = service.updateByIds(Arrays.asList(ids), url);
				map.put("status", "1");
				map.put("msg", "上传成功");
				return map;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("上传协议书发生错误----" + e);
			map.put("status", "0");
			map.put("msg", "上传协议书发生错误");
			return map;
		}

	}

	@RequestMapping("/getProtocol")
	@ResponseBody
	public Result<TMediatePerson> getProtocol(@RequestParam(value = "pages", defaultValue = "1") Integer pages,
			TMediatePerson person, HttpServletRequest request) {
		CasUser session = SessionUtil.getSession(request);
		if (!Strings.isNullOrEmpty(person.getName()))
			person.setName("%" + person.getName() + "%");
		return service.selectProtocol(session.getUsergroupid().toString(), pages, person);
	}

	@RequestMapping("/importAfterProtocol")
	@ResponseBody
	public Map<String, String> importAfterProtocol(@RequestParam("file") MultipartFile file, String id,
			HttpServletRequest request) {
		Map<String, String> map = Maps.newHashMap();
		if (file == null) {
			map.put("status", "0");
			map.put("msg", "文件不能为空");
			return map;
		}
		if (Strings.isNullOrEmpty(id)) {
			map.put("status", "0");
			map.put("msg", "id不能为空");
			return map;
		}
		try {
			String url = uploadImage(file, request, Application.AFTER_PROTOCOL_URL);
			log.info("签字后协议上传的地址为----" + url);
			int i = service.updateUrl(url, id);
			if (i > 0) {
				map.put("status", "1");
				map.put("msg", "上传成功");
				return map;
			}
			map.put("status", "0");
			map.put("msg", "上传失败");
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("上传协议书发生错误----" + e);
			map.put("status", "0");
			map.put("msg", "上传协议书发生错误");
			return map;
		}
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

	/**
	 * 图片上传方法实现
	 * 
	 * @param file
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public String uploadImage(MultipartFile file, HttpServletRequest request, String uri) throws Exception {
		String filename = file.getOriginalFilename();
		String name = UUID.randomUUID() + "." + filename.substring(filename.lastIndexOf(".") + 1);
		String path = request.getSession().getServletContext().getRealPath(uri);
		File before = new File(path);
		if (!before.exists()) {
			before.canWrite();
			before.mkdirs();
		}
		String url = "http://" + request.getServerName() + ":" + request.getLocalPort() + request.getContextPath() + uri
				+ name;
		path = path+"\\"+ name;
		File file2 = new File(path);
		file.transferTo(file2);
		return url;
	}

}
