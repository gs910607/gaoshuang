/**
 * H5页面校验
 */
var Validator = {
    reg: "",
    //字符串校验
    validateStr: function (value) {
        this.reg = /[a-zA-Z0-9|_]{1,15}/;
        return this.reg.test(value);
    },
    //手机号校验
    validatePhone: function (value) {
        this.reg = /^[1]{1}[3|5|7|8]{1}[0-9]{9}/;
        return this.reg.test(value);
    },
    //空校验
    validateNull: function (value) {
        if (value == null || value == undefined || value == '' || value.length == 0)
            return true;
        else
            return false;
    },
    //验证码校验(6位纯数字)
    validateCode: function (value) {
        this.reg = /^[0-9]{6}/;
        return this.reg.test(value);
    },
    //校验是否为URL地址
    validateURL: function (value) {
        var strReg = "/((http|ftp|https|file):\/\/([\\w\\-]+\\.)+[\\w\\-]+(\/[\\w\u4e00-\u9fa5\\-\\.\/?\\@\\%\\!\\&=\\+\\~\\:\\#\\;\\,]*)?)/ig";
        var re = new RegExp(strReg);
        if (!re.test(url)) {
            return false;
        } else {
            return true;
        }
    }
}