package com.jzsx.xlha.opinionSurvey.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.alibaba.fastjson.JSON;
import com.jzsx.xlha.bean.CasUser;
import com.jzsx.xlha.bean.ProblemPaper;
import com.jzsx.xlha.bean.ProblemPaperQuest;
import com.jzsx.xlha.bean.ProblemPaperQuestOption;
import com.jzsx.xlha.bean.ProblemPaperRecord;
import com.jzsx.xlha.opinionSurvey.service.ProblemPaperQuestOptionService;
import com.jzsx.xlha.opinionSurvey.service.ProblemPaperQuestService;
import com.jzsx.xlha.opinionSurvey.service.ProblemPaperRecordService;
import com.jzsx.xlha.opinionSurvey.service.ProblemPaperService;
import com.jzsx.xlha.util.RandomUtil;

@Controller
@RequestMapping("/opinionSurvey")
public class ProblemPaperController {
	Logger logger=Logger.getLogger(ProblemPaperController.class);
	@Autowired
	private ProblemPaperService problemPaperService;
	@Autowired
	private ProblemPaperQuestService problemPaperQuestService;
	@Autowired
	private ProblemPaperQuestOptionService problemPaperQuestOptionService;
	@Autowired
	private ProblemPaperRecordService problemPaperRecordService;
	/**
	 * 根据条件加载数据
	 * @param problemPaper
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/problemPaperlistjoin.do")
	public Map<String,Object> problemPaperlistjoin(ProblemPaper problemPaper,
			HttpServletRequest request,
			@RequestParam(value="sizePage",required=false)String pageNum
			) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("problemPaperlistjoin.do  问卷调查根据条件加载数据开始");
		String pagesiz=request.getParameter("pagesize");
		logger.debug("参数 标题："+problemPaper.getProblempaperName());
		logger.debug("参数 发布时间——开始："+problemPaper.getProblempaperStarttime()+"--结束："+problemPaper.getProblempaperStoptime());
//		VideoResearch videoResearch=new VideoResearch();
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		int pagenum=10;
		if(!"".equals(pageNum) && pageNum!=null){
			pagenum=Integer.parseInt(pageNum);
		}
		map=problemPaperService.queryByAll(problemPaper, pagesize, pagenum);
//		System.out.println("map:"+map);
//		System.out.println("json已进入");
//		List<ProblemPaper> list = problemPaperService.querylist();
//		System.out.println("list:"+list);
//		map.put("list", list);
//		map.put("total", 2);
		logger.debug("问卷调查根据条件加载数据  结束");
		return map;
	}
	/**
	 * 问卷调查记录根据条件加载数据
	 * @param problemPaper
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/problemPaperRecordlistjoin.do")
	public Map<String,Object> problemPaperRecordlistjoin(ProblemPaperRecord problemPaperRecord,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("problemPaperRecordlistjoin.do  问卷调查记录根据条件加载数据开始");
		logger.debug("参数 标题："+problemPaperRecord.getPaperRecordtitle());
		logger.debug("参数 时间 --开始："+problemPaperRecord.getPaperRecordTime()+"--结束："+problemPaperRecord.getPaperRecordStoptime());
		String pagesiz=request.getParameter("pagesize");
//		VideoResearch videoResearch=new VideoResearch();
		int pagesize=0;
		if(!"".equals(pagesiz) && pagesiz!=null){
			pagesize=Integer.parseInt(pagesiz);
		}
		map=problemPaperRecordService.queryByAll(problemPaperRecord, pagesize, 8);
//		System.out.println("map:"+map);
		logger.debug("问卷调查记录根据条件加载数据  结束");
		return map;
	}
	@InitBinder
	protected void initBinder(WebDataBinder binder){
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	/**
	 * 删除数据
	 * @param problempaperId
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/problemPaperDelete.do")
	public Map<String,Object> problemPaperDelete(@RequestParam(value="problempaperId",required=false)String problempaperId, HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("problemPaperDelete.do  删除数据  开始");
		try {
			List<ProblemPaperQuest> list = problemPaperQuestService.queryByParentId(problempaperId);
			if(list!=null){
				if(list.size()>0){
					for(ProblemPaperQuest q:list){
						 problemPaperQuestOptionService.deleteByParentId(q.getPaperquestId());
					 }
				}
			}
			 problemPaperQuestService.deleteByParentId(problempaperId);
			 problemPaperService.deleteById(problempaperId);
			map.put("success", "删除成功！");
			map.put("status", 0);
			logger.debug("删除数据   结束");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("success", "删除失败！");
			map.put("status", -1);
			logger.info("删除数据   异常",e);
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 根据ID获取数据
	 * @param uresearch
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/problemPaperDetial.do")
	public Map<String,Object> problemPaperDetial(@RequestParam(value="problempaperId",required=false)String problempaperId, HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("problemPaperDetial.do  根据ID获取数据  开始");
		logger.debug("参数  problempaperId"+problempaperId);
		try {
			ProblemPaper problempaper = problemPaperService.queryById(problempaperId);
			map.put("problempaper",problempaper);
			map.put("status", 0);
			logger.debug(" 根据ID获取数据  结束");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			logger.info(" 根据ID获取数据  异常",e);
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 试卷统计
	 * @param problempaperId
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/problemPaperRecord.do")
	public Map<String,Object> problemPaperRecord(@RequestParam(value="problempaperId",required=false)String problempaperId, HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
//		Map<String, Object> areamap=new HashMap<String, Object>();
//		Map<String, Object> exammap=new HashMap<String, Object>();
		logger.debug("problemPaperRecord.do  试卷统计  开始");
		logger.debug("参数  problempaperId"+problempaperId);
		Map<String, Object> datamap=new HashMap<String, Object>();
		try {
//			List<ProblemPaperRecord> ralist = problemPaperRecordService.queryByPaperIdOfArea(problempaperId);
//			if(ralist!=null){
//				if(ralist.size()>0){
//					List<Map<String,Object>> hashlist=new ArrayList<Map<String,Object>>();
//					for(ProblemPaperRecord record:ralist){
//						Map<String, Object> hashmap=new HashMap<String, Object>();
//						hashmap.put("name", record.getPaperRecordCode());
//						if(record.getPaperRecordId()!=null && record.getPaperRecordId()!=""){
//							hashmap.put("poll", record.getPaperRecordId());
//						}else{
//							hashmap.put("poll", 0);
//						}
//						hashlist.add(hashmap);
//					}
//					datamap.put("area", hashlist);
//				}
//			}
			List<ProblemPaperRecord> rnlist = problemPaperRecordService.queryBypaperIdOfname(problempaperId);
			List<Map<String,Object>> answerlist=new ArrayList<Map<String,Object>>();
			if(rnlist!=null){
				if(rnlist.size()>0){
					List<Map<String,Object>> hashlist=new ArrayList<Map<String,Object>>();
					Map<String, Object> answermap=new HashMap<String, Object>();
					String resultremark="";
					for(ProblemPaperRecord record:rnlist){
						Map<String, Object> hashmap=new HashMap<String, Object>();
						hashmap.put("item", record.getPaperRecordCode());
						if(record.getPaperRecordId()!=null && record.getPaperRecordId()!=""){
							hashmap.put("poll", record.getPaperRecordId());
						}else{
							hashmap.put("poll", 0);
						}
						System.out.println("hashlist1:"+hashlist);
						int index=(rnlist.lastIndexOf(record))+1;
						//不等于上一次循环的值
						if(!record.getPaperRecordRemark().equals(resultremark)){
							if(!resultremark.equals("")){
								answermap.put("question", resultremark);
								answermap.put("answer", hashlist);
								answerlist.add(answermap);
								answermap=new HashMap<String, Object>();
								hashlist=new ArrayList<Map<String,Object>>();
								System.out.println("hashlist2:"+hashlist);
							}
						}
						hashlist.add(hashmap);
						resultremark=record.getPaperRecordRemark();
						//最后一次
						if(index==rnlist.size()){
							answermap.put("question", resultremark);
							answermap.put("answer", hashlist);
							answerlist.add(answermap);
						}
					}
					datamap.put("examination", answerlist);
					datamap.put("title", rnlist.get(0).getPaperRecordUserName()) ;
				}
			}
			logger.debug(" 试卷统计  结束");
			map.put("data",datamap);
			map.put("status", 0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			logger.info(" 试卷统计  异常",e);
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 保存数据
	 * @param title
	 * @param questionBank
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/problemPaperSave.do")
	public Map<String,Object> problemPaperSave(
			@RequestParam(value="title",required=false)String title,
			@RequestParam(value="questionBank",required=false)String questionBank,
			@RequestParam(value="dateStart",required=false)Date startDate,
			@RequestParam(value="dateEnd",required=false)Date stopDate
			, HttpServletRequest request) {
		logger.debug("problemPaperSave.do 保存数据 开始 ");
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("参数  title: "+title);
		logger.debug("参数  questionBank: "+questionBank);
		logger.debug("参数  startDate: "+startDate);
		logger.debug("参数  stopDate: "+stopDate);
//		System.out.println("title:"+title);
		List<Map> list = JSON.parseArray(questionBank, Map.class);
		Map<Object,Object> hashmap=new HashMap<Object, Object>();
		List<ProblemPaperQuest> questlist=new ArrayList<ProblemPaperQuest>();
		List<ProblemPaperQuestOption> optionlist=new ArrayList<ProblemPaperQuestOption>();
		String paperId=RandomUtil.RanIntAndString(30);
		ProblemPaper paper=new ProblemPaper();
		paper.setProblempaperId(paperId);
		paper.setProblempaperName(title);
		paper.setProblempaperStarttime(startDate);
		paper.setProblempaperStoptime(stopDate);
		paper.setProblempaperTime(new Date());
		CasUser appUser =  (CasUser) request.getSession().getAttribute("user");
		if(appUser!=null){
			paper.setProblempaperUsername(appUser.getRealname());
			paper.setProblempaperCode(appUser.getUsergroupid().toString());
		}
		if(list!=null){
			if(list.size()>0){
				for(int i=0;i<list.size();i++){
					hashmap=list.get(i);
					String questId=RandomUtil.RanIntAndString(30);
					ProblemPaperQuest paperQuest=new ProblemPaperQuest();
					paperQuest.setPaperquestId(questId);
					paperQuest.setPaperquestName(String.valueOf(hashmap.get("question")));
					paperQuest.setPaperquestProblemId(paperId);
					questlist.add(paperQuest);
					List listr = JSON.parseArray(String.valueOf(hashmap.get("answer")));
					for(int j=0;j<listr.size();j++){
						ProblemPaperQuestOption questOption=new ProblemPaperQuestOption();
						questOption.setPaperquestOptionId(RandomUtil.RanIntAndString(30));
						questOption.setPaperquestOptionName(String.valueOf(listr.get(j)));
						questOption.setPaperquestOptionQuestId(questId);
						optionlist.add(questOption);
					}
				}
			}
		}
		try {
			problemPaperService.insertActive(paper);
			if(questlist!=null){
				if(questlist.size()>0){
					for(ProblemPaperQuest quest:questlist){
						problemPaperQuestService.insertActive(quest);
					}
				}
			}
			if(optionlist!=null){
				if(optionlist.size()>0){
					for(ProblemPaperQuestOption option:optionlist){
						problemPaperQuestOptionService.insertActive(option);
					}
				}
			}
			logger.debug("保存数据 结束 ");
			map.put("success", "保存成功！");
			map.put("status", 0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.info("保存数据 异常 ",e);
			map.put("success", "保存失败！");
			map.put("status", -1);
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 试卷答题保存
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/problemPaperrecordSave.do")
	public Map<String,Object> problemPaperrecordSave(@RequestParam(value="ansArr",required=false)String questoptinId,
			@RequestParam(value="problempaperId",required=false)String problempaperId,
			@RequestParam(value="realName",required=false)String realName,
			@RequestParam(value="areaCode",required=false)String areaCode,
			HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("problemPaperrecordSave.do 试卷答题保存   开始 ");
		logger.debug("参数  questoptinId："+questoptinId);
		logger.debug("参数  problempaperId： "+problempaperId);
		List<Map> questoptionlist=JSON.parseArray(questoptinId,Map.class);
		try {
			ProblemPaperRecord record=new ProblemPaperRecord();
			record.setPaperRecordPaperId(problempaperId);
			CasUser appUser =  (CasUser) request.getSession().getAttribute("user");
			if(appUser!=null){
				record.setPaperRecordCode(appUser.getUsergroupid().toString());
				record.setPaperRecordUserName(appUser.getRealname());
				logger.debug("进入判断-appUser-不为null并进入赋值查询");
			}
			if((realName!=null && !"".equals(realName))&&(areaCode!=null && !"".equals(areaCode))){
				record.setPaperRecordCode(areaCode);
				record.setPaperRecordUserName(realName);
				logger.debug("进入判断-realName-areaCode-不为null并进入赋值查询");
			}
			int count=problemPaperRecordService.queryByCount(record);
			logger.debug("realName:"+realName);
			logger.debug("areaCode:"+areaCode);
			logger.debug("appUser:"+appUser);
			if((realName==null || "".equals(realName))&& (areaCode==null || "".equals(areaCode)) && appUser==null){
				count=0;
				questoptionlist=null;
				map.put("status", -3);
				map.put("success", "请登录后答题");
				logger.debug("进入判断-realName-areaCode-appUser-为null");
			}
			if(count>=1){
				questoptionlist=null;
				map.put("status", -2);
				map.put("success", "请不要重复答题");
			}
			if(questoptionlist!=null){
				if(questoptionlist.size()>0){
					for(int i=0;i<questoptionlist.size();i++){
						map=questoptionlist.get(i);
						ProblemPaperRecord paperRecord=new ProblemPaperRecord();
						paperRecord.setPaperRecordId(RandomUtil.RanIntAndString(30));
						paperRecord.setPaperRecordPaperId(problempaperId);
						paperRecord.setPaperRecordOptionId(String.valueOf(map.get("answerId")));
						paperRecord.setPaperRecordQuestId(String.valueOf(map.get("quesId")));
						paperRecord.setPaperRecordTime(new Date());
						paperRecord.setPaperRecordIp(request.getRemoteHost());
						if((realName!=null && !"".equals(realName))&&(areaCode!=null && !"".equals(areaCode))){
							paperRecord.setPaperRecordCode(areaCode);
							paperRecord.setPaperRecordUserName(realName);
							logger.debug("进入判断-realName-areaCode-不为null并进入赋值");
						}
						if(appUser!=null){
							paperRecord.setPaperRecordCode(appUser.getUsergroupid().toString());
							paperRecord.setPaperRecordUserName(appUser.getRealname());
							logger.debug("进入判断-appUser-不为null并进入赋值");
						}
						problemPaperRecordService.insertActive(paperRecord);
						
					}
					map.put("status", 0);
					map.put("success", "答题成功");
				}
			}
			logger.debug(" 试卷答题保存   结束 ");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			map.put("success", "答题失败");
			logger.info(" 试卷答题保存   异常 ",e);
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 保存测试试卷
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/problemPaperSavejson.do")
	public Map<String,Object> problemPaperSavejson( HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("problemPaperSavejson.do 保存测试试卷   开始 测试");
		List<ProblemPaper> paperlist=new ArrayList<ProblemPaper>();
		List<ProblemPaperQuest> questlist=new ArrayList<ProblemPaperQuest>();
		List<ProblemPaperQuestOption> optionlist=new ArrayList<ProblemPaperQuestOption>();
		for(int i=0;i<10;i++){
			ProblemPaper problemPaper=new ProblemPaper();
			String paperId=RandomUtil.RanIntAndString(30);
			problemPaper.setProblempaperId(paperId);
			problemPaper.setProblempaperName(RandomUtil.RanLowerString(10));
			problemPaper.setProblempaperTime(new Date());
			problemPaper.setProblempaperStarttime(new Date());
			problemPaper.setProblempaperStoptime(new Date());
//			AppUser appUser = (AppUser) request.getSession().getAttribute("appUser");
//			if(appUser!=null){
//				problemPaper.setProblempaperUsername(appUser.getRealName());
//				problemPaper.setProblempaperCode(appUser.getUserGroupId().toString());
//			}
			paperlist.add(problemPaper);
			for(int j=0;j<10;j++){
				ProblemPaperQuest problemPaperQuest=new ProblemPaperQuest();
				String questId=RandomUtil.RanIntAndString(30);
				problemPaperQuest.setPaperquestId(questId);
				problemPaperQuest.setPaperquestName(RandomUtil.RanLowerString(10));
				problemPaperQuest.setPaperquestProblemId(paperId);
				questlist.add(problemPaperQuest);
				for(int n=0;n<10;n++){
					ProblemPaperQuestOption paperQuestOption=new ProblemPaperQuestOption();
					paperQuestOption.setPaperquestOptionId(RandomUtil.RanIntAndString(30));
					paperQuestOption.setPaperquestOptionName(RandomUtil.RanLowerString(10));
					paperQuestOption.setPaperquestOptionQuestId(questId);
					optionlist.add(paperQuestOption);
				}
			}
		}
		try {
			for(ProblemPaper pa:paperlist){
				problemPaperService.insertActive(pa);
			}
			for(ProblemPaperQuest qu:questlist){
				problemPaperQuestService.insertActive(qu);
			}
			for(ProblemPaperQuestOption op:optionlist){
				problemPaperQuestOptionService.insertActive(op);
			}
			map.put("success", "保存成功！");
			map.put("status", 0);
			logger.debug("problemPaperSavejson.do 保存测试试卷   结束 测试");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("success", "保存失败！");
			map.put("status", -1);
			logger.info(" 保存测试试卷   异常 测试",e);
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 暂时没用，重复
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/problemPaperrecord1.do")
	public Map<String,Object> problemPaperrecord(HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		try {
			ProblemPaperRecord paperRecord=new ProblemPaperRecord();
			ProblemPaper paper = problemPaperService.queryById("1G5K1C1P8Y5A7X2L1M3O9W0B1S5N7Q");
			List<ProblemPaperQuest> questlist = problemPaperQuestService.queryByParentId("1G5K1C1P8Y5A7X2L1M3O9W0B1S5N7Q");
			for(ProblemPaperQuest quest:questlist){
				System.out.println("进入第一个");
				List<ProblemPaperQuestOption> optionlist = problemPaperQuestOptionService.queryByParentId(quest.getPaperquestId());
				for(ProblemPaperQuestOption option :optionlist){
					System.out.println("进入第二个");
					paperRecord.setPaperRecordId(RandomUtil.RanIntAndString(30));
					paperRecord.setPaperRecordPaperId(paper.getProblempaperId());
					paperRecord.setPaperRecordOptionId(option.getPaperquestOptionId());
					paperRecord.setPaperRecordQuestId(quest.getPaperquestId());
					paperRecord.setPaperRecordTime(new Date());
//					AppUser appUser = (AppUser) request.getSession().getAttribute("appUser");
//					if(appUser!=null){
//						paperRecord.setPaperRecordUserName(appUser.getRealName());
//						paperRecord.setPaperRecordCode(appUser.getUserGroupId().toString());
//					}
					problemPaperRecordService.insertActive(paperRecord);
				}
			}
			map.put("status", 0);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			map.put("status", -1);
			e.printStackTrace();
		}
		return map;
	}
}
