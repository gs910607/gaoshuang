package com.jzsx.xlha.onlineEvaluating.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzsx.xlha.bean.OnlineEvaluation;
import com.jzsx.xlha.onlineEvaluating.dao.OnlineEvaluationDao;
import com.jzsx.xlha.onlineEvaluating.service.OnlineEvaluationService;




@Service
@Transactional
public class OnlineEvaluationServiceImpl implements OnlineEvaluationService{

	@Autowired
	private OnlineEvaluationDao videoResearchDao;
	@Override
	public List<OnlineEvaluation> queryVideoResearchList() {
		// TODO Auto-generated method stub
		return videoResearchDao.queryVideoResearchList();
	}
	@Override
	public void insertActive(OnlineEvaluation videoResearch) {
		// TODO Auto-generated method stub
		videoResearchDao.insertActive(videoResearch);
	}
	@Override
	public Map<String, Object> queryVideoResearchByALl(OnlineEvaluation videoResearch,int pageSize,int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pageSize,pageNum );
//		System.out.println("pageNum:"+pageNum+"----pageSize:"+pageSize);
//		System.out.println("typeid:"+vtrain.getVideoTypeId()+"name:"+vtrain.getVideoName());
		List<OnlineEvaluation> list = videoResearchDao.queryVideoResearchByALl(videoResearch);
		PageInfo<OnlineEvaluation> pageinfo=new PageInfo<OnlineEvaluation>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
//		System.out.println("hh:"+list);
//		System.out.println("total:"+pageinfo.getTotal()+"list:"+pageinfo.getList());
		return hashmap;
	}
	@Override
	public OnlineEvaluation queyVideoResearchById(String videoResearchId) {
		// TODO Auto-generated method stub
		return videoResearchDao.queyVideoResearchById(videoResearchId);
	}
	@Override
	public void deleteById(String videoResearchId) {
		// TODO Auto-generated method stub
		videoResearchDao.deleteById(videoResearchId);
	}
	@Override
	public void updateActive(OnlineEvaluation videoResearch) {
		// TODO Auto-generated method stub
		videoResearchDao.updateActive(videoResearch);
	}

}
