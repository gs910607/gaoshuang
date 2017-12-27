package com.jzsx.xlgc.videoTrain.controller;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jzsx.xlgc.area.Service.AreaService;
import com.jzsx.xlgc.bean.Area;
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.bean.VideoTrain;
import com.jzsx.xlgc.bean.VideoType;
import com.jzsx.xlgc.resSmutils.Result;
import com.jzsx.xlgc.resSmutils.service.ConferenceService;
import com.jzsx.xlgc.resSmutils.service.resService;
import com.jzsx.xlgc.utils.Application;
import com.jzsx.xlgc.utils.ResultMessage;
import com.jzsx.xlgc.utils.SessionUtil;
import com.jzsx.xlgc.videoNeighborhood.bean.NeighChart;
import com.jzsx.xlgc.videoNeighborhood.controller.VideoNeighborhoodController;
import com.jzsx.xlgc.videoTrain.Service.VideoTrainService;
import com.jzsx.xlgc.videoTrain.Service.VideoTypeService;
import com.zte.ccs.os.meeting.util.RandomUtil;

@Controller
@RequestMapping("/videoTraining")
public class VideoTrainController {
	@Autowired
	private VideoTrainService videoTrainService;
	@Autowired
	private AreaService areaService;
	@Autowired
	private VideoTypeService videoTypeService;
	@Autowired
	private resService res;
	@Autowired
	private ConferenceService service;
	/**
	 * 加载视频培训首页数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/train.do")
	public Map<String,Object> test(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		VideoTrain videoTrain=new VideoTrain();
		TVideoConference conference=new TVideoConference();
		CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
		String ucode="";
		if(appUser!=null){
			ucode=appUser.getUsergroupid().toString();
			conference.setUserId(appUser.getUsergroupid().toString());
			if(ucode.length()>=3){
				videoTrain.setVideoCode(ucode);
			}
			System.out.println("code:----"+appUser.getUsergroupid().toString());
//			videoNeighborhood.setVideoneihdLocationplace(appUser.getUserGroupId().toString());
		}
		List<VideoTrain> list = videoTrainService.queryVideoTrainByCode(videoTrain);
		List<VideoTrain> list1=new ArrayList<VideoTrain>();
		List<VideoTrain> list2=new ArrayList<VideoTrain>();
		List<VideoTrain> list3=new ArrayList<VideoTrain>();
		List<VideoTrain> list4=new ArrayList<VideoTrain>();
		List<VideoTrain> list5=new ArrayList<VideoTrain>();
		if(list!=null){
			if(list.size()>0){
				for(VideoTrain v:list){
//					if(v.getVideoTop()==1){
//						list1.add(v);
//						continue;
//					}
//					if(v.getVideoTypeId()==1){
//						list1.add(v);
//					}else
					if(v.getVideoTypeId()==2){
						if(list2.size()<3){
							list2.add(v);
						}
					}else if(v.getVideoTypeId()==3){
						if(list3.size()<7){
							list3.add(v);
						}
					}else if(v.getVideoTypeId()==4){
						if(list4.size()<5){
							list4.add(v);
						}
					}else if(v.getVideoTypeId()==5){
						if(list5.size()<6){
							list5.add(v);
						}
					}
				}
//				Collections.reverse(list2);
//				Collections.reverse(list3);
//				Collections.reverse(list4);
//				Collections.reverse(list5);
			}
		}
		list1=videoTrainService.queryVideoTrainByTypeId(1);
		map=service.queryVideoOrConferByisrecord(conference, 1, 7);
		map.put("map1", list1);
		map.put("map2", list2);
		map.put("map3", list3);
		map.put("map4", list4);
		map.put("map5", list5);
		return map;
	}
	/**
	 * 打开视频培训首页
	 * @param request
	 * @return
	 */
	@RequestMapping("/join.do")
	public String join(HttpServletRequest request ){
		
		return "redirect:/pages/videoTraining/videoTraining.html";
	}
	/**
	 * 打开视频培训类型列表页
	 * @param request
	 * @return
	 */
	@RequestMapping("/videolist.do")
	public String videolist(HttpServletRequest request ){
		return "redirect:/videoTraining/videoTrainingList.html";
	}
	/**
	 * 打开视频培训类型列表页
	 * @param request
	 * @return
	 */
	@RequestMapping("/videotrainjoin.do")
	public String videotrainjoin(HttpServletRequest request){
		String type=request.getParameter("type");
		request.setAttribute("type", type);
		System.out.println("type："+type);
		return "redirect:/pages/videoTraining/videoTrainingList.html?type="+type;
	}
	/**
	 * 加载视频培训列席列表数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videotrainlistjoin.do")
	public Map<String,Object> videotrainlistjoin(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		Map<String, Object> hashmap=new HashMap<String, Object>();
		String type=request.getParameter("type");
		System.out.println(type);
		VideoTrain videoTrain=new VideoTrain();
		int videotype=0;
		if(!"".equals(type) || !type.equals(null)){
			videotype=Integer.parseInt(type);
		}
		videoTrain.setVideoTypeId(videotype);
		String videoName=request.getParameter("videoName");
		if(!"".equals(videoName) || !videoName.equals(null)){
			videoTrain.setVideoName(videoName);
		}
		String videoTime=request.getParameter("videoTime");
		if(!"".equals(videoTime) && videoTime!=null){
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			Date time = null;
			try {
				time = sdf.parse(videoTime);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			videoTrain.setVideoTime(time);
		}
		String stopTime=request.getParameter("stopTime");
		if(!"".equals(stopTime) && stopTime!=null){
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			Date time = null;
			try {
				time = sdf.parse(stopTime);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			videoTrain.setStopTime(time);
		}
		String videoCode=request.getParameter("videoCode");
		if(!"".equals(videoCode) && videoCode!=null){
			if(videoCode.length()>=3){
				videoTrain.setVideoCode(videoCode);
			}
		}
		String firstVisit=request.getParameter("firstVisit");
		if(!"".equals(firstVisit) && firstVisit!=null){
			if(firstVisit.equals("1")){
				CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
				if(appUser!=null){
					firstVisit=appUser.getUsergroupid().toString();
					if(firstVisit.length()>=3){
						videoTrain.setVideoCode(firstVisit);
					}
				}
			}
		}
		String pagesiz=request.getParameter("pagesize");
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		map = videoTrainService.queryVideoTrainListBytype(videoTrain,pagesize,8);
		map.put("code", firstVisit);
//		System.out.println(list);
//		map.put("list", list);
		return map;
	}
	/**
	 * 加载视频培训列席列表数据app接口
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/videotrainAppjoin.do",method=RequestMethod.POST)
	public Map<String,Object> videotrainAppjoin(VideoTrain videoTrain,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		try {
			String pagesiz=request.getParameter("pagesize");
			int pagesize=0;
			if(!"".equals(pagesiz) && pagesiz!=null){
				pagesize=Integer.parseInt(pagesiz);
			}
			String pagenu=request.getParameter("pagenum");
			int pagenum=0;
			if(!"".equals(pagenu) && pagenu!=null){
				pagenum=Integer.parseInt(pagenu);
			}
			String code=videoTrain.getVideoCode();
			if(code!=null && code!=""){
				if(code.length()<3){
					videoTrain.setVideoCode(null);
				}
			}
			map = videoTrainService.queryVideoTrainListBytype(videoTrain,pagesize,pagenum);
			map.put("status", 1);
		} catch (NumberFormatException e) {
			map.put("status", -1);
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 根据code获取用户可以参加的会议 app接口
	 * @param code
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/videotrainConferAppjoin.do",method=RequestMethod.POST)
	public Map<String,Object> videotrainConferAppjoin(String code,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		try {
			if(code!=null && code!=""){
				List<TVideoConference> list = new ArrayList<TVideoConference>();
//				if(code.equals("1")){
//					code="0";
//					
//					code="1";
//				}else{
					list=videoTrainService.queryByCodeOfconfer(code);
//				}
				map.put("code", code);
				map.put("status", 1);
				map.put("list", list);
				map.put("msg", "成功！");
			}else{
				map.put("code", code);
				map.put("status", -1);
				map.put("msg", "传参方式不对！");
			}
		} catch (Exception e) {
			map.put("status", -2);
			map.put("msg", "操作异常");
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 根据地区code获取该地区设备信息app接口
	 * @param code
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/videotrainCameraAppjoin.do",method=RequestMethod.POST)
	public Map<String,Object> videotrainCameraAppjoin(String code,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		try {
			if(code!=null && code!=""){
				Map<String,Object> hasmap  = new HashMap<String, Object>();
				hasmap.put("object_id", "7");//相机
				hasmap.put("camera_id", "7");//标准规定id
				hasmap.put("camera_name", "测试相机");//相机名称
				hasmap.put("camera_type", 1);//相机类型
				hasmap.put("ip_addr", "192.168.1.1");//IP地址
				hasmap.put("place_code", "102");//安装地点行政区划代码
				hasmap.put("org_code", "102");//管辖单位代码
				hasmap.put("longitude", 1);//经度
				hasmap.put("latitude", 1);//纬度
				hasmap.put("plat_code", "102");//原有平台标识
				List<Map> list = new ArrayList<Map>();
//				if(code.equals("1")){
//					code="0";
//					
//					code="1";
//				}else{
					list.add(hasmap);
//				}
				map.put("code", code);
				map.put("status", 1);
				map.put("list", list);
				map.put("msg", "成功！");
			}else{
				map.put("code", code);
				map.put("status", -1);
				map.put("msg", "传参方式不对！");
			}
		} catch (Exception e) {
			map.put("status", -2);
			map.put("msg", "操作异常");
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
	@InitBinder
	protected void initBinder(WebDataBinder binder){
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	/**
	 * 根据视频培训类型列表数据ID做简单的删除
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/deletevideoTrain.do")
	public Map<String,Object> deletevideoTrain(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		String videoId=request.getParameter("videoId");
		if(!"".equals(videoId) || !videoId.equals(null)){
			try {
				videoTrainService.deleteVideoTrainById(videoId);
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
	 * 打开视频培训类型信息详情页面
	 * @param request
	 * @return
	 */
	@RequestMapping("/videotrainDetailjoin.do")
	public String videotrainDetailjoin(HttpServletRequest request){
		String videoId=request.getParameter("videoId");
		if(!"".equals(videoId) && videoId!=null){
			return "redirect:/pages/videoTraining/videoDetails.html?videoId="+videoId;
		}else{
			return "redirect:/pages/videoTraining/videoDetails.html";
		}
	}
	/**
	 * 根据视频培训ID查找数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoTrainDetail.do")
	public Map<String,Object> videoTrainDetail(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		String videoId=request.getParameter("videoId");
		if(!"".equals(videoId) || !videoId.equals(null)){
			VideoTrain videoTrain = videoTrainService.queyVideoTrainById(videoId);
			System.out.println("videoTrain:"+videoTrain);
			map.put("videoTrain", videoTrain);
		}
		System.out.println("videoId:"+videoId+"map:"+map);
		return map;
	}
	/**
	 * 保存数据
	 * @param file 视频文件
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/videoTrainSave.do",produces="text/html;charset=utf-8")
	public String videoTrainSave(@RequestParam(value="videofile",required=false)MultipartFile file, HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		VideoTrain videoTrain=new VideoTrain();
		String videoName=request.getParameter("videoName");
		String videoDetail=request.getParameter("videoDetail");
		String videoType=request.getParameter("videoType");
		String videoId=request.getParameter("videoId");
		String  videoVname=request.getParameter("videoVname");
		String videoVsize=request.getParameter("videoVsize");
//		String videofile=request.getParameter("videofile");
		try {
			System.out.println("file:========="+file);
			if(file!=null){
				String url = uploadImage(file, request);
				videoTrain.setVideoPath(url);
			}
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		if(!"".equals(videoName) || videoName!=null){
			videoTrain.setVideoName(videoName);
		}
		if(!"".equals(videoDetail) || videoDetail!=null){
			videoTrain.setVideoRemark(videoDetail);
		}
		if(!"".equals(videoType) || videoType!=null){
			videoTrain.setVideoTypeId(Integer.parseInt(videoType));
		}
		if(!"".equals(videoVname) || videoVname!=null){
			videoTrain.setVideoVname(videoVname);
		}
		if(!"".equals(videoVsize) || videoVsize!=null){
			videoTrain.setVideoVsize(videoVsize);
		}
		try {
			if(!"".equals(videoId) && videoId!=null){
				videoTrain.setVideoId(videoId);
				videoTrain.setVideoTime(new Date());
				videoTrainService.updateActive(videoTrain);
//			VideoTrain videoTrain = videoTrainService.queyVideoTrainById(videoId);
//			System.out.println("videoTrain:"+videoTrain);
//			map.put("videoTrain", videoTrain);
			}else{
				CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
				if(appUser!=null){
					videoTrain.setVideorealName(appUser.getRealname());
					videoTrain.setVideoCode(appUser.getUsergroupid().toString());
				}
				videoTrain.setVideoTime(new Date());
				videoTrain.setVideoId(RandomUtil.RanIntAndString(28));
				int i = videoTrainService.insertActive(videoTrain);
				if(i<0){
					map.put("success", "保存失败");
					map.put("status", 1);
					return JSON.toJSONString(map);
				}
			}
			map.put("success", "保存成功！");
			map.put("status", 0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("success", "保存失败！");
			map.put("status", -1);
			e.printStackTrace();
		}
		System.out.println("videoId:"+videoId+"map:"+map);
		return JSON.toJSONString(map);
	}
	public String uploadImage(MultipartFile file, HttpServletRequest request) throws Exception {
		String filename = file.getOriginalFilename();

		String name = UUID.randomUUID() + "." + filename.substring(filename.lastIndexOf(".") + 1);
		String path = request.getSession().getServletContext().getRealPath("/upload/video");
		String url = "http://" + request.getServerName() //服务器地址    
		        + ":"     
		        + request.getServerPort()+request.getContextPath() + "/upload/video/" + name;
		System.out.println("path:"+path);
		System.out.println("url:"+url);
		path = path + "\\" + name;
		File file2 = new File(path);
		file.transferTo(file2);
		return url;
	}
	/**
	 * 创建视频培训会议
	 * @param request
	 * @return
	 */
	@RequestMapping("/videoConferInsert.do")
	@ResponseBody
	public ResultMessage videoConferInsert(TVideoConference conference,String confersite, HttpServletRequest request ){
		
		CasUser session = SessionUtil.getSession(request);
		String dd=request.getParameter("confersite");
//		System.out.println("dd:"+dd);
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
		conference.setCreateName(session.getRealname());
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
		List<String> list = JSON.parseArray(confersite, String.class);
		for(String s:list){
			if(!uri.equals(s)){
				sites+=s+",";
			}
		}
		conference.setSites(sites);
		String resvalue=VideoNeighborhoodController.videoAddtemplate(conference,uri,list,res);
		String templateId=resvalue.substring(resvalue.indexOf(" ")+1);
		System.out.println("templateId:"+templateId);
		System.out.println("resvalue:"+resvalue);
		if(!resvalue.startsWith("0")){
			return new ResultMessage("模板创建失败", Application.STATUS_ADD_FAIL);
		}
		Result result2=VideoNeighborhoodController.videoSchedule(conference,res);
		int count=VideoNeighborhoodController.videoDeleteTemplate(templateId,res);
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
//    		   videoNeighborhood.setVideoneihdConfId(conference.getConfId());
//    		   videoNeighborhoodService.updateActiveByIdOfConfId(videoNeighborhood);
    		   return new ResultMessage("视频会议创建成功", Application.STATUS_ADD_SUCCESS);
    	   }
    	   return new ResultMessage(Application.MSG_ADD_FAIL, Application.STATUS_ADD_FAIL);
       }
		
		return new ResultMessage("会议创建失败", Application.STATUS_ADD_FAIL);
	}
	/**
	 * 根据地区统计视频培训数据
	 * @param neighChart 视频接访统计表
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/queryVideotrainChartCode.do")
	public Map<String,Object> queryVideotrainChartCode(NeighChart neighChart,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		List<Integer> listInt = new ArrayList<Integer>();
		List<String> listStr = new ArrayList<String>();
		try {
			List<NeighChart> list = videoTrainService.queryVideoTrainByChartCode(neighChart);
			List<Area> listarea = areaService.queryByParentId("0");
			if(list!=null){
				if(list.size()>0){
					for(Area area:listarea){
						for(NeighChart n:list){
							if(n.getCode().equals(area.getCode())){
								listInt.add(n.getCount());
								listStr.add(area.getName());
								continue;
							}
						}
					}
				}
			}else{
				for(Area area:listarea){
					listInt.add(0);
					listStr.add(area.getName());
				}
			}
			map.put("status", 0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			e.printStackTrace();
		}
		NeighChart neigh=new NeighChart();
		neigh.setList(listInt);
		neigh.setArea(listStr);
		map.put("data", neigh);
		return map;
	}
	/**
	 * 根据类别统计视频培训数据
	 * @param neighChart 视频接访统计表
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/queryVideotrainChartType.do")
	public Map<String,Object> queryVideotrainChartType(NeighChart neighChart,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		List<Integer> listInt = new ArrayList<Integer>();
		List<String> listStr = new ArrayList<String>();
		try {
			List<NeighChart> list = videoTrainService.queryVideoTrainByChartType(neighChart);
			List<VideoType> listarea = videoTypeService.queryVideoTypeByIdNotEqual(1);
			System.out.println("listvideotype:"+listarea);
			if(list!=null){
				System.out.println("list.size():"+list.size());
				if(list.size()>0){
					for(VideoType videoType:listarea){
						for(NeighChart n:list){
							System.out.println("n.getCode():"+n.getCode()+"--videoType.getVideoTypeId():"+videoType.getVideoTypeId());
							if(n.getCode().equals(String.valueOf(videoType.getVideoTypeId()))){
								System.out.println("equ");
								listInt.add(n.getCount());
								listStr.add(videoType.getVideoTypeName());
								continue;
							}
						}
					}
				}
			}else{
				for(VideoType videoType:listarea){
					listInt.add(0);
					listStr.add(videoType.getVideoTypeName());
				}
			}
			map.put("status", 0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			e.printStackTrace();
		}
		NeighChart neigh=new NeighChart();
		neigh.setList(listInt);
		neigh.setArea(listStr);
		map.put("data", neigh);
		return map;
	}
	/**
	 * 展示视频会议和视频培训已录播的数据
	 * @param conference
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/queryVideoOrConferByisrecord.do")
	public Map<String,Object> queryVideoOrConferByisrecord(TVideoConference conference,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		try {
			CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
			if(appUser!=null){
				conference.setUserId(appUser.getUsergroupid().toString());
			}
			String pagesiz=request.getParameter("pagesize");
			int pagesize=0;
			if(!"".equals(pagesiz) && pagesiz!=null){
				pagesize=Integer.parseInt(pagesiz);
			}
			map=service.queryVideoOrConferByisrecord(conference, pagesize, 8);
			map.put("status", 0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			e.printStackTrace();
		}
		return map;
	}
}
