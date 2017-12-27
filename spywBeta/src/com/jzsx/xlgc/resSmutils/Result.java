package com.jzsx.xlgc.resSmutils;

import java.util.List;

import com.huawei.esdk.tp.professional.local.bean.AdhocConfTemplateParamEx;
import com.huawei.esdk.tp.professional.local.bean.ConferenceInfoEx;
import com.huawei.esdk.tp.professional.local.bean.MCUInfoEx;
import com.huawei.esdk.tp.professional.local.bean.SiteInfoEx;

public class Result {
	
	private int resultCode ;
	private String resuiltMsg;
	

	//会议信息
	private ConferenceInfoEx conf ;
	//会场的信息
	private List<SiteInfoEx> sitinfo ;
	

	//MCU信息
	private List<MCUInfoEx> mcu;
	
	//
	private List<AdhocConfTemplateParamEx> template;
	
	public List<AdhocConfTemplateParamEx> getTemplate() {
		return template;
	}

	public void setTemplate(List<AdhocConfTemplateParamEx> template) {
		this.template = template;
	}

	public List<SiteInfoEx> getSitinfo() {
		return sitinfo;
	}

	public void setSitinfo(List<SiteInfoEx> sitinfo) {
		this.sitinfo = sitinfo;
	}

	public int getResultCode() {
		return resultCode;
	}
	
	public void setResultCode(int resultCode) {
		this.resultCode = resultCode;
	}
	
	public String getResuiltMsg() {
		return resuiltMsg;
	}
	
	public void setResuiltMsg(String resuiltMsg) {
		this.resuiltMsg = resuiltMsg;
	}

	public ConferenceInfoEx getConf() {
		return conf;
	}

	public void setConf(ConferenceInfoEx conf) {
		this.conf = conf;
	}
	
	public List<MCUInfoEx> getMcu() {
		return mcu;
	}

	public void setMcu(List<MCUInfoEx> mcu) {
		this.mcu = mcu;
	}
	
}
