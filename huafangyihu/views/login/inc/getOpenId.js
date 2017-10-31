/**
 * Created by XuanMing on 2017/3/27.
 */
$(function () {
    var wxUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
        + 'appid='
        + weixinConfig.APPID
        + '&redirect_uri='
        + encodeURIComponent(config.callBack_Url)
        + '&response_type=code&scope=snsapi_base&state='
        + GetQueryStr("recommendId");
        +'#wechat_redirect';
    console.log('编码地址:' + encodeURIComponent(config.callBack_Url));
    window.location.href = wxUrl;
})
