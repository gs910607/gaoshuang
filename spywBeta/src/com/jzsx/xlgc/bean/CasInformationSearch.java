package com.jzsx.xlgc.bean;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;

import com.google.common.base.Strings;

public class CasInformationSearch {

	private String title;

	private Date startTime;

	private Date endTime;

	private String start;

	private String end;

	private Integer type;
	
	private String district;
	
	private String county;
	
	private String village;

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

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getEnd() {
		return end;
	}

	public void setEnd(String end) {
		this.end = end;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getStartTime() throws ParseException {
		Date date = null;
		if (Strings.isNullOrEmpty(getStart())) {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			date = dateFormat.parse(getStart());
		}

		return date;
	}

	public void setStartTime(Date startTime) throws ParseException {

		this.startTime = startTime;
	}

	public Date getEndTime() throws ParseException {
		Date date = null;
		
		if (Strings.isNullOrEmpty(getEnd())) {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			date = dateFormat.parse(getEnd());
		}
		
		return date;
	}

	public void setEndTime(Date endTime) throws ParseException {
		this.endTime = endTime;
	}

}
