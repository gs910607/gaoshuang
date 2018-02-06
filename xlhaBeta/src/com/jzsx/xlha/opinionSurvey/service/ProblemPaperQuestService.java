package com.jzsx.xlha.opinionSurvey.service;

import java.util.List;

import com.jzsx.xlha.bean.ProblemPaperQuest;

public interface ProblemPaperQuestService {

	/**
	 * 动态保存数据
	 * @param problemPaper
	 */
	public void insertActive(ProblemPaperQuest paperQuest);
	/**
	 * 查询所有
	 */
	public List<ProblemPaperQuest> querylist();
	/**
	 * 根据ID查询数据
	 * @param problempaperId
	 */
	public ProblemPaperQuest queryById(String paperquestId);
	/**
	 * 根据父类ID查询数据
	 * @param paperquestProblemId
	 * @return
	 */
	public List<ProblemPaperQuest> queryByParentId(String paperquestProblemId);
	/**
	 * 根据一些列条件查询数据
	 * @param problemPaper
	 */
	public List<ProblemPaperQuest> queryByAll(ProblemPaperQuest paperQuest);
	/**
	 * 根据ID删除数据
	 * @param problempaperId
	 */
	public void deleteById(String paperquestId);
	/**
	 * 根据parentId删除数据
	 * @param paperquestProblemId
	 */
	public void deleteByParentId(String paperquestProblemId);
}
