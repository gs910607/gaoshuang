package com.jzsx.xlgc.area.Service;

import java.util.List;

import com.jzsx.xlgc.bean.Area;

public interface AreaService {

	/**
	 * 查询所有的地区数据
	 * @return
	 */
	public List<Area> queryList();
	
	public List<Area> queryListq();
	/**
	 * 动态保存数据
	 * @param area
	 */
	public void insertActive(Area area);
	/**
	 * 先根据地区查询数据等其他条件查询
	 * @param area
	 * @return
	 */
	public List<Area> queryByALl(Area area);
	/**
	 * 根据地区ID查找数据
	 * @param id
	 * @return
	 */
	public Area queryById(String id);
	/**
	 * 根据地区code查找数据
	 * @param code
	 * @return
	 */
	public Area queryByCode(String code);
	/**
	 * 根据地区parentId查找数据
	 * @param parentId
	 * @return
	 */
	public List<Area> queryByParentId(String parentId);
	/**
	 * 根据地区parentId查找子类所有数据
	 * @param parentId
	 * @return
	 */
	public List<Area> queryBychilds(String parentId);
	/**
	 * 根据地区的村code查找数据市区县乡镇数据
	 * @param code
	 * @return
	 */
	public List<Area> queryByParents(String code);
	
	/**
	 * 动态修改数据
	 * @param area
	 */
	public void updateActive(Area area);
	/**
	 * 根据ID删除数据
	 * @param id
	 */
	public void deleteById(String id);
	
	/**
	 * 根据地区名称模糊查询出数据
	 * @param name
	 * @return
	 */
	public List<Area> queryByName(String name);
}
