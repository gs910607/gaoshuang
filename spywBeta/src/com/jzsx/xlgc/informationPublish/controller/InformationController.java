package com.jzsx.xlgc.informationPublish.controller;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.RequestWrapper;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Strings;
import com.google.common.collect.Maps;
import com.jzsx.xlgc.bean.CasInformationSearch;
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.InforType;
import com.jzsx.xlgc.bean.TInformation;
import com.jzsx.xlgc.informationPublish.service.InfomationService;
import com.jzsx.xlgc.utils.AppResult;
import com.jzsx.xlgc.utils.Application;
import com.jzsx.xlgc.utils.IDUtils;
import com.jzsx.xlgc.utils.Result;
import com.jzsx.xlgc.utils.ResultMessage;
import com.jzsx.xlgc.utils.SessionUtil;

@Controller
@RequestMapping("/information")
public class InformationController {

	private static Logger log = Logger.getLogger(InformationController.class);

	@Autowired
	private InfomationService service;

	@RequestMapping("getType")
	@ResponseBody
	public Map<String, Object> getType() {
		List<InforType> list = service.getType();
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("type", list);
		return map;
	}

	/**
	 * 获取政法新闻首页展示的多类型信息
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getInfo", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getInfomation(Model model, HttpServletRequest request) {
		CasUser user = SessionUtil.getSession(request);
		Map<String, List<TInformation>> map = new HashMap<String, List<TInformation>>();
		List<TInformation> top = service.getInfo(1, user.getUsergroupid().toString());
		List<TInformation> pingan = service.getInfo(2, user.getUsergroupid().toString());
		List<TInformation> zhengfa = service.getInfo(3, user.getUsergroupid().toString());
		List<TInformation> shehui = service.getInfo(4, user.getUsergroupid().toString());
		List<TInformation> team = service.getInfo(9, user.getUsergroupid().toString());
		map.put("top", top);
		map.put("pingan", pingan);
		map.put("zhengfa", zhengfa);
		map.put("shehui", shehui);
		map.put("team", team);
		log.info("政法新闻首页信息展示数据----" + JSON.toJSONString(map));
		return JSON.toJSONString(map);
	}

	/**
	 * 添加新闻
	 * 
	 * @param file
	 *            上传的图片文件
	 * @param casInformation
	 *            新闻主体信息pojo类
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/addInformation", method = RequestMethod.POST, produces = "text/html;charset=utf-8")
	@ResponseBody
	public String addInformation(@RequestParam(value="file",required=false)MultipartFile file,TInformation casInformation, HttpServletRequest request) {
		log.info("政法新闻添加模块入参" + "----information:" + casInformation);
		Map<String, String> map = new HashMap<String, String>();
		CasUser user = SessionUtil.getSession(request);
		try {
			if (file!=null) {
				String url = uploadImage(file, request);
				casInformation.setImage("http://"+request.getServerName()+":"+request.getLocalPort()+url);
			}
			casInformation.setCreatetime(new Date());
			casInformation.setGroupid(user.getUsergroupid().toString());
			casInformation.setInformationid(String.valueOf(IDUtils.genItemId()));
			casInformation.setCreatename(user.getRealname());
			Integer i = service.addInformation(casInformation);
			if (i == 1) {
				map.put("msg", "添加成功");
				map.put("status", String.valueOf(i));
			} else {
				map.put("msg", "添加失败");
				map.put("status", String.valueOf(i));
			}
		} catch (Exception e) {
			log.error("上传图片发生错误----" + e);
		}
		return JSON.toJSONString(map);
	}

	/**
	 * 获取新闻分页信息
	 * 
	 * @param pages
	 *            当前页数
	 * @param type
	 *            新闻类型
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getPageList", produces = "application/json;charset=utf-8")
	@ResponseBody
	public Result<TInformation> getPageList(@RequestParam(defaultValue = "1") Integer pages, Integer type,
			HttpServletRequest request) {
		log.info("获取新闻分页信息入参----pages:" + pages + "----type:" + type);
		CasUser user = SessionUtil.getSession(request);
		Result result = service.getPageList(pages, type, user.getUsergroupid().toString());
		return result;
	}

	/**
	 * 获取搜索之后的新闻分页信息
	 * 
	 * @param pages
	 *            页数
	 * @param search
	 *            查询条件的pojo类
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getSearchPageList", produces = "application/json;charset=utf-8")
	@ResponseBody
	public Result<TInformation> getSearchPageList(@RequestParam(defaultValue = "1") Integer pages,
			CasInformationSearch search, HttpServletRequest request) {
		CasUser user = SessionUtil.getSession(request);
		Result result = null;
		try {
			result = service.getSearchPageList(pages, search, user.getUsergroupid().toString());
		} catch (ParseException e) {
			log.error("获取新闻分页出错----" + e);
		}
		return result;
	}

	/**
	 * 根据id 获取新闻的详情
	 * 
	 * @param id
	 *            新闻记录的id
	 * @return
	 */
	@RequestMapping(value = "/getInformationById", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getInformationById(String id) {
		log.info("获取新闻详情模块入参----id:" + id);
		TInformation information = service.getInformationById(id);
		return JSON.toJSONString(information);
	}

	/**
	 * 新闻信息的更新
	 * 
	 * @param file
	 *            图片文件
	 * @param casInformation
	 *            修改后的新闻信息pojo类
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/updateInformation", produces = "text/html;charset=utf-8")
	@ResponseBody
	public String updateInformation(@RequestParam(value = "file", required = false) MultipartFile file,
			TInformation casInformation, HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		try {
			// 如果文件不为空 则表示更新了图片，需要重新上传图片并返回地址
			if (file != null) {
				String url = uploadImage(file, request);
				casInformation.setImage(url);
			}
			casInformation.setCreatetime(new Date());
			Integer i = service.updateInformation(casInformation);
			if (i == 1) {
				map.put("msg", "更新成功");
				map.put("status", String.valueOf(i));
			} else {
				map.put("msg", "更新失败");
				map.put("status", String.valueOf(i));
			}
		} catch (Exception e) {
			log.error("出错了----" + e);
		}
		return JSON.toJSONString(map);
	}

	/**
	 * 根据id和type删除信息
	 * 
	 * @param id
	 *            信息id
	 * @param type
	 *            信息类型
	 * @return
	 */
	@RequestMapping(value = "/delete", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String deleteInformation(String id, String type) {
		log.info("删除政法新闻信息入参----id:" + id + "----type:" + type);
		int i = service.deleteInformation(id);
		Map<String, Object> map = new HashMap<String, Object>();
		if (i > 0) {
			map.put("msg", "删除成功");
			map.put("status", 1);
			return JSON.toJSONString(map);
		}
		map.put("msg", "删除失败");
		map.put("status", 0);
		return JSON.toJSONString(map);
	}

	/**
	 * 新闻信息发布数据统计
	 * 
	 * @param types
	 *            统计类型
	 * @param year
	 *            年份
	 * @param month
	 *            月份
	 * @return
	 */
	@RequestMapping("/getData")
	@ResponseBody
	public Map<String, Object> getData(int types, String year, String month) {
		try {
			String time = year + "-" + month;
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM");
			Date date = dateFormat.parse(time);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			calendar.add(Calendar.MONTH, 1);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("start", date);
			map.put("stop", calendar.getTime());
			// 按照地区
			if (types == 1) {
				List<DataAnalysis> analysis = service.getDataAnalysis(map);
				List<String> areas = new ArrayList<String>();
				List<String> list = new ArrayList<String>();
				Map<String, List<String>> map2 = new HashMap<String, List<String>>();
				Map<String, Object> map3 = new HashMap<String, Object>();
				for (DataAnalysis data : analysis) {
					areas.add(data.getName());
					list.add(String.valueOf(data.getCount()));
				}
				map2.put("area", areas);
				map2.put("list", list);
				map3.put("status", 0);
				map3.put("data", map2);
				return map3;
			}
			{
				List<DataAnalysis> analysis = service.getTypeAnalysis(map);
				List<String> areas = new ArrayList<String>();
				List<String> list = new ArrayList<String>();
				Map<String, List<String>> map2 = new HashMap<String, List<String>>();
				Map<String, Object> map3 = new HashMap<String, Object>();
				for (DataAnalysis data : analysis) {
					areas.add(data.getName());
					list.add(String.valueOf(data.getCount()));
				}
				map2.put("area", areas);
				map2.put("list", list);
				map3.put("status", 0);
				map3.put("data", map2);
				return map3;
			}

		} catch (Exception e) {
			log.error("发生错误----" + e);
		}
		return null;
	}

	@RequestMapping("/reply")
	@ResponseBody
	public AppResult reply(String id, HttpServletRequest request) {
		if (Strings.isNullOrEmpty(id))
			return new AppResult("0", "id不能为空");
		CasUser user = SessionUtil.getSession(request);
		if (user == null)
			return new AppResult("0", "尚未登录,请登录之后再进行操作");
		return service.reply(id, user.getUsergroupid().toString());

	}

	@RequestMapping(value = "/imgUpload", produces = MediaType.TEXT_PLAIN_VALUE + ";charset=utf-8")
	@ResponseBody
	public String imgUpload(MultipartFile uploadFile, HttpServletRequest request) {
		Map<String, Object> map = Maps.newHashMap();
		try {
			String url = uploadImage(uploadFile, request);
			map.put("error", 0);
			map.put("url", "http://" + request.getServerName() + ":" + request.getLocalPort() + url);
			return JSON.toJSONString(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("error", 1);
			map.put("message", "图片上传失败");
			return JSON.toJSONString(map);
		}

	}

	/**
	 * 图片上传方法实现
	 * 
	 * @param file
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public String uploadImage(MultipartFile file, HttpServletRequest request) throws Exception {
		String filename = file.getOriginalFilename();
		String name = UUID.randomUUID() + "." + filename.substring(filename.lastIndexOf(".") + 1);
		String path = request.getSession().getServletContext().getRealPath(Application.imgPath);
		String url = request.getContextPath() + Application.imgUrl + name;
		path = path + name;
		File file2 = new File(path);
		file.transferTo(file2);
		return url;
	}

	/**
	 * app接口，获取新闻分页数据
	 * 
	 * @param type
	 * @param code
	 * @param pages
	 * @param sizes
	 * @return
	 */
	@RequestMapping(value = "/appListInformation", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public String appListInformation(Integer type, String code, Integer pages, Integer sizes) {
		log.info("app接口，政法新闻分页数据模块入参----type:" + type + "----code:" + code + "----pages:" + pages + "----sizes:"
				+ sizes);
		if (type == null || Strings.isNullOrEmpty(code) || pages == null || sizes == null)
			return JSON.toJSONString(new AppResult("参数不完整", Application.STATUS_ERROR));
		Result<TInformation> result = service.appListInformation(type, code, pages, sizes);
		return JSON.toJSONString(new AppResult("成功", Application.STATUS_ADD_SUCCESS, result));
	}

}
