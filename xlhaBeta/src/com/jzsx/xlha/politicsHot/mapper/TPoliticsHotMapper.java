package com.jzsx.xlha.politicsHot.mapper;

import com.jzsx.xlha.bean.TPoliticsHot;
import com.jzsx.xlha.bean.TPoliticsHotExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TPoliticsHotMapper {
    int countByExample(TPoliticsHotExample example);

    int deleteByExample(TPoliticsHotExample example);

    int insert(TPoliticsHot record);

    int insertSelective(TPoliticsHot record);

    List<TPoliticsHot> selectByExampleWithBLOBs(TPoliticsHotExample example);

    List<TPoliticsHot> selectByExample(TPoliticsHotExample example);

    int updateByExampleSelective(@Param("record") TPoliticsHot record, @Param("example") TPoliticsHotExample example);

    int updateByExampleWithBLOBs(@Param("record") TPoliticsHot record, @Param("example") TPoliticsHotExample example);

    int updateByExample(@Param("record") TPoliticsHot record, @Param("example") TPoliticsHotExample example);
    
    int updateByPrimaryKeySelective(TPoliticsHot record);
    
    TPoliticsHot selectByPrimaryKey(String cPoliticsId);
    
    int deleteByPrimaryKey(String cPoliticsId);
}