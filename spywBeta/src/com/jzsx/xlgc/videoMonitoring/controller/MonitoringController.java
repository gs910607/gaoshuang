package com.jzsx.xlgc.videoMonitoring.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.Duration;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jzsx.xlgc.videoMonitoring.service.VideoApiService;

@Controller
@RequestMapping("/monitoring")
public class MonitoringController {
	@Autowired
	private VideoApiService videoApiService;

	@RequestMapping("/topGroup.do")
	@ResponseBody
	protected JSONObject getTopGroup(HttpServletRequest req, HttpServletResponse resp) {
		return videoApiService.getTopGroup(req, resp);
	}

	@RequestMapping("/login.do")
	@ResponseBody
	protected JSONObject login(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException, NoSuchAlgorithmException {
		return videoApiService.login(req, resp);
	}

	@RequestMapping("/realPlay.do")
	@ResponseBody
	protected JSONObject realPlay(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		return videoApiService.realPlay(req, resp);
	}

	@RequestMapping("/getGroup.do")
	@ResponseBody
	protected JSONObject getGroupById(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		return videoApiService.getGroupById(req, resp);
	}

	@RequestMapping("/ptzControl.do")
	@ResponseBody
	protected JSONObject ptzControl(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		return videoApiService.getPTZControl(req, resp);
	}
}
