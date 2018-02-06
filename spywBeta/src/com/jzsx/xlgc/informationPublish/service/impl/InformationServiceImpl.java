package com.jzsx.xlgc.informationPublish.service.impl;

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
import com.jzsx.xlgc.bean.CasInformationSearch;
import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.InforType;
import com.jzsx.xlgc.bean.TInformation;
import com.jzsx.xlgc.bean.TInformationExample;
import com.jzsx.xlgc.bean.TInformationExample.Criteria;
import com.jzsx.xlgc.informationPublish.mapper.InforTypeMapper;
import com.jzsx.xlgc.informationPublish.mapper.TInformationMapper;
import com.jzsx.xlgc.informationPublish.service.InfomationService;
import com.jzsx.xlgc.utils.AppResult;
import com.jzsx.xlgc.utils.IDUtils;
import com.jzsx.xlgc.utils.Result;

@Service
@Transactional
public class InformationServiceImpl implements InfomationService {

	@Autowired
	private TInformationMapper mapper;
	
	@Autowired
	private InforTypeMapper type;

	@Override
	public List<TInformation> getInfo(int type, String code) {
		TInformationExample example = new TInformationExample();
		PageHelper.startPage(1, 3);
		/*if (type == 1) {
			PageHelper.startPage(1, 5);
		} else {
			PageHelper.startPage(1, 3);
		}*/
		example.setOrderByClause("createtime desc");
		Criteria criteria = example.createCriteria();
		criteria.andTypeEqualTo(BigDecimal.valueOf(type));
		if (!Strings.isNullOrEmpty(code) && code.length() <= 6) {
			criteria.andGroupidLike(code + "%");
			Criteria criteria2 = example.createCriteria();
			criteria2.andTypeEqualTo(BigDecimal.valueOf(type));
			criteria2.andGroupidEqualTo("1");
			example.or(criteria2);
		} else if (!Strings.isNullOrEmpty(code) && code.length() == 9) {
			List<String> list = new ArrayList<String>();
			list.add(code.substring(0, 3));
			list.add(code.substring(0, 6));
			list.add(code);
			list.add("1");
			criteria.andGroupidIn(list);
		}
		List<TInformation> list = mapper.selectByExample(example);
		PageInfo<TInformation> info = new PageInfo<TInformation>(list);
		return list;
	}

	@Override
	public Integer addInformation(TInformation casInformation) {
		TInformationExample example = new TInformationExample();
		int i = mapper.insert(casInformation);
		return i;
	}

	@Override
	public Result<TInformation> getPageList(Integer pages, Integer type, String code) {
		TInformationExample example = new TInformationExample();
		PageHelper.startPage(pages, 10);
		example.setOrderByClause("createtime desc");
		Criteria criteria = example.createCriteria();
		criteria.andTypeEqualTo(BigDecimal.valueOf(type));
		if (!Strings.isNullOrEmpty(code) && code.length() <= 6) {
			criteria.andGroupidLike(code + "%");
			Criteria criteria2 = example.createCriteria();
			criteria2.andTypeEqualTo(BigDecimal.valueOf(type));
			criteria2.andGroupidEqualTo("1");
			example.or(criteria2);
		} else if (!Strings.isNullOrEmpty(code) && code.length() == 9) {
			List<String> list = new ArrayList<String>();
			list.add(code.substring(0, 3));
			list.add(code.substring(0, 6));
			list.add(code);
			list.add("1");
			criteria.andGroupidIn(list);
		}
		List<TInformation> list = mapper.selectByExample(example);
		PageInfo<TInformation> info = new PageInfo<TInformation>(list);
		Result<TInformation> result = new Result<TInformation>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}

