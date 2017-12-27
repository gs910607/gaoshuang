package com.jzsx.xlgc.videoTrain.Dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.bean.VideoTrain;
import com.jzsx.xlgc.videoNeighborhood.bean.NeighChart;

@Repository
public interface VideoTrainDao {
	/**
	 * 查询所有的视频培训数据
	 * @return
	 */
	public List<VideoTrain> queryVideoTrainList();
	/**
	 * 动态保存数据
	 * @param vtrain
	 */
	public int insertActive(VideoTrain vtrain);
	/**
	 * 先根据视频培训类型查询数据等其他条件查询
	 * @param vtrain
	 * @return
	 */
	public List<VideoTrain> queryVideoTrainListBytype(VideoTrain vtrain);
	/**
	 * 根据视频培训ID删除单条数据
	 * @param videoId
	 */
	public void deleteVideoTrainById(String videoId);
	/**
	 * 根据视频培训ID查找数据
	 * @param videoId
	 * @return
	 */
	public VideoTrain queyVideoTrainById(String videoId);
	/**
	 * 根据视频培训ID修改数据
	 * @param vtrain
	 */
	public void updateActive(VideoTrain vtrain);
	/**
	 * 根据视频培训类型获取数据
	 * @param videoTypeId
	 * @return
	 */
	public List<VideoTrain> queryVideoTrainByTypeId(int videoTypeId);
	/**
	 * 根据地区code统计数据
	 * @param neighChart
	 * @return
	 */
	public List<NeighChart> queryVideoTrainByChartCode(NeighChart neighChart);
	/**
	 * 根据地区类型统计数据
	 * @param neighChart
	 * @return
	 */
	public List<NeighChart> queryVideoTrainByChartType(NeighChart neighChart);
	/**
	 * 根据地区code获取可以参加的会议
	 * @param code
	 * @return
	 */
	public List<TVideoConference> queryByCodeOfconfer(String code);
}
