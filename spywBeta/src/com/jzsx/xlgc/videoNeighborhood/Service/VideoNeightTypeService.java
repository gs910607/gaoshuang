package com.jzsx.xlgc.videoNeighborhood.Service;

import java.util.List;

import com.jzsx.xlgc.bean.VideoNeightType;


public interface VideoNeightTypeService {
	/**
	 * 查询所有的视频接访类型数据
	 * @return
	 */
	public List<VideoNeightType> queryList();
	/**
	 * 根据视频接访类型ID查找数据
	 * @param videoId
	 * @return
	 */
	public VideoNeightType queyById(int neightTypeId);
}
