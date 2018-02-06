package com.jzsx.xlha.politicsHot.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.base.Strings;
import com.jzsx.xlha.bean.TLegalPublicity;
import com.jzsx.xlha.bean.TPoliticsHot;
import com.jzsx.xlha.bean.TPoliticsHotExample;
import com.jzsx.xlha.bean.TPoliticsHotExample.Criteria;
import com.jzsx.xlha.politicsHot.mapper.TPoliticsHotMapper;
import com.jzsx.xlha.politicsHot.service.PoliticsService;
import com.jzsx.xlha.util.Result;


@Service
@Transactional
public class PoliticsServiceImpl implements PoliticsService{
	
	@Autowired
	private TPoliticsHotMapper mapper;

	@Override
	public int addPolitics(TPoliticsHot hot, boolean status) {
		if (status) {
			int i = mapper.insert(hot);
			return i;
		} else {
			int i = mapper.updateByPrimaryKeySelective(hot);
			return i;
		}
	}

	@Override
	public Result<TPoliticsHot> getPageList(Integer pages, TPoliticsHot hot, String user) {
		TPoliticsHotExample example = new TPoliticsHotExample();
		PageHelper.startPage(pages, 10);
		example.setOrderByClause("C_POLITICS_CREATETIME desc");
		Criteria criteria = example.createCriteria();
		if (!Strings.isNullOrEmpty(hot.getcPoliticsTitle())) {
			criteria.andCPoliticsTitleLike("%" + hot.getcPoliticsTitle() + "%");
		}
		if(hot.getStart()!=null){
			criteria.andCPoliticsCreatetimeBetween(hot.getStart(), hot.getStop());
		}
		criteria.andCForeignUseridEqualTo(user);
		List<TPoliticsHot> list = mapper.selectByExample(example);
		PageInfo<TPoliticsHot> info = new PageInfo<TPoliticsHot>(list);
		Result<TPoliticsHot> result = new Result<TPoliticsHot>(info.getPages(), list);
		return result;
	}

	@Override
	public TPoliticsHot getHotById(String id) {
		TPoliticsHot hot = mapper.selectByPrimaryKey(id);
		return hot;
	}

	@Override
	public int deletePolitics(String id) {
		int i = mapper.deleteByPrimaryKey(id);
		return i;
	}

}
