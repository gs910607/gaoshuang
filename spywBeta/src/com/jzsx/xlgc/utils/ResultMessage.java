package com.jzsx.xlgc.utils;

public class ResultMessage {

	private String msg;
	private String status;

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

}
