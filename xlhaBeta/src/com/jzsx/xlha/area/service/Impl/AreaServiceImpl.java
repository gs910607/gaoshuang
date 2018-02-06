package com.jzsx.xlha.area.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jzsx.xlha.area.dao.AreaDao;
import com.jzsx.xlha.area.service.AreaService;
import com.jzsx.xlha.bean.Area;
@Service
@Transactional
public class AreaServiceImpl implements AreaService{

	@Autowired
	private AreaDao areaDao;
	@Override
	public List<Area> queryList() {
		// TODO Auto-generated method stub
		return areaDao.queryList();
	}

	@Override
	public void insertActive(Area area) {
		// TODO Auto-generated method stub
		areaDao.insertActive(area);
	}

	@Override
	public List<Area> queryByALl(Area area) {
		// TODO Auto-generated method stub
		return areaDao.queryByALl(area);
	}

	@Override
	public Area queryById(String id) {
		// TODO Auto-generated method stub
		return areaDao.queryById(id);
	}

	@Override
	public Area queryByCode(String code) {
		// TODO Auto-generated method stub
		return areaDao.queryByCode(code);
	}

	@Override
	public List<Area> queryByParentId(String parentId) {
		// TODO Auto-generated method stub
		return areaDao.queryByParentId(parentId);
	}

	@Override
	public List<Area> queryByParents(String code) {
		// TODO Auto-generated method stub
		return areaDao.queryByParents(code);
	}

	@Override
	public void updateActive(Area area) {
		// TODO Auto-generated method stub
		areaDao.updateActive(area);
	}

	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		areaDao.deleteById(id);
	}

	@Override
	public List<Area> queryByName(String name) {
		// TODO Auto-generated method stub
		return areaDao.queryByName(name);
	}

	@Override
	public List<Area> queryBychilds(String parentId) {
		// TODO Auto-generated method stub
		return areaDao.queryBychilds(parentId);
	}

}
