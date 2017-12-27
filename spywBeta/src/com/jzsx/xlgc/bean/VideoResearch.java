package com.jzsx.xlgc.bean;

import java.util.Date;
import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 视频调研
 * @author wiscom
 *
 */
public class VideoResearch {

	/**
	 * 视频调研ID
	 */
	private String videoResearchId;
	/**
	 * 视频调研名称
	 */
	private String videoResearchName;
	/**
	 * 视频调研用户名称
	 */
	private String videoResearchUsername;
	/**
	 * 视频调研备注
	 */
	private String videoResearchRemark;
	/**
	 * 视频调研创建时间
	 */
	private Date videoResearchTime;
	/**
	 * 视频调研开始时间
	 */
	private Date videoResearchStarttime;
	/**
	 * 视频调研结束时间
	 */
	private Date videoResearchStoptime;
	/**
	 * 视频调研创建人名称
	 */
	private String videoResearchRealName;
	/**
	 * 视频调研创建地区code
	 */
	private String videoResearcCode;
	/**
	 * 视频调研类型
	 * 1整场投一票，2一天投一票，3一天投五票
	 */
	private String videoResearchType;
	/**
	 * 关联地区表
	 */
	private Area areainfo;
	/**
	 * 关联视频调研活动评选表
	 */
	@JSONField(serialize=false)
	private List<VideoResearchActive> videoResearchActiveinfo;
	
	public String getVideoResearchId() {
		return videoResearchId;
	}
	public void setVideoResearchId(String videoResearchId) {
		this.videoResearchId = videoResearchId;
	}
	public String getVideoResearchName() {
		return videoResearchName;
	}
	public void setVideoResearchName(String videoResearchName) {
		this.videoResearchName = videoResearchName;
	}
	public String getVideoResearchUsername() {
		return videoResearchUsername;
	}
	public void setVideoResearchUsername(String videoResearchUsername) {
		this.videoResearchUsername = videoResearchUsername;
	}
	public String getVideoResearchRemark() {
		return videoResearchRemark;
	}
	public void setVideoResearchRemark(String videoResearchRemark) {
		this.videoResearchRemark = videoResearchRemark;
	}
	public Date getVideoResearchTime() {
		return videoResearchTime;
	}
	public void setVideoResearchTime(Date videoResearchTime) {
		this.videoResearchTime = videoResearchTime;
	}
	public Date getVideoResearchStarttime() {
		return videoResearchStarttime;
	}
	public void setVideoResearchStarttime(Date videoResearchStarttime) {
		this.videoResearchStarttime = videoResearchStarttime;
	}
	public Date getVideoResearchStoptime() {
		return videoResearchStoptime;
	}
	public void setVideoResearchStoptime(Date videoResearchStoptime) {
		this.videoResearchStoptime = videoResearchStoptime;
	}
	public List<VideoResearchActive> getVideoResearchActiveinfo() {
		return videoResearchActiveinfo;
	}
	public void setVideoResearchActiveinfo(
			List<VideoResearchActive> videoResearchActiveinfo) {
		this.videoResearchActiveinfo = videoResearchActiveinfo;
	}
	public String getVideoResearchRealName() {
		return videoResearchRealName;
	}
	public void setVideoResearchRealName(String videoResearchRealName) {
		this.videoResearchRealName = videoResearchRealName;
	}
	public String getVideoResearcCode() {
		return videoResearcCode;
	}
	public void setVideoResearcCode(String videoResearcCode) {
		this.videoResearcCode = videoResearcCode;
	}
	public Area getAreainfo() {
		return areainfo;
	}
	public void setAreainfo(Area areainfo) {
		this.areainfo = areainfo;
	}
	public String getVideoResearchType() {
		return videoResearchType;
	}
	public void setVideoResearchType(String videoResearchType) {
		this.videoResearchType = videoResearchType;
	}
	
	
	
}
