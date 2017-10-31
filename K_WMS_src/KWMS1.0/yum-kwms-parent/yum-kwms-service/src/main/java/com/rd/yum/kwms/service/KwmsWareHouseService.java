package com.rd.yum.kwms.service;

import com.hoperun.emp.common.api.bean.Response;
import com.rd.yum.kwms.bean.request.KwmsQueryWareHouseInfoByGuidRequest;
import com.rd.yum.kwms.bean.request.KwmsQueryWareHouseInfoRequest;
import com.rd.yum.kwms.bean.response.KwmsWareHouseInfoResponse;
import com.rd.yum.kwms.bean.vo.KwmsWareHouseInfoVo;

/**
 * 仓库管理service
 * @author sun_dongxi
 *
 */
public interface KwmsWareHouseService extends BaseService{

	
	/**
	 * 查询仓库信息
	 * @return
	 */
	public Response<KwmsWareHouseInfoResponse> queryWareHouseInfo(KwmsQueryWareHouseInfoRequest kwmsQueryWareHouseInfoRequest);
	
	
	/**
	 * 根据id查询仓库信息
	 * @param guid
	 * @return
	 */
	public Response<KwmsWareHouseInfoVo> queryWareHouseInfoByGuid(KwmsQueryWareHouseInfoByGuidRequest kwmsQueryWareHouseInfoByGuidRequest);
	
	/**
	 * 根据guid更新信息
	 * @param kwmsQueryWareHouseInfoRequest
	 * @return
	 */
	public Response<Integer> updateWareHouseInfoByGuid(KwmsWareHouseInfoVo kwmsWareHouseInfoVo);
}
