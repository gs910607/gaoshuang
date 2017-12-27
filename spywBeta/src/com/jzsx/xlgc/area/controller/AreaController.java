package com.jzsx.xlgc.area.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SimplePropertyPreFilter;
import com.google.common.base.Strings;
import com.jzsx.xlgc.area.Service.AreaService;
import com.jzsx.xlgc.bean.Area;
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.utils.SessionUtil;

@Controller
@RequestMapping("/area")
public class AreaController {

	@Autowired
	private AreaService areaService;

	/**
	 * 查询所有数据
	 * 
	 * @param area
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/arealist.do")
	public Map<String, Object> arealist(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Area> list = areaService.queryList();
		CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
		if (appUser != null) {
			map.put("code", appUser.getUsergroupid());
		}
		map.put("list", list);
		return map;
	}

	/**
	 * 根据条件查询，mybatis没有写对应条件查询
	 * 
	 * @param area
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/arealistByAll.do")
	public Map<String, Object> arealistByAll(Area area, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Area> list = areaService.queryByALl(area);
		CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
		if (appUser != null) {
			map.put("code", appUser.getUsergroupid());
		}
		map.put("list", list);
		return map;
	}

	/**
	 * 根据code查询地区数据
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/arealistByCode.do")
	public Map<String, Object> arealistByCode(@RequestParam(value = "code", required = false) String code,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		Area area = areaService.queryByCode(code);
		CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
		if (appUser != null) {
			map.put("code", appUser.getUsergroupid());
		}
		map.put("list", area);
		return map;
	}

	/**
	 * 根据ID查询地区数据
	 * 
	 * @param id
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/arealistById.do")
	public Map<String, Object> arealistById(@RequestParam(value = "id", required = false) String id,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		Area area = areaService.queryById(id);
		CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
		if (appUser != null) {
			map.put("code", appUser.getUsergroupid());
		}
		map.put("list", area);
		return map;
	}

	/**
	 * 根据父code查找数据
	 * 
	 * @param parentId
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/arealistByPartendId.do")
	public Map<String, Object> arealistByPartendId(@RequestParam(value = "parentId", required = false) String parentId,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Area> list = areaService.queryByParentId(parentId);
		CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
		if (appUser != null) {
			map.put("code", appUser.getUsergroupid());
		}
		map.put("list", list);
		return map;
	}
	/**
	 * 根据父code查找子类数据app接口
	 * 
	 * @param parentId
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/arealistByChildrens.do",method=RequestMethod.POST)
	public Map<String, Object> arealistByChildrens( String parentId,@RequestParam(required=false,value="type")String type,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		Calendar calendar=Calendar.getInstance();
		long b=calendar.getTimeInMillis();
		try {
			if(parentId!=null && parentId!=""){
				List<Area> list = new ArrayList<Area>();
				if(parentId.equals("1")){
					parentId="0";
					list=areaService.queryBychilds(parentId);
					parentId="1";
				}else{
					list=areaService.queryBychilds(parentId);
				}
				if(type!=null){
					System.out.println("type:"+type);
					if(type.equals("2")){
						CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
						if (appUser != null) {
							System.out.println("code"+appUser.getUsergroupid());
							parentId=appUser.getUsergroupid().toString();
							list=areaService.queryBychilds(appUser.getUsergroupid().toString());
						}
					}
				}
				list=queryareajson(list,parentId);
				Calendar calenda=Calendar.getInstance();
				long c=calenda.getTimeInMillis();
				System.out.println("开始："+b);
				System.out.println("结束："+c);
				System.out.println("耗时："+(c-b));
				System.out.println("list:"+list);
				map.put("parentId", parentId);
				map.put("status", 1);
				map.put("list", list);
				map.put("msg", "成功！");
			}else{
				map.put("parentId", parentId);
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
	 * 对所属地区进行分层级
	 * @param list
	 * @param parentId
	 * @return
	 */
	public static List<Area> queryareajson(List<Area> list,String parentId){
		List<Area> arealist = new ArrayList<Area>();
		if(list!=null){
			if(list.size()>0){
				for(Area a:list){
					List<Area> arealists = new ArrayList<Area>();
					if(parentId.equals("1")){
						parentId="0";
						arealist=queryresultjson(a,a.getParentId(),parentId,list,arealists,arealist);
						parentId="1";
					}else{
						arealist=queryresultjson(a,a.getParentId(),parentId,list,arealists,arealist);
					}
				}
			}
		}
		return arealist;
	}
	/**
	 * 开始递归分组
	 * @param list 所有数据
	 * @param aa  父类area
	 * @param arealist 父类集合
	 * @return
	 */
	public static List<Area> queryjsonarea(List<Area> list,Area aa,List<Area> arealist){
		List<Area> arealistinfo = new ArrayList<Area>();
		if(list!=null){
			if(list.size()>0){
				List<Area> listarea = new ArrayList<Area>();
				for(Area a:list){
					List<Area> listareas = new ArrayList<Area>();
					arealistinfo=queryresultjson(a,aa.getCode(),a.getParentId(),list,listareas,arealistinfo);
				}
				if(arealistinfo!=null){
					if(arealistinfo.size()>0){
						aa.setArealist(arealistinfo);
						arealist.add(aa);
					}else{
						arealist=null;
					}
				}
			}
		}
		return arealist;
	}
	/**
	 * 取出数据并赋值
	 * @param a area表数据
	 * @param code  code
	 * @param parentId 父级code
	 * @param list  全部数据
	 * @param arealists 当前子集和数据
	 * @param arealist 当前集合数据
	 * @return
	 */
	public static List<Area> queryresultjson(Area a,String code,String parentId,List<Area> list,List<Area> arealists,List<Area> arealist){
		if(code.equals(parentId)){
			arealists=queryjsonarea(list,a,arealists);
			if(arealists!=null){
				if(arealists.size()>0){
					arealist.addAll(arealists);
//					list.remove(a);
				}else{
					arealist=null;
				}
			}else{
				arealist.add(a);
			}
		}
		return arealist;
	}
	/**
	 * 根据村镇的code查找市区县乡镇村数据
	 * 
	 * @param code
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/arealistByPartends.do")
	public Map<String, Object> arealistByPartends(@RequestParam(value = "code", required = false) String code,
			HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Area> list = areaService.queryByParents(code);
		CasUser appUser = (CasUser) request.getSession().getAttribute("appUser");
		if (appUser != null) {
			map.put("code", appUser.getUsergroupid());
		}
		map.put("list", list);
		return map;
	}

	@RequestMapping(value = "/getCode", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getGroup(HttpServletRequest request) {
		CasUser user = SessionUtil.getSession(request);
		if(user==null){
			Map<String, String> map=new HashMap<String, String>();
			map.put("msg", "未登录");
			map.put("ststus", "0");
			return JSON.toJSONString(map);
		}
		SimplePropertyPreFilter filter = new SimplePropertyPreFilter();
		filter.getIncludes().add("username");
		filter.getIncludes().add("userid");
		filter.getIncludes().add("usergroupid");
        filter.getIncludes().add("realname");
		return JSON.toJSONString(user, filter);
	}

	@RequestMapping("/getInfo")
	@ResponseBody
	public Map<String, String> getInfo(HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		CasUser user = SessionUtil.getSession(request);
		if(user==null){
			map.put("status", "0");
			map.put("user", "未登录");
			return map;
		}
		if (Strings.isNullOrEmpty(user.getIdentity()) || Strings.isNullOrEmpty(user.getUsertel())) {
			map.put("status", "2");
			SimplePropertyPreFilter filter=new SimplePropertyPreFilter();
			filter.getExcludes().add("password");
			map.put("user", JSON.toJSONString(user, filter));
			return map;
		}
		
		map.put("status", "1");
		map.put("user", "信息完整");
		return map;
	}
	
	
	@RequestMapping(value="/cc",produces="application/json;charset=utf-8")
	@ResponseBody
	public String ceshi(){
		List<Area> list = areaService.queryListq();
		return JSON.toJSONString(list);
		
	}
}
