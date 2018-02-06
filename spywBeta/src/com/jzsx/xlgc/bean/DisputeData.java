package com.jzsx.xlgc.bean;

public class DisputeData {

	private int fail;
	
	private int success;
	
	private int middle;
	
	private Integer type;
	
	private String name;
	
	private String current_month;
	

	public String getCurrent_month() {
		return current_month;
	}

	public void setCurrent_month(String current_month) {
		this.current_month = current_month;
	}

	public int getFail() {
		return fail;
	}

	public void setFail(int fail) {
		this.fail = fail;
	}

	public int getSuccess() {
		return success;
	}

	public void setSuccess(int success) {
		this.success = success;
	}

	public int getMiddle() {
		return middle;
	}

	public void setMiddle(int middle) {
		this.middle = middle;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	
}
