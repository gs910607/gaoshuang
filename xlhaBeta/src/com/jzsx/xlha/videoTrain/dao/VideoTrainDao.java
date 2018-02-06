package com.jzsx.xlha.videoTrain.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jzsx.xlha.bean.TLegalPublicity;
import com.jzsx.xlha.bean.VideoTrain;

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
	public void insertActive(VideoTrain vtrain);
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
	 * 根据视频培训id和类别添加浏览次数
	 * @param vtrain
	 * @return
	 */
	public int updateVotePlus(VideoTrain vtrain);
	/**
	 * 法制宣传根据条件展示数据
	 * @param legalPublicity
	 * @return
	 */
	public List<TLegalPublicity> queryLegByAll(TLegalPublicity legalPublicity);
	/**
	 * 法制宣传根据id查询数据
	 * @param cLegalId
	 * @return
	 */
	public TLegalPublicity queryLegById(String cLegalId);
}
