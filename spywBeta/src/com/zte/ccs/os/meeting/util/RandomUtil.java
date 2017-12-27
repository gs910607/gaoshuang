package com.zte.ccs.os.meeting.util;

import java.util.Calendar;
import java.util.Random;

public class RandomUtil {

	public static String RanIntAndString(int count){
		int startnum=count%2==0?count/2:count/2+1;
		int endnum=0;
		Long num;
		String endstr="";String result="";String strlen="";
		if(count<=18){
			endnum=count-startnum;
			startnum=RandomUtil.RanInt(startnum);
			endstr=RandomUtil.RanUpperString(endnum);
			strlen=((Long) (long)startnum).toString();
		}else if(count>18){
			num=RandomUtil.RanTimeInt();
			if((long)startnum>num.toString().length()){
				startnum=RandomUtil.RanInt((int)(long)startnum-num.toString().length());
				strlen=num+""+startnum;
				endnum=count-strlen.length();
				endstr=RandomUtil.RanUpperString(endnum);
			}else{
				endnum=count-num.toString().length();
				endstr=RandomUtil.RanUpperString(endnum);
				strlen=num.toString();
			}
		}
		for(int i=0;i<strlen.length();i++){
			char rannumchar=strlen.charAt(i);
			result+=rannumchar;
			for(int j=i;j<endstr.length()&&j<=i;j++){
				char ranstrchar=endstr.charAt(j);
				result+=ranstrchar;
			}
		}
		if(result.length()>count){
			result=result.substring(0,count);
		}
		return result;
	}
	public static void main(String[] args) {
//		Long ranlong=(long) (ran.nextInt(899999)+100000);
		int count=28;
//		for(int i=0;i<1000;i++){
//			int ran1=RandomUtil.RanInt(count);
//			System.out.println("ran1: "+ran1);
//		}
//		for(int i=0;i<1000;i++){
//			int ran2=RandomUtil.RanInt(count, 202);
//			System.out.println("ran2: "+ran2);
//		}
//		for(int i=0;i<1000;i++){
//			String ranstr1=RandomUtil.RanLowerString(count);
//			System.out.println("ranstr1: "+ranstr1);
//		}
//		for(int i=0;i<1000;i++){
//			String ranstr2=RandomUtil.RanUpperString(count);
//			System.out.println("ranstr2: "+ranstr2);
//		}
//		for(int i=0;i<1000;i++){
//			long ranlong=RandomUtil.RanTimeInt();
//			System.out.println("ranlong: "+ranlong);
//		}
		String txt="";
		int tt=0;
		for(int i=0;i<1000;i++){
			String ranIntStr=RandomUtil.RanIntAndString(count);
			if(txt.contains(ranIntStr)){
				System.out.println("==================================");
			}else {
				if(tt>50){
					tt=0;
					System.out.println("");
				}
//				System.out.print("1");
				tt++;
			}
			txt+=ranIntStr;
			System.out.println("ranIntStr: "+ranIntStr);
			Random ran=new Random();
			int td=(ran.nextInt(8)+1);
			System.out.print(""+td);
		}
		
		Random ran=new Random();
		long asd=ran.nextLong();
//		System.out.println(asd);
		long cd=(long) (Math.random()*1000000000);
//		System.out.println(cd);
		
		
		
	}
	/**
	 * 获取时间的秒的long值
	 * 加上一位随机整数在拼接一位随机整数
	 * @return
	 */
	public static long RanTimeInt(){
		long result=0;
		Calendar calendar=Calendar.getInstance();
		result=calendar.getTimeInMillis();
		Random ran=new Random();
		int rans=0;
		for(int i=0;i<2;i++){
			int ranc=(ran.nextInt(8)+1);
			if(rans==ranc){
				i--;
			}else{
				if(i==0){
					result+=ranc;
				}else if(i==1){
					result=Long.parseLong(result+""+(ran.nextInt(8)+1));
				}
			}
			rans=ranc;
		}
		return result;
	}
	/**
	 * 获取随机数不从零开始例如3个整数【100,999】
	 * @param num 随机整数的个数
	 * @return
	 */
	public static int RanInt(int num){
		int result=0;String cout="";
		Random ran=new Random();
		if(num>0 ){
			if(num>10){
				num=10;
			}
			cout="1";
			for(int i=1;i<num;i++){
				cout+="0";
			}
			result=(int)Long.parseLong(cout);
		}
		result=(ran.nextInt((result*10-result-1))+result);
		return result;
	}
	/**
	 * 随机整数例如3个【startnum,999】
	 * @param num 随机整数的个数
	 * @param starnum 随机整数的开始值
	 * @return
	 */
	public static int RanInt(int num,int startnum){
		int result=0;String cout="";
		Random ran=new Random();
		if(num>0){
			if(num>10){
				num=10;
			}
			cout="1";
			for(int i=1;i<num;i++){
				cout+="0";
			}
			result=Integer.parseInt(cout);
		}
		if(result*10-startnum-1>startnum){
			result=(ran.nextInt((result*10-startnum-1))+startnum);
		}
		return result;
	}
	/**
	 *  a-z 的 ASCII 码值[97,122] 
	 *  获取小写字母随机数
	 * @param count
	 * @return
	 */
	public static String RanLowerString(int count){
		String result="";
		for(int i=0;i<count;i++){
			String ranstr=String.valueOf((char)Math.round(Math.random() * 25 + 97));
			if(i<=25){
				if(!result.contains(ranstr)){
					result+=ranstr;
				}else{
					i--;
				}
			}else{
				result+=ranstr;
			}
		}
		return result;
	}
	/**
	 * A-Z 的 ASCII 码值[65,90]
	 * 获取大写字母随机数
	 * @param count
	 * @return
	 */
	public static String RanUpperString(int count){
		String result="";
		for(int i=0;i<count;i++){
			String ranstr=String.valueOf((char)Math.round(Math.random() * 25 + 65));
			if(i<=25){
				if(!result.contains(ranstr)){
					result+=ranstr;
				}else{
					i--;
				}
			}else{
				result+=ranstr;
			}
		}
		return result;
	}
}
