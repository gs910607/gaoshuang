package com.jzsx.xlha.safetyPublicity.service;

import java.util.List;
import java.util.Map;

import com.jzsx.xlha.bean.SafetyPublicity;

public interface SafetyPublicityService {

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
	public Map<String, Object> querylistAll(SafetyPublicity safetyPublicity,int pagesize,int pageNum);
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
	public List<SafetyPublicity> querySafeByListAll(SafetyPublicity safetyPublicity);
	/**
	 * 通过视频培训的类别数据根据条件展示数据
	 * @param safetyPublicity
	 * @return
	 */
	public Map<String, Object> querySafeMapAll(SafetyPublicity safetyPublicity,int pagesize,int pageNum);
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
