package com.jzsx.xlgc.resSmutils.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.Cipher;
import javax.servlet.http.HttpServletRequest;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.Duration;

import org.apache.commons.lang.math.RandomUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.huawei.esdk.platform.professional.local.impl.utils.PropertiesUtils;
import com.huawei.esdk.tp.professional.local.ServiceFactoryEx;
import com.huawei.esdk.tp.professional.local.authentication.AuthorizeServiceEx;
import com.huawei.esdk.tp.professional.local.bean.AdhocConfTemplateParamEx;
import com.huawei.esdk.tp.professional.local.bean.ConferenceInfoEx;
import com.huawei.esdk.tp.professional.local.bean.ConferenceNoticeEx;
import com.huawei.esdk.tp.professional.local.bean.MCUInfoEx;
import com.huawei.esdk.tp.professional.local.bean.PageParamEx;
import com.huawei.esdk.tp.professional.local.bean.QueryConfigEx;
import com.huawei.esdk.tp.professional.local.bean.RecordParamEx;
import com.huawei.esdk.tp.professional.local.bean.SiteInfoEx;
import com.huawei.esdk.tp.professional.local.bean.TPSDKResponseEx;
import com.huawei.esdk.tp.professional.local.bean.TPSDKResponseWithPageEx;
import com.huawei.esdk.tp.professional.local.conference.ConferenceServiceEx;
import com.huawei.esdk.tp.professional.local.mcu.MCUServiceEx;
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.DataByCode;
import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.resSmutils.Result;
import com.jzsx.xlgc.resSmutils.service.ConferenceService;
import com.jzsx.xlgc.resSmutils.service.resService;
import com.jzsx.xlgc.utils.Application;
import com.jzsx.xlgc.utils.ConferenceTemplate;
import com.jzsx.xlgc.utils.IDUtils;
import com.jzsx.xlgc.utils.ResultMessage;
import com.jzsx.xlgc.utils.SessionUtil;
import com.mysql.jdbc.util.ServerController;
import com.zte.ccs.os.meeting.util.RandomUtil;

import HTTPClient.ParseException;

@Controller
@RequestMapping("/conference")
public class ConferenceController {

	
	//smc 登陆退出操作的类
		static AuthorizeServiceEx authorizeService = ServiceFactoryEx.getService(AuthorizeServiceEx.class);
		//res 登陆退出操作的类
		//AuthenticateService auth = ServiceFactory.getService(AuthenticateService.class);
		static Logger logger = Logger.getLogger(ConferenceController.class) ;
	
	@Autowired
	private ConferenceService service;
	
	@Autowired
	private resService res;
	
