package com.rd.yum.kwms.bean.utils;

import com.hoperun.emp.common.constant.ModuleDefine;

/**
 * 模块定义枚举
 * @author feng_wei
 *
 */
public enum KwmsModuleDefine implements ModuleDefine{
	
	COMMONMODULE(200,"YUM.KWMS.COMMON"),
	KWMSMODULE(201,"YUM.KWMS")
	;
	
	private int code;
	
	private String name;

	private KwmsModuleDefine(int code, String name) {
		this.code = code;
		this.name = name;
	}

	public int getCode(){
		return code*1000;
	}
	
	public String getName(){
		return name;
	}
}
