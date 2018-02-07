package com.jzsx.xlgc.administrator.service;

import java.util.List;
import java.util.Map;

import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.utils.Result;

public interface AdminService {
	
	public int addAdminUser(CasUser user,boolean status);	
	
	public int deleteAdminUser(String id);
		
	public Result<CasUser> getPageList(Integer pages,CasUser user,String code);
	
	public CasUser getAdmin(String id);
	
	public int insertAdminList(List<CasUser> list);
	
	CasUser selectByUsername(String username);
	
	public int  updatePassword(Map<String, String> map);
	
	public void insertAdmin(CasUser user);
}
