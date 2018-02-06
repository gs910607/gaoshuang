package com.jzsx.xlha.threeService.mapper;

import com.jzsx.xlha.bean.TThreeservicePublic;
import com.jzsx.xlha.bean.TThreeservicePublicExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TThreeservicePublicMapper {
    int countByExample(TThreeservicePublicExample example);

    int deleteByExample(TThreeservicePublicExample example);

    int deleteByPrimaryKey(String cThreeserviceId);

    int insert(TThreeservicePublic record);

    int insertSelective(TThreeservicePublic record);

    List<TThreeservicePublic> selectByExampleWithBLOBs(TThreeservicePublicExample example);

    List<TThreeservicePublic> selectByExample(TThreeservicePublicExample example);

    TThreeservicePublic selectByPrimaryKey(String cThreeserviceId);

    int updateByExampleSelective(@Param("record") TThreeservicePublic record, @Param("example") TThreeservicePublicExample example);

    int updateByExampleWithBLOBs(@Param("record") TThreeservicePublic record, @Param("example") TThreeservicePublicExample example);

    int updateByExample(@Param("record") TThreeservicePublic record, @Param("example") TThreeservicePublicExample example);

    int updateByPrimaryKeySelective(TThreeservicePublic record);

    int updateByPrimaryKeyWithBLOBs(TThreeservicePublic record);

    int updateByPrimaryKey(TThreeservicePublic record);
}