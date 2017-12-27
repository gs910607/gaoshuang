package com.jzsx.xlgc.problempaper.Dao;

import java.util.List;

import com.jzsx.xlgc.bean.ProblemPaper;

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
