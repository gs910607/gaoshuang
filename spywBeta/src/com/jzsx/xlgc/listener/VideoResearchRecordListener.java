package com.jzsx.xlgc.listener;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.jzsx.xlgc.bean.VideoResearchRecord;
import com.jzsx.xlgc.videoResearch.Service.VideoResearchRecordService;

public class VideoResearchRecordListener implements ServletContextListener{

	//时间间隔(一天)  
    private static final long PERIOD_DAY = 24 * 60 * 60 * 1000; 
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
		Timer timer=new Timer();
		Calendar calendar=Calendar.getInstance();
		calendar.set(Calendar.HOUR_OF_DAY, 1);//凌晨1点  
		calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        Date date=calendar.getTime(); //第一次执行定时任务的时间  
        if(date.before(new Date())){
        	date=this.addDay(date, 1);
        }
		timer.schedule(new Task(arg0), date, PERIOD_DAY);
	}
	// 增加或减少天数  
    public Date addDay(Date date, int num) {  
        Calendar startDT = Calendar.getInstance();  
        startDT.setTime(date);  
        startDT.add(Calendar.DAY_OF_MONTH, num);  
        return startDT.getTime();  
    } 
    class Task extends TimerTask{
    	ServletContextEvent event;
    	
		public Task(ServletContextEvent event) {
			super();
			this.event = event;
		}
		@Override
		public void run() {
			// TODO Auto-generated method stub
			WebApplicationContext springcontext = WebApplicationContextUtils.getWebApplicationContext(event.getServletContext());
			VideoResearchRecordService videoResearchRecordService = (VideoResearchRecordService) springcontext.getBean("videoResearchRecordService");
			Calendar calendar=Calendar.getInstance();
			calendar.add(Calendar.DATE, -1);
	        Date dated=calendar.getTime();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			String researchtime=sdf.format(dated);
			System.out.println("researchtime:"+researchtime);
//			videoResearchRecordService.deleteBytime(researchtime);
//			VideoResearchRecord researchRecord=new VideoResearchRecord();
//			researchRecord.setVideoResearchTime("2017-11-15");
//			List<VideoResearchRecord> list = videoResearchRecordService.queyVideoResearchRecordById(researchRecord);
//			if(list!=null){
//				if(list.size()>0){
//					for(VideoResearchRecord v:list){
//						System.out.println("--id--"+v.getVideoResearchReId()+"--IP--"+v.getVideoResearchReIp()+"--time--"+v.getVideoResearchTime());
//					}
//				}
//			}
			videoResearchRecordService.deleteBytime(researchtime);	
		}
    }
}
