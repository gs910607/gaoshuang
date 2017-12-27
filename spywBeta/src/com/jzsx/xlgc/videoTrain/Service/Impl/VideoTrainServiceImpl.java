package com.jzsx.xlgc.videoTrain.Service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.bean.VideoTrain;
import com.jzsx.xlgc.videoNeighborhood.bean.NeighChart;
import com.jzsx.xlgc.videoTrain.Dao.VideoTrainDao;
import com.jzsx.xlgc.videoTrain.Service.VideoTrainService;




@Service
public class VideoTrainServiceImpl implements VideoTrainService{

	@Autowired
	private VideoTrainDao videoTrainDao; 
	@Override
	public List<VideoTrain> queryVideoTrainList() {
		// TODO Auto-generated method stub
		return videoTrainDao.queryVideoTrainList();
	}
	@Override
	public int insertActive(VideoTrain vtrain) {
		// TODO Auto-generated method stub
		int i = videoTrainDao.insertActive(vtrain);
		return i;
	}
	@Override
	public Map<String, Object> queryVideoTrainListBytype(VideoTrain vtrain,int pageSize,int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pageSize,pageNum );
		System.out.println("pageNum:"+pageNum+"----pageSize:"+pageSize);
		System.out.println("typeid:"+vtrain.getVideoTypeId()+"name:"+vtrain.getVideoName());
		String ucode=vtrain.getVideoCode();
		System.out.println("ucode:"+ucode);
		List<VideoTrain> list = videoTrainDao.queryVideoTrainListBytype(vtrain);
		
		PageInfo<VideoTrain> pageinfo=new PageInfo<VideoTrain>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
//		hashmap.put("total", 3);
//		hashmap.put("list", list);
		System.out.println("hh:"+list);
		System.out.println("total:"+pageinfo.getTotal()+"list:"+pageinfo.getList());
		return hashmap;
	}
	@Override
	public void deleteVideoTrainById(String videoId) {
		// TODO Auto-generated method stub
		videoTrainDao.deleteVideoTrainById(videoId);
	}
	@Override
	public VideoTrain queyVideoTrainById(String videoId) {
		// TODO Auto-generated method stub
		return videoTrainDao.queyVideoTrainById(videoId);
	}
	@Override
	public void updateActive(VideoTrain vtrain) {
		// TODO Auto-generated method stub
		videoTrainDao.updateActive(vtrain);
	}
	@Override
	public List<VideoTrain> queryVideoTrainByCode(VideoTrain vtrain) {
		// TODO Auto-generated method stub
		return videoTrainDao.queryVideoTrainListBytype(vtrain);
	}
	@Override
	public List<VideoTrain> queryVideoTrainByTypeId(int videoTypeId) {
		// TODO Auto-generated method stub
		return videoTrainDao.queryVideoTrainByTypeId(videoTypeId);
	}
	@Override
	public List<NeighChart> queryVideoTrainByChartCode(NeighChart neighChart) {
		// TODO Auto-generated method stub
		return videoTrainDao.queryVideoTrainByChartCode(neighChart);
	}
	@Override
	public List<NeighChart> queryVideoTrainByChartType(NeighChart neighChart) {
		// TODO Auto-generated method stub
		return videoTrainDao.queryVideoTrainByChartType(neighChart);
	}
	@Override
	public List<TVideoConference> queryByCodeOfconfer(String code) {
		// TODO Auto-generated method stub
		return videoTrainDao.queryByCodeOfconfer(code);
	}

}
