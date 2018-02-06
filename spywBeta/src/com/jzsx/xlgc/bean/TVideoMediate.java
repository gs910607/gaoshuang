package com.jzsx.xlgc.bean;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Transient;

import com.alibaba.fastjson.annotation.JSONField;

public class TVideoMediate {
    private String mediateid;//id

    private String mediateName;//书记员姓名

    private String mediatePid;//*

    private String mediateAddress;//书记员所在调解地

    private String mediatePidNumber;//*  *代表保留字段 暂时无意义

    private String mediateTelephone;//*

    private String mediateCellphone;//*

    private String mediateCompleteAdd;//书记员单位

    private String mediateIdentifier;//调节编号

    private String mediateRegisUnit;//登记单位

    private String mediatePurpose;//调节目的

    @JSONField(format="yyyy-MM-dd")
    private String mediateDate;//调节时间

    private String mediateRegisName;//登记人

    private String mediateRegisBranch;//登记科室

    @JSONField(format="yyyy-MM-dd")
    private String mediateRegisDate;//登记时间

    private String mediateReason;//调节原因

    private String mediateContent;//调解概况

    private String mediateProtocol;//调节类型

    private BigDecimal mediaterStatus;//状态

    private String mediateNumber;//人数
    
    private String mediateCode;//创建者区域code，
    
    private String title ;//会议标题
    
    @Transient
    @JSONField(serialize=false)
    private String district;
    
    @Transient
    @JSONField(serialize=false)
    private String county;
    
    @Transient
    @JSONField(serialize=false)
    private String village;
    
    @Transient
    @JSONField(serialize=false)
    private String stopTime;
    
    
    private String confId;
    
    
    private Area areas;
    
    //作为导出时的状态
    private String staus;
    
    private TVideoConference conference;
    

    
    
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStaus() {
		return staus;
	}

	public void setStaus(String staus) {
		this.staus = staus;
	}

	public String getConfId() {
		return confId;
	}

	public void setConfId(String confId) {
		this.confId = confId;
	}

	public TVideoConference getConference() {
		return conference;
	}

	public void setConference(TVideoConference conference) {
		this.conference = conference;
	}

	public Area getAreas() {
		return areas;
	}

	public void setAreas(Area areas) {
		this.areas = areas;
	}

	public String getStopTime() {
		return stopTime;
	}

	public void setStopTime(String stopTime) {
		this.stopTime = stopTime;
	}

	public String getMediateCode() {
        return mediateCode;
    }

    public void setMediateCode(String mediateCode) {
        this.mediateCode = mediateCode == null ? null : mediateCode.trim();
    }

    public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public String getVillage() {
		return village;
	}

	public void setVillage(String village) {
		this.village = village;
	}

	public String getMediateid() {
        return mediateid;
    }

    public void setMediateid(String mediateid) {
        this.mediateid = mediateid == null ? null : mediateid.trim();
    }

    public String getMediateName() {
        return mediateName;
    }

    public void setMediateName(String mediateName) {
        this.mediateName = mediateName == null ? null : mediateName.trim();
    }

    public String getMediatePid() {
        return mediatePid;
    }

    public void setMediatePid(String mediatePid) {
        this.mediatePid = mediatePid == null ? null : mediatePid.trim();
    }

    public String getMediateAddress() {
        return mediateAddress;
    }

    public void setMediateAddress(String mediateAddress) {
        this.mediateAddress = mediateAddress == null ? null : mediateAddress.trim();
    }

    public String getMediatePidNumber() {
        return mediatePidNumber;
    }

    public void setMediatePidNumber(String mediatePidNumber) {
        this.mediatePidNumber = mediatePidNumber == null ? null : mediatePidNumber.trim();
    }

    public String getMediateTelephone() {
        return mediateTelephone;
    }

    public void setMediateTelephone(String mediateTelephone) {
        this.mediateTelephone = mediateTelephone == null ? null : mediateTelephone.trim();
    }

    public String getMediateCellphone() {
        return mediateCellphone;
    }

    public void setMediateCellphone(String mediateCellphone) {
        this.mediateCellphone = mediateCellphone == null ? null : mediateCellphone.trim();
    }

    public String getMediateCompleteAdd() {
        return mediateCompleteAdd;
    }

    public void setMediateCompleteAdd(String mediateCompleteAdd) {
        this.mediateCompleteAdd = mediateCompleteAdd == null ? null : mediateCompleteAdd.trim();
    }

    public String getMediateIdentifier() {
        return mediateIdentifier;
    }

    public void setMediateIdentifier(String mediateIdentifier) {
        this.mediateIdentifier = mediateIdentifier == null ? null : mediateIdentifier.trim();
    }

    public String getMediateRegisUnit() {
        return mediateRegisUnit;
    }

    public void setMediateRegisUnit(String mediateRegisUnit) {
        this.mediateRegisUnit = mediateRegisUnit == null ? null : mediateRegisUnit.trim();
    }

    public String getMediatePurpose() {
        return mediatePurpose;
    }

    public void setMediatePurpose(String mediatePurpose) {
        this.mediatePurpose = mediatePurpose == null ? null : mediatePurpose.trim();
    }

    public String getMediateDate() {
        return mediateDate;
    }

    public void setMediateDate(String mediateDate) {
        this.mediateDate = mediateDate == null ? null : mediateDate.trim();
    }

    public String getMediateRegisName() {
        return mediateRegisName;
    }

    public void setMediateRegisName(String mediateRegisName) {
        this.mediateRegisName = mediateRegisName == null ? null : mediateRegisName.trim();
    }

    public String getMediateRegisBranch() {
        return mediateRegisBranch;
    }

    public void setMediateRegisBranch(String mediateRegisBranch) {
        this.mediateRegisBranch = mediateRegisBranch == null ? null : mediateRegisBranch.trim();
    }

    public String getMediateRegisDate() {
        return mediateRegisDate;
    }

    public void setMediateRegisDate(String mediateRegisDate) {
        this.mediateRegisDate = mediateRegisDate == null ? null : mediateRegisDate.trim();
    }

    public String getMediateReason() {
        return mediateReason;
    }

    public void setMediateReason(String mediateReason) {
        this.mediateReason = mediateReason == null ? null : mediateReason.trim();
    }

    public String getMediateContent() {
        return mediateContent;
    }

    public void setMediateContent(String mediateContent) {
        this.mediateContent = mediateContent == null ? null : mediateContent.trim();
    }

    public String getMediateProtocol() {
        return mediateProtocol;
    }

    public void setMediateProtocol(String mediateProtocol) {
        this.mediateProtocol = mediateProtocol == null ? null : mediateProtocol.trim();
    }

    public BigDecimal getMediaterStatus() {
        return mediaterStatus;
    }

    public void setMediaterStatus(BigDecimal mediaterStatus) {
        this.mediaterStatus = mediaterStatus;
    }

    public String getMediateNumber() {
        return mediateNumber;
    }

    public void setMediateNumber(String mediateNumber) {
        this.mediateNumber = mediateNumber == null ? null : mediateNumber.trim();
    }
}