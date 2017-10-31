package com.rd.yum.kwms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoperun.emp.common.api.bean.Response;
import com.hoperun.emp.common.api.exception.EmpBizException;
import com.hoperun.emp.common.utils.GsonUtils;
import com.hoperun.emp.common.utils.Logger;
import com.hoperun.emp.common.utils.StringUtil;
import com.rd.yum.kwms.bean.request.KwmsQueryWareHouseInfoByGuidRequest;
import com.rd.yum.kwms.bean.request.KwmsQueryWareHouseInfoRequest;
import com.rd.yum.kwms.bean.response.KwmsWareHouseInfoResponse;
import com.rd.yum.kwms.bean.vo.KwmsWareHouseInfoVo;
import com.rd.yum.kwms.common.constant.KwmsMsgConsts;
import com.rd.yum.kwms.common.result.KwmsResult;
import com.rd.yum.kwms.dao.mapper.KwmsWareHouseMapper;
import com.rd.yum.kwms.service.KwmsWareHouseService;

/**
 * 仓库serviceImpl
 * @author sun_dongxi
 *
 */
@Service
public class KwmsWareHouseServiceImpl implements KwmsWareHouseService {

	private static Logger logger = Logger.getLogger(KwmsWareHouseServiceImpl.class);
	
	/**
	 * 仓库mapper
	 */
	@Autowired
	private KwmsWareHouseMapper kwmsWareHouseMapper;
	
	/**
	 * 查询仓库信息
	 */
	@Override
	public Response<KwmsWareHouseInfoResponse> queryWareHouseInfo(KwmsQueryWareHouseInfoRequest kwmsQueryWareHouseInfoRequest) {
		//返回response
		KwmsWareHouseInfoResponse wareHouseInfoResponse=new KwmsWareHouseInfoResponse();
		logger.info("执行查询仓库信息参数为空!");
		//查询仓库信息数据集
		List<KwmsWareHouseInfoVo> kwmsWareHouseList=kwmsWareHouseMapper.queryWareHouseInfo(kwmsQueryWareHouseInfoRequest);
		wareHouseInfoResponse.setWareHouseList(kwmsWareHouseList);
		//查询个数
		int count=kwmsWareHouseMapper.queryWareHouseInfoCount();
		wareHouseInfoResponse.setCount(count);
		logger.info("执行查询结果为：{}",GsonUtils.toJson(wareHouseInfoResponse));
		return Response.getInstance(KwmsMsgConsts.SUCCESS_COMMON_CODE,KwmsMsgConsts.SUCCESS_COMMON_MSG,wareHouseInfoResponse);
	}

	/**
	 * 根据guid查询仓库信息
	 */
	@Override
	public Response<KwmsWareHouseInfoVo> queryWareHouseInfoByGuid(KwmsQueryWareHouseInfoByGuidRequest kwmsQueryWareHouseInfoByGuidRequest) {
		
		if(StringUtil.isEmpty(kwmsQueryWareHouseInfoByGuidRequest.getGuid())){
			throw EmpBizException.getInstance(KwmsResult.GUID_EMPTY);
		}
		KwmsWareHouseInfoVo kwmsWareHouseInfoVo=kwmsWareHouseMapper.queryWareHouseInfoByGuid(kwmsQueryWareHouseInfoByGuidRequest.getGuid());
		return  Response.getInstance(KwmsMsgConsts.SUCCESS_COMMON_CODE,KwmsMsgConsts.SUCCESS_COMMON_MSG,kwmsWareHouseInfoVo);
	}

	/**
	 * 根据guid更新仓库信息
	 */
	@Override
	public Response<Integer> updateWareHouseInfoByGuid(KwmsWareHouseInfoVo kwmsWareHouseInfoVo) {
		if(StringUtil.isEmpty(kwmsWareHouseInfoVo.getGuid())){
			throw EmpBizException.getInstance(KwmsResult.GUID_EMPTY);
		}
		int count=kwmsWareHouseMapper.updateWareHouseInfoByGuid(kwmsWareHouseInfoVo);
		return Response.getInstance(KwmsMsgConsts.SUCCESS_COMMON_CODE,KwmsMsgConsts.SUCCESS_COMMON_MSG,count);
	}

}
