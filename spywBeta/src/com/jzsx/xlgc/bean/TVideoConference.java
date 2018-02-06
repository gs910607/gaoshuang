package com.jzsx.xlgc.bean;

import java.util.Date;

import org.springframework.context.annotation.ComponentScan.Filter;

import com.alibaba.fastjson.annotation.JSONField;

public class TVideoConference {
    private String confId;//会议id

    private String name;//会议名称

    private Date beginTime;//会议开始时间

    private String duration;//会议时长

    private String accessCode;//会议标识码

    private String recorderAddr;//直播地址

    private Integer isRecording;//是否支持录播

    private String chairmanPassword;//主席密码

    private Integer mainMcuId;//主mcu

    private String sites;//会场信息

    private Integer type;//类型

    private String createName;//创建者
    
    private Integer status;//状态
    
    private String userId;//创建者的地区表code,对应user表的groupid字段
    
    private Date start;//开始时间（用作搜索条件）
    
    private Date stop;//结束时间（用作搜索条件）
    
    

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

	@Override
	public String toString() {
		return "TVideoConference [name=" + name + ", beginTime=" + beginTime + ", duration=" + duration
				+ ", accessCode=" + accessCode + ", isRecording=" + isRecording + "]";
	}
    
    
}