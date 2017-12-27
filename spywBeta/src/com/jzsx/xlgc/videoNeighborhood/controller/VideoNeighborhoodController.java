package com.jzsx.xlgc.videoNeighborhood.controller;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.huawei.esdk.tp.professional.local.bean.AdhocConfTemplateParamEx;
import com.huawei.esdk.tp.professional.local.bean.ConferenceInfoEx;
import com.huawei.esdk.tp.professional.local.bean.RecordParamEx;
import com.huawei.esdk.tp.professional.local.bean.SiteInfoEx;
import com.jzsx.xlgc.area.Service.AreaService;
import com.jzsx.xlgc.bean.Area;
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.bean.VideoNeighborhood;
import com.jzsx.xlgc.resSmutils.Result;
import com.jzsx.xlgc.resSmutils.controller.ConferenceController;
import com.jzsx.xlgc.resSmutils.service.ConferenceService;
import com.jzsx.xlgc.resSmutils.service.resService;
import com.jzsx.xlgc.utils.Application;
import com.jzsx.xlgc.utils.ExportExcel;
import com.jzsx.xlgc.utils.ReadExcel;
import com.jzsx.xlgc.utils.ResultMessage;
import com.jzsx.xlgc.utils.SessionUtil;
import com.jzsx.xlgc.videoNeighborhood.Service.VideoNeighborhoodService;
import com.jzsx.xlgc.videoNeighborhood.bean.NeighChart;
import com.zte.ccs.os.meeting.util.RandomUtil;

