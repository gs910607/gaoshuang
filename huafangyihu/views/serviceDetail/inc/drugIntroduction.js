/**
 * Created by XuanMing on 2017/6/8.
 */
init();
function init() {
    var serviceItemId = GetQueryStr("serviceid");
    var token = "1";
    var params = {
        serviceItemId: serviceItemId,
        token: token
    }
    $.ajax({
        type: 'GET',
        url: config.appserver_url + '/doctorNurse/queryServiceItemInfo.json',
        data: params,
        dataType: 'json',
        success: function(response) {
            console.log(response.data)
            tokenLose(response.status)
            var obj = response.data.serviceItem;
            var obj2 = response.data.hospitalServiceItem;
            $(".clinic-title-h6").text(obj.itemName);
            $(".drug-original-price").text('￥'+obj2.oldRete);
            $(".drug-new-price").text('￥'+obj2.rate);
            $(".drug-prompt-information").text(obj.desp);
            $(".banner").css("background", "url('"+ obj.picUrl +"') no-repeat center center");
            $(".banner").css("background-size", "100% 100%");
        },
        error: function() {
            alert("服务繁忙，请稍后再试！")
        }
    })
}

//解析url参数数据

function GetQueryStr(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    //获取url中"?"符后的字符串并正则匹配
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}