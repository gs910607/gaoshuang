package com.jzsx.xlha.legalPublicity.mapper;

import com.jzsx.xlha.bean.TLegalPublicity;
import com.jzsx.xlha.bean.TLegalPublicityExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TLegalPublicityMapper {
    int countByExample(TLegalPublicityExample example);

    int deleteByExample(TLegalPublicityExample example);

    int deleteByPrimaryKey(String cLegalId);

    int insert(TLegalPublicity record);

    int insertSelective(TLegalPublicity record);

    List<TLegalPublicity> selectByExample(TLegalPublicityExample example);

    TLegalPublicity selectByPrimaryKey(String cLegalId);

    int updateByExampleSelective(@Param("record") TLegalPublicity record, @Param("example") TLegalPublicityExample example);

    int updateByExample(@Param("record") TLegalPublicity record, @Param("example") TLegalPublicityExample example);

    int updateByPrimaryKeySelective(TLegalPublicity record);

    int updateByPrimaryKey(TLegalPublicity record);
}