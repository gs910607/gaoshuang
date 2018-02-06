package com.jzsx.xlha.politicsHot.service;

import com.jzsx.xlha.bean.TPoliticsHot;
import com.jzsx.xlha.util.Result;

public interface PoliticsService {

public int addPolitics(TPoliticsHot hot,boolean status);
	
	public Result<TPoliticsHot> getPageList(Integer pages,TPoliticsHot hot,String user);
	
	public TPoliticsHot getHotById(String id);
	
	public int deletePolitics(String id);
}
