package com.jzsx.xlha.bean;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;

import javax.persistence.Transient;

import com.alibaba.fastjson.annotation.JSONField;

public class TThreeservicePublic {
	private String cThreeserviceId;

	private String cThreeserviceType;

	private String cThreeserviceTitle;

	private Date cThreeserviceCreatetime;

	private String cForeignUserid;

	private String cThreeserviceEditer;

	private String cThreeserviceCreate;

	private BigDecimal cThreeserviceCount;

	private String cThreeserviceContent;

    private Date startTime;

    private Date endTime;
    
    

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}


	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	@JSONField(name="id")
	public String getcThreeserviceId() {
		return cThreeserviceId;
	}

	public void setcThreeserviceId(String cThreeserviceId) {
		this.cThreeserviceId = cThreeserviceId == null ? null : cThreeserviceId.trim();
	}

	@JSONField(name="type")
	public String getcThreeserviceType() {
		return cThreeserviceType;
	}

	public void setcThreeserviceType(String cThreeserviceType) {
		this.cThreeserviceType = cThreeserviceType == null ? null : cThreeserviceType.trim();
	}

	@JSONField(name="title")
	public String getcThreeserviceTitle() {
		return cThreeserviceTitle;
	}

	public void setcThreeserviceTitle(String cThreeserviceTitle) {
		this.cThreeserviceTitle = cThreeserviceTitle == null ? null : cThreeserviceTitle.trim();
	}

	@JSONField(name="time",format="yyyy-MM-dd")
	public Date getcThreeserviceCreatetime() {
		return cThreeserviceCreatetime;
	}

	public void setcThreeserviceCreatetime(Date cThreeserviceCreatetime) {
		this.cThreeserviceCreatetime = cThreeserviceCreatetime;
	}

	@JSONField(name="forgien")
	public String getcForeignUserid() {
		return cForeignUserid;
	}

	public void setcForeignUserid(String cForeignUserid) {
		this.cForeignUserid = cForeignUserid == null ? null : cForeignUserid.trim();
	}

	@JSONField(name="editor")
	public String getcThreeserviceEditer() {
		return cThreeserviceEditer;
	}

	public void setcThreeserviceEditer(String cThreeserviceEditer) {
		this.cThreeserviceEditer = cThreeserviceEditer == null ? null : cThreeserviceEditer.trim();
	}

	@JSONField(name="create")
	public String getcThreeserviceCreate() {
		return cThreeserviceCreate;
	}

	public void setcThreeserviceCreate(String cThreeserviceCreate) {
		this.cThreeserviceCreate = cThreeserviceCreate == null ? null : cThreeserviceCreate.trim();
	}

	@JSONField(name="count")
	public BigDecimal getcThreeserviceCount() {
		return cThreeserviceCount;
	}

	public void setcThreeserviceCount(BigDecimal cThreeserviceCount) {
		this.cThreeserviceCount = cThreeserviceCount;
	}

	@JSONField(name="content")
	public String getcThreeserviceContent() {
		return cThreeserviceContent;
	}

	public void setcThreeserviceContent(String cThreeserviceContent) {
		this.cThreeserviceContent = cThreeserviceContent == null ? null : cThreeserviceContent.trim();
	}

	@Override
	public String toString() {
		return "TThreeservicePublic [cThreeserviceId=" + cThreeserviceId + ", cThreeserviceType=" + cThreeserviceType
				+ ", cThreeserviceTitle=" + cThreeserviceTitle + ", cThreeserviceCreatetime=" + cThreeserviceCreatetime
				+ ", cForeignUserid=" + cForeignUserid + ", cThreeserviceEditer=" + cThreeserviceEditer
				+ ", cThreeserviceCreate=" + cThreeserviceCreate + ", cThreeserviceCount=" + cThreeserviceCount
				+ ", cThreeserviceContent=" + cThreeserviceContent + "]";
	}
	
	
}