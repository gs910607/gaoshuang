package com.jzsx.xlgc.videoMediate.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jzsx.xlgc.bean.TMediatePerson;

public interface TMediatePersonMapper {
    int deleteByPrimaryKey(String id);

    int insert(TMediatePerson record);

    int insertSelective(TMediatePerson record);

    TMediatePerson selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(TMediatePerson record);

    int updateByPrimaryKey(TMediatePerson record);
    
    int insertPersonList(List<TMediatePerson> list);
    
    List<String> selectByName(String name);
    
    List<TMediatePerson> selectByMediateId(@Param("id")String id,@Param("type")Integer type);
    
    int updateByIds(@Param("list")List<String> list,@Param("url")String url);
    
    List<TMediatePerson> selectProtocol(@Param("area")String area,@Param("person")TMediatePerson person);
    
    int updateUrl(@Param("url")String url,@Param("id")String id);
}