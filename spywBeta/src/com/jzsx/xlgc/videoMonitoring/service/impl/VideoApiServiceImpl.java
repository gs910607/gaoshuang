package com.jzsx.xlgc.videoMonitoring.service.impl;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import com.alibaba.fastjson.JSONObject;
import com.jzsx.xlgc.utils.Md5Util;
import com.jzsx.xlgc.videoMonitoring.service.VideoApiService;
import com.jzsx.xlgc.videoMonitoring.service.VideoMonitoringConfig;
import com.jzsx.xlgc.utils.HttpClientUtil;

@Service
@Transactional
public class VideoApiServiceImpl implements VideoApiService {

	private static final int timeOut = 2000;
	private static final String chartSet = "UTF-8";

	private String getUserName() {
		return VideoMonitoringConfig.getValue("userName", "test");
	}

	private String getPassWord() {
		return VideoMonitoringConfig.getValue("passWord", "test");
	}

	private String getSaltUrl() {
		return VideoMonitoringConfig.getValue("saltUrl", "http://58.213.85.4:4112/api/getSaltValue.php");
	}

	private String getTopGroupUrl() {
		return VideoMonitoringConfig.getValue("topGroupUrl", "http://58.213.85.4:4112/api/getGroups.php");
	}

	private String getUserLoginUrl() {
		return VideoMonitoringConfig.getValue("userLoginUrl", "http://58.213.85.4:4112/api/UserLogin.php");
	}

	private String getRealPlayUrl() {
		return VideoMonitoringConfig.getValue("realPlayUrl", "http://58.213.85.4:4112/api/RealPlay.php");
	}

	private String getGroupUrl() {
		return VideoMonitoringConfig.getValue("getGroupUrl", "http://58.213.85.4:4112/api/getGroupById.php");
	}

	private String getPTZControlUrl() {
		return VideoMonitoringConfig.getValue("ptzControlUrl", "http://58.213.85.4:4112/api/PTZCtrl.php");
	}

	private String getSalt() {
		String salt = "";
		Map<String, String> keys = new HashMap<String, String>();
		keys.put("username", getUserName());
		String responseStr = HttpClientUtil.doHttpPost(getSaltUrl(), keys, timeOut, chartSet);
		JSONObject jsStr = JSONObject.parseObject(responseStr);
		String status = jsStr.getString("code");
		if (status.equals("1")) {
			salt = jsStr.getJSONObject("data").getString("saltValue");
		}
		return salt;
	}

	public JSONObject getTopGroup(HttpServletRequest req, HttpServletResponse resp) {
		String token = req.getParameter("token");
		Map<String, String> keys = new HashMap<String, String>();
		keys.put("token", token);
		String responseStr = HttpClientUtil.doHttpPost(getTopGroupUrl(), keys, timeOut, chartSet);
		return JSONObject.parseObject(responseStr);
	}

	public JSONObject login(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException, NoSuchAlgorithmException {
		String saltValue = getSalt();

		Map<String, String> keys = new HashMap<String, String>();
		keys.put("username", getUserName());
		keys.put("password", Md5Util.encryption(getPassWord() + saltValue));
		keys.put("deivceid", "");
		keys.put("devicetype", "0");
		String responseStr = HttpClientUtil.doHttpPost(getUserLoginUrl(), keys, timeOut, chartSet);
		return JSONObject.parseObject(responseStr);
	}

	public JSONObject realPlay(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String pointId = req.getParameter("pointId");
		String token = req.getParameter("token");
		Map<String, String> keys = new HashMap<String, String>();
		keys.put("pointId", pointId);
		keys.put("articulation", "2");
		keys.put("token", token);
		String responseStr = HttpClientUtil.doHttpPost(getRealPlayUrl(), keys, timeOut, chartSet);
		return JSONObject.parseObject(responseStr);
	}

	public JSONObject getGroupById(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String groupId = req.getParameter("groupId");
		String token = req.getParameter("token");
		Map<String, String> keys = new HashMap<String, String>();
		keys.put("groupId", groupId);
		keys.put("token", token);
		String responseStr = HttpClientUtil.doHttpPost(getGroupUrl(), keys, timeOut, chartSet);
		return JSONObject.parseObject(responseStr);
	}

	public JSONObject getPTZControl(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String ptzCtrlType = req.getParameter("ptzCtrlType");
		String token = req.getParameter("token");
		String pointId = req.getParameter("pointId");
		String ptzCtrlValue = req.getParameter("ptzCtrlValue");
		Map<String, String> keys = new HashMap<String, String>();
		keys.put("ptzCtrlType", ptzCtrlType);
		keys.put("pointId", pointId);
		keys.put("token", token);
		keys.put("ptzCtrlValue", ptzCtrlValue);
		String responseStr = HttpClientUtil.doHttpPost(getPTZControlUrl(), keys, timeOut, chartSet);
		return JSONObject.parseObject(responseStr);
	}
}