	@RequestMapping("/addConference")
	@ResponseBody
	public ResultMessage addConference(TVideoConference conference,@RequestParam("allId")String[] allId,@RequestParam("mcu")String[] mcu,HttpServletRequest request){
		CasUser session = SessionUtil.getSession(request);
		List<String> id=new ArrayList<String>();
		List<String> lmcu=new ArrayList<String>();
		StringBuilder sb=new StringBuilder();
		id.add(session.getAreas().getHphone());
		lmcu.add(session.getAreas().getMcu());
		for (String string : allId) {
			if(!string.equals(session.getAreas().getHphone())){
				id.add(string);
				sb.append(string).append(",");
			}
			
		}
		for (String string : mcu) {
			if(!string.equals(session.getAreas().getMcu())){
				lmcu.add(string);
			}
			
		}
		ConferenceInfoEx cfinfo=new ConferenceInfoEx();
		conference.setCreateName(session.getRealname());
		cfinfo.setName(conference.getName());
		cfinfo.setBeginTime(conference.getBeginTime());
		cfinfo.setAccessCode(conference.getAccessCode());
		cfinfo.setMediaEncryptType(0);
		cfinfo.setDuration(durationInt2dur(Integer.parseInt(conference.getDuration())*60));
		cfinfo.setMainMcuId(16);
		String addTemplate = ConferenceTemplate.addTemplate(id,lmcu,conference, session.getAreas().getHphone(),"HY",res);
		if("error".equals(addTemplate))
			return new ResultMessage("模板创建失败", Application.STATUS_ADD_FAIL);
		Result result2 = res.scheduleConfEx(cfinfo);
		/**
		 * 视频会议返回result2需要判断返回结果，如果创建会议失败则不保存数据，并返回原因到前台
		 * 
		 * 
		 * */
       if(result2.getResultCode()==0){
    	   int j = res.deletetemplate(addTemplate);
    	   conference.setConfId(result2.getConf().getConfId());
    	   conference.setStatus(0);
    	   conference.setType(1);
    	   conference.setUserId(session.getUsergroupid().toString());
    	   conference.setSites(sb.toString());
    	   int i = service.addConference(conference);
    	   if(i==1){
    		   return new ResultMessage(Application.MSG_ADD_SUCCESS, Application.STATUS_ADD_SUCCESS);
    	   }
    	   return new ResultMessage(Application.MSG_ADD_FAIL, Application.STATUS_ADD_FAIL);
       }
		
		return new ResultMessage("会议创建失败", Application.STATUS_ADD_FAIL);
		
	}
	
	
	
	
	@RequestMapping(value="/getPageList",produces="application/json;charset=utf-8")
	@ResponseBody
	public String  getPageList(@RequestParam(defaultValue="1")Integer pages,TVideoConference conference,HttpServletRequest request){
		CasUser user = SessionUtil.getSession(request);
		com.jzsx.xlgc.utils.Result<TVideoConference> result = service.getPageList(pages, conference,user.getUsergroupid().toString());
		return JSON.toJSONString(result);
	}
	
	
	@RequestMapping("/delConference")
	@ResponseBody
	public ResultMessage delConferenceByConfId(String id){
		if(Strings.isNullOrEmpty(id))
			return new ResultMessage(Application.MSG_ERROR, Application.STATUS_ERROR);
		int i = res.delScheduledConfEx(id);
		if(i==0){
			Map<String, Object> map=new HashMap<String, Object>();
			map.put("status", 1);
			map.put("confId", id);
			service.updateByStatus(map);
			return new ResultMessage("结束会议成功", "1");
		}
		return new ResultMessage("结束会议失败", "0");
			
	}
	
