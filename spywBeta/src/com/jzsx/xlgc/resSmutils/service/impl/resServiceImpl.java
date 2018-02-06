package com.jzsx.xlgc.resSmutils.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.huawei.esdk.tp.professional.local.ServiceFactoryEx;
import com.huawei.esdk.tp.professional.local.authentication.AuthorizeServiceEx;
import com.huawei.esdk.tp.professional.local.bean.AdhocConfTemplateParamEx;
import com.huawei.esdk.tp.professional.local.bean.ConferenceInfoEx;
import com.huawei.esdk.tp.professional.local.bean.FilterBaseEx;
import com.huawei.esdk.tp.professional.local.bean.MCUInfoEx;
import com.huawei.esdk.tp.professional.local.bean.PageParamEx;
import com.huawei.esdk.tp.professional.local.bean.QueryConfigEx;
import com.huawei.esdk.tp.professional.local.bean.SiteInfoEx;
import com.huawei.esdk.tp.professional.local.bean.SortItemEx;
import com.huawei.esdk.tp.professional.local.bean.StringFilterEx;
import com.huawei.esdk.tp.professional.local.bean.TPSDKResponseEx;
import com.huawei.esdk.tp.professional.local.bean.TPSDKResponseWithPageEx;
import com.huawei.esdk.tp.professional.local.conference.ConferenceServiceEx;
import com.huawei.esdk.tp.professional.local.mcu.MCUServiceEx;
import com.jzsx.xlgc.resSmutils.PropertiesUtils;
import com.jzsx.xlgc.resSmutils.Result;
import com.jzsx.xlgc.resSmutils.service.resService;
@Service
public class resServiceImpl implements resService{
	
	Logger logger = Logger.getLogger(resServiceImpl.class);
	
	@Override
	public Result scheduleConfEx(ConferenceInfoEx cfinfo,String uri) {
		AuthorizeServiceEx authorizeService = ServiceFactoryEx.getService(AuthorizeServiceEx.class);
		Integer loginResult = authorizeService.login(PropertiesUtils.getValue("userName"), PropertiesUtils.getValue("password"));
		Result rs = new Result();
		if(loginResult != 0 && loginResult != 570462213) {
			rs.setResultCode(loginResult);
        	rs.setResuiltMsg("登陆失败！");
            return rs;
		}
		int presenceMode = 11;
		if(cfinfo.getSites().size() <=9 && cfinfo.getSites().size() > 4) {
			presenceMode = 35 ;
		}else if(cfinfo.getSites().size() > 9) {
			presenceMode = 47 ;
		}
		cfinfo.setContinuousPresenceMode(presenceMode);
		cfinfo.setChairmanPassword("123456");
		logger.debug("scheduleConfEx:" + new Gson().toJson(cfinfo) + "uri:" + uri);
		ConferenceServiceEx conferenceService = ServiceFactoryEx.getService(ConferenceServiceEx.class);
		try{
            TPSDKResponseEx<ConferenceInfoEx> result = conferenceService.scheduleConfEx(cfinfo);
            logger.debug("scheduleConfEx result" + new Gson().toJson(result));
            rs.setResultCode(result.getResultCode());
          
            if (result.getResultCode() == 0){
            	rs.setResuiltMsg("成功！");
            	rs.setConf(result.getResult());
            	ConferenceServiceEx conferenceServiceEx = ServiceFactoryEx.getService(ConferenceServiceEx.class);
            	// 子画面会场标识顺序列表
            	List<String> subPics = new ArrayList<String>();
            	subPics.add(uri);
            	for(SiteInfoEx siteinfo : cfinfo.getSites()) {
            		subPics.add(siteinfo.getUri());
            	}
            	logger.debug("setContinuousPresenceEx param="+presenceMode + "    " + subPics);
            	Integer resultCode = conferenceServiceEx.setContinuousPresenceEx(result.getResult().getConfId(), "", presenceMode, subPics);
                logger.debug("setContinuousPresenceEx resultCode="+resultCode);
            }
            else{
                rs.setConf(result.getResult());
            }
            authorizeService.logout();
            return rs ;
        }
        catch (Exception e){
            e.printStackTrace();
            authorizeService.logout();
            rs.setResultCode(123);
            rs.setResuiltMsg(e.getMessage());
            return rs;
        }
	}

