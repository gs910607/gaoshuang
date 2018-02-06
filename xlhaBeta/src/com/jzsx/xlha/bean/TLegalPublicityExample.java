package com.jzsx.xlha.bean;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TLegalPublicityExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public TLegalPublicityExample() {
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

        public Criteria andCLegalIdIsNull() {
            addCriterion("C_LEGAL_ID is null");
            return (Criteria) this;
        }

        public Criteria andCLegalIdIsNotNull() {
            addCriterion("C_LEGAL_ID is not null");
            return (Criteria) this;
        }

        public Criteria andCLegalIdEqualTo(String value) {
            addCriterion("C_LEGAL_ID =", value, "cLegalId");
            return (Criteria) this;
        }

        public Criteria andCLegalIdNotEqualTo(String value) {
            addCriterion("C_LEGAL_ID <>", value, "cLegalId");
            return (Criteria) this;
        }

        public Criteria andCLegalIdGreaterThan(String value) {
            addCriterion("C_LEGAL_ID >", value, "cLegalId");
            return (Criteria) this;
        }

        public Criteria andCLegalIdGreaterThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_ID >=", value, "cLegalId");
            return (Criteria) this;
        }

        public Criteria andCLegalIdLessThan(String value) {
            addCriterion("C_LEGAL_ID <", value, "cLegalId");
            return (Criteria) this;
        }

        public Criteria andCLegalIdLessThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_ID <=", value, "cLegalId");
            return (Criteria) this;
        }

        public Criteria andCLegalIdLike(String value) {
            addCriterion("C_LEGAL_ID like", value, "cLegalId");
            return (Criteria) this;
        }

        public Criteria andCLegalIdNotLike(String value) {
            addCriterion("C_LEGAL_ID not like", value, "cLegalId");
            return (Criteria) this;
        }

        public Criteria andCLegalIdIn(List<String> values) {
            addCriterion("C_LEGAL_ID in", values, "cLegalId");
            return (Criteria) this;
        }

        public Criteria andCLegalIdNotIn(List<String> values) {
            addCriterion("C_LEGAL_ID not in", values, "cLegalId");
            return (Criteria) this;
        }

        public Criteria andCLegalIdBetween(String value1, String value2) {
            addCriterion("C_LEGAL_ID between", value1, value2, "cLegalId");
            return (Criteria) this;
        }

        public Criteria andCLegalIdNotBetween(String value1, String value2) {
            addCriterion("C_LEGAL_ID not between", value1, value2, "cLegalId");
            return (Criteria) this;
        }

        public Criteria andCLegalTypeIsNull() {
            addCriterion("C_LEGAL_TYPE is null");
            return (Criteria) this;
        }

        public Criteria andCLegalTypeIsNotNull() {
            addCriterion("C_LEGAL_TYPE is not null");
            return (Criteria) this;
        }

        public Criteria andCLegalTypeEqualTo(BigDecimal value) {
            addCriterion("C_LEGAL_TYPE =", value, "cLegalType");
            return (Criteria) this;
        }

        public Criteria andCLegalTypeNotEqualTo(BigDecimal value) {
            addCriterion("C_LEGAL_TYPE <>", value, "cLegalType");
            return (Criteria) this;
        }

        public Criteria andCLegalTypeGreaterThan(BigDecimal value) {
            addCriterion("C_LEGAL_TYPE >", value, "cLegalType");
            return (Criteria) this;
        }

        public Criteria andCLegalTypeGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("C_LEGAL_TYPE >=", value, "cLegalType");
            return (Criteria) this;
        }

        public Criteria andCLegalTypeLessThan(BigDecimal value) {
            addCriterion("C_LEGAL_TYPE <", value, "cLegalType");
            return (Criteria) this;
        }

        public Criteria andCLegalTypeLessThanOrEqualTo(BigDecimal value) {
            addCriterion("C_LEGAL_TYPE <=", value, "cLegalType");
            return (Criteria) this;
        }

        public Criteria andCLegalTypeIn(List<BigDecimal> values) {
            addCriterion("C_LEGAL_TYPE in", values, "cLegalType");
            return (Criteria) this;
        }

        public Criteria andCLegalTypeNotIn(List<BigDecimal> values) {
            addCriterion("C_LEGAL_TYPE not in", values, "cLegalType");
            return (Criteria) this;
        }

        public Criteria andCLegalTypeBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("C_LEGAL_TYPE between", value1, value2, "cLegalType");
            return (Criteria) this;
        }

        public Criteria andCLegalTypeNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("C_LEGAL_TYPE not between", value1, value2, "cLegalType");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleIsNull() {
            addCriterion("C_LEGAL_TITLE is null");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleIsNotNull() {
            addCriterion("C_LEGAL_TITLE is not null");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleEqualTo(String value) {
            addCriterion("C_LEGAL_TITLE =", value, "cLegalTitle");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleNotEqualTo(String value) {
            addCriterion("C_LEGAL_TITLE <>", value, "cLegalTitle");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleGreaterThan(String value) {
            addCriterion("C_LEGAL_TITLE >", value, "cLegalTitle");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleGreaterThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_TITLE >=", value, "cLegalTitle");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleLessThan(String value) {
            addCriterion("C_LEGAL_TITLE <", value, "cLegalTitle");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleLessThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_TITLE <=", value, "cLegalTitle");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleLike(String value) {
            addCriterion("C_LEGAL_TITLE like", value, "cLegalTitle");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleNotLike(String value) {
            addCriterion("C_LEGAL_TITLE not like", value, "cLegalTitle");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleIn(List<String> values) {
            addCriterion("C_LEGAL_TITLE in", values, "cLegalTitle");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleNotIn(List<String> values) {
            addCriterion("C_LEGAL_TITLE not in", values, "cLegalTitle");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleBetween(String value1, String value2) {
            addCriterion("C_LEGAL_TITLE between", value1, value2, "cLegalTitle");
            return (Criteria) this;
        }

        public Criteria andCLegalTitleNotBetween(String value1, String value2) {
            addCriterion("C_LEGAL_TITLE not between", value1, value2, "cLegalTitle");
            return (Criteria) this;
        }

        public Criteria andCLegalContentIsNull() {
            addCriterion("C_LEGAL_CONTENT is null");
            return (Criteria) this;
        }

        public Criteria andCLegalContentIsNotNull() {
            addCriterion("C_LEGAL_CONTENT is not null");
            return (Criteria) this;
        }

        public Criteria andCLegalContentEqualTo(String value) {
            addCriterion("C_LEGAL_CONTENT =", value, "cLegalContent");
            return (Criteria) this;
        }

        public Criteria andCLegalContentNotEqualTo(String value) {
            addCriterion("C_LEGAL_CONTENT <>", value, "cLegalContent");
            return (Criteria) this;
        }

        public Criteria andCLegalContentGreaterThan(String value) {
            addCriterion("C_LEGAL_CONTENT >", value, "cLegalContent");
            return (Criteria) this;
        }

        public Criteria andCLegalContentGreaterThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_CONTENT >=", value, "cLegalContent");
            return (Criteria) this;
        }

        public Criteria andCLegalContentLessThan(String value) {
            addCriterion("C_LEGAL_CONTENT <", value, "cLegalContent");
            return (Criteria) this;
        }

        public Criteria andCLegalContentLessThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_CONTENT <=", value, "cLegalContent");
            return (Criteria) this;
        }

        public Criteria andCLegalContentLike(String value) {
            addCriterion("C_LEGAL_CONTENT like", value, "cLegalContent");
            return (Criteria) this;
        }

        public Criteria andCLegalContentNotLike(String value) {
            addCriterion("C_LEGAL_CONTENT not like", value, "cLegalContent");
            return (Criteria) this;
        }

        public Criteria andCLegalContentIn(List<String> values) {
            addCriterion("C_LEGAL_CONTENT in", values, "cLegalContent");
            return (Criteria) this;
        }

        public Criteria andCLegalContentNotIn(List<String> values) {
            addCriterion("C_LEGAL_CONTENT not in", values, "cLegalContent");
            return (Criteria) this;
        }

        public Criteria andCLegalContentBetween(String value1, String value2) {
            addCriterion("C_LEGAL_CONTENT between", value1, value2, "cLegalContent");
            return (Criteria) this;
        }

        public Criteria andCLegalContentNotBetween(String value1, String value2) {
            addCriterion("C_LEGAL_CONTENT not between", value1, value2, "cLegalContent");
            return (Criteria) this;
        }

        public Criteria andCLegalImageIsNull() {
            addCriterion("C_LEGAL_IMAGE is null");
            return (Criteria) this;
        }

        public Criteria andCLegalImageIsNotNull() {
            addCriterion("C_LEGAL_IMAGE is not null");
            return (Criteria) this;
        }

        public Criteria andCLegalImageEqualTo(String value) {
            addCriterion("C_LEGAL_IMAGE =", value, "cLegalImage");
            return (Criteria) this;
        }

        public Criteria andCLegalImageNotEqualTo(String value) {
            addCriterion("C_LEGAL_IMAGE <>", value, "cLegalImage");
            return (Criteria) this;
        }

        public Criteria andCLegalImageGreaterThan(String value) {
            addCriterion("C_LEGAL_IMAGE >", value, "cLegalImage");
            return (Criteria) this;
        }

        public Criteria andCLegalImageGreaterThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_IMAGE >=", value, "cLegalImage");
            return (Criteria) this;
        }

        public Criteria andCLegalImageLessThan(String value) {
            addCriterion("C_LEGAL_IMAGE <", value, "cLegalImage");
            return (Criteria) this;
        }

        public Criteria andCLegalImageLessThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_IMAGE <=", value, "cLegalImage");
            return (Criteria) this;
        }

        public Criteria andCLegalImageLike(String value) {
            addCriterion("C_LEGAL_IMAGE like", value, "cLegalImage");
            return (Criteria) this;
        }

        public Criteria andCLegalImageNotLike(String value) {
            addCriterion("C_LEGAL_IMAGE not like", value, "cLegalImage");
            return (Criteria) this;
        }

        public Criteria andCLegalImageIn(List<String> values) {
            addCriterion("C_LEGAL_IMAGE in", values, "cLegalImage");
            return (Criteria) this;
        }

        public Criteria andCLegalImageNotIn(List<String> values) {
            addCriterion("C_LEGAL_IMAGE not in", values, "cLegalImage");
            return (Criteria) this;
        }

        public Criteria andCLegalImageBetween(String value1, String value2) {
            addCriterion("C_LEGAL_IMAGE between", value1, value2, "cLegalImage");
            return (Criteria) this;
        }

        public Criteria andCLegalImageNotBetween(String value1, String value2) {
            addCriterion("C_LEGAL_IMAGE not between", value1, value2, "cLegalImage");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoIsNull() {
            addCriterion("C_LEGAL_VIDEO is null");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoIsNotNull() {
            addCriterion("C_LEGAL_VIDEO is not null");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoEqualTo(String value) {
            addCriterion("C_LEGAL_VIDEO =", value, "cLegalVideo");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoNotEqualTo(String value) {
            addCriterion("C_LEGAL_VIDEO <>", value, "cLegalVideo");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoGreaterThan(String value) {
            addCriterion("C_LEGAL_VIDEO >", value, "cLegalVideo");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoGreaterThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_VIDEO >=", value, "cLegalVideo");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoLessThan(String value) {
            addCriterion("C_LEGAL_VIDEO <", value, "cLegalVideo");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoLessThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_VIDEO <=", value, "cLegalVideo");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoLike(String value) {
            addCriterion("C_LEGAL_VIDEO like", value, "cLegalVideo");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoNotLike(String value) {
            addCriterion("C_LEGAL_VIDEO not like", value, "cLegalVideo");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoIn(List<String> values) {
            addCriterion("C_LEGAL_VIDEO in", values, "cLegalVideo");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoNotIn(List<String> values) {
            addCriterion("C_LEGAL_VIDEO not in", values, "cLegalVideo");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoBetween(String value1, String value2) {
            addCriterion("C_LEGAL_VIDEO between", value1, value2, "cLegalVideo");
            return (Criteria) this;
        }

        public Criteria andCLegalVideoNotBetween(String value1, String value2) {
            addCriterion("C_LEGAL_VIDEO not between", value1, value2, "cLegalVideo");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeIsNull() {
            addCriterion("C_LEGAL_STARTTIME is null");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeIsNotNull() {
            addCriterion("C_LEGAL_STARTTIME is not null");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeEqualTo(String value) {
            addCriterion("C_LEGAL_STARTTIME =", value, "cLegalStarttime");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeNotEqualTo(String value) {
            addCriterion("C_LEGAL_STARTTIME <>", value, "cLegalStarttime");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeGreaterThan(String value) {
            addCriterion("C_LEGAL_STARTTIME >", value, "cLegalStarttime");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeGreaterThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_STARTTIME >=", value, "cLegalStarttime");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeLessThan(String value) {
            addCriterion("C_LEGAL_STARTTIME <", value, "cLegalStarttime");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeLessThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_STARTTIME <=", value, "cLegalStarttime");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeLike(String value) {
            addCriterion("C_LEGAL_STARTTIME like", value, "cLegalStarttime");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeNotLike(String value) {
            addCriterion("C_LEGAL_STARTTIME not like", value, "cLegalStarttime");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeIn(List<String> values) {
            addCriterion("C_LEGAL_STARTTIME in", values, "cLegalStarttime");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeNotIn(List<String> values) {
            addCriterion("C_LEGAL_STARTTIME not in", values, "cLegalStarttime");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeBetween(String value1, String value2) {
            addCriterion("C_LEGAL_STARTTIME between", value1, value2, "cLegalStarttime");
            return (Criteria) this;
        }

        public Criteria andCLegalStarttimeNotBetween(String value1, String value2) {
            addCriterion("C_LEGAL_STARTTIME not between", value1, value2, "cLegalStarttime");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeIsNull() {
            addCriterion("C_LEGAL_STOPTIME is null");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeIsNotNull() {
            addCriterion("C_LEGAL_STOPTIME is not null");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeEqualTo(String value) {
            addCriterion("C_LEGAL_STOPTIME =", value, "cLegalStoptime");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeNotEqualTo(String value) {
            addCriterion("C_LEGAL_STOPTIME <>", value, "cLegalStoptime");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeGreaterThan(String value) {
            addCriterion("C_LEGAL_STOPTIME >", value, "cLegalStoptime");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeGreaterThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_STOPTIME >=", value, "cLegalStoptime");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeLessThan(String value) {
            addCriterion("C_LEGAL_STOPTIME <", value, "cLegalStoptime");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeLessThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_STOPTIME <=", value, "cLegalStoptime");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeLike(String value) {
            addCriterion("C_LEGAL_STOPTIME like", value, "cLegalStoptime");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeNotLike(String value) {
            addCriterion("C_LEGAL_STOPTIME not like", value, "cLegalStoptime");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeIn(List<String> values) {
            addCriterion("C_LEGAL_STOPTIME in", values, "cLegalStoptime");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeNotIn(List<String> values) {
            addCriterion("C_LEGAL_STOPTIME not in", values, "cLegalStoptime");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeBetween(String value1, String value2) {
            addCriterion("C_LEGAL_STOPTIME between", value1, value2, "cLegalStoptime");
            return (Criteria) this;
        }

        public Criteria andCLegalStoptimeNotBetween(String value1, String value2) {
            addCriterion("C_LEGAL_STOPTIME not between", value1, value2, "cLegalStoptime");
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

        public Criteria andCLegalCreatetimeIsNull() {
            addCriterion("C_LEGAL_CREATETIME is null");
            return (Criteria) this;
        }

        public Criteria andCLegalCreatetimeIsNotNull() {
            addCriterion("C_LEGAL_CREATETIME is not null");
            return (Criteria) this;
        }

        public Criteria andCLegalCreatetimeEqualTo(Date value) {
            addCriterion("C_LEGAL_CREATETIME =", value, "cLegalCreatetime");
            return (Criteria) this;
        }

        public Criteria andCLegalCreatetimeNotEqualTo(Date value) {
            addCriterion("C_LEGAL_CREATETIME <>", value, "cLegalCreatetime");
            return (Criteria) this;
        }

        public Criteria andCLegalCreatetimeGreaterThan(Date value) {
            addCriterion("C_LEGAL_CREATETIME >", value, "cLegalCreatetime");
            return (Criteria) this;
        }

        public Criteria andCLegalCreatetimeGreaterThanOrEqualTo(Date value) {
            addCriterion("C_LEGAL_CREATETIME >=", value, "cLegalCreatetime");
            return (Criteria) this;
        }

        public Criteria andCLegalCreatetimeLessThan(Date value) {
            addCriterion("C_LEGAL_CREATETIME <", value, "cLegalCreatetime");
            return (Criteria) this;
        }

        public Criteria andCLegalCreatetimeLessThanOrEqualTo(Date value) {
            addCriterion("C_LEGAL_CREATETIME <=", value, "cLegalCreatetime");
            return (Criteria) this;
        }

        public Criteria andCLegalCreatetimeIn(List<Date> values) {
            addCriterion("C_LEGAL_CREATETIME in", values, "cLegalCreatetime");
            return (Criteria) this;
        }

        public Criteria andCLegalCreatetimeNotIn(List<Date> values) {
            addCriterion("C_LEGAL_CREATETIME not in", values, "cLegalCreatetime");
            return (Criteria) this;
        }

        public Criteria andCLegalCreatetimeBetween(Date value1, Date value2) {
            addCriterion("C_LEGAL_CREATETIME between", value1, value2, "cLegalCreatetime");
            return (Criteria) this;
        }

        public Criteria andCLegalCreatetimeNotBetween(Date value1, Date value2) {
            addCriterion("C_LEGAL_CREATETIME not between", value1, value2, "cLegalCreatetime");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateIsNull() {
            addCriterion("C_LEGAL_CREATE is null");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateIsNotNull() {
            addCriterion("C_LEGAL_CREATE is not null");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateEqualTo(String value) {
            addCriterion("C_LEGAL_CREATE =", value, "cLegalCreate");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateNotEqualTo(String value) {
            addCriterion("C_LEGAL_CREATE <>", value, "cLegalCreate");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateGreaterThan(String value) {
            addCriterion("C_LEGAL_CREATE >", value, "cLegalCreate");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateGreaterThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_CREATE >=", value, "cLegalCreate");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateLessThan(String value) {
            addCriterion("C_LEGAL_CREATE <", value, "cLegalCreate");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateLessThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_CREATE <=", value, "cLegalCreate");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateLike(String value) {
            addCriterion("C_LEGAL_CREATE like", value, "cLegalCreate");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateNotLike(String value) {
            addCriterion("C_LEGAL_CREATE not like", value, "cLegalCreate");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateIn(List<String> values) {
            addCriterion("C_LEGAL_CREATE in", values, "cLegalCreate");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateNotIn(List<String> values) {
            addCriterion("C_LEGAL_CREATE not in", values, "cLegalCreate");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateBetween(String value1, String value2) {
            addCriterion("C_LEGAL_CREATE between", value1, value2, "cLegalCreate");
            return (Criteria) this;
        }

        public Criteria andCLegalCreateNotBetween(String value1, String value2) {
            addCriterion("C_LEGAL_CREATE not between", value1, value2, "cLegalCreate");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorIsNull() {
            addCriterion("C_LEGAL_EDITOR is null");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorIsNotNull() {
            addCriterion("C_LEGAL_EDITOR is not null");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorEqualTo(String value) {
            addCriterion("C_LEGAL_EDITOR =", value, "cLegalEditor");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorNotEqualTo(String value) {
            addCriterion("C_LEGAL_EDITOR <>", value, "cLegalEditor");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorGreaterThan(String value) {
            addCriterion("C_LEGAL_EDITOR >", value, "cLegalEditor");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorGreaterThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_EDITOR >=", value, "cLegalEditor");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorLessThan(String value) {
            addCriterion("C_LEGAL_EDITOR <", value, "cLegalEditor");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorLessThanOrEqualTo(String value) {
            addCriterion("C_LEGAL_EDITOR <=", value, "cLegalEditor");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorLike(String value) {
            addCriterion("C_LEGAL_EDITOR like", value, "cLegalEditor");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorNotLike(String value) {
            addCriterion("C_LEGAL_EDITOR not like", value, "cLegalEditor");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorIn(List<String> values) {
            addCriterion("C_LEGAL_EDITOR in", values, "cLegalEditor");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorNotIn(List<String> values) {
            addCriterion("C_LEGAL_EDITOR not in", values, "cLegalEditor");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorBetween(String value1, String value2) {
            addCriterion("C_LEGAL_EDITOR between", value1, value2, "cLegalEditor");
            return (Criteria) this;
        }

        public Criteria andCLegalEditorNotBetween(String value1, String value2) {
            addCriterion("C_LEGAL_EDITOR not between", value1, value2, "cLegalEditor");
            return (Criteria) this;
        }

        public Criteria andCLegalCountIsNull() {
            addCriterion("C_LEGAL_COUNT is null");
            return (Criteria) this;
        }

        public Criteria andCLegalCountIsNotNull() {
            addCriterion("C_LEGAL_COUNT is not null");
            return (Criteria) this;
        }

        public Criteria andCLegalCountEqualTo(BigDecimal value) {
            addCriterion("C_LEGAL_COUNT =", value, "cLegalCount");
            return (Criteria) this;
        }

        public Criteria andCLegalCountNotEqualTo(BigDecimal value) {
            addCriterion("C_LEGAL_COUNT <>", value, "cLegalCount");
            return (Criteria) this;
        }

        public Criteria andCLegalCountGreaterThan(BigDecimal value) {
            addCriterion("C_LEGAL_COUNT >", value, "cLegalCount");
            return (Criteria) this;
        }

        public Criteria andCLegalCountGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("C_LEGAL_COUNT >=", value, "cLegalCount");
            return (Criteria) this;
        }

        public Criteria andCLegalCountLessThan(BigDecimal value) {
            addCriterion("C_LEGAL_COUNT <", value, "cLegalCount");
            return (Criteria) this;
        }

        public Criteria andCLegalCountLessThanOrEqualTo(BigDecimal value) {
            addCriterion("C_LEGAL_COUNT <=", value, "cLegalCount");
            return (Criteria) this;
        }

        public Criteria andCLegalCountIn(List<BigDecimal> values) {
            addCriterion("C_LEGAL_COUNT in", values, "cLegalCount");
            return (Criteria) this;
        }

        public Criteria andCLegalCountNotIn(List<BigDecimal> values) {
            addCriterion("C_LEGAL_COUNT not in", values, "cLegalCount");
            return (Criteria) this;
        }

        public Criteria andCLegalCountBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("C_LEGAL_COUNT between", value1, value2, "cLegalCount");
            return (Criteria) this;
        }

        public Criteria andCLegalCountNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("C_LEGAL_COUNT not between", value1, value2, "cLegalCount");
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