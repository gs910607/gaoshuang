package com.jzsx.xlha.bean;

import java.math.BigDecimal;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class TPoliticsHot {
    private String cPoliticsId;

    private BigDecimal cPoliticsType;

    private String cPoliticsTitle;

    private String cPoliticsImage;

    private String cPoliticsVideo;

    private String cPoliticsStarttime;

    private String cPoliticsStoptime;

    private String cForeignUserid;

    private Date cPoliticsCreatetime;

    private String cPoliticsCreate;

    private String cPoliticsEditor;

    private BigDecimal cPoliticsCount;

    private String cPoliticsContent;
    
    
    private Date start;
    
    private Date stop;

    public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public Date getStop() {
		return stop;
	}

	public void setStop(Date stop) {
		this.stop = stop;
	}

	@JSONField(name="id")
    public String getcPoliticsId() {
        return cPoliticsId;
    }

    public void setcPoliticsId(String cPoliticsId) {
        this.cPoliticsId = cPoliticsId == null ? null : cPoliticsId.trim();
    }

    @JSONField(name="type")
    public BigDecimal getcPoliticsType() {
        return cPoliticsType;
    }

    public void setcPoliticsType(BigDecimal cPoliticsType) {
        this.cPoliticsType = cPoliticsType;
    }

    @JSONField(name="title")
    public String getcPoliticsTitle() {
        return cPoliticsTitle;
    }

    public void setcPoliticsTitle(String cPoliticsTitle) {
        this.cPoliticsTitle = cPoliticsTitle == null ? null : cPoliticsTitle.trim();
    }

    @JSONField(name="image")
    public String getcPoliticsImage() {
        return cPoliticsImage;
    }

    public void setcPoliticsImage(String cPoliticsImage) {
        this.cPoliticsImage = cPoliticsImage == null ? null : cPoliticsImage.trim();
    }

    @JSONField(name="video")
    public String getcPoliticsVideo() {
        return cPoliticsVideo;
    }

    public void setcPoliticsVideo(String cPoliticsVideo) {
        this.cPoliticsVideo = cPoliticsVideo == null ? null : cPoliticsVideo.trim();
    }

    @JSONField(name="start")
    public String getcPoliticsStarttime() {
        return cPoliticsStarttime;
    }

    public void setcPoliticsStarttime(String cPoliticsStarttime) {
        this.cPoliticsStarttime = cPoliticsStarttime == null ? null : cPoliticsStarttime.trim();
    }

    @JSONField(name="stop")
    public String getcPoliticsStoptime() {
        return cPoliticsStoptime;
    }

    public void setcPoliticsStoptime(String cPoliticsStoptime) {
        this.cPoliticsStoptime = cPoliticsStoptime == null ? null : cPoliticsStoptime.trim();
    }

    @JSONField(name="forgien")
    public String getcForeignUserid() {
        return cForeignUserid;
    }

    public void setcForeignUserid(String cForeignUserid) {
        this.cForeignUserid = cForeignUserid == null ? null : cForeignUserid.trim();
    }

    @JSONField(name="createTime",format="yyyy-MM-dd HH:mm:ss")
    public Date getcPoliticsCreatetime() {
        return cPoliticsCreatetime;
    }

    public void setcPoliticsCreatetime(Date cPoliticsCreatetime) {
        this.cPoliticsCreatetime = cPoliticsCreatetime;
    }

    @JSONField(name="create")
    public String getcPoliticsCreate() {
        return cPoliticsCreate;
    }

    public void setcPoliticsCreate(String cPoliticsCreate) {
        this.cPoliticsCreate = cPoliticsCreate == null ? null : cPoliticsCreate.trim();
    }

    @JSONField(name="editer")
    public String getcPoliticsEditor() {
        return cPoliticsEditor;
    }

    public void setcPoliticsEditor(String cPoliticsEditor) {
        this.cPoliticsEditor = cPoliticsEditor == null ? null : cPoliticsEditor.trim();
    }

    @JSONField(name="count")
    public BigDecimal getcPoliticsCount() {
        return cPoliticsCount;
    }

    public void setcPoliticsCount(BigDecimal cPoliticsCount) {
        this.cPoliticsCount = cPoliticsCount;
    }

    @JSONField(name="content")
    public String getcPoliticsContent() {
        return cPoliticsContent;
    }

    public void setcPoliticsContent(String cPoliticsContent) {
        this.cPoliticsContent = cPoliticsContent == null ? null : cPoliticsContent.trim();
    }
}