	@Override
	public Result<TInformation> getSearchPageList(Integer pages, CasInformationSearch search, String code)
			throws ParseException {
		String sql = "";
		TInformationExample example = new TInformationExample();
		PageHelper.startPage(pages, 10);
		example.setOrderByClause("createtime desc");
		Criteria criteria = example.createCriteria();
		criteria.andTypeEqualTo(BigDecimal.valueOf(search.getType()));
		if (StringUtils.isNotBlank(search.getTitle())) {
			criteria.andTitleLike("%" + search.getTitle() + "%");
		}
		if (!Strings.isNullOrEmpty(search.getStart())) {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Date date = dateFormat.parse(search.getStart());
			Date Date1 = dateFormat.parse(search.getEnd());
			criteria.andCreatetimeBetween(date, Date1);
		}
		if (!Strings.isNullOrEmpty(search.getVillage())) {
			criteria.andGroupidLike(search.getVillage() + "%");
			sql = search.getVillage() + "%";
		} else if (!Strings.isNullOrEmpty(search.getCounty())) {
			criteria.andGroupidLike(search.getCounty() + "%");
			sql = search.getVillage() + "%";
		} else if (!Strings.isNullOrEmpty(search.getDistrict())) {
			criteria.andGroupidLike(search.getDistrict() + "%");
			sql = search.getVillage() + "%";
		}
		if (code.length() <= 6) {
			if (Strings.isNullOrEmpty(sql)) {
				criteria.andGroupidLike(code + "%");
			}
			Criteria criteria2 = example.createCriteria();
			if (StringUtils.isNotBlank(search.getTitle())) {
				criteria2.andTitleLike("%" + search.getTitle() + "%");
			}
			if (!Strings.isNullOrEmpty(search.getStart())) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				Date date = dateFormat.parse(search.getStart());
				Date Date1 = dateFormat.parse(search.getEnd());
				criteria2.andCreatetimeBetween(date, Date1);
			}
			criteria2.andTypeEqualTo(BigDecimal.valueOf(search.getType()));
			criteria2.andGroupidEqualTo("1");
			example.or(criteria2);
		} else if (code.length() == 9) {
			List<String> list = new ArrayList<String>();
			list.add(code.substring(0, 3));
			list.add(code.substring(0, 6));
			list.add(code);
			list.add("1");
			criteria.andGroupidIn(list);
			Criteria criteria2 = example.createCriteria();
			if (StringUtils.isNotBlank(search.getTitle())) {
				criteria2.andTitleLike("%" + search.getTitle() + "%");
			}
			if (!Strings.isNullOrEmpty(search.getStart())) {
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				Date date = dateFormat.parse(search.getStart());
				Date Date1 = dateFormat.parse(search.getEnd());
				criteria2.andCreatetimeBetween(date, Date1);
			}
			criteria2.andTypeEqualTo(BigDecimal.valueOf(search.getType()));
			criteria2.andGroupidEqualTo("1");
			example.or(criteria2);
		}
		List<TInformation> list = mapper.selectByExample(example);
		PageInfo<TInformation> info = new PageInfo<TInformation>(list);
		Result<TInformation> result = new Result<TInformation>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}

	@Override
	public TInformation getInformationById(String id) {
		TInformationExample example = new TInformationExample();
		TInformation information = mapper.selectByPrimaryKey(id);
		return information;
	}

	@Override
	public Integer updateInformation(TInformation casInformation) {
		TInformationExample example = new TInformationExample();
		int i = mapper.updateByPrimaryKeySelective(casInformation);
		return i;

	}

	@Override
	public int deleteInformation(String id) {
		TInformationExample example = new TInformationExample();
		int i = mapper.deleteByPrimaryKey(id);
		return i;
	}

	@Override
	public List<DataAnalysis> getDataAnalysis(Map<String, Object> map) {
		List<DataAnalysis> list = mapper.dataAnalysis(map);
		return list;
	}

	@Override
	public List<DataAnalysis> getTypeAnalysis(Map<String, Object> map) {
		List<DataAnalysis> list = mapper.typeAnalysis(map);
		return list;
	}

	@Override
	public Result<TInformation> appListInformation(Integer type, String code, Integer pages, Integer sizes) {
		TInformationExample example = new TInformationExample();
		PageHelper.startPage(pages, sizes);
		example.setOrderByClause("createtime desc");
		Criteria criteria = example.createCriteria();
		criteria.andTypeEqualTo(BigDecimal.valueOf(type));
		if (!Strings.isNullOrEmpty(code) && code.length() <= 6) {
			criteria.andGroupidLike(code + "%");
		}
		List<TInformation> list = mapper.selectByExample(example);
		PageInfo<TInformation> info = new PageInfo<TInformation>(list);
		Result<TInformation> result = new Result<TInformation>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}

	@Override
	public AppResult reply(String id, String code) {
		TInformation tInformation = mapper.selectByPrimaryKey(id);
		tInformation.setGroupid(code);
		tInformation.setInformationid(String.valueOf(IDUtils.genItemId()));
		int i = mapper.insert(tInformation);
		if (i > 0)
			return new AppResult("转发成功", "1");
		return new AppResult("转发失败", "0");
	}

	@Override
	public List<InforType> getType() {
		List<InforType> list = type.selectAll();
		return list;
	}

}
