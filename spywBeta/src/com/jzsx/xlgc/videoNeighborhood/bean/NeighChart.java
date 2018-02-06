package com.jzsx.xlgc.videoNeighborhood.bean;

import java.util.List;
/**
 * 视频接访统计表
 * @author wiscom
 *
 */
public class NeighChart {

	/**
	 * 数量
	 */
	private int count;
	private int count1;
	private int count2;
	private int count3;
	private int count4;
	/**
	 * 名称
	 */
	private String name;
	/**
	 * code
	 */
	private String code;
	private String year;
	private String month;
	private String category;
	/**
	 * 状态，1成功，2失败
	 */
	private String state;
	private String state1;
	private String state2;
	/**
	 * 统计名称数组
	 */
	private List<Integer> list;
	/**
	 * 统计值数组
	 */
	private List<String> area;
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public List<Integer> getList() {
		return list;
	}
	public void setList(List<Integer> list) {
		this.list = list;
	}
	public List<String> getArea() {
		return area;
	}
	public void setArea(List<String> area) {
		this.area = area;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public int getCount1() {
		return count1;
	}
	public void setCount1(int count1) {
		this.count1 = count1;
	}
	public String getState1() {
		return state1;
	}
	public void setState1(String state1) {
		this.state1 = state1;
	}
	public int getCount2() {
		return count2;
	}
	public void setCount2(int count2) {
		this.count2 = count2;
	}
	public String getState2() {
		return state2;
	}
	public void setState2(String state2) {
		this.state2 = state2;
	}
	public int getCount3() {
		return count3;
	}
	public void setCount3(int count3) {
		this.count3 = count3;
	}
	public int getCount4() {
		return count4;
	}
	public void setCount4(int count4) {
		this.count4 = count4;
	}
	
	
}
