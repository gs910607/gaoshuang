package com.rd.yum.kwms.common.result;

import com.hoperun.emp.common.api.interfaces.EmpServiceResultInterface;
import com.hoperun.emp.common.constant.ModuleDefine;
import com.rd.yum.kwms.bean.utils.KwmsModuleDefine;
import com.rd.yum.kwms.common.constant.KwmsHintConsts;
import com.rd.yum.kwms.common.constant.KwmsMsgConsts;

public enum KwmsResult implements EmpServiceResultInterface{
	
	SUCCESS(0,KwmsHintConsts.SUCCESS),
	GUID_EMPTY(KwmsMsgConsts.GUID_EMPTY_CODE,KwmsMsgConsts.GUID_EMPTY_MSG);
	

	/**
	 * 模块定义
	 */
	private static ModuleDefine module = KwmsModuleDefine.KWMSMODULE;
	/**
     * resultCode 0 表示正常返回
     */
    private int code = 0;
    /**
     * message
     */
    private final String message;
    
    /**
     * 构造函数
     * 
     * @param resultCode
     * @param resultMessage
     */
    KwmsResult(int code, String message) {
        this.code = code;
        this.message = message;
    }
	
	@Override
	public int getErrCode() {
		return module.getCode()+code;
	}

	@Override
	public String getErrorMessage() {
		return module.getName() + "-" + message;
	}
	
}
