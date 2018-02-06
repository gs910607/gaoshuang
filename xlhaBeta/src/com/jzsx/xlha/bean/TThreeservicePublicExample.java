package com.jzsx.xlha.bean;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TThreeservicePublicExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public TThreeservicePublicExample() {
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

        public Criteria andCThreeserviceIdIsNull() {
            addCriterion("C_THREESERVICE_ID is null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdIsNotNull() {
            addCriterion("C_THREESERVICE_ID is not null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdEqualTo(String value) {
            addCriterion("C_THREESERVICE_ID =", value, "cThreeserviceId");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdNotEqualTo(String value) {
            addCriterion("C_THREESERVICE_ID <>", value, "cThreeserviceId");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdGreaterThan(String value) {
            addCriterion("C_THREESERVICE_ID >", value, "cThreeserviceId");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdGreaterThanOrEqualTo(String value) {
            addCriterion("C_THREESERVICE_ID >=", value, "cThreeserviceId");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdLessThan(String value) {
            addCriterion("C_THREESERVICE_ID <", value, "cThreeserviceId");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdLessThanOrEqualTo(String value) {
            addCriterion("C_THREESERVICE_ID <=", value, "cThreeserviceId");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdLike(String value) {
            addCriterion("C_THREESERVICE_ID like", value, "cThreeserviceId");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdNotLike(String value) {
            addCriterion("C_THREESERVICE_ID not like", value, "cThreeserviceId");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdIn(List<String> values) {
            addCriterion("C_THREESERVICE_ID in", values, "cThreeserviceId");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdNotIn(List<String> values) {
            addCriterion("C_THREESERVICE_ID not in", values, "cThreeserviceId");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdBetween(String value1, String value2) {
            addCriterion("C_THREESERVICE_ID between", value1, value2, "cThreeserviceId");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceIdNotBetween(String value1, String value2) {
            addCriterion("C_THREESERVICE_ID not between", value1, value2, "cThreeserviceId");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeIsNull() {
            addCriterion("C_THREESERVICE_TYPE is null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeIsNotNull() {
            addCriterion("C_THREESERVICE_TYPE is not null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeEqualTo(String value) {
            addCriterion("C_THREESERVICE_TYPE =", value, "cThreeserviceType");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeNotEqualTo(String value) {
            addCriterion("C_THREESERVICE_TYPE <>", value, "cThreeserviceType");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeGreaterThan(String value) {
            addCriterion("C_THREESERVICE_TYPE >", value, "cThreeserviceType");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeGreaterThanOrEqualTo(String value) {
            addCriterion("C_THREESERVICE_TYPE >=", value, "cThreeserviceType");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeLessThan(String value) {
            addCriterion("C_THREESERVICE_TYPE <", value, "cThreeserviceType");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeLessThanOrEqualTo(String value) {
            addCriterion("C_THREESERVICE_TYPE <=", value, "cThreeserviceType");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeLike(String value) {
            addCriterion("C_THREESERVICE_TYPE like", value, "cThreeserviceType");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeNotLike(String value) {
            addCriterion("C_THREESERVICE_TYPE not like", value, "cThreeserviceType");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeIn(List<String> values) {
            addCriterion("C_THREESERVICE_TYPE in", values, "cThreeserviceType");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeNotIn(List<String> values) {
            addCriterion("C_THREESERVICE_TYPE not in", values, "cThreeserviceType");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeBetween(String value1, String value2) {
            addCriterion("C_THREESERVICE_TYPE between", value1, value2, "cThreeserviceType");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTypeNotBetween(String value1, String value2) {
            addCriterion("C_THREESERVICE_TYPE not between", value1, value2, "cThreeserviceType");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleIsNull() {
            addCriterion("C_THREESERVICE_TITLE is null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleIsNotNull() {
            addCriterion("C_THREESERVICE_TITLE is not null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleEqualTo(String value) {
            addCriterion("C_THREESERVICE_TITLE =", value, "cThreeserviceTitle");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleNotEqualTo(String value) {
            addCriterion("C_THREESERVICE_TITLE <>", value, "cThreeserviceTitle");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleGreaterThan(String value) {
            addCriterion("C_THREESERVICE_TITLE >", value, "cThreeserviceTitle");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleGreaterThanOrEqualTo(String value) {
            addCriterion("C_THREESERVICE_TITLE >=", value, "cThreeserviceTitle");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleLessThan(String value) {
            addCriterion("C_THREESERVICE_TITLE <", value, "cThreeserviceTitle");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleLessThanOrEqualTo(String value) {
            addCriterion("C_THREESERVICE_TITLE <=", value, "cThreeserviceTitle");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleLike(String value) {
            addCriterion("C_THREESERVICE_TITLE like", value, "cThreeserviceTitle");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleNotLike(String value) {
            addCriterion("C_THREESERVICE_TITLE not like", value, "cThreeserviceTitle");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleIn(List<String> values) {
            addCriterion("C_THREESERVICE_TITLE in", values, "cThreeserviceTitle");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleNotIn(List<String> values) {
            addCriterion("C_THREESERVICE_TITLE not in", values, "cThreeserviceTitle");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleBetween(String value1, String value2) {
            addCriterion("C_THREESERVICE_TITLE between", value1, value2, "cThreeserviceTitle");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceTitleNotBetween(String value1, String value2) {
            addCriterion("C_THREESERVICE_TITLE not between", value1, value2, "cThreeserviceTitle");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreatetimeIsNull() {
            addCriterion("C_THREESERVICE_CREATETIME is null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreatetimeIsNotNull() {
            addCriterion("C_THREESERVICE_CREATETIME is not null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreatetimeEqualTo(Date value) {
            addCriterion("C_THREESERVICE_CREATETIME =", value, "cThreeserviceCreatetime");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreatetimeNotEqualTo(Date value) {
            addCriterion("C_THREESERVICE_CREATETIME <>", value, "cThreeserviceCreatetime");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreatetimeGreaterThan(Date value) {
            addCriterion("C_THREESERVICE_CREATETIME >", value, "cThreeserviceCreatetime");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreatetimeGreaterThanOrEqualTo(Date value) {
            addCriterion("C_THREESERVICE_CREATETIME >=", value, "cThreeserviceCreatetime");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreatetimeLessThan(Date value) {
            addCriterion("C_THREESERVICE_CREATETIME <", value, "cThreeserviceCreatetime");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreatetimeLessThanOrEqualTo(Date value) {
            addCriterion("C_THREESERVICE_CREATETIME <=", value, "cThreeserviceCreatetime");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreatetimeIn(List<Date> values) {
            addCriterion("C_THREESERVICE_CREATETIME in", values, "cThreeserviceCreatetime");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreatetimeNotIn(List<Date> values) {
            addCriterion("C_THREESERVICE_CREATETIME not in", values, "cThreeserviceCreatetime");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreatetimeBetween(Date value1, Date value2) {
            addCriterion("C_THREESERVICE_CREATETIME between", value1, value2, "cThreeserviceCreatetime");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreatetimeNotBetween(Date value1, Date value2) {
            addCriterion("C_THREESERVICE_CREATETIME not between", value1, value2, "cThreeserviceCreatetime");
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

        public Criteria andCThreeserviceEditerIsNull() {
            addCriterion("C_THREESERVICE_EDITER is null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerIsNotNull() {
            addCriterion("C_THREESERVICE_EDITER is not null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerEqualTo(String value) {
            addCriterion("C_THREESERVICE_EDITER =", value, "cThreeserviceEditer");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerNotEqualTo(String value) {
            addCriterion("C_THREESERVICE_EDITER <>", value, "cThreeserviceEditer");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerGreaterThan(String value) {
            addCriterion("C_THREESERVICE_EDITER >", value, "cThreeserviceEditer");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerGreaterThanOrEqualTo(String value) {
            addCriterion("C_THREESERVICE_EDITER >=", value, "cThreeserviceEditer");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerLessThan(String value) {
            addCriterion("C_THREESERVICE_EDITER <", value, "cThreeserviceEditer");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerLessThanOrEqualTo(String value) {
            addCriterion("C_THREESERVICE_EDITER <=", value, "cThreeserviceEditer");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerLike(String value) {
            addCriterion("C_THREESERVICE_EDITER like", value, "cThreeserviceEditer");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerNotLike(String value) {
            addCriterion("C_THREESERVICE_EDITER not like", value, "cThreeserviceEditer");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerIn(List<String> values) {
            addCriterion("C_THREESERVICE_EDITER in", values, "cThreeserviceEditer");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerNotIn(List<String> values) {
            addCriterion("C_THREESERVICE_EDITER not in", values, "cThreeserviceEditer");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerBetween(String value1, String value2) {
            addCriterion("C_THREESERVICE_EDITER between", value1, value2, "cThreeserviceEditer");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceEditerNotBetween(String value1, String value2) {
            addCriterion("C_THREESERVICE_EDITER not between", value1, value2, "cThreeserviceEditer");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateIsNull() {
            addCriterion("C_THREESERVICE_CREATE is null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateIsNotNull() {
            addCriterion("C_THREESERVICE_CREATE is not null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateEqualTo(String value) {
            addCriterion("C_THREESERVICE_CREATE =", value, "cThreeserviceCreate");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateNotEqualTo(String value) {
            addCriterion("C_THREESERVICE_CREATE <>", value, "cThreeserviceCreate");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateGreaterThan(String value) {
            addCriterion("C_THREESERVICE_CREATE >", value, "cThreeserviceCreate");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateGreaterThanOrEqualTo(String value) {
            addCriterion("C_THREESERVICE_CREATE >=", value, "cThreeserviceCreate");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateLessThan(String value) {
            addCriterion("C_THREESERVICE_CREATE <", value, "cThreeserviceCreate");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateLessThanOrEqualTo(String value) {
            addCriterion("C_THREESERVICE_CREATE <=", value, "cThreeserviceCreate");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateLike(String value) {
            addCriterion("C_THREESERVICE_CREATE like", value, "cThreeserviceCreate");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateNotLike(String value) {
            addCriterion("C_THREESERVICE_CREATE not like", value, "cThreeserviceCreate");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateIn(List<String> values) {
            addCriterion("C_THREESERVICE_CREATE in", values, "cThreeserviceCreate");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateNotIn(List<String> values) {
            addCriterion("C_THREESERVICE_CREATE not in", values, "cThreeserviceCreate");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateBetween(String value1, String value2) {
            addCriterion("C_THREESERVICE_CREATE between", value1, value2, "cThreeserviceCreate");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCreateNotBetween(String value1, String value2) {
            addCriterion("C_THREESERVICE_CREATE not between", value1, value2, "cThreeserviceCreate");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCountIsNull() {
            addCriterion("C_THREESERVICE_COUNT is null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCountIsNotNull() {
            addCriterion("C_THREESERVICE_COUNT is not null");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCountEqualTo(BigDecimal value) {
            addCriterion("C_THREESERVICE_COUNT =", value, "cThreeserviceCount");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCountNotEqualTo(BigDecimal value) {
            addCriterion("C_THREESERVICE_COUNT <>", value, "cThreeserviceCount");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCountGreaterThan(BigDecimal value) {
            addCriterion("C_THREESERVICE_COUNT >", value, "cThreeserviceCount");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCountGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("C_THREESERVICE_COUNT >=", value, "cThreeserviceCount");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCountLessThan(BigDecimal value) {
            addCriterion("C_THREESERVICE_COUNT <", value, "cThreeserviceCount");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCountLessThanOrEqualTo(BigDecimal value) {
            addCriterion("C_THREESERVICE_COUNT <=", value, "cThreeserviceCount");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCountIn(List<BigDecimal> values) {
            addCriterion("C_THREESERVICE_COUNT in", values, "cThreeserviceCount");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCountNotIn(List<BigDecimal> values) {
            addCriterion("C_THREESERVICE_COUNT not in", values, "cThreeserviceCount");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCountBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("C_THREESERVICE_COUNT between", value1, value2, "cThreeserviceCount");
            return (Criteria) this;
        }

        public Criteria andCThreeserviceCountNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("C_THREESERVICE_COUNT not between", value1, value2, "cThreeserviceCount");
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