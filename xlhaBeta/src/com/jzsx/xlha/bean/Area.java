package com.jzsx.xlha.bean;

import java.util.List;

/**
 * 地区
 */
/**
 * @author wiscom
 *
 */
public class Area {

	/**
	 * 地区主键
	 */
	private String id;
	/**
	 * 地区code/地区ID
	 */
	private String code;
	/**
	 * 地区名称
	 */
	private String name;
	/**
	 * 父级地区
	 */
	private String parentId;
	/**
	 * 地区类型 级别
	 */
	private int alevel;
	/**
	 * 关联自身
	 */
	private List<Area> arealist;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public int getAlevel() {
		return alevel;
	}
	public void setAlevel(int alevel) {
		this.alevel = alevel;
	}
	public List<Area> getArealist() {
		return arealist;
	}
	public void setArealist(List<Area> arealist) {
		this.arealist = arealist;
	}
	
	
}
