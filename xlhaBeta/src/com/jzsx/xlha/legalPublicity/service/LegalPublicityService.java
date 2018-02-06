package com.jzsx.xlha.legalPublicity.service;

import com.jzsx.xlha.bean.TLegalPublicity;
import com.jzsx.xlha.util.Result;

public interface LegalPublicityService {
	
	public int addLegal(TLegalPublicity legalPublicity,boolean status);
	
	public Result<TLegalPublicity> getPageList(Integer pages,TLegalPublicity publicity,String user);
	
	public TLegalPublicity getLegalById(String id);
	
	public int deleteLegal(String id);
	
	Result<TLegalPublicity> appGetPageList(Integer pages,Integer sizes,String code);

}
