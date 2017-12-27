package com.jzsx.xlgc.problempaper.service;

import java.util.List;
import java.util.Map;

import com.jzsx.xlgc.bean.ProblemPaper;
import com.jzsx.xlgc.bean.ProblemPaperRecord;

public interface ProblemPaperRecordService {

	/**
	 * 动态保存数据
	 * @param problemPaper
	 */
	public void insertActive(ProblemPaperRecord paperRecord);
	/**
	 * 查询所有
	 */
	public List<ProblemPaperRecord> querylist();
	/**
	 * 根据ID查询数据
	 * @param problempaperId
	 */
	public ProblemPaperRecord queryById(String problempaperId);
	/**
	 * 根据一些列条件查询数据
	 * @param problemPaper
	 */
	public List<ProblemPaperRecord> queryByAll(ProblemPaperRecord paperRecord);
	/**
	 * 根据一系列条件查询数据进行分页展示
	 * @param paperRecord
	 * @param pageSize
	 * @param pageNum
	 * @return
	 */
	public Map<String, Object> queryByAll(ProblemPaperRecord paperRecord,int pageSize,int pageNum);
	/**
	 * 根据ID删除数据
	 * @param problempaperId
	 */
	public void deleteById(String problempaperId);
	/**
	 * 根据试卷ID查询地区统计数据
	 * @param problempaperId
	 * @return
	 */
	public List<ProblemPaperRecord> queryByPaperIdOfArea(String problempaperId);
	/**
	 * 根据试卷ID查询试卷统计数据
	 * @param problempaperId
	 * @return
	 */
	public List<ProblemPaperRecord> queryBypaperIdOfname(String problempaperId);
	
	/**
	 * 根据条件查找是否存在
	 * @param paperRecord
	 * @return
	 */
	public int queryByCount(ProblemPaperRecord paperRecord);
}
