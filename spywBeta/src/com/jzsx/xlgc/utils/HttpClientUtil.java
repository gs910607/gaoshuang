package com.jzsx.xlgc.utils;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.httpclient.params.HttpMethodParams;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

public class HttpClientUtil {
    private static Integer SC_OK = 200;

    /**
     * get方式
     *
     * @param url
     * @param params
     * @param timeout
     * @return
     */
    @SuppressWarnings("unchecked")
    public static String doHttpGet(String url, Map params, int timeout, String encode) {
        String responseMsg = "";
        HttpClient httpClient = new HttpClient();
        httpClient.getParams().setContentCharset(encode);
        StringBuffer sb = new StringBuffer();
        if (params != null && !params.isEmpty()) {
            Iterator iterator = params.entrySet().iterator();
            while (iterator.hasNext()) {
                Entry entry = (Entry) iterator.next();
                sb.append(entry.getKey().toString() + "="
                        + entry.getValue().toString() + "&");
            }
            url = url + "?" + sb.substring(0, sb.length() - 1);
        }
        GetMethod getMethod = new GetMethod(url);
        getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,
                new DefaultHttpMethodRetryHandler());
        try {
            httpClient.getHttpConnectionManager().getParams()
                    .setConnectionTimeout(timeout);
            int num = httpClient.executeMethod(getMethod);
            if (num == SC_OK) {
                InputStream is = getMethod.getResponseBodyAsStream();
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                String tempbf;
                StringBuffer html = new StringBuffer(1000);
                while ((tempbf = br.readLine()) != null) {
                    html.append(tempbf);
                }
                responseMsg = html.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            getMethod.releaseConnection();
        }
        return responseMsg;
    }

    /**
     * post方式
     *
     * @param url
     * @param params
     * @param timeout
     * @return
     */
    @SuppressWarnings("unchecked")
    public static String doHttpPost(String url, Map params, int timeout, String encode) {
        String responseMsg = "";
        HttpClient httpClient = new HttpClient();
        httpClient.getParams().setContentCharset(encode);
        PostMethod postMethod = new PostMethod(url);
        if (params != null && !params.isEmpty()) {
            Iterator iterator = params.entrySet().iterator();
            while (iterator.hasNext()) {
                Entry entry = (Entry) iterator.next();
                postMethod.addParameter(entry.getKey().toString(), entry
                        .getValue().toString());
            }
        }
        try {
            httpClient.getHttpConnectionManager().getParams()
                    .setConnectionTimeout(timeout);
            int num = httpClient.executeMethod(postMethod);
            if (num == SC_OK) {
                InputStream is = postMethod.getResponseBodyAsStream();
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                String tempbf;
                StringBuffer html = new StringBuffer(1000);
                while ((tempbf = br.readLine()) != null) {
                    html.append(tempbf);
                }
                responseMsg = html.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            postMethod.releaseConnection();
        }
        return responseMsg;
    }

    /***
     * 发送xml文件
     * @param url
     * @param xmlString
     * @param timeout
     * @param encode
     * @return
     */
    public static String doHttpPostXml(String url, String xmlString, int timeout, String encode) {
        String responseString = "";
        HttpClient httpClient = new HttpClient();
        httpClient.getHttpConnectionManager().getParams().setConnectionTimeout(timeout);
        PostMethod postMethod = new PostMethod(url);
        try {
            postMethod.setRequestHeader("Content-Type", "text/xml,charset=" + encode);
            postMethod.setRequestEntity(new StringRequestEntity(xmlString, "text/xml", encode));
            int statusCode = httpClient.executeMethod(postMethod);
            if (statusCode == SC_OK) {
                InputStream is = postMethod.getResponseBodyAsStream();
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                String tempbf;
                StringBuffer html = new StringBuffer(1000);
                while ((tempbf = br.readLine()) != null) {
                    html.append(tempbf);
                }
                responseString = html.toString();
            }
        } catch (HttpException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return responseString;
    }
    
}
