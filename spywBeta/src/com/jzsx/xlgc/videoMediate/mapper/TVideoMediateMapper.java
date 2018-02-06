package com.jzsx.xlgc.videoMediate.mapper;

import com.jzsx.xlgc.bean.Area;
import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.DataByCode;
import com.jzsx.xlgc.bean.DisputeData;
import com.jzsx.xlgc.bean.TVideoMediate;
import com.jzsx.xlgc.bean.TVideoMediateExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface TVideoMediateMapper {
    int countByExample(TVideoMediateExample example);

    int deleteByExample(TVideoMediateExample example);

    int deleteByPrimaryKey(String mediateid);

    int insert(TVideoMediate record);

    int insertSelective(TVideoMediate record);

    List<TVideoMediate> selectByExampleWithBLOBs(TVideoMediateExample example);

    List<TVideoMediate> selectByExample(TVideoMediateExample example);

    TVideoMediate selectByPrimaryKey(String mediateid);

    int updateByExampleSelective(@Param("record") TVideoMediate record, @Param("example") TVideoMediateExample example);

    int updateByExampleWithBLOBs(@Param("record") TVideoMediate record, @Param("example") TVideoMediateExample example);

    int updateByExample(@Param("record") TVideoMediate record, @Param("example") TVideoMediateExample example);

    int updateByPrimaryKeySelective(TVideoMediate record);

    int updateByPrimaryKeyWithBLOBs(TVideoMediate record);

    int updateByPrimaryKey(TVideoMediate record);
    
    int insertMediateList(List<TVideoMediate> list);
    
    List<DataAnalysis> dataAnalysis(Map<String, String> map);
    
    List<DataAnalysis> allDataAnalysis(Map<String, String> map);
    
    int updateStatusByPrimaryKey(Map<String, String> map);
    
    List<TVideoMediate> selectByExampleJoinTable(TVideoMediateExample example);
    
    List<DataByCode> selectByCode(@Param("code")String code,@Param("start")String start,@Param("stop")String stop);
    
    int queryIdentityCount(String code);
    
    List<DisputeData> queryDisputeType(String year);
    
    List<DisputeData> queryDisputeByType(@Param("type")String type,@Param("year")String year);
    
    List<Area> selectArea(List list);
 }