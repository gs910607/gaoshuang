package com.jzsx.xlha.onlineEvaluating.controller;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.jzsx.xlha.bean.OnlineEvaluation;
import com.jzsx.xlha.bean.OnlineEvaluationActive;
import com.jzsx.xlha.onlineEvaluating.bean.UResearch;
import com.jzsx.xlha.onlineEvaluating.bean.URuser;
import com.jzsx.xlha.onlineEvaluating.service.OnlineEvaluationActiveService;
import com.jzsx.xlha.onlineEvaluating.service.OnlineEvaluationRecordService;
import com.jzsx.xlha.onlineEvaluating.service.OnlineEvaluationService;
import com.jzsx.xlha.util.RandomUtil;

@Controller
@RequestMapping("/onlineEvaluating")
public class OnlineEvaluationController {
	Logger logger =Logger.getLogger(OnlineEvaluationController.class);
	@Autowired
	private OnlineEvaluationService videoResearchService;
	@Autowired
	private OnlineEvaluationActiveService videoResearchActiveService;
	@Autowired
	private OnlineEvaluationRecordService videoResearchRecordService;
	/**
	 * 加载视频培训首页数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/train.do")
	public Map<String,Object> test(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		List<OnlineEvaluation> list = videoResearchService.queryVideoResearchList();
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
	public Map<String,Object> videotrainlistjoin(OnlineEvaluation evaluation,
			HttpServletRequest request,
			@RequestParam(value="sizePage",required=false)String pageNum
			) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("videoResearchlistjoin.do 加载视频调研列表数据 开始");
		String pagesiz=request.getParameter("pagesize");
		
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		int pagenum=10;
		if(!"".equals(pageNum) && pageNum!=null){
			pagenum=Integer.parseInt(pageNum);
		}
		/**
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
		**/
//		logger.debug("参数  code:"+evaluation.getVideoResearcCode());
		map=videoResearchService.queryVideoResearchByALl(evaluation, pagesize, pagenum);
		logger.debug("加载视频调研列表数据 结束");
		return map;
	}
	
	/**
	 * 加载视频调研列表数据app接口
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoResearchAppjoin.do")
	public Map<String,Object> videoResearchAppjoin(OnlineEvaluation evaluation,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("videoResearchAppjoin.do 加载视频调研列表数据app接口 开始");
		try {
			String pagesiz=request.getParameter("pagesize");
			String pagenu=request.getParameter("pagenum");
			int pagesize=0;
			if(!"".equals(pagesiz) && pagesiz!=null){
				pagesize=Integer.parseInt(pagesiz);
			}
			int pagenum=0;
			if(!"".equals(pagenu) && pagenu!=null){
				pagenum=Integer.parseInt(pagenu);
			}
			map=videoResearchService.queryVideoResearchByALl(evaluation, pagesize, pagenum);
			map.put("status", 1);
			logger.debug("加载视频调研列表数据app接口 结束");
		} catch (NumberFormatException e) {
			map.put("status", -1);
			logger.info("加载视频调研列表数据app接口  异常",e);
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
	 * 查看详情数据
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/videoResearchdetail.do")
	public Map<String,Object> videoResearchdetail(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("videoResearchdetail.do 查看详情数据 开始");
		String videoResearchId=request.getParameter("videoResearchId");
		logger.debug("参数  videoResearchId:"+videoResearchId);
//		System.out.println("videoResearchId:"+videoResearchId);
		if(!videoResearchId.equals("null")){
			System.out.println("已进入");
			OnlineEvaluation videoResearch = videoResearchService.queyVideoResearchById(videoResearchId);
			List<OnlineEvaluationActive> listResearchActives = videoResearchActiveService.queyVideoResearchById(videoResearchId);
			map.put("videoResearch", videoResearch);
			map.put("listResearchActives", listResearchActives);
			map.put("status", 0);
		}else{
			map.put("status", 1);
		}
		logger.debug(" 查看详情数据 结束");
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
		logger.debug("deletevideoTrain.do 根据视频调研列表数据ID做简单的删除 开始");
		String videoId=request.getParameter("videoId");
		logger.debug("参数  videoId:"+videoId);
		if(!"".equals(videoId) || !videoId.equals(null)){
			try {
				videoResearchService.deleteById(videoId);
				videoResearchActiveService.deleteByParentId(videoId);
			int count=	videoResearchRecordService.deleteByParentId(videoId);
				map.put("success", "删除成功");
				logger.debug(" 根据视频调研列表数据ID做简单的删除 结束");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				map.put("success", "删除失败");
				logger.info(" 根据视频调研列表数据ID做简单的删除  异常",e);
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
		logger.debug("videoResearchSave.do 保存视频调研和视频调研活动评选数据 开始");
		logger.debug("参数  videoResearchType："+videoResearchType);
		logger.debug("参数  title："+uresearch.getActiveTitle());
		logger.debug("参数 sartDate："+uresearch.getDateStart());
		logger.debug("参数  stopDate："+uresearch.getDateEnd());
		logger.debug("参数  remark："+uresearch.getDetailedAddress());
		logger.debug("参数  CandidateData："+uresearch.getCandidateData());
//		String videoId=request.getParameter("videoId");
		String researchId="";
		OnlineEvaluation videoResearch=new OnlineEvaluation();
	//	videoResearch.setVideoResearchId(researchId);
		videoResearch.setVideoResearchName(uresearch.getActiveTitle());
		videoResearch.setVideoResearchRemark(uresearch.getDetailedAddress());
		String videoResearchId=request.getParameter("videoResearchId");
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
//		videoResearch.setVideoResearchVoteNumber(uresearch.getVotetypenumber());
//		videoResearch.setVideoResearchUsername(videoResearchUsername);
		String activeData=uresearch.getCandidateData();
		ArrayList<URuser> arraylist = JSON.parseObject(activeData, new TypeReference<ArrayList<URuser>>() {});
		List<OnlineEvaluationActive> activelist=new ArrayList<OnlineEvaluationActive>();
		if(!videoResearchId.equals("null")){
			researchId=videoResearchId;
		}else{
			researchId=RandomUtil.RanIntAndString(30);
		}
		for(URuser u:arraylist){
			OnlineEvaluationActive videoResearchActive=new OnlineEvaluationActive();
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
				for(OnlineEvaluationActive va:activelist){
					videoResearchActiveService.insertActive(va);
				}
				uploadImage(request);
			}else{
//				researchId=RandomUtil.RanIntAndString(30);
				videoResearch.setVideoResearchId(researchId);
//			AppUser appUser = (AppUser) request.getSession().getAttribute("appUser");
//			if(appUser!=null){
//				videoResearch.setVideoResearchRealName(appUser.getRealName());
//			}
			videoResearchService.insertActive(videoResearch);
			for(OnlineEvaluationActive va:activelist){
				videoResearchActiveService.insertActive(va);
			}
				uploadImage(request);
			}
			map.put("success", "保存成功！");
			map.put("status", 0);
			logger.debug("保存视频调研和视频调研活动评选数据 结束");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("success", "保存失败！");
			map.put("status", -1);
			logger.info("保存视频调研和视频调研活动评选数据 异常");
			e.printStackTrace();
		}
		return map;
	}
	public void uploadImage(HttpServletRequest request) throws Exception {
		logger.debug(" 文件上传 开始");
		String path = request.getSession().getServletContext().getRealPath("/upload/images/research/img");
		Properties prop=new Properties();
		prop.load(this.getClass().getResourceAsStream("/safenessPublicity.properties"));
		String publictyurl=prop.getProperty("safe_Publicity_url");
		String paths = publictyurl;
		File file=new File(path);
		File filepath=new File(paths);
		if(file.exists()){
			if(file.isDirectory()){
				String[] filelist=file.list();
				if(filelist!=null){
					if(filelist.length>0){
						for(String s:filelist){
							String sfile=path+"/"+s;
//							System.out.println("String:"+sfile);
							File files=new File(sfile);
//							System.out.println("Sfiles:"+files);
							if(filepath.exists()){
//								System.out.println("目录存在");
								if(filepath.isDirectory()){
//									System.out.println("是一个文件夹");
								}
							}
							FileUtils.copyFileToDirectory(files,filepath);
							logger.debug(" 删除临时文件或目录  开始");
//							System.out.println("删除");
							deletefile(files);
							logger.debug(" 删除临时文件或目录  结束");
						}
					}
				}
			}
//			System.out.println("exists:"+file);
		}
		logger.debug(" 文件上传 结束");
	}
	public boolean deletefile(File file){
		logger.debug(" 删除文件或目录  开始");
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
		logger.debug(" 删除文件或目录  结束");
		return file.delete();
	}
}
