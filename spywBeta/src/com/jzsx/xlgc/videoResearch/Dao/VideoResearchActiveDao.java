package com.jzsx.xlgc.videoResearch.Dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jzsx.xlgc.bean.VideoResearch;
import com.jzsx.xlgc.bean.VideoResearchActive;

@Repository
public interface VideoResearchActiveDao {
	/**
	 * 查询所有的视频调研活动评选数据
	 * @return
	 */
	public List<VideoResearchActive> queryVideoResearchActiveList();
	/**
	 * 动态保存数据
	 * @param vtrain
	 */
	public void insertActive(VideoResearchActive videoResearchActive);
	/**
	 * 先根据视频调研活动评选查询数据等其他条件查询
	 * @param vtrain
	 * @return
	 */
	public List<VideoResearchActive> queryVideoResearchActiveByALl(VideoResearchActive videoResearchActive);
	/**
	 * 根据视频调研活动评选ID查找数据
	 * @param videoId
	 * @return
	 */
	public VideoResearchActive queyVideoResearchActiveById(String videoActiveId);
	/**
	 * 根据视频调研ID查找数据
	 * @param videoId
	 * @return
	 */
	public List<VideoResearchActive> queyVideoResearchById(String videoResearchId);
	/**
	 * 根据id修改票数
	 * @param videoResearchActive
	 */
	public void updatevideoResearchById(String videoResearchId);
	/**
	 * 根据父类ID删除数据
	 * @param videoResearchId
	 */
	public void deleteByParentId(String videoResearchId);
	/**
	 * 根据父类ID查询票数数据
	 * @param videoResearchId
	 */
	public List<VideoResearchActive> queryVideoVoteByReseachId(String videoResearchId);
	/**
	 * 根据一些列包括父类ID除子类ID条件删除数据
	 * @param videoResearchActive
	 */
	public void deleteByAll(VideoResearchActive videoResearchActive);
}
