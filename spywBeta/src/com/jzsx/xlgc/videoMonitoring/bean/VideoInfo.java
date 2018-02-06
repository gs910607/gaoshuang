package com.jzsx.xlgc.videoMonitoring.bean;

public class VideoInfo {
	//视频数据表主键
	private String videoinfoId;
	//视频数据id
	private String videoinfovideoId;
	//视频数据code
	private String videoinfoCode;
	//视频数据摄像机名称
	private String videoinfoName;
	
	//视频数据摄像机状态
	private String videoinfoStatus;
	
	//视频数据视频的类别（监控 1 或督察 2）
	private int videoinfoType;
	//视频数据code名称
	private String videoinfoCodeName ;
	//分页查询开始页数	
	private int pagenumber ;
	//分页查询页数
	private int pagesize ;
	
	//分页查询开始数
	private int pagestartnum ;
	
	//分页查询结束数
	private int pageendnum ;
	
	//控制摄像机信息只能改一次 若code不是1就查不出来
	private String codeStatus ;

	public String getCodeStatus() {
		return codeStatus;
	}

	public void setCodeStatus(String codeStatus) {
		this.codeStatus = codeStatus;
	}

	public int getPagestartnum() {
		return pagestartnum;
	}

	public void setPagestartnum(int pagestartnum) {
		this.pagestartnum = pagestartnum;
	}

	public int getPageendnum() {
		return pageendnum;
	}

	public void setPageendnum(int pageendnum) {
		this.pageendnum = pageendnum;
	}

	public int getPagenumber() {
		return pagenumber;
	}

	public void setPagenumber(int pagenumber) {
		this.pagenumber = pagenumber;
	}

	public int getPagesize() {
		return pagesize;
	}

	public void setPagesize(int pagesize) {
		this.pagesize = pagesize;
	}

	public String getVideoinfoCodeName() {
		return videoinfoCodeName;
	}

	public void setVideoinfoCodeName(String videoinfoCodeName) {
		this.videoinfoCodeName = videoinfoCodeName;
	}

	public String getVideoinfoId() {
		return videoinfoId;
	}

	public void setVideoinfoId(String videoinfoId) {
		this.videoinfoId = videoinfoId;
	}

	public String getVideoinfovideoId() {
		return videoinfovideoId;
	}

	public void setVideoinfovideoId(String videoinfovideoId) {
		this.videoinfovideoId = videoinfovideoId;
	}

	public String getVideoinfoCode() {
		return videoinfoCode;
	}

	public void setVideoinfoCode(String videoinfoCode) {
		this.videoinfoCode = videoinfoCode;
	}

	public String getVideoinfoName() {
		return videoinfoName;
	}

	public void setVideoinfoName(String videoinfoName) {
		this.videoinfoName = videoinfoName;
	}

	public String getVideoinfoStatus() {
		return videoinfoStatus;
	}

	public void setVideoinfoStatus(String videoinfoStatus) {
		this.videoinfoStatus = videoinfoStatus;
	}

	public int getVideoinfoType() {
		return videoinfoType;
	}

	public void setVideoinfoType(int videoinfoType) {
		this.videoinfoType = videoinfoType;
	}

	
	
	
	
}
