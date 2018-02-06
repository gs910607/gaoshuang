package com.jzsx.xlha.util;

import java.io.IOException;  
import java.io.StringWriter;  
import java.util.ArrayList;  
import java.util.HashMap;  
import java.util.Iterator;  
import java.util.LinkedHashMap;  
import java.util.List;  
import java.util.Map;  
  
import net.sf.json.JSON;  
import net.sf.json.JSONObject;  
  
import org.dom4j.Attribute;  
import org.dom4j.Document;  
import org.dom4j.DocumentException;  
import org.dom4j.DocumentHelper;  
import org.dom4j.Element;  
import org.dom4j.io.OutputFormat;  
import org.dom4j.io.XMLWriter;  
  
/** 
 * xml转map，map转xml 带属�?  
 * http://happyqing.iteye.com/blog/2316275  
 * @author suhk 
 * @since 2017.5.24 
 */  
@SuppressWarnings({ "rawtypes", "unchecked" })  
public class XmlUtil {  
    public static void main(String[] args) throws DocumentException, IOException {  
//        String textFromFile = FileUtils.readFileToString(new File("D:/workspace/workspace_3.7/xml2map/src/xml2json/sample.xml"),"UTF-8");  
        
       String textFromFile = 
               "<histConferenceList xmlns=\"urn:ietf:params:xml:ns: histConferenceList \">"+
                       "<conferenceHistInfo>"+ 
                       "<conferenceId>122121-3333-8882-999</conferenceId>"+
                       "<chairman>tel:+8613712345678</chairman>"+
                       "<sponsor> tel:+8613712345678</sponsor>"+
                       "<list>"+
                       "<entry uri='tel:+862570703284'/>"+
                       "<entry uri='tel:+862570703384'/>"+
                       "</list>"+
                       "<startTime>20170417233456</startTime>"+
                       "<endTime>20170417233457</endTime>"+
                       "<subject>年底表彰会议</subject>"+
                       "</conferenceHistInfo> "+
                       "<conferenceHistInfo>"+
                       "<chairman>tel:+8613712345678</chairman>"+
                       " <list>"+
                       "<entry uri=\"tel:+862570703284\"/>"+
                       "<entry uri='tel:+862570703384'/>"+
                       "</list>"+
                       "<startTime>20170417233456</startTime>"+
                       "<endTime>20170417233457</endTime>"+
                       "</conferenceHistInfo>  "+
                       "</histConferenceList> ";
        Map<String, Object> map = xml2mapWithAttr(textFromFile, true);  
        // long begin = System.currentTimeMillis();  
        // for(int i=0; i<1000; i++){  
        // map = (Map<String, Object>) xml2mapWithAttr(doc.getRootElement());  
        // }  
        // System.out.println("耗时:"+(System.currentTimeMillis()-begin));  
        JSON json = JSONObject.fromObject(map);  
        System.out.println(json.toString(1)); // 格式化输�?  
          
        Document doc = map2xml(map, "root");  
        //Document doc = map2xml(map); //map中含有根节点的键  
        System.out.println(formatXml(doc));  
        Document doc1 = DocumentHelper.parseText(textFromFile); 
        
        System.out.println(xml2mapWithAttr(doc1.getRootElement()));
    }  
          
    /** 
     * xml转map 不带属�?? 
     * @param xmlStr 
     * @param needRootKey 是否�?要在返回的map里加根节点键 
     * @return 
     * @throws DocumentException 
     */  
    public static Map xml2map(String xmlStr, boolean needRootKey) throws DocumentException {  
        Document doc = DocumentHelper.parseText(xmlStr);  
        Element root = doc.getRootElement();  
        Map<String, Object> map = (Map<String, Object>) xml2map(root);  
        if(root.elements().size()==0 && root.attributes().size()==0){  
            return map;  
        }  
        if(needRootKey){  
            //在返回的map里加根节点键（如果需要）  
            Map<String, Object> rootMap = new HashMap<String, Object>();  
            rootMap.put(root.getName(), map);  
            return rootMap;  
        }  
        return map;  
    }  
  
