package com.jzsx.xlha.administrator.service;

import java.util.List;
import java.util.Map;

import com.jzsx.xlha.bean.CasUser;
import com.jzsx.xlha.util.Result;

public interface AdminService {
	
	public int addAdminUser(CasUser user,boolean status);	
	
	public int deleteAdminUser(String id);
		
	public Result<CasUser> getPageList(Integer pages,Integer sizePage,CasUser user,String code);
	
	public CasUser getAdmin(String id);
	
	public int insertAdminList(List<CasUser> list);
	
	CasUser selectByUsername(String username);
	
	public int  updatePassword(Map<String, String> map);
	
	int insertUser(CasUser user);
	
	CasUser selectByPhone(String usertel);
	
	CasUser selectAppByPhone(String usertel);
	
}
