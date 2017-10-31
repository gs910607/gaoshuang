package com.rd.yum.kwms.ws.handler;

import org.springframework.stereotype.Component;

import com.hoperun.emp.common.api.interfaces.ApiParamAnnotation;
import com.hoperun.emp.common.api.model.ApiRespModel;
import com.hoperun.emp.common.services.ServiceFactory;
import com.hoperun.emp.common.utils.Logger;
import com.rd.yum.kwms.common.constant.KwmsHintConsts;
import com.rd.yum.kwms.service.KwmsTestService;

@Component("test")
public class KwmsTestHandler {
	
	private static Logger logger = Logger.getLogger(KwmsTestHandler.class);
	
	/**
	 * test service
	 */
	private KwmsTestService kwmsTestService = ServiceFactory.getInstance().lookup(KwmsTestService.class);
	
	
	
	/**
	 * test
	 * @param request
	 * @return
	 */
	@ApiParamAnnotation
	public ApiRespModel getTestInfo(){
		logger.info("getTestInfo");
		int testInfo=kwmsTestService.testInfo();
		return ApiRespModel.success(testInfo,KwmsHintConsts.SUCCESS);		
	}
}