	@Override
	public Result queryConfigEx(int numberPerPage, int currentPage) {
		Result rs = new Result();
		AuthorizeServiceEx authorizeService = ServiceFactoryEx.getService(AuthorizeServiceEx.class);
        int loginResult = authorizeService.login(PropertiesUtils.getValue("userName"), PropertiesUtils.getValue("password"));
        //0表示登陆成功  
        if (0 != loginResult && loginResult != 570462213)
        {
        	rs.setResultCode(loginResult);
            return rs;
        }
    	QueryConfigEx queryConfig = new QueryConfigEx(); 
    	PageParamEx pp = new PageParamEx();
    	pp.setNumberPerPage(numberPerPage);
    	pp.setCurrentPage(currentPage);
    	queryConfig.setPageParam(pp);
    	MCUServiceEx mcuServiceEx = ServiceFactoryEx.getService(MCUServiceEx.class);
    	TPSDKResponseWithPageEx<List<MCUInfoEx>> result  =mcuServiceEx.queryMCUInfoEx(queryConfig); 
    	authorizeService.logout();
    	if(result.getResultCode() == 0) {
    		rs.setResultCode(loginResult);
    		rs.setMcu(result.getResult());
            return rs;
    	}
    	rs.setResultCode(loginResult);
        return rs;
	}

	@Override
	public Result querySitesEx() {
		AuthorizeServiceEx authorizeService = ServiceFactoryEx.getService(AuthorizeServiceEx.class);
        int loginResult = authorizeService.login(PropertiesUtils.getValue("userName"), PropertiesUtils.getValue("password"));
        //0表示登陆成功   570462213表示已经登陆了
        Result rs = new Result();
        if (0 != loginResult && loginResult != 570462213){
        	rs.setResultCode(loginResult);
        	rs.setResuiltMsg("登陆失败！");
            return rs;
        }
        ConferenceServiceEx conferenceServiceEx = ServiceFactoryEx.getService(ConferenceServiceEx.class);

        TPSDKResponseEx<List<SiteInfoEx>> result = conferenceServiceEx.querySitesEx(); 
        authorizeService.logout();
        if(result.getResultCode() == 0) {
        	rs.setResultCode(result.getResultCode());
        	List<SiteInfoEx> list = result.getResult(); 
        	rs.setSitinfo(list);
        	return rs;
        }
        rs.setResultCode(result.getResultCode());
        rs.setResuiltMsg(result.getResult().toString());
    	return rs;
	}

	@Override
	public Result queryTempelate(Integer numberPerPage, Integer currentPage,String sort,String filter) {
		AuthorizeServiceEx authorizeService = ServiceFactoryEx.getService(AuthorizeServiceEx.class);
        int loginResult = authorizeService.login(PropertiesUtils.getValue("userName"), PropertiesUtils.getValue("password"));
        //0表示登陆成功   570462213表示已经登陆了
        Result rs = new Result();
        if (0 != loginResult && loginResult != 570462213)
        {
        	rs.setResultCode(loginResult);
        	rs.setResuiltMsg("登陆失败！");
            return rs;
        }
        QueryConfigEx queryConfigEx = new QueryConfigEx();
        //排序方式
        if(sort != null && !"".equals(sort)) {
        	String[] araysort = sort.split(" ");
        	if(araysort.length > 0) {
        		List<SortItemEx> sortItemExs = new ArrayList<SortItemEx>();
                SortItemEx sortItemEx = new SortItemEx();
                sortItemEx.setSort(Integer.parseInt(araysort[0]));
                sortItemEx.setItemIndex(Integer.parseInt(araysort[1]));
                sortItemExs.add(sortItemEx);
                queryConfigEx.setSortItems(sortItemExs);
        	}
        }

        //分页数据
        PageParamEx pp =  new PageParamEx();
        pp.setCurrentPage(currentPage);
        pp.setNumberPerPage(numberPerPage);
        queryConfigEx.setPageParam(pp);
        
        //查询条件
        if(filter != null ) {
        	List<FilterBaseEx> filterlist = new ArrayList<FilterBaseEx>();
            String[] arayfilter = filter.split(";");
            for(String ft :arayfilter) {
            	String[] tiltparam = ft.split(" ");
            	StringFilterEx filterBaseEx = new StringFilterEx();
        		filterBaseEx.setColumnIndex(Integer.parseInt(tiltparam[0]));
        		filterBaseEx.setValue(tiltparam[1]);
        		filterlist.add(filterBaseEx);
            }
            queryConfigEx.setFilters(filterlist);
        }
        
        //获取会议相关服务实例
  		ConferenceServiceEx conferenceServiceEx = ServiceFactoryEx.getService(ConferenceServiceEx.class);
  		//调用会议服务的queryAdhocConfTemplateListEx方法查询所有的会议模板，返回TPSDKResponseWithPageEx<List<AdhocConfTemplateParamEx>>对象 
  		TPSDKResponseWithPageEx<List<AdhocConfTemplateParamEx>> result = conferenceServiceEx.queryAdhocConfTemplateListEx(queryConfigEx);
  		rs.setResultCode(result.getResultCode());
  		if(result.getResultCode() == 0) {
  			rs.setTemplate(result.getResult());
  		}
  		authorizeService.logout();
  		return rs;
	}

