package com.jzsx.xlha.opinionSurvey.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jzsx.xlha.bean.ProblemPaperQuest;
import com.jzsx.xlha.opinionSurvey.dao.ProblemPaperQuestDao;
import com.jzsx.xlha.opinionSurvey.service.ProblemPaperQuestService;

@Service
@Transactional
public class ProblemPaperQuestServiceImpl implements ProblemPaperQuestService{

	@Autowired
	private ProblemPaperQuestDao problemPaperQuestDao;

	@Override
	public void insertActive(ProblemPaperQuest paperQuest) {
		// TODO Auto-generated method stub
		problemPaperQuestDao.insertActive(paperQuest);
	}

	@Override
	public List<ProblemPaperQuest> querylist() {
		// TODO Auto-generated method stub
		return problemPaperQuestDao.querylist();
	}

	@Override
	public ProblemPaperQuest queryById(String paperquestId) {
		// TODO Auto-generated method stub
		return problemPaperQuestDao.queryById(paperquestId);
	}

	@Override
	public List<ProblemPaperQuest> queryByParentId(String paperquestProblemId) {
		// TODO Auto-generated method stub
		return problemPaperQuestDao.queryByParentId(paperquestProblemId);
	}

	@Override
	public List<ProblemPaperQuest> queryByAll(ProblemPaperQuest paperQuest) {
		// TODO Auto-generated method stub
		return problemPaperQuestDao.queryByAll(paperQuest);
	}

	@Override
	public void deleteById(String paperquestId) {
		// TODO Auto-generated method stub
		problemPaperQuestDao.deleteById(paperquestId);
	}

	@Override
	public void deleteByParentId(String paperquestProblemId) {
		// TODO Auto-generated method stub
		problemPaperQuestDao.deleteByParentId(paperquestProblemId);
	}

}
