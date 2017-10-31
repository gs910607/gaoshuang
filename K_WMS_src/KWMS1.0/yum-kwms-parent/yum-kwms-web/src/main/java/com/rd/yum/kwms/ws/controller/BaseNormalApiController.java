package com.rd.yum.kwms.ws.controller;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hoperun.emp.common.api.controller.BaseApiController;
import com.hoperun.emp.common.api.controller.BaseSignApiController;
import com.hoperun.emp.common.api.exception.EmpBizException;
import com.hoperun.emp.common.api.interfaces.ApiParamAnnotation;
import com.hoperun.emp.common.api.interfaces.CompInfoAnnotation;
import com.hoperun.emp.common.api.model.ApiParamModel;
import com.hoperun.emp.common.api.model.ApiRespModel;
import com.hoperun.emp.common.constant.SysConsts;
import com.hoperun.emp.common.utils.DateUtil;
import com.hoperun.emp.common.utils.GsonUtils;
import com.hoperun.emp.common.utils.HttpUtils;
import com.hoperun.emp.common.utils.Logger;
import com.hoperun.emp.common.utils.SpringContextUtil;

/**
 * 基于同一入口invoking.do的Controller基础类
 * @author feng_wei
 *
 */
public abstract class BaseNormalApiController extends BaseApiController implements InitializingBean{
	
	/**
	 * 日志操作对象
	 */
	private static Logger logger = Logger.getLogger(BaseSignApiController.class);
	
	protected Map<String,Object> handlerMap = new ConcurrentHashMap<String,Object>();
	
	protected Map<String,Method> handlerMethod = new  ConcurrentHashMap<String,Method>();
	
	public void afterPropertiesSet() throws Exception {
		logger.info("---------------------------------------------------------------------------------");
		logger.info(SpringContextUtil.getBeanWithAnnotation(CompInfoAnnotation.class).toString());
		logger.info("---------------------------------------------------------------------------------");
	}
	
	
	/**
	 * API接口调用入口
	 * @author feng_wei
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/invoking.do")
	protected final void recieveMsg(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Object retObj=null;

		// 请求头统一设置
		HttpUtils.httpHeaderSetting(request, response);
		boolean isGzip = HttpUtils.isGzip(request);
		
		// 解析请求数据
		String requestJson = HttpUtils.getRequestJson(request,isGzip);
		ApiParamModel paramModel = GsonUtils.convertToObject(requestJson, ApiParamModel.class);
		
		// 获取接口名和方法名
		String interfaceName = paramModel.getInterfaceName();
		String methodName = paramModel.getMethodName();
		
		// 根据接口名获取spring实例
		Object handlerObj = SpringContextUtil.getBean(interfaceName);
		
		// 如果无法获取实例，说明接口错误
		if(handlerObj == null){
			logger.error(SysConsts.ApiCommonConsts.REQUEST_INVALID_INTERFACE,interfaceName,methodName);
			retObj = fail(SysConsts.SystemConsts.INVALID_SERVICE);
		}else{
			// 获取方法列表
			Method[] methods =  handlerObj.getClass().getMethods();
			boolean retFlg = false;
			// 循环接口方法，匹配处理方法
			// TODO feng_wei 增加静态JVM缓存，缓存已经处理过的方法，减少循环计算量
			for(Method method:methods){
				// 查询匹配的方法名和注解方法
				if(methodName.equals(method.getName()) && method.isAnnotationPresent(ApiParamAnnotation.class)){
					try {
						// 从注解中获取参数类型
						Class<?> clazz = method.getAnnotation(ApiParamAnnotation.class).clazz();
						method.getAnnotation(ApiParamAnnotation.class).desc();
						
						int paramLen = method.getParameterTypes().length;
						Object[] paramArr = new Object[paramLen];
						
						// 启用方法处理
						Long infStartMills = DateUtil.currentCountMillis();
						
						Object paramData = paramModel.convertObject(clazz);
						
						// 执行前参数校验
 						ApiRespModel chkRst = validCheck(request, paramData);
						
						if(chkRst != null){
							HttpUtils.doResponse(response,retObj,isGzip);
							return;
						}
						
						// 设置方法请求参数
						for(int i=0;i<paramLen;i++){
							if(HttpServletRequest.class.equals(method.getParameterTypes()[i])){
								paramArr[i] = request;
							}else if(HttpServletResponse.class.equals(method.getParameterTypes()[i])){
								paramArr[i] = response;
							}else if(clazz.equals(method.getParameterTypes()[i])){
								paramArr[i] = paramData;
							}
						}
						
						retObj = method.invoke(SpringContextUtil.getBean(interfaceName), paramArr);
						logger.info(SysConsts.ApiCommonConsts.REQUEST_INTERFACE_TIME_COST,interfaceName,methodName,String.valueOf(DateUtil.currentCountMillis()-infStartMills));
						retFlg=true;
						break;
					} catch(InvocationTargetException e){
						// 如果是业务异常，需要将业务异常规范化数据输出，返回响应
						if(e.getTargetException() != null && e.getTargetException() instanceof EmpBizException){
							EmpBizException empBizException = (EmpBizException) e.getTargetException();
							int errcode = empBizException.getErrorCode();
							String errMsg = empBizException.getErrorMsg();
							Object errData = empBizException.getErrorData();
							retObj = ApiRespModel.fail(errcode, errMsg, errData);
							logger.error(SysConsts.ApiCommonConsts.REQUEST_INTERFACE_BIZ_ERROR,interfaceName,methodName,errcode, errMsg, errData);
						}else{
							// 其他未捕获异常，统一输出处理
							logger.error(SysConsts.ApiCommonConsts.REQUEST_INTERFACE_DEAL_ERROR, interfaceName,methodName,e);
							retObj = fail(SysConsts.SystemConsts.SYSTEM_ERROR);
						}
						retFlg=true;
					}catch(EmpBizException e){
						retObj = ApiRespModel.fail(e.getErrorCode(), e.getErrorMsg(), e.getErrorData());
						logger.error(SysConsts.ApiCommonConsts.REQUEST_INTERFACE_BIZ_ERROR,interfaceName,methodName,e.getErrorCode(), e.getErrorMsg(), e.getErrorData());
						retFlg=true;
					}catch (Exception e) {
						// 其他未捕获异常，统一输出处理
						logger.error(SysConsts.ApiCommonConsts.REQUEST_INTERFACE_DEAL_ERROR, interfaceName,methodName,e);
						retObj = fail(SysConsts.SystemConsts.SYSTEM_ERROR);
						retFlg=true;
					}
				}
			}
			if(!retFlg){
				logger.error(SysConsts.ApiCommonConsts.REQUEST_INVALID_INTERFACE,interfaceName,methodName);
				retObj = fail(SysConsts.SystemConsts.INVALID_SERVICE);
			}
		}
		
		HttpUtils.doResponse(response,retObj,isGzip);
	}
	
	public ApiRespModel validCheck(HttpServletRequest request,Object paramData){
		
		return null;
	}
}
