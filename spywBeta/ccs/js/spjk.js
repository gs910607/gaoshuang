
var InitHandler;

var ocxControl = function () {
        return document.getElementById("videoControl");
    };
  var InintNVs = function (ocxControl) {
        if (ocxControl == null) {
            //alert('请下载视频播放控件！');
            return false;
        }
        //初始化dll,返回0表示成功。
        InitHandler = ocxControl.EV9000APPInit();//NVSInit();
        if (InitHandler != 0) {
            alert('控件初始化失败!');
            return false;
        }
        return InitHandler;
    };
var SetWindowCount = function (count) {
        //取总窗口数
        var wndcount = ocxControl().EV9000APPGetWndCount();//NVSGetWndCount();
        //设置窗口
        var wnd = ocxControl().EV9000APPSetWndCount(count);//NVSSetWndCount(Count);
        //关闭多余的视频
        while (wndcount > count) {
            ocxControl().EV9000APPClosePlay(count);
            count++;
        }

        //清数据
        // for (var i = wndcount; i < RCList.length; i++) {
        //     RCList[i] = "";
        // }

        //取得当前活动窗口
        WinIndex = ocxControl().EV9000APPGetCurWnd();//NVSGetCurWnd();
        if (WinIndex < 0) {
            alert('取得当前活动窗口失败!');
            return;
        }
    };
    	var LoginHandler = null;
    // var startPlayVideo = function(){
    	  
    // }

     var LoginDevice = function (ocxControl) {
        //登录摄像头设备
        //var userID = $("#content_hidUserID").val();
        //var passWord = $("#content_hidPsw").val();
        //var customIP = $("#content_hidCustomIP").val();
        //var serverIP = $("#content_hidServerIP").val();
        //var serverPort = $("#content_hidServerPort").val();
        var userID = "WiscomV";
        var passWord = "WiscomV";
        var customIP = "172.17.112.17";
        var serverIP = "172.17.113.76";
        var serverPort = "5060";
        //验证基本数据
        //if (!checkParams(userID, '登录用户信息错误！')) return;
        //if (!checkParams(passWord, '登录用户信息错误！')) return;
        //if (!checkParams(customIP, '用户IP地址信息错误！')) return;
        //if (!checkParams(serverIP, '服务器信息错误！')) return;
        //if (!checkParams(serverPort, '服务器端口信息错误！')) return;

        //验证客户端IP地址
        //if (!Common.CheckIP(customIP)) {
        //    alert("客户端IP地址信息不正确，错误的IP为：" + customIP);
        //    return;
        //}

        //设备编号不为空则开始登录视频设备
        LoginNVs(serverIP, serverPort, userID, passWord, customIP, ocxControl);
        if (LoginHandler != null) {
            return true;
        }
        return false;
    };
    //登录视频服务器
    //param1:视频服务器IP地址
    //param2:视频服务器端口号
    //param3:用户名
    //param4:密码
    //param5:当前计算机的IP地址（注意计算机必须与视频服务器在一个网段，否则无法查看视频）
    //param6:视频控件对象
    var LoginNVs = function (serverIP, serverPort, userID, passWord, CurrentIP, ocxControl) {
        LoginHandler = ocxControl.EV9000APPLogin(serverIP, serverPort, CurrentIP, userID, passWord, "", "", 0);
        //if (console) {
        //    console.debug("登录视频服务器结果：" + videoControl.LoginHandler);
        //}
        if (LoginHandler < 0) {
            var va = ocxControl.EV9000AppGetErrorMsg(LoginHandler);
            alert(va);
            return;
        }
        // ArrayVideo.push(serverIP + "|" + serverPort + "|" + userID + "|" + passWord);

        //取得当前活动窗口
        WinIndex = ocxControl.EV9000APPGetCurWnd();//NVSGetCurWnd();
        if (WinIndex < 0) {
            alert('取得当前活动窗口失败!');
            return;
        }
    };
    //开始播放视频
    //param1:监控点的编号
    //param2:监控点描述信息
    //param3:视频播放控件对象
    var StartRealPlay = function () {
    	 if (LoginHandler == null || LoginHandler < 0) {
            if (!LoginDevice(ocxControl())) {
                alert("视频设备登录失败");
                return;
            }
        }
        //取得当前活动窗口
        WinIndex = ocxControl().EV9000APPGetCurWnd();//NVSGetCurWnd();
        if (WinIndex < 0) {
            alert('取得当前活动窗口失败!');
            return;
        }

        if (LoginHandler < 0) {
            alert('视频服务器登录失败!');
            return;
        }

        //param3:0-UDP,1-TCP
        enableTcp = 0;
        var soCode = "31000000001320190270"
        var p = ocxControl().EV9000APPOpenRealPlay(LoginHandler, WinIndex, enableTcp, soCode, 0);
        if (p != 0) {
            // RCList[WinIndex] = '';
            alert('视频播放失败!');
            return;
        }
        else {
            //保存播放的点位编号至数组
            // RCList[WinIndex] = Description;
        }
    };


  //控制云台
    //param1:视频播放控件
    //param2:控制类型（上，下，左，右，左上，左下，右上，右下，停止分别是0，1，2，3，4，5，6，7，-1）
    //param3:速度从0-255
    var ControlMachine = function (Type) {
        //取得当前活动窗口
        WinIndex = ocxControl().EV9000APPGetCurWnd();//NVSGetCurWnd();
        if (WinIndex < 0) {
            alert('取得当前活动窗口失败!');
            return;
        }
        var ct = ocxControl().EV9000APPPTZCtrl(WinIndex, Type, 100);

    };
    //停止控制
    //param1:视频播放控件
    //param2:控制类型（上-0，下-1，左-2，右-3，左上-4，左下-5，右上-6，右下-7，停止--1分别是0，1，2，3，4，5，6，7，-1）
    //remark:此处的控制命令应该为停止控制而不是将控制速度限制到0
    var StopControlMachine = function ( num) {
        //取得当前活动窗口
        WinIndex = ocxControl().EV9000APPGetCurWnd();//NVSGetCurWnd();
        if (WinIndex < 0) {
            alert('取得当前活动窗口失败!');
            return;
        }
        var ct = ocxControl().EV9000APPPTZCtrl(WinIndex, num, 0);//NVSPTZCtrl(WinIndex,lType,0);
    };

$(function(){
InintNVs(ocxControl());

$("li").on("click",function(){
	StartRealPlay()
})
})