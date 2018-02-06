package com.jzsx.xlha.threeService.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Strings;
import com.jzsx.xlha.bean.CasUser;
import com.jzsx.xlha.bean.TInformation;
import com.jzsx.xlha.threeService.service.ThreeServicePublic;
import com.jzsx.xlha.util.Application;
import com.jzsx.xlha.util.Result;
import com.jzsx.xlha.util.ResultMessage;
import com.jzsx.xlha.util.SessionUtil;

@Controller
@RequestMapping("/threeService")
public class ThreeServiceController {

	private static Logger log=Logger.getLogger(ThreeServiceController.class);
	
	@Autowired
	private ThreeServicePublic service;

	@RequestMapping(value = "/getPageList", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getPageList(HttpServletRequest request,@RequestParam(defaultValue = "1") Integer pages,@RequestParam(defaultValue = "10") Integer sizePage, TInformation pub)
			throws Exception {
		log.info("getPageList----publicty:"+pub+"----pages:"+pages);
		CasUser session = SessionUtil.getSession(request);
		Result<TInformation> result = service.getPageList(pages,sizePage, pub,session);
		return JSON.toJSONString(result);
	}
	
	@RequestMapping(value = "/getInfoById", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getInfoById(String id){
		log.info("getInfoById----id:"+id);
		if(Strings.isNullOrEmpty(id))
			return JSON.toJSONString(new ResultMessage(Application.MSG_ERROR, Application.STATUS_ERROR));
		TInformation threeservicePublic = service.getById(id);
		return JSON.toJSONString(threeservicePublic);
	}
	
	
	@RequestMapping(value = "/delById", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String delInfoById(String id){
		log.info("delById----id:"+id);
		if(Strings.isNullOrEmpty(id))
			return JSON.toJSONString(new ResultMessage(Application.MSG_ERROR, Application.STATUS_ERROR));
		int i = service.delById(id);
		if(i>0)
			return JSON.toJSONString(new ResultMessage(Application.MSG_DELETE_SUCCESS, Application.STATUS_DELETE_SUCCESS));
		return JSON.toJSONString(new ResultMessage(Application.MSG_DELETE_FAIL, Application.STATUS_DELETE_FAIL));
	}
	
}
