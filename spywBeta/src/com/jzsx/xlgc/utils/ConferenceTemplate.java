package com.jzsx.xlgc.utils;

import java.util.ArrayList;
import java.util.List;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.Duration;

import org.apache.log4j.Logger;

import com.huawei.esdk.tp.professional.local.bean.AdhocConfTemplateParamEx;
import com.huawei.esdk.tp.professional.local.bean.RecordParamEx;
import com.huawei.esdk.tp.professional.local.bean.SiteInfoEx;
import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.resSmutils.service.resService;
import com.zte.ccs.os.meeting.util.RandomUtil;

public class ConferenceTemplate {
	
	private static Logger log=Logger.getLogger(ConferenceTemplate.class);
	
	public static String addTemplate(List<String> allID,List<String> mcu,TVideoConference conference,String mainUri,String type,resService res){
		log.info("最终创建模板入参：会议id="+allID+";muc="+mcu);
		int i=0;
		AdhocConfTemplateParamEx paramEx=new AdhocConfTemplateParamEx();
		paramEx.setName(type);
		paramEx.setAccessCode(conference.getAccessCode());
		//duration为7表示一直持续,而一直持续duration要设置null
		if( !"7".equals(conference.getDuration()) ) {
			paramEx.setDuration(durationInt2dur(Integer.parseInt(conference.getDuration())*60));
		}
		paramEx.setCpResource(0);
		paramEx.setMediaEncryptType(0);
		if(conference.getIsRecording()==1){
			RecordParamEx ex=new RecordParamEx();
			ex.setRseId(4);
			ex.setIsAutoRecord(true);
			ex.setIsVoiceRecord(false);
			paramEx.setIsRecording(conference.getIsRecording());
			paramEx.setIsLiveBroadcast(conference.getIsRecording());
			paramEx.setRecordParam(ex);
		}
//		paramEx.setMainSiteUri(mainUri);
		paramEx.setMainMcuId(Integer.parseInt(mcu.get(0)));
		List<SiteInfoEx> sites = new ArrayList<SiteInfoEx>();
		for (String url : allID) {
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
		      siteInfo1.setMcuId(Integer.parseInt(mcu.get(i)));
		      sites.add(siteInfo1);
		      i++;
		}
		paramEx.setSites(sites);
		String addtemplate = res.addtemplate(paramEx);
		if(addtemplate.startsWith("0")){
			log.error("模板创建成功，返回值为："+addtemplate);
			String[] split = addtemplate.split(" ");
			return split[1].toString();
		}
		
		log.error("模板创建失败，错误码为："+addtemplate);
		return "error";
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
