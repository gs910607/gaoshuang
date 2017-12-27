package com.jzsx.xlgc.bean;

import java.util.Date;

import org.springframework.context.annotation.ComponentScan.Filter;

import com.alibaba.fastjson.annotation.JSONField;

public class TVideoConference {
    private String confId;

    private String name;

    private Date beginTime;

    private String duration;

    private String accessCode;

    private String recorderAddr;

    private Integer isRecording;

    private String chairmanPassword;

    private Integer mainMcuId;

    private String sites;

    private Integer type;

    private String createName;
    
    private Integer status;
    
    private String userId;
    
    private Date start;
    
    private Date stop;
    
    

    public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

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

	public String getConfId() {
        return confId;
    }

    public void setConfId(String confId) {
        this.confId = confId == null ? null : confId.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    @JSONField(name="beginTime",format="yyyy-MM-dd HH:mm:ss")
    public Date getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(Date beginTime) {
        this.beginTime = beginTime;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration == null ? null : duration.trim();
    }

    public String getAccessCode() {
        return accessCode;
    }

    public void setAccessCode(String accessCode) {
        this.accessCode = accessCode == null ? null : accessCode.trim();
    }

    public String getRecorderAddr() {
        return recorderAddr;
    }

    public void setRecorderAddr(String recorderAddr) {
        this.recorderAddr = recorderAddr == null ? null : recorderAddr.trim();
    }

    public Integer getIsRecording() {
        return isRecording;
    }

    public void setIsRecording(Integer isRecording) {
        this.isRecording = isRecording;
    }

    public String getChairmanPassword() {
        return chairmanPassword;
    }

    public void setChairmanPassword(String chairmanPassword) {
        this.chairmanPassword = chairmanPassword == null ? null : chairmanPassword.trim();
    }

    public Integer getMainMcuId() {
        return mainMcuId;
    }

    public void setMainMcuId(Integer mainMcuId) {
        this.mainMcuId = mainMcuId;
    }

    public String getSites() {
        return sites;
    }

    public void setSites(String sites) {
        this.sites = sites == null ? null : sites.trim();
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getCreateName() {
        return createName;
    }

    public void setCreateName(String createName) {
        this.createName = createName == null ? null : createName.trim();
    }
}