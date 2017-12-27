package com.jzsx.xlgc.problempaper.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jzsx.xlgc.bean.ProblemPaperQuestOption;
import com.jzsx.xlgc.problempaper.Dao.ProblemPaperQuestOptionDao;
import com.jzsx.xlgc.problempaper.service.ProblemPaperQuestOptionService;

@Service
@Transactional
public class ProblemPaperQuestOptionServiceImpl implements ProblemPaperQuestOptionService{

	@Autowired
	private ProblemPaperQuestOptionDao problemPaperQuestOptionDao;

	@Override
	public void insertActive(ProblemPaperQuestOption questOption) {
		// TODO Auto-generated method stub
		problemPaperQuestOptionDao.insertActive(questOption);
	}

	@Override
	public List<ProblemPaperQuestOption> querylist() {
		// TODO Auto-generated method stub
		return problemPaperQuestOptionDao.querylist();
	}

	@Override
	public ProblemPaperQuestOption queryById(String paperquestOptionId) {
		// TODO Auto-generated method stub
		return problemPaperQuestOptionDao.queryById(paperquestOptionId);
	}

	@Override
	public List<ProblemPaperQuestOption> queryByParentId(String paperquestProblemId) {
		// TODO Auto-generated method stub
		return problemPaperQuestOptionDao.queryByParentId(paperquestProblemId);
	}

	@Override
	public List<ProblemPaperQuestOption> queryByAll(
			ProblemPaperQuestOption questOption) {
		// TODO Auto-generated method stub
		return problemPaperQuestOptionDao.queryByAll(questOption);
	}

	@Override
	public void deleteById(String paperquestOptionId) {
		// TODO Auto-generated method stub
		problemPaperQuestOptionDao.deleteById(paperquestOptionId);
	}

	@Override
	public void deleteByParentId(String paperquestOptionQuestId) {
		// TODO Auto-generated method stub
		problemPaperQuestOptionDao.deleteByParentId(paperquestOptionQuestId);
	}


}
