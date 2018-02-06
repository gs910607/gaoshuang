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
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.jzsx.xlgc.utils.HttpClientUtil;
import com.jzsx.xlgc.videoMonitoring.bean.VideoInfo;
import com.jzsx.xlgc.videoMonitoring.service.VideoApiService;
import com.zte.ccs.os.meeting.util.RandomUtil;

@Controller
@RequestMapping("/monitoring")
public class MonitoringController {
	//用于同步数据时存放本地查询的所有视频数据
	private List<String> listinfo;
	
	public static Logger logger = Logger.getLogger(MonitoringController.class);
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
	
	/**
	 * 视频数据的删除 
	 * @param VideoInfo
	 * @return	
	 */
	@ResponseBody
	@RequestMapping("/deleteInfo.do")
	protected HashMap deleteInfo() {
		HashMap<String, Object> map = new HashMap();
		try {
			videoApiService.deletetVideoInfo();
			map.put("status", 1);
		}catch(Exception e) {
			map.put("status", 0);
		}
		return map ;
		
		
	}
	
	/**
	 * 视频数据的更新 
	 * @param VideoInfo
	 * @return	
	 */
	@ResponseBody
	@RequestMapping("/updateInfo.do")
	protected HashMap updateInfo(VideoInfo videoInfo ,HttpServletRequest req, HttpServletResponse resp) {
		HashMap<String, Object> map = new HashMap();
		try {
			videoApiService.updateVideoInfo(videoInfo);
			map.put("status", 1);
		}catch(Exception e) {
			map.put("status", 0);
		}
		return map ;
		
		
	}
	
	/**
	 * 视频数据的查看 
	 * @param VideoInfo
	 * @return	
	 */
	@ResponseBody
	@RequestMapping("/selectInfo.do")
	protected HashMap selectInfo(VideoInfo videoInfo ,HttpServletRequest req, HttpServletResponse resp) {
		logger.debug("selectInfoparams:" +new Gson().toJson(videoInfo));
		HashMap<String, Object> map = new HashMap();
		try {
			if(videoInfo.getPagesize() > 0) {
				if(videoInfo.getPagenumber() == 0 || videoInfo.getPagenumber() == 1) {
					videoInfo.setPagestartnum(0);
					videoInfo.setPageendnum(videoInfo.getPagesize());
				}else {
					videoInfo.setPagestartnum((videoInfo.getPagenumber()-1)*videoInfo.getPagesize());
					videoInfo.setPageendnum(videoInfo.getPagestartnum() + videoInfo.getPagesize());
				}
				String count = videoApiService.selectacount(videoInfo);
				map.put("total",new Integer(count));
				logger.debug("count" + count);
				
			}
			List<VideoInfo> list = videoApiService.selectVideoInfo(videoInfo);
			logger.debug("selectInforeturn:" + new Gson().toJson(list));
			map.put("status",1);
			map.put("list",list);
			
		}catch(Exception e) {
			map.put("status",0);
		}
		
		return map ;
	}
	
	/**
	 * 视频数据的添加
	 * @param 
	 * @return
	 */
	@RequestMapping("/saveVideoInfo.do")
	@ResponseBody
	protected HashMap saveVideoInfo(HttpServletRequest req, HttpServletResponse resp) throws NoSuchAlgorithmException, ServletException, IOException {
		HashMap<String, Object> map = new HashMap();
		try {
			listinfo = videoApiService.selectVideoAll();
			logger.debug("listinfo:"+new Gson().toJson(listinfo));
			JSONObject login = videoApiService.login(req, resp);
			String loginData = login.getString("data");
			String token = JSONObject.parseObject(loginData).getString("token");
			if(token != null) {
				JSONObject responseTopjson = videoApiService.getTopGroup(token);
				//查询下级分组列表成功
				if(responseTopjson.getString("code").equals("1")) {
					JSONObject topData = responseTopjson.getJSONObject("data");
					JSONArray groups = topData.getJSONArray("groups");
					//for(int i = 0 ; groups.size() > i ; i++) {
						JSONObject groupdata = groups.getJSONObject(0);
						String groupId = groupdata.getString("groupId");
						getGroup(groupId,token);
					//}
				}
			}
			map.put("status",1);
		}catch(Exception e) {
			map.put("status",0);
		}
		return map ;
		
	}
	
	//循环获取分组列表
	public void getGroup(String groupId,String token) throws ServletException, IOException, NoSuchAlgorithmException {
		JSONObject responseGroupJson = videoApiService.getGroupById(token,groupId);
		if(responseGroupJson.getString("code").equals("1")) {
			JSONObject groupDataJson = responseGroupJson.getJSONObject("data");
			//判断是否是点位层
			if(groupDataJson.getJSONObject("group").getInteger("count") > 0) {
				JSONArray groupDatas = groupDataJson.getJSONObject("group").getJSONArray("groups");
				for(int i = 0 ; groupDatas.size() > i ; i++) {
					getGroup(groupDatas.getJSONObject(i).getString("groupId"),token);
				}
			}else {
				JSONArray pointDatas = groupDataJson.getJSONObject("point").getJSONArray("points");
				getPoint(pointDatas);
			}
			
		} 
	}
		
	//对点位层的处理
	public void getPoint(JSONArray pointDatas) throws NoSuchAlgorithmException, ServletException, IOException {
		for(int i = 0 ; pointDatas.size() > i ; i++) {
			String id = pointDatas.getJSONObject(i).getString("pointId");
			if(listinfo.size() != 0) {
				Boolean bl = listinfo.contains(id);
				if(!bl) {
					String name = pointDatas.getJSONObject(i).getString("pointName");
					String code = pointDatas.getJSONObject(i).getString("groupId");
					String status = pointDatas.getJSONObject(i).getString("status");
					VideoInfo videoInfo =  new VideoInfo();
					videoInfo.setVideoinfoId(RandomUtil.RanIntAndString(28));
					videoInfo.setVideoinfovideoId(id);
					videoInfo.setVideoinfoName(name);
					//videoInfo.setVideoinfoCode(code);
					videoInfo.setVideoinfoStatus(status);
					//videoInfo.setVideoinfoType(1);
					logger.debug("saveVideoInfo.params:"+new Gson().toJson(videoInfo));
					videoApiService.saveVideo(videoInfo);
				}
			}
		}
		
	}
}
