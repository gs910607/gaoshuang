package com.jzsx.xlgc.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.jasig.cas.client.authentication.DefaultGatewayResolverImpl;
import org.jasig.cas.client.authentication.GatewayResolver;
import org.jasig.cas.client.util.AbstractCasFilter;
import org.jasig.cas.client.util.CommonUtils;
import org.jasig.cas.client.validation.Assertion;

public class AuthenticationFilter extends AbstractCasFilter {
    private String casServerLoginUrl;
    private boolean renew = false;
    private boolean gateway = false;
    //过滤页面
    private String[] excludedPageArray={"/admin/login.do","/videoTraining/videotrainAppjoin.do",
    		"/area/arealistByChildrens.do","/videoTraining/videotrainConferAppjoin.do",
    		"/information/appListInformation.do","/upload/video/","/videoTraining/videotrainCameraAppjoin.do",
    		"/upload/images/"}; 
    private GatewayResolver gatewayStorage = new DefaultGatewayResolverImpl();

    public AuthenticationFilter() {
    }

    protected void initInternal(FilterConfig filterConfig) throws ServletException {
        if(!this.isIgnoreInitConfiguration()) {
            super.initInternal(filterConfig);
            this.setCasServerLoginUrl(this.getPropertyFromInitParams(filterConfig, "casServerLoginUrl", (String)null));
            this.log.trace("Loaded CasServerLoginUrl parameter: " + this.casServerLoginUrl);
            this.setRenew(this.parseBoolean(this.getPropertyFromInitParams(filterConfig, "renew", "false")));
            this.log.trace("Loaded renew parameter: " + this.renew);
            this.setGateway(this.parseBoolean(this.getPropertyFromInitParams(filterConfig, "gateway", "false")));
            this.log.trace("Loaded gateway parameter: " + this.gateway);
            String gatewayStorageClass = this.getPropertyFromInitParams(filterConfig, "gatewayStorageClass", (String)null);
            if(gatewayStorageClass != null) {
                try {
                    this.gatewayStorage = (GatewayResolver)Class.forName(gatewayStorageClass).newInstance();
                } catch (Exception var4) {
                    this.log.error(var4, var4);
                    throw new ServletException(var4);
                }
            }
        }

    }

    public void init() {
        super.init();
        CommonUtils.assertNotNull(this.casServerLoginUrl, "casServerLoginUrl cannot be null.");
    }

    public final void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    	HttpServletRequest request = (HttpServletRequest)servletRequest;
        HttpServletResponse response = (HttpServletResponse)servletResponse;
    	/*过滤URL开始*/
		boolean isExcludedPage = false;    
		for (String page : excludedPageArray) {//判断是否在过滤url之外    
			if(((HttpServletRequest) servletRequest).getServletPath().equals(page)){    
				isExcludedPage = true;    
				break;    
			}   
			if(((HttpServletRequest) servletRequest).getServletPath().contains(page)){
				isExcludedPage = true;    
				break; 
			}
		}
		if (isExcludedPage) {//在过滤url之外    
			filterChain.doFilter(request, response); 
			return;
		} else {//不在过滤url之外，判断session是否存在    
	    	
	        HttpSession session = request.getSession(false);
	        Assertion assertion = session != null?(Assertion)session.getAttribute("_const_cas_assertion_"):null;
	        if(assertion != null) {
	            filterChain.doFilter(request, response);
	        } else {
	            String serviceUrl = this.constructServiceUrl(request, response);
	            String ticket = CommonUtils.safeGetParameter(request, this.getArtifactParameterName());
	            boolean wasGatewayed = this.gatewayStorage.hasGatewayedAlready(request, serviceUrl);
	            if(!CommonUtils.isNotBlank(ticket) && !wasGatewayed) {
	                this.log.debug("no ticket and no assertion found");
	                String modifiedServiceUrl;
	                if(this.gateway) {
	                    this.log.debug("setting gateway attribute in session");
	                    modifiedServiceUrl = this.gatewayStorage.storeGatewayInformation(request, serviceUrl);
	                } else {
	                    modifiedServiceUrl = serviceUrl;
	                }
	
	                if(this.log.isDebugEnabled()) {
	                    this.log.debug("Constructed service url: " + modifiedServiceUrl);
	                }
	
	                String urlToRedirectTo = CommonUtils.constructRedirectUrl(this.casServerLoginUrl, this.getServiceParameterName(), modifiedServiceUrl, this.renew, this.gateway);
	                if(this.log.isDebugEnabled()) {
	                    this.log.debug("redirecting to \"" + urlToRedirectTo + "\"");
	                }
	
	                response.sendRedirect(urlToRedirectTo);
	            } else {
	                filterChain.doFilter(request, response);
	            }
	        }
		}
    }

    public final void setRenew(boolean renew) {
        this.renew = renew;
    }

    public final void setGateway(boolean gateway) {
        this.gateway = gateway;
    }

    public final void setCasServerLoginUrl(String casServerLoginUrl) {
        this.casServerLoginUrl = casServerLoginUrl;
    }

    public final void setGatewayStorage(GatewayResolver gatewayStorage) {
        this.gatewayStorage = gatewayStorage;
    }
}
