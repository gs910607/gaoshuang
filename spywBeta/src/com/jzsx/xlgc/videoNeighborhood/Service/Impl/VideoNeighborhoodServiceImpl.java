package com.jzsx.xlgc.videoNeighborhood.Service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jzsx.xlgc.area.Service.AreaService;
import com.jzsx.xlgc.bean.Area;
import com.jzsx.xlgc.bean.VideoNeighborhood;
import com.jzsx.xlgc.videoNeighborhood.Dao.VideoNeighborhoodDao;
import com.jzsx.xlgc.videoNeighborhood.Service.VideoNeighborhoodService;
import com.jzsx.xlgc.videoNeighborhood.bean.NeighChart;




@Service
@Transactional
public class VideoNeighborhoodServiceImpl implements VideoNeighborhoodService{

	@Autowired
	private VideoNeighborhoodDao videoNeighborhoodDao;
	@Autowired
	private AreaService areaService;
	@Override
	public List<VideoNeighborhood> queryVideoNeighborhoodList() {
		// TODO Auto-generated method stub
		return videoNeighborhoodDao.queryVideoNeighborhoodList();
	}

	@Override
	public int insertActive(VideoNeighborhood videoNeighborhood) {
		// TODO Auto-generated method stub
		int i = videoNeighborhoodDao.insertActive(videoNeighborhood);
		return i;
	}

	@Override
	public Map<String, Object> queryVideoNeighborhoodByALl(VideoNeighborhood videoNeighborhood,int pageSize,int pageNum) {
		// TODO Auto-generated method stub
		Map<String, Object> hashmap=new HashMap<String, Object>();
		PageHelper.startPage(pageSize,pageNum );
		System.out.println("pageNum:"+pageNum+"----pageSize:"+pageSize);
		List<VideoNeighborhood> list = videoNeighborhoodDao.queryVideoNeighborhoodByALl(videoNeighborhood);
//		List<VideoTrain> list = videoTrainDao.queryVideoTrainListBytype(vtrain);
		PageInfo<VideoNeighborhood> pageinfo=new PageInfo<VideoNeighborhood>(list);
		hashmap.put("total", pageinfo.getPages());
		hashmap.put("list", pageinfo.getList());
		System.out.println("hh:"+list);
		System.out.println("total:"+pageinfo.getTotal()+"list:"+pageinfo.getList());
		return hashmap;
//		List<VideoNeighborhood> list = videoNeighborhoodDao.queryVideoNeighborhoodByALl(videoNeighborhood);
	}

	@Override
	public VideoNeighborhood queyVideoTrainById(String videoneihdId) {
		// TODO Auto-generated method stub
		return videoNeighborhoodDao.queyVideoTrainById(videoneihdId);
	}

	@Override
	public void updateActive(VideoNeighborhood videoNeighborhood) {
		// TODO Auto-generated method stub
		videoNeighborhoodDao.updateActive(videoNeighborhood);
	}

	@Override
	public void deleteById(String videoneihdId) {
		// TODO Auto-generated method stub
		videoNeighborhoodDao.deleteById(videoneihdId);
	}

	@Override
	public List<NeighChart> queyneighChart(NeighChart neighChart) {
		// TODO Auto-generated method stub
		return videoNeighborhoodDao.queyneighChart(neighChart);
	}

	@Override
	public List<NeighChart> queyneighCharts(NeighChart neighChart) {
		// TODO Auto-generated method stub
		return videoNeighborhoodDao.queyneighCharts(neighChart);
	}

	@Override
	public int updateActiveByIdOfState(VideoNeighborhood videoNeighborhood) {
		// TODO Auto-generated method stub
		return videoNeighborhoodDao.updateActiveByIdOfState(videoNeighborhood);
	}

	@Override
	public void updateActiveByIdOfConfId(VideoNeighborhood videoNeighborhood) {
		// TODO Auto-generated method stub
		videoNeighborhoodDao.updateActiveByIdOfConfId(videoNeighborhood);
	}

	@Override
	public List<NeighChart> queryneighmonth(NeighChart neighChart) {
		// TODO Auto-generated method stub
		return videoNeighborhoodDao.queryneighmonth(neighChart);
	}


}
