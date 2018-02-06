package com.jzsx.xlgc.resSmutils.service;

import com.huawei.esdk.tp.professional.local.bean.AdhocConfTemplateParamEx;
import com.huawei.esdk.tp.professional.local.bean.ConferenceInfoEx;
import com.jzsx.xlgc.resSmutils.Result;

public interface resService {
	
	/*会议预约
	 * @param ConferenceInfoEx
	 * 		confId  		String  会议id 
	 * 		1.name 			String		会议名称   必传字段
	 * 		2.beginTime  		Date	会议开始时间
	 *		3.duration 		javax.xml.datatype.Duration	会议时长
	 *		4.accessCode		String	会议接入码		一对多必传参数
	 *		5.mediaEncryptType	Integer 	媒流体加密方式	0 自动判断加密 	1 强制加密	若会议无加密能力则无法加入会议  2 不加密 	必传字段
	 *		rate			String	速率
	 *		6.isRecording		Integer	是否支持录播 0不支持 1 支持
	 *		recorderAddr	String	直播地址  
	 *		7.isLiveBroadcast  String	录播会议是否支持直播功能。默认为不支持。0：不支持  1：支持
	 *		chairmanPassword		String 		主席密码或会议启动密码
	 *		status			Integer 会议状态。0：未知状态（保留）1：会议不存在2：已预约3：会议已经召开4：会议已经结束
	 *		8.mainSiteUri				String 	会议主会场（主席设备号）
	 *		conferenceNotice		ConferenceNoticeEx 		会议通知信息
	 *				ConferenceNoticeEx的属性	email	String	地址之间用逗号（,）分开
	 *											content		String	信息内容
	 *											telephone	String	电话
	 *		9.（可选）sites		List<SmcSiteInfoEx> 	会场信息列表
	 *		sites		List<SiteInfoEx> 	会场信息列表
	 *				SiteInfoEx属性
	 *											name		String 			会场名称
	 * 											uri			String			会场标识
	 *											type		Integer			会场类型  
	 *											from		Integer			会场来源 会场来源。0：内部会场1：外部会场2：融合网关会场 3：Lync会场  默认为内部会场  
	 *											dialingMode	Integer			呼叫方式。默认为1。0：MCU 呼叫会场1：会场主动呼入   
	 *											rate		String			速率
	 *											isLockVideoSource	Integer	是否锁定会场视频源。默认为不锁定。0：不锁定1：锁定  
	 *		maxSitesCount	Integer		会议最大与会方数。若会议中会场数超过最大与会方数，不能召集会议。添加会场时，会场列表数也不能超过最大与会方数。一个TP三屏会场占用一个会场  
	 *		10.recordParam		RecordParamEx		会议的录播参数
	 *					   	RecordParamEx属性	
	 *										rseId	Integer	录播ID
	 *										isAutoRecord	boolean	是否自动启动录播，默认为false。true：是false：否    
	 *										isVoiceRecord	boolean	是否纯语音录制，默认为false。true：是（纯语音）false：否（语音+视频）  
	 *		11.（待定）mainMcuId		Integer		会议主MCU的ID  一对一必传
	 *		continuousPresenceMode		Integer	多画面模式	  0-55 其中 4 与9 不支持  
	 * @return	ConferenceInfoEx
	 */
	public Result scheduleConfEx(ConferenceInfoEx cfinfo,String uri);
		
	
	/*获取mcu
	 * @param numberPerPage长度	currentPage页码
	 * @return	Result 主要获取mcu信息	
	 */
	public Result queryConfigEx(int numberPerPage, int currentPage );
	
	/*获取所有的会场
	 * @param 
	 * @return	Result 主要获取sitinfo信息
	 */
	public Result querySitesEx();
	
	
	/*获取会议模板(无assesscode获取不到)
	 * @param	currentPage 页码  	numberPerPage 页记录数    这两个是必传字段
	 * 			sort(暂时不能用) 由两个数字拼接而成 中间用空格分开  
	 * 					 第一个数字  0：升序 1：降序
	 * 					 第一个数字	 0：会场名称	1：会场URI	2：会场状态	3：会场类型	
	 * 							 4：会议模板名称	5：会议模板接入号（Ad hoc类型会议才有接入号）	6：MCU名称	7：RSE名称
	 * 			filter(暂时不能用)	每个条件间以;号分隔 	单个条件：第一个是数字 第二个是查询条件	以空格分开		如"1 'asd';2 'qwe'"
	 * 						第一个是数字,意思如下	第二个是查询的条件
	 * 							0：会场名称		1：会场URI	2：会场状态（暂不支持）	3：会场类型（暂不支持）	4：会议模板名称	
	 * 							5：会议模板接入号（Ad hoc类型会议才有接入号）	6：MCU名称	7：RSE名称
	 * @return  result  主要获取 tamplate
	 * 			属性		
	 * 				adhocConfTemplateId		String		会议模板id
	 * 				name			String				会议名称
	 * 				accessCode		String				接入码
	 * 				isLiveBroadcast		Integer		录播会议是否支持直播功能  0：不支持  1：支持
	 * 				isRecording			Integer		录播会议是否支持录播功能  0：不支持	1：支持
	 * 				chairmanPassword	String		主席密码
	 * 				mainSiteUri			String		主会场
	 * 				sites				List<SiteInfoEx>(属性同上)	会场属性
	 * 				recordParam			RecordParamEx(属性同上)		录播参数
	 */
	public Result queryTempelate(Integer numberPerPage,Integer currentPage,String sort,String filter);
	
	
	/*停止正在召开的回忆或删除预约的会议
	 * @param confId 会议id
	 * @result	 int	0 成功 	其他为错误码
	 */
	public int delScheduledConfEx(String confId);
	
	/*方法:添加模板(root下)
	 * @param
	 * 		name			String	会议名称		长度不能超过64												必传
	 * 		accessCode		String	会议接入号		长度不能超过9										必传
	 * 		duration		javax.xml.datatype.Duration		会议时长						必传
	 * 		cpResource		Integer		会议多画面资源数									必传
	 * 		mediaEncryptType	Integer		煤流体加密方式									必传
	 * 		isLiveBroadcast		Integer		是否支持直播功能  	0 不支持 		1支持			必传
	 * 		isRecording			Integer		是否支持录播功能  	0 不支持 		1支持			必传
	 * 		password			String		会议密码			长度不能超过6
	 * 		chairmanPassword	String		主席密码			长度不能超过6
	 * 		mainSiteUri			String		会议主会场
	 * 		notice				ConferenceNoticeEx		会议通知信息(同上)
	 * 		maxSitesCount		Integer					会议最大与会数
	 * 		sites				List<SiteInfoEx>		会场信息(同上)
	 * 		recordParam			RecordParamEx			录播参数(同上)
	 * @return	String		调用会议接口的结果码+空格+会议模板id	"0 123"	或	"12314123 "
	 */
	public String addtemplate(AdhocConfTemplateParamEx adhocConfTemplate);
	
	
	/*方法:删除模板
	 * @param	id	String	会议模板的id
	 * @return	int			删除成功与否	0   成功
	 */
	public int deletetemplate(String id);
}
