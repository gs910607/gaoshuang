package com.rd.yum.kwms.web.interceptor;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.hoperun.emp.common.api.model.ApiRespModel;
import com.hoperun.emp.common.utils.GsonUtils;
import com.hoperun.emp.common.utils.HttpUtils;
import com.hoperun.emp.common.utils.Logger;

/**
 * 处理登录逻辑
 * @author sun_dongxi
 *
 */
public class SessionInterceptor extends HandlerInterceptorAdapter{
	
	private static Logger logger = Logger.getLogger(SessionInterceptor.class);
	

	/**
	 * 平台登录判断拦截器
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		logger.info("拦截器验证用户信息");
		
		return true;
		
//		try {
//			ApiRespModel apiRespModel=ApiRespModel.success(999, "登录信息已过期，请重新登录");
//			HttpUtils.doResponse(response,GsonUtils.toJson(apiRespModel),false);
//		} catch (Exception e) {
//			logger.error("拦截器返回json字符串异常,错误信息：{}",e.getMessage(),e);
//		}
//		return false;
	}

	/**
	 * 拦截之后处理
	 */
	@Override
	public void postHandle(HttpServletRequest request,HttpServletResponse response, Object handler,ModelAndView modelAndView) throws Exception {
		logger.info("处理用户信息");
	}
}
