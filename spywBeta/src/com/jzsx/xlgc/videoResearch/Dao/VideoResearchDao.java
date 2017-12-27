package com.jzsx.xlgc.videoResearch.Dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jzsx.xlgc.bean.VideoResearch;

@Repository
public interface VideoResearchDao {
	/**
	 * 查询所有的视频调研数据
	 * @return
	 */
	public List<VideoResearch> queryVideoResearchList();
	/**
	 * 动态保存数据
	 * @param vtrain
	 */
	public void insertActive(VideoResearch videoResearch);
	/**
	 * 先根据视频调研查询数据等其他条件查询
	 * @param vtrain
	 * @return
	 */
	public List<VideoResearch> queryVideoResearchByALl(VideoResearch videoResearch);
	/**
	 * 根据视频调研ID查找数据
	 * @param videoId
	 * @return
	 */
	public VideoResearch queyVideoResearchById(String videoResearchId);
	/**
	 * 根据视频调研ID删除数据
	 * @param videoResearchId
	 */
	public void deleteById(String videoResearchId);
	/**
	 * 动态修改编辑
	 * @param videoResearch
	 */
	public void updateActive(VideoResearch videoResearch);
}
