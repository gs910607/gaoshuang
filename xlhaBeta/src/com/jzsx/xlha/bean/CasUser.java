package com.jzsx.xlha.bean;

import java.math.BigDecimal;

import javax.persistence.Transient;

import com.alibaba.fastjson.annotation.JSONField;

public class CasUser {
    private String userid;

    private BigDecimal usergroupid;

    private String username;

    
    private String password;

    private BigDecimal userkind;

    private BigDecimal userlevel;

    private String iplimit;

    private BigDecimal mutillimit;

    private String realname;

    private String usertel;

    private String remark;

    private String identity;
    
    private String husername2;
    
    private String hpwd2;
    
    
    @Transient
    @JSONField(serialize=false)
    private String village;
    
    @Transient
    @JSONField(serialize=false)
    private String district;
    
    @Transient
    @JSONField(serialize=false)
    private String county;
    
    public String getVillage() {
		return village;
	}

	public void setVillage(String village) {
		this.village = village;
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

	@Transient
    private String auth;
    
    private Area areas;
    
    
    
    public String getHusername2() {
		return husername2;
	}

	public void setHusername2(String husername2) {
		this.husername2 = husername2;
	}

	

	public String getHpwd2() {
		return hpwd2;
	}

	public void setHpwd2(String hpwd2) {
		this.hpwd2 = hpwd2;
	}

	public Area getAreas() {
		return areas;
	}

	public void setAreas(Area areas) {
		this.areas = areas;
	}


	public String getAuth() {
		return auth;
	}

	public void setAuth(String auth) {
		this.auth = auth;
	}

    
    

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid == null ? null : userid.trim();
    }

    public BigDecimal getUsergroupid() {
        return usergroupid;
    }

    public void setUsergroupid(BigDecimal usergroupid) {
        this.usergroupid = usergroupid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public BigDecimal getUserkind() {
        return userkind;
    }

    public void setUserkind(BigDecimal userkind) {
        this.userkind = userkind;
    }

    public BigDecimal getUserlevel() {
        return userlevel;
    }

    public void setUserlevel(BigDecimal userlevel) {
        this.userlevel = userlevel;
    }

    public String getIplimit() {
        return iplimit;
    }

    public void setIplimit(String iplimit) {
        this.iplimit = iplimit == null ? null : iplimit.trim();
    }

    public BigDecimal getMutillimit() {
        return mutillimit;
    }

    public void setMutillimit(BigDecimal mutillimit) {
        this.mutillimit = mutillimit;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    public String getUsertel() {
        return usertel;
    }

    public void setUsertel(String usertel) {
        this.usertel = usertel == null ? null : usertel.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity == null ? null : identity.trim();
    }

	@Override
	public String toString() {
		return "CasUser [userid=" + userid + ", usergroupid=" + usergroupid + ", username=" + username + ", password="
				+ password + ", userkind=" + userkind + ", userlevel=" + userlevel + ", realname=" + realname
				+ ", usertel=" + usertel + ", remark=" + remark + ", identity=" + identity + ", village=" + village
				+ ", district=" + district + ", county=" + county + ", auth=" + auth + "]";
	}
    
    
}