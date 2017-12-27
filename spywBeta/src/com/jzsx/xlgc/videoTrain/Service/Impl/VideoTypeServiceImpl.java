package com.jzsx.xlgc.videoTrain.Service.Impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;








import com.jzsx.xlgc.bean.VideoType;
import com.jzsx.xlgc.videoTrain.Dao.VideoTypeDao;
import com.jzsx.xlgc.videoTrain.Service.VideoTypeService;

@Service
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
