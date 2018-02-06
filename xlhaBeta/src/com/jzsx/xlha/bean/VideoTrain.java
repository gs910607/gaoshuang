package com.jzsx.xlha.bean;

import java.util.Date;

/**
 * 视频培训表
 * @author wiscom
 *
 */
public class VideoTrain {

	/**
	 * 视频培训ID
	 */
	private String videoId;
	/**
	 * 视频培训类别ID
	 */
	private int videoTypeId ;
	/**
	 * 视频培训课程名称
	 */
	private String videoName;
	/**
	 * 视频培训地址
	 */
	private String videoPath;
	/**
	 * 视频培训置顶
	 */
	private int videoTop;
	/**
	 * 视频备注
	 */
	private String videoRemark;
	/**
	 * 视频时间
	 */
	private Date videoTime;
	/**
	 * 视频培训视频名称
	 */
	private String videoVname;
	/**
	 * 视频培训视频大小
	 */
	private String videoVsize;
	/**
	 * 视频培训创建人名称
	 */
	private String videorealName;
	/**
	 * 视频培训地区code
	 */
	private String videoCode;
	/**
	 * 条件结束时间
	 */
	private Date stopTime;
	/**
	 * 视频或图片，0图片，1视频
	 */
	private int videoPicTypeId;
	/**
	 * 查看次数
	 */
	private int videoViewCount;
	/**
	 * 修改人名称
	 */
	private String videoEditUsername;
	/**
	 * 关联视频类型表
	 */
	private VideoType videoTypeinfo;
	/**
	 * 关联地区表
	 */
	private Area areainfo;
	public String getVideoId() {
		return videoId;
	}
	public void setVideoId(String videoId) {
		this.videoId = videoId;
	}
	public int getVideoTypeId() {
		return videoTypeId;
	}
	public void setVideoTypeId(int videoTypeId) {
		this.videoTypeId = videoTypeId;
	}
	public String getVideoName() {
		return videoName;
	}
	public void setVideoName(String videoName) {
		this.videoName = videoName;
	}
	public String getVideoPath() {
		return videoPath;
	}
	public void setVideoPath(String videoPath) {
		this.videoPath = videoPath;
	}
	public int getVideoTop() {
		return videoTop;
	}
	public void setVideoTop(int videoTop) {
		this.videoTop = videoTop;
	}
	public VideoType getVideoTypeinfo() {
		return videoTypeinfo;
	}
	public void setVideoTypeinfo(VideoType videoTypeinfo) {
		this.videoTypeinfo = videoTypeinfo;
	}
	public String getVideoRemark() {
		return videoRemark;
	}
	public void setVideoRemark(String videoRemark) {
		this.videoRemark = videoRemark;
	}
	public Date getVideoTime() {
		return videoTime;
	}
	public void setVideoTime(Date videoTime) {
		this.videoTime = videoTime;
	}
	public String getVideoVname() {
		return videoVname;
	}
	public void setVideoVname(String videoVname) {
		this.videoVname = videoVname;
	}
	public String getVideoVsize() {
		return videoVsize;
	}
	public void setVideoVsize(String videoVsize) {
		this.videoVsize = videoVsize;
	}
	public String getVideorealName() {
		return videorealName;
	}
	public void setVideorealName(String videorealName) {
		this.videorealName = videorealName;
	}
	public String getVideoCode() {
		return videoCode;
	}
	public void setVideoCode(String videoCode) {
		this.videoCode = videoCode;
	}
	public Date getStopTime() {
		return stopTime;
	}
	public void setStopTime(Date stopTime) {
		this.stopTime = stopTime;
	}
	public Area getAreainfo() {
		return areainfo;
	}
	public void setAreainfo(Area areainfo) {
		this.areainfo = areainfo;
	}
	public int getVideoPicTypeId() {
		return videoPicTypeId;
	}
	public void setVideoPicTypeId(int videoPicTypeId) {
		this.videoPicTypeId = videoPicTypeId;
	}
	public int getVideoViewCount() {
		return videoViewCount;
	}
	public void setVideoViewCount(int videoViewCount) {
		this.videoViewCount = videoViewCount;
	}
	public String getVideoEditUsername() {
		return videoEditUsername;
	}
	public void setVideoEditUsername(String videoEditUsername) {
		this.videoEditUsername = videoEditUsername;
	}
	
	
}