    /** 
     * xml转map 带属�? 
     * @param xmlStr 
     * @param needRootKey 是否�?要在返回的map里加根节点键 
     * @return 
     * @throws DocumentException 
     */  
    public static Map xml2mapWithAttr(String xmlStr, boolean needRootKey) throws DocumentException {  
        Document doc = DocumentHelper.parseText(xmlStr);  
        Element root = doc.getRootElement();  
        Map<String, Object> map = (Map<String, Object>) xml2mapWithAttr(root);  
        if(root.elements().size()==0 && root.attributes().size()==0){  
            return map; //根节点只有一个文本内�?  
        }  
        if(needRootKey){  
            //在返回的map里加根节点键（如果需要）  
            Map<String, Object> rootMap = new HashMap<String, Object>();  
            rootMap.put(root.getName(), map);  
            return rootMap;  
        }  
        return map;  
    }  
  
    /** 
     * xml转map 不带属�?? 
     * @param e 
     * @return 
     */  
    private static Map xml2map(Element e) {  
        Map map = new LinkedHashMap();  
        List list = e.elements();  
        if (list.size() > 0) {  
            for (int i = 0; i < list.size(); i++) {  
                Element iter = (Element) list.get(i);  
                List mapList = new ArrayList();  
  
                if (iter.elements().size() > 0) {  
                    Map m = xml2map(iter);  
                    if (map.get(iter.getName()) != null) {  
                        Object obj = map.get(iter.getName());  
                        if (!(obj instanceof List)) {  
                            mapList = new ArrayList();  
                            mapList.add(obj);  
                            mapList.add(m);  
                        }  
                        if (obj instanceof List) {  
                            mapList = (List) obj;  
                            mapList.add(m);  
                        }  
                        map.put(iter.getName(), mapList);  
                    } else  
                        map.put(iter.getName(), m);  
                } else {  
                    if (map.get(iter.getName()) != null) {  
                        Object obj = map.get(iter.getName());  
                        if (!(obj instanceof List)) {  
                            mapList = new ArrayList();  
                            mapList.add(obj);  
                            mapList.add(iter.getText());  
                        }  
                        if (obj instanceof List) {  
                            mapList = (List) obj;  
                            mapList.add(iter.getText());  
                        }  
                        map.put(iter.getName(), mapList);  
                    } else  
                        map.put(iter.getName(), iter.getText());  
                }  
            }  
        } else  
            map.put(e.getName(), e.getText());  
        return map;  
    }  
  
    /** 
     * xml转map 带属�? 
     * @param e 
     * @return 
     */  
    private static Map xml2mapWithAttr(Element element) {  
        Map<String, Object> map = new LinkedHashMap<String, Object>();  
  
        List<Element> list = element.elements();  
        List<Attribute> listAttr0 = element.attributes(); // 当前节点的所有属性的list  
        for (Attribute attr : listAttr0) {  
            map.put("@" + attr.getName(), attr.getValue());  
        }  
        if (list.size() > 0) {  
  
            for (int i = 0; i < list.size(); i++) {  
                Element iter = list.get(i);  
                List mapList = new ArrayList();  
  
                if (iter.elements().size() > 0) {  
                    Map m = xml2mapWithAttr(iter);  
                    if (map.get(iter.getName()) != null) {  
                        Object obj = map.get(iter.getName());  
                        if (!(obj instanceof List)) {  
                            mapList = new ArrayList();  
                            mapList.add(obj);  
                            mapList.add(m);  
                        }  
                        if (obj instanceof List) {  
                            mapList = (List) obj;  
                            mapList.add(m);  
                        }  
                        map.put(iter.getName(), mapList);  
                    } else  
                        map.put(iter.getName(), m);  
                } else {  
  
                    List<Attribute> listAttr = iter.attributes(); // 当前节点的所有属性的list  
                    Map<String, Object> attrMap = null;  
                    boolean hasAttributes = false;  
                    if (listAttr.size() > 0) {  
                        hasAttributes = true;  
                        attrMap = new LinkedHashMap<String, Object>();  
                        for (Attribute attr : listAttr) {  
                            attrMap.put("@" + attr.getName(), attr.getValue());  
                        }  
                    }  
  
                    if (map.get(iter.getName()) != null) {  
                        Object obj = map.get(iter.getName());  
                        if (!(obj instanceof List)) {  
                            mapList = new ArrayList();  
                            mapList.add(obj);  
                            // mapList.add(iter.getText());  
                            if (hasAttributes) {  
                                attrMap.put("#text", iter.getText());  
                                mapList.add(attrMap);  
                            } else {  
                                mapList.add(iter.getText());  
                            }  
                        }  
                        if (obj instanceof List) {  
                            mapList = (List) obj;  
                            // mapList.add(iter.getText());  
                            if (hasAttributes) {  
                                attrMap.put("#text", iter.getText());  
                                mapList.add(attrMap);  
                            } else {  
                                mapList.add(iter.getText());  
                            }  
                        }  
                        map.put(iter.getName(), mapList);  
                    } else {  
                        // map.put(iter.getName(), iter.getText());  
                        if (hasAttributes) {  
                            attrMap.put("#text", iter.getText());  
                            map.put(iter.getName(), attrMap);  
                        } else {  
                            map.put(iter.getName(), iter.getText());  
                        }  
                    }  
                }  
            }  
        } else {  
            // 根节点的  
            if (listAttr0.size() > 0) {  
                map.put("#text", element.getText());  
            } else {  
                map.put(element.getName(), element.getText());  
            }  
        }  
        return map;  
    }  
      
