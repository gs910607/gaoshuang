package com.jzsx.xlgc.videoTrain.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jzsx.xlgc.bean.VideoType;
import com.jzsx.xlgc.videoTrain.Service.VideoTypeService;

@Controller
@RequestMapping("/videoTraining")
public class VideoTypeController {
	@Autowired
	private VideoTypeService videoTypeService;
	/**
	 * 首页加载数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoTypejoin.do")
	public Map<String,Object> test(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		List<VideoType> list = videoTypeService.queryVideoTypeList();
		map.put("List", list);
		map.put("status", 1);
		return map;
	}
	/**
	 * 模拟保存数据
	 * @param request
	 * @return
	 */
	@RequestMapping("/videotypeinsert.do")
	public String insert(HttpServletRequest request) {
		
		List<VideoType> list=new ArrayList<VideoType>();
		VideoType videoType=new VideoType();
		videoType.setVideoTypeId(1);
		videoType.setVideoTypeName("暂无");
		list.add(videoType);
		
		videoType=new VideoType();
		videoType.setVideoTypeId(2);
		videoType.setVideoTypeName("讲课场景");
		list.add(videoType);

		videoType=new VideoType();
		videoType.setVideoTypeId(3);
		videoType.setVideoTypeName("学院探讨");
		list.add(videoType);

		videoType=new VideoType();
		videoType.setVideoTypeId(4);
		videoType.setVideoTypeName("政法教育");
		list.add(videoType);

		videoType=new VideoType();
		videoType.setVideoTypeId(5);
		videoType.setVideoTypeName("党员在线");
		list.add(videoType);

		videoType=new VideoType();
		videoType.setVideoTypeId(6);
		videoType.setVideoTypeName("法制课堂");
		list.add(videoType);
		
		System.out.println("保存前数据数量"+list.size());
		for(VideoType v:list){
			System.out.println("保存前：--视频培训id："+v.getVideoTypeId()+"  --视频培训名称："+v.getVideoTypeName());
			videoTypeService.insertActive(v);
		}
		return "成功";
	}
}
