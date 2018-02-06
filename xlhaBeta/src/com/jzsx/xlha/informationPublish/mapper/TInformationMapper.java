package com.jzsx.xlha.informationPublish.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.jzsx.xlha.bean.TInformation;
import com.jzsx.xlha.bean.TInformationExample;

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
    
    List<TInformation> selectForInformation();
    
}