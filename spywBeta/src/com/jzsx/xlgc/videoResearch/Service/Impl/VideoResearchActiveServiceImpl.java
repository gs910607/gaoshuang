package com.jzsx.xlgc.videoResearch.Service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzsx.xlgc.bean.VideoResearchActive;
import com.jzsx.xlgc.bean.VideoTrain;
import com.jzsx.xlgc.videoResearch.Dao.VideoResearchActiveDao;
import com.jzsx.xlgc.videoResearch.Service.VideoResearchActiveService;




@Service
@Transactional
public class VideoResearchActiveServiceImpl implements VideoResearchActiveService{

	@Autowired
	private VideoResearchActiveDao videoResearchActiveDao;
//	@Override
//	public Map<String, Object> queryVideoResearchByALl(VideoResearch videoResearch,int pageSize,int pageNum) {
//		// TODO Auto-generated method stub
//		Map<String, Object> hashmap=new HashMap<String, Object>();
//		PageHelper.startPage(pageSize,pageNum );
//		List<VideoResearch> list = videoResearchDao.queryVideoResearchByALl(videoResearch);
//		PageInfo<VideoResearch> pageinfo=new PageInfo<VideoResearch>(list);
//		hashmap.put("total", pageinfo.getPages());
//		hashmap.put("list", pageinfo.getList());
//		return hashmap;
//	}
	@Override
	public List<VideoResearchActive> queryVideoResearchActiveList() {
		// TODO Auto-generated method stub
		return videoResearchActiveDao.queryVideoResearchActiveList();
	}
	@Override
	public void insertActive(VideoResearchActive videoResearchActive) {
		// TODO Auto-generated method stub
		videoResearchActiveDao.insertActive(videoResearchActive);
	}
	@Override
	public Map<String, Object> queryVideoResearchByALl(
			VideoResearchActive videoResearchActive, int pageSize, int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pageSize,pageNum );
		List<VideoResearchActive> list = videoResearchActiveDao.queryVideoResearchActiveByALl(videoResearchActive);
		PageInfo<VideoResearchActive> pageinfo=new PageInfo<VideoResearchActive>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		return hashmap;
	}
	@Override
	public VideoResearchActive queyVideoResearchActiveById(String videoActiveId) {
		// TODO Auto-generated method stub
		return videoResearchActiveDao.queyVideoResearchActiveById(videoActiveId);
	}
	@Override
	public List<VideoResearchActive> queyVideoResearchById(String videoResearchId) {
		// TODO Auto-generated method stub
		return videoResearchActiveDao.queyVideoResearchById(videoResearchId);
	}
	@Override
	public void updatevideoResearchById(String videoResearchId) {
		// TODO Auto-generated method stub
		videoResearchActiveDao.updatevideoResearchById(videoResearchId);
	}
	@Override
	public void deleteByParentId(String videoResearchId) {
		// TODO Auto-generated method stub
		videoResearchActiveDao.deleteByParentId(videoResearchId);
	}
	@Override
	public Map<String, Object> queryVideoVoteByReseachId(
			String videoResearchId,int pageSize, int pageNum) {
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pageSize,pageNum );
		List<VideoResearchActive> list = videoResearchActiveDao.queryVideoVoteByReseachId(videoResearchId);
		PageInfo<VideoResearchActive> pageinfo=new PageInfo<VideoResearchActive>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		// TODO Auto-generated method stub
		return hashmap;
	}
	@Override
	public void deleteByAll(VideoResearchActive videoResearchActive) {
		// TODO Auto-generated method stub
		videoResearchActiveDao.deleteByAll(videoResearchActive);
	}

}
