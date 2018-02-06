package com.jzsx.xlgc.videoMonitoring.Dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jzsx.xlgc.bean.VideoNeighborhood;
import com.jzsx.xlgc.videoMonitoring.bean.VideoCamera;
import com.jzsx.xlgc.videoMonitoring.bean.VideoInfo;

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
	
	
	/** 查询所有的视频数据
	 * 获取所属区域设备信息
	 * @param 
	 * @return List<VideoInfo>
	 */
	public List<String> selectVideoAll();
}
