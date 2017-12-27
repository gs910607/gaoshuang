package com.jzsx.xlgc.informationPublish.mapper;

import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.TInformation;
import com.jzsx.xlgc.bean.TInformationExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface TInformationMapper {
    int countByExample(TInformationExample example);

    int deleteByExample(TInformationExample example);

    int deleteByPrimaryKey(String informationid);

    int insert(TInformation record);

    int insertSelective(TInformation record);

    List<TInformation> selectByExample(TInformationExample example);

    TInformation selectByPrimaryKey(String informationid);

    int updateByExampleSelective(@Param("record") TInformation record, @Param("example") TInformationExample example);

    int updateByExample(@Param("record") TInformation record, @Param("example") TInformationExample example);

    int updateByPrimaryKeySelective(TInformation record);

    int updateByPrimaryKey(TInformation record);
    
    List<DataAnalysis> dataAnalysis(Map<String, Object> map);
    
    List<DataAnalysis> typeAnalysis(Map<String, Object> map);
}