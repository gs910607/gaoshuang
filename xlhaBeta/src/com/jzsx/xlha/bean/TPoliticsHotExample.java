package com.jzsx.xlha.bean;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TPoliticsHotExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public TPoliticsHotExample() {
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

        public Criteria andCPoliticsIdIsNull() {
            addCriterion("C_POLITICS_ID is null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdIsNotNull() {
            addCriterion("C_POLITICS_ID is not null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdEqualTo(String value) {
            addCriterion("C_POLITICS_ID =", value, "cPoliticsId");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdNotEqualTo(String value) {
            addCriterion("C_POLITICS_ID <>", value, "cPoliticsId");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdGreaterThan(String value) {
            addCriterion("C_POLITICS_ID >", value, "cPoliticsId");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdGreaterThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_ID >=", value, "cPoliticsId");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdLessThan(String value) {
            addCriterion("C_POLITICS_ID <", value, "cPoliticsId");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdLessThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_ID <=", value, "cPoliticsId");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdLike(String value) {
            addCriterion("C_POLITICS_ID like", value, "cPoliticsId");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdNotLike(String value) {
            addCriterion("C_POLITICS_ID not like", value, "cPoliticsId");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdIn(List<String> values) {
            addCriterion("C_POLITICS_ID in", values, "cPoliticsId");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdNotIn(List<String> values) {
            addCriterion("C_POLITICS_ID not in", values, "cPoliticsId");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdBetween(String value1, String value2) {
            addCriterion("C_POLITICS_ID between", value1, value2, "cPoliticsId");
            return (Criteria) this;
        }

        public Criteria andCPoliticsIdNotBetween(String value1, String value2) {
            addCriterion("C_POLITICS_ID not between", value1, value2, "cPoliticsId");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTypeIsNull() {
            addCriterion("C_POLITICS_TYPE is null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTypeIsNotNull() {
            addCriterion("C_POLITICS_TYPE is not null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTypeEqualTo(BigDecimal value) {
            addCriterion("C_POLITICS_TYPE =", value, "cPoliticsType");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTypeNotEqualTo(BigDecimal value) {
            addCriterion("C_POLITICS_TYPE <>", value, "cPoliticsType");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTypeGreaterThan(BigDecimal value) {
            addCriterion("C_POLITICS_TYPE >", value, "cPoliticsType");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTypeGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("C_POLITICS_TYPE >=", value, "cPoliticsType");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTypeLessThan(BigDecimal value) {
            addCriterion("C_POLITICS_TYPE <", value, "cPoliticsType");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTypeLessThanOrEqualTo(BigDecimal value) {
            addCriterion("C_POLITICS_TYPE <=", value, "cPoliticsType");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTypeIn(List<BigDecimal> values) {
            addCriterion("C_POLITICS_TYPE in", values, "cPoliticsType");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTypeNotIn(List<BigDecimal> values) {
            addCriterion("C_POLITICS_TYPE not in", values, "cPoliticsType");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTypeBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("C_POLITICS_TYPE between", value1, value2, "cPoliticsType");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTypeNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("C_POLITICS_TYPE not between", value1, value2, "cPoliticsType");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleIsNull() {
            addCriterion("C_POLITICS_TITLE is null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleIsNotNull() {
            addCriterion("C_POLITICS_TITLE is not null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleEqualTo(String value) {
            addCriterion("C_POLITICS_TITLE =", value, "cPoliticsTitle");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleNotEqualTo(String value) {
            addCriterion("C_POLITICS_TITLE <>", value, "cPoliticsTitle");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleGreaterThan(String value) {
            addCriterion("C_POLITICS_TITLE >", value, "cPoliticsTitle");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleGreaterThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_TITLE >=", value, "cPoliticsTitle");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleLessThan(String value) {
            addCriterion("C_POLITICS_TITLE <", value, "cPoliticsTitle");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleLessThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_TITLE <=", value, "cPoliticsTitle");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleLike(String value) {
            addCriterion("C_POLITICS_TITLE like", value, "cPoliticsTitle");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleNotLike(String value) {
            addCriterion("C_POLITICS_TITLE not like", value, "cPoliticsTitle");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleIn(List<String> values) {
            addCriterion("C_POLITICS_TITLE in", values, "cPoliticsTitle");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleNotIn(List<String> values) {
            addCriterion("C_POLITICS_TITLE not in", values, "cPoliticsTitle");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleBetween(String value1, String value2) {
            addCriterion("C_POLITICS_TITLE between", value1, value2, "cPoliticsTitle");
            return (Criteria) this;
        }

        public Criteria andCPoliticsTitleNotBetween(String value1, String value2) {
            addCriterion("C_POLITICS_TITLE not between", value1, value2, "cPoliticsTitle");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageIsNull() {
            addCriterion("C_POLITICS_IMAGE is null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageIsNotNull() {
            addCriterion("C_POLITICS_IMAGE is not null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageEqualTo(String value) {
            addCriterion("C_POLITICS_IMAGE =", value, "cPoliticsImage");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageNotEqualTo(String value) {
            addCriterion("C_POLITICS_IMAGE <>", value, "cPoliticsImage");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageGreaterThan(String value) {
            addCriterion("C_POLITICS_IMAGE >", value, "cPoliticsImage");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageGreaterThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_IMAGE >=", value, "cPoliticsImage");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageLessThan(String value) {
            addCriterion("C_POLITICS_IMAGE <", value, "cPoliticsImage");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageLessThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_IMAGE <=", value, "cPoliticsImage");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageLike(String value) {
            addCriterion("C_POLITICS_IMAGE like", value, "cPoliticsImage");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageNotLike(String value) {
            addCriterion("C_POLITICS_IMAGE not like", value, "cPoliticsImage");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageIn(List<String> values) {
            addCriterion("C_POLITICS_IMAGE in", values, "cPoliticsImage");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageNotIn(List<String> values) {
            addCriterion("C_POLITICS_IMAGE not in", values, "cPoliticsImage");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageBetween(String value1, String value2) {
            addCriterion("C_POLITICS_IMAGE between", value1, value2, "cPoliticsImage");
            return (Criteria) this;
        }

        public Criteria andCPoliticsImageNotBetween(String value1, String value2) {
            addCriterion("C_POLITICS_IMAGE not between", value1, value2, "cPoliticsImage");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoIsNull() {
            addCriterion("C_POLITICS_VIDEO is null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoIsNotNull() {
            addCriterion("C_POLITICS_VIDEO is not null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoEqualTo(String value) {
            addCriterion("C_POLITICS_VIDEO =", value, "cPoliticsVideo");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoNotEqualTo(String value) {
            addCriterion("C_POLITICS_VIDEO <>", value, "cPoliticsVideo");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoGreaterThan(String value) {
            addCriterion("C_POLITICS_VIDEO >", value, "cPoliticsVideo");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoGreaterThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_VIDEO >=", value, "cPoliticsVideo");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoLessThan(String value) {
            addCriterion("C_POLITICS_VIDEO <", value, "cPoliticsVideo");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoLessThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_VIDEO <=", value, "cPoliticsVideo");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoLike(String value) {
            addCriterion("C_POLITICS_VIDEO like", value, "cPoliticsVideo");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoNotLike(String value) {
            addCriterion("C_POLITICS_VIDEO not like", value, "cPoliticsVideo");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoIn(List<String> values) {
            addCriterion("C_POLITICS_VIDEO in", values, "cPoliticsVideo");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoNotIn(List<String> values) {
            addCriterion("C_POLITICS_VIDEO not in", values, "cPoliticsVideo");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoBetween(String value1, String value2) {
            addCriterion("C_POLITICS_VIDEO between", value1, value2, "cPoliticsVideo");
            return (Criteria) this;
        }

        public Criteria andCPoliticsVideoNotBetween(String value1, String value2) {
            addCriterion("C_POLITICS_VIDEO not between", value1, value2, "cPoliticsVideo");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeIsNull() {
            addCriterion("C_POLITICS_STARTTIME is null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeIsNotNull() {
            addCriterion("C_POLITICS_STARTTIME is not null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeEqualTo(String value) {
            addCriterion("C_POLITICS_STARTTIME =", value, "cPoliticsStarttime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeNotEqualTo(String value) {
            addCriterion("C_POLITICS_STARTTIME <>", value, "cPoliticsStarttime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeGreaterThan(String value) {
            addCriterion("C_POLITICS_STARTTIME >", value, "cPoliticsStarttime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeGreaterThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_STARTTIME >=", value, "cPoliticsStarttime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeLessThan(String value) {
            addCriterion("C_POLITICS_STARTTIME <", value, "cPoliticsStarttime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeLessThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_STARTTIME <=", value, "cPoliticsStarttime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeLike(String value) {
            addCriterion("C_POLITICS_STARTTIME like", value, "cPoliticsStarttime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeNotLike(String value) {
            addCriterion("C_POLITICS_STARTTIME not like", value, "cPoliticsStarttime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeIn(List<String> values) {
            addCriterion("C_POLITICS_STARTTIME in", values, "cPoliticsStarttime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeNotIn(List<String> values) {
            addCriterion("C_POLITICS_STARTTIME not in", values, "cPoliticsStarttime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeBetween(String value1, String value2) {
            addCriterion("C_POLITICS_STARTTIME between", value1, value2, "cPoliticsStarttime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStarttimeNotBetween(String value1, String value2) {
            addCriterion("C_POLITICS_STARTTIME not between", value1, value2, "cPoliticsStarttime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeIsNull() {
            addCriterion("C_POLITICS_STOPTIME is null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeIsNotNull() {
            addCriterion("C_POLITICS_STOPTIME is not null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeEqualTo(String value) {
            addCriterion("C_POLITICS_STOPTIME =", value, "cPoliticsStoptime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeNotEqualTo(String value) {
            addCriterion("C_POLITICS_STOPTIME <>", value, "cPoliticsStoptime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeGreaterThan(String value) {
            addCriterion("C_POLITICS_STOPTIME >", value, "cPoliticsStoptime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeGreaterThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_STOPTIME >=", value, "cPoliticsStoptime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeLessThan(String value) {
            addCriterion("C_POLITICS_STOPTIME <", value, "cPoliticsStoptime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeLessThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_STOPTIME <=", value, "cPoliticsStoptime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeLike(String value) {
            addCriterion("C_POLITICS_STOPTIME like", value, "cPoliticsStoptime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeNotLike(String value) {
            addCriterion("C_POLITICS_STOPTIME not like", value, "cPoliticsStoptime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeIn(List<String> values) {
            addCriterion("C_POLITICS_STOPTIME in", values, "cPoliticsStoptime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeNotIn(List<String> values) {
            addCriterion("C_POLITICS_STOPTIME not in", values, "cPoliticsStoptime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeBetween(String value1, String value2) {
            addCriterion("C_POLITICS_STOPTIME between", value1, value2, "cPoliticsStoptime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsStoptimeNotBetween(String value1, String value2) {
            addCriterion("C_POLITICS_STOPTIME not between", value1, value2, "cPoliticsStoptime");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridIsNull() {
            addCriterion("C_FOREIGN_USERID is null");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridIsNotNull() {
            addCriterion("C_FOREIGN_USERID is not null");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridEqualTo(String value) {
            addCriterion("C_FOREIGN_USERID =", value, "cForeignUserid");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridNotEqualTo(String value) {
            addCriterion("C_FOREIGN_USERID <>", value, "cForeignUserid");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridGreaterThan(String value) {
            addCriterion("C_FOREIGN_USERID >", value, "cForeignUserid");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridGreaterThanOrEqualTo(String value) {
            addCriterion("C_FOREIGN_USERID >=", value, "cForeignUserid");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridLessThan(String value) {
            addCriterion("C_FOREIGN_USERID <", value, "cForeignUserid");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridLessThanOrEqualTo(String value) {
            addCriterion("C_FOREIGN_USERID <=", value, "cForeignUserid");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridLike(String value) {
            addCriterion("C_FOREIGN_USERID like", value, "cForeignUserid");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridNotLike(String value) {
            addCriterion("C_FOREIGN_USERID not like", value, "cForeignUserid");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridIn(List<String> values) {
            addCriterion("C_FOREIGN_USERID in", values, "cForeignUserid");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridNotIn(List<String> values) {
            addCriterion("C_FOREIGN_USERID not in", values, "cForeignUserid");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridBetween(String value1, String value2) {
            addCriterion("C_FOREIGN_USERID between", value1, value2, "cForeignUserid");
            return (Criteria) this;
        }

        public Criteria andCForeignUseridNotBetween(String value1, String value2) {
            addCriterion("C_FOREIGN_USERID not between", value1, value2, "cForeignUserid");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreatetimeIsNull() {
            addCriterion("C_POLITICS_CREATETIME is null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreatetimeIsNotNull() {
            addCriterion("C_POLITICS_CREATETIME is not null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreatetimeEqualTo(Date value) {
            addCriterion("C_POLITICS_CREATETIME =", value, "cPoliticsCreatetime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreatetimeNotEqualTo(Date value) {
            addCriterion("C_POLITICS_CREATETIME <>", value, "cPoliticsCreatetime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreatetimeGreaterThan(Date value) {
            addCriterion("C_POLITICS_CREATETIME >", value, "cPoliticsCreatetime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreatetimeGreaterThanOrEqualTo(Date value) {
            addCriterion("C_POLITICS_CREATETIME >=", value, "cPoliticsCreatetime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreatetimeLessThan(Date value) {
            addCriterion("C_POLITICS_CREATETIME <", value, "cPoliticsCreatetime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreatetimeLessThanOrEqualTo(Date value) {
            addCriterion("C_POLITICS_CREATETIME <=", value, "cPoliticsCreatetime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreatetimeIn(List<Date> values) {
            addCriterion("C_POLITICS_CREATETIME in", values, "cPoliticsCreatetime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreatetimeNotIn(List<Date> values) {
            addCriterion("C_POLITICS_CREATETIME not in", values, "cPoliticsCreatetime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreatetimeBetween(Date value1, Date value2) {
            addCriterion("C_POLITICS_CREATETIME between", value1, value2, "cPoliticsCreatetime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreatetimeNotBetween(Date value1, Date value2) {
            addCriterion("C_POLITICS_CREATETIME not between", value1, value2, "cPoliticsCreatetime");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateIsNull() {
            addCriterion("C_POLITICS_CREATE is null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateIsNotNull() {
            addCriterion("C_POLITICS_CREATE is not null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateEqualTo(String value) {
            addCriterion("C_POLITICS_CREATE =", value, "cPoliticsCreate");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateNotEqualTo(String value) {
            addCriterion("C_POLITICS_CREATE <>", value, "cPoliticsCreate");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateGreaterThan(String value) {
            addCriterion("C_POLITICS_CREATE >", value, "cPoliticsCreate");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateGreaterThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_CREATE >=", value, "cPoliticsCreate");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateLessThan(String value) {
            addCriterion("C_POLITICS_CREATE <", value, "cPoliticsCreate");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateLessThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_CREATE <=", value, "cPoliticsCreate");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateLike(String value) {
            addCriterion("C_POLITICS_CREATE like", value, "cPoliticsCreate");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateNotLike(String value) {
            addCriterion("C_POLITICS_CREATE not like", value, "cPoliticsCreate");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateIn(List<String> values) {
            addCriterion("C_POLITICS_CREATE in", values, "cPoliticsCreate");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateNotIn(List<String> values) {
            addCriterion("C_POLITICS_CREATE not in", values, "cPoliticsCreate");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateBetween(String value1, String value2) {
            addCriterion("C_POLITICS_CREATE between", value1, value2, "cPoliticsCreate");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCreateNotBetween(String value1, String value2) {
            addCriterion("C_POLITICS_CREATE not between", value1, value2, "cPoliticsCreate");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorIsNull() {
            addCriterion("C_POLITICS_EDITOR is null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorIsNotNull() {
            addCriterion("C_POLITICS_EDITOR is not null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorEqualTo(String value) {
            addCriterion("C_POLITICS_EDITOR =", value, "cPoliticsEditor");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorNotEqualTo(String value) {
            addCriterion("C_POLITICS_EDITOR <>", value, "cPoliticsEditor");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorGreaterThan(String value) {
            addCriterion("C_POLITICS_EDITOR >", value, "cPoliticsEditor");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorGreaterThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_EDITOR >=", value, "cPoliticsEditor");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorLessThan(String value) {
            addCriterion("C_POLITICS_EDITOR <", value, "cPoliticsEditor");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorLessThanOrEqualTo(String value) {
            addCriterion("C_POLITICS_EDITOR <=", value, "cPoliticsEditor");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorLike(String value) {
            addCriterion("C_POLITICS_EDITOR like", value, "cPoliticsEditor");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorNotLike(String value) {
            addCriterion("C_POLITICS_EDITOR not like", value, "cPoliticsEditor");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorIn(List<String> values) {
            addCriterion("C_POLITICS_EDITOR in", values, "cPoliticsEditor");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorNotIn(List<String> values) {
            addCriterion("C_POLITICS_EDITOR not in", values, "cPoliticsEditor");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorBetween(String value1, String value2) {
            addCriterion("C_POLITICS_EDITOR between", value1, value2, "cPoliticsEditor");
            return (Criteria) this;
        }

        public Criteria andCPoliticsEditorNotBetween(String value1, String value2) {
            addCriterion("C_POLITICS_EDITOR not between", value1, value2, "cPoliticsEditor");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCountIsNull() {
            addCriterion("C_POLITICS_COUNT is null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCountIsNotNull() {
            addCriterion("C_POLITICS_COUNT is not null");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCountEqualTo(BigDecimal value) {
            addCriterion("C_POLITICS_COUNT =", value, "cPoliticsCount");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCountNotEqualTo(BigDecimal value) {
            addCriterion("C_POLITICS_COUNT <>", value, "cPoliticsCount");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCountGreaterThan(BigDecimal value) {
            addCriterion("C_POLITICS_COUNT >", value, "cPoliticsCount");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCountGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("C_POLITICS_COUNT >=", value, "cPoliticsCount");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCountLessThan(BigDecimal value) {
            addCriterion("C_POLITICS_COUNT <", value, "cPoliticsCount");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCountLessThanOrEqualTo(BigDecimal value) {
            addCriterion("C_POLITICS_COUNT <=", value, "cPoliticsCount");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCountIn(List<BigDecimal> values) {
            addCriterion("C_POLITICS_COUNT in", values, "cPoliticsCount");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCountNotIn(List<BigDecimal> values) {
            addCriterion("C_POLITICS_COUNT not in", values, "cPoliticsCount");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCountBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("C_POLITICS_COUNT between", value1, value2, "cPoliticsCount");
            return (Criteria) this;
        }

        public Criteria andCPoliticsCountNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("C_POLITICS_COUNT not between", value1, value2, "cPoliticsCount");
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