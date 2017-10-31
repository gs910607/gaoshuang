package com.rd.yum.kwms.dao.mapper;

import java.util.List;

import com.rd.yum.kwms.bean.request.KwmsQueryWareHouseInfoRequest;
import com.rd.yum.kwms.bean.vo.KwmsWareHouseInfoVo;

/**
 * 仓库mapper
 * @author sun_dongxi
 *
 */
public interface KwmsWareHouseMapper {

	/**
	 * 查询仓库信息
	 * @return
	 */
	public List<KwmsWareHouseInfoVo> queryWareHouseInfo(KwmsQueryWareHouseInfoRequest kwmsQueryWareHouseInfoRequest);
	/**
	 * 查询仓库信息个数
	 * @return
	 */
	public int queryWareHouseInfoCount();
	
	/**
	 * 根据id查询仓库信息
	 * @param guid
	 * @return
	 */
	public KwmsWareHouseInfoVo queryWareHouseInfoByGuid(String guid);
	
	/**
	 * 根据guid更新信息
	 * @param kwmsQueryWareHouseInfoRequest
	 * @return
	 */
	public int updateWareHouseInfoByGuid(KwmsWareHouseInfoVo kwmsWareHouseInfoVo);
}
