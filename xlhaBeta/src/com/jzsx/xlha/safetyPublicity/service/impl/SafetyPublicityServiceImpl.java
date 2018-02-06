package com.jzsx.xlha.safetyPublicity.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzsx.xlha.bean.SafetyPublicity;
import com.jzsx.xlha.safetyPublicity.dao.SafetyPublicityDao;
import com.jzsx.xlha.safetyPublicity.service.SafetyPublicityService;
@Service
@Transactional
public class SafetyPublicityServiceImpl implements SafetyPublicityService{

	@Autowired
	private SafetyPublicityDao safetyPublicityDao;
	
	@Override
	public void insertActive(SafetyPublicity safetyPublicity) {
		// TODO Auto-generated method stub
		safetyPublicityDao.insertActive(safetyPublicity);
	}

	@Override
	public void updateActive(SafetyPublicity safetyPublicity) {
		// TODO Auto-generated method stub
		safetyPublicityDao.updateActive(safetyPublicity);
	}

	@Override
	public SafetyPublicity queryById(String safetyPyId) {
		// TODO Auto-generated method stub
		return safetyPublicityDao.queryById(safetyPyId);
	}

	@Override
	public List<SafetyPublicity> querylist() {
		// TODO Auto-generated method stub
		return safetyPublicityDao.querylist();
	}

	@Override
	public Map<String, Object> querylistAll(SafetyPublicity safetyPublicity,
			int pagesize, int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pagesize,pageNum );
		List<SafetyPublicity> list = safetyPublicityDao.querylistAll(safetyPublicity);
		PageInfo<SafetyPublicity> pageinfo=new PageInfo<SafetyPublicity>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		return hashmap;
	}

	@Override
	public void deleteById(String safetyPyId) {
		// TODO Auto-generated method stub
		safetyPublicityDao.deleteById(safetyPyId);
	}

	@Override
	public void updateActiveByViewCount(SafetyPublicity safetyPublicity) {
		// TODO Auto-generated method stub
		safetyPublicityDao.updateActiveByViewCount(safetyPublicity);
	}

	@Override
	public List<SafetyPublicity> querySafeByListAll(
			SafetyPublicity safetyPublicity) {
		// TODO Auto-generated method stub
		return safetyPublicityDao.querySafeByAll(safetyPublicity);
	}

	@Override
	public Map<String, Object> querySafeMapAll(SafetyPublicity safetyPublicity,
			int pagesize, int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pagesize,pageNum );
		List<SafetyPublicity> list = safetyPublicityDao.querySafeByAll(safetyPublicity);
		PageInfo<SafetyPublicity> pageinfo=new PageInfo<SafetyPublicity>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		return hashmap;
	}

	@Override
	public SafetyPublicity querySafeById(String safetyPyId) {
		// TODO Auto-generated method stub
		return safetyPublicityDao.querySafeById(safetyPyId);
	}

	@Override
	public int updateActiveSafeByViewCount(SafetyPublicity safetyPublicity) {
		// TODO Auto-generated method stub
		return safetyPublicityDao.updateActiveSafeByViewCount(safetyPublicity);
	}


}
