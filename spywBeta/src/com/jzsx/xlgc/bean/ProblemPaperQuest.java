package com.jzsx.xlgc.bean;

import java.util.List;

/**
 * 问卷调查试题表
 * @author wiscom
 *
 */
public class ProblemPaperQuest {

	/**
	 * 问卷调查试题id 
	 */
	private String paperquestId;
	/**
	 * 问卷调查ID
	 */
	private String paperquestProblemId;
	/**
	 * 问卷调查试题题目
	 */
	private String paperquestName;
	/**
	 * 问卷调查试题备注
	 */
	private String paperquestRemark;
	/**
	 * 关联问卷调查表
	 */
	private ProblemPaper problemPaperinfo;
	/**
	 * 关联问卷调查试题选项表
	 */
	private List<ProblemPaperQuestOption> problemPaperQuestOptionlist;
	public String getPaperquestId() {
		return paperquestId;
	}
	public void setPaperquestId(String paperquestId) {
		this.paperquestId = paperquestId;
	}
	public String getPaperquestProblemId() {
		return paperquestProblemId;
	}
	public void setPaperquestProblemId(String paperquestProblemId) {
		this.paperquestProblemId = paperquestProblemId;
	}
	public String getPaperquestName() {
		return paperquestName;
	}
	public void setPaperquestName(String paperquestName) {
		this.paperquestName = paperquestName;
	}
	public String getPaperquestRemark() {
		return paperquestRemark;
	}
	public void setPaperquestRemark(String paperquestRemark) {
		this.paperquestRemark = paperquestRemark;
	}
	public ProblemPaper getProblemPaperinfo() {
		return problemPaperinfo;
	}
	public void setProblemPaperinfo(ProblemPaper problemPaperinfo) {
		this.problemPaperinfo = problemPaperinfo;
	}
	public List<ProblemPaperQuestOption> getProblemPaperQuestOptionlist() {
		return problemPaperQuestOptionlist;
	}
	public void setProblemPaperQuestOptionlist(
			List<ProblemPaperQuestOption> problemPaperQuestOptionlist) {
		this.problemPaperQuestOptionlist = problemPaperQuestOptionlist;
	}
	
	
}
