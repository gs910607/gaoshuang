package com.jzsx.xlgc.videoMonitoring.service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import com.alibaba.fastjson.JSONObject;

public interface VideoApiService {
	public JSONObject getTopGroup(HttpServletRequest req, HttpServletResponse resp);

	public JSONObject login(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException, NoSuchAlgorithmException;

	public JSONObject realPlay(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException;

	public JSONObject getGroupById(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException;

	public JSONObject getPTZControl(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException;
}
