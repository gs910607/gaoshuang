package com.jzsx.xlha.videoMonitoring.bean;

public class VideoCamera {

	/**
	 * 相机
	 */
	private String object_id;
	/**
	 * 标准规定id
	 */
	private String camera_id;
	/**
	 * 相机名称
	 */
	private String camera_name;
	/**
	 * 相机类型
	 */
	private int camera_type;
	/**
	 * IP地址
	 */
	private String ip_addr;
	/**
	 * 安装地点行政区划代码
	 */
	private String place_code;
	/**
	 * 管辖单位代码
	 */
	private String org_code;
	/**
	 * 经度
	 */
	private int longitude;
	/**
	 * 纬度
	 */
	private int latitude;
	/**
	 * 原有平台标识
	 */
	private String plat_code;
	public String getObject_id() {
		return object_id;
	}
	public void setObject_id(String object_id) {
		this.object_id = object_id;
	}
	public String getCamera_id() {
		return camera_id;
	}
	public void setCamera_id(String camera_id) {
		this.camera_id = camera_id;
	}
	public String getCamera_name() {
		return camera_name;
	}
	public void setCamera_name(String camera_name) {
		this.camera_name = camera_name;
	}
	public int getCamera_type() {
		return camera_type;
	}
	public void setCamera_type(int camera_type) {
		this.camera_type = camera_type;
	}
	public String getIp_addr() {
		return ip_addr;
	}
	public void setIp_addr(String ip_addr) {
		this.ip_addr = ip_addr;
	}
	public String getPlace_code() {
		return place_code;
	}
	public void setPlace_code(String place_code) {
		this.place_code = place_code;
	}
	public String getOrg_code() {
		return org_code;
	}
	public void setOrg_code(String org_code) {
		this.org_code = org_code;
	}
	public int getLongitude() {
		return longitude;
	}
	public void setLongitude(int longitude) {
		this.longitude = longitude;
	}
	public int getLatitude() {
		return latitude;
	}
	public void setLatitude(int latitude) {
		this.latitude = latitude;
	}
	public String getPlat_code() {
		return plat_code;
	}
	public void setPlat_code(String plat_code) {
		this.plat_code = plat_code;
	}
	
	
}
