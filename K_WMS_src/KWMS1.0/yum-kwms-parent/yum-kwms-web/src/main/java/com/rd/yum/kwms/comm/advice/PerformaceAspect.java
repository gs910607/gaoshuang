package com.rd.yum.kwms.comm.advice;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import com.hoperun.emp.common.api.advice.BasePerformaceAspect;

/**
 * 性能日志拦截器
 * @author feng_wei
 */
@Aspect
@Component
public class PerformaceAspect extends BasePerformaceAspect{

	/**
	 * 定义Service性能日志拦截器
	 * service类以及serviceUtils
	 * @author feng_wei
	 */
	@Pointcut("execution(* com.rd.yum.point.service.*.**(..))")
	public void aroundServicePointcut() {
		
	}
	/**
	 * 定义Mapper性能日志拦截器
	 * Mapper类
	 * @author feng_wei
	 */
	@Pointcut("execution(* com.rd.yum.point.dao.mapper.*.**(..))")
	public void aroundMapperPointcut() {
		
	}

	public void throwServicePointcut() {
		
	}

	public void throwMapperPointcut() {
		
	}
	
}
