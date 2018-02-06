package com.jzsx.xlha.area.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SimplePropertyPreFilter;
import com.jzsx.xlha.area.service.AreaService;
import com.jzsx.xlha.bean.Area;
import com.jzsx.xlha.bean.CasUser;
import com.jzsx.xlha.util.SessionUtil;
import com.jzsx.xlha.videoMonitoring.bean.VideoCamera;
import com.jzsx.xlha.videoMonitoring.service.VideoApiService;

@Controller
@RequestMapping("/area")
public class AreaController {
	static Logger logger=Logger.getLogger(AreaController.class);
	@Autowired
	private AreaService areaService;
	@Autowired
	private VideoApiService videoApiService;
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
		logger.debug("arealist.do 查询所有数据 开始");
		List<Area> list = areaService.queryList();
		// CasUser appUser = (CasUser)
		// request.getSession().getAttribute("appUser");
		// if (appUser != null) {
		// map.put("code", appUser.getUsergroupid());
		// }
		map.put("list", list);
		logger.debug("查询所有数据结束");
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
		logger.debug("arealistByAll.do 根据条件查询-暂不支持条件查询 开始");
		List<Area> list = areaService.queryByALl(area);
		// CasUser appUser = (CasUser)
		// request.getSession().getAttribute("appUser");
		// if (appUser != null) {
		// map.put("code", appUser.getUsergroupid());
		// }
		map.put("list", list);
		logger.debug("根据条件查询结束");
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
		logger.debug("arealistByCode.do 根据code查询地区数据 开始");
		Map<String, Object> map = new HashMap<String, Object>();
		Area area = areaService.queryByCode(code);
		// CasUser appUser = (CasUser)
		// request.getSession().getAttribute("appUser");
		// if (appUser != null) {
		// map.put("code", appUser.getUsergroupid());
		// }
		map.put("list", area);
		logger.debug("根据code查询地区数据结束");
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
		logger.debug("arealistById.do 根据ID查询地区数据 开始");
		Map<String, Object> map = new HashMap<String, Object>();
		Area area = areaService.queryById(id);
		// CasUser appUser = (CasUser)
		// request.getSession().getAttribute("appUser");
		// if (appUser != null) {
		// map.put("code", appUser.getUsergroupid());
		// }
		map.put("list", area);
		logger.debug("根据ID查询地区数据结束");
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
		logger.debug("arealistByPartendId.do 根据父code查找数据 开始");
		Map<String, Object> map = new HashMap<String, Object>();
		List<Area> list = areaService.queryByParentId(parentId);
		// CasUser appUser = (CasUser)
		// request.getSession().getAttribute("appUser");
		// if (appUser != null) {
		// map.put("code", appUser.getUsergroupid());
		// }
		map.put("list", list);
		logger.debug(" 根据父code查找数据结束");
		return map;
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
		logger.debug("arealistByPartends.do 根据村镇的code查找市区县乡镇村数据 开始");
		Map<String, Object> map = new HashMap<String, Object>();
		List<Area> list = areaService.queryByParents(code);
		// CasUser appUser = (CasUser)
		// request.getSession().getAttribute("appUser");
		// if (appUser != null) {
		// map.put("code", appUser.getUsergroupid());
		// }
		map.put("list", list);
		logger.debug("根据村镇的code查找市区县乡镇村数据 结束");
		return map;
	}

	@RequestMapping(value = "/getCode", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getGroup(HttpServletRequest request) {
		CasUser user = SessionUtil.getSession(request);
		if (user == null) {
			Map<String, String> map = new HashMap<String, String>();
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

	@RequestMapping(value="/getInfo",produces="application/json;charset=utf-8")
	@ResponseBody
	public String infoAdmin(HttpServletRequest request){
		CasUser user = SessionUtil.getSession(request);
		int i=user.getUserlevel().intValue();
		user.setAuth(i==0?"市级管理员":(i==1?"区/县级管理员":(i==2?"乡/镇级管理员":"村/街道管理员")));
		SimplePropertyPreFilter filter=new SimplePropertyPreFilter();
		filter.getExcludes().add("password");
		return JSON.toJSONString(user,filter);
	}
	/**
	 * 根据地区code获取该地区设备信息
	 * @param code
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/areaCameraAppjoin.do")
	public Map<String,Object> areaCameraAppjoin(String code,HttpServletRequest request) {
		Map<String,Object> map  = new HashMap<String, Object>();
		logger.debug("areaCameraAppjoin.do 根据地区code获取该地区设备信息   开始");
		logger.debug("参数  code："+code);
		try {
			if(code!=null && code!=""){
				VideoCamera videoCamera=new VideoCamera();
				videoCamera.setPlace_code(code);
 				List<VideoCamera> list = videoApiService.queryVideoCamera(videoCamera);
//				Map<String,Object> hasmap  = new HashMap<String, Object>();
//				hasmap.put("object_id", "7");//相机
//				hasmap.put("camera_id", "7");//标准规定id
//				hasmap.put("camera_name", "测试相机");//相机名称
//				hasmap.put("camera_type", 1);//相机类型
//				hasmap.put("ip_addr", "192.168.1.1");//IP地址
//				hasmap.put("place_code", "102");//安装地点行政区划代码
//				hasmap.put("org_code", "102");//管辖单位代码
//				hasmap.put("longitude", 1);//经度
//				hasmap.put("latitude", 1);//纬度
//				hasmap.put("plat_code", "102");//原有平台标识
//				List<Map> list = new ArrayList<Map>();
//				if(code.equals("1")){
//					code="0";
//					
//					code="1";
//				}else{
//					list.add(hasmap);
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
			logger.debug(" 根据地区code获取该地区设备信息   结束");
		} catch (Exception e) {
			map.put("status", -2);
			map.put("msg", "操作异常");
			logger.debug(" 根据地区code获取该地区设备信息   异常",e);
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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
	@RequestMapping(value="/arealistByChildrens.do")
	public Map<String, Object> arealistByChildrens(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		logger.debug("arealistByChildrens.do 根据父code查找子类数据app接口 开始");
		Calendar calendar=Calendar.getInstance();
		long b=calendar.getTimeInMillis();
		String parentId="0";
		try {
				List<Area> list = new ArrayList<Area>();
				list=areaService.queryBychilds(parentId);
//					logger.debug("参数——parentId："+parentId+"——type："+type+"执行递归对地区分层  开始");
				list=queryareajson(list,parentId);
				logger.debug("执行递归对地区分层  结束");
				Calendar calenda=Calendar.getInstance();
				long c=calenda.getTimeInMillis();
				logger.debug("开始："+b);
				logger.debug("结束："+c);
				logger.debug("耗时："+(c-b));
//				System.out.println("开始："+b);
//				System.out.println("结束："+c);
//				System.out.println("耗时："+(c-b));
				System.out.println("list:"+list);
				map.put("status", 1);
				map.put("list", list);
				map.put("msg", "成功！");
				logger.debug("根据父code查找子类数据app接口 结束");
		} catch (Exception e) {
			map.put("status", -1);
			map.put("msg", "操作异常");
			logger.info("arealistByChildrens.do 根据父code查找子类数据app接口 异常 status：-1",e);
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
}