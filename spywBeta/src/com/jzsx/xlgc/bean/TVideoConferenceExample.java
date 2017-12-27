package com.jzsx.xlgc.bean;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TVideoConferenceExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public TVideoConferenceExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andConfIdIsNull() {
            addCriterion("CONF_ID is null");
            return (Criteria) this;
        }

        public Criteria andConfIdIsNotNull() {
            addCriterion("CONF_ID is not null");
            return (Criteria) this;
        }

        public Criteria andConfIdEqualTo(String value) {
            addCriterion("CONF_ID =", value, "confId");
            return (Criteria) this;
        }

        public Criteria andConfIdNotEqualTo(String value) {
            addCriterion("CONF_ID <>", value, "confId");
            return (Criteria) this;
        }

        public Criteria andConfIdGreaterThan(String value) {
            addCriterion("CONF_ID >", value, "confId");
            return (Criteria) this;
        }

        public Criteria andConfIdGreaterThanOrEqualTo(String value) {
            addCriterion("CONF_ID >=", value, "confId");
            return (Criteria) this;
        }

        public Criteria andConfIdLessThan(String value) {
            addCriterion("CONF_ID <", value, "confId");
            return (Criteria) this;
        }

        public Criteria andConfIdLessThanOrEqualTo(String value) {
            addCriterion("CONF_ID <=", value, "confId");
            return (Criteria) this;
        }

        public Criteria andConfIdLike(String value) {
            addCriterion("CONF_ID like", value, "confId");
            return (Criteria) this;
        }

        public Criteria andConfIdNotLike(String value) {
            addCriterion("CONF_ID not like", value, "confId");
            return (Criteria) this;
        }

        public Criteria andConfIdIn(List<String> values) {
            addCriterion("CONF_ID in", values, "confId");
            return (Criteria) this;
        }

        public Criteria andConfIdNotIn(List<String> values) {
            addCriterion("CONF_ID not in", values, "confId");
            return (Criteria) this;
        }

        public Criteria andConfIdBetween(String value1, String value2) {
            addCriterion("CONF_ID between", value1, value2, "confId");
            return (Criteria) this;
        }

        public Criteria andConfIdNotBetween(String value1, String value2) {
            addCriterion("CONF_ID not between", value1, value2, "confId");
            return (Criteria) this;
        }

        public Criteria andNameIsNull() {
            addCriterion("NAME is null");
            return (Criteria) this;
        }

        public Criteria andNameIsNotNull() {
            addCriterion("NAME is not null");
            return (Criteria) this;
        }

        public Criteria andNameEqualTo(String value) {
            addCriterion("NAME =", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotEqualTo(String value) {
            addCriterion("NAME <>", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThan(String value) {
            addCriterion("NAME >", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThanOrEqualTo(String value) {
            addCriterion("NAME >=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThan(String value) {
            addCriterion("NAME <", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThanOrEqualTo(String value) {
            addCriterion("NAME <=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLike(String value) {
            addCriterion("NAME like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotLike(String value) {
            addCriterion("NAME not like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameIn(List<String> values) {
            addCriterion("NAME in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotIn(List<String> values) {
            addCriterion("NAME not in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameBetween(String value1, String value2) {
            addCriterion("NAME between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotBetween(String value1, String value2) {
            addCriterion("NAME not between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andBeginTimeIsNull() {
            addCriterion("BEGIN_TIME is null");
            return (Criteria) this;
        }

        public Criteria andBeginTimeIsNotNull() {
            addCriterion("BEGIN_TIME is not null");
            return (Criteria) this;
        }

        public Criteria andBeginTimeEqualTo(Date value) {
            addCriterion("BEGIN_TIME =", value, "beginTime");
            return (Criteria) this;
        }

        public Criteria andBeginTimeNotEqualTo(Date value) {
            addCriterion("BEGIN_TIME <>", value, "beginTime");
            return (Criteria) this;
        }

        public Criteria andBeginTimeGreaterThan(Date value) {
            addCriterion("BEGIN_TIME >", value, "beginTime");
            return (Criteria) this;
        }

        public Criteria andBeginTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("BEGIN_TIME >=", value, "beginTime");
            return (Criteria) this;
        }

        public Criteria andBeginTimeLessThan(Date value) {
            addCriterion("BEGIN_TIME <", value, "beginTime");
            return (Criteria) this;
        }

        public Criteria andBeginTimeLessThanOrEqualTo(Date value) {
            addCriterion("BEGIN_TIME <=", value, "beginTime");
            return (Criteria) this;
        }

        public Criteria andBeginTimeIn(List<Date> values) {
            addCriterion("BEGIN_TIME in", values, "beginTime");
            return (Criteria) this;
        }

        public Criteria andBeginTimeNotIn(List<Date> values) {
            addCriterion("BEGIN_TIME not in", values, "beginTime");
            return (Criteria) this;
        }

        public Criteria andBeginTimeBetween(Date value1, Date value2) {
            addCriterion("BEGIN_TIME between", value1, value2, "beginTime");
            return (Criteria) this;
        }

        public Criteria andBeginTimeNotBetween(Date value1, Date value2) {
            addCriterion("BEGIN_TIME not between", value1, value2, "beginTime");
            return (Criteria) this;
        }

        public Criteria andDurationIsNull() {
            addCriterion("DURATION is null");
            return (Criteria) this;
        }

        public Criteria andDurationIsNotNull() {
            addCriterion("DURATION is not null");
            return (Criteria) this;
        }

        public Criteria andDurationEqualTo(String value) {
            addCriterion("DURATION =", value, "duration");
            return (Criteria) this;
        }

        public Criteria andDurationNotEqualTo(String value) {
            addCriterion("DURATION <>", value, "duration");
            return (Criteria) this;
        }

        public Criteria andDurationGreaterThan(String value) {
            addCriterion("DURATION >", value, "duration");
            return (Criteria) this;
        }

        public Criteria andDurationGreaterThanOrEqualTo(String value) {
            addCriterion("DURATION >=", value, "duration");
            return (Criteria) this;
        }

        public Criteria andDurationLessThan(String value) {
            addCriterion("DURATION <", value, "duration");
            return (Criteria) this;
        }

        public Criteria andDurationLessThanOrEqualTo(String value) {
            addCriterion("DURATION <=", value, "duration");
            return (Criteria) this;
        }

        public Criteria andDurationLike(String value) {
            addCriterion("DURATION like", value, "duration");
            return (Criteria) this;
        }

        public Criteria andDurationNotLike(String value) {
            addCriterion("DURATION not like", value, "duration");
            return (Criteria) this;
        }

        public Criteria andDurationIn(List<String> values) {
            addCriterion("DURATION in", values, "duration");
            return (Criteria) this;
        }

        public Criteria andDurationNotIn(List<String> values) {
            addCriterion("DURATION not in", values, "duration");
            return (Criteria) this;
        }

        public Criteria andDurationBetween(String value1, String value2) {
            addCriterion("DURATION between", value1, value2, "duration");
            return (Criteria) this;
        }

        public Criteria andDurationNotBetween(String value1, String value2) {
            addCriterion("DURATION not between", value1, value2, "duration");
            return (Criteria) this;
        }

        public Criteria andAccessCodeIsNull() {
            addCriterion("ACCESS_CODE is null");
            return (Criteria) this;
        }

        public Criteria andAccessCodeIsNotNull() {
            addCriterion("ACCESS_CODE is not null");
            return (Criteria) this;
        }

        public Criteria andAccessCodeEqualTo(String value) {
            addCriterion("ACCESS_CODE =", value, "accessCode");
            return (Criteria) this;
        }

        public Criteria andAccessCodeNotEqualTo(String value) {
            addCriterion("ACCESS_CODE <>", value, "accessCode");
            return (Criteria) this;
        }

        public Criteria andAccessCodeGreaterThan(String value) {
            addCriterion("ACCESS_CODE >", value, "accessCode");
            return (Criteria) this;
        }

        public Criteria andAccessCodeGreaterThanOrEqualTo(String value) {
            addCriterion("ACCESS_CODE >=", value, "accessCode");
            return (Criteria) this;
        }

        public Criteria andAccessCodeLessThan(String value) {
            addCriterion("ACCESS_CODE <", value, "accessCode");
            return (Criteria) this;
        }

        public Criteria andAccessCodeLessThanOrEqualTo(String value) {
            addCriterion("ACCESS_CODE <=", value, "accessCode");
            return (Criteria) this;
        }

        public Criteria andAccessCodeLike(String value) {
            addCriterion("ACCESS_CODE like", value, "accessCode");
            return (Criteria) this;
        }

        public Criteria andAccessCodeNotLike(String value) {
            addCriterion("ACCESS_CODE not like", value, "accessCode");
            return (Criteria) this;
        }

        public Criteria andAccessCodeIn(List<String> values) {
            addCriterion("ACCESS_CODE in", values, "accessCode");
            return (Criteria) this;
        }

        public Criteria andAccessCodeNotIn(List<String> values) {
            addCriterion("ACCESS_CODE not in", values, "accessCode");
            return (Criteria) this;
        }

        public Criteria andAccessCodeBetween(String value1, String value2) {
            addCriterion("ACCESS_CODE between", value1, value2, "accessCode");
            return (Criteria) this;
        }

        public Criteria andAccessCodeNotBetween(String value1, String value2) {
            addCriterion("ACCESS_CODE not between", value1, value2, "accessCode");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrIsNull() {
            addCriterion("RECORDER_ADDR is null");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrIsNotNull() {
            addCriterion("RECORDER_ADDR is not null");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrEqualTo(String value) {
            addCriterion("RECORDER_ADDR =", value, "recorderAddr");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrNotEqualTo(String value) {
            addCriterion("RECORDER_ADDR <>", value, "recorderAddr");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrGreaterThan(String value) {
            addCriterion("RECORDER_ADDR >", value, "recorderAddr");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrGreaterThanOrEqualTo(String value) {
            addCriterion("RECORDER_ADDR >=", value, "recorderAddr");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrLessThan(String value) {
            addCriterion("RECORDER_ADDR <", value, "recorderAddr");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrLessThanOrEqualTo(String value) {
            addCriterion("RECORDER_ADDR <=", value, "recorderAddr");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrLike(String value) {
            addCriterion("RECORDER_ADDR like", value, "recorderAddr");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrNotLike(String value) {
            addCriterion("RECORDER_ADDR not like", value, "recorderAddr");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrIn(List<String> values) {
            addCriterion("RECORDER_ADDR in", values, "recorderAddr");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrNotIn(List<String> values) {
            addCriterion("RECORDER_ADDR not in", values, "recorderAddr");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrBetween(String value1, String value2) {
            addCriterion("RECORDER_ADDR between", value1, value2, "recorderAddr");
            return (Criteria) this;
        }

        public Criteria andRecorderAddrNotBetween(String value1, String value2) {
            addCriterion("RECORDER_ADDR not between", value1, value2, "recorderAddr");
            return (Criteria) this;
        }

        public Criteria andIsRecordingIsNull() {
            addCriterion("IS_RECORDING is null");
            return (Criteria) this;
        }

        public Criteria andIsRecordingIsNotNull() {
            addCriterion("IS_RECORDING is not null");
            return (Criteria) this;
        }

        public Criteria andIsRecordingEqualTo(Integer value) {
            addCriterion("IS_RECORDING =", value, "isRecording");
            return (Criteria) this;
        }

        public Criteria andIsRecordingNotEqualTo(Integer value) {
            addCriterion("IS_RECORDING <>", value, "isRecording");
            return (Criteria) this;
        }

        public Criteria andIsRecordingGreaterThan(Integer value) {
            addCriterion("IS_RECORDING >", value, "isRecording");
            return (Criteria) this;
        }

        public Criteria andIsRecordingGreaterThanOrEqualTo(Integer value) {
            addCriterion("IS_RECORDING >=", value, "isRecording");
            return (Criteria) this;
        }

        public Criteria andIsRecordingLessThan(Integer value) {
            addCriterion("IS_RECORDING <", value, "isRecording");
            return (Criteria) this;
        }

        public Criteria andIsRecordingLessThanOrEqualTo(Integer value) {
            addCriterion("IS_RECORDING <=", value, "isRecording");
            return (Criteria) this;
        }

        public Criteria andIsRecordingIn(List<Integer> values) {
            addCriterion("IS_RECORDING in", values, "isRecording");
            return (Criteria) this;
        }

        public Criteria andIsRecordingNotIn(List<Integer> values) {
            addCriterion("IS_RECORDING not in", values, "isRecording");
            return (Criteria) this;
        }

        public Criteria andIsRecordingBetween(Integer value1, Integer value2) {
            addCriterion("IS_RECORDING between", value1, value2, "isRecording");
            return (Criteria) this;
        }

        public Criteria andIsRecordingNotBetween(Integer value1, Integer value2) {
            addCriterion("IS_RECORDING not between", value1, value2, "isRecording");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordIsNull() {
            addCriterion("CHAIRMAN_PASSWORD is null");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordIsNotNull() {
            addCriterion("CHAIRMAN_PASSWORD is not null");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordEqualTo(String value) {
            addCriterion("CHAIRMAN_PASSWORD =", value, "chairmanPassword");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordNotEqualTo(String value) {
            addCriterion("CHAIRMAN_PASSWORD <>", value, "chairmanPassword");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordGreaterThan(String value) {
            addCriterion("CHAIRMAN_PASSWORD >", value, "chairmanPassword");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordGreaterThanOrEqualTo(String value) {
            addCriterion("CHAIRMAN_PASSWORD >=", value, "chairmanPassword");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordLessThan(String value) {
            addCriterion("CHAIRMAN_PASSWORD <", value, "chairmanPassword");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordLessThanOrEqualTo(String value) {
            addCriterion("CHAIRMAN_PASSWORD <=", value, "chairmanPassword");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordLike(String value) {
            addCriterion("CHAIRMAN_PASSWORD like", value, "chairmanPassword");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordNotLike(String value) {
            addCriterion("CHAIRMAN_PASSWORD not like", value, "chairmanPassword");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordIn(List<String> values) {
            addCriterion("CHAIRMAN_PASSWORD in", values, "chairmanPassword");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordNotIn(List<String> values) {
            addCriterion("CHAIRMAN_PASSWORD not in", values, "chairmanPassword");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordBetween(String value1, String value2) {
            addCriterion("CHAIRMAN_PASSWORD between", value1, value2, "chairmanPassword");
            return (Criteria) this;
        }

        public Criteria andChairmanPasswordNotBetween(String value1, String value2) {
            addCriterion("CHAIRMAN_PASSWORD not between", value1, value2, "chairmanPassword");
            return (Criteria) this;
        }

        public Criteria andMainMcuIdIsNull() {
            addCriterion("MAIN_MCU_ID is null");
            return (Criteria) this;
        }

        public Criteria andMainMcuIdIsNotNull() {
            addCriterion("MAIN_MCU_ID is not null");
            return (Criteria) this;
        }

        public Criteria andMainMcuIdEqualTo(Integer value) {
            addCriterion("MAIN_MCU_ID =", value, "mainMcuId");
            return (Criteria) this;
        }

        public Criteria andMainMcuIdNotEqualTo(Integer value) {
            addCriterion("MAIN_MCU_ID <>", value, "mainMcuId");
            return (Criteria) this;
        }

        public Criteria andMainMcuIdGreaterThan(Integer value) {
            addCriterion("MAIN_MCU_ID >", value, "mainMcuId");
            return (Criteria) this;
        }

        public Criteria andMainMcuIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("MAIN_MCU_ID >=", value, "mainMcuId");
            return (Criteria) this;
        }

        public Criteria andMainMcuIdLessThan(Integer value) {
            addCriterion("MAIN_MCU_ID <", value, "mainMcuId");
            return (Criteria) this;
        }

        public Criteria andMainMcuIdLessThanOrEqualTo(Integer value) {
            addCriterion("MAIN_MCU_ID <=", value, "mainMcuId");
            return (Criteria) this;
        }

        public Criteria andMainMcuIdIn(List<Integer> values) {
            addCriterion("MAIN_MCU_ID in", values, "mainMcuId");
            return (Criteria) this;
        }

        public Criteria andMainMcuIdNotIn(List<Integer> values) {
            addCriterion("MAIN_MCU_ID not in", values, "mainMcuId");
            return (Criteria) this;
        }

        public Criteria andMainMcuIdBetween(Integer value1, Integer value2) {
            addCriterion("MAIN_MCU_ID between", value1, value2, "mainMcuId");
            return (Criteria) this;
        }

        public Criteria andMainMcuIdNotBetween(Integer value1, Integer value2) {
            addCriterion("MAIN_MCU_ID not between", value1, value2, "mainMcuId");
            return (Criteria) this;
        }

        public Criteria andSitesIsNull() {
            addCriterion("SITES is null");
            return (Criteria) this;
        }

        public Criteria andSitesIsNotNull() {
            addCriterion("SITES is not null");
            return (Criteria) this;
        }

        public Criteria andSitesEqualTo(String value) {
            addCriterion("SITES =", value, "sites");
            return (Criteria) this;
        }

        public Criteria andSitesNotEqualTo(String value) {
            addCriterion("SITES <>", value, "sites");
            return (Criteria) this;
        }

        public Criteria andSitesGreaterThan(String value) {
            addCriterion("SITES >", value, "sites");
            return (Criteria) this;
        }

        public Criteria andSitesGreaterThanOrEqualTo(String value) {
            addCriterion("SITES >=", value, "sites");
            return (Criteria) this;
        }

        public Criteria andSitesLessThan(String value) {
            addCriterion("SITES <", value, "sites");
            return (Criteria) this;
        }

        public Criteria andSitesLessThanOrEqualTo(String value) {
            addCriterion("SITES <=", value, "sites");
            return (Criteria) this;
        }

        public Criteria andSitesLike(String value) {
            addCriterion("SITES like", value, "sites");
            return (Criteria) this;
        }

        public Criteria andSitesNotLike(String value) {
            addCriterion("SITES not like", value, "sites");
            return (Criteria) this;
        }

        public Criteria andSitesIn(List<String> values) {
            addCriterion("SITES in", values, "sites");
            return (Criteria) this;
        }

        public Criteria andSitesNotIn(List<String> values) {
            addCriterion("SITES not in", values, "sites");
            return (Criteria) this;
        }

        public Criteria andSitesBetween(String value1, String value2) {
            addCriterion("SITES between", value1, value2, "sites");
            return (Criteria) this;
        }

        public Criteria andSitesNotBetween(String value1, String value2) {
            addCriterion("SITES not between", value1, value2, "sites");
            return (Criteria) this;
        }

        public Criteria andTypeIsNull() {
            addCriterion("TYPE is null");
            return (Criteria) this;
        }

        public Criteria andTypeIsNotNull() {
            addCriterion("TYPE is not null");
            return (Criteria) this;
        }

        public Criteria andTypeEqualTo(Integer value) {
            addCriterion("TYPE =", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotEqualTo(Integer value) {
            addCriterion("TYPE <>", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThan(Integer value) {
            addCriterion("TYPE >", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("TYPE >=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThan(Integer value) {
            addCriterion("TYPE <", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThanOrEqualTo(Integer value) {
            addCriterion("TYPE <=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeIn(List<Integer> values) {
            addCriterion("TYPE in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotIn(List<Integer> values) {
            addCriterion("TYPE not in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeBetween(Integer value1, Integer value2) {
            addCriterion("TYPE between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("TYPE not between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andCreateNameIsNull() {
            addCriterion("CREATE_NAME is null");
            return (Criteria) this;
        }

        public Criteria andCreateNameIsNotNull() {
            addCriterion("CREATE_NAME is not null");
            return (Criteria) this;
        }

        public Criteria andCreateNameEqualTo(String value) {
            addCriterion("CREATE_NAME =", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameNotEqualTo(String value) {
            addCriterion("CREATE_NAME <>", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameGreaterThan(String value) {
            addCriterion("CREATE_NAME >", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameGreaterThanOrEqualTo(String value) {
            addCriterion("CREATE_NAME >=", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameLessThan(String value) {
            addCriterion("CREATE_NAME <", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameLessThanOrEqualTo(String value) {
            addCriterion("CREATE_NAME <=", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameLike(String value) {
            addCriterion("CREATE_NAME like", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameNotLike(String value) {
            addCriterion("CREATE_NAME not like", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameIn(List<String> values) {
            addCriterion("CREATE_NAME in", values, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameNotIn(List<String> values) {
            addCriterion("CREATE_NAME not in", values, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameBetween(String value1, String value2) {
            addCriterion("CREATE_NAME between", value1, value2, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameNotBetween(String value1, String value2) {
            addCriterion("CREATE_NAME not between", value1, value2, "createName");
            return (Criteria) this;
        }

        public Criteria andStatusIsNull() {
            addCriterion("STATUS is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("STATUS is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(Integer value) {
            addCriterion("STATUS =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(Integer value) {
            addCriterion("STATUS <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(Integer value) {
            addCriterion("STATUS >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("STATUS >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(Integer value) {
            addCriterion("STATUS <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(Integer value) {
            addCriterion("STATUS <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<Integer> values) {
            addCriterion("STATUS in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<Integer> values) {
            addCriterion("STATUS not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(Integer value1, Integer value2) {
            addCriterion("STATUS between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("STATUS not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNull() {
            addCriterion("USER_ID is null");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNotNull() {
            addCriterion("USER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andUserIdEqualTo(String value) {
            addCriterion("USER_ID =", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotEqualTo(String value) {
            addCriterion("USER_ID <>", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThan(String value) {
            addCriterion("USER_ID >", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThanOrEqualTo(String value) {
            addCriterion("USER_ID >=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThan(String value) {
            addCriterion("USER_ID <", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThanOrEqualTo(String value) {
            addCriterion("USER_ID <=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLike(String value) {
            addCriterion("USER_ID like", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotLike(String value) {
            addCriterion("USER_ID not like", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdIn(List<String> values) {
            addCriterion("USER_ID in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotIn(List<String> values) {
            addCriterion("USER_ID not in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdBetween(String value1, String value2) {
            addCriterion("USER_ID between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotBetween(String value1, String value2) {
            addCriterion("USER_ID not between", value1, value2, "userId");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}