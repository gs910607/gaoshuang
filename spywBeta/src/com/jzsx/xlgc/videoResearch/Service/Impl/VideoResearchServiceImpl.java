package com.jzsx.xlgc.videoResearch.Service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzsx.xlgc.bean.VideoResearch;
import com.jzsx.xlgc.videoResearch.Dao.VideoResearchDao;
import com.jzsx.xlgc.videoResearch.Service.VideoResearchService;




@Service
@Transactional
public class VideoResearchServiceImpl implements VideoResearchService{

	@Autowired
	private VideoResearchDao videoResearchDao;
	@Override
	public List<VideoResearch> queryVideoResearchList() {
		// TODO Auto-generated method stub
		return videoResearchDao.queryVideoResearchList();
	}
	@Override
	public void insertActive(VideoResearch videoResearch) {
		// TODO Auto-generated method stub
		videoResearchDao.insertActive(videoResearch);
	}
	@Override
	public Map<String, Object> queryVideoResearchByALl(VideoResearch videoResearch,int pageSize,int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		String rcode=videoResearch.getVideoResearcCode();
		List<VideoResearch> list = videoResearchDao.queryVideoResearchByALl(videoResearch);
		PageHelper.startPage(pageSize,pageNum );
		PageInfo<VideoResearch> pageinfo=new PageInfo<VideoResearch>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		return hashmap;
	}
	@Override
	public VideoResearch queyVideoResearchById(String videoResearchId) {
		// TODO Auto-generated method stub
		return videoResearchDao.queyVideoResearchById(videoResearchId);
	}
	@Override
	public void deleteById(String videoResearchId) {
		// TODO Auto-generated method stub
		videoResearchDao.deleteById(videoResearchId);
	}
	@Override
	public void updateActive(VideoResearch videoResearch) {
		// TODO Auto-generated method stub
		videoResearchDao.updateActive(videoResearch);
	}

}
