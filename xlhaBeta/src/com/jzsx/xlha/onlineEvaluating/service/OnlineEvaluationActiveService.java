package com.jzsx.xlha.onlineEvaluating.service;

import java.util.List;
import java.util.Map;

import com.jzsx.xlha.bean.OnlineEvaluationActive;

public interface OnlineEvaluationActiveService {
	/**
	 * 查询所有的视频调研活动评选数据
	 * @return
	 */
	public List<OnlineEvaluationActive> queryVideoResearchActiveList();
	/**
	 * 动态保存数据
	 * @param vtrain
	 */
	public void insertActive(OnlineEvaluationActive videoResearchActive);
	/**
	 * 先根据视频调研活动评选查询数据等其他条件查询
	 * @param vtrain
	 * @return
	 */
	public Map<String, Object> queryVideoResearchByALl(OnlineEvaluationActive videoResearchActive,int pageSize,int pageNum);
	/**
	 * 根据视频调研活动评选ID查找数据
	 * @param videoId
	 * @return
	 */
	public OnlineEvaluationActive queyVideoResearchActiveById(String videoActiveId);
	/**
	 * 根据视频调研ID查找数据
	 * @param videoId
	 * @return
	 */
	public List<OnlineEvaluationActive> queyVideoResearchById(String videoResearchId);
	/**
	 * 根据id修改票数
	 * @param videoResearchActive
	 */
	public void updatevideoResearchById(String videoResearchId);
	/**
	 * 根据id字符串拼接修改票数
	 * @param videoResearchActive
	 */
	public void updatevideoResearchByIds(List<String> videoResearchId);
	/**
	 * 根据父类ID删除数据
	 * @param videoResearchId
	 */
	public void deleteByParentId(String videoResearchId);
	/**
	 * 根据父类ID查询票数数据
	 * @param videoResearchId
	 */
	public Map<String, Object> queryVideoVoteByReseachId(String videoResearchId,int pageSize, int pageNum );
	/**
	 * 根据一些列包括父类ID除子类ID条件删除数据
	 * @param videoResearchActive
	 */
	public void deleteByAll(OnlineEvaluationActive videoResearchActive);
}