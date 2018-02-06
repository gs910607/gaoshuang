package com.jzsx.xlha.threeService.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.base.Strings;
import com.jzsx.xlha.bean.CasUser;
import com.jzsx.xlha.bean.TInformation;
import com.jzsx.xlha.bean.TInformationExample;
import com.jzsx.xlha.bean.TInformationExample.Criteria;
import com.jzsx.xlha.informationPublish.mapper.TInformationMapper;
import com.jzsx.xlha.threeService.service.ThreeServicePublic;
import com.jzsx.xlha.util.Result;

@Service
@Transactional
public class ThreeServicePublicImpl implements ThreeServicePublic {

	@Autowired
	private TInformationMapper mapper;


	@Override
	public Result<TInformation> getPageList(Integer pages,Integer sizePage, TInformation pub,CasUser user) throws Exception {
		TInformationExample example = new TInformationExample();
		PageHelper.startPage(pages, sizePage);
		example.setOrderByClause("CREATETIME desc");
		Criteria criteria = example.createCriteria();
		if (!Strings.isNullOrEmpty(pub.getTitle())) {
			criteria.andTitleLike("%" + pub.getTitle() + "%");
		}
		if (pub.getType()!=null) {
			criteria.andTypeEqualTo(pub.getType());
		}
		if(user!=null&&user.getUserlevel().intValue()<=3){
			criteria.andGroupidLike(user.getUsergroupid()+"%");
			List<TInformation> list = mapper.selectByExample(example);
			PageInfo<TInformation> info = new PageInfo<TInformation>(list);
			return new Result<TInformation>(info.getPages(), list);
		}
		List<TInformation> list = mapper.selectByExample(example);
		PageInfo<TInformation> info = new PageInfo<TInformation>(list);
		return new Result<TInformation>(info.getPages(), list);
	}

	@Override
	public TInformation getById(String id) {
		TInformation information = mapper.selectByPrimaryKey(id);
		return information;
	}

	@Override
	public int delById(String id) {
		int i = mapper.deleteByPrimaryKey(id);
		return i;
	}

}
