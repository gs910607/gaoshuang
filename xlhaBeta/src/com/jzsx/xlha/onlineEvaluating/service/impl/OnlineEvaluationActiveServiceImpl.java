package com.jzsx.xlha.onlineEvaluating.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzsx.xlha.bean.OnlineEvaluationActive;
import com.jzsx.xlha.onlineEvaluating.dao.OnlineEvaluationActiveDao;
import com.jzsx.xlha.onlineEvaluating.service.OnlineEvaluationActiveService;




@Service
@Transactional
public class OnlineEvaluationActiveServiceImpl implements OnlineEvaluationActiveService{

	@Autowired
	private OnlineEvaluationActiveDao videoResearchActiveDao;
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
	public List<OnlineEvaluationActive> queryVideoResearchActiveList() {
		// TODO Auto-generated method stub
		return videoResearchActiveDao.queryVideoResearchActiveList();
	}
	@Override
	public void insertActive(OnlineEvaluationActive videoResearchActive) {
		// TODO Auto-generated method stub
		videoResearchActiveDao.insertActive(videoResearchActive);
	}
	@Override
	public Map<String, Object> queryVideoResearchByALl(
			OnlineEvaluationActive videoResearchActive, int pageSize, int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pageSize,pageNum );
		List<OnlineEvaluationActive> list = videoResearchActiveDao.queryVideoResearchActiveByALl(videoResearchActive);
		PageInfo<OnlineEvaluationActive> pageinfo=new PageInfo<OnlineEvaluationActive>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		return hashmap;
	}
	@Override
	public OnlineEvaluationActive queyVideoResearchActiveById(String videoActiveId) {
		// TODO Auto-generated method stub
		return videoResearchActiveDao.queyVideoResearchActiveById(videoActiveId);
	}
	@Override
	public List<OnlineEvaluationActive> queyVideoResearchById(String videoResearchId) {
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
			String videoResearchId, int pageSize, int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pageSize,pageNum );
		List<OnlineEvaluationActive> list = videoResearchActiveDao.queryVideoVoteByReseachId(videoResearchId);
		PageInfo<OnlineEvaluationActive> pageinfo=new PageInfo<OnlineEvaluationActive>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		// TODO Auto-generated method stub
		return hashmap;
	}
	@Override
	public void deleteByAll(OnlineEvaluationActive videoResearchActive) {
		// TODO Auto-generated method stub
		videoResearchActiveDao.deleteByAll(videoResearchActive);
	}
	@Override
	public void updatevideoResearchByIds(List<String> videoResearchId) {
		// TODO Auto-generated method stub
		videoResearchActiveDao.updatevideoResearchByIds(videoResearchId);
	}

}
