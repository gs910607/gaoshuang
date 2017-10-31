package com.rd.yum.kwms.bean.request;

import java.io.Serializable;

/**
 * 分页参数
 * @author sun_dongxi
 *
 */
public class PageBaseRequest implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7208153810681129166L;
	
	/**
	 * 当前页
	 */
	private int pageNo;
	/**
	 * 分页个数
	 */
	private int pageSize;
	
	public int getPageNo() {
		return (pageNo-1)*pageSize;
	}
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	
	

}
