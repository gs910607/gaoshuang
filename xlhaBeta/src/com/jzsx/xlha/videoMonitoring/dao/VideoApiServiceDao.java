package com.jzsx.xlha.videoMonitoring.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jzsx.xlha.videoMonitoring.bean.VideoCamera;
import com.jzsx.xlha.videoMonitoring.bean.VideoInfo;

@Repository
public interface VideoApiServiceDao {
	
	/**
	 * 插入数据到t_video_videoinfo
	 * @param videoInfo
	 * @return
	 */
	public void insertvideoinfo(VideoInfo videoInfo);
	
	/**
	 * 查询数据
	 * @param code
	 * @return	List<VideoInfo>
	 */
	public List<VideoInfo> selectVideoInfo(VideoInfo videoInfo);
	
	
	/**
	 * 删除数据
	 * @param code
	 * @return	List<VideoInfo>
	 */
	public void deleteVideoInfo();
	
	/**
	 * 更新数据
	 * @param code
	 * @return	List<VideoInfo>
	 */
	public void updateVideoInfo(VideoInfo videoInfo);
	
	/**
	 * 查询总数
	 * @param videoInfo
	 * @return	String
	 */
	public String selectacount(VideoInfo videoInfo);
	/**
	 * 获取所属区域设备信息
	 * @param videoCamera
	 * @return
	 */
	public List<VideoCamera> queryVideoCamera(VideoCamera videoCamera);
}
