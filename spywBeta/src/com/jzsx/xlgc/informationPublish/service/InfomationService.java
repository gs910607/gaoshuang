package com.jzsx.xlgc.informationPublish.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import com.jzsx.xlgc.bean.CasInformationSearch;
import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.InforType;
import com.jzsx.xlgc.bean.TInformation;
import com.jzsx.xlgc.utils.AppResult;
import com.jzsx.xlgc.utils.Result;

public interface InfomationService {

	public List<TInformation> getInfo(int type,String code);

	public  Integer addInformation(TInformation casInformation);
	
	public Result getPageList(Integer pages,Integer type,String code);
	
	public Result getSearchPageList(Integer pages,CasInformationSearch search,String code) throws ParseException;
	
	
	public TInformation getInformationById(String id);
	
	public Integer updateInformation(TInformation casInformation);
	
	public int deleteInformation(String id);
	
	public List<DataAnalysis> getDataAnalysis(Map<String, Object> map);
	
	
	public List<DataAnalysis> getTypeAnalysis(Map<String, Object> map);
	
	Result<TInformation> appListInformation(Integer type,String code,Integer pages,Integer sizes);
	
	AppResult reply(String id,String code);
	
    List<InforType> getType();

}
