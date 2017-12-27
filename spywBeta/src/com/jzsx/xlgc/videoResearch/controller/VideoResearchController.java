package com.jzsx.xlgc.videoResearch.controller;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.bean.VideoResearch;
import com.jzsx.xlgc.bean.VideoResearchActive;
import com.jzsx.xlgc.videoResearch.Service.VideoResearchActiveService;
import com.jzsx.xlgc.videoResearch.Service.VideoResearchRecordService;
import com.jzsx.xlgc.videoResearch.Service.VideoResearchService;
import com.jzsx.xlgc.videoResearch.bean.UResearch;
import com.jzsx.xlgc.videoResearch.bean.URuser;
import com.zte.ccs.os.meeting.util.RandomUtil;

@Controller
@RequestMapping("/videoResearch")
public class VideoResearchController {
	@Autowired
	private VideoResearchService videoResearchService;
	@Autowired
	private VideoResearchActiveService videoResearchActiveService;
	@Autowired
	private VideoResearchRecordService videoResearchRecordService;
	/**
	 * 加载视频培训首页数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/train.do")
	public Map<String,Object> test(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		List<VideoResearch> list = videoResearchService.queryVideoResearchList();
		map.put("map", list);
		return map;
	}
	/**
	 * 打开视频调研首页
	 * @param request
	 * @return
	 */
	@RequestMapping("/join.do")
	public String join(HttpServletRequest request ){
		
		return "redirect:/pages/videoResearch/videoResearch.html";
	}
	/**
	 * 加载视频调研列表数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoResearchlistjoin.do")
	public Map<String,Object> videotrainlistjoin(VideoResearch videoResearch,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		String pagesiz=request.getParameter("pagesize");
//		VideoResearch videoResearch=new VideoResearch();
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		String hcode=videoResearch.getVideoResearcCode();
		if(hcode==null || hcode.equals("")){
			CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
			String ucode="";
			if(appUser!=null){
				ucode=appUser.getUsergroupid().toString();
				if(ucode.length()>=3){
					videoResearch.setVideoResearcCode(ucode);
				}
//				videoNeighborhood.setVideoneihdLocationplace(appUser.getUserGroupId().toString());
			}
		}
		map=videoResearchService.queryVideoResearchByALl(videoResearch, pagesize, 8);
		return map;
	}
	@InitBinder
	protected void initBinder(WebDataBinder binder){
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	/**
	 * 查看详情数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoResearchdetail.do")
	public Map<String,Object> videoResearchdetail(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		String videoResearchId=request.getParameter("videoResearchId");
		System.out.println("videoResearchId:"+videoResearchId);
		if(!videoResearchId.equals("null")){
			System.out.println("已进入");
			VideoResearch videoResearch = videoResearchService.queyVideoResearchById(videoResearchId);
			List<VideoResearchActive> listResearchActives = videoResearchActiveService.queyVideoResearchById(videoResearchId);
			map.put("videoResearch", videoResearch);
			map.put("listResearchActives", listResearchActives);
			map.put("status", 0);
		}else{
			map.put("status", 1);
		}
		return map;
	}
	/**
	 * 根据视频调研列表数据ID做简单的删除
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
				videoResearchService.deleteById(videoId);
				videoResearchActiveService.deleteByParentId(videoId);
			int count=	videoResearchRecordService.deleteByParentId(videoId);
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
	 * 保存视频调研和视频调研活动评选数据
	 * @param uresearch 数组集合类
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/videoResearchSave.do",method = RequestMethod.POST)
	public Map<String,Object> videoResearchSave(UResearch uresearch,@RequestParam(value="votetype",required=false) String videoResearchType, HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
//		String videoId=request.getParameter("videoId");
		String researchId="";
		VideoResearch videoResearch=new VideoResearch();
		videoResearch.setVideoResearchName(uresearch.getActiveTitle());
		videoResearch.setVideoResearchRemark(uresearch.getDetailedAddress());
		String videoResearchId=request.getParameter("videoResearchId");
//		String videoResearchType=request.getParameter("votetype");
		if(!"".equals(videoResearchType) || !videoResearchType.equals(null)){
			videoResearch.setVideoResearchType(videoResearchType);
		}
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		Date startdate = null;
		try {
			startdate = sdf.parse(uresearch.getDateStart());
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Date stopdate = null;
		try {
			stopdate = sdf.parse(uresearch.getDateEnd());
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		videoResearch.setVideoResearchStarttime(startdate);
		videoResearch.setVideoResearchStoptime(stopdate);
		videoResearch.setVideoResearchTime(new Date());
//		videoResearch.setVideoResearchUsername(videoResearchUsername);
		String activeData=uresearch.getCandidateData();
		ArrayList<URuser> arraylist = JSON.parseObject(activeData, new TypeReference<ArrayList<URuser>>() {});
		List<VideoResearchActive> activelist=new ArrayList<VideoResearchActive>();
		if(!videoResearchId.equals("null")){
			researchId=videoResearchId;
		}else{
			researchId=RandomUtil.RanIntAndString(30);
		}
		for(URuser u:arraylist){
			VideoResearchActive videoResearchActive=new VideoResearchActive();
			videoResearchActive.setVideoActiveCard(u.getIdNumber());
			videoResearchActive.setVideoActivePath(u.getPictureUrl());
			videoResearchActive.setVideoActiveName(u.getName());
			videoResearchActive.setVideoActivephone(u.getPhone());
			videoResearchActive.setVideoActiveId(RandomUtil.RanIntAndString(30));
			videoResearchActive.setVideoResearchId(researchId);
			activelist.add(videoResearchActive);
		}
		try {
			if(!videoResearchId.equals("null")){
				researchId=videoResearchId;
				videoResearch.setVideoResearchId(researchId);
				videoResearchActiveService.deleteByParentId(researchId);
				videoResearchService.updateActive(videoResearch);
				for(VideoResearchActive va:activelist){
					videoResearchActiveService.insertActive(va);
				}
				uploadImage(request);
			}else{
//				researchId=RandomUtil.RanIntAndString(30);
				videoResearch.setVideoResearchId(researchId);
				CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
				if(appUser!=null){
					videoResearch.setVideoResearchRealName(appUser.getRealname());
					videoResearch.setVideoResearcCode(appUser.getUsergroupid().toString());
				}
				videoResearchService.insertActive(videoResearch);
				for(VideoResearchActive va:activelist){
					videoResearchActiveService.insertActive(va);
				}
				uploadImage(request);
			}
			map.put("success", "保存成功！");
			map.put("status", 0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("success", "保存失败！");
			map.put("status", -1);
			e.printStackTrace();
		}
		return map;
	}
	public void uploadImage(HttpServletRequest request) throws Exception {
		String path = request.getSession().getServletContext().getRealPath("/upload/images/research/img");
		String paths = request.getSession().getServletContext().getRealPath("/upload/images/research/imgs");
		File file=new File(path);
		File filepath=new File(paths);
		if(file.exists()){
			if(file.isDirectory()){
				String[] filelist=file.list();
				if(filelist!=null){
					if(filelist.length>0){
						for(String s:filelist){
							String sfile=path+"/"+s;
							System.out.println("String:"+sfile);
							File files=new File(sfile);
							System.out.println("Sfiles:"+files);
							if(filepath.exists()){
								System.out.println("目录存在");
								if(filepath.isDirectory()){
									System.out.println("是一个文件夹");
								}
							}
							FileUtils.copyFileToDirectory(files,filepath);
							System.out.println("删除");
							deletefile(files);
						}
					}
				}
			}
			System.out.println("exists:"+file);
		}
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
		return file.delete();
	}
}
