// var app = angular.module('UrlConfig', []);
var UrlHead = "http://10.20.12.97:8080/kwms/api/info/invoking.do";
app.run(function($rootScope) {})
app.factory('service', function($http, $rootScope, $q, $state) {
    var s = function() {
        return {
            // contentType: "text/plain",
            dataType: "json",
            type: "post",
            async: true,
            url: false,
            data: false,
            loadEle: false
        }
    }
    var DataHandle = function(data, fun) {
        if (data.result == 0) {
            fun(data.data);
            // if ($.isArray(data.RtnMsg)) {
            //     angular.forEach(data.RtnMsg, function(obj, i) {
            //         ret.msg.alert(obj.RtnMsg.replace(/\n/g, '<br>'));
            //     })
            // } else {
            //     ret.msg.alert(data.RtnMsg.replace(/\n/g, '<br>'));
            // }
        } else if (data.result == 999) {
            ret.msg.alert("未登录或登录超时，请重新登录！");
            $state.go("Login");
        } else {
        }
    }
    var ret = {
        http: {
            asyncajax: function(set) {
                set = $.extend(s(), set);
                $(".loading").css("display", "block");
                $.ajax({
                    async: false,
                    dataType: set.dataType,
                    type: set.type,
                    url: UrlHead,
                    data:JSON.stringify({
                        interfaceName:set.model,
                        methodName:set.fun,
                        data:set.data
                    })
                }).done(function(data) {
                    DataHandle(data, set.success);
                    $(".loading").css("display", "none");
                })
            },
            ajax: function(set) {
                set = $.extend(s(), set);
                $(".loading").css("display", "block");
                return $http({
                    method: set.type,
                    url: UrlHead,
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    data:{
                        interfaceName:set.model,
                        methodName:set.fun,
                        data:set.data
                    }
                }).success(function(data) {
                    $(".loading").css("display", "none");
                    DataHandle(data, set.success);
                }).error(function(data) {
                    $(".loading").css("display", "none");
                })
            },
        },
        Cookie: {
            Get: function(key) {
                return sessionStorage.getItem(key);
            },
            Set: function(key, value) {
                sessionStorage.setItem(key, value);
            }
        },
        msg: {
            alert: function(msg) {
                alertify.alert(msg);
            },
            popover: function(msg) {
                $(".pop").show().text(msg);
                $(".pop").animate({
                    top: 5
                }, 'slow');
                setTimeout(function() {
                    $(".pop").animate({
                        top: -50
                    }, 'slow');
                }, 2000);
            },
            confirm: function(msg, OK_fun, Cancel_fun) {
                return alertify.confirm(msg, OK_fun, Cancel_fun);
            }
        },
        FileUpload: {
            BuildUploadObj: function() {
                return new OssUpload({
                    bucket: 'doc-gtintel',
                    endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',
                    chunkSize: 1048576,
                    concurrency: 2,
                    aliyunCredential: {
                        "accessKeyId": "gin6ZIIh3NaJcvFf",
                        "secretAccessKey": "BKY98SroF6UrPM8fnD3VOk4vNpCF8m"
                    }
                    // stsToken: stsToken
                });
            },
            BuildUploadSetting: function(file, folder, done, error) {
                return {
                    file: file,
                    key: folder + file.name.substr(file.name.lastIndexOf('.')),
                    maxRetry: 3,
                    headers: {
                        'CacheControl': 'public',
                        'Expires': '',
                        'ContentEncoding': '',
                        'ContentDisposition': '',
                        'ServerSideEncryption': ''
                    },
                    onerror: error,
                    oncomplete: done
                };
            },
            BuildGUID: function() {
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";

                var uuid = s.join("");
                return uuid;
            }
        },
        PageSize: 10,
        GuidNull: "00000000-0000-0000-0000-000000000000",
        deferred: $q.defer()
    };
    return ret;
});
