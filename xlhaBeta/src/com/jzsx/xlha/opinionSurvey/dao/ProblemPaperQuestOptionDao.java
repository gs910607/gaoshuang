package com.jzsx.xlha.opinionSurvey.dao;

import java.util.List;

import com.jzsx.xlha.bean.ProblemPaperQuestOption;




public interface ProblemPaperQuestOptionDao {

	/**
	 * 动态保存数据
	 * @param problemPaper
	 */
	public void insertActive(ProblemPaperQuestOption questOption);
	/**
	 * 查询所有
	 */
	public List<ProblemPaperQuestOption> querylist();
	/**
	 * 根据ID查询数据
	 * @param problempaperId
	 */
	public ProblemPaperQuestOption queryById(String paperquestOptionId);
	/**
	 * 根据父类ID查询数据
	 * @param paperquestProblemId
	 * @return
	 */
	public List<ProblemPaperQuestOption> queryByParentId(String paperquestProblemId);
	/**
	 * 根据一些列条件查询数据
	 * @param problemPaper
	 */
	public List<ProblemPaperQuestOption> queryByAll(ProblemPaperQuestOption questOption);
	/**
	 * 根据ID删除数据
	 * @param problempaperId
	 */
	public void deleteById(String paperquestOptionId);
	/**
	 * 根据parentId 删除数据
	 * @param paperquestOptionQuestId
	 */
	public void deleteByParentId(String paperquestOptionQuestId);
}
