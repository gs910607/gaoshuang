package com.jzsx.xlha.politicsHot.controller;

import java.io.File;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Strings;
import com.jzsx.xlha.bean.TPoliticsHot;
import com.jzsx.xlha.politicsHot.service.PoliticsService;
import com.jzsx.xlha.util.Application;
import com.jzsx.xlha.util.IDUtils;
import com.jzsx.xlha.util.Result;
import com.jzsx.xlha.util.ResultMessage;

@Controller
@RequestMapping("/politics")
public class PoliticsController {
	
	@Autowired
	private PoliticsService service;
	
	@RequestMapping("/addPolitics")
	@ResponseBody
	public ResultMessage addLegal(@RequestParam(value = "file", required = false) MultipartFile file,
			TPoliticsHot hot) {
		ResultMessage message = new ResultMessage();
		try {
			if (Strings.isNullOrEmpty(hot.getcPoliticsId())) {
				hot.setcPoliticsId(String.valueOf(IDUtils.genItemId()));
				hot.setcPoliticsCreatetime(new Date());
				hot.setcForeignUserid("1");
				hot.setcPoliticsCreate("测试");
				hot.setcPoliticsEditor("测试");
				hot.setcPoliticsCount(BigDecimal.valueOf(0));
				String filename = uploadFile(file, hot.getcPoliticsType().intValue());
				if (!Strings.isNullOrEmpty(String.valueOf(hot.getcPoliticsType()))
						&& hot.getcPoliticsType().intValue() == 0) {
					hot.setcPoliticsImage(filename);
				} else {
					hot.setcPoliticsVideo(filename);
				}
				int i = service.addPolitics(hot, true);
				if (i == 1) {
					message.setMsg("添加成功");
					message.setStatus(String.valueOf(i));
				} else {
					message.setMsg("添加失败");
					message.setStatus(String.valueOf(i));
				}
				return message;
			}
			if (file != null) {
				String filename = uploadFile(file, hot.getcPoliticsType().intValue());
				if (Strings.isNullOrEmpty(String.valueOf(hot.getcPoliticsType()))
						&& hot.getcPoliticsType().intValue() == 0) {
					hot.setcPoliticsImage(filename);
				} else {
					hot.setcPoliticsVideo(filename);
				}
				hot.setcPoliticsCreatetime(new Date());
				int i = service.addPolitics(hot, false);
				if (i == 1) {
					message.setMsg("修改成功");
					message.setStatus(String.valueOf(i));
				} else {
					message.setMsg("修改失败");
					message.setStatus(String.valueOf(i));
				}
			} else {
				hot.setcPoliticsCreatetime(new Date());
				int i = service.addPolitics(hot, false);
				if (i == 1) {
					message.setMsg("修改成功");
					message.setStatus(String.valueOf(i));
				} else {
					message.setMsg("修改失败");
					message.setStatus(String.valueOf(i));
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return message;

	}
	
	
	@RequestMapping(value = "/getPageList", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getPageList(@RequestParam(defaultValue = "1") Integer pages, TPoliticsHot hot) {
		String user = "1";
		Result<TPoliticsHot> result = service.getPageList(pages, hot, user);
		return JSON.toJSONString(result);
	}
	
	@RequestMapping(value = "/getPoliticsById", produces = "application/json;charset=utf-8")
	@ResponseBody
	public String getHotById(String id) {
		TPoliticsHot hot = service.getHotById(id);
		return JSON.toJSONString(hot);
	}
	
	@RequestMapping("/deletePolitics")
	@ResponseBody
	public ResultMessage deletePolitics(String id) {
		if (Strings.isNullOrEmpty(id)) {
			ResultMessage message = new ResultMessage("参数错误", "0");
			return message;
		}
		int i = service.deletePolitics(id);
		String msg = i == 1 ? ("删除成功") : ("删除失败");
		String status = i == 1 ? ("1") : ("0");
		return new ResultMessage(msg, status);
	}
	
	public String uploadFile(MultipartFile file, Integer type) throws Exception {
		String filename = file.getOriginalFilename();
		filename = UUID.randomUUID() + "." + filename.substring(filename.lastIndexOf(".") + 1);
		String path = type == 0 ? Application.imgPath + filename : Application.videoPath + filename;
		File src = new File(path);
		file.transferTo(src);
		return filename;
	}

}
