package com.jzsx.xlgc.resSmutils.service;

import java.util.List;
import java.util.Map;

import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.DataByCode;
import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.utils.Result;

public interface ConferenceService {

	
	public int addConference(TVideoConference conference);
	
	public Result<TVideoConference> getPageList(Integer pages,TVideoConference conference,String code);
	
	int updateByStatus(Map<String, Object> map);
	
	List<DataAnalysis> dataAnalysis(String start);
	
	List<DataAnalysis> allDataAnalysis(String start,String code);
	
	List<DataByCode> selectByCode(String start,String code);
	

	TVideoConference selectByPrimaryKey(String id);
	

	 /**
     * 根据条件展示视频培训和视频会议里的录播数据
     * @param conference
     * @return
     */
    public Map<String, Object>  queryVideoOrConferByisrecord(TVideoConference conference,int pagesize,int pageNum);
    /**
     * 根据id查询数据
     * @param confId
     * @return
     */
    public TVideoConference queryById(String confId);

}
