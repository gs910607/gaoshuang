package com.rd.yum.kwmsjunit.common.utils;

import java.io.UnsupportedEncodingException;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;

import com.hoperun.emp.common.utils.GsonUtils;
import com.rd.yum.kwmsjunit.bean.ResultMsgVo;

public class HttpClientJunitUtil {

	public static ResultMsgVo execute(String type,String json) throws UnsupportedEncodingException{
		HttpClient httpClient = new HttpClient();
		String url="";
		if(type.equals("kwms")){
			url="http://10.20.12.97:8080/kwms/api/info/invoking.do";
		}
		PostMethod post = new PostMethod(url);
		StringRequestEntity strReqEntity = new StringRequestEntity(json,"application/json","UTF-8");
		post.setRequestEntity(strReqEntity);
		post.addRequestHeader("Content-Type","application/json;charset=UTF-8");
		post.addRequestHeader("Accept", "application/json;charset=UTF-8");

		ResultMsgVo resultMsgVo=new ResultMsgVo();
		try {
			int status = httpClient.executeMethod(post);
			System.out.println(status);
			if(status == 200){
				System.out.println(new String(post.getResponseBodyAsString().getBytes("utf-8"), "utf-8"));
				resultMsgVo=GsonUtils.convertToObject(new String(post.getResponseBodyAsString().getBytes("utf-8"), "utf-8"), ResultMsgVo.class);
			}else{
				System.out.println(new String(post.getResponseBodyAsString().getBytes("utf-8"), "utf-8"));
				resultMsgVo=GsonUtils.convertToObject(new String(post.getResponseBodyAsString().getBytes("utf-8"), "utf-8"), ResultMsgVo.class);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resultMsgVo;
	}
}
