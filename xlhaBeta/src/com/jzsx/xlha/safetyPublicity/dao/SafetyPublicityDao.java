package com.jzsx.xlha.safetyPublicity.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jzsx.xlha.bean.SafetyPublicity;
@Repository
public interface SafetyPublicityDao {

	/**
	 * 动态保存平安宣传数据
	 * @param safetyPublicity
	 */
	public void insertActive(SafetyPublicity safetyPublicity);
	/**
	 * 动态修改平安宣传数据
	 * @param safetyPublicity
	 */
	public void updateActive(SafetyPublicity safetyPublicity);
	/**
	 * 根据ID查找平安宣传数据
	 * @param safetyPyId
	 * @return
	 */
	public SafetyPublicity queryById(String safetyPyId);
	/**
	 * 查找平安宣传的数据
	 * @return
	 */
	public List<SafetyPublicity> querylist();
	/**
	 * 根据条件查找平安宣传数据
	 * @param safetyPublicity
	 * @return
	 */
	public List<SafetyPublicity> querylistAll(SafetyPublicity safetyPublicity);
	/**
	 * 根据ID删除平安宣传数据
	 * @param safetyPyId
	 */
	public void deleteById(String safetyPyId);
	/**
	 * 根据平安宣传id累加查看次数
	 * @param safetyPublicity
	 */
	public void updateActiveByViewCount(SafetyPublicity safetyPublicity);
	/**
	 * 通过视频培训的类别数据根据条件展示数据
	 * @param safetyPublicity
	 * @return
	 */
	public List<SafetyPublicity> querySafeByAll(SafetyPublicity safetyPublicity);
	/**
	 * 通过视频培训的类别数据根据id展示数据
	 * @param safetyPyId
	 * @return
	 */
	public SafetyPublicity querySafeById(String safetyPyId);
	/**
	 * 通过视频培训的类别数据记录浏览量
	 * @param safetyPublicity
	 * @return
	 */
	public int updateActiveSafeByViewCount(SafetyPublicity safetyPublicity);
}
