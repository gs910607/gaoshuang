package com.jzsx.xlgc.junit;

import java.util.ArrayList;
import java.util.List;




import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jzsx.xlgc.bean.VideoType;
import com.jzsx.xlgc.videoTrain.Service.VideoTypeService;

public class VideoTypeJunit extends basetest{
	@Autowired
	private VideoTypeService videoTypeService;
//	private VideoTrainService videoTrainService;
	@After
	public void test(){
		System.out.println("哈哈");
		List<VideoType> list = videoTypeService.queryVideoTypeList();
		if(list!=null){
			if(list.size()>0){
				for(VideoType v:list){
					System.out.println("保存后  ————视频培训id："+v.getVideoTypeId()+"  --视频培训名称："+v.getVideoTypeName());
				}
			}
		}
//		Map<String,Object> map  = new HashMap<String, Object>();
//		map.put("List", videoTrainService.queryVideoTrainList());
//		System.out.println(map);
	}
	@Before
	public void insert(){
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
	}
	@Test
	public void tes(){
		System.out.println("开始");
	}
}
