package com.jzsx.xlha.bean;

import java.math.BigDecimal;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class TLegalPublicity {
	
    private String cLegalId;//法制宣传id=videoId

    private BigDecimal cLegalType;//发布的宣传类型，0为文字+图片，1为文字+视频

    private String cLegalTitle;//标题=videoName

    private String cLegalContent;//文字内容=videoRemark

    private String cLegalImage;//图片

    private String cLegalVideo;//视频

    private String cLegalStarttime;//开始时间(多余字段，未使用)

    private String cLegalStoptime;//结束时间(多余字段，未使用)

    private String cForeignUserid;//发布者的用户权限，对应用户表usergroupid字段

    private Date cLegalCreatetime;//创建时间=videoTime

    private String cLegalCreate;//创建者姓名=videorealName

    private String cLegalEditor;//编辑者=videorealName

    private BigDecimal cLegalCount;//浏览次数
    
    private Date stop;//绑定前端传递的查询结束时间
    
    private Date start;//绑定前端传递的查询开始时间

    public Date getStop() {
		return stop;
	}

	public void setStop(Date stop) {
		this.stop = stop;
	}

	public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	@JSONField(name="editor")
	public String getcLegalEditor() {
		return cLegalEditor;
	}

	public void setcLegalEditor(String cLegalEditor) {
		this.cLegalEditor = cLegalEditor;
	}

	@JSONField(name="create")
	public String getcLegalCreate() {
		return cLegalCreate;
	}

	public void setcLegalCreate(String cLegalCreate) {
		this.cLegalCreate = cLegalCreate;
	}


	@JSONField(name="count")
	public BigDecimal getcLegalCount() {
		return cLegalCount;
	}

	public void setcLegalCount(BigDecimal cLegalCount) {
		this.cLegalCount = cLegalCount;
	}

	@JSONField(name = "CLegalId")
	public String getcLegalId() {
		return cLegalId;
	}

	public void setcLegalId(String cLegalId) {
		this.cLegalId = cLegalId == null ? null : cLegalId.trim();
	}

	@JSONField(name = "CLegalType")
	public BigDecimal getcLegalType() {
		return cLegalType;
	}

	public void setcLegalType(BigDecimal cLegalType) {
		this.cLegalType = cLegalType;
	}

	@JSONField(name = "CLegalTitle")
	public String getcLegalTitle() {
		return cLegalTitle;
	}

	public void setcLegalTitle(String cLegalTitle) {
		this.cLegalTitle = cLegalTitle == null ? null : cLegalTitle.trim();
	}

	@JSONField(name = "CLegalContent")
	public String getcLegalContent() {
		return cLegalContent;
	}

	public void setcLegalContent(String cLegalContent) {
		this.cLegalContent = cLegalContent == null ? null : cLegalContent.trim();
	}

	@JSONField(name = "CLegalImage")
	public String getcLegalImage() {
		return cLegalImage;
	}

	public void setcLegalImage(String cLegalImage) {
		this.cLegalImage = cLegalImage == null ? null : cLegalImage.trim();
	}

	@JSONField(name = "CLegalVideo")
	public String getcLegalVideo() {
		return cLegalVideo;
	}

	public void setcLegalVideo(String cLegalVideo) {
		this.cLegalVideo = cLegalVideo == null ? null : cLegalVideo.trim();
	}

	@JSONField(name = "CLegalStarttime")
	public String getcLegalStarttime() {
		return cLegalStarttime;
	}

	public void setcLegalStarttime(String cLegalStarttime) {
		this.cLegalStarttime = cLegalStarttime == null ? null : cLegalStarttime.trim();
	}

	@JSONField(name = "CLegalStoptime")
	public String getcLegalStoptime() {
		return cLegalStoptime;
	}

	public void setcLegalStoptime(String cLegalStoptime) {
		this.cLegalStoptime = cLegalStoptime == null ? null : cLegalStoptime.trim();
	}

	@JSONField(name = "CForeignUserid")
	public String getcForeignUserid() {
		return cForeignUserid;
	}

	public void setcForeignUserid(String cForeignUserid) {
		this.cForeignUserid = cForeignUserid == null ? null : cForeignUserid.trim();
	}

	@JSONField(name = "CLegalCreatetime",format="yyyy-MM-dd HH:mm:ss")
	public Date getcLegalCreatetime() {
		return cLegalCreatetime;
	}

	public void setcLegalCreatetime(Date cLegalCreatetime) {
		this.cLegalCreatetime = cLegalCreatetime;
	}
}