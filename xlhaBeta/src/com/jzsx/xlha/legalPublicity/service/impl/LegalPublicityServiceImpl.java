package com.jzsx.xlha.legalPublicity.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.base.Strings;
import com.jzsx.xlha.bean.TLegalPublicity;
import com.jzsx.xlha.bean.TLegalPublicityExample;
import com.jzsx.xlha.bean.TLegalPublicityExample.Criteria;
import com.jzsx.xlha.legalPublicity.mapper.TLegalPublicityMapper;
import com.jzsx.xlha.legalPublicity.service.LegalPublicityService;
import com.jzsx.xlha.util.Result;

@Service
@Transactional
public class LegalPublicityServiceImpl implements LegalPublicityService {

	@Autowired
	private TLegalPublicityMapper mapper;

	@Override
	public int addLegal(TLegalPublicity legalPublicity, boolean status) {
		if (status) {
			int i = mapper.insert(legalPublicity);
			return i;
		} else {
			int i = mapper.updateByPrimaryKeySelective(legalPublicity);
			return i;
		}

	}

	@Override
	public Result<TLegalPublicity> getPageList(Integer pages, TLegalPublicity publicity, String user) {
		TLegalPublicityExample example = new TLegalPublicityExample();
		PageHelper.startPage(pages, 10);
		example.setOrderByClause("c_legal_createtime desc");
		Criteria criteria = example.createCriteria();
		if (!Strings.isNullOrEmpty(publicity.getcLegalTitle())) {
			criteria.andCLegalContentLike("%" + publicity.getcLegalTitle() + "%");
		}
		if (publicity.getStart()!=null) {
			criteria.andCLegalCreatetimeBetween(publicity.getStart(), publicity.getStop());
		}
		criteria.andCForeignUseridEqualTo(user);
		List<TLegalPublicity> list = mapper.selectByExample(example);
		PageInfo<TLegalPublicity> info = new PageInfo<TLegalPublicity>(list);
		Result<TLegalPublicity> result = new Result<TLegalPublicity>(info.getPages(), list);
		return result;
	}

	@Override
	public TLegalPublicity getLegalById(String id) {
		TLegalPublicity publicity = mapper.selectByPrimaryKey(id);
		return publicity;
	}

	@Override
	public int deleteLegal(String id) {
		int i = mapper.deleteByPrimaryKey(id);
		return i;
	}

	@Override
	public Result<TLegalPublicity> appGetPageList(Integer pages, Integer sizes,String code) {
		TLegalPublicityExample example = new TLegalPublicityExample();
		PageHelper.startPage(pages, 10);
		example.setOrderByClause("c_legal_createtime desc");
		Criteria criteria = example.createCriteria();
		criteria.andCForeignUseridLike(code+"%");
		List<TLegalPublicity> list = mapper.selectByExample(example);
		PageInfo<TLegalPublicity> info = new PageInfo<TLegalPublicity>(list);
		Result<TLegalPublicity> result = new Result<TLegalPublicity>(info.getPages(), list);
		return result;
	}

}
