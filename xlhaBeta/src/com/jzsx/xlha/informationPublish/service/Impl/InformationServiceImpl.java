package com.jzsx.xlha.informationPublish.service.Impl;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.base.Strings;
import com.jzsx.xlha.bean.CasInformationSearch;
import com.jzsx.xlha.bean.TInformation;
import com.jzsx.xlha.bean.TInformationExample;
import com.jzsx.xlha.bean.TInformationExample.Criteria;
import com.jzsx.xlha.informationPublish.mapper.TInformationMapper;
import com.jzsx.xlha.informationPublish.service.InfomationService;
import com.jzsx.xlha.util.Result;

@Service
@Transactional
public class InformationServiceImpl implements InfomationService {

	@Autowired
	private TInformationMapper mapper;


	@Override
	public TInformation getInformationById(String id) {
		TInformationExample example = new TInformationExample();
		TInformation information = mapper.selectByPrimaryKey(id);
		return information;
	}


	@Override
	public Result<TInformation> appListInformation(Integer type,Integer pages, Integer sizes) {
		TInformationExample example = new TInformationExample();
		PageHelper.startPage(pages, sizes);
		example.setOrderByClause("createtime desc");
		Criteria criteria = example.createCriteria();
		criteria.andTypeEqualTo(BigDecimal.valueOf(type));
		List<TInformation> list = mapper.selectByExample(example);
		PageInfo<TInformation> info = new PageInfo<TInformation>(list);
		Result<TInformation> result = new Result<TInformation>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}

	@Override
	public Result<TInformation> selectForInformation() {
		PageHelper.startPage(1, 6);
		List<TInformation> list = mapper.selectForInformation();
		PageInfo<TInformation> info=new PageInfo<TInformation>(list);
		Result<TInformation> result = new Result<TInformation>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}

	@Override
	public Result<TInformation> selectDraw() {
		TInformationExample example=new TInformationExample();
		PageHelper.startPage(1, 6);
		example.setOrderByClause("createtime desc");
		Criteria criteria = example.createCriteria();
		criteria.andTypeEqualTo(BigDecimal.valueOf(Long.parseLong("5")));
		List<TInformation> list = mapper.selectByExample(example);
		PageInfo<TInformation> info=new PageInfo<TInformation>(list);
		Result<TInformation> result = new Result<TInformation>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}

	@Override
	public Result<TInformation> getPublish(Integer pages,Integer sizePage,CasInformationSearch search) {
		List<BigDecimal> value=new ArrayList<BigDecimal>();
		value.add(BigDecimal.valueOf(Long.parseLong("1")));
		value.add(BigDecimal.valueOf(Long.parseLong("2")));
		value.add(BigDecimal.valueOf(Long.parseLong("3")));
		value.add(BigDecimal.valueOf(Long.parseLong("4")));
		TInformationExample example=new TInformationExample();
		PageHelper.startPage(pages, sizePage);
		example.setOrderByClause("createtime desc");
		Criteria criteria = example.createCriteria();
		if(!Strings.isNullOrEmpty(search.getTitle())){
			criteria.andTitleLike("%"+search.getTitle()+"%");
		}
		if(search.getStartTime()!=null){
			criteria.andCreatetimeBetween(search.getStartTime(), search.getEndTime());
		}
		criteria.andTypeIn(value);
		List<TInformation> list = mapper.selectByExample(example);
		PageInfo<TInformation> info=new PageInfo<TInformation>(list);
		Result<TInformation> result = new Result<TInformation>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}


	@Override
	public Result<TInformation> getDraw(Integer pages, Integer sizePage,CasInformationSearch search) {
		TInformationExample example=new TInformationExample();
		PageHelper.startPage(pages, sizePage);
		example.setOrderByClause("createtime desc");
		Criteria criteria = example.createCriteria();
		if(!Strings.isNullOrEmpty(search.getTitle())){
			criteria.andTitleLike("%"+search.getTitle()+"%");
		}
		if(search.getStartTime()!=null){
			criteria.andCreatetimeBetween(search.getStartTime(), search.getEndTime());
		}
		criteria.andTypeEqualTo(BigDecimal.valueOf(Long.parseLong("5")));
		List<TInformation> list = mapper.selectByExample(example);
		PageInfo<TInformation> info=new PageInfo<TInformation>(list);
		Result<TInformation> result = new Result<TInformation>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}

}
