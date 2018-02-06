package com.jzsx.xlha.opinionSurvey.dao;

import java.util.List;

import com.jzsx.xlha.bean.ProblemPaper;

public interface ProblemPaperDao {

	/**
	 * 动态保存数据
	 * @param problemPaper
	 */
	public void insertActive(ProblemPaper problemPaper);
	/**
	 * 查询所有
	 */
	public List<ProblemPaper> querylist();
	/**
	 * 根据ID查询数据
	 * @param problempaperId
	 */
	public ProblemPaper queryById(String problempaperId);
	/**
	 * 根据一些列条件查询数据
	 * @param problemPaper
	 */
	public List<ProblemPaper> queryByAll(ProblemPaper problemPaper);
	/**
	 * 根据ID删除数据
	 * @param problempaperId
	 */
	public void deleteById(String problempaperId);
}
