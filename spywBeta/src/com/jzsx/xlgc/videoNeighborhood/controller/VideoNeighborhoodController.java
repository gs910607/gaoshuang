package com.jzsx.xlgc.videoNeighborhood.controller;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
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
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.huawei.esdk.tp.professional.local.bean.AdhocConfTemplateParamEx;
import com.huawei.esdk.tp.professional.local.bean.ConferenceInfoEx;
import com.huawei.esdk.tp.professional.local.bean.RecordParamEx;
import com.huawei.esdk.tp.professional.local.bean.SiteInfoEx;
import com.jzsx.xlgc.area.Service.AreaService;
import com.jzsx.xlgc.bean.Area;
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.bean.TVideoConference;
import com.jzsx.xlgc.bean.VideoNeighborhood;
import com.jzsx.xlgc.bean.VideoNeightType;
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
import com.jzsx.xlgc.videoNeighborhood.Service.VideoNeightTypeService;
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
	@Autowired
	private VideoNeightTypeService videoNeightTypeService;
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
		logger.debug("videoNeighborhoodlistjoin.do 加载视频接访列表数据   开始 ");
		Map<String, Object> hashmap=new HashMap<String, Object>();
		VideoNeighborhood videoNeighborhood=new VideoNeighborhood();
		String videoneihdName=request.getParameter("videoneihdName");
		if(!"".equals(videoneihdName) && videoneihdName!=null){
			videoNeighborhood.setVideoneihdName(videoneihdName);
			logger.debug("参数  videoneihdName："+videoneihdName);
		}
		String videoneihdNum=request.getParameter("videoneihdNum");
		if(!"".equals(videoneihdNum) && videoneihdNum!=null){
			videoNeighborhood.setVideoneihdNum(videoneihdNum);
			logger.debug("参数  videoneihdNum："+videoneihdNum);
		}
		String startime=request.getParameter("videoneihdDate");
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		if(!"".equals(startime) && startime!=null){
			try {
				Date videoneihdDate = sdf.parse(startime);
				videoNeighborhood.setVideoneihdDate(videoneihdDate);
				logger.debug("参数  videoneihdDate："+videoneihdDate);
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
				logger.debug("参数  videoneihdRegistDate："+videoneihdRegistDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		String videoneihdLocationplace=request.getParameter("videoneihdLocationplace");
		if(!"".equals(videoneihdLocationplace) && videoneihdLocationplace!=null){
			videoNeighborhood.setVideoneihdLocationplace(videoneihdLocationplace);
			logger.debug("参数  videoneihdLocationplace："+videoneihdLocationplace);
		}
		String firstVisit=request.getParameter("firstVisit");
		if(!"".equals(firstVisit) && firstVisit!=null){
			if(firstVisit.equals("1")){
				CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
				if(appUser!=null){
					videoNeighborhood.setVideoneihdLocationplace(appUser.getUsergroupid().toString());
					logger.debug("参数  code："+appUser.getUsergroupid().toString());
				}
			}
		}
		String pagesiz=request.getParameter("pagesize");
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		map=videoNeighborhoodService.queryVideoNeighborhoodByALl(videoNeighborhood, pagesize, 8);
		logger.debug("加载视频接访列表数据   结束 ");
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
		logger.debug("videoNeighborhoodDetail.do 根据视频接访ID查找数据   开始 ");
		String videoneihdId=request.getParameter("videoneihdId");
		logger.debug("参数  videoneihdId： "+videoneihdId);
		if(!"".equals(videoneihdId) || !videoneihdId.equals(null)){
			 VideoNeighborhood videoNeighborhood = videoNeighborhoodService.queyVideoTrainById(videoneihdId);
			 
//			System.out.println("videoNeighborhood:"+videoNeighborhood);
			map.put("videoNeighborhood", videoNeighborhood);
			String confId=videoNeighborhood.getVideoneihdConfId();
			logger.debug("取值  confId： "+confId);
//			System.out.println("confid:"+confId);
			if(confId!=null && !"".equals(confId)){
				TVideoConference conference = service.queryById(confId);
//				System.out.println("conferce:"+conference);
				map.put("conference", conference);
			}
			
		}
		logger.debug("根据视频接访ID查找数据  结束");
//		System.out.println("videoneihdId:"+videoneihdId+"map:"+map);
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
		logger.debug("videoNeighborhoodReadExcel.do 开始执行上传excel文件");
		logger.debug("参数 filep："+filep);
		Map<String,Object> map  = new HashMap<String, Object>();
		List<VideoNeighborhood> listvhd=new ArrayList<VideoNeighborhood>();
		int i=0;
		JSONArray json = new JSONArray();
		if(filep!=null){
			String url = null;
			try {
				url = uploadImage(filep, request);
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				json.add("获取文件上传路径失败!");
				e1.printStackTrace();
			}
			ReadExcel read=new ReadExcel();
			File file=new File(url);
			try {
				logger.debug("开始执行读取excel文件");
				List<List<Object>> list = read.readExcel(file);
				logger.debug("执行读取excel文件结束" + new Gson().toJson(list));
				for(int j=1;j<list.size();j++){
					List<Object> lis = list.get(j);
					//判断是否有错误参数的
					boolean bl = true ;
					try {
						logger.debug("第"+j+"次读取excel文件里内容   开始");
						VideoNeighborhood neighborhood=new VideoNeighborhood();
//						neighborhood.setVideoneihdId(lis.get(0).toString());
						if(lis.get(0) == null || lis.get(0) == "") {
							json.add("第"+j+"行的信访人名称为空,该行导入失败!");
							bl = false ;
						}else {
							neighborhood.setVideoneihdName(lis.get(0).toString()) ;
						}
						if(lis.get(1) == null || lis.get(1) == "") {
							json.add("第"+j+"行的证件类型为空,该行导入失败!");
							bl = false ;
						}else {
							neighborhood.setVideoneihdCardType(lis.get(1).toString());
						}
						if(lis.get(2) == null || lis.get(2) == "") {
							json.add("第"+j+"行的证件号码为空,该行导入失败!");
							bl = false ;
						}else {
							String videocard="";
							if(lis.get(2).toString().contains(".00")){
								videocard=lis.get(2).toString().substring(0, lis.get(2).toString().lastIndexOf(".00"));
							}else{
								videocard=lis.get(2).toString();
							}
							neighborhood.setVideoneihdCard(videocard) ;
						}
						
						
						String videotelephone="";
						if(lis.get(3).toString().contains(".00")){
							videotelephone=lis.get(3).toString().substring(0, lis.get(3).toString().lastIndexOf(".00"));
						}else{
							videotelephone=lis.get(3).toString();
						}
						neighborhood.setVideoneihdtelephone(videotelephone);
						String videophone="";
						if(lis.get(4) == null || lis.get(4) == "") {
							json.add("第"+j+"行的手机号码为空,该行导入失败!");
							bl = false ;
						}else {
							if(lis.get(4).toString().contains(".00")){
								videophone=lis.get(4).toString().substring(0, lis.get(4).toString().lastIndexOf(".00"));
							}else{
								videophone=lis.get(4).toString();
							}
							neighborhood.setVideoneihdphone(videophone) ;
						}
						
						String videopostcode="";
						if(lis.get(5).toString().contains(".00")){
							videopostcode=lis.get(5).toString().substring(0, lis.get(5).toString().lastIndexOf(".00"));
						}else{
							videopostcode=lis.get(5).toString();
						}
						neighborhood.setVideoneihdPostCode(videopostcode);
						String name ;
						if(lis.get(6).toString().indexOf(".00") >= 0) {
							 name=lis.get(6).toString().substring(0, lis.get(6).toString().lastIndexOf(".00")) ;
						}else {
							 name=lis.get(6).toString();
						}
						
						List<Area> listarea=new ArrayList<Area>();
						if(name!=null && !name.equals("")){
							listarea = areaService.queryByName(name);
						}else{
							//json.add("第"+j+"行的信访所在地不能为空");
							//continue;
						}
						String code="";
						System.out.println("listarea："+listarea);
						if(listarea!=null){
							if(listarea.size()>0){
								 code=listarea.get(0).getCode();
								 System.out.println("code:"+code);
							}else{
								//json.add("第"+j+"行的信访所在地没有对应的区域,请修改");
								//continue;
							}
						}else{
							//json.add("第"+j+"行的信访所在地没有对应的区域,请修改");
							//continue;
						}
						neighborhood.setVideoneihdLocationplace(code);
						neighborhood.setVideoneihdplace(lis.get(7).toString()) ;
						if(lis.get(8) == null || lis.get(8) == "") {
							json.add("第"+j+"行的信访人国籍为空,该行导入失败!");
							bl = false ;
						}else {
							neighborhood.setVideoneihdNationality(lis.get(8).toString());
						}
						
//						String videonum="";
//						if(lis.get(9).toString().contains(".00")){
//							videonum=lis.get(9).toString().substring(0, lis.get(9).toString().lastIndexOf(".00"));
//						}else{
//							videonum=lis.get(9).toString();
//						}
//						neighborhood.setVideoneihdNum(videonum);
						if(lis.get(9) == null || lis.get(9) == "") {
							json.add("第"+j+"行的登记人单位为空,该行导入失败!");
							bl = false ;
						}else {
							neighborhood.setVideoneihdCompany(lis.get(9).toString());
						}
						
						neighborhood.setVideoneihdObjective(lis.get(10).toString()) ;
						SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
						if(lis.get(11) == null || lis.get(11) == "") {
							json.add("第"+j+"行的信访日期为空,该行导入失败!");
							bl = false ;
						}else {
							try {
								Date da = sdf.parse(lis.get(11).toString());
								neighborhood. setVideoneihdDate(da);
							} catch (ParseException e) {
								// TODO Auto-generated catch block
								json.add("第"+j+"行的信访日期格式不对,请修改(例如2018-1-1),该行导入失败!");
								e.printStackTrace();
								bl = false;
							}
						}
						if(lis.get(12) == null || lis.get(12) == "") {
							json.add("第"+j+"行的登记科室为空,该行导入失败!");
							bl = false ;
						}else {
							neighborhood.setVideoneihdRegistDepartment(lis.get(12).toString()) ;
						}
						
						if(lis.get(13) == null || lis.get(13) == "") {
							json.add("第"+j+"行的是否同意为空,该行导入失败!");
							bl = false ;
						}else {
							try {
								neighborhood.setVideoneihdAgreeOpen(String.valueOf((int)Double.parseDouble(lis.get(13).toString())));
							}catch (Exception e) {
								json.add("第"+j+"行的是否同意公开格式不对,请修改(例如1 和 2 分别代表公开与不公开),该行导入失败!");
								e.printStackTrace();
								bl = false;
							}
						}
						neighborhood.setVideoneihdComplainant(lis.get(14).toString());
						if(lis.get(15) == null || lis.get(15) == "") {
							json.add("第"+j+"行的登记日期为空,该行导入失败!");
							bl = false ;
						}else {
							try {
								Date dat = sdf.parse(lis.get(15).toString());
								neighborhood.setVideoneihdRegistDate(dat);
							} catch (ParseException e) {
								json.add("第"+j+"行的登记日期格式不对,请修改(例如2018-1-1),该行导入失败!");
								e.printStackTrace();
								bl = false;
							}
						}
						if(lis.get(16) == null || lis.get(16) == "") {
							json.add("第"+j+"行的是否匿名为空,该行导入失败!");
							bl = false ;
						}else {
							try {
								neighborhood.setVideoneihdAnonymous(String.valueOf((int)Double.parseDouble(lis.get(16).toString())));
							}catch(Exception e) {
								json.add("第"+j+"行的是否匿名格式不对,请修改(例如1 和 2 风别代表匿名与不匿名),该行导入失败!");
								e.printStackTrace();
								bl = false;
							}
						}
						if(lis.get(17) == null || lis.get(17) == "") {
							json.add("第"+j+"行的接访人姓名为空,该行导入失败!");
							bl = false ;
						}else{
							neighborhood.setVideoneihdRespondent(lis.get(17).toString());
						}
						if(lis.get(18) == null || lis.get(18) == "") {
							json.add("第"+j+"行的登记人姓名为空,该行导入失败!");
							bl = false ;
						}else{
							neighborhood.setVideoneihdRegistrant(lis.get(18).toString());
						}
						
						neighborhood.setVideoneihdReason(lis.get(19).toString()) ;
						if(!lis.get(20).toString().equals("")){
							neighborhood.setVideoneihdNumber((int)Double.parseDouble(lis.get(20).toString()));
						}
						if(!lis.get(21).toString().equals("")){
							neighborhood.setVideoneihdInvolveNumber(String.valueOf((int)Double.parseDouble(lis.get(21).toString())));
						}
						if(lis.get(22) == null || lis.get(22) == "") {
							json.add("第"+j+"行的标题为空,该行导入失败!");
							bl = false ;
						}else {
							neighborhood.setVideoneihdTitle(lis.get(22).toString());
						}
						
						neighborhood.setVideoneihdRemark(lis.get(23).toString());
						neighborhood.setVideoneihdrealName(lis.get(24).toString()) ;
//						neighborhood.setVideoneihdVideoWay(lis.get(25).toString());
						//视频接访编号=XF区域code_yyyy_序号
						CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
						String videoneihdNum="XF"+appUser.getUsergroupid()+"_";
						Calendar calendar=Calendar.getInstance();
						int weekyear=calendar.getWeekYear();
						int count=videoNeighborhoodService.queryByCodeofcount(appUser.getUsergroupid().toString());
						videoneihdNum+=""+weekyear+"_"+(count+1);
						neighborhood.setVideoneihdNum(videoneihdNum);
						//有错误信息就结束循环 不把该行的数据加到要添加到数据库的的list里
						if(!bl) {
							logger.debug("有错误信息就结束循环" + j);
							continue ;
						}
						listvhd.add(neighborhood);
						logger.debug("第"+j+"次读取excel文件里内容  结束，并添加到集合");
					} catch (Exception e) {
						json.add("第"+j+"次读取excel文件里内容异常");
						// TODO Auto-generated catch block
						logger.info("第"+j+"次读取excel文件里内容   异常",e);
						e.printStackTrace();
					}
				}
				logger.debug("读取excel文件里内容   结束:"+new Gson().toJson(listvhd));
				for(VideoNeighborhood vnh:listvhd){
					vnh.setVideoneihdId(RandomUtil.RanIntAndString(28));
					i = videoNeighborhoodService.insertActive(vnh);
				}
				if(i>0){
					map.put("status", 0);
					map.put("success", "success");
					map.put("info", json);
				}else{
					map.put("status", 1);
					map.put("success", "模板内容不得为空");
					map.put("info", json);
				}
				logger.debug(" 开始执行上传excel文件 结束");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				json.add("开始执行上传excel文件 异常:" +e.getMessage());
				map.put("status", -1);
				map.put("success", "error");
				map.put("info", json);
				logger.info(" 开始执行上传excel文件 异常",e);
				e.printStackTrace();
			}
		}
		return JSON.toJSONString(map);
	}
	public String uploadImage(MultipartFile file, HttpServletRequest request) throws Exception {
		logger.debug("开始上传文件。。。");
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
		logger.debug("文件上传结束。。。");
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
		logger.debug("videoNeighborhoodexport.do 视频接访导出  开始");
		Map<String,Object> map  = new HashMap<String, Object>();
		ExportExcel<VideoNeighborhood> export=new ExportExcel<VideoNeighborhood>();
		
		VideoNeighborhood videoNeighborhood=new VideoNeighborhood();
		String videoneihdName=request.getParameter("videoneihdName");
		if(!"".equals(videoneihdName) && videoneihdName!=null){
			videoNeighborhood.setVideoneihdName(videoneihdName);
			logger.debug("参数  videoneihdName： "+videoneihdName);
		}
		String videoneihdNum=request.getParameter("videoneihdNum");
		if(!"".equals(videoneihdNum) && videoneihdNum!=null){
			videoNeighborhood.setVideoneihdNum(videoneihdNum);
			logger.debug("参数  videoneihdNum： "+videoneihdNum);
		}
		String startime=request.getParameter("videoneihdDate");
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		if(!"".equals(startime) && startime!=null){
			try {
				Date videoneihdDate = sdf.parse(startime);
				videoNeighborhood.setVideoneihdDate(videoneihdDate);
				logger.debug("参数  videoneihdDate： "+videoneihdDate);
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
				logger.debug("参数  videoneihdRegistDate： "+videoneihdRegistDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		String videoneihdLocationplace=request.getParameter("videoneihdLocationplace");
		if(!"".equals(videoneihdLocationplace) && videoneihdLocationplace!=null){
			videoNeighborhood.setVideoneihdLocationplace(videoneihdLocationplace);
			logger.debug("参数  videoneihdLocationplace： "+videoneihdLocationplace);
		}
		String pagesiz=request.getParameter("pagesize");
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		map=videoNeighborhoodService.queryVideoNeighborhoodByALl(videoNeighborhood, 0, 0);
//		List<VideoNeighborhood> list = videoNeighborhoodService.queryVideoNeighborhoodList();
		List<VideoNeighborhood> vnhdlist=new ArrayList<VideoNeighborhood>();
		vnhdlist = (List<VideoNeighborhood>) map.get("list");
		logger.debug("数组条数："+vnhdlist.size());
		if(vnhdlist!=null && vnhdlist.size()>0){
			for(VideoNeighborhood vh:vnhdlist){
				if(vh.getVideoneihdLocationplace()!=null){
					if(vh.getAreainfo()!=null){
						vh.setVideoneihdLocationplace(vh.getAreainfo().getName());
					}else{
						vh.setVideoneihdLocationplace("");
					}
				}
				if(vh.getVideoneihdAgreeOpen()!=null){
					if(vh.getVideoneihdAgreeOpen().equals("1")){
						vh.setVideoneihdAgreeOpen("是");
					}else if(vh.getVideoneihdAgreeOpen().equals("2")){
						vh.setVideoneihdAgreeOpen("否");
					}
				}
				if(vh.getVideoneihdAnonymous()!=null){
					if(vh.getVideoneihdAnonymous().equals("1")){
						vh.setVideoneihdAnonymous("是");
					}else if(vh.getVideoneihdAnonymous().equals("2")){
						vh.setVideoneihdAnonymous("否");
					}
				}
				if(vh.getVideoneihdTypeId()!=null && !vh.getVideoneihdTypeId().equals("")){
					int neightTypeId=Integer.parseInt(vh.getVideoneihdTypeId());
					VideoNeightType videoNeightType = videoNeightTypeService.queyById(neightTypeId);
					vh.setVideoneihdTypeId(videoNeightType.getNeightTypeName());
				}
			}
		}
//		String string = JSON.toJSONString(vnhdlist);
//		List<VideoNeighborhood> list2 = JSON.parseArray(string, VideoNeighborhood.class);
		String videoneihdTypeExport=request.getParameter("videoneihdTypeExport");
		String[] headers = null;String[] datastr=null;
		if(!"".equals(videoneihdTypeExport) && videoneihdTypeExport!=null){
			if(videoneihdTypeExport.equals("1")){
				headers=Application.VIDEO_NEIGHBORHOOD_HEADERS;
				datastr=Application.VIDEO_NEIGHBORHOOD_DATASTR;
			}else if(videoneihdTypeExport.equals("2")){
				System.out.println("进入2");
				vnhdlist=new ArrayList<VideoNeighborhood>();
				headers=Application.VIDEO_NEIGHBORHOOD_HEADERS_NO;
				datastr=Application.VIDEO_NEIGHBORHOOD_DATASTR_NO;
			}
		}
		logger.debug("导出条件筛选结束  开始导出");
		export.exportExcelStrs("视频接访", headers, vnhdlist,datastr, "yyyy-MM-dd",response,request);
//		System.out.println("哈哈！：导出结束");	 
		logger.debug("视频接访导出  结束");
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
		logger.debug("deleteNeighborhood.do 根据视频接访列表数据ID做简单的删除  开始");
		String videoneihdId=request.getParameter("videoneihdId");
		logger.debug("参数  videoneihdId： "+videoneihdId);
		if(!"".equals(videoneihdId) || !videoneihdId.equals(null)){
			try {
				videoNeighborhoodService.deleteById(videoneihdId);
				map.put("success", "删除成功");
				logger.debug("根据视频接访列表数据ID做简单的删除  结束");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				map.put("success", "删除失败");
				logger.info("根据视频接访列表数据ID做简单的删除  异常",e);
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
		logger.debug("videoNeighborhoodSave.do 保存数据  开始");
		String videoneihdId="";
		try {
			if(!"".equals(videoNeighborhood.getVideoneihdId()) && videoNeighborhood.getVideoneihdId()!=null){
				logger.debug(" 保存数据  开始修改");
				videoNeighborhoodService.updateActive(videoNeighborhood);
				logger.debug(" 保存数据  结束修改");
			}else{
				logger.debug(" 保存数据  开始添加数据");
				CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
				if(appUser!=null){
					videoNeighborhood.setVideoneihdrealName(appUser.getRealname());
					videoNeighborhood.setVideoneihdCreateCode(appUser.getUsergroupid().toString());
					//视频接访编号=XF区域code_yyyy_序号
					String videoneihdNum="XF"+appUser.getUsergroupid()+"_";
					Calendar calendar=Calendar.getInstance();
					int weekyear=calendar.getWeekYear();
					int count=videoNeighborhoodService.queryByCodeofcount(appUser.getUsergroupid().toString());
					videoneihdNum+=""+weekyear+"_"+(count+1);
					videoNeighborhood.setVideoneihdNum(videoneihdNum);
				}
				videoNeighborhood.setVideoneihdVideoWay("视频");
				videoneihdId=RandomUtil.RanIntAndString(28);
				videoNeighborhood.setVideoneihdId(videoneihdId);
				videoNeighborhoodService.insertActive(videoNeighborhood);
				logger.debug(" 保存数据  结束添加数据");
			}
			map.put("videoneihdId", videoneihdId);
			map.put("status",0);
			map.put("success", "保存成功！");
			logger.debug(" 保存数据  结束");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status",-1);
			map.put("success", "保存失败！");
			logger.info(" 保存数据  异常",e);
			e.printStackTrace();
		}
//		System.out.println("videoId:"+videoNeighborhood.getVideoneihdId()+"map:"+map);
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
		logger.debug("addConference.do 开始会议创建---并开始组装会议条件参数");
		CasUser session = SessionUtil.getSession(request);
		String confstartTime=request.getParameter("confstartTime");
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(confstartTime!=null && confstartTime!=""){
			try {
				Date datetime=sdf.parse(confstartTime);
				conference.setBeginTime(datetime);
				logger.debug("参数  datetime： "+datetime);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		//conference.setName("JF"+RandomUtil.RanInt(8));
		conference.setName(videoNeighborhood.getVideoneihdTitle());
		conference.setCreateName(session.getRealname());
		conference.setAccessCode(RandomUtil.RanInt(6)+"");
		logger.debug("参数  name： "+conference.getName());
		logger.debug("参数  accessCode： "+conference.getAccessCode());
		conference.setMainMcuId(16);
		CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
		String uri="";String sites="";int mcuId=0;
		if(appUser!=null){
			conference.setUserId(appUser.getUsergroupid().toString());
			conference.setCreateName(appUser.getRealname());
			Area area = areaService.queryByCode(appUser.getUsergroupid().toString());
			if(area!=null){
				uri=area.getHphone();
				mcuId=Integer.parseInt(area.getMcu());
				sites+=area.getHphone()+",";
			}
		}
		List<Map> arealist=new ArrayList<Map>();
		Area area1=areaService.queryByCode(videoNeighborhood.getVideoneihdLocationplace());
		Area area2=areaService.queryByCode(videoNeighborhood.getVideoneihdVisitorPlace());
		Map<String, Object> hash=new HashMap<String, Object>();
		if(!uri.equals(area1.getHphone())){
			hash=new HashMap<String, Object>();
			hash.put("areaId", area1.getHphone());
			hash.put("mcu", area1.getMcu());
			arealist.add(hash);
		}
		if(!uri.equals(area2.getHphone())){
			hash=new HashMap<String, Object>();
			hash.put("areaId", area2.getHphone());
			hash.put("mcu", area2.getMcu());
			arealist.add(hash);
		}
		sites+=area1.getHphone()+","+area2.getHphone()+",";
		conference.setSites(sites);
		logger.debug("并开始组装会议条件参数  结束  开始创建模板");
		String resvalue=videoAddtemplate(conference,uri,mcuId,arealist,res,false);
		String templateId=resvalue.substring(resvalue.indexOf(" ")+1);
		logger.debug("取值  模板创建返回值  resvalue："+resvalue);
//		System.out.println("templateId:"+templateId);
//		System.out.println("resvalue:"+resvalue);
		if(!resvalue.startsWith("0")){
			logger.debug("模板创建失败");
			videoNeighborhoodService.deleteById(videoNeighborhood.getVideoneihdId());
			return new ResultMessage("模板创建失败", Application.STATUS_ADD_FAIL);
		}
		logger.debug("开始创建会议");
		Result result2=videoSchedule(conference,res,uri,mcuId,arealist,false);
		logger.debug("取值   创建会议返回值 resultCode:"+result2.getResultCode()+"--开始删除模板");
		int count=videoDeleteTemplate(templateId,res);
		logger.debug("取值   删除模板返回值  count:"+count);
//		System.out.println("删除模板："+count);
		logger.debug("开始会议创建   结束");
		/**
		 * 视频会议返回result2需要判断返回结果，如果创建会议失败则不保存数据，并返回原因到前台
		 * 
		 * 
		 * */
       if(result2.getResultCode()==0){
    	   logger.debug("会议内容记录    开始");
    	   conference.setConfId(result2.getConf().getConfId());
    	   conference.setRecorderAddr(result2.getConf().getRecorderAddr());
    	   
    	   conference.setStatus(0);
    	   int i = service.addConference(conference);
    	   if(i==1){
    		   videoNeighborhood.setVideoneihdConfId(conference.getConfId());
    		   videoNeighborhoodService.updateActiveByIdOfConfId(videoNeighborhood);
    		   logger.debug("会议内容记录    结束");
    		   return new ResultMessage("视频会议创建成功", Application.STATUS_ADD_SUCCESS);
    	   }
    	   logger.debug("会议内容记录    结束");
    	   return new ResultMessage(Application.MSG_ADD_FAIL, Application.STATUS_ADD_FAIL);
       }
       	videoNeighborhoodService.deleteById(videoNeighborhood.getVideoneihdId());
		return new ResultMessage("会议创建失败", Application.STATUS_ADD_FAIL);
		
	}
	/**
	 * 创建模板
	 */
	public static  String videoAddtemplate(TVideoConference conference,String uri,int mcuId,List<Map> arealist,resService res,boolean bl){
		AdhocConfTemplateParamEx paramEx=new AdhocConfTemplateParamEx();
		logger.debug("开始执行创建模板");
		paramEx.setName(conference.getName());//name 会议名称
		paramEx.setAccessCode(conference.getAccessCode());//accesscode 会议接入号
		//duration为7表示一直持续,而一直持续duration要设置null
		if(!"7".equals(conference.getDuration())) {
			paramEx.setDuration(ConferenceController.durationInt2dur(Integer.parseInt(conference.getDuration())*60));//javax.xml.datatype.Duration		会议时长	
		}
		paramEx.setCpResource(0);//cpResource Integer		会议多画面资源数	
		paramEx.setMediaEncryptType(0);//mediaEncryptType	Integer		煤流体加密方式	
		paramEx.setIsLiveBroadcast(conference.getIsRecording());//isLiveBroadcast		Integer		是否支持直播功能  	0 不支持 		1支持
		paramEx.setIsRecording(conference.getIsRecording());//isRecording			Integer		是否支持录播功能  	0 不支持 		1支持
//		paramEx.setMainSiteUri(uri);//会议主会场
		paramEx.setMainMcuId(mcuId);
		List<SiteInfoEx> sitelist = new ArrayList<SiteInfoEx>();
		SiteInfoEx site=new SiteInfoEx();
		site.setUri(uri);//会场标识
		site.setName(uri);//会场名称
		site.setMcuId(mcuId);
		site.setType(4);//会场类型  
		sitelist.add(site);
		if(arealist!=null){
			if(arealist.size()>0){
				for(Map hphone :arealist){
					if(!uri.equals(hphone.get("areaId"))){
						SiteInfoEx sitein=new SiteInfoEx();
						sitein.setUri(hphone.get("areaId").toString());//会场标识
						sitein.setName(hphone.get("areaId").toString());//会场名称
						sitein.setType(4);//会场类型  
						if(bl) {
							sitein.setMcuId(Integer.parseInt(hphone.get("mcu").toString()));
						}else{
							sitein.setMcuId(mcuId);
						}
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
		logger.debug("执行创建模板  结束  返回值："+value);
		//String		调用会议接口的结果码+空格+会议模板id	"0 123"	或	"12314123 "
		return value;
	}
	/**
	 * 预约会议
	 * @param conference
	 * @return
	 */
	public static  Result videoSchedule(TVideoConference conference,resService res,String uri,int mcuId,List<Map> arealist,boolean bl){
		logger.debug("开始预约会议");
		ConferenceInfoEx cfinfo=new ConferenceInfoEx();
		cfinfo.setName(conference.getName());
		cfinfo.setBeginTime(conference.getBeginTime());
		cfinfo.setAccessCode(conference.getAccessCode());
		cfinfo.setIsRecording(conference.getIsRecording());
		cfinfo.setMediaEncryptType(0);
		//duration为7表示一直持续,而一直持续duration要设置null
		if( !"7".equals(conference.getDuration())) {
			cfinfo.setDuration(ConferenceController.durationInt2dur(Integer.parseInt(conference.getDuration())*60));
		}
		cfinfo.setMainMcuId(conference.getMainMcuId());
		List<SiteInfoEx> sitelist = new ArrayList<SiteInfoEx>();
		SiteInfoEx site=new SiteInfoEx();
		site.setUri(uri);//会场标识
		site.setName(uri);//会场名称
		site.setMcuId(mcuId);
		site.setType(4);//会场类型  
		sitelist.add(site);
		if(arealist!=null){
			if(arealist.size()>0){
				for(Map hphone :arealist){
					if(!uri.equals(hphone.get("areaId"))){
						SiteInfoEx sitein=new SiteInfoEx();
						sitein.setUri(hphone.get("areaId").toString());//会场标识
						sitein.setName(hphone.get("areaId").toString());//会场名称
						sitein.setType(4);//会场类型  
						if(bl) {
							sitein.setMcuId(Integer.parseInt(hphone.get("mcu").toString()));
						}else {
							sitein.setMcuId(mcuId);
						}
						sitelist.add(sitein);
					}
				}
			}
		}
		cfinfo.setSites(sitelist);
		if(conference.getIsRecording()==1){
			RecordParamEx recordEx=new RecordParamEx();//支持录播
			recordEx.setIsAutoRecord(true);//isAutoRecord	boolean	是否自动启动录播，默认为false。true：是false：否    
			recordEx.setIsVoiceRecord(false);//isVoiceRecord	boolean	是否纯语音录制，默认为false。true：是（纯语音）false：否（语音+视频）  
			recordEx.setRseId(4);
			cfinfo.setRecordParam(recordEx);//支持录播
		}
		cfinfo.setIsLiveBroadcast(conference.getIsRecording());
		Result result = res.scheduleConfEx(cfinfo,uri);
		logger.debug("会议名称："+conference.getName());
		logger.debug("预约会议   结束    返回码："+result.getResultCode());
		return result;
	}
	public static int videoDeleteTemplate(String templateId,resService res){
		logger.debug("删除模板   结束");
		int count=res.deletetemplate(templateId);
		logger.debug("删除模板  结束count："+count);
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
		logger.debug("queryNeighCharts.do 根据地区统计视频接访数据   开始");
		logger.debug("参数 year:"+neighChart.getYear());
		logger.debug("参数 month:"+neighChart.getMonth());
		logger.debug("参数 code:"+neighChart.getCode());
		List<Integer> listInt = new ArrayList<Integer>();
		List<Integer> listInterror = new ArrayList<Integer>();
		List<Integer> listIntun = new ArrayList<Integer>();
		List<Integer> listInt2 = new ArrayList<Integer>();
		List<Integer> listInt3 = new ArrayList<Integer>();
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
				logger.debug("开始装配动态数据");
				if(list.size()>0){
					for(Area area:listarea){
						for(NeighChart n:list){
							if(n.getCode().equals(area.getCode())){
									listInt.add(n.getCount());
									listInterror.add(n.getCount1());
									listIntun.add(n.getCount2());
									listInt2.add(n.getCount3());
									listInt3.add(n.getCount4());
								listStr.add(area.getName());
								listIntcd.add(n.getCode());
								continue;
							}
						}
					}
				}
				logger.debug("装配动态数据   结束");
			}else{
				logger.debug("开始装配静态数据");
				for(Area area:listarea){
					listInt.add(0);
					listInterror.add(0);
					listIntun.add(0);
					listInt2.add(0);
					listInt3.add(0);
					listStr.add(area.getName());
					listIntcd.add(area.getCode());
				}
				logger.debug("装配静态数据   结束");
			}
			map.put("status", 0);
			logger.debug(" 根据地区统计视频接访数据   结束");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			logger.debug(" 根据地区统计视频接访数据   异常",e);
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
		hashmap.put("hover", listInt2);
		hashmap.put("neightcount", listInt3);
		map.put("data", hashmap);
		return map;
	}
	/**
	 * 根据月份统计视频接访数据
	 * @param neighChart 统计数据类
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/queryNeighMonth.do")
	public Map<String,Object> queryNeighMonth(NeighChart neighChart,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("queryNeighMonth.do 根据地区统计视频接访数据   开始");
		logger.debug("参数 year:"+neighChart.getYear());
		logger.debug("参数 month:"+neighChart.getMonth());
		logger.debug("参数 code:"+neighChart.getCode());
		List<Integer> listInt = new ArrayList<Integer>();
		List<Integer> listInterror = new ArrayList<Integer>();
		List<Integer> listIntun = new ArrayList<Integer>();
		List<Integer> listInt2 = new ArrayList<Integer>();
		List<Integer> listInt3 = new ArrayList<Integer>();
		try {
			List<NeighChart> list=new ArrayList<NeighChart>();
			list = videoNeighborhoodService.queryneighmonth(neighChart);
			if(list!=null){
				logger.debug("开始装配数据");
				if(list.size()>0){
						for(NeighChart n:list){
							listInt.add(n.getCount());
							listInterror.add(n.getCount1());
							listIntun.add(n.getCount2());
							listInt2.add(n.getCount3());
							listInt3.add(n.getCount4());
					}
				}
				logger.debug("装配数据  结束");
			}
			map.put("status", 0);
			logger.debug(" 根据地区统计视频接访数据   结束");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			logger.debug(" 根据地区统计视频接访数据   异常",e);
			e.printStackTrace();
		}
		Map<String,Object> hashmap  = new HashMap<String, Object>();
		hashmap.put("success", listInt);
		hashmap.put("defeated", listInterror);
		hashmap.put("unknown", listIntun);
		hashmap.put("hover", listInt2);
		hashmap.put("neightcount", listInt3);
		map.put("data", hashmap);
		return map;
	}
	/**
	 * 根据月份统计视频接访数据
	 * @param neighChart 统计数据类
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/queryTypeNeighMonth.do")
	public Map<String,Object> queryTypeNeighMonth(NeighChart neighChart,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("queryNeighMonth.do 根据地区统计视频接访数据   开始");
		logger.debug("参数 year:"+neighChart.getYear());
		logger.debug("参数 month:"+neighChart.getMonth());
		logger.debug("参数 code:"+neighChart.getCode());
		List<Integer> listInt = new ArrayList<Integer>();
		List<Integer> listInterror = new ArrayList<Integer>();
		List<Integer> listIntun = new ArrayList<Integer>();
		List<String> listStr = new ArrayList<String>();
		List<String> listCd = new ArrayList<String>();
		try {
			List<NeighChart> list=new ArrayList<NeighChart>();
			if(neighChart.getCode()!=null && !"".equals(neighChart.getCode())){
				list = videoNeighborhoodService.queryTypeneighmonths(neighChart);
			}else{
				list = videoNeighborhoodService.queryTypeneighmonth(neighChart);
			}
			if(list!=null){
				logger.debug("开始装配数据");
				if(list.size()>0){
						for(NeighChart n:list){
							listInt.add(n.getCount());
							listInterror.add(n.getCount1());
							listIntun.add(n.getCount2());
							listStr.add(n.getName());
							listCd.add(n.getCode());
					}
				}
				logger.debug("装配数据  结束");
			}
			map.put("status", 0);
			logger.debug(" 根据地区统计视频接访数据   结束");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			logger.debug(" 根据地区统计视频接访数据   异常",e);
			e.printStackTrace();
		}
		Map<String,Object> hashmap  = new HashMap<String, Object>();
		hashmap.put("success", listInt);
		hashmap.put("defeated", listInterror);
		hashmap.put("unknown", listIntun);
		hashmap.put("name", listStr);
		hashmap.put("code", listCd);
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
		logger.debug("updateByIdOfstate.do 修改状态   开始");
		logger.debug("参数  VideoneihdId："+videoNeighborhood.getVideoneihdId());
//		System.out.println("videoNeighborhood.getVideoneihdId"+videoNeighborhood.getVideoneihdId());
		try {
			int count=videoNeighborhoodService.updateActiveByIdOfState(videoNeighborhood);
			System.out.println("count:"+count);
			map.put("status", 0);
			map.put("success", "状态修改成功!");
			logger.debug(" 修改状态  结束");
		} catch (Exception e) {
			map.put("status", -1);
			map.put("success", "状态修改失败!");
			logger.debug(" 修改状态  异常",e);
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;

	}
	/**
	 * 视频接访类型数据集合
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/VideoNeightTypeJson.do")
	public Map<String,Object> VideoNeightTypeJson(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("VideoNeightTypeJson.do 视频接访类型数据集合   开始");
//		System.out.println("videoNeighborhood.getVideoneihdId"+videoNeighborhood.getVideoneihdId());
		List<VideoNeightType> list=new ArrayList<VideoNeightType>();
		try {
			list = videoNeightTypeService.queryList();
			
			map.put("status", 0);
			map.put("list", list);
			logger.debug(" 视频接访类型数据集合  结束");
		} catch (Exception e) {
			map.put("status", -1);
			map.put("list", list);
			logger.debug(" 视频接访类型数据集合态  异常",e);
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;

	}
}

