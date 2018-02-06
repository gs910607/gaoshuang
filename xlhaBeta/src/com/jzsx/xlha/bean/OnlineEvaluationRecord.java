package com.jzsx.xlha.bean;

import java.util.Date;


/**
 * 视频调研记录表
 * @author wiscom
 *
 */
public class OnlineEvaluationRecord {
	/**
	 * 视频调研记录表ID
	 */
	private String videoResearchReId;
	/**
	 * 视频调研记录IP
	 */
	private String videoResearchReIp;
	/**
	 * 视频调研记录时间
	 */
	private String videoResearchTime;
	/**
	 * 视频调研记录创建人名称--》用户id
	 */
	private String videoResearchRealName;
	/**
	 * 视频调研记录code
	 */
	private String videoResearchCode;
	/**
	 * 视频调研类型
	 * 1整场投一次，2一天投一次，3一天投五次
	 */
	private String videoResearchType;
	/**
	 * 视频调研标题供展示查询用
	 */
	private String videoResearchTitle;
	/**
	 * 视频调研开始时间供展示查询用
	 */
	private Date startDate;
	/**
	 * 视频调研结束时间供展示查询用
	 */
	private Date stopDate;
	/**
	 * 关联地区表
	 */
	private Area areainfo;
	public String getVideoResearchReId() {
		return videoResearchReId;
	}
	public void setVideoResearchReId(String videoResearchReId) {
		this.videoResearchReId = videoResearchReId;
	}
	public String getVideoResearchReIp() {
		return videoResearchReIp;
	}
	public void setVideoResearchReIp(String videoResearchReIp) {
		this.videoResearchReIp = videoResearchReIp;
	}
	public String getVideoResearchTime() {
		return videoResearchTime;
	}
	public void setVideoResearchTime(String videoResearchTime) {
		this.videoResearchTime = videoResearchTime;
	}
	public String getVideoResearchRealName() {
		return videoResearchRealName;
	}
	public void setVideoResearchRealName(String videoResearchRealName) {
		this.videoResearchRealName = videoResearchRealName;
	}
	public String getVideoResearchCode() {
		return videoResearchCode;
	}
	public void setVideoResearchCode(String videoResearchCode) {
		this.videoResearchCode = videoResearchCode;
	}
	public String getVideoResearchTitle() {
		return videoResearchTitle;
	}
	public void setVideoResearchTitle(String videoResearchTitle) {
		this.videoResearchTitle = videoResearchTitle;
	}
	public Area getAreainfo() {
		return areainfo;
	}
	public void setAreainfo(Area areainfo) {
		this.areainfo = areainfo;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getStopDate() {
		return stopDate;
	}
	public void setStopDate(Date stopDate) {
		this.stopDate = stopDate;
	}
	public String getVideoResearchType() {
		return videoResearchType;
	}
	public void setVideoResearchType(String videoResearchType) {
		this.videoResearchType = videoResearchType;
	}
	
	
}