@Controller
@RequestMapping("/videoNeighborhood")
public class VideoNeighborhoodController {
	public static Logger logger=Logger.getLogger(VideoNeighborhoodController.class);
	@Autowired
	private VideoNeighborhoodService videoNeighborhoodService;
	@Autowired
	private AreaService areaService;
	@Autowired
	private  resService res;
	@Autowired
	private ConferenceService service;
	/**
	 * 打开视频接访首页
	 * @param request
	 * @return
	 */
	@RequestMapping("/join.do")
	public String join(HttpServletRequest request ){
		System.out.println("videoNeighborhood");
		//return "redirect:https://112.1.17.177/ScheduledConference/New.aspx";
		return "redirect:/pages/videoNeighborhood/viewNeighborhood.html";
	}
	/**
	 * 加载视频接访列表数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoNeighborhoodlistjoin.do")
	public Map<String,Object> videoNeighborhoodlistjoin(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		Map<String, Object> hashmap=new HashMap<String, Object>();
		VideoNeighborhood videoNeighborhood=new VideoNeighborhood();
		String videoneihdName=request.getParameter("videoneihdName");
		if(!"".equals(videoneihdName) && videoneihdName!=null){
			videoNeighborhood.setVideoneihdName(videoneihdName);
		}
		String videoneihdNum=request.getParameter("videoneihdNum");
		if(!"".equals(videoneihdNum) && videoneihdNum!=null){
			videoNeighborhood.setVideoneihdNum(videoneihdNum);
		}
		String startime=request.getParameter("videoneihdDate");
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		if(!"".equals(startime) && startime!=null){
			try {
				Date videoneihdDate = sdf.parse(startime);
				videoNeighborhood.setVideoneihdDate(videoneihdDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		String stoptime=request.getParameter("videoneihdRegistDate");
		if(!"".equals(stoptime) && stoptime!=null){
			try {
				Date videoneihdRegistDate = sdf.parse(stoptime);
				videoNeighborhood.setVideoneihdRegistDate(videoneihdRegistDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		String videoneihdLocationplace=request.getParameter("videoneihdLocationplace");
		System.out.println("videoneihdLocationplace:"+videoneihdLocationplace);
		if(!"".equals(videoneihdLocationplace) && videoneihdLocationplace!=null){
			videoNeighborhood.setVideoneihdLocationplace(videoneihdLocationplace);
		}
		String firstVisit=request.getParameter("firstVisit");
		if(!"".equals(firstVisit) && firstVisit!=null){
			if(firstVisit.equals("1")){
				CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
				if(appUser!=null){
					videoNeighborhood.setVideoneihdLocationplace(appUser.getUsergroupid().toString());
				}
			}
		}
		String pagesiz=request.getParameter("pagesize");
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		map=videoNeighborhoodService.queryVideoNeighborhoodByALl(videoNeighborhood, pagesize, 8);
		return map;
	}
	/**
	 * 根据视频接访ID查找数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoNeighborhoodDetail.do")
	public Map<String,Object> videoNeighborhoodDetail(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		String videoneihdId=request.getParameter("videoneihdId");
		if(!"".equals(videoneihdId) || !videoneihdId.equals(null)){
			 VideoNeighborhood videoNeighborhood = videoNeighborhoodService.queyVideoTrainById(videoneihdId);
			 
//			System.out.println("videoNeighborhood:"+videoNeighborhood);
			map.put("videoNeighborhood", videoNeighborhood);
			String confId=videoNeighborhood.getVideoneihdConfId();
			System.out.println("confid:"+confId);
			if(confId!=null && !"".equals(confId)){
				TVideoConference conference = service.queryById(confId);
				System.out.println("conferce:"+conference);
				map.put("conference", conference);
			}
			
		}
		System.out.println("videoneihdId:"+videoneihdId+"map:"+map);
		return map;
	}
	/**
	 * 上传excel文件
	 * @param filep 文件
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/videoNeighborhoodReadExcel.do",produces="text/html;charset=utf-8")
	public String videoNeighborhoodReadExcel(@RequestParam(value="file",required=false)MultipartFile filep,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		List<VideoNeighborhood> listvhd=new ArrayList<VideoNeighborhood>();
		int i=0;
		if(filep!=null){
			String url = null;
			try {
				url = uploadImage(filep, request);
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			ReadExcel read=new ReadExcel();
			File file=new File(url);
			try {
				List<List<Object>> list = read.readExcel(file);
				for(int j=1;j<list.size();j++){
					List<Object> lis = list.get(j);
					try {
						VideoNeighborhood neighborhood=new VideoNeighborhood();
//						neighborhood.setVideoneihdId(lis.get(0).toString());
						neighborhood.setVideoneihdName(lis.get(0).toString()) ;
						neighborhood.setVideoneihdCardType(lis.get(1).toString());
						neighborhood.setVideoneihdCard(lis.get(2).toString()) ;
						neighborhood.setVideoneihdtelephone(lis.get(3).toString());
						if(!lis.get(4).toString().equals("")){
							neighborhood.setVideoneihdphone(String.valueOf((int)Double.parseDouble(lis.get(4).toString()))) ;
						}else{
							neighborhood.setVideoneihdphone("") ;
						}
						neighborhood.setVideoneihdPostCode(lis.get(5).toString());
						String name=lis.get(6).toString();
						List<Area> listarea=new ArrayList<Area>();
						if(name!=null && !name.equals("")){
							listarea = areaService.queryByName(name);
						}else{
							continue;
						}
						String code="";
						System.out.println("listarea："+listarea);
						if(listarea!=null){
							if(listarea.size()>0){
								 code=listarea.get(0).getCode();
								 System.out.println("code:"+code);
							}
						}else{
							continue;
						}
						neighborhood.setVideoneihdLocationplace(code);
						neighborhood.setVideoneihdplace(lis.get(7).toString()) ;
						neighborhood.setVideoneihdNationality(lis.get(8).toString());
						neighborhood.setVideoneihdNum(lis.get(9).toString());
						neighborhood.setVideoneihdCompany(lis.get(10).toString());
						neighborhood.setVideoneihdObjective(lis.get(11).toString()) ;
						SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						Date da = null;
						try {
							if(!lis.get(12).toString().equals("")){
								da = sdf.parse(lis.get(12).toString());
							}else{
								da=new Date();
							}
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						neighborhood. setVideoneihdDate(da);
						neighborhood.setVideoneihdRegistDepartment(lis.get(13).toString()) ;
						if(!lis.get(14).toString().equals("")){
							neighborhood.setVideoneihdAgreeOpen(String.valueOf((int)Double.parseDouble(lis.get(14).toString())));
						}else{
							neighborhood.setVideoneihdAgreeOpen("");
						}
						
						neighborhood.setVideoneihdComplainant(lis.get(15).toString());
						Date dat = null;
						try {
							
							if(!lis.get(16).toString().equals("")){
								dat = sdf.parse(lis.get(16).toString());
							}else{
								da=new Date();
							}
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						neighborhood.setVideoneihdRegistDate(dat);
						if(!lis.get(17).toString().equals("")){
							neighborhood.setVideoneihdAnonymous(String.valueOf((int)Double.parseDouble(lis.get(17).toString())));
						}else{
							neighborhood.setVideoneihdAnonymous("");
						}
						neighborhood.setVideoneihdRespondent(lis.get(18).toString());
						neighborhood.setVideoneihdRegistrant(lis.get(19).toString());
						neighborhood.setVideoneihdReason(lis.get(20).toString()) ;
						if(!lis.get(21).toString().equals("")){
							neighborhood.setVideoneihdNumber((int)Double.parseDouble(lis.get(21).toString()));
						}else{
							neighborhood.setVideoneihdNumber(0);
						}
						if(!lis.get(22).toString().equals("")){
							neighborhood.setVideoneihdInvolveNumber(String.valueOf((int)Double.parseDouble(lis.get(22).toString())));
						}else{
							neighborhood.setVideoneihdInvolveNumber("");
						}
						neighborhood.setVideoneihdTitle(lis.get(23).toString());
						neighborhood.setVideoneihdRemark(lis.get(24).toString());
						neighborhood.setVideoneihdrealName(lis.get(25).toString()) ;
						neighborhood.setVideoneihdVideoWay(lis.get(26).toString());
						listvhd.add(neighborhood);
					} catch (NumberFormatException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				for(VideoNeighborhood vnh:listvhd){
					vnh.setVideoneihdId(RandomUtil.RanIntAndString(28));
					i = videoNeighborhoodService.insertActive(vnh);
				}
				if(i>0){
					map.put("status", 0);
					map.put("success", "success");
				}else{
					map.put("status", 1);
					map.put("success", "模板内容不得为空");
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				map.put("status", -1);
				map.put("success", "error");
				e.printStackTrace();
			}
		}
		return JSON.toJSONString(map);
	}
	public String uploadImage(MultipartFile file, HttpServletRequest request) throws Exception {
		String filename = file.getOriginalFilename();
		String name = UUID.randomUUID() + "." + filename.substring(filename.lastIndexOf(".") + 1);
		String path = request.getSession().getServletContext().getRealPath("/upload/excel");
		String url = request.getContextPath() + "/upload/excel/" + name;
		path = path + "\\" + name;
		File file2 = new File(path);
		if(!file2.exists()){
			file2.mkdirs();
		}
		file.transferTo(file2);
		return path;
	}
	/**
	 * 视频接访导出
	 * @param request
	 * @param response
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoNeighborhoodexport.do")
	public void videoNeighborhoodexport(HttpServletRequest request,HttpServletResponse response) {
		Map<String,Object> map  = new HashMap<String, Object>();
		ExportExcel<VideoNeighborhood> export=new ExportExcel<VideoNeighborhood>();
		
		VideoNeighborhood videoNeighborhood=new VideoNeighborhood();
		String videoneihdName=request.getParameter("videoneihdName");
		if(!"".equals(videoneihdName) && videoneihdName!=null){
			videoNeighborhood.setVideoneihdName(videoneihdName);
		}
		String videoneihdNum=request.getParameter("videoneihdNum");
		if(!"".equals(videoneihdNum) && videoneihdNum!=null){
			videoNeighborhood.setVideoneihdNum(videoneihdNum);
		}
		String startime=request.getParameter("videoneihdDate");
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		if(!"".equals(startime) && startime!=null){
			try {
				Date videoneihdDate = sdf.parse(startime);
				videoNeighborhood.setVideoneihdDate(videoneihdDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		String stoptime=request.getParameter("videoneihdRegistDate");
		if(!"".equals(stoptime) && stoptime!=null){
			try {
				Date videoneihdRegistDate = sdf.parse(stoptime);
				videoNeighborhood.setVideoneihdRegistDate(videoneihdRegistDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		String videoneihdLocationplace=request.getParameter("videoneihdLocationplace");
		if(!"".equals(videoneihdLocationplace) && videoneihdLocationplace!=null){
			videoNeighborhood.setVideoneihdLocationplace(videoneihdLocationplace);
		}
		String pagesiz=request.getParameter("pagesize");
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		map=videoNeighborhoodService.queryVideoNeighborhoodByALl(videoNeighborhood, pagesize, 8);
//		List<VideoNeighborhood> list = videoNeighborhoodService.queryVideoNeighborhoodList();
		List<VideoNeighborhood> vnhdlist = (List<VideoNeighborhood>) map.get("list");
		for(VideoNeighborhood vh:vnhdlist){
			if(vh.getVideoneihdLocationplace()!=null){
				vh.setVideoneihdLocationplace(vh.getAreainfo().getName());
			}
		}
		String string = JSON.toJSONString(vnhdlist);
		List<VideoNeighborhood> list2 = JSON.parseArray(string, VideoNeighborhood.class);
		String videoneihdTypeExport=request.getParameter("videoneihdTypeExport");
		String[] headers = null;String[] datastr=null;
		if(!"".equals(videoneihdTypeExport) && videoneihdTypeExport!=null){
			if(videoneihdTypeExport.equals("1")){
				headers=Application.VIDEO_NEIGHBORHOOD_HEADERS;
				datastr=Application.VIDEO_NEIGHBORHOOD_DATASTR;
			}else if(videoneihdTypeExport.equals("2")){
				System.out.println("进入2");
				list2=new ArrayList<VideoNeighborhood>();
				headers=Application.VIDEO_NEIGHBORHOOD_HEADERS_NO;
				datastr=Application.VIDEO_NEIGHBORHOOD_DATASTR_NO;
			}
		}
		export.exportExcelStr("2017-移动", headers, list2,datastr, "yyyy-MM-dd",response);
		System.out.println("哈哈！：导出结束");	 
//			System.out.println("videoNeighborhood:"+videoNeighborhood);
//		try {
//			PrintWriter pw = response.getWriter();
//			pw.print("");
//			pw.flush();
//			pw.close();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}return map;
	//	return "redirect:/pages/videoNeighborhood/viewNeighborhood.html";
	}
	/**
	 * 根据视频接访列表数据ID做简单的删除
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/deleteNeighborhood.do")
	public Map<String,Object> deletevideoTrain(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		String videoneihdId=request.getParameter("videoneihdId");
		if(!"".equals(videoneihdId) || !videoneihdId.equals(null)){
			try {
				videoNeighborhoodService.deleteById(videoneihdId);
				map.put("success", "删除成功");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				map.put("success", "删除失败");
				e.printStackTrace();
			}
		}
		return map;
	}
	/**
	 * 保存数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoNeighborhoodSave.do")
	public Map<String,Object> videoTrainSave(VideoNeighborhood videoNeighborhood,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		String videoneihdId="";
		try {
			if(!"".equals(videoNeighborhood.getVideoneihdId()) && videoNeighborhood.getVideoneihdId()!=null){
				System.out.println("进入videoNeighborhood修改");
				videoNeighborhoodService.updateActive(videoNeighborhood);
			}else{
				CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
				if(appUser!=null){
					videoNeighborhood.setVideoneihdrealName(appUser.getRealname());
				}
				videoNeighborhood.setVideoneihdVideoWay("视频");
				videoneihdId=RandomUtil.RanIntAndString(28);
				videoNeighborhood.setVideoneihdId(videoneihdId);
				videoNeighborhoodService.insertActive(videoNeighborhood);
			}
			map.put("videoneihdId", videoneihdId);
			map.put("status",0);
			map.put("success", "保存成功！");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status",-1);
			map.put("success", "保存失败！");
			e.printStackTrace();
		}
		System.out.println("videoId:"+videoNeighborhood.getVideoneihdId()+"map:"+map);
		return map;
	}
	@InitBinder
	protected void initBinder(WebDataBinder binder){
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	/**
	 * 创建视频会议
	 * @param conference
	 * @param request
	 * @return
	 */
	@RequestMapping("/addConference.do")
	@ResponseBody
	public ResultMessage addConference(TVideoConference conference,VideoNeighborhood videoNeighborhood,HttpServletRequest request){
		CasUser session = SessionUtil.getSession(request);
		String confstartTime=request.getParameter("confstartTime");
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(confstartTime!=null && confstartTime!=""){
			try {
				Date datetime=sdf.parse(confstartTime);
				conference.setBeginTime(datetime);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		conference.setName("JF"+RandomUtil.RanInt(8));
		conference.setCreateName(session.getRealname());
		conference.setAccessCode(RandomUtil.RanInt(6)+"");
		conference.setMainMcuId(16);
		CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
		String uri="";String sites="";
		if(appUser!=null){
			conference.setUserId(appUser.getUsergroupid().toString());
			conference.setCreateName(appUser.getRealname());
			Area area = areaService.queryByCode(appUser.getUsergroupid().toString());
			if(area!=null){
				uri=area.getHphone();
				sites+=area.getHphone()+",";
			}
		}
		List<String> arealist=new ArrayList<String>();
		Area area1=areaService.queryByCode(videoNeighborhood.getVideoneihdLocationplace());
		Area area2=areaService.queryByCode(videoNeighborhood.getVideoneihdVisitorPlace());
		if(!uri.equals(area1.getHphone()))
		arealist.add(area1.getHphone());
		if(!uri.equals(area2.getHphone()))
		arealist.add(area2.getHphone());
		sites+=area1.getHphone()+","+area2.getHphone()+",";
		conference.setSites(sites);
		String resvalue=videoAddtemplate(conference,uri,arealist,res);
		String templateId=resvalue.substring(resvalue.indexOf(" ")+1);
		System.out.println("templateId:"+templateId);
		System.out.println("resvalue:"+resvalue);
		if(!resvalue.startsWith("0")){
			return new ResultMessage("模板创建失败", Application.STATUS_ADD_FAIL);
		}
		Result result2=videoSchedule(conference,res);
		int count=videoDeleteTemplate(templateId,res);
		System.out.println("删除模板："+count);
		/**
		 * 视频会议返回result2需要判断返回结果，如果创建会议失败则不保存数据，并返回原因到前台
		 * 
		 * 
		 * */
       if(result2.getResultCode()==0){
    	   conference.setConfId(result2.getConf().getConfId());
    	   conference.setRecorderAddr(result2.getConf().getRecorderAddr());
    	   
    	   conference.setStatus(0);
    	   int i = service.addConference(conference);
    	   if(i==1){
    		   videoNeighborhood.setVideoneihdConfId(conference.getConfId());
    		   videoNeighborhoodService.updateActiveByIdOfConfId(videoNeighborhood);
    		   return new ResultMessage("视频会议创建成功", Application.STATUS_ADD_SUCCESS);
    	   }
    	   return new ResultMessage(Application.MSG_ADD_FAIL, Application.STATUS_ADD_FAIL);
       }
       	videoNeighborhoodService.deleteById(videoNeighborhood.getVideoneihdId());
		return new ResultMessage("会议创建失败", Application.STATUS_ADD_FAIL);
		
	}
	/**
	 * 创建模板
	 */
	public static  String videoAddtemplate(TVideoConference conference,String uri,List<String> arealist,resService res){
		AdhocConfTemplateParamEx paramEx=new AdhocConfTemplateParamEx();
		paramEx.setName(conference.getName());//name 会议名称
		paramEx.setAccessCode(conference.getAccessCode());//accesscode 会议接入号
		paramEx.setDuration(ConferenceController.durationInt2dur(Integer.parseInt(conference.getDuration())*60));//javax.xml.datatype.Duration		会议时长	
		paramEx.setCpResource(0);//cpResource Integer		会议多画面资源数	
		paramEx.setMediaEncryptType(0);//mediaEncryptType	Integer		煤流体加密方式	
		paramEx.setIsLiveBroadcast(conference.getIsRecording());//isLiveBroadcast		Integer		是否支持直播功能  	0 不支持 		1支持
		paramEx.setIsRecording(conference.getIsRecording());//isRecording			Integer		是否支持录播功能  	0 不支持 		1支持
		paramEx.setMainSiteUri(uri);//会议主会场
		List<SiteInfoEx> sitelist = new ArrayList<SiteInfoEx>();
		SiteInfoEx site=new SiteInfoEx();
		site.setUri(uri);//会场标识
		site.setName(uri);//会场名称
		site.setType(4);//会场类型  
		sitelist.add(site);
		if(arealist!=null){
			if(arealist.size()>0){
				for(String hphone :arealist){
					if(!uri.equals(hphone)){
						SiteInfoEx sitein=new SiteInfoEx();
						sitein.setUri(hphone);//会场标识
						sitein.setName(hphone);//会场名称
						sitein.setType(4);//会场类型  
						sitelist.add(sitein);
					}
				}
			}
		}
		paramEx.setSites(sitelist);
		if(conference.getIsRecording()==1){
			RecordParamEx recordEx=new RecordParamEx();//支持录播
			recordEx.setIsAutoRecord(true);//isAutoRecord	boolean	是否自动启动录播，默认为false。true：是false：否    
			recordEx.setIsVoiceRecord(false);//isVoiceRecord	boolean	是否纯语音录制，默认为false。true：是（纯语音）false：否（语音+视频）  
			recordEx.setRseId(4);
			paramEx.setRecordParam(recordEx);//支持录播
		}
		String value=res.addtemplate(paramEx);
		logger.debug("视频添加模板返回值："+value);
		//String		调用会议接口的结果码+空格+会议模板id	"0 123"	或	"12314123 "
		return value;
	}
	/**
	 * 预约会议
	 * @param conference
	 * @return
	 */
	public static  Result videoSchedule(TVideoConference conference,resService res){
		
		ConferenceInfoEx cfinfo=new ConferenceInfoEx();
		cfinfo.setName(conference.getName());
		cfinfo.setBeginTime(conference.getBeginTime());
		cfinfo.setAccessCode(conference.getAccessCode());
		cfinfo.setIsRecording(conference.getIsRecording());
		cfinfo.setMediaEncryptType(0);
		cfinfo.setDuration(ConferenceController.durationInt2dur(Integer.parseInt(conference.getDuration())*60));
		cfinfo.setMainMcuId(conference.getMainMcuId());
		if(conference.getIsRecording()==1){
			RecordParamEx recordEx=new RecordParamEx();//支持录播
			recordEx.setIsAutoRecord(true);//isAutoRecord	boolean	是否自动启动录播，默认为false。true：是false：否    
			recordEx.setIsVoiceRecord(false);//isVoiceRecord	boolean	是否纯语音录制，默认为false。true：是（纯语音）false：否（语音+视频）  
			recordEx.setRseId(4);
			cfinfo.setRecordParam(recordEx);//支持录播
		}
		cfinfo.setIsLiveBroadcast(conference.getIsRecording());
		Result result = res.scheduleConfEx(cfinfo);
		logger.debug("模板名称："+conference.getName());
		logger.debug("会议返回码："+result.getResultCode());
		return result;
	}
	public static int videoDeleteTemplate(String templateId,resService res){
		int count=res.deletetemplate(templateId);
		logger.debug("删除模板："+count);
		return count;
	}
	/**
	 * 根据地区统计视频接访数据
	 * @param neighChart 统计数据类
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/queryNeighCharts.do")
	public Map<String,Object> queryNeighCharts(NeighChart neighChart,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		List<Integer> listInt = new ArrayList<Integer>();
		List<Integer> listInterror = new ArrayList<Integer>();
		List<Integer> listIntun = new ArrayList<Integer>();
		List<String> listStr = new ArrayList<String>();
		List<String> listIntcd = new ArrayList<String>();
		try {
			List<NeighChart> list=new ArrayList<NeighChart>();
			List<Area> listarea=new ArrayList<Area>();
			if(neighChart.getCategory().equals("0")){
				 list = videoNeighborhoodService.queyneighChart(neighChart);
				 listarea = areaService.queryByParentId("0");
			}else{
				 list = videoNeighborhoodService.queyneighCharts(neighChart);
				 listarea = areaService.queryByParentId(neighChart.getCategory());
			}
			if(list!=null){
				if(list.size()>0){
					for(Area area:listarea){
						for(NeighChart n:list){
							if(n.getCode().equals(area.getCode())){
									listInt.add(n.getCount());
									listInterror.add(n.getCount1());
									listIntun.add(n.getCount2());
								listStr.add(area.getName());
								listIntcd.add(n.getCode());
								continue;
							}
						}
					}
				}
			}else{
				for(Area area:listarea){
					listInt.add(0);
					listInterror.add(0);
					listIntun.add(0);
					listStr.add(area.getName());
					listIntcd.add(area.getCode());
				}
			}
			map.put("status", 0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			e.printStackTrace();
		}
//		NeighChart neigh=new NeighChart();
//		neigh.setList(listInt);
//		neigh.setArea(listStr);
		Map<String,Object> hashmap  = new HashMap<String, Object>();
		hashmap.put("area", listStr);
		hashmap.put("success", listInt);
		hashmap.put("defeated", listInterror);
		hashmap.put("unknown", listIntun);
		hashmap.put("code", listIntcd);
		map.put("data", hashmap);
		return map;
	}
	/**
	 * 根据地区统计视频接访数据
	 * @param neighChart 统计数据类
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/queryNeighMonth.do")
	public Map<String,Object> queryNeighMonth(NeighChart neighChart,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		List<Integer> listInt = new ArrayList<Integer>();
		List<Integer> listInterror = new ArrayList<Integer>();
		List<Integer> listIntun = new ArrayList<Integer>();
		try {
			List<NeighChart> list=new ArrayList<NeighChart>();
			list = videoNeighborhoodService.queryneighmonth(neighChart);
			if(list!=null){
				if(list.size()>0){
						for(NeighChart n:list){
							listInt.add(n.getCount());
							listInterror.add(n.getCount1());
							listIntun.add(n.getCount2());
					}
				}
			}
			map.put("status", 0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			e.printStackTrace();
		}
		Map<String,Object> hashmap  = new HashMap<String, Object>();
		hashmap.put("success", listInt);
		hashmap.put("defeated", listInterror);
		hashmap.put("unknown", listIntun);
		map.put("data", hashmap);
		return map;
	}
	/**
	 * 修改状态
	 * @param videoNeighborhood
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/updateByIdOfstate.do")
	public Map<String,Object> updateByIdOfstate(VideoNeighborhood videoNeighborhood,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		System.out.println("videoNeighborhood.getVideoneihdId"+videoNeighborhood.getVideoneihdId());
		try {
			int count=videoNeighborhoodService.updateActiveByIdOfState(videoNeighborhood);
			System.out.println("count:"+count);
			map.put("status", 0);
			map.put("success", "状态修改成功!");
		} catch (Exception e) {
			map.put("status", -1);
			map.put("success", "状态修改失败!");
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;

	}
	
}

