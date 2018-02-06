package com.jzsx.xlha.legalPublicity.controller;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Strings;
import com.jzsx.xlha.bean.TLegalPublicity;
import com.jzsx.xlha.bean.VideoTrain;
import com.jzsx.xlha.legalPublicity.service.LegalPublicityService;
import com.jzsx.xlha.util.Application;
import com.jzsx.xlha.util.IDUtils;
import com.jzsx.xlha.util.ResultMessage;
import com.jzsx.xlha.videoTrain.service.VideoTrainService;

@Controller
@RequestMapping("/legal")
public class LegalPublicityController {
	Logger logger=Logger.getLogger(LegalPublicityController.class);
	@Autowired
	private LegalPublicityService service;
	@Autowired
	private VideoTrainService videoTrainService;
	/**
	 * 这个不需要
	 * @param file
	 * @param publicity
	 * @return
	 */
	@RequestMapping("/addLegal")
	@ResponseBody
	public ResultMessage addLegal(@RequestParam(value = "file", required = false) MultipartFile file,
			TLegalPublicity publicity) {
		ResultMessage message = new ResultMessage();
		try {
			if (Strings.isNullOrEmpty(publicity.getcLegalId())) {
				publicity.setcLegalId(String.valueOf(IDUtils.genItemId()));
				publicity.setcLegalCreatetime(new Date());
				publicity.setcForeignUserid("1");
				publicity.setcLegalCreate("测试");
				publicity.setcLegalEditor("测试");
				String filename = uploadFile(file, publicity.getcLegalType().intValue());
				if (!Strings.isNullOrEmpty(String.valueOf(publicity.getcLegalType()))
						&& publicity.getcLegalType().intValue() == 0) {
					publicity.setcLegalImage(filename);
				} else {
					publicity.setcLegalVideo(filename);
				}
				int i = service.addLegal(publicity, true);
				if (i == 1) {
					message.setMsg("添加成功");
					message.setStatus(String.valueOf(i));
				} else {
					message.setMsg("添加失败");
					message.setStatus(String.valueOf(i));
				}
				return message;
			}
			if (file != null) {
				String filename = uploadFile(file, publicity.getcLegalType().intValue());
				if (Strings.isNullOrEmpty(String.valueOf(publicity.getcLegalType()))
						&& publicity.getcLegalType().intValue() == 0) {
					publicity.setcLegalImage(filename);
				} else {
					publicity.setcLegalVideo(filename);
				}
				publicity.setcLegalCreatetime(new Date());
				int i = service.addLegal(publicity, false);
				if (i == 1) {
					message.setMsg("修改成功");
					message.setStatus(String.valueOf(i));
				} else {
					message.setMsg("修改失败");
					message.setStatus(String.valueOf(i));
				}
			} else {
				publicity.setcLegalCreatetime(new Date());
				int i = service.addLegal(publicity, false);
				if (i == 1) {
					message.setMsg("修改成功");
					message.setStatus(String.valueOf(i));
				} else {
					message.setMsg("修改失败");
					message.setStatus(String.valueOf(i));
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return message;

	}
	/**
	 * 视频培训类别数据根据id记录浏览量
	 * @param pages
	 * @param publicity
	 * @return
	 */
	@RequestMapping(value = "/legVotePlus", produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String,Object> legVotePlus(String cLegalId) {
		logger.debug("legVotePlus.do 视频培训类别数据根据id记录浏览量 开始");
		logger.debug("参数  cLegalId："+cLegalId);
//		String user = "1";
//		Result<TLegalPublicity> result = service.getPageList(pages, publicity, user);
		Map<String,Object> map=new HashMap<String, Object>();
		VideoTrain vtrain=new VideoTrain();
		vtrain.setVideoTypeId(7);
		vtrain.setVideoId(cLegalId);
		int count = videoTrainService.updateVotePlus(vtrain);
		logger.debug("视频培训类别数据根据id记录浏览量 结束");
		return map;
	}
	/**
	 * 视频培训类别数据根据条件展示列表
	 * @param pages
	 * @param publicity
	 * @return
	 */
	@RequestMapping(value = "/getPageList", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getPageList(
			@RequestParam(defaultValue = "1") Integer pages, 
			TLegalPublicity publicity,
			@RequestParam(value="sizePage",required=false)String pageNum
			) {
//		String user = "1";
		logger.debug("getPageList.do 视频培训类别数据根据条件展示列表 开始");
//		Result<TLegalPublicity> result = service.getPageList(pages, publicity, user);
		int pagenum=10;
		if(!"".equals(pageNum) && pageNum!=null){
			pagenum=Integer.parseInt(pageNum);
		}
		Map<String, Object> map = videoTrainService.queryLegMapByAll(publicity, pages, pagenum);
		List<TLegalPublicity> list = (List<TLegalPublicity>) map.get("list");
		logger.debug("视频培训类别数据根据条件展示列表 结束");
		return JSON.toJSONString(map);
	}

	/**
	 * 视频培训类别数据根据id查询数据
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getLegalById", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getLegalById(String id) {
		logger.debug("getLegalById.do 视频培训类别数据根据id查询数据 开始");
		logger.debug("参数  id："+id);
		TLegalPublicity publicity=videoTrainService.queryLegById(id);
//		TLegalPublicity publicity = service.getLegalById(id);
		logger.debug("视频培训类别数据根据id查询数据 结束");
		return JSON.toJSONString(publicity);
	}
	/**
	 * 这个不需要
	 * @param id
	 * @return
	 */
	@RequestMapping("/deleteLegal")
	@ResponseBody
	public ResultMessage deleteLegal(String id) {
		if (Strings.isNullOrEmpty(id)) {
			ResultMessage message = new ResultMessage("参数错误", "0");
			return message;
		}
		int i = service.deleteLegal(id);
		String msg = i == 1 ? ("删除成功") : ("删除失败");
		String status = i == 1 ? ("1") : ("0");
		return new ResultMessage(msg, status);
	}

	/**
	 * 这个不需要
	 * @param file
	 * @param type
	 * @return
	 * @throws Exception
	 */
	public String uploadFile(MultipartFile file, Integer type) throws Exception {
		String filename = file.getOriginalFilename();
		filename = UUID.randomUUID() + "." + filename.substring(filename.lastIndexOf(".") + 1);
		String path = type == 0 ? Application.imgPath + filename : Application.videoPath + filename;
		File src = new File(path);
		file.transferTo(src);
		return filename;
	}
	
	/**
	 * 获取视频培训中法制宣传的类别数据提供给app接口
	 * @param pages
	 * @param sizes
	 * @param code
	 * @return
	 */
	@RequestMapping(value = "/appGetPageList", produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, Object> appGetPageList(Integer pages, Integer sizes,String code) {
		Map<String, Object> map=new HashMap<String, Object>();
		logger.debug("appGetPageList.do 获取视频培训中法制宣传的类别数据提供给app接口 开始");
		logger.debug("参数  code："+code);
		if(pages==null||sizes==null||Strings.isNullOrEmpty(code)){
			map.put("msg", Application.MSG_ERROR);
			map.put("status", Application.STATUS_ERROR);
		}else{
			VideoTrain vtrain=new VideoTrain();
			vtrain.setVideoCode(code);
			vtrain.setVideoTypeId(7);
			 map = videoTrainService.queryVideoTrainListBytype(vtrain, pages, sizes);
			 map.put("msg", "成功");
			map.put("status", Application.STATUS_ADD_SUCCESS);
		}
		logger.debug("获取视频培训中法制宣传的类别数据提供给app接口 结束");
		return map;
//			return new AppResult(Application.MSG_ERROR, Application.STATUS_ERROR);
//		Result<TLegalPublicity> result = service.appGetPageList(pages, sizes, code);
//		return new AppResult("成功", Application.STATUS_ADD_SUCCESS, resu);
	}
	/**
	 * 根据查看视频培训中法制宣传的类别的数据浏览数提供app接口
	 * @param videoId
	 * @return
	 */
	@RequestMapping(value = "/appVotePlusJson", produces = "application/json;charset=utf-8")
	@ResponseBody
	public Map<String, Object> appVotePlusJson(String videoId) {
		Map<String, Object> map=new HashMap<String, Object>();
		logger.debug("appVotePlusJson.do 根据查看视频培训中法制宣传的类别的数据浏览数提供app接口 开始");
		logger.debug("参数  videoId："+videoId);
		try {
			if(Strings.isNullOrEmpty(videoId)){
				map.put("msg", Application.MSG_ERROR);
				map.put("status", 0);
			}else{
				VideoTrain video = videoTrainService.queyVideoTrainById(videoId);
				if(video==null){
					map.put("msg", "参数错误，无对应数据");
					map.put("status", -1);
				}else{
					int count=videoTrainService.updateVotePlus(video);
					if(count==1){
						map.put("msg", "成功");
						map.put("status", 1);
					}else{
						map.put("msg", "失败");
						map.put("status", -2);
					}
				}
			}
			logger.debug("根据查看视频培训中法制宣传的类别的数据浏览数提供app接口 结束");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("msg", "操作异常");
			map.put("status", -3);
			logger.info("根据查看视频培训中法制宣传的类别的数据浏览数提供app接口 异常",e);
			e.printStackTrace();
		}
		return map;
	}
	
}
