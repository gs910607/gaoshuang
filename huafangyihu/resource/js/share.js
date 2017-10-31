/*Create By LiMing 4/18/2017*/
function shareInvoke(shareLink,shareTitle,shareImgUrl) {
	var shareLink = shareLink;
	var shareTitle = shareTitle;
	var shareImgUrl = shareImgUrl;
    //获取微信信息
    var params;
    $.ajax({
        type: 'GET',
        url:  config.appserver_url + '/wechat/getSignParams.json',
        async: false,
        data: {
            url: shareLink
        },
        dataType: 'JSON',
        success: function (data) {
            params = data.data;
            console.log(params)
        },
        error: function () {
            alert("服务繁忙，请稍后再试！");
        }
    })

    //appid
    var appId;
    //时间戳
    var timestamp;
    //随机字符串
    var nonceStr;
    //签名
    var signature;
    var jsApiList;
    //信息配置

    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: params.appid, // 必填，公众号的唯一标识
        timestamp: params.timestamp, // 必填，生成签名的时间戳
        nonceStr: params.nonceStr, // 必填，生成签名的随机串
        signature: params.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表
    });


    wx.ready(function () {
        wx.onMenuShareTimeline({

            title: '分享到朋友圈', // 分享标题
            
             desc: shareTitle, // 分享描述

            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

            imgUrl: shareImgUrl, // 分享图标

            success: function () {
                // 用户确认分享后执行的回调函数

            },

            cancel: function () {
                // 用户取消分享后执行的回调函数
            }

        });
        wx.onMenuShareQQ({

            title: '分享到QQ', // 分享标题

            desc: shareTitle, // 分享描述

            link: shareLink, // 分享链接

            imgUrl: shareImgUrl, // 分享图标

            success: function () {

                // 用户确认分享后执行的回调函数

            },

            cancel: function () {

                // 用户取消分享后执行的回调函数

            }
        });
        wx.onMenuShareAppMessage({

            title: '分享给朋友', // 分享标题

            desc: shareTitle, // 分享描述

            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

            imgUrl: shareImgUrl, // 分享图标

            type: '', // 分享类型,music、video或link，不填默认为link

            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空

            success: function () {

                // 用户确认分享后执行的回调函数

            },

            cancel: function () {

                // 用户取消分享后执行的回调函数

            }
        });
        wx.onMenuShareQZone({

            title: '分享到QQ空间', // 分享标题

            desc: shareTitle, // 分享描述

            link: shareLink, // 分享链接

            imgUrl: shareImgUrl, // 分享图标

            success: function () {
                // 用户确认分享后执行的回调函数

            },

            cancel: function () {

                // 用户取消分享后执行的回调函数

            }
        });
    });

}


