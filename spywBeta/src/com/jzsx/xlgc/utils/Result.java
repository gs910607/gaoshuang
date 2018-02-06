package com.jzsx.xlgc.utils;

import java.util.List;

public class Result<T> {

	private Integer num;

	private List<T> list;

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}

	@Override
	public String toString() {
		return "Result [num=" + num + ", list=" + list + "]";
	}

	
	
}
