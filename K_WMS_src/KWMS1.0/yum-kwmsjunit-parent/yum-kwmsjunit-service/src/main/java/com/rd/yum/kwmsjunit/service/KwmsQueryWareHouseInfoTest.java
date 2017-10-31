package com.rd.yum.kwmsjunit.service;

import static org.junit.Assert.assertFalse;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import com.hoperun.emp.common.api.model.ApiParamModel;
import com.hoperun.emp.common.utils.GsonUtils;
import com.rd.yum.kwmsjunit.bean.ResultMsgVo;
import com.rd.yum.kwmsjunit.common.utils.HttpClientJunitUtil;

@RunWith(value=Parameterized.class) 
public class KwmsQueryWareHouseInfoTest{

	/**
	 */
	private int pageNo;
	
	private int pageSize;
      
    @Parameters  
    public static Collection<Object[]> getTestParameters(){  
          
        List<Object[]> list = new ArrayList<Object[]>();  
        list.add(new Object[]{2,1});
        return list;  
      
    }  
      
    public KwmsQueryWareHouseInfoTest(int pageNo,int pageSize){  
        this.pageNo = pageNo;  
        this.pageSize=pageSize;
    }  
      
    @Before
    public void setUp(){  
    }  
      
    @Test
	public void testQueryWareHouseInfo() throws UnsupportedEncodingException{
    	ApiParamModel apiParamModel=new ApiParamModel();
    	apiParamModel.setInterfaceName("wareHouse");
    	apiParamModel.setMethodName("queryWareHouseInfo");
    	//数据集
        Map<String,Object> map=new HashMap<String,Object>();
        map.put("pageNo",pageNo);
        map.put("pageSize", pageSize);
        apiParamModel.setData(map);
        
		ResultMsgVo resultMsgVo=HttpClientJunitUtil.execute("kwms",GsonUtils.toJson(apiParamModel));
		assertFalse(resultMsgVo.success);
	}
	
	
}
