package com.jzsx.xlha.videoTrain.service;

import java.util.List;

import com.jzsx.xlha.bean.VideoType;

public interface VideoTypeService {
	/**
	 * 查询所有的视频培训类型
	 * @return
	 */
	public List<VideoType> queryVideoTypeList();
	/**
	 * 动态保存数据
	 * @param vtype
	 */
	public void insertActive(VideoType vtype);
	/**
	 * 根据视频培训类型id筛选不包括本id的其他数据
	 * @param videoTypeId
	 * @return
	 */
	public List<VideoType> queryVideoTypeByIdNotEqual(int videoTypeId);
}
