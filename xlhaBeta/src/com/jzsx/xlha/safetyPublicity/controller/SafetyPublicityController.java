package com.jzsx.xlha.safetyPublicity.controller;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.jzsx.xlha.bean.SafetyPublicity;
import com.jzsx.xlha.safetyPublicity.service.SafetyPublicityService;
import com.jzsx.xlha.util.RandomUtil;

@Controller
@RequestMapping("/safenessPublicity")
public class SafetyPublicityController {
	Logger logger=Logger.getLogger(SafetyPublicityController.class);
	@Autowired
	private SafetyPublicityService safetyPublicityService;
	/**
	 * 加载平安宣传首页数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/train.do")
	public Map<String,Object> train(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		List<SafetyPublicity> list = safetyPublicityService.querylist();
		map.put("list", list);
		return map;
	}
	/**
	 * 打开平安宣传训首页
	 * @param request
	 * @return
	 */
	@RequestMapping("/join.do")
	public String join(HttpServletRequest request ){
		
		return "redirect:/pages/safenessPublicity/safenessPublicityList.html";
	}
	/**
	 * 加载平安宣传列表数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/safetyPublicitylistjoin.do")
	public Map<String,Object> safetyPublicitylistjoin(HttpServletRequest request,
			@RequestParam(value="sizePage",required=false)String pageNum) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("safetyPublicitylistjoin.do 加载平安宣传列表数据  开始");
		SafetyPublicity safetyPublicity=new SafetyPublicity();
		String safetyPyName=request.getParameter("safetyPyName");
		if(!"".equals(safetyPyName) && safetyPyName!=null){
			safetyPublicity.setSafetyPyName(safetyPyName);
			logger.debug("参数 safetyPyName："+safetyPyName);
		}
		String starttime=request.getParameter("safetyPyStarttime");
		if(!"".equals(starttime) && starttime!=null){
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			Date time = null;
			try {
				time = sdf.parse(starttime);
				logger.debug("参数 starttime："+time);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			safetyPublicity.setSafetyPyStarttime(time);
		}
		String stoptime=request.getParameter("safetyPyhStoptime");
		if(!"".equals(stoptime) && stoptime!=null){
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			Date time = null;
			try {
				time = sdf.parse(stoptime);
				logger.debug("参数 stoptime："+time);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			safetyPublicity.setSafetyPyhStoptime(time);
		}
		String pagesiz=request.getParameter("pagesize");
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		int pagenum=10;
		if(!"".equals(pageNum) && pageNum!=null){
			pagenum=Integer.parseInt(pageNum);
		}
		map=safetyPublicityService.querySafeMapAll(safetyPublicity, pagesize, pagenum);
//		map=safetyPublicityService.querylistAll(safetyPublicity, pagesize, 5);
//		System.out.println(list);
//		map.put("list", list);
		logger.debug("加载平安宣传列表数据  结束");
		return map;
	}
	/**
	 * 加载平安宣传列表数据 app接口
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/safetyPublicityAppjoin.do")
	public Map<String,Object> safetyPublicityAppjoin(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("safetyPublicityAppjoin.do 加载平安宣传列表数据 app接口  开始");
		SafetyPublicity safetyPublicity=new SafetyPublicity();
		try {
			String pagesiz=request.getParameter("pagesize");
			int pagesize=0;
			if(!"".equals(pagesiz) && pagesiz!=null){
				pagesize=Integer.parseInt(pagesiz);
			}
			String pagenu=request.getParameter("pagenum");
			int pagenum=0;
			if(!"".equals(pagenu) && pagenu!=null){
				pagenum=Integer.parseInt(pagenu);
			}
			map=safetyPublicityService.querySafeMapAll(safetyPublicity, pagesize, pagenum);
			map.put("status", 1);
			map.put("msg", "成功");
			logger.debug("加载平安宣传列表数据 app接口  结束");
		} catch (NumberFormatException e) {
			map.put("status", -1);
			map.put("msg", "失败");
			logger.debug("加载平安宣传列表数据 app接口  异常",e);
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 根据平安宣传列表数据ID做简单的删除
	 * 后期不用了
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/deletesafetyPublicity.do")
	public Map<String,Object> deletesafetyPublicity(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("deletesafetyPublicity.do 根据平安宣传列表数据ID做简单的删除  开始");
		String safetyPyId=request.getParameter("safetyPyId");
		if(!"".equals(safetyPyId) || !safetyPyId.equals(null)){
			try {
				safetyPublicityService.deleteById(safetyPyId);
				map.put("success", "删除成功");
				map.put("status", 0);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				map.put("success", "删除失败");
				map.put("status", -1);
				e.printStackTrace();
			}
		}
		return map;
	}
	/**
	 * 记录浏览记录
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/safetyPublicityVote.do")
	public Map<String, Object> safetyPublicityVote(HttpServletRequest request){
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("safetyPublicityVote.do 记录浏览记录  开始");
		String safetyPyId=request.getParameter("safetyPyId");
		logger.debug("参数  safetyPyId："+safetyPyId);
		if(!"".equals(safetyPyId) || !safetyPyId.equals(null)){
			try {
				SafetyPublicity safetyPublicity=new SafetyPublicity();
				safetyPublicity.setSafetyPyId(safetyPyId);
				safetyPublicity.setSafetyPyViewcount("1");
				int count=safetyPublicityService.updateActiveSafeByViewCount(safetyPublicity);
//				safetyPublicityService.updateActiveByViewCount(safetyPublicity);
				map.put("success", "查看累加成功");
				map.put("status", 0);
				logger.debug("记录浏览记录  结束");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				map.put("success", "查看累加失败");
				map.put("status", -1);
				logger.debug("记录浏览记录  异常",e);
				e.printStackTrace();
			}
		}
		return map;
	}
	/**
	 * 打开视频培训类型信息详情页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/safetyPublicityDetailjoin.do")
	public String videotrainDetailjoin(HttpServletRequest request){
		String safetyPyId=request.getParameter("safetyPyId");
		if(!"".equals(safetyPyId) && safetyPyId!=null){
			return "redirect:/pages/safenessPublicity/safenessPublicityDetails.html?safetyPyId="+safetyPyId;
		}else{
			return "redirect:/pages/safenessPublicity/safenessPublicityDetails.html";
		}
	}
	/**
	 * 根据视频培训ID查找数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/safetyPublicityDetail.do")
	public Map<String,Object> videoTrainDetail(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("safetyPublicityDetail.do 根据视频培训ID查找数据  开始");
		String safetyPyId=request.getParameter("safetyPyId");
		logger.debug("参数  safetyPyId："+safetyPyId);
		if(!"".equals(safetyPyId) || !safetyPyId.equals(null)){
			SafetyPublicity safetyPublicity = safetyPublicityService.querySafeById(safetyPyId);
//			SafetyPublicity safetyPublicity = safetyPublicityService.queryById(safetyPyId);
			map.put("SafetyPublicity", safetyPublicity);
		}
//		Properties prop=new Properties();
//		try {
//			prop.load(this.getClass().getResourceAsStream("/safenessPublicity.properties"));
//			String publictyurl=prop.getProperty("safe_Publicity_path");
//			map.put("path", publictyurl);
//		} catch (IOException e) {
			// TODO Auto-generated catch block
//			map.put("path", null);
//			e.printStackTrace();
//		}
		map.put("status", 0);
		logger.debug("根据视频培训ID查找数据  结束");
		return map;
	}
	/**
	 * 平安宣传保存
	 * 后期不用
	 * @param file
	 * @param request
	 * @param safetyPublicity
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/safetyPublicitySave.do")
	public Map<String,Object> videoTrainSave(@RequestParam(value="file",required=false)MultipartFile file, HttpServletRequest request,SafetyPublicity safetyPublicity) {
		Map<String,Object> map  = new HashMap<String, Object>();
//		logger.debug("safetyPublicityDetail.do 根据视频培训ID查找数据  开始");
		try {
			if(file!=null){
				String url = uploadImage(file, request);
				safetyPublicity.setSafetyPyPath(url);
			}
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		String safetyPyId=safetyPublicity.getSafetyPyId();
		try {
			if(!"".equals(safetyPyId) && !safetyPyId.equals("null")){
				safetyPublicityService.updateActive(safetyPublicity);
//			VideoTrain videoTrain = videoTrainService.queyVideoTrainById(videoId);
//			System.out.println("videoTrain:"+videoTrain);
//			map.put("videoTrain", videoTrain);
			}else{
				safetyPublicity.setSafetyPyTime(new Date());
				safetyPublicity.setSafetyPyId(RandomUtil.RanIntAndString(28));
				safetyPublicityService.insertActive(safetyPublicity);
			}
			map.put("success", "保存成功！");
			map.put("status", 0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("success", "保存失败！");
			map.put("status", -1);
			e.printStackTrace();
		}
		System.out.println("videoId:"+safetyPyId+"map:"+map);
		return map;
	}
	public String uploadImage(MultipartFile file, HttpServletRequest request) throws Exception {
		logger.debug("文件上传  开始");
		String filename = file.getOriginalFilename();
		String name = UUID.randomUUID() + "." + filename.substring(filename.lastIndexOf(".") + 1);
		Properties prop=new Properties();
		prop.load(this.getClass().getResourceAsStream("/safenessPublicity.properties"));
		String publictyurl=prop.getProperty("safe_Publicity_url");
		System.out.println("safe_Publicity_url:"+publictyurl);
		String path = request.getSession().getServletContext().getRealPath(publictyurl);
		
		String url = request.getContextPath() + "/upload/video/" + name;
		System.out.println("path:"+path);
		System.out.println("url:"+url);
		path = publictyurl + "\\" + name;
		File file2 = new File(path);
		System.out.println("safe_path:"+file2);
		if(!file2.exists()){
			file2.mkdirs();
		}
		file.transferTo(file2);
		logger.debug("文件上传  结束");
		return name;
	}
}