	@Override
	public int delScheduledConfEx(String confId) {
		AuthorizeServiceEx authorizeService = ServiceFactoryEx.getService(AuthorizeServiceEx.class);
        int loginResult = authorizeService.login(PropertiesUtils.getValue("userName"), PropertiesUtils.getValue("password"));
        //0表示登陆成功   570462213表示已经登陆了
        if (0 != loginResult && loginResult != 570462213){
            return loginResult;
        }
        
        ConferenceServiceEx conferenceServiceEx = ServiceFactoryEx.getService(ConferenceServiceEx.class);
		//如果返回值为0，则表示操作成功，否则表示操作失败，具体失败原因请参考错误码列表。
		Integer resultCode = conferenceServiceEx.delScheduledConfEx (confId, null);
		authorizeService.logout();
		return  resultCode;
	}

	@Override
	public String addtemplate(AdhocConfTemplateParamEx adhocConfTemplate) {
		AuthorizeServiceEx authorizeService = ServiceFactoryEx.getService(AuthorizeServiceEx.class);
        int loginResult = authorizeService.login(PropertiesUtils.getValue("userName"), PropertiesUtils.getValue("password"));
        //0表示登陆成功   570462213表示已经登陆了
        if (0 != loginResult && loginResult != 570462213){
            return loginResult+" ";
        }
        logger.debug("addAdhocConfTemplateEx:" + new Gson().toJson(adhocConfTemplate));
        //获取会议相关服务实例
        ConferenceServiceEx conferenceServiceEx = ServiceFactoryEx.getService(ConferenceServiceEx.class);
        //调用会议服务的addAdhocConfTemplateEx方法添加会议模板，返回TPSDKResponseEx<String>对象 
        TPSDKResponseEx<String> result = conferenceServiceEx.addAdhocConfTemplateEx("1", adhocConfTemplate);
    	authorizeService.logout();
    	return result.getResultCode()+" "+result.getResult();
	}

	@Override
	public int deletetemplate(String id) {
		AuthorizeServiceEx authorizeService = ServiceFactoryEx.getService(AuthorizeServiceEx.class);
        int loginResult = authorizeService.login(PropertiesUtils.getValue("userName"), PropertiesUtils.getValue("password"));
        //0表示登陆成功   570462213表示已经登陆了
        if (0 != loginResult && loginResult != 570462213){
            return loginResult;
        }
        ConferenceServiceEx conferenceServiceEx = ServiceFactoryEx.getService(ConferenceServiceEx.class);
        //调用会议服务的delAdhocConfTemplateEx方法删除Ad hoc会议模板，返回Integer对象
        Integer result = conferenceServiceEx.delAdhocConfTemplateEx(id);
        authorizeService.logout();
        return result;
	}


}
