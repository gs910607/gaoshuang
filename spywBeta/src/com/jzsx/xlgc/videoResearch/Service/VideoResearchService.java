package com.jzsx.xlgc.videoResearch.Service;

import java.util.List;
import java.util.Map;

import com.jzsx.xlgc.bean.VideoResearch;
import com.jzsx.xlgc.bean.VideoTrain;

public interface VideoResearchService {
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
	public Map<String, Object> queryVideoResearchByALl(VideoResearch videoResearch,int pageSize,int pageNum);
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
