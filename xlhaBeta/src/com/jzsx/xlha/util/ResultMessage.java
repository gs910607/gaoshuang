package com.jzsx.xlha.util;

import com.jzsx.xlha.bean.CasUser;

public class ResultMessage {

	private String msg;
	private String status;
	private CasUser user;

	public CasUser getUser() {
		return user;
	}

	public void setUser(CasUser user) {
		this.user = user;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public ResultMessage(String msg, String status) {
		super();
		this.msg = msg;
		this.status = status;
	}

	public ResultMessage() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ResultMessage(String status, CasUser user) {
		super();
		this.status = status;
		this.user = user;
	}
	

}
