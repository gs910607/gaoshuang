package com.rd.yum.kwms.bean.vo;

import java.io.Serializable;

/**
 * kwms　Base
 * @author sun_dongxi
 *
 */
public class KwmsBaseInfoVo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -1841112915061485274L;

	/**
	 * 创建id
	 */
	private String createId;
	/**
	 * 创建时间
	 */
	private long createTime;
	/**
	 * 更新id
	 */
	private String updateId;
	/**
	 * 更新时间
	 */
	private long updateTime;
	
	public String getCreateId() {
		return createId;
	}
	public void setCreateId(String createId) {
		this.createId = createId;
	}
	public String getUpdateId() {
		return updateId;
	}
	public void setUpdateId(String updateId) {
		this.updateId = updateId;
	}
	public long getCreateTime() {
		return createTime;
	}
	public void setCreateTime(long createTime) {
		this.createTime = createTime;
	}
	public long getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(long updateTime) {
		this.updateTime = updateTime;
	}
	
	
}
