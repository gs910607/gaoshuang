package com.jzsx.xlha.videoMonitoring.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.log4j.Logger;

public class VideoMonitoringConfig {
	private static final String CONFIG_FILE = "/video_monitoring.properties";

	private static Properties prop = new Properties();

	static Logger logger = Logger.getLogger(VideoMonitoringConfig.class);

	public static int getIntValue(String key, int defaultValue) {
		try {
			return Integer.parseInt(prop.getProperty(key));
		} catch (Exception e) {
			return defaultValue;
		}
	}

	public static Properties getAllValues() {
		return (Properties) prop.clone();
	}

	public static String getServerPath() {
		return getValue("ecserverpath", "");
	}

	public static String getServerUserName() {
		return getValue("ecservername", "");
	}

	public static String getServerPWD() {
		return getValue("ecserverpwd", "");
	}

	public static String getApiVersion() {
		return getValue("apiVersion", "v1");
	}

	// 通话状态，呼叫中
	public static String getConnecting() {
		return getValue("connecting", "");
	}

	// 通话状态，已挂断
	public static String getDisconnected() {
		return getValue("disconnected", "");
	}

	// 通知接口开关
	public static String getNotify() {
		return getValue("notify", "false");
	}

	public static String getValue(String key, String defaultValue) {
		return prop.getProperty(key, defaultValue);
	}

	private VideoMonitoringConfig() {
	}

	public String toString() {
		return prop.toString();
	}

	public static void main(String args[]) {
		System.out.println(VideoMonitoringConfig.getAllValues());
	}

	static {
		InputStream is = null;
		try {
			URL url = VideoMonitoringConfig.class.getResource(CONFIG_FILE);
			is = url.openStream();
			prop.load(is);
			System.out.println("Load Config from " + url + " : " + prop.toString());
			logger.warn("Load Config from " + url + " : " + prop.toString());
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					// do nothing
				}
			}
		}
	}
}
