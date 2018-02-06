package com.jzsx.xlha.videoTrain.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jzsx.xlha.bean.VideoType;
import com.jzsx.xlha.videoTrain.dao.VideoTypeDao;
import com.jzsx.xlha.videoTrain.service.VideoTypeService;

@Service
@Transactional
public class VideoTypeServiceImpl implements VideoTypeService{

	@Autowired
	private VideoTypeDao videoTypeDao;
	@Override
	public List<VideoType> queryVideoTypeList() {
		// TODO Auto-generated method stub
		return videoTypeDao.queryVideoTypeList();
	}
	@Override
	public void insertActive(VideoType vtype) {
		// TODO Auto-generated method stub
		videoTypeDao.insertActive(vtype);
	}
	@Override
	public List<VideoType> queryVideoTypeByIdNotEqual(int videoTypeId) {
		// TODO Auto-generated method stub
		return videoTypeDao.queryVideoTypeByIdNotEqual(videoTypeId);
	}

}
