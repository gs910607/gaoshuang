package com.jzsx.xlgc.utils;

public class Application {

	public static String imgPath = "/upload/images/";

	public static String imgUrl = "/upload/images/";

	public static String MSG_UPDATE_SUCCESS = "更新成功";

	public static String MSG_UPDATE_FAIL = "更新失败";

	public static String MSG_ADD_SUCCESS = "添加成功";

	public static String MSG_ADD_FAIL = "添加失败";

	public static String MSG_DELETE_SUCCESS = "删除成功";

	public static String MSG_DELETE_FAIL = "删除失败";

	public static String MSG_ERROR = "非法请求";

	public static String STATUS_ADD_SUCCESS = "1";

	public static String STATUS_ADD_FAIL = "0";

	public static String STATUS_UPDATE_SUCCESS = "1";

	public static String STATUS_UPDATE_FAIL = "0";

	public static String STATUS_DELETE_SUCCESS = "1";

	public static String STATUS_DELETE_FAIL = "0";

	public static String STATUS_ERROR = "0";

	public static String[] MEDIATE_DATASTR = new String[] { "mediateid", "mediateName", "mediateAddress",
			"mediateCompleteAdd", "mediateIdentifier", "mediateRegisUnit", "mediatePurpose", "mediateDate",
			"mediateRegisName", "mediateRegisBranch", "mediateRegisDate", "mediateNumber", "mediateReason",
			"mediaterStatus" };

	public static String[] MEDIATE_HEADERS = new String[] { "ID", "书记员姓名", "调解所在地", "书记员单位", "调解编号", "登记单位", "调解目的",
			"调解日期", "登记人", "登记部门", "登记日期", "调解人数", "调解原因", "调解状态" };

	public static String[] VIDEO_NEIGHBORHOOD_HEADERS_NO = { "信访人姓名", "证件类型", "证件号码", "固定号码", "手机号码",

			"邮政编号", "信访所在地", "详细地址", "信访人国籍", "信访编号", "登记单位",

			"信访目的", "信访日期", "登记部门", "是否同意公开", "随访人", "登记日期",

			"是否匿名", "受访人", "登记人", "信访原因", "信访人数", "涉及人数",

			"标题", "概括信息", "创建人名称", "接访方式" };
	public static String[] VIDEO_NEIGHBORHOOD_DATASTR_NO = { "videoneihdName", "videoneihdCardType", "videoneihdCard",
			"videoneihdtelephone", "videoneihdphone",

			"videoneihdPostCode", "videoneihdLocationplace", "videoneihdplace", "videoneihdNationality",
			"videoneihdNum", "videoneihdCompany",

			"videoneihdObjective", "videoneihdDate", "videoneihdRegistDepartment", "videoneihdAgreeOpen",
			"videoneihdComplainant", "videoneihdRegistDate",

			"videoneihdAnonymous", "videoneihdRespondent", "videoneihdRegistrant", "videoneihdReason",
			"videoneihdNumber", "videoneihdInvolveNumber",

			"videoneihdTitle", "videoneihdRemark", "videoneihdrealName", "videoneihdVideoWay" };
	public static String[] VIDEO_NEIGHBORHOOD_HEADERS = { "接访ID", "信访人姓名", "证件类型", "证件号码", "固定号码", "手机号码",

			"邮政编号", "信访所在地", "详细地址", "信访人国籍", "信访编号", "登记单位",

			"信访目的", "信访日期", "登记部门", "是否同意公开", "随访人", "登记日期",

			"是否匿名", "受访人", "登记人", "信访原因", "信访人数", "涉及人数",

			"标题", "概括信息" };

	public static String[] MEDIATE_DATASTR_MODEL = new String[] { "mediateName", "mediateCompleteAdd",
			"mediateIdentifier", "mediateRegisUnit", "mediatePurpose", "mediateDate", "mediateRegisName",
			"mediateRegisBranch", "mediateRegisDate", "mediateNumber", "mediateReason", "mediaterStatus" };

	public static String[] MEDIATE_HEADERS_MODEL = new String[] { "书记员姓名", "书记员单位", "调解编号", "登记单位", "调解目的", "调解日期",
			"登记人", "登记部门", "登记日期", "调解人数", "调解原因", "调解状态" };

	public static String[] VIDEO_NEIGHBORHOOD_DATASTR = { "videoneihdId", "videoneihdName", "videoneihdCardType",
			"videoneihdCard", "videoneihdtelephone", "videoneihdphone",

			"videoneihdPostCode", "videoneihdLocationplace", "videoneihdplace", "videoneihdNationality",
			"videoneihdNum", "videoneihdCompany",

			"videoneihdObjective", "videoneihdDate", "videoneihdRegistDepartment", "videoneihdAgreeOpen",
			"videoneihdComplainant", "videoneihdRegistDate",

			"videoneihdAnonymous", "videoneihdRespondent", "videoneihdRegistrant", "videoneihdReason",
			"videoneihdNumber", "videoneihdInvolveNumber",

			"videoneihdTitle", "videoneihdRemark" };

	public static String[] ADMIN_DATASTR_MODEL = new String[] { "username", "password", "realname", "usertel", "remark",
			"identity" };

	public static String[] ADMIN_HEADERS_MODEL = new String[] { "账号名", "密码", "真实姓名", "手机号码", "备注", "身份证号码" };

}
