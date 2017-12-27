package com.jzsx.xlgc.utils;

import javax.servlet.http.HttpServletRequest;

import com.jzsx.xlgc.bean.CasUser;

public class SessionUtil {

	public static CasUser getSession(HttpServletRequest request){
		CasUser user = (CasUser) request.getSession().getAttribute("appUser");
		return user;
	}
}
