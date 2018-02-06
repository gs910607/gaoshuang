package com.jzsx.xlgc.videoResearch.bean;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UResearch {

	/**
	 * //标题
	 */
	private String activeTitle;
	/**
	 * //开始日期
	 */
	private String dateStart;
	/**
	 * 结束日期
	 */
	private String dateEnd;
	/**
	 * 调研内容
	 */
	private String detailedAddress;
	/**
	 * 候选人列表
	 */
	private String candidateData;
	/**
	 * 投票次数
	 */
	private int votetypenumber;
	public String getActiveTitle() {
		return activeTitle;
	}
	public void setActiveTitle(String activeTitle) {
		this.activeTitle = activeTitle;
	}
	public String getDateStart() {
		return dateStart;
	}
	public void setDateStart(String dateStart) {
		this.dateStart = dateStart;
	}
	public String getDateEnd() {
		return dateEnd;
	}
	public void setDateEnd(String dateEnd) {
		this.dateEnd = dateEnd;
	}
	public String getDetailedAddress() {
		return detailedAddress;
	}
	public void setDetailedAddress(String detailedAddress) {
		this.detailedAddress = detailedAddress;
	}
	public String getCandidateData() {
		return candidateData;
	}
	public void setCandidateData(String candidateData) {
		this.candidateData = candidateData;
	}
	public int getVotetypenumber() {
		return votetypenumber;
	}
	public void setVotetypenumber(int votetypenumber) {
		this.votetypenumber = votetypenumber;
	}
	
}
