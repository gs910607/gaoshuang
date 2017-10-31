package com.rd.yum.kwms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rd.yum.kwms.dao.mapper.KwmsTestMapper;
import com.rd.yum.kwms.service.KwmsTestService;

/**
 * testServiceImpl
 * @author sun_dongxi
 *
 */
@Service
public class KwmsTestServiceImpl implements KwmsTestService {


	/**
	 * testMapper
	 */
	@Autowired
	private KwmsTestMapper kwmsTestMapper;
	
	/**
	 * testInfo
	 */
	@Override
	public int testInfo() {
		//
		return kwmsTestMapper.test();
	}

}
