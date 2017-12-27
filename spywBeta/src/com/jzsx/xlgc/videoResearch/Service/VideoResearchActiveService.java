package com.jzsx.xlgc.videoResearch.Service;

import java.util.List;
import java.util.Map;

import com.jzsx.xlgc.bean.VideoResearch;
import com.jzsx.xlgc.bean.VideoResearchActive;
import com.jzsx.xlgc.bean.VideoTrain;

public interface VideoResearchActiveService {
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
	public Map<String, Object> queryVideoResearchByALl(VideoResearchActive videoResearchActive,int pageSize,int pageNum);
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
	public Map<String, Object> queryVideoVoteByReseachId(String videoResearchId,int pageSize, int pageNum );
	/**
	 * 根据一些列包括父类ID除子类ID条件删除数据
	 * @param videoResearchActive
	 */
	public void deleteByAll(VideoResearchActive videoResearchActive);
}
