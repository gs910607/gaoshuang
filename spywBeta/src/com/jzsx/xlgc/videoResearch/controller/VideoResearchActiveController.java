package com.jzsx.xlgc.videoResearch.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.bean.ProblemPaperRecord;
import com.jzsx.xlgc.bean.VideoResearch;
import com.jzsx.xlgc.bean.VideoResearchActive;
import com.jzsx.xlgc.bean.VideoResearchRecord;
import com.jzsx.xlgc.videoResearch.Service.VideoResearchActiveService;
import com.jzsx.xlgc.videoResearch.Service.VideoResearchRecordService;
import com.jzsx.xlgc.videoResearch.Service.VideoResearchService;
import com.zte.ccs.os.meeting.util.RandomUtil;

@Controller
@RequestMapping("/videoResearch")
public class VideoResearchActiveController {
	@Autowired
	private VideoResearchActiveService videoResearchActiveService;
	@Autowired
	private VideoResearchRecordService videoResearchRecordService;
	@Autowired
	private VideoResearchService videoResearchService;
	/**
	 * 加载视频调研活动评选首页数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/trainActive.do")
	public Map<String,Object> test(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		List<VideoResearchActive> list = videoResearchActiveService.queryVideoResearchActiveList();
		map.put("map", list);
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
		String videoResearchId=request.getParameter("videoResearchId");
		List<VideoResearchActive> list=null;
		VideoResearch videoResearch=null;
		if(!"".equals(videoResearchId) && videoResearchId!=null){
			 videoResearch = videoResearchService.queyVideoResearchById(videoResearchId);
			
			  list = videoResearchActiveService.queyVideoResearchById(videoResearchId);
		}
		String pagesiz=request.getParameter("pagesize");
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		String ResearchType=videoResearch.getVideoResearchType();
	//	request.getRemoteHost());request.getRemoteAddr();
		VideoResearchRecord researchRecord=new VideoResearchRecord();
		researchRecord.setVideoResearchReId(videoResearchId);
		researchRecord.setVideoResearchReIp(request.getRemoteHost());
		if(!ResearchType.equals("1")){
			researchRecord.setVideoResearchTime(sdf.format(new Date()));
		}
		researchRecord.setVideoResearchType(videoResearch.getVideoResearchType());
		List<VideoResearchRecord> Rlist = videoResearchRecordService.queyVideoResearchRecordById(researchRecord);
		int restype=1;
		if(Rlist!=null){
			if(ResearchType.equals("1")){
				if(Rlist.size()>=1){
					restype=3;
				}
			}else if(ResearchType.equals("2")){
				if(Rlist.size()>=1){
					restype=4;
				}
			}else if(ResearchType.equals("3")){
				if(Rlist.size()>=5){
					restype=5;
				}
			}
		}
		
		map.put("Rlist", restype);
		map.put("list", list);
		map.put("videoResearch", videoResearch);
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
	public Map<String,Object> researchRecordlistjoin(VideoResearchRecord researchRecord,HttpServletRequest request) {
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
		String videoResearchId=request.getParameter("videoResearchId");
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
		return map;
	}
	/**
	 * 视频调研活动评选票数累加
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoResearchActiveVote.do")
	public Map<String,Object> videoResearchActiveVote(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		String videoResearchId=request.getParameter("videoResearchId");
		String researchId=request.getParameter("researchId");
		String videoResearchType=request.getParameter("videoResearchType");
		System.out.println(researchId);
		System.out.println("id:"+videoResearchId);
		List<VideoResearchActive> list=null;
		if((!"".equals(videoResearchId) && videoResearchId!=null)&&(!"".equals(researchId)&& researchId!=null)&&(!"".equals(videoResearchType)&& videoResearchType!=null)){
			  try {
				videoResearchActiveService.updatevideoResearchById(videoResearchId);
				SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			//	request.getRemoteHost());request.getRemoteAddr();
				VideoResearchRecord researchRecord=new VideoResearchRecord();
				researchRecord.setVideoResearchReId(researchId);
				researchRecord.setVideoResearchReIp(request.getRemoteHost());
				researchRecord.setVideoResearchTime(sdf.format(new Date()));
				researchRecord.setVideoResearchType(videoResearchType);
				CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
				if(appUser!=null){
					researchRecord.setVideoResearchRealName(appUser.getRealname());
					researchRecord.setVideoResearchCode(appUser.getUsergroupid().toString());
				}
				videoResearchRecordService.insertActive(researchRecord);
				map.put("status", 0);
				map.put("success", "success");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				map.put("status", 1);
				map.put("success", "error");
				e.printStackTrace();
			}
		}
		String pagesiz=request.getParameter("pagesize");
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		System.out.println(list);
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
	@RequestMapping(value="/videoResearchActivefileupload.do",produces="text/html;charset=utf-8")
	public String videoResearchActivefileupload(@RequestParam(value="file",required=false)MultipartFile file, HttpServletRequest request) throws Exception {
		Map<String, Object> map=new HashMap<String, Object>();
		String filename = file.getOriginalFilename();
		String name = RandomUtil.RanIntAndString(30) + "." + filename.substring(filename.lastIndexOf(".") + 1);
		String path = request.getSession().getServletContext().getRealPath("/upload/images/research/img");
		String url = "http://" + request.getServerName() //服务器地址    
		        + ":"     
		        + request.getServerPort()+request.getContextPath() + "/upload/images/research/imgs/" + name;
		System.out.println("path:"+path);
		System.out.println("url:"+url); 
		path = path + "\\" + name;
		File file2 = new File(path);
		file.transferTo(file2);
		map.put("status", 0);
		map.put("url", url);
		return JSON.toJSONString(map);
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
	public Map<String,Object> videoResearchActivedelteall(VideoResearchActive researchActive, HttpServletRequest request) throws Exception {
		Map<String, Object> map=new HashMap<String, Object>();
		try {
			videoResearchActiveService.deleteByAll(researchActive);
			map.put("status", 0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
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
		System.out.println("开始删除临时目录");
		String path = request.getSession().getServletContext().getRealPath("/upload/images/research/img/");
		File file=new File(path);
		this.deletefile(file);
		map.put("success", "success");
		return map;
	}
	public boolean deletefile(File file){
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
		return true;
//		return file.delete();
	}
	public String uploadImage(MultipartFile file, HttpServletRequest request) throws Exception {
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
		return url;
	}
}
