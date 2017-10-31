package com.rd.yum.kwms.bean.vo;


/**
 * 仓库 vo
 * @author sun_dongxi
 *
 */
public class KwmsWareHouseInfoVo extends KwmsBaseInfoVo{


	/**
	 * 
	 */
	private static final long serialVersionUID = 7498544313838801381L;

	/**
	 * guid
	 */
	private String guid;
	
	/**
	 * 仓库编号
	 */
	private String wareHouseNo;
	
	/**
	 * 仓库名称
	 */
	private String wareHouseName;
	/**
	 * 仓库类型
	 */
	private Integer wareHouseType;
	/**
	 * 仓库状态
	 */
	private Integer wareHouseStatus;
	/**
	 * 仓库联系人
	 */
	private String wareHouseContact;
	/**
	 * 仓库联系人手机号
	 */
	private String contactMobile;
	/**
	 * 仓库地址
	 */
	private String wareHouseAdd;
	
	public String getGuid() {
		return guid;
	}
	public void setGuid(String guid) {
		this.guid = guid;
	}
	public String getWareHouseNo() {
		return wareHouseNo;
	}
	public void setWareHouseNo(String wareHouseNo) {
		this.wareHouseNo = wareHouseNo;
	}
	public String getWareHouseName() {
		return wareHouseName;
	}
	public void setWareHouseName(String wareHouseName) {
		this.wareHouseName = wareHouseName;
	}
	public String getWareHouseContact() {
		return wareHouseContact;
	}
	public void setWareHouseContact(String wareHouseContact) {
		this.wareHouseContact = wareHouseContact;
	}
	public String getContactMobile() {
		return contactMobile;
	}
	public void setContactMobile(String contactMobile) {
		this.contactMobile = contactMobile;
	}
	public String getWareHouseAdd() {
		return wareHouseAdd;
	}
	public void setWareHouseAdd(String wareHouseAdd) {
		this.wareHouseAdd = wareHouseAdd;
	}
	public Integer getWareHouseType() {
		return wareHouseType;
	}
	public void setWareHouseType(Integer wareHouseType) {
		this.wareHouseType = wareHouseType;
	}
	public Integer getWareHouseStatus() {
		return wareHouseStatus;
	}
	public void setWareHouseStatus(Integer wareHouseStatus) {
		this.wareHouseStatus = wareHouseStatus;
	}
	

	
}
