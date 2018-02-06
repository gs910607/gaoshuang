package com.jzsx.xlgc.videoNeighborhood.Service;

import java.util.List;
import java.util.Map;

import com.jzsx.xlgc.bean.VideoNeighborhood;
import com.jzsx.xlgc.bean.VideoTrain;
import com.jzsx.xlgc.videoNeighborhood.bean.NeighChart;

public interface VideoNeighborhoodService {
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
	public Map<String, Object> queryVideoNeighborhoodByALl(VideoNeighborhood videoNeighborhood,int pageSize,int pageNum);
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
	 * 根据类型年份code统计视频接访
	 * @param neighChart
	 * @return
	 */
	public List<NeighChart> queryTypeneighmonth(NeighChart neighChart);
	/**
	 * 根据类型月份统计视频接访
	 * @param neighChart
	 * @return
	 */
	public List<NeighChart> queryTypeneighmonths(NeighChart neighChart);
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
	/**
	 * 根据code查询当前总条数
	 * @param videoneihdLocationplace
	 * @return
	 */
	public int queryByCodeofcount(String videoneihdLocationplace);
}
