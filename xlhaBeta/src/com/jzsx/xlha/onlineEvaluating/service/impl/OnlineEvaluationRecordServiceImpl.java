package com.jzsx.xlha.onlineEvaluating.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzsx.xlha.bean.OnlineEvaluationRecord;
import com.jzsx.xlha.onlineEvaluating.dao.OnlineEvaluationRecordDao;
import com.jzsx.xlha.onlineEvaluating.service.OnlineEvaluationRecordService;

@Service("videoResearchRecordService")
@Transactional
public class OnlineEvaluationRecordServiceImpl implements OnlineEvaluationRecordService{

	@Autowired
	private OnlineEvaluationRecordDao videoResearchRecordDao;

	@Override
	public void insertActive(OnlineEvaluationRecord videoResearchRecord) {
		// TODO Auto-generated method stub
		videoResearchRecordDao.insertActive(videoResearchRecord);
	}

	@Override
	public List<OnlineEvaluationRecord> queyVideoResearchRecordById(
			OnlineEvaluationRecord videoResearchRecord) {
		// TODO Auto-generated method stub
		return videoResearchRecordDao.queyVideoResearchRecordById(videoResearchRecord);
	}

	@Override
	public void deleteBytime(String videoResearchTime) {
		// TODO Auto-generated method stub
		videoResearchRecordDao.deleteBytime(videoResearchTime);
	}

	@Override
	public Map<String, Object> queryByAll(
			OnlineEvaluationRecord videoResearchRecord, int pageSize,
			int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pageSize,pageNum );
		List<OnlineEvaluationRecord> list = videoResearchRecordDao.queryByAll(videoResearchRecord);
		PageInfo<OnlineEvaluationRecord> pageinfo=new PageInfo<OnlineEvaluationRecord>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		return hashmap;
	}

	@Override
	public int deleteByParentId(String videoResearchReId) {
		// TODO Auto-generated method stub
		return videoResearchRecordDao.deleteByParentId(videoResearchReId);
	}

	@Override
	public int queyVideoResearchRecordByCount(
			OnlineEvaluationRecord videoResearchRecord) {
		// TODO Auto-generated method stub
		return 0;
	}

}
