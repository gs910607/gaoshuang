package com.jzsx.xlgc.bean;

import java.util.Date;

public class TMediatePerson {
	
	private String id;//id
	
	private String name;//姓名，调解人/被调解人
	
	private String cellPhone;//手机号码
	
	private String tellPhone;//电话号码
	
	private String mediationAddress;// 调解人/被调解人，所在地址code
	
	private String address;//具体地址，文字展示
	
	private String identity;//证件号码
	
	private String unit;//调解人单位
	
	private String identityType;//证件类型
	
	private Integer personType;//人物类型（调解人为2/被调解人1）
	
	private Integer partiespeople;//被调解人旁听人数
	
	private Integer mediatepeople;//调解员人数
	
	private String mediateunit;//调解人所在单位
	
	private String mediateid;//对应调解信息主键id
	
	private String mcu;//人物所在地mcu
	
    private String beforeUrl;//协议文件
    
    private String afterUrl;//签字后的协议文本
    
    private Date createTime;//创建时间
	
    private Date startTime;
    
    private Date stopTime;
    
    
    

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getStopTime() {
		return stopTime;
	}

	public void setStopTime(Date stopTime) {
		this.stopTime = stopTime;
	}

	public String getBeforeUrl() {
		return beforeUrl;
	}

	public void setBeforeUrl(String beforeUrl) {
		this.beforeUrl = beforeUrl;
	}

	public String getAfterUrl() {
		return afterUrl;
	}

	public void setAfterUrl(String afterUrl) {
		this.afterUrl = afterUrl;
	}

	public Integer getPartiespeople() {
		return partiespeople;
	}

	public void setPartiespeople(Integer partiespeople) {
		this.partiespeople = partiespeople;
	}

	public Integer getMediatepeople() {
		return mediatepeople;
	}

	public void setMediatepeople(Integer mediatepeople) {
		this.mediatepeople = mediatepeople;
	}

	public String getMediateunit() {
		return mediateunit;
	}

	public void setMediateunit(String mediateunit) {
		this.mediateunit = mediateunit;
	}

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCellPhone() {
		return cellPhone;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}

	public String getTellPhone() {
		return tellPhone;
	}

	public void setTellPhone(String tellPhone) {
		this.tellPhone = tellPhone;
	}


	public String getMediationAddress() {
		return mediationAddress;
	}

	public void setMediationAddress(String mediationAddress) {
		this.mediationAddress = mediationAddress;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getIdentity() {
		return identity;
	}

	public void setIdentity(String identity) {
		this.identity = identity;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getIdentityType() {
		return identityType;
	}

	public void setIdentityType(String identityType) {
		this.identityType = identityType;
	}

	public Integer getPersonType() {
		return personType;
	}

	public void setPersonType(Integer personType) {
		this.personType = personType;
	}

	public String getMediateid() {
		return mediateid;
	}

	public void setMediateid(String mediateid) {
		this.mediateid = mediateid;
	}
	

	
}
