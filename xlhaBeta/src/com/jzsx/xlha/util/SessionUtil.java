package com.jzsx.xlha.util;

import javax.servlet.http.HttpServletRequest;

import com.jzsx.xlha.bean.CasUser;

public class SessionUtil {

	public static CasUser getSession(HttpServletRequest request){
		CasUser user = (CasUser) request.getSession().getAttribute("user");
		return user;
	}
}
