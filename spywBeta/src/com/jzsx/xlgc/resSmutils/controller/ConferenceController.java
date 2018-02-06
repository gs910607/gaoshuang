package com.jzsx.xlgc.resSmutils.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.Duration;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Strings;
import com.huawei.esdk.tp.professional.local.bean.ConferenceInfoEx;
import com.huawei.esdk.tp.professional.local.bean.SiteInfoEx;
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.bean.DataAnalysis;
import com.jzsx.xlgc.bean.DataByCode;
import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.resSmutils.Result;
import com.jzsx.xlgc.resSmutils.service.ConferenceService;
import com.jzsx.xlgc.resSmutils.service.resService;
import com.jzsx.xlgc.utils.Application;
import com.jzsx.xlgc.utils.ConferenceTemplate;
import com.jzsx.xlgc.utils.ResultMessage;
import com.jzsx.xlgc.utils.SessionUtil;
import com.zte.ccs.os.meeting.util.RandomUtil;

@Controller
@RequestMapping("/conference")
public class ConferenceController {

	
	private static Logger log = Logger.getLogger(ConferenceController.class) ;
	
	@Autowired
	private ConferenceService service;
	
	@Autowired
	private resService res;
	
	
	/**
	 * 添加视频会议
	 * @param conference 视频会议主体信息pojo类
	 * @param allId 预约会议所需的设备hphone
	 * @param mcu 预约会议所需的设备mcu
	 * @param request
	 * @return
	 */
	@RequestMapping("/addConference")
	@ResponseBody
	public ResultMessage addConference(TVideoConference conference,@RequestParam("allId")String[] allId,@RequestParam("mcu")String[] mcu,HttpServletRequest request){
		log.info("创建会议关键信息:"+conference);
		int y=0;
		CasUser session = SessionUtil.getSession(request);
		List<String> id=new ArrayList<String>();
		List<String> lmcu=new ArrayList<String>();
		StringBuilder sb=new StringBuilder();
		//开启会议的id列表要包含当前账户的id,因此从session获取之后添加进去，lmcu即mcu的列表，也需要获取当前账户的mcu信息
		id.add(session.getAreas().getHphone());
		lmcu.add(session.getAreas().getMcu());
		for (String string : allId) {
			//前端传递的id列表，考虑到前端选择开启会议的地区 可能包括用户当前所在区域，因此，需要排除
			if(!string.equals(session.getAreas().getHphone())){
				id.add(string);
				sb.append(string).append(",");
			}
			
		}
		for (String string : mcu) {
				lmcu.add(string);
		}
		ConferenceInfoEx cfinfo=new ConferenceInfoEx();
		conference.setCreateName(session.getRealname());
		cfinfo.setName(conference.getName());
		cfinfo.setBeginTime(conference.getBeginTime());
		cfinfo.setAccessCode(conference.getAccessCode());
		cfinfo.setMediaEncryptType(0);
		//duration为7表示一直持续,而一直持续duration要设置null
		if(!"7".equals(conference.getDuration())) {
			cfinfo.setDuration(durationInt2dur(Integer.parseInt(conference.getDuration())*60));
		}
		cfinfo.setMainMcuId(Integer.parseInt(session.getAreas().getMcu()));
		String addTemplate = ConferenceTemplate.addTemplate(id,lmcu,conference, session.getAreas().getHphone(),"HY"+RandomUtil.RanInt(8),res);
		if("error".equals(addTemplate))
			return new ResultMessage("模板创建失败", Application.STATUS_ADD_FAIL);
		List<SiteInfoEx> sites = new ArrayList<SiteInfoEx>();
		for (String url : id) {
			//新建一个SiteInfoEx对象 
		      SiteInfoEx siteInfo1 = new SiteInfoEx();
		      //会场URI为01010086 
		      siteInfo1.setUri(url);
		      //会场速率为1920k 
		      siteInfo1.setRate("1920K");
		      //会场名称为site1 
		      siteInfo1.setName("会场"+RandomUtil.RanInt(6));
		      //呼叫方式为MCU主动呼叫会场 
		      siteInfo1.setDialingMode(0);
		      //会场来源为内部会场 
		      siteInfo1.setFrom(0);
		      //会场类型为H.323会场类型 
		      siteInfo1.setType(4);
		      //会场视频格式为Auto 
		      siteInfo1.setVideoFormat(0);
		      //会场视频协议为H.261 
		      siteInfo1.setVideoProtocol(0);
		      siteInfo1.setVideoFormat(0);
		      siteInfo1.setMcuId(Integer.parseInt(lmcu.get(y)));
		      sites.add(siteInfo1);
		      y++;
		}
		cfinfo.setSites(sites);
		Result result2 = res.scheduleConfEx(cfinfo,session.getAreas().getHphone());
		/**
		 * 视频会议返回result2需要判断返回结果，result2.getResultCode()为0则创建成功，如果创建会议失败则不保存数据，并返回原因到前台
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
		log.error("会议创建失败，返回值为----"+result2.getResultCode());
		return new ResultMessage("会议创建失败", Application.STATUS_ADD_FAIL);
		
	}
	
	
	
	/**
	 * 
	 * @param pages 当前页数
	 * @param conference 会议搜索条件pojo类
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getPageList",produces="application/json;charset=utf-8")
	@ResponseBody
	public String  getPageList(@RequestParam(defaultValue="1")Integer pages,TVideoConference conference,HttpServletRequest request){
		CasUser user = SessionUtil.getSession(request);
		com.jzsx.xlgc.utils.Result<TVideoConference> result = service.getPageList(pages, conference,user.getUsergroupid().toString());
		return JSON.toJSONString(result);
	}
	
	
	/**
	 * 删除会议
	 * @param id  会议id
	 * @return
	 */
	@RequestMapping("/delConference")
	@ResponseBody
	public ResultMessage delConferenceByConfId(String id){
		if(Strings.isNullOrEmpty(id))
			return new ResultMessage(Application.MSG_ERROR, Application.STATUS_ERROR);
		int i = res.delScheduledConfEx(id);
		log.info("删除会议返回值-----"+i);
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
		log.info("获取会议图表数据入参----"+category+"----"+year);
		if (Strings.isNullOrEmpty(category) || Strings.isNullOrEmpty(year)) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("error", "非法参数");
			return map;
		} else{
			List<DataAnalysis> analysis = new ArrayList<DataAnalysis>();
			//category如果为0 则查询区县数据，为具体的code数值时，则表示查询该code所代表的区县下的所有地区
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
	
	
	/**
	 * 根据地区code获取该地区数据
	 * @param code 地区code
	 * @param year 年份
	 * @return
	 */
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
