package com.jzsx.xlgc.junit;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jzsx.xlgc.bean.VideoTrain;
import com.jzsx.xlgc.videoTrain.Service.VideoTrainService;
import com.zte.ccs.os.meeting.util.RandomUtil;

public class VideoTrainJunit extends basetest{
	@Autowired
	private VideoTrainService videoTrainService;
	@Test
	public void test(){
//		System.out.println("哈哈");
		
		List<VideoTrain> list = videoTrainService.queryVideoTrainList();

		if(list!=null){
			if(list.size()>0){
				for(VideoTrain v:list){
					System.out.println("保存后：视频培训ID："+v.getVideoId()+"  视频培训名称："+v.getVideoName()+"  视频培训地址:"+v.getVideoPath());
					System.out.println("        置顶："+v.getVideoTop()+"  视频培训类型："+v.getVideoTypeId());
					
				}
			}
		}
	}
	@Before
	public void insert(){
		List<VideoTrain> list=new ArrayList<VideoTrain>();
		VideoTrain videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("第一个");
		videoTrain.setVideoPath("http://www.w3school.com.cn/i/movie.mp4");
		videoTrain.setVideoTop(1);
		videoTrain.setVideoTypeId(1);
		list.add(videoTrain);
		
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("第二个");
		videoTrain.setVideoPath("../images/peixun-1.jpg");
		videoTrain.setVideoTypeId(2);
		list.add(videoTrain);
		
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("第三个");
		videoTrain.setVideoPath("../images/peixun-2.jpg");
		videoTrain.setVideoTypeId(3);
		list.add(videoTrain);
		
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导赴金湖县调研十九大安保维稳及网格化试点工作");
		videoTrain.setVideoTypeId(4);
		list.add(videoTrain);
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导调研网格化社会治理试点工作");
		videoTrain.setVideoTypeId(4);
		list.add(videoTrain);
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("盱眙法治护航“红碧白绿”“四色”产业发展");
		videoTrain.setVideoTypeId(4);
		list.add(videoTrain);
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导赴金湖县调研十九大安保维稳及网格化试点工作");
		videoTrain.setVideoTypeId(4);
		list.add(videoTrain);
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导调研网格化社会治理试点工作");
		videoTrain.setVideoTypeId(4);
		list.add(videoTrain);
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("盱眙法治护航“红碧白绿”“四色”产业发展");
		videoTrain.setVideoTypeId(4);
		list.add(videoTrain);
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导赴金湖县调研十九大安保维稳及网格化试点工作");
		videoTrain.setVideoTypeId(4);
		list.add(videoTrain);
		
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导调研法治为民办实事工程");
		videoTrain.setVideoTypeId(5);
		list.add(videoTrain);
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导赴涟水县调研群众安全感工作");
		videoTrain.setVideoTypeId(5);
		list.add(videoTrain);
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导赴淮阴区督查当前政法重点工作");
		videoTrain.setVideoTypeId(5);
		list.add(videoTrain);
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导赴淮阴区督查当前政法重点工作");
		videoTrain.setVideoTypeId(5);
		list.add(videoTrain);
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导赴淮阴区督查当前政法重点工作");
		videoTrain.setVideoTypeId(5);
		list.add(videoTrain);
		
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导调研法治为民办实事工程");
		videoTrain.setVideoTypeId(6);
		list.add(videoTrain);
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导赴涟水县调研群众安全感工作");
		videoTrain.setVideoTypeId(6);
		list.add(videoTrain);
		videoTrain=new VideoTrain();
		videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
		videoTrain.setVideoName("市领导赴淮阴区督查当前政法重点工作");
		videoTrain.setVideoTypeId(6);
		list.add(videoTrain);
		
		System.out.println("保存前数据数量"+list.size());
		for(VideoTrain v:list){
			System.out.println("保存前：视频培训ID："+v.getVideoId()+"  视频培训名称："+v.getVideoName()+"  视频培训地址:"+v.getVideoPath());
			System.out.println("        置顶："+v.getVideoTop()+"  视频培训类型："+v.getVideoTypeId());
			videoTrainService.insertActive(v);
		}
	}
}
