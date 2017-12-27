package com.zte.ccs.os.meeting.util;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.log4j.Logger;

public class CcsConfig {

    private static final String CONFIG_FILE = "/rcs-ccs.properties";

    private static Properties prop = new Properties();

    static Logger logger = Logger.getLogger(CcsConfig.class);

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
    
    public static String getApiVersion(){
    	return getValue("apiVersion", "v1");
    }
    
    public static String getValue(String key, String defaultValue) {
        return prop.getProperty(key, defaultValue);
    }
    
    private CcsConfig() {
    }

    public String toString() {
        return prop.toString();
    }

    public static void main(String args[]) {
        System.out.println(CcsConfig.getAllValues());
    }

    static {
        InputStream is = null;
        try {
            URL url = CcsConfig.class.getResource(CONFIG_FILE);
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
