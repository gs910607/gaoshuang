package com.jzsx.xlha.onlineEvaluating.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

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

import com.jzsx.xlha.bean.CasUser;
import com.jzsx.xlha.bean.OnlineEvaluation;
import com.jzsx.xlha.bean.OnlineEvaluationActive;
import com.jzsx.xlha.bean.OnlineEvaluationRecord;
import com.jzsx.xlha.onlineEvaluating.service.OnlineEvaluationActiveService;
import com.jzsx.xlha.onlineEvaluating.service.OnlineEvaluationRecordService;
import com.jzsx.xlha.onlineEvaluating.service.OnlineEvaluationService;
import com.jzsx.xlha.util.RandomUtil;

@Controller
@RequestMapping("/onlineEvaluating")
public class OnlineEvaluationActiveController {
	Logger logger=Logger.getLogger(OnlineEvaluationActiveController.class);
	@Autowired
	private OnlineEvaluationActiveService videoResearchActiveService;
	@Autowired
	private OnlineEvaluationRecordService videoResearchRecordService;
	@Autowired
	private OnlineEvaluationService videoResearchService;
	/**
	 * 加载视频调研活动评选首页数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/trainActive.do")
	public Map<String,Object> test(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("trainActive.do 加载视频调研活动评选首页数据  开始");
		List<OnlineEvaluationActive> list = videoResearchActiveService.queryVideoResearchActiveList();
		map.put("map", list);
		logger.debug(" 加载视频调研活动评选首页数据  结束");
		return map;
	}
	/**
	 * 加载视频调研活动评选列表数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoResearchActivelistjoin.do")
	public Map<String,Object> videotrainlistjoin(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("videoResearchActivelistjoin.do 加载视频调研活动评选列表数据  开始");
		String videoResearchId=request.getParameter("videoResearchId");
		logger.debug("参数  videoResearchId："+videoResearchId);
		List<OnlineEvaluationActive> list=null;
		OnlineEvaluation onlineEvaluation=null;
		if(!"".equals(videoResearchId) && videoResearchId!=null){
			onlineEvaluation = videoResearchService.queyVideoResearchById(videoResearchId);
			  list = videoResearchActiveService.queyVideoResearchById(videoResearchId);
		}
		String pagesiz=request.getParameter("pagesize");
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		if(onlineEvaluation != null) {
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			String ResearchType=onlineEvaluation.getVideoResearchType();
		//	request.getRemoteHost());request.getRemoteAddr();
			OnlineEvaluationRecord researchRecord=new OnlineEvaluationRecord();
			researchRecord.setVideoResearchReId(videoResearchId);
			CasUser appUser =  (CasUser) request.getSession().getAttribute("user");
			if(appUser!=null){
				researchRecord.setVideoResearchRealName(appUser.getUserid());
			    researchRecord.setVideoResearchCode(appUser.getUsergroupid().toString());
			}
			if(!ResearchType.equals("1")){
				researchRecord.setVideoResearchTime(sdf.format(new Date()));
			}
		//	researchRecord.setVideoResearchTime(sdf.format(new Date()));
			researchRecord.setVideoResearchType(onlineEvaluation.getVideoResearchType());
			List<OnlineEvaluationRecord> Rlist = videoResearchRecordService.queyVideoResearchRecordById(researchRecord);
		//	Properties prop=new Properties();
	///		try {
		//		prop.load(this.getClass().getResourceAsStream("/safenessPublicity.properties"));
		//		String publictyurl=prop.getProperty("safe_Publicity_path");
		//		map.put("path", publictyurl);
		//	} catch (IOException e) {
				// TODO Auto-generated catch block
		//		e.printStackTrace();
		//	}
		//	List<VideoResearchRecord> Rlist = videoResearchRecordService.queyVideoResearchRecordById(researchRecord);
			int restype=1;//可以投票
			Date tdate=new Date();
			if(Rlist!=null){
				if(ResearchType.equals("1")){
					if(Rlist.size()>=1){
						restype=3;//整场只能投一次
					}
				}else if(ResearchType.equals("2")){
					if(Rlist.size()>=1){
						restype=4;//一天投一次
					}
				}else if(ResearchType.equals("3")){
					if(Rlist.size()>=5){
						restype=5;//一天投五次
					}
				}
			}
			if(onlineEvaluation.getVideoResearchStoptime().getTime() < tdate.getTime()){
				restype=2;
			}
			logger.debug(" 加载视频调研活动评选列表数据  结束");
			map.put("Rlist", restype);
			map.put("list", list);
			map.put("onlineEvaluation", onlineEvaluation);
		}
		return map;
	}
	/**
	 * 加载视频调研活动评选列表数据app接口
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoResearchActiveAppjoin.do")
	public Map<String,Object> videoResearchActiveAppjoin(OnlineEvaluationRecord researchRecord,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("videoResearchActiveAppjoin 加载视频调研活动评选列表数据app接口  开始");
		logger.debug("参数 researchRecord："+researchRecord.getVideoResearchReId());
		OnlineEvaluation onlineEvaluation = null;
		List<OnlineEvaluationRecord> Rlist = null;
		int restype=1;//可以投票
		try {
			String videoResearchId=researchRecord.getVideoResearchReId();
			onlineEvaluation = videoResearchService.queyVideoResearchById(videoResearchId);
//	request.getRemoteHost());request.getRemoteAddr();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			String ResearchType=onlineEvaluation.getVideoResearchType();
//			researchRecord.setVideoResearchReId(videoResearchId);
//			researchRecord.setVideoResearchReIp(request.getRemoteHost());
			if(ResearchType!=null && ResearchType!=""){
				if(!ResearchType.equals("1")){
					researchRecord.setVideoResearchTime(sdf.format(new Date()));
				}
				researchRecord.setVideoResearchType(ResearchType);
				Rlist = videoResearchRecordService.queyVideoResearchRecordById(researchRecord);
				map.put("msg", "成功！");
				Date tdate=new Date();
				if(Rlist!=null){
					if(ResearchType.equals("1")){
						if(Rlist.size()>=1){
							restype=2;//整场只能投一次
						}
					}else if(ResearchType.equals("2")){
						if(Rlist.size()>=1){
							restype=3;//一天投一次
						}
					}else if(ResearchType.equals("3")){
						if(Rlist.size()>=5){
							restype=4;//一天投五次
						}
					}
				}
				if(onlineEvaluation.getVideoResearchStoptime().getTime() < tdate.getTime()){
					restype=5;//投票时间过期
				}
				map.put("restype", restype);
//				Properties prop=new Properties();
//				prop.load(this.getClass().getResourceAsStream("/safenessPublicity.properties"));
//				String publictyurl=prop.getProperty("safe_Publicity_path");
//				map.put("path", publictyurl);
				map.put("status", 1);
				map.put("onlineEvaluation", onlineEvaluation);
			}else{
				map.put("status", -2);
				map.put("msg", "操作异常");
			}
			logger.debug("加载视频调研活动评选列表数据app接口  结束");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			map.put("msg", "失败！");
			logger.debug("加载视频调研活动评选列表数据app接口  异常",e);
			e.printStackTrace();
		} 
		return map;
	}
	/**
	 * 加载视频调研活动评选记录列表数据
	 * @param problemPaperRecord
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/researchRecordlistjoin.do")
	public Map<String,Object> researchRecordlistjoin(OnlineEvaluationRecord researchRecord,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		String pagesiz=request.getParameter("pagesize");
//		VideoResearch videoResearch=new VideoResearch();
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		map=videoResearchRecordService.queryByAll(researchRecord, pagesize, 8);
		System.out.println("map:"+map);
		return map;
	}
	@InitBinder
	protected void initBinder(WebDataBinder binder){
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	/**
	 * 根据父类ID查询当前投票数
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoResearchVote.do")
	public Map<String,Object> videoResearchVote(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("videoResearchVote.do 根据父类ID查询当前投票数  开始");
		String videoResearchId=request.getParameter("videoResearchId");
		logger.debug("参数  videoResearchId："+videoResearchId);
		String pagesiz=request.getParameter("pagesize");
		int pagesize=1;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		String pagenu=request.getParameter("pagenum");
		int pagenum=10;
		if(!"".equals(pagenu) && pagenu!=null){
			pagenum=Integer.parseInt(pagenu);
		}
		if(!"".equals(videoResearchId) && videoResearchId!=null){
			map=videoResearchActiveService.queryVideoVoteByReseachId(videoResearchId, pagesize, pagenum);
			map.put("status", 0);
		}else{
			map.put("status", -1);
		}
		logger.debug(" 根据父类ID查询当前投票数 结束");
		return map;
	}
	/**
	 * 视频调研活动评选票数累加
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoResearchActiveVote.do")
	public Map<String,Object> videoResearchActiveVote(
			@RequestParam(value="userId",required=false)String userId,
			@RequestParam(value="areaCode",required=false)String areaCode,
			HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("videoResearchActiveVote.do 视频调研活动评选票数累加  开始");
		String videoResearchId=request.getParameter("videoResearchId");
		String researchId=request.getParameter("researchId");
		String videoResearchType=request.getParameter("videoResearchType");
		logger.debug("参数  videoResearchId："+videoResearchId);
		logger.debug("参数  researchId："+researchId);
		logger.debug("参数  videoResearchType："+videoResearchType);
		String[] researchidstr=videoResearchId.split(",");
		List<String> listid=new ArrayList<String>();
		for(String s : researchidstr){
			listid.add(s);
		}
		int resulttype=0;
		List<OnlineEvaluationActive> list=null;
		if((!"".equals(videoResearchId) && videoResearchId!=null)&&(!"".equals(researchId)&& researchId!=null)&&(!"".equals(videoResearchType)&& videoResearchType!=null)){
			  try {
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			//	request.getRemoteHost());request.getRemoteAddr();
				OnlineEvaluationRecord researchRecord=new OnlineEvaluationRecord();
				researchRecord.setVideoResearchReId(researchId);
				researchRecord.setVideoResearchReIp(request.getRemoteHost());
				researchRecord.setVideoResearchTime(sdf.format(new Date()));
				researchRecord.setVideoResearchType(videoResearchType);
				CasUser appUser =  (CasUser) request.getSession().getAttribute("user");
				logger.debug("userId:"+userId);
				logger.debug("areaCode:"+areaCode);
				logger.debug("appUser:"+appUser);
				if((userId!=null && !"".equals(userId))&&(areaCode!=null && !"".equals(areaCode))){
					resulttype=1;
					researchRecord.setVideoResearchRealName(userId);
				    researchRecord.setVideoResearchCode(areaCode);
				    logger.debug("进入判断-userId-areaCode-不为null并进行赋值");
				}
				if(appUser!=null){
					resulttype=1;
					researchRecord.setVideoResearchRealName(appUser.getUserid());
				    researchRecord.setVideoResearchCode(appUser.getUsergroupid().toString());
				    logger.debug("进入判断-appUser-不为null并进行赋值");
				}
				if(resulttype==1){
					videoResearchActiveService.updatevideoResearchByIds(listid);
					videoResearchRecordService.insertActive(researchRecord);
					map.put("status", 0);
					map.put("success", "投票成功");
					logger.debug("视频调研活动评选票数累加  结束");
				}else{
					map.put("status", -1);
					map.put("success", "请登录后投票");
				}
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				map.put("status", 1);
				map.put("success", "投票失败");
				logger.info("视频调研活动评选票数累加  异常",e);
				e.printStackTrace();
			}
		}
		return map;
	}
	/**
	 * 视频调研活动评选票数累加app接口
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoResearchActiveAppVote.do")
	public Map<String,Object> videoResearchActiveAppVote(OnlineEvaluationActive active,OnlineEvaluationRecord researchRecord,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("videoResearchActiveVote.do 视频调研活动评选票数累加  开始");
		logger.debug("参数  videoResearchId："+active.getVideoResearchId());
		logger.debug("参数  researchId："+researchRecord.getVideoResearchReId());
		String[] researchidstr=active.getVideoActiveId().split(",");
		List<String> listid=new ArrayList<String>();
		for(String s : researchidstr){
			listid.add(s);
		}
		active.setVideoActiveId(null);
//		logger.debug("参数  videoResearchType："+researchRecord.getVideoResearchType());
		try {
			Map<String,Object> hashmap=videoResearchActiveService.queryVideoResearchByALl(active, 1, 2);
			List<OnlineEvaluationActive> list = (List<OnlineEvaluationActive>) hashmap.get("list");
			if(list!=null){
				if(list.size()>0){
					int recordtype=1;
					if(researchRecord.getVideoResearchCode()==null || researchRecord.getVideoResearchCode()==""){
						map.put("status", -1);
						map.put("msg", "无地区code参数");
						recordtype=2;
					}
					if(researchRecord.getVideoResearchRealName()==null || researchRecord.getVideoResearchRealName()==""){
						map.put("status", -2);
						map.put("msg", "无用户Id");
						recordtype=2;
					}
					OnlineEvaluation onlineEvaluation = videoResearchService.queyVideoResearchById(active.getVideoResearchId());
					SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
					SimpleDateFormat sdfs=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				//	request.getRemoteHost());request.getRemoteAddr();
//				OnlineEvaluationRecord researchRecord=new OnlineEvaluationRecord();
					researchRecord.setVideoResearchReId(active.getVideoResearchId());
					researchRecord.setVideoResearchReIp(request.getRemoteHost());
					researchRecord.setVideoResearchTime(sdfs.format(new Date()));
					researchRecord.setVideoResearchType(onlineEvaluation.getVideoResearchType());
					String researchType=onlineEvaluation.getVideoResearchType();
					if(onlineEvaluation.getVideoResearchVoteNumber()<listid.size()){
						map.put("status", -9);
						map.put("msg", "单次投票数量已超过"+onlineEvaluation.getVideoResearchVoteNumber()+"票");
						recordtype=2;
					}
					if(recordtype==1){
						int valueType=1;
						if(researchType!=null && researchType!=""){
							OnlineEvaluationRecord evaluationRecord=new OnlineEvaluationRecord();
							evaluationRecord.setVideoResearchReId(researchRecord.getVideoResearchReId());
							evaluationRecord.setVideoResearchRealName(researchRecord.getVideoResearchRealName());
//							evaluationRecord.setVideoResearchReIp(researchRecord.getVideoResearchReIp());
							if(!researchType.equals("1")){
								evaluationRecord.setVideoResearchTime(sdf.format(new Date()));
							}
							evaluationRecord.setVideoResearchType(researchType);
							List<OnlineEvaluationRecord> Rlist = videoResearchRecordService.queyVideoResearchRecordById(evaluationRecord);
							Date tdate=new Date();
							if(Rlist!=null){
								if(researchType.equals("1")){
									if(Rlist.size()>=1){
										valueType=2;
										map.put("status", -5);
										map.put("msg", "整场仅限投一次");
									}
								}else if(researchType.equals("2")){
									if(Rlist.size()>=1){
										valueType=2;
										map.put("status", -6);
										map.put("msg", "一天仅限投一次");
									}
								}else if(researchType.equals("3")){
									if(Rlist.size()>=5){
										valueType=2;
										map.put("status", -7);
										map.put("msg", "一天仅限投五次");
									}
								}
							}
							if(onlineEvaluation.getVideoResearchStoptime().getTime() < tdate.getTime()){
								valueType=2;
								map.put("status", -8);
								map.put("msg", "投票时间已结束");
							}
						}
						if(valueType==1){
							videoResearchActiveService.updatevideoResearchByIds(listid);
							videoResearchRecordService.insertActive(researchRecord);
							map.put("status", 1);
							map.put("msg", "成功");
						}
					}
					
//					AppUser appUser = (AppUser) request.getSession().getAttribute("appUser");
//					if(appUser!=null){
//						researchRecord.setVideoResearchRealName(appUser.getRealName());
//					    researchRecord.setVideoResearchCode(appUser.getUsergroupid().toString());
//					}
				}else{
					map.put("status", -3);
					map.put("msg", "操作异常");
				}
				
			}
			logger.debug(" 视频调研活动评选票数累加  结束");
		} catch (Exception e) {
			map.put("status", -4);
			map.put("msg", "失败");
			logger.debug(" 视频调研活动评选票数累加   异常",e);
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 上传临时目录
	 * @param file
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/videoResearchActivefileupload.do")
	public Map<String,Object> videoResearchActivefileupload(@RequestParam(value="file",required=false)MultipartFile file, HttpServletRequest request) throws Exception {
		Map<String, Object> map=new HashMap<String, Object>();
		logger.debug("videoResearchActivefileupload.do 上传临时目录  开始");
		String filename = file.getOriginalFilename();
		String name = RandomUtil.RanIntAndString(30) + "." + filename.substring(filename.lastIndexOf(".") + 1);
		String path = request.getSession().getServletContext().getRealPath("/upload/images/research/img");
		String url = request.getContextPath() + "/upload/images/research/imgs/" + name;
		System.out.println("path:"+path);
		System.out.println("url:"+url); 
		path = path + "\\" + name;
		File file2 = new File(path);
		if(!file2.exists()){
			file2.mkdirs();
		}
		file.transferTo(file2);
		map.put("status", 0);
		map.put("url", name);
		logger.debug("上传临时目录  结束");
		return map;
	}
	/**
	 * 删除数据
	 * @param researchActive 视频调研活动评选表
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/videoResearchActivedelteall.do")
	public Map<String,Object> videoResearchActivedelteall(OnlineEvaluationActive researchActive, HttpServletRequest request) throws Exception {
		Map<String, Object> map=new HashMap<String, Object>();
		logger.debug("videoResearchActivedelteall.do 删除数据  开始");
		try {
			videoResearchActiveService.deleteByAll(researchActive);
			map.put("status", 0);
			logger.debug(" 删除数据  结束");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			logger.debug(" 删除数据  异常",e);
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 单条删除
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoResearchActivefiledelete.do")
	public Map<String,Object> videoResearchActivefiledelete(HttpServletRequest request) {
		logger.debug("videoResearchActivefiledelete.do 文件单条删除  开始");
		String path=request.getParameter("url");
		Map<String,Object> map  = new HashMap<String, Object>();
		if(!"".equals(path) && path!=null){
			String pathname=path.substring(path.lastIndexOf("/")+1, path.length());
			String path1 = request.getSession().getServletContext().getRealPath("/upload/images/research/img");
			pathname=path1+"/"+pathname;
			File file=new File(pathname);
			if(file.exists()){
				if(file.isFile()){
					file.delete();
				}
			}
		}
		map.put("status", 0);
		map.put("success", "success");
		logger.debug(" 文件单条删除  结束");
		return map;
	}
	/**
	 * 默认删除临时文件
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoResearchActivefiledeleteAll.do")
	public Map<String,Object> videoResearchActivefiledeleteAll(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("videoResearchActivefiledeleteAll.do 默认删除临时目录地下的文件  开始");
//		System.out.println("开始删除临时目录");
		String path = request.getSession().getServletContext().getRealPath("/upload/images/research/img/");
		File file=new File(path);
		this.deletefile(file);
		logger.debug(" 默认删除临时目录地下的文件  结束");
		map.put("success", "success");
		
		return map;
	}
	public boolean deletefile(File file){
		logger.debug("开始删除指定目录或文件");
		if(file.exists()){
			if(file.isDirectory()){
				String[] filelist=file.list();
				if(filelist!=null){
					if(filelist.length>0){
						for(String s:filelist){
							boolean success=deletefile(new File(file,s));
							if(!success){
								return false;
							}
						}
					}
				}
			}
		}
		logger.debug("删除指定目录或文件   结束");
		return true;
//		return file.delete();
	}
	public String uploadImage(MultipartFile file, HttpServletRequest request) throws Exception {
		logger.debug("文件上传  开始");
		String filename = file.getOriginalFilename();
		System.out.println("11111");
		String name = RandomUtil.RanIntAndString(30) + "." + filename.substring(filename.lastIndexOf(".") + 1);
		String path = request.getSession().getServletContext().getRealPath("/upload/images/research/img");
		String url = request.getContextPath() + "/upload/images/research/img/" + name;
		System.out.println("path:"+path);
		System.out.println("url:"+url); 
		path = path + "\\" + name;
		File file2 = new File(path);
		file.transferTo(file2);
		logger.debug("文件上传  结束");
		return url;
	}
}
