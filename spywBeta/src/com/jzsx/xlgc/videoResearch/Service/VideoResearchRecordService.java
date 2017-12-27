package com.jzsx.xlgc.videoResearch.Service;

import java.util.List;
import java.util.Map;

import com.jzsx.xlgc.bean.VideoResearchActive;
import com.jzsx.xlgc.bean.VideoResearchRecord;

public interface VideoResearchRecordService {

	/**
	 * 动态保存数据
	 * @param vtrain
	 */
	public void insertActive(VideoResearchRecord videoResearchRecord);
	
	/**
	 * 根据视频调研记录ID查找数据
	 * @param videoId
	 * @return
	 */
	public List<VideoResearchRecord> queyVideoResearchRecordById(VideoResearchRecord videoResearchRecord);
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
	public Map<String, Object> queryByAll(VideoResearchRecord videoResearchRecord,int pageSize,int pageNum);
	/**
	 * 根据父id删除数据
	 * @param videoResearchReId
	 * @return
	 */
	public int deleteByParentId(String videoResearchReId);
}
