package com.jzsx.xlha.util;

public class Application {

	public static String imgPath = "G:/images/";

	public static String videoPath = "G:/video/";
	
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
	public static String[] ADMIN_DATASTR_MODEL = new String[] {"username", "password",
			"realname", "usertel", "remark", "identity","usergroupid"};

	public static String[] ADMIN_HEADERS_MODEL = new String[] {"账号名", "密码", "真实姓名", "手机号码", "备注",
			"身份证号码","所属区域（数字）"};
}
