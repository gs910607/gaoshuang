package com.jzsx.xlgc.videoMonitoring.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jzsx.xlgc.utils.Md5Util;
import com.jzsx.xlgc.videoMonitoring.Dao.VideoApiServiceDao;
import com.jzsx.xlgc.videoMonitoring.bean.VideoCamera;
import com.jzsx.xlgc.videoMonitoring.bean.VideoInfo;
import com.jzsx.xlgc.videoMonitoring.service.VideoApiService;
import com.jzsx.xlgc.videoMonitoring.service.VideoMonitoringConfig;
import com.jzsx.xlgc.videoTrain.controller.VideoTrainController;
import com.zte.ccs.os.meeting.util.RandomUtil;
import com.jzsx.xlgc.utils.HttpClientUtil;

@Service
@Transactional
public class VideoApiServiceImpl implements VideoApiService {

	private static final int timeOut = 2000;
	private static final String chartSet = "UTF-8";
	public static Logger logger = Logger.getLogger(VideoApiService.class);
	@Autowired
	private VideoApiServiceDao videoApiServiceDao ;
	
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
		String responseStr ;
		try {
			String saltValue = getSalt();

			Map<String, String> keys = new HashMap<String, String>();
			keys.put("username", getUserName());
			keys.put("password", Md5Util.encryption(getPassWord() + saltValue));
			keys.put("deivceid", "");
			keys.put("devicetype", "0");
			responseStr = HttpClientUtil.doHttpPost(getUserLoginUrl(), keys, timeOut, chartSet);
			
		}catch(Exception e) {
			responseStr = "{code : 0}";
			logger.debug("login-->fail" + e.getMessage());
		}
		return JSONObject.parseObject(responseStr);
	}

	public JSONObject realPlay(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String pointId = req.getParameter("pointId");
		String token = req.getParameter("token");
		String articulation = req.getParameter("articulation");
		Map<String, String> keys = new HashMap<String, String>();
		keys.put("pointId", pointId);
		keys.put("articulation", articulation);
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
	
	
	
	public void saveVideo(VideoInfo videoInfo) throws ServletException, IOException, NoSuchAlgorithmException{
		videoApiServiceDao.insertvideoinfo(videoInfo);
	}

	@Override
	public JSONObject getTopGroup(String token) {
		Map<String, String> keys = new HashMap<String, String>();
		keys.put("token", token);
		String responseStr = HttpClientUtil.doHttpPost(getTopGroupUrl(), keys, timeOut, chartSet);
		return JSONObject.parseObject(responseStr);
	}

	@Override
	public JSONObject getGroupById(String token, String id) throws ServletException, IOException {
		Map<String, String> keys = new HashMap<String, String>();
		keys.put("groupId", id);
		keys.put("token", token);
		String responseStr = HttpClientUtil.doHttpPost(getGroupUrl(), keys, timeOut, chartSet);
		return JSONObject.parseObject(responseStr);
	}

	@Override
	public List<VideoInfo> selectVideoInfo(VideoInfo videoInfo) {
		return videoApiServiceDao.selectVideoInfo(videoInfo);
	}

	@Override
	public void deletetVideoInfo() {
		videoApiServiceDao.deleteVideoInfo();
		
	}

	@Override
	public void updateVideoInfo(VideoInfo videoInfo) {
		videoApiServiceDao.updateVideoInfo(videoInfo);
		
	}

	@Override
	public String selectacount(VideoInfo videoInfo) {
		return videoApiServiceDao.selectacount(videoInfo);
	}

	@Override
	public List<VideoCamera> queryVideoCamera(VideoCamera videoCamera) {
		// TODO Auto-generated method stub
		return videoApiServiceDao.queryVideoCamera(videoCamera);
	}

	@Override
	public List<String> selectVideoAll() {
		// TODO Auto-generated method stub
		return videoApiServiceDao.selectVideoAll();
	}
	
	
}