package com.jzsx.xlha.opinionSurvey.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzsx.xlha.bean.ProblemPaper;
import com.jzsx.xlha.opinionSurvey.dao.ProblemPaperDao;
import com.jzsx.xlha.opinionSurvey.service.ProblemPaperService;

@Service
@Transactional
public class ProblemPaperServiceImpl implements ProblemPaperService{

	@Autowired
	private ProblemPaperDao problemPaperDao;
	@Override
	public void insertActive(ProblemPaper problemPaper) {
		// TODO Auto-generated method stub
		problemPaperDao.insertActive(problemPaper);
	}

	@Override
	public List<ProblemPaper> querylist() {
		// TODO Auto-generated method stub
		return problemPaperDao.querylist();
	}

	@Override
	public ProblemPaper queryById(String problempaperId) {
		// TODO Auto-generated method stub
		return problemPaperDao.queryById(problempaperId);
	}

	@Override
	public Map<String, Object> queryByAll(ProblemPaper problemPaper,int pageSize,int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pageSize,pageNum );
		List<ProblemPaper> list = problemPaperDao.queryByAll(problemPaper);
		PageInfo<ProblemPaper> pageinfo=new PageInfo<ProblemPaper>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		return hashmap;
	}

	@Override
	public void deleteById(String problempaperId) {
		// TODO Auto-generated method stub
		problemPaperDao.deleteById(problempaperId);
	}

}
