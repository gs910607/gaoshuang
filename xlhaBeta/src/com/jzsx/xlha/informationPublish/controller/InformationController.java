package com.jzsx.xlha.informationPublish.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Strings;
import com.jzsx.xlha.bean.CasInformationSearch;
import com.jzsx.xlha.bean.CasUser;
import com.jzsx.xlha.bean.TInformation;
import com.jzsx.xlha.informationPublish.service.InfomationService;
import com.jzsx.xlha.util.Result;
import com.jzsx.xlha.util.SessionUtil;

@Controller
@RequestMapping("/information")
public class InformationController {

	private static Logger log = Logger.getLogger(InformationController.class);

	@Autowired
	private InfomationService service;

	/**
	 * 首页获取政法新闻
	 * 
	 * @return
	 */
	@RequestMapping("/selectFor")
	@ResponseBody
	public Result<TInformation> selectForInformation() {
		Result<TInformation> result = service.selectForInformation();
		return result;
	}

	/**
	 * 获取书画摄影
	 * 
	 * @return
	 */
	@RequestMapping("/selectDraw")
	@ResponseBody
	public Result<TInformation> selectDraw() {
		return service.selectDraw();
	}

	/**
	 * 政法新闻分页数据
	 * 
	 * @param pages
	 * @param information
	 * @return
	 */
	@RequestMapping("/getPublish")
	@ResponseBody
	public Result<TInformation> getPublish(@RequestParam(defaultValue = "1") Integer pages,
			@RequestParam(defaultValue="10")Integer sizePage,CasInformationSearch information) {

		return service.getPublish(pages,sizePage, information);
	}

	/**
	 * 书画摄影分页数据
	 * @param pages
	 * @param information
	 * @return
	 */
	@RequestMapping("/getDraw")
	@ResponseBody
	public Result<TInformation> getDraw(@RequestParam(defaultValue = "1") Integer pages,@RequestParam(defaultValue="10")Integer sizePage,
			CasInformationSearch information) {
		return service.getDraw(pages,sizePage, information);
	}

	/**
	 * app接口
	 * 
	 * @param type
	 * @param code
	 * @param pages
	 * @param sizes
	 * @return
	 */
	@RequestMapping(value = "/appListInformation", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, Object> appListInformation(Integer type, Integer pages, Integer sizes) {
		log.info("appListInformation----type:" + type  + "----pages:" + "----sizes:" + sizes);
		Map<String, Object> map = new HashMap<String, Object>();
		if (type == null ||pages == null || sizes == null) {
			map.put("status", 0);
			map.put("msg", "参数不完整");
			return map;
		}
		Result<TInformation> result = service.appListInformation(type,pages, sizes);
		map.put("status", 1);
		map.put("result", result);
		return map;
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
		TInformation information = service.getInformationById(id);
		return JSON.toJSONString(information);
	}

}
