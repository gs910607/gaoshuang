package com.jzsx.xlha.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class IDUtils {

	/**
	 * å¾çåçæ?
	 */
	public static String genImageName() {
		//åå½åæ¶é´çé¿æ´å½¢å?¼åå«æ¯«ç§?
		long millis = System.currentTimeMillis();
		//long millis = System.nanoTime();
		//å ä¸ä¸ä½éæºæ?
		Random random = new Random();
		int end3 = random.nextInt(999);
		//å¦æä¸è¶³ä¸ä½åé¢è¡?0
		String str = millis + String.format("%03d", end3);
		
		return str;
	}
	
	/**
	 * ååidçæ
	 */
	public static long genItemId() {
		//åå½åæ¶é´çé¿æ´å½¢å?¼åå«æ¯«ç§?
		long millis = System.currentTimeMillis();
		//long millis = System.nanoTime();
		//å ä¸ä¸¤ä½éæºæ?
		Random random = new Random();
		int end2 = random.nextInt(99);
		//å¦æä¸è¶³ä¸¤ä½åé¢è¡?0
		String str = millis + String.format("%02d", end2);
		long id = new Long(str);
		return id;
	}
	
	public static void main(String[] args) {
		for(int i=0;i< 100;i++)
		System.out.println(genItemId());
	}
}
