package com.jzsx.xlgc.bean;

import java.math.BigDecimal;
import java.util.Date;

public class TInformation {
    private String informationid;//id

    private BigDecimal type;//类型

    private String title;//标题

    private String content;//信息主体内容

    private String image;//图片地址

    private Date createtime;//创建时间

    private Date updatetime;//更新时间

    private String groupid;//形式外键，对应user表groupid
    
    private String createname;//创建者
    
    private Area areas;//创建者所在区域信息
    
    

    public Area getAreas() {
		return areas;
	}

	public void setAreas(Area areas) {
		this.areas = areas;
	}


	public String getCreatename() {
		return createname;
	}

	public void setCreatename(String createname) {
		this.createname = createname;
	}

	public String getInformationid() {
        return informationid;
    }

    public void setInformationid(String informationid) {
        this.informationid = informationid == null ? null : informationid.trim();
    }

    public BigDecimal getType() {
        return type;
    }

    public void setType(BigDecimal type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image == null ? null : image.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }

    public String getGroupid() {
        return groupid;
    }

    public void setGroupid(String groupid) {
        this.groupid = groupid == null ? null : groupid.trim();
    }

	@Override
	public String toString() {
		return "TInformation [informationid=" + informationid + ", type=" + type + ", title=" + title + ", content="
				+ content + ", image=" + image + ", createtime=" + createtime + ", updatetime=" + updatetime
				+ ", groupid=" + groupid + ", createname=" + createname + "]";
	}
    
    
}