package com.zte.ccs.os.meeting.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

public class JsonUtil {
	/**
     * 简单类型：Json转化为bean
     * 
     * @param jsonString
     * @param pojoCalss
     * @return
     */
    public static Object jsonString2Object(String jsonString, Class pojoCalss) {

        JSONObject jsonObject = JSONObject.fromObject(jsonString);

        Object pojo = JSONObject.toBean(jsonObject, pojoCalss);

        return pojo;

    }

    /**
     * 复杂类型：Json转化为bean<br>
     * 用法示例：<br>
     * Map<String, Class> classMap = new HashMap<String, Class>();
     * classMap.put("list", ChildBean.class); //指定复杂类型属性的映射关系，可以使多个放到map中<br>
     * Person person=(Person)JsonUtil.jsonString2Object(str2, Person.class,
     * classMap);<br>
     * 
     * @param jsonString
     * @param pojoCalss
     * @return
     */
    public static Object jsonString2Object(String jsonString, Class pojoCalss, Map<String, Class> classMap) {
        JSONObject jobj = JSONObject.fromObject(jsonString);
        return JSONObject.toBean(jobj, pojoCalss, classMap);
    }

    /**
     * 简单|复杂类型：将java对象转换成json字符串<br>
     * 支持复杂类型：Java bean 中既有属性又有list
     * 
     * @param javaObj
     * @return
     */
    public static String object2JsonString(Object javaObj) {

        JSONObject json = JSONObject.fromObject(javaObj);

        return json.toString();

    }

    /**
     * 从json对象集合表达式中得到一个java对象列表
     * 
     * @param jsonString
     * @param pojoClass
     * @return
     */
    public static List jsonList2JavaList(String jsonString, Class pojoClass) {

        JSONArray jsonArray = JSONArray.fromObject(jsonString);

        JSONObject jsonObject;

        Object pojoValue;

        List list = new ArrayList();

        for (int i = 0; i < jsonArray.size(); i++) {

            jsonObject = jsonArray.getJSONObject(i);

            pojoValue = JSONObject.toBean(jsonObject, pojoClass);

            list.add(pojoValue);

        }

        return list;

    }

    /**
     * 从java对象集合表达式中得到一个json列表
     * 
     * @param list
     * @return
     */
    public static String javaList2JsonList(List list) {

        JSONArray jsonArray = JSONArray.fromObject(list);
        return jsonArray.toString();
    }

    /**
     * 数组转换为JSON
     * 
     * @param array
     * @return
     */
    public static String javaArray2Json(Object[] array) {
        JSONArray jsonarray = JSONArray.fromObject(array);
        return jsonarray.toString();
    }

    /**
     * Json数组转化为Java数组
     * 
     * @param jsonArray
     * @param clas
     * @return
     */
    public static Object jsonArray2JavaArrray(String jsonArray, Class clas) {
        JsonConfig jconfig = new JsonConfig();
        jconfig.setArrayMode(JsonConfig.MODE_OBJECT_ARRAY);
        jconfig.setRootClass(clas);
        JSONArray jarr = JSONArray.fromObject(jsonArray);
        return JSONSerializer.toJava(jarr, jconfig);
    }

    /**
     * Map转换成json
     * @param map
     * @return
     */
    public static String javaMap2Json(Map<String, Object> map) {
        return JSONObject.fromObject(map).toString();
    }
    
    /**
     * json转化为map
     * @param jsonString
     * @param pojoCalss
     * @return
     */
    public static Object javaMap2Json(String jsonString, Class<?> pojoCalss) {
        return jsonString2Object(jsonString, pojoCalss);//调用方法jsonString2Object
    }

}
