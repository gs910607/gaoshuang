package com.jzsx.xlgc.resSmutils.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.huawei.esdk.tp.professional.local.bean.ConferenceInfoEx;
import com.jzsx.xlgc.resSmutils.service.resService;

@Controller
@RequestMapping("/res")
public class resController {
	
	@Autowired
	private resService resservice;
	
	@RequestMapping(value = "/test")
	@ResponseBody
	public Map<String,Object> test() {
		ConferenceInfoEx cfinfo = new ConferenceInfoEx();
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("map", resservice.scheduleConfEx(cfinfo,"cc"));		
		return map;
	}
}
