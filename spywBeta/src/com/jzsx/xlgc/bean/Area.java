package com.jzsx.xlgc.bean;

import java.util.List;

/**
 * 地区
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
	 * h.323接入号
	 */
	private String hphone;
	/**
	 * sip接入号
	 */
	private String sphone;
	/**
	 * mcu的id
	 */
	private String mcu;
	/**
	 * 地区表集合
	 */
	private List<Area> arealist;
	
	
	public String getMcu() {
		return mcu;
	}
	public void setMcu(String mcu) {
		this.mcu = mcu;
	}
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
	public String getHphone() {
		return hphone;
	}
	public void setHphone(String hphone) {
		this.hphone = hphone;
	}
	public String getSphone() {
		return sphone;
	}
	public void setSphone(String sphone) {
		this.sphone = sphone;
	}
	public List<Area> getArealist() {
		return arealist;
	}
	public void setArealist(List<Area> arealist) {
		this.arealist = arealist;
	}
	
	
}
