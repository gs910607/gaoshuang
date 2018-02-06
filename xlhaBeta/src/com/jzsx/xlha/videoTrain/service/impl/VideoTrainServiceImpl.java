package com.jzsx.xlha.videoTrain.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzsx.xlha.bean.TLegalPublicity;
import com.jzsx.xlha.bean.VideoTrain;
import com.jzsx.xlha.videoTrain.dao.VideoTrainDao;
import com.jzsx.xlha.videoTrain.service.VideoTrainService;




@Service
@Transactional
public class VideoTrainServiceImpl implements VideoTrainService{

	@Autowired
	private VideoTrainDao videoTrainDao; 
	@Override
	public List<VideoTrain> queryVideoTrainList() {
		// TODO Auto-generated method stub
		return videoTrainDao.queryVideoTrainList();
	}
	@Override
	public void insertActive(VideoTrain vtrain) {
		// TODO Auto-generated method stub
		videoTrainDao.insertActive(vtrain);
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
	public int updateVotePlus(VideoTrain vtrain) {
		// TODO Auto-generated method stub
		return videoTrainDao.updateVotePlus(vtrain);
	}
	@Override
	public Map<String, Object> queryLegMapByAll(TLegalPublicity legalPublicity,
			int pagesize, int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pagesize,pageNum );
		List<TLegalPublicity> list = videoTrainDao.queryLegByAll(legalPublicity);
		PageInfo<TLegalPublicity> pageinfo=new PageInfo<TLegalPublicity>(list);
		hashmap.put("num", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		return hashmap;
	}
	@Override
	public List<TLegalPublicity> queryLegListByAll(
			TLegalPublicity legalPublicity) {
		// TODO Auto-generated method stub
		return videoTrainDao.queryLegByAll(legalPublicity);
	}
	@Override
	public TLegalPublicity queryLegById(String cLegalId) {
		// TODO Auto-generated method stub
		return videoTrainDao.queryLegById(cLegalId);
	}

}
