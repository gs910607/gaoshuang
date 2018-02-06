package com.jzsx.xlgc.videoNeighborhood.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jzsx.xlgc.bean.VideoNeightType;
import com.jzsx.xlgc.videoNeighborhood.Dao.VideoNeightTypeDao;
import com.jzsx.xlgc.videoNeighborhood.Service.VideoNeightTypeService;




@Service
@Transactional
public class VideoNeightTypeServiceImpl implements VideoNeightTypeService{

	@Autowired
	private VideoNeightTypeDao videoNeightTypeDao;

	@Override
	public List<VideoNeightType> queryList() {
		// TODO Auto-generated method stub
		return videoNeightTypeDao.queryList();
	}

	@Override
	public VideoNeightType queyById(int neightTypeId) {
		// TODO Auto-generated method stub
		return videoNeightTypeDao.queyById(neightTypeId);
	}


}
