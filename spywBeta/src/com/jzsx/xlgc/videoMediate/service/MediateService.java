package com.jzsx.xlgc.videoMediate.service;

import java.util.List;
import java.util.Map;

import com.jzsx.xlgc.bean.Area;
import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.DataByCode;
import com.jzsx.xlgc.bean.DisputeData;
import com.jzsx.xlgc.bean.TMediatePerson;
import com.jzsx.xlgc.bean.TVideoMediate;
import com.jzsx.xlgc.utils.Result;

public interface MediateService {
	
	public int addMediate(TVideoMediate mediate,boolean status,List<TMediatePerson> list);
	
	public Result<TVideoMediate> getPageList(Integer pages,String code);
	
	
	public Result<TVideoMediate> getSearchPageList(Integer pages,TVideoMediate mediate,String code) throws Exception;

	
	public int deleteMedia(String id);
	
	
	public Result<TVideoMediate> importMediate(TVideoMediate videoMediate,String code) throws Exception;
	
	
	public int insertByExport(List<TVideoMediate> list);
	
	
	public TVideoMediate getMediateById(String id);
	
	public  List<DataAnalysis> dataAnalysis(Map<String, String> map);
	
	public  List<DataAnalysis> allDataAnalysis(Map<String, String> map);
	
	public int updateStatusByPrimaryKey(Map<String, String> map);
	
	Result<TVideoMediate> selectByExampleJoinTable();
	
	int insertPersonList(List<TMediatePerson> list);
	
	List<DataByCode> selectByCode(String code,String start,String stop);
	
	List<TMediatePerson> selectByMediateId(String id,Integer type);
	
	int queryIdentityCount(String code);
	
	List<DisputeData> queryDisputeType(String year);
	
	List<DisputeData> queryDisputeByType(String type,String year);
	
	int updateByIds(List<String> list,String url);
	
	Result<TMediatePerson> selectProtocol(String area,Integer pages,TMediatePerson person);
	
	int updateUrl(String url,String id);
	
	List<Area> selectArea(List list);
	
}
