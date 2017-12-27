package com.jzsx.xlgc.bean;

import java.util.Date;
import java.util.List;

/**
 * 问卷调查表
 * @author wiscom
 *
 */
public class ProblemPaper {

	/**
	 * 问卷调查表id
	 */
	private String problempaperId;
	/**
	 * 问卷调查表标题
	 */
	private String problempaperName;
	/**
	 *问卷调查表创建人
	 */
	private String problempaperUsername;
	/**
	 * 问卷调查表备注
	 */
	private String  problempaperRemark;
	/**
	 * 问卷调查表创建时间
	 */
	private Date problempaperTime;
	/**
	 * 问卷调查表开始时间
	 */
	private Date problempaperStarttime;
	/**
	 * 问卷调查表结束时间
	 */
	private Date problempaperStoptime;
	/**
	 * 问卷调查表地区code
	 */
	private String problempaperCode;
	/**
	 * 关联地区
	 */
	private Area areainfo;
	/**
	 * 关联问卷调查试题表
	 */
	private List<ProblemPaperQuest> problemPaperQuestlist;
	public String getProblempaperId() {
		return problempaperId;
	}
	public void setProblempaperId(String problempaperId) {
		this.problempaperId = problempaperId;
	}
	public String getProblempaperName() {
		return problempaperName;
	}
	public void setProblempaperName(String problempaperName) {
		this.problempaperName = problempaperName;
	}
	public String getProblempaperUsername() {
		return problempaperUsername;
	}
	public void setProblempaperUsername(String problempaperUsername) {
		this.problempaperUsername = problempaperUsername;
	}
	public String getProblempaperRemark() {
		return problempaperRemark;
	}
	public void setProblempaperRemark(String problempaperRemark) {
		this.problempaperRemark = problempaperRemark;
	}
	public Date getProblempaperTime() {
		return problempaperTime;
	}
	public void setProblempaperTime(Date problempaperTime) {
		this.problempaperTime = problempaperTime;
	}
	public Date getProblempaperStarttime() {
		return problempaperStarttime;
	}
	public void setProblempaperStarttime(Date problempaperStarttime) {
		this.problempaperStarttime = problempaperStarttime;
	}
	public Date getProblempaperStoptime() {
		return problempaperStoptime;
	}
	public void setProblempaperStoptime(Date problempaperStoptime) {
		this.problempaperStoptime = problempaperStoptime;
	}
	public List<ProblemPaperQuest> getProblemPaperQuestlist() {
		return problemPaperQuestlist;
	}
	public void setProblemPaperQuestlist(
			List<ProblemPaperQuest> problemPaperQuestlist) {
		this.problemPaperQuestlist = problemPaperQuestlist;
	}
	public String getProblempaperCode() {
		return problempaperCode;
	}
	public void setProblempaperCode(String problempaperCode) {
		this.problempaperCode = problempaperCode;
	}
	public Area getAreainfo() {
		return areainfo;
	}
	public void setAreainfo(Area areainfo) {
		this.areainfo = areainfo;
	}
	
	
}
