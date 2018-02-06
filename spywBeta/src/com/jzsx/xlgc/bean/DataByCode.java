package com.jzsx.xlgc.bean;

public class DataByCode {
	
	
	private int fail;//失败次数
	
	private int success;//成功次数
	
	private int middle;//解决中
	
	private int count;//总数
	
	private int duration;//调节时长
	
	
	
	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	private String current_month;

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

	public String getCurrent_month() {
		return current_month;
	}

	public void setCurrent_month(String current_month) {
		this.current_month = current_month;
	}

	
	

}
