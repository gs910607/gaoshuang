package com.jzsx.xlgc.videoMediate.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.base.Strings;
import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.DataByCode;
import com.jzsx.xlgc.bean.TMediatePerson;
import com.jzsx.xlgc.bean.TVideoMediate;
import com.jzsx.xlgc.bean.TVideoMediateExample;
import com.jzsx.xlgc.bean.TVideoMediateExample.Criteria;
import com.jzsx.xlgc.utils.Result;
import com.jzsx.xlgc.videoMediate.mapper.TMediatePersonMapper;
import com.jzsx.xlgc.videoMediate.mapper.TVideoMediateMapper;
import com.jzsx.xlgc.videoMediate.service.MediateService;

@Service
@Transactional
public class MediateServiceImpl implements MediateService {

	@Autowired
	private TVideoMediateMapper mapper;
	
	@Autowired
	private TMediatePersonMapper person;

	@Override
	public int addMediate(TVideoMediate mediate, boolean status,List<TMediatePerson> list) {
		int j=0;
		if (status) {
			int i = mapper.insert(mediate);
			if(i>0) {
				j = person.insertPersonList(list);
			}
			return j;
		} else {
			int i = mapper.updateByPrimaryKeySelective(mediate);
			return i;
		}
	}

	@Override
	public Result<TVideoMediate> getPageList(Integer pages, String code) {
		TVideoMediateExample example = new TVideoMediateExample();
		PageHelper.startPage(pages, 10);
		Criteria criteria = example.createCriteria();
		criteria.andMediateAddressLike(code + "%");
		example.setOrderByClause("mediate_regis_date desc");
		List<TVideoMediate> list = mapper.selectByExampleJoinTable(example);
		PageInfo<TVideoMediate> info = new PageInfo<TVideoMediate>(list);
		Result<TVideoMediate> result = new Result<TVideoMediate>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}

	@Override
	public Result<TVideoMediate> getSearchPageList(Integer pages, TVideoMediate mediate, String code) throws Exception {
		TVideoMediateExample example = new TVideoMediateExample();
		PageHelper.startPage(pages, 10);
		example.setOrderByClause("mediate_regis_date desc");
		Criteria criteria = example.createCriteria();
		if (!Strings.isNullOrEmpty(mediate.getMediateName())) {
			List<String> list = person.selectByName(mediate.getMediateName());
			criteria.andMediateidIn(list);
		}
		if (!Strings.isNullOrEmpty(mediate.getMediateRegisBranch())) {
			criteria.andMediateRegisBranchEqualTo(mediate.getMediateRegisBranch());
		}
		if (!Strings.isNullOrEmpty(mediate.getMediateRegisDate())) {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Date date = dateFormat.parse(mediate.getMediateRegisDate());
			Date date1 = dateFormat.parse(mediate.getStopTime());
			criteria.andMediateRegisDateBetween(String.valueOf(date.getTime()), String.valueOf(date1.getTime()));
		}
		criteria.andMediateAddressLike(mediate.getMediateAddress() + "%");
		List<TVideoMediate> list = mapper.selectByExampleJoinTable(example);
		PageInfo<TVideoMediate> info = new PageInfo<TVideoMediate>(list);
		Result<TVideoMediate> result = new Result<TVideoMediate>();
		result.setNum(info.getPages());
		result.setList(list);

		return result;
	}

	@Override
	public int deleteMedia(String id) {
		int i = mapper.deleteByPrimaryKey(id);
		return i;
	}

	@Override
	public Result<TVideoMediate> importMediate(TVideoMediate mediate, String code) throws Exception {
		TVideoMediateExample example = new TVideoMediateExample();
		example.setOrderByClause("mediate_regis_date desc");
		Criteria criteria = example.createCriteria();
		if (!Strings.isNullOrEmpty(mediate.getMediateName())) {
			List<String> list = person.selectByName(mediate.getMediateName());
			criteria.andMediateidIn(list);
		}
		if (!Strings.isNullOrEmpty(mediate.getMediateRegisBranch())) {
			criteria.andMediateRegisBranchEqualTo(mediate.getMediateRegisBranch());
		}
		if (!Strings.isNullOrEmpty(mediate.getMediateRegisDate())) {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Date date = dateFormat.parse(mediate.getMediateRegisDate());
			Date date1 = dateFormat.parse(mediate.getStopTime());
			criteria.andMediateRegisDateBetween(String.valueOf(date.getTime()), String.valueOf(date1.getTime()));
		}
		criteria.andMediateAddressLike(mediate.getMediateAddress() + "%");
		List<TVideoMediate> list = mapper.selectByExample(example);
		PageInfo<TVideoMediate> info = new PageInfo<TVideoMediate>(list);
		Result<TVideoMediate> result = new Result<TVideoMediate>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}

	@Override
	public int insertByExport(List<TVideoMediate> list) {
		int i = mapper.insertMediateList(list);
		return i;
	}

	@Override
	public TVideoMediate getMediateById(String id) {
		TVideoMediate mediate = mapper.selectByPrimaryKey(id);
		return mediate;
	}

	@Override
	public List<DataAnalysis> dataAnalysis(Map<String, String> map) {
		  List<DataAnalysis> list = mapper.dataAnalysis(map);
		return list;
	}

	@Override
	public List<DataAnalysis> allDataAnalysis(Map<String, String> map) {
		List<DataAnalysis> list = mapper.allDataAnalysis(map);
		return list;
	}

	@Override
	public int updateStatusByPrimaryKey(Map<String, String> map) {
		int i = mapper.updateStatusByPrimaryKey(map);
		return i;
	}

	@Override
	public Result<TVideoMediate> selectByExampleJoinTable() {
		TVideoMediateExample example = new TVideoMediateExample();
		PageHelper.startPage(1, 10);
		Criteria criteria = example.createCriteria();
		criteria.andMediateAddressLike("103" + "%");
		example.setOrderByClause("mediate_regis_date desc");
		List<TVideoMediate> list = mapper.selectByExampleJoinTable(example);
		PageInfo<TVideoMediate> info = new PageInfo<TVideoMediate>(list);
		Result<TVideoMediate> result = new Result<TVideoMediate>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}

	@Override
	public int insertPersonList(List<TMediatePerson> list) {
		int i = person.insertPersonList(list);
		return i;
	}

	@Override
	public List<DataByCode> selectByCode(String code, String start, String stop) {
		 List<DataByCode> list = mapper.selectByCode(code, start, stop);
		return list;
	}

	@Override
	public List<TMediatePerson> selectByMediateId(String id, Integer type) {
		List<TMediatePerson> list = person.selectByMediateId(id, type);
		return list;
	}

}
