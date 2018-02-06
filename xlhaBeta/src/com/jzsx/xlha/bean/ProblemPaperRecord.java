package com.jzsx.xlha.bean;

import java.util.Date;


/**
 * 问卷调查试题选项记录表
 * @author wiscom
 *
 */
public class ProblemPaperRecord {

	/**
	 * 问卷调查试题选项记录ID
	 */
	private String paperRecordId;
	/**
	 * 问卷调查Id,关联问卷调查表
	 */
	private String paperRecordPaperId;
	/**
	 * 问卷调查试题试题Id
	 */
	private String paperRecordQuestId;
	/**
	 * 问卷调查试题选项ID
	 */
	private String paperRecordOptionId;
	/**
	 * 问卷调查试题选项记录备注
	 */
	private String paperRecordRemark;
	/**
	 * 问卷调查试题选项记录用户名称
	 */
	private String paperRecordUserName;
	/**
	 * 问卷调查试题选项记录code
	 */
	private String paperRecordCode;
	/**
	 * 问卷调查试题选项记录时间
	 */
	private Date paperRecordTime;
	/**
	 * 问卷调查试题选项记录IP
	 */
	private String paperRecordIp;
	/**
	 * 问卷调查试题选项记录搜索条件结束时间
	 */
	private Date paperRecordStoptime;
	/**
	 * 问卷调查试题选项记录搜索条件标题
	 */
	private String paperRecordtitle;
	/**
	 * 关联问卷调查表
	 */
	private ProblemPaper problemPaperinfo;
	/**
	 * 关联地区表
	 */
	private Area areainfo;
	public String getPaperRecordId() {
		return paperRecordId;
	}
	public void setPaperRecordId(String paperRecordId) {
		this.paperRecordId = paperRecordId;
	}
	public String getPaperRecordPaperId() {
		return paperRecordPaperId;
	}
	public void setPaperRecordPaperId(String paperRecordPaperId) {
		this.paperRecordPaperId = paperRecordPaperId;
	}
	public String getPaperRecordQuestId() {
		return paperRecordQuestId;
	}
	public void setPaperRecordQuestId(String paperRecordQuestId) {
		this.paperRecordQuestId = paperRecordQuestId;
	}
	public String getPaperRecordOptionId() {
		return paperRecordOptionId;
	}
	public void setPaperRecordOptionId(String paperRecordOptionId) {
		this.paperRecordOptionId = paperRecordOptionId;
	}
	public String getPaperRecordRemark() {
		return paperRecordRemark;
	}
	public void setPaperRecordRemark(String paperRecordRemark) {
		this.paperRecordRemark = paperRecordRemark;
	}
	public String getPaperRecordUserName() {
		return paperRecordUserName;
	}
	public void setPaperRecordUserName(String paperRecordUserName) {
		this.paperRecordUserName = paperRecordUserName;
	}
	public String getPaperRecordCode() {
		return paperRecordCode;
	}
	public void setPaperRecordCode(String paperRecordCode) {
		this.paperRecordCode = paperRecordCode;
	}
	public Date getPaperRecordTime() {
		return paperRecordTime;
	}
	public void setPaperRecordTime(Date paperRecordTime) {
		this.paperRecordTime = paperRecordTime;
	}
	public String getPaperRecordIp() {
		return paperRecordIp;
	}
	public void setPaperRecordIp(String paperRecordIp) {
		this.paperRecordIp = paperRecordIp;
	}
	public Date getPaperRecordStoptime() {
		return paperRecordStoptime;
	}
	public void setPaperRecordStoptime(Date paperRecordStoptime) {
		this.paperRecordStoptime = paperRecordStoptime;
	}
	public String getPaperRecordtitle() {
		return paperRecordtitle;
	}
	public void setPaperRecordtitle(String paperRecordtitle) {
		this.paperRecordtitle = paperRecordtitle;
	}
	public ProblemPaper getProblemPaperinfo() {
		return problemPaperinfo;
	}
	public void setProblemPaperinfo(ProblemPaper problemPaperinfo) {
		this.problemPaperinfo = problemPaperinfo;
	}
	public Area getAreainfo() {
		return areainfo;
	}
	public void setAreainfo(Area areainfo) {
		this.areainfo = areainfo;
	}
	
	
}
