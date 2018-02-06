package com.jzsx.xlha.informationPublish.service;

import com.jzsx.xlha.bean.CasInformationSearch;
import com.jzsx.xlha.bean.TInformation;
import com.jzsx.xlha.util.Result;

public interface InfomationService {

	public TInformation getInformationById(String id);
	
	Result<TInformation> appListInformation(Integer type,Integer pages,Integer sizes);
	
	Result<TInformation> selectForInformation();
	
	Result<TInformation> selectDraw();
	
	Result<TInformation> getPublish(Integer pages,Integer sizePage,CasInformationSearch search);
	
	Result<TInformation> getDraw(Integer pages,Integer sizePage,CasInformationSearch search);

}
