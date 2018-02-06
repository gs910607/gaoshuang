package com.jzsx.xlha.opinionSurvey.service;

import java.util.List;
import java.util.Map;

import com.jzsx.xlha.bean.ProblemPaper;

public interface ProblemPaperService {

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
	public Map<String, Object> queryByAll(ProblemPaper problemPaper,int pageSize,int pageNum);
	/**
	 * 根据ID删除数据
	 * @param problempaperId
	 */
	public void deleteById(String problempaperId);
}
