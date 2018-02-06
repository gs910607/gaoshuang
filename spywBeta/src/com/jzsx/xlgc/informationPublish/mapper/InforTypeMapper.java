package com.jzsx.xlgc.informationPublish.mapper;

import java.util.List;

import com.jzsx.xlgc.bean.InforType;

public interface InforTypeMapper {
    int deleteByPrimaryKey(String id);

    int insert(InforType record);

    int insertSelective(InforType record);

    InforType selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(InforType record);

    int updateByPrimaryKey(InforType record);
    
    List<InforType> selectAll();
}