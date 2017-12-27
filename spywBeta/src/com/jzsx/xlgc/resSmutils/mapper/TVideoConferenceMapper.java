package com.jzsx.xlgc.resSmutils.mapper;

import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.DataByCode;
import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.bean.TVideoConferenceExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface TVideoConferenceMapper {
    int countByExample(TVideoConferenceExample example);

    int deleteByExample(TVideoConferenceExample example);

    int deleteByPrimaryKey(String confId);

    int insert(TVideoConference record);

    int insertSelective(TVideoConference record);

    List<TVideoConference> selectByExample(TVideoConferenceExample example);

    TVideoConference selectByPrimaryKey(String confId);

    int updateByExampleSelective(@Param("record") TVideoConference record, @Param("example") TVideoConferenceExample example);

    int updateByExample(@Param("record") TVideoConference record, @Param("example") TVideoConferenceExample example);

    int updateByPrimaryKeySelective(TVideoConference record);

    int updateByPrimaryKey(TVideoConference record);
    
    int updateByStatus(Map<String, Object> map);
    
    List<DataAnalysis> dataAnalysis(String start);
    
    List<DataAnalysis> allDataAnalysis(@Param("start")String start,@Param("code")String code);
    
    List<DataByCode> selectByCode(@Param("start")String start,@Param("code")String code);
    /**
     * 根据条件展示视频培训和视频会议里的录播数据
     * @param conference
     * @return
     */
    public List<TVideoConference>  queryVideoOrConferByisrecord(TVideoConference conference);
}