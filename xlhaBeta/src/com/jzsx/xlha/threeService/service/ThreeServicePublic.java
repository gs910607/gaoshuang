package com.jzsx.xlha.threeService.service;

import com.jzsx.xlha.bean.CasUser;
import com.jzsx.xlha.bean.TInformation;
import com.jzsx.xlha.bean.TThreeservicePublic;
import com.jzsx.xlha.util.Result;

public interface ThreeServicePublic {

	
	public Result<TInformation> getPageList(Integer pages,Integer sizePage,TInformation mation,CasUser user) throws Exception;
	
	TInformation getById(String id);
	
	int delById(String id);
}
