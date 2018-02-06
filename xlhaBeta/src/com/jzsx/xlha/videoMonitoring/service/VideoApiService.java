package com.jzsx.xlha.videoMonitoring.service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.jzsx.xlha.videoMonitoring.bean.VideoCamera;
import com.jzsx.xlha.videoMonitoring.bean.VideoInfo;

public interface VideoApiService {
	public JSONObject getTopGroup(HttpServletRequest req, HttpServletResponse resp);

	public JSONObject login(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException, NoSuchAlgorithmException;

	public JSONObject realPlay(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException;

	public JSONObject getGroupById(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException;

	public JSONObject getPTZControl(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException;
	
	public JSONObject getTopGroup(String token);
	
	public JSONObject getGroupById(String token, String id)
			throws ServletException, IOException;
	
	public void saveVideo(VideoInfo videoInfo) throws ServletException, IOException, NoSuchAlgorithmException;
	
	public List<VideoInfo> selectVideoInfo(VideoInfo videoInfo);
	
	public void deletetVideoInfo();
	
	public void updateVideoInfo(VideoInfo videoInfo);
	
	public String selectacount(VideoInfo videoInfo);
	
	/**
	 * 获取所属区域设备信息
	 * @param videoCamera
	 * @return
	 */
	public List<VideoCamera> queryVideoCamera(VideoCamera videoCamera);
}
