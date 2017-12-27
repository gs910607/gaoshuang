package com.jzsx.xlgc.bean;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.jzsx.xlgc.bean.CasUserExample.Criteria;

public class CasUserExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public CasUserExample() {
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

        public Criteria andUseridIsNull() {
            addCriterion("USERID is null");
            return (Criteria) this;
        }

        public Criteria andUseridIsNotNull() {
            addCriterion("USERID is not null");
            return (Criteria) this;
        }

        public Criteria andUseridEqualTo(String value) {
            addCriterion("USERID =", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotEqualTo(String value) {
            addCriterion("USERID <>", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridGreaterThan(String value) {
            addCriterion("USERID >", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridGreaterThanOrEqualTo(String value) {
            addCriterion("USERID >=", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridLessThan(String value) {
            addCriterion("USERID <", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridLessThanOrEqualTo(String value) {
            addCriterion("USERID <=", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridLike(String value) {
            addCriterion("USERID like", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotLike(String value) {
            addCriterion("USERID not like", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridIn(List<String> values) {
            addCriterion("USERID in", values, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotIn(List<String> values) {
            addCriterion("USERID not in", values, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridBetween(String value1, String value2) {
            addCriterion("USERID between", value1, value2, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotBetween(String value1, String value2) {
            addCriterion("USERID not between", value1, value2, "userid");
            return (Criteria) this;
        }

        public Criteria andUsergroupidLike(String value) {
            addCriterion("USERGROUPID like", value, "USERGROUPID");
            return (Criteria) this;
        }
        
        public Criteria andUsergroupidIsNull() {
            addCriterion("USERGROUPID is null");
            return (Criteria) this;
        }

        public Criteria andUsergroupidIsNotNull() {
            addCriterion("USERGROUPID is not null");
            return (Criteria) this;
        }

        public Criteria andUsergroupidEqualTo(BigDecimal value) {
            addCriterion("USERGROUPID =", value, "usergroupid");
            return (Criteria) this;
        }

        public Criteria andUsergroupidNotEqualTo(BigDecimal value) {
            addCriterion("USERGROUPID <>", value, "usergroupid");
            return (Criteria) this;
        }

        public Criteria andUsergroupidGreaterThan(BigDecimal value) {
            addCriterion("USERGROUPID >", value, "usergroupid");
            return (Criteria) this;
        }

        public Criteria andUsergroupidGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("USERGROUPID >=", value, "usergroupid");
            return (Criteria) this;
        }

        public Criteria andUsergroupidLessThan(BigDecimal value) {
            addCriterion("USERGROUPID <", value, "usergroupid");
            return (Criteria) this;
        }

        public Criteria andUsergroupidLessThanOrEqualTo(BigDecimal value) {
            addCriterion("USERGROUPID <=", value, "usergroupid");
            return (Criteria) this;
        }

        public Criteria andUsergroupidIn(List<BigDecimal> values) {
            addCriterion("USERGROUPID in", values, "usergroupid");
            return (Criteria) this;
        }

        public Criteria andUsergroupidNotIn(List<BigDecimal> values) {
            addCriterion("USERGROUPID not in", values, "usergroupid");
            return (Criteria) this;
        }

        public Criteria andUsergroupidBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("USERGROUPID between", value1, value2, "usergroupid");
            return (Criteria) this;
        }

        public Criteria andUsergroupidNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("USERGROUPID not between", value1, value2, "usergroupid");
            return (Criteria) this;
        }

        public Criteria andUsernameIsNull() {
            addCriterion("USERNAME is null");
            return (Criteria) this;
        }

        public Criteria andUsernameIsNotNull() {
            addCriterion("USERNAME is not null");
            return (Criteria) this;
        }

        public Criteria andUsernameEqualTo(String value) {
            addCriterion("USERNAME =", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameNotEqualTo(String value) {
            addCriterion("USERNAME <>", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameGreaterThan(String value) {
            addCriterion("USERNAME >", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameGreaterThanOrEqualTo(String value) {
            addCriterion("USERNAME >=", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameLessThan(String value) {
            addCriterion("USERNAME <", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameLessThanOrEqualTo(String value) {
            addCriterion("USERNAME <=", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameLike(String value) {
            addCriterion("USERNAME like", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameNotLike(String value) {
            addCriterion("USERNAME not like", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameIn(List<String> values) {
            addCriterion("USERNAME in", values, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameNotIn(List<String> values) {
            addCriterion("USERNAME not in", values, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameBetween(String value1, String value2) {
            addCriterion("USERNAME between", value1, value2, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameNotBetween(String value1, String value2) {
            addCriterion("USERNAME not between", value1, value2, "username");
            return (Criteria) this;
        }

        public Criteria andPasswordIsNull() {
            addCriterion("PASSWORD is null");
            return (Criteria) this;
        }

        public Criteria andPasswordIsNotNull() {
            addCriterion("PASSWORD is not null");
            return (Criteria) this;
        }

        public Criteria andPasswordEqualTo(String value) {
            addCriterion("PASSWORD =", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotEqualTo(String value) {
            addCriterion("PASSWORD <>", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordGreaterThan(String value) {
            addCriterion("PASSWORD >", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordGreaterThanOrEqualTo(String value) {
            addCriterion("PASSWORD >=", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordLessThan(String value) {
            addCriterion("PASSWORD <", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordLessThanOrEqualTo(String value) {
            addCriterion("PASSWORD <=", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordLike(String value) {
            addCriterion("PASSWORD like", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotLike(String value) {
            addCriterion("PASSWORD not like", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordIn(List<String> values) {
            addCriterion("PASSWORD in", values, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotIn(List<String> values) {
            addCriterion("PASSWORD not in", values, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordBetween(String value1, String value2) {
            addCriterion("PASSWORD between", value1, value2, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotBetween(String value1, String value2) {
            addCriterion("PASSWORD not between", value1, value2, "password");
            return (Criteria) this;
        }

        public Criteria andUserkindIsNull() {
            addCriterion("USERKIND is null");
            return (Criteria) this;
        }

        public Criteria andUserkindIsNotNull() {
            addCriterion("USERKIND is not null");
            return (Criteria) this;
        }

        public Criteria andUserkindEqualTo(BigDecimal value) {
            addCriterion("USERKIND =", value, "userkind");
            return (Criteria) this;
        }

        public Criteria andUserkindNotEqualTo(BigDecimal value) {
            addCriterion("USERKIND <>", value, "userkind");
            return (Criteria) this;
        }

        public Criteria andUserkindGreaterThan(BigDecimal value) {
            addCriterion("USERKIND >", value, "userkind");
            return (Criteria) this;
        }

        public Criteria andUserkindGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("USERKIND >=", value, "userkind");
            return (Criteria) this;
        }

        public Criteria andUserkindLessThan(BigDecimal value) {
            addCriterion("USERKIND <", value, "userkind");
            return (Criteria) this;
        }

        public Criteria andUserkindLessThanOrEqualTo(BigDecimal value) {
            addCriterion("USERKIND <=", value, "userkind");
            return (Criteria) this;
        }

        public Criteria andUserkindIn(List<BigDecimal> values) {
            addCriterion("USERKIND in", values, "userkind");
            return (Criteria) this;
        }

        public Criteria andUserkindNotIn(List<BigDecimal> values) {
            addCriterion("USERKIND not in", values, "userkind");
            return (Criteria) this;
        }

        public Criteria andUserkindBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("USERKIND between", value1, value2, "userkind");
            return (Criteria) this;
        }

        public Criteria andUserkindNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("USERKIND not between", value1, value2, "userkind");
            return (Criteria) this;
        }

        public Criteria andUserlevelIsNull() {
            addCriterion("USERLEVEL is null");
            return (Criteria) this;
        }

        public Criteria andUserlevelIsNotNull() {
            addCriterion("USERLEVEL is not null");
            return (Criteria) this;
        }

        public Criteria andUserlevelEqualTo(BigDecimal value) {
            addCriterion("USERLEVEL =", value, "userlevel");
            return (Criteria) this;
        }

        public Criteria andUserlevelNotEqualTo(BigDecimal value) {
            addCriterion("USERLEVEL <>", value, "userlevel");
            return (Criteria) this;
        }

        public Criteria andUserlevelGreaterThan(BigDecimal value) {
            addCriterion("USERLEVEL >", value, "userlevel");
            return (Criteria) this;
        }

        public Criteria andUserlevelGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("USERLEVEL >=", value, "userlevel");
            return (Criteria) this;
        }

        public Criteria andUserlevelLessThan(BigDecimal value) {
            addCriterion("USERLEVEL <", value, "userlevel");
            return (Criteria) this;
        }

        public Criteria andUserlevelLessThanOrEqualTo(BigDecimal value) {
            addCriterion("USERLEVEL <=", value, "userlevel");
            return (Criteria) this;
        }

        public Criteria andUserlevelIn(List<BigDecimal> values) {
            addCriterion("USERLEVEL in", values, "userlevel");
            return (Criteria) this;
        }

        public Criteria andUserlevelNotIn(List<BigDecimal> values) {
            addCriterion("USERLEVEL not in", values, "userlevel");
            return (Criteria) this;
        }

        public Criteria andUserlevelBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("USERLEVEL between", value1, value2, "userlevel");
            return (Criteria) this;
        }

        public Criteria andUserlevelNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("USERLEVEL not between", value1, value2, "userlevel");
            return (Criteria) this;
        }

        public Criteria andIplimitIsNull() {
            addCriterion("IPLIMIT is null");
            return (Criteria) this;
        }

        public Criteria andIplimitIsNotNull() {
            addCriterion("IPLIMIT is not null");
            return (Criteria) this;
        }

        public Criteria andIplimitEqualTo(String value) {
            addCriterion("IPLIMIT =", value, "iplimit");
            return (Criteria) this;
        }

        public Criteria andIplimitNotEqualTo(String value) {
            addCriterion("IPLIMIT <>", value, "iplimit");
            return (Criteria) this;
        }

        public Criteria andIplimitGreaterThan(String value) {
            addCriterion("IPLIMIT >", value, "iplimit");
            return (Criteria) this;
        }

        public Criteria andIplimitGreaterThanOrEqualTo(String value) {
            addCriterion("IPLIMIT >=", value, "iplimit");
            return (Criteria) this;
        }

        public Criteria andIplimitLessThan(String value) {
            addCriterion("IPLIMIT <", value, "iplimit");
            return (Criteria) this;
        }

        public Criteria andIplimitLessThanOrEqualTo(String value) {
            addCriterion("IPLIMIT <=", value, "iplimit");
            return (Criteria) this;
        }

        public Criteria andIplimitLike(String value) {
            addCriterion("IPLIMIT like", value, "iplimit");
            return (Criteria) this;
        }

        public Criteria andIplimitNotLike(String value) {
            addCriterion("IPLIMIT not like", value, "iplimit");
            return (Criteria) this;
        }

        public Criteria andIplimitIn(List<String> values) {
            addCriterion("IPLIMIT in", values, "iplimit");
            return (Criteria) this;
        }

        public Criteria andIplimitNotIn(List<String> values) {
            addCriterion("IPLIMIT not in", values, "iplimit");
            return (Criteria) this;
        }

        public Criteria andIplimitBetween(String value1, String value2) {
            addCriterion("IPLIMIT between", value1, value2, "iplimit");
            return (Criteria) this;
        }

        public Criteria andIplimitNotBetween(String value1, String value2) {
            addCriterion("IPLIMIT not between", value1, value2, "iplimit");
            return (Criteria) this;
        }

        public Criteria andMutillimitIsNull() {
            addCriterion("MUTILLIMIT is null");
            return (Criteria) this;
        }

        public Criteria andMutillimitIsNotNull() {
            addCriterion("MUTILLIMIT is not null");
            return (Criteria) this;
        }

        public Criteria andMutillimitEqualTo(BigDecimal value) {
            addCriterion("MUTILLIMIT =", value, "mutillimit");
            return (Criteria) this;
        }

        public Criteria andMutillimitNotEqualTo(BigDecimal value) {
            addCriterion("MUTILLIMIT <>", value, "mutillimit");
            return (Criteria) this;
        }

        public Criteria andMutillimitGreaterThan(BigDecimal value) {
            addCriterion("MUTILLIMIT >", value, "mutillimit");
            return (Criteria) this;
        }

        public Criteria andMutillimitGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("MUTILLIMIT >=", value, "mutillimit");
            return (Criteria) this;
        }

        public Criteria andMutillimitLessThan(BigDecimal value) {
            addCriterion("MUTILLIMIT <", value, "mutillimit");
            return (Criteria) this;
        }

        public Criteria andMutillimitLessThanOrEqualTo(BigDecimal value) {
            addCriterion("MUTILLIMIT <=", value, "mutillimit");
            return (Criteria) this;
        }

        public Criteria andMutillimitIn(List<BigDecimal> values) {
            addCriterion("MUTILLIMIT in", values, "mutillimit");
            return (Criteria) this;
        }

        public Criteria andMutillimitNotIn(List<BigDecimal> values) {
            addCriterion("MUTILLIMIT not in", values, "mutillimit");
            return (Criteria) this;
        }

        public Criteria andMutillimitBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("MUTILLIMIT between", value1, value2, "mutillimit");
            return (Criteria) this;
        }

        public Criteria andMutillimitNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("MUTILLIMIT not between", value1, value2, "mutillimit");
            return (Criteria) this;
        }

        public Criteria andRealnameIsNull() {
            addCriterion("REALNAME is null");
            return (Criteria) this;
        }

        public Criteria andRealnameIsNotNull() {
            addCriterion("REALNAME is not null");
            return (Criteria) this;
        }

        public Criteria andRealnameEqualTo(String value) {
            addCriterion("REALNAME =", value, "realname");
            return (Criteria) this;
        }

        public Criteria andRealnameNotEqualTo(String value) {
            addCriterion("REALNAME <>", value, "realname");
            return (Criteria) this;
        }

        public Criteria andRealnameGreaterThan(String value) {
            addCriterion("REALNAME >", value, "realname");
            return (Criteria) this;
        }

        public Criteria andRealnameGreaterThanOrEqualTo(String value) {
            addCriterion("REALNAME >=", value, "realname");
            return (Criteria) this;
        }

        public Criteria andRealnameLessThan(String value) {
            addCriterion("REALNAME <", value, "realname");
            return (Criteria) this;
        }

        public Criteria andRealnameLessThanOrEqualTo(String value) {
            addCriterion("REALNAME <=", value, "realname");
            return (Criteria) this;
        }

        public Criteria andRealnameLike(String value) {
            addCriterion("REALNAME like", value, "realname");
            return (Criteria) this;
        }

        public Criteria andRealnameNotLike(String value) {
            addCriterion("REALNAME not like", value, "realname");
            return (Criteria) this;
        }

        public Criteria andRealnameIn(List<String> values) {
            addCriterion("REALNAME in", values, "realname");
            return (Criteria) this;
        }

        public Criteria andRealnameNotIn(List<String> values) {
            addCriterion("REALNAME not in", values, "realname");
            return (Criteria) this;
        }

        public Criteria andRealnameBetween(String value1, String value2) {
            addCriterion("REALNAME between", value1, value2, "realname");
            return (Criteria) this;
        }

        public Criteria andRealnameNotBetween(String value1, String value2) {
            addCriterion("REALNAME not between", value1, value2, "realname");
            return (Criteria) this;
        }

        public Criteria andUsertelIsNull() {
            addCriterion("USERTEL is null");
            return (Criteria) this;
        }

        public Criteria andUsertelIsNotNull() {
            addCriterion("USERTEL is not null");
            return (Criteria) this;
        }

        public Criteria andUsertelEqualTo(String value) {
            addCriterion("USERTEL =", value, "usertel");
            return (Criteria) this;
        }

        public Criteria andUsertelNotEqualTo(String value) {
            addCriterion("USERTEL <>", value, "usertel");
            return (Criteria) this;
        }

        public Criteria andUsertelGreaterThan(String value) {
            addCriterion("USERTEL >", value, "usertel");
            return (Criteria) this;
        }

        public Criteria andUsertelGreaterThanOrEqualTo(String value) {
            addCriterion("USERTEL >=", value, "usertel");
            return (Criteria) this;
        }

        public Criteria andUsertelLessThan(String value) {
            addCriterion("USERTEL <", value, "usertel");
            return (Criteria) this;
        }

        public Criteria andUsertelLessThanOrEqualTo(String value) {
            addCriterion("USERTEL <=", value, "usertel");
            return (Criteria) this;
        }

        public Criteria andUsertelLike(String value) {
            addCriterion("USERTEL like", value, "usertel");
            return (Criteria) this;
        }

        public Criteria andUsertelNotLike(String value) {
            addCriterion("USERTEL not like", value, "usertel");
            return (Criteria) this;
        }

        public Criteria andUsertelIn(List<String> values) {
            addCriterion("USERTEL in", values, "usertel");
            return (Criteria) this;
        }

        public Criteria andUsertelNotIn(List<String> values) {
            addCriterion("USERTEL not in", values, "usertel");
            return (Criteria) this;
        }

        public Criteria andUsertelBetween(String value1, String value2) {
            addCriterion("USERTEL between", value1, value2, "usertel");
            return (Criteria) this;
        }

        public Criteria andUsertelNotBetween(String value1, String value2) {
            addCriterion("USERTEL not between", value1, value2, "usertel");
            return (Criteria) this;
        }

        public Criteria andRemarkIsNull() {
            addCriterion("REMARK is null");
            return (Criteria) this;
        }

        public Criteria andRemarkIsNotNull() {
            addCriterion("REMARK is not null");
            return (Criteria) this;
        }

        public Criteria andRemarkEqualTo(String value) {
            addCriterion("REMARK =", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotEqualTo(String value) {
            addCriterion("REMARK <>", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkGreaterThan(String value) {
            addCriterion("REMARK >", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkGreaterThanOrEqualTo(String value) {
            addCriterion("REMARK >=", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLessThan(String value) {
            addCriterion("REMARK <", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLessThanOrEqualTo(String value) {
            addCriterion("REMARK <=", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLike(String value) {
            addCriterion("REMARK like", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotLike(String value) {
            addCriterion("REMARK not like", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkIn(List<String> values) {
            addCriterion("REMARK in", values, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotIn(List<String> values) {
            addCriterion("REMARK not in", values, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkBetween(String value1, String value2) {
            addCriterion("REMARK between", value1, value2, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotBetween(String value1, String value2) {
            addCriterion("REMARK not between", value1, value2, "remark");
            return (Criteria) this;
        }

        public Criteria andIdentityIsNull() {
            addCriterion("IDENTITY is null");
            return (Criteria) this;
        }

        public Criteria andIdentityIsNotNull() {
            addCriterion("IDENTITY is not null");
            return (Criteria) this;
        }

        public Criteria andIdentityEqualTo(String value) {
            addCriterion("IDENTITY =", value, "identity");
            return (Criteria) this;
        }

        public Criteria andIdentityNotEqualTo(String value) {
            addCriterion("IDENTITY <>", value, "identity");
            return (Criteria) this;
        }

        public Criteria andIdentityGreaterThan(String value) {
            addCriterion("IDENTITY >", value, "identity");
            return (Criteria) this;
        }

        public Criteria andIdentityGreaterThanOrEqualTo(String value) {
            addCriterion("IDENTITY >=", value, "identity");
            return (Criteria) this;
        }

        public Criteria andIdentityLessThan(String value) {
            addCriterion("IDENTITY <", value, "identity");
            return (Criteria) this;
        }

        public Criteria andIdentityLessThanOrEqualTo(String value) {
            addCriterion("IDENTITY <=", value, "identity");
            return (Criteria) this;
        }

        public Criteria andIdentityLike(String value) {
            addCriterion("IDENTITY like", value, "identity");
            return (Criteria) this;
        }

        public Criteria andIdentityNotLike(String value) {
            addCriterion("IDENTITY not like", value, "identity");
            return (Criteria) this;
        }

        public Criteria andIdentityIn(List<String> values) {
            addCriterion("IDENTITY in", values, "identity");
            return (Criteria) this;
        }

        public Criteria andIdentityNotIn(List<String> values) {
            addCriterion("IDENTITY not in", values, "identity");
            return (Criteria) this;
        }

        public Criteria andIdentityBetween(String value1, String value2) {
            addCriterion("IDENTITY between", value1, value2, "identity");
            return (Criteria) this;
        }

        public Criteria andIdentityNotBetween(String value1, String value2) {
            addCriterion("IDENTITY not between", value1, value2, "identity");
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