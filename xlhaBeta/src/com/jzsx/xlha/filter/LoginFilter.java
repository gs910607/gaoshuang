package com.jzsx.xlha.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jzsx.xlha.bean.CasUser;

/**
 * Servlet Filter implementation class LoginFiter
 */
public class LoginFilter implements Filter {

	private String passUrl = "";

	private String[] includeUrl = { "WebRoot-PC/pages/onlineEvaluating", "WebRoot-PC/pages/opinionSurvey" };

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
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
		String[] split = passUrl.split(",");
		for (String string : split) {
			if ("".equals(string)) {
				continue;
			}
			if (httpServletRequest.getRequestURL().indexOf(string) > 0) {
				chain.doFilter(httpServletRequest, httpServletResponse);
				return;
			}
		}
		CasUser user = (CasUser) httpServletRequest.getSession().getAttribute("user");
		if (user == null) {
//			for (String string : includeUrl) {
//				if (httpServletRequest.getRequestURL().indexOf(string) > 0) {
//					httpServletResponse.sendRedirect("/xlhaBeta/WebRoot-PC/pages/administrator/register.html");
//					return;
//				}
//			}
			httpServletResponse.sendRedirect("/xlhaBeta/WebRoot-PC/pages/administrator/register.html");
		} else {
			chain.doFilter(httpServletRequest, httpServletResponse);
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
		passUrl = fConfig.getInitParameter("passUrl");
	}

}
