package com.jzsx.xlha.administrator.mapper;

import com.jzsx.xlha.bean.CasUser;
import com.jzsx.xlha.bean.CasUserExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface CasUserMapper {
	int countByExample(CasUserExample example);

	int deleteByExample(CasUserExample example);

	int deleteByPrimaryKey(String userid);

	int insert(CasUser record);

	int insertSelective(CasUser record);

	List<CasUser> selectByExample(CasUserExample example);

	CasUser selectByPrimaryKey(String userid);

	int updateByExampleSelective(@Param("record") CasUser record, @Param("example") CasUserExample example);

	int updateByExample(@Param("record") CasUser record, @Param("example") CasUserExample example);

	int updateByPrimaryKeySelective(CasUser record);

	int updateByPrimaryKey(CasUser record);

	int insertAdminList(List<CasUser> list);

	CasUser selectByUsername(String username);

	int updatePasswordByPrimaryKey(Map<String, String> map);
	
	CasUser selectByPhone(String usertel);
	
	CasUser selectAppByPhone(String usertel);
}