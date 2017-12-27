package com.jzsx.xlgc.filter;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.jasig.cas.client.util.AssertionHolder;
import org.jasig.cas.client.validation.Assertion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import com.jzsx.xlgc.administrator.service.AdminService;
import com.jzsx.xlgc.bean.CasUser;

/**
 * Servlet Filter implementation class LoginFilter
 */
@WebFilter("/LoginFilter")
public class LoginFilter implements Filter {
    public final static String SEESION_MEMBER = "session_member";
    public final static String SESSION_MEMBER_ID = "session_member_id";
    public final static String SESSION_MEMBER_SYS_FUN = "session_member_sys_fun";
    public final static String SESSION_MEMBER_STATE = "session_member_state";
    public final static String SESSION_MEMBER_IP_LIMIT = "session_member_iplimit";
    public final static String SESSION_MEMBER_MUTIL_LIMIT = "session_member_mutillimit";

    private static Logger log = Logger.getLogger(LoginFilter.class);
    
    @Autowired
    private AdminService userService;
    
    public static Map<BigDecimal,HttpSession> loginInfoMap = new ConcurrentHashMap<BigDecimal,HttpSession>();
    /**
     * Default constructor. 
     */
    public LoginFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
			SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
			HttpSession session = ((HttpServletRequest) request).getSession();
			//如果session中没有用户信息，则填充用户信息
			String requestUri = ((HttpServletRequest) request).getRequestURI();
	        String contextPath = ((HttpServletRequest) request).getContextPath();
	        String url = requestUri.substring(contextPath.length());
	
	        log.info("requestUri:" + requestUri);
	        log.info("contextPath:" + contextPath);
	        log.info("url:" + url);
	        
	        //从Cas服务器获取登录账户的用户名
	        Assertion assertion = AssertionHolder.getAssertion();
	        
	        //String userName = assertion.getPrincipal().getName();
	        if(assertion==null){
	        	//((HttpServletResponse) response).sendRedirect("http://localhost:8080/cas/login?service=");
	        }else if (session.getAttribute(SEESION_MEMBER) == null) {
	        	    String userName = assertion.getPrincipal().getName();
	        	    
	                 //ApplicationContext context = new ClassPathXmlApplicationContext("spring-mybatis.xml");
	                 //IAppUserService appUserService = (IAppUserService) context.getBean("appUserService");
	        	    CasUser appUser = userService.selectByUsername(userName);
	        		//appUser.setUserName(userName);
	        		if (appUser != null) {
	                     session.setAttribute(SEESION_MEMBER, appUser.getUsername());
	                     session.setAttribute(SESSION_MEMBER_ID, assertion.getPrincipal().getAttributes().get(SESSION_MEMBER_ID));
	                     session.setAttribute(SESSION_MEMBER_STATE, 1);
	                     ((HttpServletRequest) request).getSession().setAttribute("appUser", appUser);
	                 }
	
	        }
	        chain.doFilter(request, response);
		
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {

	}    
	
}