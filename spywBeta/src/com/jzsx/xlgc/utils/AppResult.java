package com.jzsx.xlgc.utils;

import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.bean.TInformation;

public class AppResult {
	private String msg;
	
	private String status;
	
	private CasUser user;
	
	private Result<TInformation> result;
	
	


	public Result<TInformation> getResult() {
		return result;
	}

	public void setResult(Result<TInformation> result) {
		this.result = result;
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

	public CasUser getUser() {
		return user;
	}

	public void setUser(CasUser user) {
		this.user = user;
	}

	public AppResult() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AppResult(String msg, String status, CasUser user) {
		super();
		this.msg = msg;
		this.status = status;
		this.user = user;
	}

	public AppResult(String msg, String status) {
		super();
		this.msg = msg;
		this.status = status;
	}

	public AppResult(String msg, String status, Result<TInformation> result) {
		super();
		this.msg = msg;
		this.status = status;
		this.result = result;
	}

	
	

}