package com.jzsx.xlgc.videoNeighborhood.Dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jzsx.xlgc.bean.VideoNeighborhood;
import com.jzsx.xlgc.bean.VideoTrain;
import com.jzsx.xlgc.videoNeighborhood.bean.NeighChart;

@Repository
public interface VideoNeighborhoodDao {
	/**
	 * 查询所有的视频接访数据
	 * @return
	 */
	public List<VideoNeighborhood> queryVideoNeighborhoodList();
	/**
	 * 动态保存数据
	 * @param vtrain
	 */
	public int insertActive(VideoNeighborhood videoNeighborhood);
	/**
	 * 先根据视频接访查询数据等其他条件查询
	 * @param vtrain
	 * @return
	 */
	public List<VideoNeighborhood> queryVideoNeighborhoodByALl(VideoNeighborhood videoNeighborhood);
	/**
	 * 根据视频接访ID查找数据
	 * @param videoId
	 * @return
	 */
	public VideoNeighborhood queyVideoTrainById(String videoneihdId);
	/**
	 * 动态修改数据
	 * @param videoNeighborhood
	 */
	public void updateActive(VideoNeighborhood videoNeighborhood);
	/**
	 * 根据ID删除数据
	 * @param videoneihdId
	 */
	public void deleteById(String videoneihdId);
	/**
	 * 根据年月日统计视频接访
	 * @param neighChart
	 * @return
	 */
	public List<NeighChart> queyneighChart(NeighChart neighChart);
	/**
	 * 根据地区年月日统计视频接访
	 * @param neighChart
	 * @return
	 */
	public List<NeighChart> queyneighCharts(NeighChart neighChart);
	/**
	 * 根据地区月份code统计视频接访
	 * @param neighChart
	 * @return
	 */
	public List<NeighChart> queryneighmonth(NeighChart neighChart);
	/**
	 * 根据ID修改状态
	 * @param videoNeighborhood
	 */
	public int updateActiveByIdOfState(VideoNeighborhood videoNeighborhood);
	/**
	 * 根据ID修改会议id
	 * @param videoNeighborhood
	 */
	public void updateActiveByIdOfConfId(VideoNeighborhood videoNeighborhood);
}
