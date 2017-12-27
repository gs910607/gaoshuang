package com.jzsx.xlgc.resSmutils.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.base.Strings;
import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.DataByCode;
import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.bean.TVideoConferenceExample;
import com.jzsx.xlgc.bean.VideoTrain;
import com.jzsx.xlgc.bean.TVideoConferenceExample.Criteria;
import com.jzsx.xlgc.resSmutils.mapper.TVideoConferenceMapper;
import com.jzsx.xlgc.resSmutils.service.ConferenceService;
import com.jzsx.xlgc.utils.Result;

@Service
@Transactional
public class ConferenceServiceImpl implements ConferenceService{

	
	@Autowired
	private TVideoConferenceMapper mapper;
	
	
	
	@Override
	public int addConference(TVideoConference conference) {
		int i = mapper.insert(conference);
		return i;
	}



	@Override
	public Result<TVideoConference> getPageList(Integer pages, TVideoConference conference,String code) {
		TVideoConferenceExample example=new TVideoConferenceExample();
		PageHelper.startPage(pages, 10);
		example.setOrderByClause("BEGIN_TIME desc");
		Criteria criteria = example.createCriteria();
		if(!Strings.isNullOrEmpty(conference.getName())){
			criteria.andNameLike("%"+conference.getName()+"%");
		}
		if(conference.getStart()!=null){
			criteria.andBeginTimeBetween(conference.getStart(), conference.getStop());
		}
		criteria.andTypeEqualTo(conference.getType());
		criteria.andUserIdLike(code+"%");
		List<TVideoConference> list = mapper.selectByExample(example);
		PageInfo<TVideoConference> info=new PageInfo<TVideoConference>(list);
		Result<TVideoConference> result=new Result<TVideoConference>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}



	@Override
	public int updateByStatus(Map<String, Object> map) {
		int i = mapper.updateByStatus(map);
		return i;
	}



	@Override
	public List<DataAnalysis> dataAnalysis(String start) {
		List<DataAnalysis> list = mapper.dataAnalysis(start);
		return list;
	}



	@Override
	public List<DataAnalysis> allDataAnalysis(String start, String code) {
		List<DataAnalysis> list = mapper.allDataAnalysis(start, code);
		return list;
	}



	@Override
	public List<DataByCode> selectByCode(String start, String code) {
		List<DataByCode> list = mapper.selectByCode(start, code);
		return list;
	}




	@Override
	public TVideoConference selectByPrimaryKey(String id) {
		TVideoConference conference = mapper.selectByPrimaryKey(id);
		return conference;
	}




	@Override
	public Map<String, Object> queryVideoOrConferByisrecord(
			TVideoConference conference, int pagesize, int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pagesize,pageNum );
		List<TVideoConference> list=mapper.queryVideoOrConferByisrecord(conference);
		
		PageInfo<TVideoConference> pageinfo=new PageInfo<TVideoConference>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		return hashmap;
	}



	@Override
	public TVideoConference queryById(String confId) {
		// TODO Auto-generated method stub
		return mapper.selectByPrimaryKey(confId);
	}

}
