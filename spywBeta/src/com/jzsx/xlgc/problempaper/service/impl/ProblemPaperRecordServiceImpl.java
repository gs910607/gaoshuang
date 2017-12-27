package com.jzsx.xlgc.problempaper.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzsx.xlgc.bean.ProblemPaperRecord;
import com.jzsx.xlgc.bean.VideoResearch;
import com.jzsx.xlgc.problempaper.Dao.ProblemPaperRecordDao;
import com.jzsx.xlgc.problempaper.service.ProblemPaperRecordService;

@Service
@Transactional
public class ProblemPaperRecordServiceImpl implements ProblemPaperRecordService{

	@Autowired
	private ProblemPaperRecordDao problemPaperRecordDao;

	@Override
	public void insertActive(ProblemPaperRecord paperRecord) {
		// TODO Auto-generated method stub
		problemPaperRecordDao.insertActive(paperRecord);
	}

	@Override
	public List<ProblemPaperRecord> querylist() {
		// TODO Auto-generated method stub
		return problemPaperRecordDao.querylist();
	}

	@Override
	public ProblemPaperRecord queryById(String problempaperId) {
		// TODO Auto-generated method stub
		return problemPaperRecordDao.queryById(problempaperId);
	}

	@Override
	public List<ProblemPaperRecord> queryByAll(ProblemPaperRecord paperRecord) {
		// TODO Auto-generated method stub
		return problemPaperRecordDao.queryByAll(paperRecord);
	}

	@Override
	public void deleteById(String problempaperId) {
		// TODO Auto-generated method stub
		problemPaperRecordDao.deleteById(problempaperId);
	}

	@Override
	public List<ProblemPaperRecord> queryByPaperIdOfArea(String problempaperId) {
		// TODO Auto-generated method stub
		return problemPaperRecordDao.queryByPaperIdOfArea(problempaperId);
	}

	@Override
	public List<ProblemPaperRecord> queryBypaperIdOfname(String problempaperId) {
		// TODO Auto-generated method stub
		return problemPaperRecordDao.queryBypaperIdOfname(problempaperId);
	}

	@Override
	public int queryByCount(ProblemPaperRecord paperRecord) {
		// TODO Auto-generated method stub
		return problemPaperRecordDao.queryByCount(paperRecord);
	}

	@Override
	public Map<String, Object> queryByAll(ProblemPaperRecord paperRecord,
			int pageSize, int pageNum) {
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pageSize,pageNum );
		List<ProblemPaperRecord> list = problemPaperRecordDao.queryByAll(paperRecord);
		PageInfo<ProblemPaperRecord> pageinfo=new PageInfo<ProblemPaperRecord>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		return hashmap;
	}

}
