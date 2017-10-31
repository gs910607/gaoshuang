package com.rd.yum.kwms.bean.response;

import java.util.List;

import com.rd.yum.kwms.bean.vo.KwmsWareHouseInfoVo;

/**
 * 仓库response
 * @author sun_dongxi
 *
 */
public class KwmsWareHouseInfoResponse {

	/**
	 * 数据集
	 */
	private List<KwmsWareHouseInfoVo> wareHouseList;
	/**
	 * count
	 */
	private int count;
	
	public List<KwmsWareHouseInfoVo> getWareHouseList() {
		return wareHouseList;
	}
	public void setWareHouseList(List<KwmsWareHouseInfoVo> wareHouseList) {
		this.wareHouseList = wareHouseList;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	
	
}
