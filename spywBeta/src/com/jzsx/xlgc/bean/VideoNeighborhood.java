package com.jzsx.xlgc.bean;

import java.util.Date;

/**
 * 视频接访表
 * @author wiscom
 *
 */
public class VideoNeighborhood {

	/**
	 * 视频接访ID
	 */
	private String videoneihdId;
	/**
	 * 视频信访人姓名
	 */
	private String videoneihdName;
	/**
	 * 证件类型
	 */
	private String videoneihdCardType;
	/**
	 * 信访所在地
	 */
	private String videoneihdLocationplace;
	/**
	 * 证件号码
	 */
	private String videoneihdCard;
	/**
	 * 固定号码
	 */
	private String videoneihdtelephone;

	/**
	 * 手机号码
	 */
	private String videoneihdphone;

	/**
	 * 详细地址
	 */
	private String videoneihdplace;

	/**
	 * 信访编号
	 */
	private String videoneihdNum;
	/**
	 * 登记单位
	 */
	private String videoneihdCompany;
	/**
	 * 信访目的
	 */
	private String videoneihdObjective;
	/**
	 * 信访日期
	 */
	private Date videoneihdDate;
	/**
	 * 登记人
	 */
	private String videoneihdRegistrant;
	/**
	 * 登记部门
	 */
	private String videoneihdRegistDepartment;
	/**
	 * 登记日期
	 */
	private Date videoneihdRegistDate;
	/**
	 * 信访人数
	 */
	private int videoneihdNumber;
	/**
	 * 信访原因
	 */
	private String videoneihdReason;
	/**
	 * 概括信息
	 */
	private String videoneihdRemark;
	/**
	 * 视频接访创建人名称
	 */
	private String videoneihdrealName;
	/**
	 * 视频接访方式
	 */
	private String videoneihdVideoWay;
	/**
	 * 视频接访状态
	 */
	private String videoneihdState;
	/**
	 * 受访人所在地
	 */
	private String videoneihdVisitorPlace;
	/**
	 * 邮政编码
	 */
	private String videoneihdPostCode;
	/**
	 * 国籍
	 */
	private String videoneihdNationality;
	/**
	 * 是否同意公开
	 */
	private String videoneihdAgreeOpen;
	/**
	 * 随访人
	 */
	private String videoneihdComplainant;
	/**
	 * 受访人
	 */
	private String videoneihdRespondent;
	/**
	 * 涉及人数
	 */
	private String videoneihdInvolveNumber;
	/**
	 * 标题
	 */
	private String videoneihdTitle;
	/**
	 * 是否匿名
	 */
	private String videoneihdAnonymous;
	/**
	 * 视频会议id
	 */
	private String videoneihdConfId;
	/**
	 * 信访类型:
	 * 1涉法涉诉,
	 * 2生活待遇,
	 * 3山林土地权属纠纷,
	 * 4拆迁补偿与住房保障,
	 * 5劳动和社会保障,
	 * 6安全、生产与环境保护,
	 * 7行政执法与行业服务,
	 * 8城市建设与管理,
	 * 9其他
	 */
	private String videoneihdTypeId ; 
	/**
	 * 办理意见
	 */
	private String videoneihdHandleOpinion;
	/**
	 * 信息概况
	 */
	private String videoneihdInformProfile;
	/**
	 * 接访人单位
	 */
	private String videoneihdLiberateCompany;
	/**
	 * 登记地点
	 */
	private String videoneihdRegistratePlace;
	/**
	 * 接访人职务
	 */
	private String videoneihdPeopleDuty;
	/**
	 * 接访人联系方式
	 */
	private String videoneihdPeopleContact;
	/**
	 * 创建人code
	 */
	private String videoneihdCreateCode;
	public String getVideoneihdCreateCode() {
		return videoneihdCreateCode;
	}
	public void setVideoneihdCreateCode(String videoneihdCreateCode) {
		this.videoneihdCreateCode = videoneihdCreateCode;
	}
	/**
	 * 关联视频会议表
	 */
	private TVideoConference videoConferenceinfo;
	/**
	 * 关联地区表
	 */
	private Area areainfo;
	public String getVideoneihdId() {
		return videoneihdId;
	}
	public void setVideoneihdId(String videoneihdId) {
		this.videoneihdId = videoneihdId;
	}
	public String getVideoneihdName() {
		return videoneihdName;
	}
	public void setVideoneihdName(String videoneihdName) {
		this.videoneihdName = videoneihdName;
	}
	public String getVideoneihdCardType() {
		return videoneihdCardType;
	}
	public void setVideoneihdCardType(String videoneihdCardType) {
		this.videoneihdCardType = videoneihdCardType;
	}
	public String getVideoneihdLocationplace() {
		return videoneihdLocationplace;
	}
	public void setVideoneihdLocationplace(String videoneihdLocationplace) {
		this.videoneihdLocationplace = videoneihdLocationplace;
	}
	public String getVideoneihdCard() {
		return videoneihdCard;
	}
	public void setVideoneihdCard(String videoneihdCard) {
		this.videoneihdCard = videoneihdCard;
	}
	public String getVideoneihdtelephone() {
		return videoneihdtelephone;
	}
	public void setVideoneihdtelephone(String videoneihdtelephone) {
		this.videoneihdtelephone = videoneihdtelephone;
	}
	public String getVideoneihdphone() {
		return videoneihdphone;
	}
	public void setVideoneihdphone(String videoneihdphone) {
		this.videoneihdphone = videoneihdphone;
	}
	public String getVideoneihdplace() {
		return videoneihdplace;
	}
	public void setVideoneihdplace(String videoneihdplace) {
		this.videoneihdplace = videoneihdplace;
	}
	public String getVideoneihdNum() {
		return videoneihdNum;
	}
	public void setVideoneihdNum(String videoneihdNum) {
		this.videoneihdNum = videoneihdNum;
	}
	public String getVideoneihdCompany() {
		return videoneihdCompany;
	}
	public void setVideoneihdCompany(String videoneihdCompany) {
		this.videoneihdCompany = videoneihdCompany;
	}
	public String getVideoneihdObjective() {
		return videoneihdObjective;
	}
	public void setVideoneihdObjective(String videoneihdObjective) {
		this.videoneihdObjective = videoneihdObjective;
	}
	public String getVideoneihdRegistrant() {
		return videoneihdRegistrant;
	}
	public void setVideoneihdRegistrant(String videoneihdRegistrant) {
		this.videoneihdRegistrant = videoneihdRegistrant;
	}
	public String getVideoneihdRegistDepartment() {
		return videoneihdRegistDepartment;
	}
	public void setVideoneihdRegistDepartment(String videoneihdRegistDepartment) {
		this.videoneihdRegistDepartment = videoneihdRegistDepartment;
	}
	public String getVideoneihdReason() {
		return videoneihdReason;
	}
	public void setVideoneihdReason(String videoneihdReason) {
		this.videoneihdReason = videoneihdReason;
	}
	public String getVideoneihdRemark() {
		return videoneihdRemark;
	}
	public void setVideoneihdRemark(String videoneihdRemark) {
		this.videoneihdRemark = videoneihdRemark;
	}
	public int getVideoneihdNumber() {
		return videoneihdNumber;
	}
	public void setVideoneihdNumber(int videoneihdNumber) {
		this.videoneihdNumber = videoneihdNumber;
	}
	public Date getVideoneihdDate() {
		return videoneihdDate;
	}
	public void setVideoneihdDate(Date videoneihdDate) {
		this.videoneihdDate = videoneihdDate;
	}
	public Date getVideoneihdRegistDate() {
		return videoneihdRegistDate;
	}
	public void setVideoneihdRegistDate(Date videoneihdRegistDate) {
		this.videoneihdRegistDate = videoneihdRegistDate;
	}
	public String getVideoneihdrealName() {
		return videoneihdrealName;
	}
	public void setVideoneihdrealName(String videoneihdrealName) {
		this.videoneihdrealName = videoneihdrealName;
	}
	public String getVideoneihdVideoWay() {
		return videoneihdVideoWay;
	}
	public void setVideoneihdVideoWay(String videoneihdVideoWay) {
		this.videoneihdVideoWay = videoneihdVideoWay;
	}
	public Area getAreainfo() {
		return areainfo;
	}
	public void setAreainfo(Area areainfo) {
		this.areainfo = areainfo;
	}
	public String getVideoneihdState() {
		return videoneihdState;
	}
	public void setVideoneihdState(String videoneihdState) {
		this.videoneihdState = videoneihdState;
	}
	public String getVideoneihdVisitorPlace() {
		return videoneihdVisitorPlace;
	}
	public void setVideoneihdVisitorPlace(String videoneihdVisitorPlace) {
		this.videoneihdVisitorPlace = videoneihdVisitorPlace;
	}
	public String getVideoneihdPostCode() {
		return videoneihdPostCode;
	}
	public void setVideoneihdPostCode(String videoneihdPostCode) {
		this.videoneihdPostCode = videoneihdPostCode;
	}
	public String getVideoneihdNationality() {
		return videoneihdNationality;
	}
	public void setVideoneihdNationality(String videoneihdNationality) {
		this.videoneihdNationality = videoneihdNationality;
	}
	public String getVideoneihdAgreeOpen() {
		return videoneihdAgreeOpen;
	}
	public void setVideoneihdAgreeOpen(String videoneihdAgreeOpen) {
		this.videoneihdAgreeOpen = videoneihdAgreeOpen;
	}
	public String getVideoneihdComplainant() {
		return videoneihdComplainant;
	}
	public void setVideoneihdComplainant(String videoneihdComplainant) {
		this.videoneihdComplainant = videoneihdComplainant;
	}
	public String getVideoneihdRespondent() {
		return videoneihdRespondent;
	}
	public void setVideoneihdRespondent(String videoneihdRespondent) {
		this.videoneihdRespondent = videoneihdRespondent;
	}
	public String getVideoneihdInvolveNumber() {
		return videoneihdInvolveNumber;
	}
	public void setVideoneihdInvolveNumber(String videoneihdInvolveNumber) {
		this.videoneihdInvolveNumber = videoneihdInvolveNumber;
	}
	public String getVideoneihdTitle() {
		return videoneihdTitle;
	}
	public void setVideoneihdTitle(String videoneihdTitle) {
		this.videoneihdTitle = videoneihdTitle;
	}
	public String getVideoneihdAnonymous() {
		return videoneihdAnonymous;
	}
	public void setVideoneihdAnonymous(String videoneihdAnonymous) {
		this.videoneihdAnonymous = videoneihdAnonymous;
	}
	public String getVideoneihdConfId() {
		return videoneihdConfId;
	}
	public void setVideoneihdConfId(String videoneihdConfId) {
		this.videoneihdConfId = videoneihdConfId;
	}
	public TVideoConference getVideoConferenceinfo() {
		return videoConferenceinfo;
	}
	public void setVideoConferenceinfo(TVideoConference videoConferenceinfo) {
		this.videoConferenceinfo = videoConferenceinfo;
	}
	public String getVideoneihdTypeId() {
		return videoneihdTypeId;
	}
	public void setVideoneihdTypeId(String videoneihdTypeId) {
		this.videoneihdTypeId = videoneihdTypeId;
	}
	public String getVideoneihdHandleOpinion() {
		return videoneihdHandleOpinion;
	}
	public void setVideoneihdHandleOpinion(String videoneihdHandleOpinion) {
		this.videoneihdHandleOpinion = videoneihdHandleOpinion;
	}
	public String getVideoneihdInformProfile() {
		return videoneihdInformProfile;
	}
	public void setVideoneihdInformProfile(String videoneihdInformProfile) {
		this.videoneihdInformProfile = videoneihdInformProfile;
	}
	public String getVideoneihdLiberateCompany() {
		return videoneihdLiberateCompany;
	}
	public void setVideoneihdLiberateCompany(String videoneihdLiberateCompany) {
		this.videoneihdLiberateCompany = videoneihdLiberateCompany;
	}
	public String getVideoneihdRegistratePlace() {
		return videoneihdRegistratePlace;
	}
	public void setVideoneihdRegistratePlace(String videoneihdRegistratePlace) {
		this.videoneihdRegistratePlace = videoneihdRegistratePlace;
	}
	public String getVideoneihdPeopleDuty() {
		return videoneihdPeopleDuty;
	}
	public void setVideoneihdPeopleDuty(String videoneihdPeopleDuty) {
		this.videoneihdPeopleDuty = videoneihdPeopleDuty;
	}
	public String getVideoneihdPeopleContact() {
		return videoneihdPeopleContact;
	}
	public void setVideoneihdPeopleContact(String videoneihdPeopleContact) {
		this.videoneihdPeopleContact = videoneihdPeopleContact;
	}
	
	
}
