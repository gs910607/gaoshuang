package com.jzsx.xlgc.videoResearch.Service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzsx.xlgc.bean.ProblemPaperRecord;
import com.jzsx.xlgc.bean.VideoResearchActive;
import com.jzsx.xlgc.bean.VideoResearchRecord;
import com.jzsx.xlgc.videoResearch.Dao.VideoResearchRecordDao;
import com.jzsx.xlgc.videoResearch.Service.VideoResearchRecordService;

@Service("videoResearchRecordService")
@Transactional
public class VideoResearchRecordServiceImpl implements VideoResearchRecordService{

	@Autowired
	private VideoResearchRecordDao videoResearchRecordDao;

	@Override
	public void insertActive(VideoResearchRecord videoResearchRecord) {
		// TODO Auto-generated method stub
		videoResearchRecordDao.insertActive(videoResearchRecord);
	}

	@Override
	public List<VideoResearchRecord> queyVideoResearchRecordById(
			VideoResearchRecord videoResearchRecord) {
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
			VideoResearchRecord videoResearchRecord, int pageSize, int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pageSize,pageNum );
		List<VideoResearchRecord> list = videoResearchRecordDao.queryByAll(videoResearchRecord);
		PageInfo<VideoResearchRecord> pageinfo=new PageInfo<VideoResearchRecord>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		return hashmap;
	}

	@Override
	public int deleteByParentId(String videoResearchReId) {
		// TODO Auto-generated method stub
		return videoResearchRecordDao.deleteByParentId(videoResearchReId);
	}

}
