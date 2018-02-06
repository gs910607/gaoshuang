package com.jzsx.xlha.onlineEvaluating.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jzsx.xlha.bean.OnlineEvaluationRecord;

@Repository
public interface OnlineEvaluationRecordDao {
	
	/**
	 * 动态保存数据
	 * @param vtrain
	 */
	public void insertActive(OnlineEvaluationRecord videoResearchRecord);
	
	/**
	 * 根据视频调研记录ID查找数据
	 * @param videoId
	 * @return
	 */
	public List<OnlineEvaluationRecord> queyVideoResearchRecordById(OnlineEvaluationRecord videoResearchRecord);
	/**
	 * 一段时间之前删除掉
	 * @param videoResearchReId
	 */
	public void deleteBytime(String videoResearchTime);
	/**
	 * 根据条件查询所有进行展示分页
	 * @param videoResearchRecord
	 * @return
	 */
	public List<OnlineEvaluationRecord> queryByAll(OnlineEvaluationRecord videoResearchRecord);
	/**
	 * 根据条件查找记录条数
	 * @param videoResearchRecord
	 * @return
	 */
	public int queyVideoResearchRecordByCount(OnlineEvaluationRecord videoResearchRecord);
	/**
	 * 根据父id删除数据
	 * @param videoResearchReId
	 * @return
	 */
	public int deleteByParentId(String videoResearchReId);
}