	@RequestMapping("/getData")
	@ResponseBody
	public Map<String, Object> getData(String category, String year) {
		if (Strings.isNullOrEmpty(category) || Strings.isNullOrEmpty(year)) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("error", "非法参数");
			return map;
		} else{
			List<DataAnalysis> analysis = new ArrayList<DataAnalysis>();
			if (Integer.parseInt(category) == 0) {
				analysis = service.dataAnalysis(year);
			} else {
				analysis = service.allDataAnalysis(year,category);
			}
			List<Object> areas = new ArrayList<Object>();
			List<Object> code = new ArrayList<Object>();
			List<Object> count = new ArrayList<Object>();
			Map<String, List<Object>> map2 = new HashMap<String, List<Object>>();
			Map<String, Object> map3 = new HashMap<String, Object>();
			for (DataAnalysis dataAnalysis : analysis) {
				count.add(dataAnalysis.getCount());
				areas.add(dataAnalysis.getName());
				code.add(dataAnalysis.getCode());
			}
			map2.put("area", areas);
			map2.put("count", count);
			map2.put("code", code);
			map3.put("status", 0);
			map3.put("data", map2);
			return map3;
			
		}
		
		
	}
	
	@RequestMapping("/getDataByCode")
	@ResponseBody
	public Map<String, Object> getDataByCode(String code, String year){
		List<DataByCode> list = service.selectByCode(year,code);
		List<DataByCode> format = format(list);
		List<Object> area = new ArrayList<Object>();
		List<Object> count = new ArrayList<Object>();
		Map<String, List<Object>> map2 = new HashMap<String, List<Object>>();
		Map<String, Object> map3 = new HashMap<String, Object>();
		for (DataByCode dataByCode : format) {
			area.add(dataByCode.getCurrent_month());
			count.add(dataByCode.getCount());
		}
		map2.put("area", area);
		map2.put("count", count);
		map3.put("status", 0);
		map3.put("data", map2);
		return map3;
	}
	
	public List<DataByCode> format(List<DataByCode> list) {
		for (DataByCode dataByCode : list) {
			switch (Integer.parseInt(dataByCode.getCurrent_month())) {
			case 1:
				dataByCode.setCurrent_month("一月");
				break;
			case 2:
				dataByCode.setCurrent_month("二月");
				break;
			case 3:
				dataByCode.setCurrent_month("三月");
				break;
			case 4:
				dataByCode.setCurrent_month("四月");
				break;
			case 5:
				dataByCode.setCurrent_month("五月");
				break;
			case 6:
				dataByCode.setCurrent_month("六月");
				break;
			case 7:
				dataByCode.setCurrent_month("七月");
				break;
			case 8:
				dataByCode.setCurrent_month("八月");
				break;
			case 9:
				dataByCode.setCurrent_month("九月");
				break;
			case 10:
				dataByCode.setCurrent_month("十月");
				break;
			case 11:
				dataByCode.setCurrent_month("十一月");
				break;
			case 12:
				dataByCode.setCurrent_month("十二月");
				break;

			default:
				break;
			}
		}
		return list;
	}
	
	private synchronized static Result scheduleConfEx(HttpServletRequest req ,List<SiteInfoEx> sites) {
		Integer loginResult = authorizeService.login(PropertiesUtils.getValue("userName"), PropertiesUtils.getValue("password"));
		Result rs = new Result();
		if(loginResult != 0) {
			rs.setResultCode(loginResult);
        	rs.setResuiltMsg("登陆失败！");
        	authorizeService.logout();
        	logger.info("登陆失败scheduleConfEx" +  loginResult);
            return rs;
		}
		
        ConferenceServiceEx conferenceService = ServiceFactoryEx.getService(ConferenceServiceEx.class);
		
        String confName =  req.getParameter("name");
        String beginTime = req.getParameter("beginTime");
        //会议时长  
        String duration = req.getParameter("duration");
        //会议号   模板预约必须有
        String accessCode = req.getParameter("accessCode");
        //会议主会场
        String mainSiteUri = req.getParameter("mainSiteUri");
        //会议密码
        String password = req.getParameter("password");
        //多画面资源数   被continuousPresenceMode取代
        //String cpResource = req.getParameter("cpResource");
        //会议通知信息的邮箱
        String email = req.getParameter("email");
        //会议通知信息的信息
        String content = req.getParameter("content");
        //主席密码
        String chairmanPassword = req.getParameter("chairmanPassword");
        //会议主MCU的ID   一对一必须要有
        String mainMcuId = req.getParameter("mainMcuId");
        //会议通知的电话
        String telephone = req.getParameter("telephone");
        ConferenceNoticeEx cfn = new ConferenceNoticeEx();
        //多画面方式
        String continuousPresenceMode = req.getParameter("continuousPresenceMode");
        
        //是否录播的参数
        boolean isRecond = Boolean.parseBoolean(req.getParameter("isRecond"));
        
        ConferenceInfoEx value = new ConferenceInfoEx();
        value.setName(confName);
        //设置自动加密 	（有条件就加密）
        value.setMediaEncryptType(0);
        
        if(isRecond) {
        	//设置是否录播  0 不支持录播    	1 支持录播
            value.setIsRecording(1);
            //录播参数
            RecordParamEx rp = new RecordParamEx();
            //true 自动启动录播  		false 不自动启动录播
            rp.setIsAutoRecord(true);
            //true 纯语音录制  		false 语音+视频
            rp.setIsVoiceRecord(false);
            value.setRecordParam(rp);
            //录播会议是否支持直播功能。0为不支持   1 h支持
            value.setIsLiveBroadcast(1);
        }
        //查询mcu
        QueryConfigEx queryConfig = new QueryConfigEx(); 
    	PageParamEx pp = new PageParamEx();
    	pp.setNumberPerPage(50);
    	pp.setCurrentPage(1);
    	queryConfig.setPageParam(pp);
    	MCUServiceEx mcuServiceEx = ServiceFactoryEx.getService(MCUServiceEx.class);
    	TPSDKResponseWithPageEx<List<MCUInfoEx>> result1  =mcuServiceEx.queryMCUInfoEx(queryConfig); 
        
        
        //开启数据会议 
        //value.setIsDataConference(1);
        try{
        	if(null != mainMcuId && !"".equals(mainMcuId)){
        		value.setMainMcuId(Integer.parseInt(mainMcuId));
        	}
        	if(null != chairmanPassword && !"".equals(chairmanPassword)) {
        		value.setChairmanPassword(chairmanPassword);
        	}
        	if( null != password && !"".equals(password) && password.length() < 7) {
        		value.setPassword(password);
        	}else {
        		//设置默认密码
        		password = "123456" ;
        		value.setPassword(password);
        	}
        	if(null != telephone && !"".equals(telephone) && null != content && !"".equals(content)) {
        		cfn.setContent(content);
        		cfn.setTelephone(telephone);
        	}
        	if(null != email && !"".equals(email) && null != content && !"".equals(content)){
        		cfn.setContent(content);
        		cfn.setEmail(email);
        	}
        	value.setConferenceNotice(cfn);
        	if(null != beginTime && !"".equals(beginTime)){
        		value.setBeginTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(beginTime));
            }
            if(null != duration && !"".equals(duration)){
                value.setDuration(durationInt2dur(Integer.parseInt(duration)));
            }
            if(null != accessCode && !"".equals(accessCode)){
                value.setAccessCode(accessCode);
            }
            if(null != continuousPresenceMode && !"".equals(continuousPresenceMode)){
                value.setContinuousPresenceMode(Integer.parseInt(continuousPresenceMode));
            }
            if(!sites.isEmpty()){
            	List<SiteInfoEx> sitesInfoEx = new ArrayList<SiteInfoEx>();
            	for(SiteInfoEx sitesinfo : sites) {
            		SiteInfoEx sf = new SiteInfoEx();
            		if(null != sitesinfo.getName() && "".equals(sitesinfo.getName())) {
            			sf.setName(sitesinfo.getName());
            		}
            		if(null != sitesinfo.getUri() && "".equals(sitesinfo.getUri())) {
            			sf.setUri(sitesinfo.getUri());
            		}
            		//会长类型  0 1 4 7 8 9 10 11
            		if(null != sitesinfo.getType() && "".equals(sitesinfo.getType())) {
            			sf.setType(sitesinfo.getType());
            		}else {
            			sf.setType(1);
            		}
            		//会场来源  0 1 2 3 
            		if(null != sitesinfo.getFrom() && "".equals(sitesinfo.getFrom())) {
            			sf.setFrom(sitesinfo.getFrom());
            		}
            		//呼叫方式 0 会场被呼 1会场自己呼入
            		if(null != sitesinfo.getDialingMode() && "".equals(sitesinfo.getDialingMode())) {
            			sf.setDialingMode(sitesinfo.getDialingMode());
            		}
            		//是否锁定视屏源
            		if(null != sitesinfo.getIsLockVideoSource() && "".equals(sitesinfo.getIsLockVideoSource())) {
            			sf.setIsLockVideoSource(sitesinfo.getIsLockVideoSource());
            		}
            		sitesInfoEx.add(sf);
            	}
            	value.setSites(sitesInfoEx);
            	if(null != mainSiteUri && "".equals(mainSiteUri)) {
            		value.setMainSiteUri(mainSiteUri);
            	}
            	
            }
        }
        catch(Exception e){
        	e.printStackTrace();
        	authorizeService.logout();
        	rs.setResuiltMsg("参数格式不对");
        	logger.info("参数格式不对" + sites);
            return rs;
        }
       
        try{
            TPSDKResponseEx<ConferenceInfoEx> result = conferenceService.scheduleConfEx(value);
            rs.setResultCode(result.getResultCode());
            if (result.getResultCode() == 0){
            	rs.setResuiltMsg("成功！");
            	if(null != password && !"".equals(password)) {
            		result.getResult().setPassword(password);
            	}
            	if(null != chairmanPassword && !"".equals(chairmanPassword)) {
            		result.getResult().setChairmanPassword(chairmanPassword);
            	}
            	rs.setConf(result.getResult());
            }
            else{
                rs.setResuiltMsg(result.getResult().toString());
            }
            authorizeService.logout();
            return rs ;
        }
        catch (Exception e){
        	logger.info("预约会议异常" + e.getMessage());
            e.printStackTrace();
            authorizeService.logout();
            rs.setResultCode(123);
            rs.setResuiltMsg(e.getMessage());
            return rs;
        }
        
	}
	
	
	/**
     * 输入以分钟为单位的数据，返回duration类型数据
     * * @param dur
    /** * @return
     */
    public static Duration durationInt2dur(Integer dur)
    {
        Duration duration = null;
        try
        {
            if (0 <= dur)
            {
                duration = DatatypeFactory.newInstance().newDuration("PT" + Math.abs(dur) + "M");
            }
            else
            {
                duration = DatatypeFactory.newInstance().newDuration("-PT" + Math.abs(dur) + "M");
            }
        }
        catch (DatatypeConfigurationException e)
        {
            e.printStackTrace();
            
        }
        return duration;
    }
}
