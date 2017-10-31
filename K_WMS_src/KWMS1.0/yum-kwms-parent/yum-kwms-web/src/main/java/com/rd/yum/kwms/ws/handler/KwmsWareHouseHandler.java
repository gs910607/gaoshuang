package com.rd.yum.kwms.ws.handler;

import org.springframework.stereotype.Component;

import com.hoperun.emp.common.api.bean.Response;
import com.hoperun.emp.common.api.interfaces.ApiParamAnnotation;
import com.hoperun.emp.common.api.model.ApiRespModel;
import com.hoperun.emp.common.services.ServiceFactory;
import com.hoperun.emp.common.utils.Logger;
import com.rd.yum.kwms.bean.request.KwmsQueryWareHouseInfoByGuidRequest;
import com.rd.yum.kwms.bean.request.KwmsQueryWareHouseInfoRequest;
import com.rd.yum.kwms.bean.response.KwmsWareHouseInfoResponse;
import com.rd.yum.kwms.bean.vo.KwmsWareHouseInfoVo;
import com.rd.yum.kwms.common.constant.KwmsHintConsts;
import com.rd.yum.kwms.service.KwmsWareHouseService;

@Component("wareHouse")
public class KwmsWareHouseHandler {

	
	private static Logger logger = Logger.getLogger(KwmsWareHouseHandler.class);
	
	/**
	 * wareHouse service
	 */
	private KwmsWareHouseService kwmsWareHouseService = ServiceFactory.getInstance().lookup(KwmsWareHouseService.class);
	
	/**
	 * 查询仓库信息
	 * @param kwmsQueryWareHouseInfoRequest
	 * @return
	 */
	@ApiParamAnnotation(clazz = KwmsQueryWareHouseInfoRequest.class)
	public ApiRespModel queryWareHouseInfo(KwmsQueryWareHouseInfoRequest kwmsQueryWareHouseInfoRequest){
		logger.info("执行查询仓库信息");
		Response<KwmsWareHouseInfoResponse> response=kwmsWareHouseService.queryWareHouseInfo(kwmsQueryWareHouseInfoRequest);
		return ApiRespModel.success(response.getData(),KwmsHintConsts.SUCCESS);		
	}
	
	/**
	 * 根据guid查询仓库信息
	 * @param kwmsQueryWareHouseInfoByGuidRequest
	 * @return
	 */
	@ApiParamAnnotation(clazz = KwmsQueryWareHouseInfoByGuidRequest.class)
	public ApiRespModel queryWareHouseInfoByGuid(KwmsQueryWareHouseInfoByGuidRequest kwmsQueryWareHouseInfoByGuidRequest){
		logger.info("执行根据guid查询仓库信息");
		Response<KwmsWareHouseInfoVo> response=kwmsWareHouseService.queryWareHouseInfoByGuid(kwmsQueryWareHouseInfoByGuidRequest);
		return ApiRespModel.success(response.getData(),KwmsHintConsts.SUCCESS);		
	}
	
	/**
	 * 根据guid更新仓库信息
	 * @param kwmsWareHouseInfoVo
	 * @return
	 */
	@ApiParamAnnotation(clazz = KwmsWareHouseInfoVo.class)
	public ApiRespModel updateWareHouseInfoByGuid(KwmsWareHouseInfoVo kwmsWareHouseInfoVo){
		logger.info("执行根据guid更新仓库信息");
		Response<Integer> response=kwmsWareHouseService.updateWareHouseInfoByGuid(kwmsWareHouseInfoVo);
		return ApiRespModel.success(response.getData(),KwmsHintConsts.SUCCESS);		
	}
}
