package com.rd.yum.kwms.bean.request;

import java.io.Serializable;

public class KwmsQueryWareHouseInfoByGuidRequest implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8783301779760575994L;
	
	/**
	 * 仓库id
	 */
	private String guid;


	public String getGuid() {
		return guid;
	}


	public void setGuid(String guid) {
		this.guid = guid;
	}
	
	
	

}
