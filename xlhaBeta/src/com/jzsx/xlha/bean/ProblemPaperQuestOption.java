package com.jzsx.xlha.bean;
/**
 * 问卷调查试题选项表
 * @author wiscom
 *
 */
public class ProblemPaperQuestOption {

	/**
	 * 问卷调查试题选项ID
	 */
	private String paperquestOptionId;
	/**
	 * 问卷调查试题ID
	 */
	private String paperquestOptionQuestId;

	/**
	 * 问卷调查试题选项内容
	 */
	private String paperquestOptionName;
	/**
	 * 问卷调查试题表
	 */
	private ProblemPaperQuest problemPaperQuestinfo;

	public String getPaperquestOptionId() {
		return paperquestOptionId;
	}

	public void setPaperquestOptionId(String paperquestOptionId) {
		this.paperquestOptionId = paperquestOptionId;
	}

	public String getPaperquestOptionQuestId() {
		return paperquestOptionQuestId;
	}

	public void setPaperquestOptionQuestId(String paperquestOptionQuestId) {
		this.paperquestOptionQuestId = paperquestOptionQuestId;
	}

	public String getPaperquestOptionName() {
		return paperquestOptionName;
	}

	public void setPaperquestOptionName(String paperquestOptionName) {
		this.paperquestOptionName = paperquestOptionName;
	}

	public ProblemPaperQuest getProblemPaperQuestinfo() {
		return problemPaperQuestinfo;
	}

	public void setProblemPaperQuestinfo(ProblemPaperQuest problemPaperQuestinfo) {
		this.problemPaperQuestinfo = problemPaperQuestinfo;
	}
	
	
}
