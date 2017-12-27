package com.jzsx.xlgc.bean;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class TVideoMediateExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public TVideoMediateExample() {
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

        public Criteria andMediateidIsNull() {
            addCriterion("MEDIATEID is null");
            return (Criteria) this;
        }

        public Criteria andMediateidIsNotNull() {
            addCriterion("MEDIATEID is not null");
            return (Criteria) this;
        }

        public Criteria andMediateidEqualTo(String value) {
            addCriterion("MEDIATEID =", value, "mediateid");
            return (Criteria) this;
        }

        public Criteria andMediateidNotEqualTo(String value) {
            addCriterion("MEDIATEID <>", value, "mediateid");
            return (Criteria) this;
        }

        public Criteria andMediateidGreaterThan(String value) {
            addCriterion("MEDIATEID >", value, "mediateid");
            return (Criteria) this;
        }

        public Criteria andMediateidGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATEID >=", value, "mediateid");
            return (Criteria) this;
        }

        public Criteria andMediateidLessThan(String value) {
            addCriterion("MEDIATEID <", value, "mediateid");
            return (Criteria) this;
        }

        public Criteria andMediateidLessThanOrEqualTo(String value) {
            addCriterion("MEDIATEID <=", value, "mediateid");
            return (Criteria) this;
        }

        public Criteria andMediateidLike(String value) {
            addCriterion("MEDIATEID like", value, "mediateid");
            return (Criteria) this;
        }

        public Criteria andMediateidNotLike(String value) {
            addCriterion("MEDIATEID not like", value, "mediateid");
            return (Criteria) this;
        }

        public Criteria andMediateidIn(List<String> values) {
            addCriterion("MEDIATEID in", values, "mediateid");
            return (Criteria) this;
        }

        public Criteria andMediateidNotIn(List<String> values) {
            addCriterion("MEDIATEID not in", values, "mediateid");
            return (Criteria) this;
        }

        public Criteria andMediateidBetween(String value1, String value2) {
            addCriterion("MEDIATEID between", value1, value2, "mediateid");
            return (Criteria) this;
        }

        public Criteria andMediateidNotBetween(String value1, String value2) {
            addCriterion("MEDIATEID not between", value1, value2, "mediateid");
            return (Criteria) this;
        }

        public Criteria andMediateNameIsNull() {
            addCriterion("MEDIATE_NAME is null");
            return (Criteria) this;
        }

        public Criteria andMediateNameIsNotNull() {
            addCriterion("MEDIATE_NAME is not null");
            return (Criteria) this;
        }

        public Criteria andMediateNameEqualTo(String value) {
            addCriterion("MEDIATE_NAME =", value, "mediateName");
            return (Criteria) this;
        }

        public Criteria andMediateNameNotEqualTo(String value) {
            addCriterion("MEDIATE_NAME <>", value, "mediateName");
            return (Criteria) this;
        }

        public Criteria andMediateNameGreaterThan(String value) {
            addCriterion("MEDIATE_NAME >", value, "mediateName");
            return (Criteria) this;
        }

        public Criteria andMediateNameGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_NAME >=", value, "mediateName");
            return (Criteria) this;
        }

        public Criteria andMediateNameLessThan(String value) {
            addCriterion("MEDIATE_NAME <", value, "mediateName");
            return (Criteria) this;
        }

        public Criteria andMediateNameLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_NAME <=", value, "mediateName");
            return (Criteria) this;
        }

        public Criteria andMediateNameLike(String value) {
            addCriterion("MEDIATE_NAME like", value, "mediateName");
            return (Criteria) this;
        }

        public Criteria andMediateNameNotLike(String value) {
            addCriterion("MEDIATE_NAME not like", value, "mediateName");
            return (Criteria) this;
        }

        public Criteria andMediateNameIn(List<String> values) {
            addCriterion("MEDIATE_NAME in", values, "mediateName");
            return (Criteria) this;
        }

        public Criteria andMediateNameNotIn(List<String> values) {
            addCriterion("MEDIATE_NAME not in", values, "mediateName");
            return (Criteria) this;
        }

        public Criteria andMediateNameBetween(String value1, String value2) {
            addCriterion("MEDIATE_NAME between", value1, value2, "mediateName");
            return (Criteria) this;
        }

        public Criteria andMediateNameNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_NAME not between", value1, value2, "mediateName");
            return (Criteria) this;
        }

        public Criteria andMediatePidIsNull() {
            addCriterion("MEDIATE_PID is null");
            return (Criteria) this;
        }

        public Criteria andMediatePidIsNotNull() {
            addCriterion("MEDIATE_PID is not null");
            return (Criteria) this;
        }

        public Criteria andMediatePidEqualTo(String value) {
            addCriterion("MEDIATE_PID =", value, "mediatePid");
            return (Criteria) this;
        }

        public Criteria andMediatePidNotEqualTo(String value) {
            addCriterion("MEDIATE_PID <>", value, "mediatePid");
            return (Criteria) this;
        }

        public Criteria andMediatePidGreaterThan(String value) {
            addCriterion("MEDIATE_PID >", value, "mediatePid");
            return (Criteria) this;
        }

        public Criteria andMediatePidGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_PID >=", value, "mediatePid");
            return (Criteria) this;
        }

        public Criteria andMediatePidLessThan(String value) {
            addCriterion("MEDIATE_PID <", value, "mediatePid");
            return (Criteria) this;
        }

        public Criteria andMediatePidLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_PID <=", value, "mediatePid");
            return (Criteria) this;
        }

        public Criteria andMediatePidLike(String value) {
            addCriterion("MEDIATE_PID like", value, "mediatePid");
            return (Criteria) this;
        }

        public Criteria andMediatePidNotLike(String value) {
            addCriterion("MEDIATE_PID not like", value, "mediatePid");
            return (Criteria) this;
        }

        public Criteria andMediatePidIn(List<String> values) {
            addCriterion("MEDIATE_PID in", values, "mediatePid");
            return (Criteria) this;
        }

        public Criteria andMediatePidNotIn(List<String> values) {
            addCriterion("MEDIATE_PID not in", values, "mediatePid");
            return (Criteria) this;
        }

        public Criteria andMediatePidBetween(String value1, String value2) {
            addCriterion("MEDIATE_PID between", value1, value2, "mediatePid");
            return (Criteria) this;
        }

        public Criteria andMediatePidNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_PID not between", value1, value2, "mediatePid");
            return (Criteria) this;
        }

        public Criteria andMediateAddressIsNull() {
            addCriterion("MEDIATE_ADDRESS is null");
            return (Criteria) this;
        }

        public Criteria andMediateAddressIsNotNull() {
            addCriterion("MEDIATE_ADDRESS is not null");
            return (Criteria) this;
        }

        public Criteria andMediateAddressEqualTo(String value) {
            addCriterion("MEDIATE_ADDRESS =", value, "mediateAddress");
            return (Criteria) this;
        }

        public Criteria andMediateAddressNotEqualTo(String value) {
            addCriterion("MEDIATE_ADDRESS <>", value, "mediateAddress");
            return (Criteria) this;
        }

        public Criteria andMediateAddressGreaterThan(String value) {
            addCriterion("MEDIATE_ADDRESS >", value, "mediateAddress");
            return (Criteria) this;
        }

        public Criteria andMediateAddressGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_ADDRESS >=", value, "mediateAddress");
            return (Criteria) this;
        }

        public Criteria andMediateAddressLessThan(String value) {
            addCriterion("MEDIATE_ADDRESS <", value, "mediateAddress");
            return (Criteria) this;
        }

        public Criteria andMediateAddressLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_ADDRESS <=", value, "mediateAddress");
            return (Criteria) this;
        }

        public Criteria andMediateAddressLike(String value) {
            addCriterion("MEDIATE_ADDRESS like", value, "mediateAddress");
            return (Criteria) this;
        }

        public Criteria andMediateAddressNotLike(String value) {
            addCriterion("MEDIATE_ADDRESS not like", value, "mediateAddress");
            return (Criteria) this;
        }

        public Criteria andMediateAddressIn(List<String> values) {
            addCriterion("MEDIATE_ADDRESS in", values, "mediateAddress");
            return (Criteria) this;
        }

        public Criteria andMediateAddressNotIn(List<String> values) {
            addCriterion("MEDIATE_ADDRESS not in", values, "mediateAddress");
            return (Criteria) this;
        }

        public Criteria andMediateAddressBetween(String value1, String value2) {
            addCriterion("MEDIATE_ADDRESS between", value1, value2, "mediateAddress");
            return (Criteria) this;
        }

        public Criteria andMediateAddressNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_ADDRESS not between", value1, value2, "mediateAddress");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberIsNull() {
            addCriterion("MEDIATE_PID_NUMBER is null");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberIsNotNull() {
            addCriterion("MEDIATE_PID_NUMBER is not null");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberEqualTo(String value) {
            addCriterion("MEDIATE_PID_NUMBER =", value, "mediatePidNumber");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberNotEqualTo(String value) {
            addCriterion("MEDIATE_PID_NUMBER <>", value, "mediatePidNumber");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberGreaterThan(String value) {
            addCriterion("MEDIATE_PID_NUMBER >", value, "mediatePidNumber");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_PID_NUMBER >=", value, "mediatePidNumber");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberLessThan(String value) {
            addCriterion("MEDIATE_PID_NUMBER <", value, "mediatePidNumber");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_PID_NUMBER <=", value, "mediatePidNumber");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberLike(String value) {
            addCriterion("MEDIATE_PID_NUMBER like", value, "mediatePidNumber");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberNotLike(String value) {
            addCriterion("MEDIATE_PID_NUMBER not like", value, "mediatePidNumber");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberIn(List<String> values) {
            addCriterion("MEDIATE_PID_NUMBER in", values, "mediatePidNumber");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberNotIn(List<String> values) {
            addCriterion("MEDIATE_PID_NUMBER not in", values, "mediatePidNumber");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberBetween(String value1, String value2) {
            addCriterion("MEDIATE_PID_NUMBER between", value1, value2, "mediatePidNumber");
            return (Criteria) this;
        }

        public Criteria andMediatePidNumberNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_PID_NUMBER not between", value1, value2, "mediatePidNumber");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneIsNull() {
            addCriterion("MEDIATE_TELEPHONE is null");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneIsNotNull() {
            addCriterion("MEDIATE_TELEPHONE is not null");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneEqualTo(String value) {
            addCriterion("MEDIATE_TELEPHONE =", value, "mediateTelephone");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneNotEqualTo(String value) {
            addCriterion("MEDIATE_TELEPHONE <>", value, "mediateTelephone");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneGreaterThan(String value) {
            addCriterion("MEDIATE_TELEPHONE >", value, "mediateTelephone");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_TELEPHONE >=", value, "mediateTelephone");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneLessThan(String value) {
            addCriterion("MEDIATE_TELEPHONE <", value, "mediateTelephone");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_TELEPHONE <=", value, "mediateTelephone");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneLike(String value) {
            addCriterion("MEDIATE_TELEPHONE like", value, "mediateTelephone");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneNotLike(String value) {
            addCriterion("MEDIATE_TELEPHONE not like", value, "mediateTelephone");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneIn(List<String> values) {
            addCriterion("MEDIATE_TELEPHONE in", values, "mediateTelephone");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneNotIn(List<String> values) {
            addCriterion("MEDIATE_TELEPHONE not in", values, "mediateTelephone");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneBetween(String value1, String value2) {
            addCriterion("MEDIATE_TELEPHONE between", value1, value2, "mediateTelephone");
            return (Criteria) this;
        }

        public Criteria andMediateTelephoneNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_TELEPHONE not between", value1, value2, "mediateTelephone");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneIsNull() {
            addCriterion("MEDIATE_CELLPHONE is null");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneIsNotNull() {
            addCriterion("MEDIATE_CELLPHONE is not null");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneEqualTo(String value) {
            addCriterion("MEDIATE_CELLPHONE =", value, "mediateCellphone");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneNotEqualTo(String value) {
            addCriterion("MEDIATE_CELLPHONE <>", value, "mediateCellphone");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneGreaterThan(String value) {
            addCriterion("MEDIATE_CELLPHONE >", value, "mediateCellphone");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_CELLPHONE >=", value, "mediateCellphone");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneLessThan(String value) {
            addCriterion("MEDIATE_CELLPHONE <", value, "mediateCellphone");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_CELLPHONE <=", value, "mediateCellphone");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneLike(String value) {
            addCriterion("MEDIATE_CELLPHONE like", value, "mediateCellphone");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneNotLike(String value) {
            addCriterion("MEDIATE_CELLPHONE not like", value, "mediateCellphone");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneIn(List<String> values) {
            addCriterion("MEDIATE_CELLPHONE in", values, "mediateCellphone");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneNotIn(List<String> values) {
            addCriterion("MEDIATE_CELLPHONE not in", values, "mediateCellphone");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneBetween(String value1, String value2) {
            addCriterion("MEDIATE_CELLPHONE between", value1, value2, "mediateCellphone");
            return (Criteria) this;
        }

        public Criteria andMediateCellphoneNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_CELLPHONE not between", value1, value2, "mediateCellphone");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddIsNull() {
            addCriterion("MEDIATE_COMPLETE_ADD is null");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddIsNotNull() {
            addCriterion("MEDIATE_COMPLETE_ADD is not null");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddEqualTo(String value) {
            addCriterion("MEDIATE_COMPLETE_ADD =", value, "mediateCompleteAdd");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddNotEqualTo(String value) {
            addCriterion("MEDIATE_COMPLETE_ADD <>", value, "mediateCompleteAdd");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddGreaterThan(String value) {
            addCriterion("MEDIATE_COMPLETE_ADD >", value, "mediateCompleteAdd");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_COMPLETE_ADD >=", value, "mediateCompleteAdd");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddLessThan(String value) {
            addCriterion("MEDIATE_COMPLETE_ADD <", value, "mediateCompleteAdd");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_COMPLETE_ADD <=", value, "mediateCompleteAdd");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddLike(String value) {
            addCriterion("MEDIATE_COMPLETE_ADD like", value, "mediateCompleteAdd");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddNotLike(String value) {
            addCriterion("MEDIATE_COMPLETE_ADD not like", value, "mediateCompleteAdd");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddIn(List<String> values) {
            addCriterion("MEDIATE_COMPLETE_ADD in", values, "mediateCompleteAdd");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddNotIn(List<String> values) {
            addCriterion("MEDIATE_COMPLETE_ADD not in", values, "mediateCompleteAdd");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddBetween(String value1, String value2) {
            addCriterion("MEDIATE_COMPLETE_ADD between", value1, value2, "mediateCompleteAdd");
            return (Criteria) this;
        }

        public Criteria andMediateCompleteAddNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_COMPLETE_ADD not between", value1, value2, "mediateCompleteAdd");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierIsNull() {
            addCriterion("MEDIATE_IDENTIFIER is null");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierIsNotNull() {
            addCriterion("MEDIATE_IDENTIFIER is not null");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierEqualTo(String value) {
            addCriterion("MEDIATE_IDENTIFIER =", value, "mediateIdentifier");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierNotEqualTo(String value) {
            addCriterion("MEDIATE_IDENTIFIER <>", value, "mediateIdentifier");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierGreaterThan(String value) {
            addCriterion("MEDIATE_IDENTIFIER >", value, "mediateIdentifier");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_IDENTIFIER >=", value, "mediateIdentifier");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierLessThan(String value) {
            addCriterion("MEDIATE_IDENTIFIER <", value, "mediateIdentifier");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_IDENTIFIER <=", value, "mediateIdentifier");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierLike(String value) {
            addCriterion("MEDIATE_IDENTIFIER like", value, "mediateIdentifier");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierNotLike(String value) {
            addCriterion("MEDIATE_IDENTIFIER not like", value, "mediateIdentifier");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierIn(List<String> values) {
            addCriterion("MEDIATE_IDENTIFIER in", values, "mediateIdentifier");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierNotIn(List<String> values) {
            addCriterion("MEDIATE_IDENTIFIER not in", values, "mediateIdentifier");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierBetween(String value1, String value2) {
            addCriterion("MEDIATE_IDENTIFIER between", value1, value2, "mediateIdentifier");
            return (Criteria) this;
        }

        public Criteria andMediateIdentifierNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_IDENTIFIER not between", value1, value2, "mediateIdentifier");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitIsNull() {
            addCriterion("MEDIATE_REGIS_UNIT is null");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitIsNotNull() {
            addCriterion("MEDIATE_REGIS_UNIT is not null");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_UNIT =", value, "mediateRegisUnit");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitNotEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_UNIT <>", value, "mediateRegisUnit");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitGreaterThan(String value) {
            addCriterion("MEDIATE_REGIS_UNIT >", value, "mediateRegisUnit");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_UNIT >=", value, "mediateRegisUnit");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitLessThan(String value) {
            addCriterion("MEDIATE_REGIS_UNIT <", value, "mediateRegisUnit");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_UNIT <=", value, "mediateRegisUnit");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitLike(String value) {
            addCriterion("MEDIATE_REGIS_UNIT like", value, "mediateRegisUnit");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitNotLike(String value) {
            addCriterion("MEDIATE_REGIS_UNIT not like", value, "mediateRegisUnit");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitIn(List<String> values) {
            addCriterion("MEDIATE_REGIS_UNIT in", values, "mediateRegisUnit");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitNotIn(List<String> values) {
            addCriterion("MEDIATE_REGIS_UNIT not in", values, "mediateRegisUnit");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitBetween(String value1, String value2) {
            addCriterion("MEDIATE_REGIS_UNIT between", value1, value2, "mediateRegisUnit");
            return (Criteria) this;
        }

        public Criteria andMediateRegisUnitNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_REGIS_UNIT not between", value1, value2, "mediateRegisUnit");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeIsNull() {
            addCriterion("MEDIATE_PURPOSE is null");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeIsNotNull() {
            addCriterion("MEDIATE_PURPOSE is not null");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeEqualTo(String value) {
            addCriterion("MEDIATE_PURPOSE =", value, "mediatePurpose");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeNotEqualTo(String value) {
            addCriterion("MEDIATE_PURPOSE <>", value, "mediatePurpose");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeGreaterThan(String value) {
            addCriterion("MEDIATE_PURPOSE >", value, "mediatePurpose");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_PURPOSE >=", value, "mediatePurpose");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeLessThan(String value) {
            addCriterion("MEDIATE_PURPOSE <", value, "mediatePurpose");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_PURPOSE <=", value, "mediatePurpose");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeLike(String value) {
            addCriterion("MEDIATE_PURPOSE like", value, "mediatePurpose");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeNotLike(String value) {
            addCriterion("MEDIATE_PURPOSE not like", value, "mediatePurpose");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeIn(List<String> values) {
            addCriterion("MEDIATE_PURPOSE in", values, "mediatePurpose");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeNotIn(List<String> values) {
            addCriterion("MEDIATE_PURPOSE not in", values, "mediatePurpose");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeBetween(String value1, String value2) {
            addCriterion("MEDIATE_PURPOSE between", value1, value2, "mediatePurpose");
            return (Criteria) this;
        }

        public Criteria andMediatePurposeNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_PURPOSE not between", value1, value2, "mediatePurpose");
            return (Criteria) this;
        }

        public Criteria andMediateDateIsNull() {
            addCriterion("MEDIATE_DATE is null");
            return (Criteria) this;
        }

        public Criteria andMediateDateIsNotNull() {
            addCriterion("MEDIATE_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andMediateDateEqualTo(String value) {
            addCriterion("MEDIATE_DATE =", value, "mediateDate");
            return (Criteria) this;
        }

        public Criteria andMediateDateNotEqualTo(String value) {
            addCriterion("MEDIATE_DATE <>", value, "mediateDate");
            return (Criteria) this;
        }

        public Criteria andMediateDateGreaterThan(String value) {
            addCriterion("MEDIATE_DATE >", value, "mediateDate");
            return (Criteria) this;
        }

        public Criteria andMediateDateGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_DATE >=", value, "mediateDate");
            return (Criteria) this;
        }

        public Criteria andMediateDateLessThan(String value) {
            addCriterion("MEDIATE_DATE <", value, "mediateDate");
            return (Criteria) this;
        }

        public Criteria andMediateDateLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_DATE <=", value, "mediateDate");
            return (Criteria) this;
        }

        public Criteria andMediateDateLike(String value) {
            addCriterion("MEDIATE_DATE like", value, "mediateDate");
            return (Criteria) this;
        }

        public Criteria andMediateDateNotLike(String value) {
            addCriterion("MEDIATE_DATE not like", value, "mediateDate");
            return (Criteria) this;
        }

        public Criteria andMediateDateIn(List<String> values) {
            addCriterion("MEDIATE_DATE in", values, "mediateDate");
            return (Criteria) this;
        }

        public Criteria andMediateDateNotIn(List<String> values) {
            addCriterion("MEDIATE_DATE not in", values, "mediateDate");
            return (Criteria) this;
        }

        public Criteria andMediateDateBetween(String value1, String value2) {
            addCriterion("MEDIATE_DATE between", value1, value2, "mediateDate");
            return (Criteria) this;
        }

        public Criteria andMediateDateNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_DATE not between", value1, value2, "mediateDate");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameIsNull() {
            addCriterion("MEDIATE_REGIS_NAME is null");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameIsNotNull() {
            addCriterion("MEDIATE_REGIS_NAME is not null");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_NAME =", value, "mediateRegisName");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameNotEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_NAME <>", value, "mediateRegisName");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameGreaterThan(String value) {
            addCriterion("MEDIATE_REGIS_NAME >", value, "mediateRegisName");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_NAME >=", value, "mediateRegisName");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameLessThan(String value) {
            addCriterion("MEDIATE_REGIS_NAME <", value, "mediateRegisName");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_NAME <=", value, "mediateRegisName");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameLike(String value) {
            addCriterion("MEDIATE_REGIS_NAME like", value, "mediateRegisName");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameNotLike(String value) {
            addCriterion("MEDIATE_REGIS_NAME not like", value, "mediateRegisName");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameIn(List<String> values) {
            addCriterion("MEDIATE_REGIS_NAME in", values, "mediateRegisName");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameNotIn(List<String> values) {
            addCriterion("MEDIATE_REGIS_NAME not in", values, "mediateRegisName");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameBetween(String value1, String value2) {
            addCriterion("MEDIATE_REGIS_NAME between", value1, value2, "mediateRegisName");
            return (Criteria) this;
        }

        public Criteria andMediateRegisNameNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_REGIS_NAME not between", value1, value2, "mediateRegisName");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchIsNull() {
            addCriterion("MEDIATE_REGIS_BRANCH is null");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchIsNotNull() {
            addCriterion("MEDIATE_REGIS_BRANCH is not null");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_BRANCH =", value, "mediateRegisBranch");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchNotEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_BRANCH <>", value, "mediateRegisBranch");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchGreaterThan(String value) {
            addCriterion("MEDIATE_REGIS_BRANCH >", value, "mediateRegisBranch");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_BRANCH >=", value, "mediateRegisBranch");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchLessThan(String value) {
            addCriterion("MEDIATE_REGIS_BRANCH <", value, "mediateRegisBranch");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_BRANCH <=", value, "mediateRegisBranch");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchLike(String value) {
            addCriterion("MEDIATE_REGIS_BRANCH like", value, "mediateRegisBranch");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchNotLike(String value) {
            addCriterion("MEDIATE_REGIS_BRANCH not like", value, "mediateRegisBranch");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchIn(List<String> values) {
            addCriterion("MEDIATE_REGIS_BRANCH in", values, "mediateRegisBranch");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchNotIn(List<String> values) {
            addCriterion("MEDIATE_REGIS_BRANCH not in", values, "mediateRegisBranch");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchBetween(String value1, String value2) {
            addCriterion("MEDIATE_REGIS_BRANCH between", value1, value2, "mediateRegisBranch");
            return (Criteria) this;
        }

        public Criteria andMediateRegisBranchNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_REGIS_BRANCH not between", value1, value2, "mediateRegisBranch");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateIsNull() {
            addCriterion("MEDIATE_REGIS_DATE is null");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateIsNotNull() {
            addCriterion("MEDIATE_REGIS_DATE is not null");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_DATE =", value, "mediateRegisDate");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateNotEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_DATE <>", value, "mediateRegisDate");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateGreaterThan(String value) {
            addCriterion("MEDIATE_REGIS_DATE >", value, "mediateRegisDate");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_DATE >=", value, "mediateRegisDate");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateLessThan(String value) {
            addCriterion("MEDIATE_REGIS_DATE <", value, "mediateRegisDate");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_REGIS_DATE <=", value, "mediateRegisDate");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateLike(String value) {
            addCriterion("MEDIATE_REGIS_DATE like", value, "mediateRegisDate");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateNotLike(String value) {
            addCriterion("MEDIATE_REGIS_DATE not like", value, "mediateRegisDate");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateIn(List<String> values) {
            addCriterion("MEDIATE_REGIS_DATE in", values, "mediateRegisDate");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateNotIn(List<String> values) {
            addCriterion("MEDIATE_REGIS_DATE not in", values, "mediateRegisDate");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateBetween(String value1, String value2) {
            addCriterion("MEDIATE_REGIS_DATE between", value1, value2, "mediateRegisDate");
            return (Criteria) this;
        }

        public Criteria andMediateRegisDateNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_REGIS_DATE not between", value1, value2, "mediateRegisDate");
            return (Criteria) this;
        }

        public Criteria andMediateReasonIsNull() {
            addCriterion("MEDIATE_REASON is null");
            return (Criteria) this;
        }

        public Criteria andMediateReasonIsNotNull() {
            addCriterion("MEDIATE_REASON is not null");
            return (Criteria) this;
        }

        public Criteria andMediateReasonEqualTo(String value) {
            addCriterion("MEDIATE_REASON =", value, "mediateReason");
            return (Criteria) this;
        }

        public Criteria andMediateReasonNotEqualTo(String value) {
            addCriterion("MEDIATE_REASON <>", value, "mediateReason");
            return (Criteria) this;
        }

        public Criteria andMediateReasonGreaterThan(String value) {
            addCriterion("MEDIATE_REASON >", value, "mediateReason");
            return (Criteria) this;
        }

        public Criteria andMediateReasonGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_REASON >=", value, "mediateReason");
            return (Criteria) this;
        }

        public Criteria andMediateReasonLessThan(String value) {
            addCriterion("MEDIATE_REASON <", value, "mediateReason");
            return (Criteria) this;
        }

        public Criteria andMediateReasonLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_REASON <=", value, "mediateReason");
            return (Criteria) this;
        }

        public Criteria andMediateReasonLike(String value) {
            addCriterion("MEDIATE_REASON like", value, "mediateReason");
            return (Criteria) this;
        }

        public Criteria andMediateReasonNotLike(String value) {
            addCriterion("MEDIATE_REASON not like", value, "mediateReason");
            return (Criteria) this;
        }

        public Criteria andMediateReasonIn(List<String> values) {
            addCriterion("MEDIATE_REASON in", values, "mediateReason");
            return (Criteria) this;
        }

        public Criteria andMediateReasonNotIn(List<String> values) {
            addCriterion("MEDIATE_REASON not in", values, "mediateReason");
            return (Criteria) this;
        }

        public Criteria andMediateReasonBetween(String value1, String value2) {
            addCriterion("MEDIATE_REASON between", value1, value2, "mediateReason");
            return (Criteria) this;
        }

        public Criteria andMediateReasonNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_REASON not between", value1, value2, "mediateReason");
            return (Criteria) this;
        }

        public Criteria andMediateContentIsNull() {
            addCriterion("MEDIATE_CONTENT is null");
            return (Criteria) this;
        }

        public Criteria andMediateContentIsNotNull() {
            addCriterion("MEDIATE_CONTENT is not null");
            return (Criteria) this;
        }

        public Criteria andMediateContentEqualTo(String value) {
            addCriterion("MEDIATE_CONTENT =", value, "mediateContent");
            return (Criteria) this;
        }

        public Criteria andMediateContentNotEqualTo(String value) {
            addCriterion("MEDIATE_CONTENT <>", value, "mediateContent");
            return (Criteria) this;
        }

        public Criteria andMediateContentGreaterThan(String value) {
            addCriterion("MEDIATE_CONTENT >", value, "mediateContent");
            return (Criteria) this;
        }

        public Criteria andMediateContentGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_CONTENT >=", value, "mediateContent");
            return (Criteria) this;
        }

        public Criteria andMediateContentLessThan(String value) {
            addCriterion("MEDIATE_CONTENT <", value, "mediateContent");
            return (Criteria) this;
        }

        public Criteria andMediateContentLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_CONTENT <=", value, "mediateContent");
            return (Criteria) this;
        }

        public Criteria andMediateContentLike(String value) {
            addCriterion("MEDIATE_CONTENT like", value, "mediateContent");
            return (Criteria) this;
        }

        public Criteria andMediateContentNotLike(String value) {
            addCriterion("MEDIATE_CONTENT not like", value, "mediateContent");
            return (Criteria) this;
        }

        public Criteria andMediateContentIn(List<String> values) {
            addCriterion("MEDIATE_CONTENT in", values, "mediateContent");
            return (Criteria) this;
        }

        public Criteria andMediateContentNotIn(List<String> values) {
            addCriterion("MEDIATE_CONTENT not in", values, "mediateContent");
            return (Criteria) this;
        }

        public Criteria andMediateContentBetween(String value1, String value2) {
            addCriterion("MEDIATE_CONTENT between", value1, value2, "mediateContent");
            return (Criteria) this;
        }

        public Criteria andMediateContentNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_CONTENT not between", value1, value2, "mediateContent");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolIsNull() {
            addCriterion("MEDIATE_PROTOCOL is null");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolIsNotNull() {
            addCriterion("MEDIATE_PROTOCOL is not null");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolEqualTo(String value) {
            addCriterion("MEDIATE_PROTOCOL =", value, "mediateProtocol");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolNotEqualTo(String value) {
            addCriterion("MEDIATE_PROTOCOL <>", value, "mediateProtocol");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolGreaterThan(String value) {
            addCriterion("MEDIATE_PROTOCOL >", value, "mediateProtocol");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_PROTOCOL >=", value, "mediateProtocol");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolLessThan(String value) {
            addCriterion("MEDIATE_PROTOCOL <", value, "mediateProtocol");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_PROTOCOL <=", value, "mediateProtocol");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolLike(String value) {
            addCriterion("MEDIATE_PROTOCOL like", value, "mediateProtocol");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolNotLike(String value) {
            addCriterion("MEDIATE_PROTOCOL not like", value, "mediateProtocol");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolIn(List<String> values) {
            addCriterion("MEDIATE_PROTOCOL in", values, "mediateProtocol");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolNotIn(List<String> values) {
            addCriterion("MEDIATE_PROTOCOL not in", values, "mediateProtocol");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolBetween(String value1, String value2) {
            addCriterion("MEDIATE_PROTOCOL between", value1, value2, "mediateProtocol");
            return (Criteria) this;
        }

        public Criteria andMediateProtocolNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_PROTOCOL not between", value1, value2, "mediateProtocol");
            return (Criteria) this;
        }

        public Criteria andMediaterStatusIsNull() {
            addCriterion("MEDIATER_STATUS is null");
            return (Criteria) this;
        }

        public Criteria andMediaterStatusIsNotNull() {
            addCriterion("MEDIATER_STATUS is not null");
            return (Criteria) this;
        }

        public Criteria andMediaterStatusEqualTo(BigDecimal value) {
            addCriterion("MEDIATER_STATUS =", value, "mediaterStatus");
            return (Criteria) this;
        }

        public Criteria andMediaterStatusNotEqualTo(BigDecimal value) {
            addCriterion("MEDIATER_STATUS <>", value, "mediaterStatus");
            return (Criteria) this;
        }

        public Criteria andMediaterStatusGreaterThan(BigDecimal value) {
            addCriterion("MEDIATER_STATUS >", value, "mediaterStatus");
            return (Criteria) this;
        }

        public Criteria andMediaterStatusGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("MEDIATER_STATUS >=", value, "mediaterStatus");
            return (Criteria) this;
        }

        public Criteria andMediaterStatusLessThan(BigDecimal value) {
            addCriterion("MEDIATER_STATUS <", value, "mediaterStatus");
            return (Criteria) this;
        }

        public Criteria andMediaterStatusLessThanOrEqualTo(BigDecimal value) {
            addCriterion("MEDIATER_STATUS <=", value, "mediaterStatus");
            return (Criteria) this;
        }

        public Criteria andMediaterStatusIn(List<BigDecimal> values) {
            addCriterion("MEDIATER_STATUS in", values, "mediaterStatus");
            return (Criteria) this;
        }

        public Criteria andMediaterStatusNotIn(List<BigDecimal> values) {
            addCriterion("MEDIATER_STATUS not in", values, "mediaterStatus");
            return (Criteria) this;
        }

        public Criteria andMediaterStatusBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("MEDIATER_STATUS between", value1, value2, "mediaterStatus");
            return (Criteria) this;
        }

        public Criteria andMediaterStatusNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("MEDIATER_STATUS not between", value1, value2, "mediaterStatus");
            return (Criteria) this;
        }

        public Criteria andMediateCodeIsNull() {
            addCriterion("MEDIATE_CODE is null");
            return (Criteria) this;
        }

        public Criteria andMediateCodeIsNotNull() {
            addCriterion("MEDIATE_CODE is not null");
            return (Criteria) this;
        }

        public Criteria andMediateCodeEqualTo(String value) {
            addCriterion("MEDIATE_CODE =", value, "mediateCode");
            return (Criteria) this;
        }

        public Criteria andMediateCodeNotEqualTo(String value) {
            addCriterion("MEDIATE_CODE <>", value, "mediateCode");
            return (Criteria) this;
        }

        public Criteria andMediateCodeGreaterThan(String value) {
            addCriterion("MEDIATE_CODE >", value, "mediateCode");
            return (Criteria) this;
        }

        public Criteria andMediateCodeGreaterThanOrEqualTo(String value) {
            addCriterion("MEDIATE_CODE >=", value, "mediateCode");
            return (Criteria) this;
        }

        public Criteria andMediateCodeLessThan(String value) {
            addCriterion("MEDIATE_CODE <", value, "mediateCode");
            return (Criteria) this;
        }

        public Criteria andMediateCodeLessThanOrEqualTo(String value) {
            addCriterion("MEDIATE_CODE <=", value, "mediateCode");
            return (Criteria) this;
        }

        public Criteria andMediateCodeLike(String value) {
            addCriterion("MEDIATE_CODE like", value, "mediateCode");
            return (Criteria) this;
        }

        public Criteria andMediateCodeNotLike(String value) {
            addCriterion("MEDIATE_CODE not like", value, "mediateCode");
            return (Criteria) this;
        }

        public Criteria andMediateCodeIn(List<String> values) {
            addCriterion("MEDIATE_CODE in", values, "mediateCode");
            return (Criteria) this;
        }

        public Criteria andMediateCodeNotIn(List<String> values) {
            addCriterion("MEDIATE_CODE not in", values, "mediateCode");
            return (Criteria) this;
        }

        public Criteria andMediateCodeBetween(String value1, String value2) {
            addCriterion("MEDIATE_CODE between", value1, value2, "mediateCode");
            return (Criteria) this;
        }

        public Criteria andMediateCodeNotBetween(String value1, String value2) {
            addCriterion("MEDIATE_CODE not between", value1, value2, "mediateCode");
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