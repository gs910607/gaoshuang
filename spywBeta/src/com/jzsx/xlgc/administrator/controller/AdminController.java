package com.jzsx.xlgc.administrator.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.jasig.cas.client.util.AssertionHolder;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SimplePropertyPreFilter;
import com.google.common.base.Strings;
import com.jzsx.xlgc.administrator.service.AdminService;
import com.jzsx.xlgc.bean.CasUser;
import com.jzsx.xlgc.utils.AppResult;
import com.jzsx.xlgc.utils.Application;
import com.jzsx.xlgc.utils.ExportExcel;
import com.jzsx.xlgc.utils.IDUtils;
import com.jzsx.xlgc.utils.ReadExcel;
import com.jzsx.xlgc.utils.Result;
import com.jzsx.xlgc.utils.ResultMessage;
import com.jzsx.xlgc.utils.SessionUtil;
import com.zte.ccs.os.meeting.util.RandomUtil;

@Controller
@RequestMapping("/admin")
public class AdminController {

	Logger log=Logger.getLogger(AdminController.class);
	
	@Autowired
	private AdminService service;

	/**
	 * 添加和修改功能
	 * @param user 提交的用户参数，封装进CasUser类
	 * @return
	 */
	@RequestMapping(value = "/addAdmin", method = RequestMethod.POST)
	@ResponseBody
	public ResultMessage addAdminUser(CasUser user) {
		//判断是否存在userid，不存在即为添加新用户
		if (Strings.isNullOrEmpty(user.getUserid())) {
			if (!Strings.isNullOrEmpty(user.getVillage())) {
				user.setUsergroupid(BigDecimal.valueOf(Long.parseLong(user.getVillage())));
			} else if (!Strings.isNullOrEmpty(user.getCounty())) {
				user.setUsergroupid(BigDecimal.valueOf(Long.parseLong(user.getCounty())));
			} else {
				user.setUsergroupid(BigDecimal.valueOf(Long.parseLong(user.getDistrict())));
			}
			user.setUserid(String.valueOf(IDUtils.genItemId()));
			user.setPassword(user.getUsername());
			int i = service.addAdminUser(user, true);
			String msg = i == 1 ? Application.MSG_ADD_SUCCESS : Application.MSG_ADD_FAIL;
			String status = i == 1 ? Application.STATUS_ADD_SUCCESS : Application.STATUS_ADD_FAIL;
			return new ResultMessage(msg, status);
		}
		//修改用户信息(此处为修改用户列表的用户信息，即他人信息)
		int i = service.addAdminUser(user, false);
		String msg = i == 1 ? Application.MSG_UPDATE_SUCCESS : Application.MSG_UPDATE_FAIL;
		String status = i == 1 ? Application.STATUS_UPDATE_SUCCESS : Application.STATUS_UPDATE_FAIL;
		return new ResultMessage(msg, status);
	}

	
	/**
	 * 修改用户自身信息
	 * @param user 信息参数
	 * @param request
	 * @return
	 */
	@RequestMapping("/userUpdate")
	@ResponseBody
	public ResultMessage userUpdate(CasUser user, HttpServletRequest request) {
		int i = service.addAdminUser(user, false);
		CasUser session = SessionUtil.getSession(request);
		if (i == 1) {
			// CasUser admin = service.getAdmin(user.getUserid());
			//根据用户信息更新成功 更新用户session信息
			CasUser appUser = service.selectByUsername(session.getUsername());
			request.getSession().setAttribute("appUser", appUser);
		}
		String msg = i == 1 ? Application.MSG_UPDATE_SUCCESS : Application.MSG_UPDATE_FAIL;
		String status = i == 1 ? Application.STATUS_UPDATE_SUCCESS : Application.STATUS_UPDATE_FAIL;
		return new ResultMessage(msg, status);
	}

	
	/**
	 * 删除用户
	 * @param id 用户的id
	 * @return
	 */
	@RequestMapping(value = "/deleteAdmin", method = RequestMethod.POST)
	@ResponseBody
	public ResultMessage deleteAdmin(String id) {
		if (!Strings.isNullOrEmpty(id)) {
			int i = service.deleteAdminUser(id);
			String msg = i == 1 ? Application.MSG_DELETE_SUCCESS : Application.MSG_DELETE_FAIL;
			String status = i == 1 ? Application.STATUS_DELETE_SUCCESS : Application.STATUS_DELETE_FAIL;
			return new ResultMessage(msg, status);
		} else {
			return new ResultMessage(Application.MSG_ERROR, "0");
		}
	}

	
	/**
	 * 获取用户分页数据
	 * @param pages 当前页数
	 * @param user  封装的查询用户信息参数
	 * @param request
	 * @return
	 */
	@RequestMapping("/getPageList")
	@ResponseBody
	public Result<CasUser> getPageList(@RequestParam(defaultValue = "1") Integer pages, CasUser user,
			HttpServletRequest request) {
		CasUser session = SessionUtil.getSession(request);
		if (!Strings.isNullOrEmpty(user.getVillage())) {
			user.setUsergroupid(BigDecimal.valueOf(Long.parseLong(user.getVillage())));
		} else if (!Strings.isNullOrEmpty(user.getCounty())) {
			user.setUsergroupid(BigDecimal.valueOf(Long.parseLong(user.getCounty())));
		} else if (!Strings.isNullOrEmpty(user.getDistrict())) {
			user.setUsergroupid(BigDecimal.valueOf(Long.parseLong(user.getDistrict())));
		} else {
			user.setUsergroupid(session.getUsergroupid());
		}
		Result<CasUser> result = service.getPageList(pages, user, session.getUsergroupid().toString());
		//将获取的数据用户等级字段转换成文字说明
		for (CasUser casUser : result.getList()) {
			if (casUser.getUserlevel().intValue() == 0) {
				casUser.setAuth("市级管理员");
			} else if (casUser.getUserlevel().intValue() == 1) {
				casUser.setAuth("区/县级管理员");
			} else if (casUser.getUserlevel().intValue() == 2) {
				casUser.setAuth("乡/镇级管理员");
			} else {
				casUser.setAuth("街道/村级管理员");
			}
		}
		return result;

	}