    /** 
     * map转xml map中没有根节点的键 
     * @param map 
     * @param rootName 
     * @throws DocumentException 
     * @throws IOException 
     */  
    public static Document map2xml(Map<String, Object> map, String rootName) throws DocumentException, IOException  {  
        Document doc = DocumentHelper.createDocument();  
        Element root = DocumentHelper.createElement(rootName);  
        doc.add(root);  
        map2xml(map, root);  
        //System.out.println(doc.asXML());  
        //System.out.println(formatXml(doc));  
        return doc;  
    }  
      
    /** 
     * map转xml map中含有根节点的键 
     * @param map 
     * @throws DocumentException 
     * @throws IOException 
     */  
    public static Document map2xml(Map<String, Object> map) throws DocumentException, IOException  {  
        Iterator<Map.Entry<String, Object>> entries = map.entrySet().iterator();  
        if(entries.hasNext()){ //获取第一个键创建根节�?  
            Map.Entry<String, Object> entry = entries.next();  
            Document doc = DocumentHelper.createDocument();  
            Element root = DocumentHelper.createElement(entry.getKey());  
            doc.add(root);  
            map2xml((Map)entry.getValue(), root);  
            //System.out.println(doc.asXML());  
            //System.out.println(formatXml(doc));  
            return doc;  
        }  
        return null;  
    }  
      
    /** 
     * map转xml 
     * @param map 
     * @param body xml元素 
     * @return 
     */  
    private static Element map2xml(Map<String, Object> map, Element body) {  
        Iterator<Map.Entry<String, Object>> entries = map.entrySet().iterator();  
        while (entries.hasNext()) {  
            Map.Entry<String, Object> entry = entries.next();  
            String key = entry.getKey();  
            Object value = entry.getValue();  
            if(key.startsWith("@")){    //属�??  
                body.addAttribute(key.substring(1, key.length()), value.toString());  
            } else if(key.equals("#text")){ //有属性时的文�?  
                body.setText(value.toString());  
            } else {  
                if(value instanceof java.util.List ){  
                    List list = (List)value;  
                    Object obj;  
                    for(int i=0; i<list.size(); i++){  
                        obj = list.get(i);  
                        //list里是map或String，不会存在list里直接是list的，  
                        if(obj instanceof java.util.Map){  
                            Element subElement = body.addElement(key);  
                            map2xml((Map)list.get(i), subElement);  
                        } else {  
                            body.addElement(key).setText((String)list.get(i));  
                        }  
                    }  
                } else if(value instanceof java.util.Map ){  
                    Element subElement = body.addElement(key);  
                    map2xml((Map)value, subElement);  
                } else {  
                    body.addElement(key).setText(value.toString());  
                }  
            }  
            //System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());  
        }  
        return body;  
    }  
    
    /** 
     * 格式化输出xml 
     * @param xmlStr 
     * @return 
     * @throws DocumentException 
     * @throws IOException 
     */  
    public static String formatXml(String xmlStr) throws DocumentException, IOException  {  
        Document document = DocumentHelper.parseText(xmlStr);  
        return formatXml(document);  
    }  
      
    /** 
     * 格式化输出xml 
     * @param document 
     * @return 
     * @throws DocumentException 
     * @throws IOException 
     */  
    public static String formatXml(Document document) throws DocumentException, IOException  {  
        // 格式化输出格�?  
        OutputFormat format = OutputFormat.createPrettyPrint();  
        //format.setEncoding("UTF-8");  
        StringWriter writer = new StringWriter();  
        // 格式化输出流  
        XMLWriter xmlWriter = new XMLWriter(writer, format);  
        // 将document写入到输出流  
        xmlWriter.write(document);  
        xmlWriter.close();  
        return writer.toString();  
    }  
  
}  