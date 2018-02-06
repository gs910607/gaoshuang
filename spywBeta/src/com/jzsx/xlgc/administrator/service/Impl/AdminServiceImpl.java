package com.jzsx.xlgc.administrator.service.Impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.base.Strings;
import com.jzsx.xlgc.administrator.mapper.CasUserMapper;
import com.jzsx.xlgc.administrator.service.AdminService;
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.bean.CasUserExample;
import com.jzsx.xlgc.bean.CasUserExample.Criteria;
import com.jzsx.xlgc.utils.Result;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private CasUserMapper mapper;

	@Override
	public int addAdminUser(CasUser user, boolean status) {
		if (status) {
			int i = mapper.insert(user);
			return i;
		} else {
			int i = mapper.updateByPrimaryKeySelective(user);
			return i;
		}
	}

	@Override
	public int deleteAdminUser(String id) {
		int i = mapper.deleteByPrimaryKey(id);
		return i;
	}

	@Override
	public Result<CasUser> getPageList(Integer pages, CasUser user, String code) {
		CasUserExample example = new CasUserExample();
		PageHelper.startPage(pages, 10);
		example.setOrderByClause("userlevel asc");
		Criteria criteria = example.createCriteria();
		
		if (!Strings.isNullOrEmpty(user.getUsername())) {
			criteria.andUsernameLike("%"+user.getUsername()+"%");
		}
		if (!Strings.isNullOrEmpty(user.getUsergroupid().toString())) {
			if(user.getUsergroupid().toString().length()>1){
				criteria.andUsergroupidLike(user.getUsergroupid().toString()+"0" + "%");
			}else{
				criteria.andUsergroupidNotEqualTo(BigDecimal.valueOf(Long.valueOf("1")));
			}
		}else{
			criteria.andUsergroupidLike(code+"0"+ "%");
		}
		if (user.getUserlevel()!=null) {
			criteria.andUserlevelEqualTo(user.getUserlevel());
		}
		if (!Strings.isNullOrEmpty(user.getRealname())) {
			criteria.andRealnameEqualTo(user.getRealname());
		}
		if (!Strings.isNullOrEmpty(user.getUsertel())) {
			criteria.andUsertelEqualTo(user.getUsertel());
		}
		List<CasUser> list = mapper.selectByExample(example);
		PageInfo<CasUser> info = new PageInfo<CasUser>(list);
		Result<CasUser> result = new Result<CasUser>();
		result.setNum(info.getPages());
		result.setList(list);
		return result;
	}

	@Override
	public CasUser getAdmin(String id) {
		CasUser user = mapper.selectByPrimaryKey(id);
		return user;
	}

	@Override
	public int insertAdminList(List<CasUser> list) {
		int i = mapper.insertAdminList(list);
		return i;
	}

	@Override
	public CasUser selectByUsername(String username) {
		CasUser user =mapper.selectByUsername(username);
		return user;
	}

	@Override
	public int updatePassword(Map<String, String> map) {
		int i = mapper.updatePasswordByPrimaryKey(map);
		return i;
	}

}