	/**
	 * 根据用户id获取信息
	 * @param id 用户id
	 * @return
	 */
	@RequestMapping(value = "/getAdmin", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getAdmin(String id) {
		if (Strings.isNullOrEmpty(id)) {
			return JSON.toJSONString(new ResultMessage(Application.MSG_ERROR, Application.STATUS_ERROR));
		} else {
			CasUser user = service.getAdmin(id);
			return JSON.toJSONString(user);
		}

	}

	/**
	 * 用户信息的导入
	 * @param file
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/import",produces="text/html;charset=utf-8")
	@ResponseBody
	public String importAdmin(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		String msg = "";
		String status = "";
		if (file != null) {
			CasUser user = SessionUtil.getSession(request);
			try {
				List<List<Object>> list = ReadExcel.readExcel(file);
				List<CasUser> list3 = new ArrayList<CasUser>();
				for (int j = 0; j < list.size(); j++) {
					if (j > 0) {
						List<Object> list2 = list.get(j);
						CasUser casUser = new CasUser();
						casUser.setUsername(list2.get(0).toString());
						casUser.setPassword(list2.get(1).toString());
						casUser.setRealname(list2.get(2).toString());
						casUser.setUsertel(list2.get(3).toString());
						casUser.setRemark(list2.get(4).toString());
						casUser.setIdentity(list2.get(5).toString());
						casUser.setUserid(String.valueOf(IDUtils.genItemId()));
						casUser.setUsergroupid(user.getUsergroupid());
						casUser.setUserlevel(user.getUserlevel());
						list3.add(casUser);
					}
				}
				int i = service.insertAdminList(list3);
				msg = i > 0 ? Application.MSG_ADD_SUCCESS : Application.MSG_ADD_FAIL;
				status = i > 0 ? Application.STATUS_ADD_SUCCESS : Application.STATUS_ADD_FAIL;
			} catch (IOException e) {
				e.printStackTrace();
			}
			return JSON.toJSONString(new ResultMessage(msg, status));
		} else {
			msg = Application.MSG_ERROR;
			status = Application.STATUS_ERROR;
			return JSON.toJSONString(new ResultMessage(msg, status));
		}

	}

	/**
	 * 修改密码
	 * @param id 用户id
	 * @param oldPassword 旧密码
 	 * @param password  新密码
	 * @param request
	 * @return
	 */
	@RequestMapping("/updatePassword")
	@ResponseBody
	public ResultMessage updataPassword(String id, String oldPassword, String password, HttpServletRequest request) {
		if (Strings.isNullOrEmpty(id) || Strings.isNullOrEmpty(password)) {
			return new ResultMessage(Application.MSG_ERROR, Application.STATUS_ERROR);
		}
		CasUser session = SessionUtil.getSession(request);
		//判断旧密码是否正确
		if (!session.getPassword().equals(oldPassword)) {
			return new ResultMessage("原密码错误", Application.STATUS_ERROR);
		}
		Map<String, String> map = new HashMap<String, String>();
		map.put("userid", id);
		map.put("password", password);
		int i = service.updatePassword(map);
		//更新密码成功，删除session
		if (i == 1) {
			request.getSession().removeAttribute("appUser");
			return new ResultMessage(Application.MSG_UPDATE_SUCCESS, Application.STATUS_UPDATE_SUCCESS);
		}
		return new ResultMessage(Application.MSG_UPDATE_FAIL, Application.STATUS_UPDATE_FAIL);
	}

	/**
	 * 用户退出
	 * @return
	 */
	@RequestMapping(value = "/logout", produces = "application/json;charset=utf-8")
	public String logout(HttpServletRequest request) {
		request.getSession().invalidate();
		//return "redirect:https://112.1.17.177/ScheduledConference/New.aspx";
		String url =  "http://" + request.getServerName() //服务器地址    
		        + ":"     
		        + request.getServerPort()           //端口号    
		        + "/cas/logout"; 
		System.out.println(url);
		return "redirect:"+url;
	}

	
	
	/**
	 * 导出模板excel
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/exportModel")
	@ResponseBody
	public ResultMessage getExportModel(HttpServletRequest  request,HttpServletResponse response){
		List<CasUser> list=new ArrayList<CasUser>();
		ExportExcel<CasUser> excel = new ExportExcel<CasUser>();
		excel.exportExcelString("用户信息导入模板",Application.ADMIN_HEADERS_MODEL, list, Application.ADMIN_DATASTR_MODEL,
				"yyyy-MM-dd", response);
		return null;
	}
	
	
	
	@RequestMapping(value="/getInfo",produces="application/json;charset=utf-8")
	@ResponseBody
	public String infoAdmin(HttpServletRequest request){
		CasUser user = SessionUtil.getSession(request);
		int i=user.getUserlevel().intValue();
		user.setAuth(i==0?"市级管理员":(i==1?"区/县级管理员":(i==2?"乡/镇级管理员":"村/街道管理员")));
		SimplePropertyPreFilter filter=new SimplePropertyPreFilter();
		filter.getExcludes().add("password");
		filter.getExcludes().add("userid");
		 return JSON.toJSONString(user,filter);
	}

	
	/**
	 * app登录接口
	 * @param username
	 * @param password
	 * @return
	 */
	@RequestMapping(value="/login",method=RequestMethod.POST,produces="application/json;charset=utf-8")
	@ResponseBody
	public String login(String username,String password){
		if(Strings.isNullOrEmpty(username)||Strings.isNullOrEmpty(password))
			return JSON.toJSONString(new AppResult("参数不完整", Application.STATUS_ERROR));
		CasUser user = service.selectByUsername(username);
		if(user!=null){
			if(!password.equals(user.getPassword()))
				return JSON.toJSONString(new AppResult("密码错误", Application.STATUS_ERROR));
//			user.setHusername1(RandomUtil.RanIntAndString(10));
//			user.setHusername2(RandomUtil.RanIntAndString(10));
//			user.setHpwd1(RandomUtil.RanIntAndString(10));
//			user.setHpwd2(RandomUtil.RanIntAndString(10));
			return JSON.toJSONString(new AppResult("登录成功", Application.STATUS_ADD_SUCCESS, user));
		}
		return JSON.toJSONString(new AppResult("账号不存在", Application.STATUS_ERROR));
	}

}
