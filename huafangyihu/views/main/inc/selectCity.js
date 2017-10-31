var patId;
var token;
var localCityCode;
var localCityName;


//解析顶部城市渲染
var newCurrentCity =unescape(GetQueryStr("currentCity"))
$(".city-title-name").text(newCurrentCity)

$(function () {
    initParams();
    init();
});

function initParams() {
    user = JSON.parse(localStorage.getItem("user"));
    token = user.token;
    patId = user.userId;
}

function init() {
    var pramas = {
        patId: patId,
        token: token
    };
    $.ajax({
        url: config.appserver_url + "/doctor/paint/cityInfo.json",
        type: 'GET',
        dataType: 'json',
        data: pramas,
        success: function (data) {
            tokenLose(data.status)
            var keys = data.data.key;
            var $citys = $("#citys");
            for (var i = 0; i < keys.length; i++) {
                var $title = $citys.find('div:first').clone();
                var key = keys[i];
                var citys = data.data.city[key];
                $title.css("display", "block");
                $title.html(key); //头
                $citys.append($title);
                for (var j = 0; j < citys.length; j++) {
                    var $city = $citys.find('p:first').clone();
                    var city = citys[j];
                    $city.css("display", "block");
                    $city.find('span:first').html(city.name); //城市名称
                    $city.find('input:first').val(city.code);//城市code
                    $citys.append($city);
                    $city.on("click", function (e) {
                        var name = $(this).find('span:first').text();
                        var code = $(this).find('input:first').val();
                        console.log(code);
                        var params = {
                            patId: patId,
                            name: name,
                            cityCode: code,
                            token: token
                        };
                        var jsonStr = JSON.stringify(params);
                        $.ajax({
                            type: 'POST',
                            url: config.appserver_url + "/doctor/paint/addlocCity.json",
                            data: jsonStr,
                            dataType: 'JSON',
                            contentType: 'application/json',
                            success: function (data) {
                                sessionStorage.setItem("localCityCode", code);
                                sessionStorage.setItem("localCityName", name);
                                window.location.href = "index.html";
                            }, error: function () {
                            }
                        });
                    })
                }
            }
            $citys.find("div:first").remove();
            $citys.find("p:first").remove();

            //热门城市渲染
            var hotCity = data.data.hotCity;
            if (!Validator.validateNull(hotCity)) {
                var $hotCitys = $("#hosCity");
                for (var i = 0; i < hotCity.length; i++) {
                    var $hotCity = $hotCitys.find("div:first").clone();
                    $hotCity.css("display", "block");
                    $hotCity.find("span:first").html(hotCity[i].name);
                    $hotCity.find("input:first").val(hotCity[i].code);
                    $hotCitys.append($hotCity);
                    $hotCity.on("click", function (e) {
                        var name = $(this).find("span:first").text();
                        var code = $(this).find("input:first").val();
                        var params = {
                            patId: patId,
                            name: name,
                            cityCode: code,
                            token: token
                        };
                        var jsonStr = JSON.stringify(params);
                        $.ajax({
                            type: 'POST',
                            url: config.appserver_url + "/doctor/paint/addlocCity.json",
                            data: jsonStr,
                            dataType: 'JSON',
                            contentType: 'application/json',
                            success: function (data) {
                                sessionStorage.setItem("localCityCode", code);
                                sessionStorage.setItem("localCityName", name);
                                window.location.href = "index.html";
                            }, error: function () {
                            }
                        });
                    });
                }
                ;
            }

            //历史城市渲染
            var hisCity = data.data.historyCity;
            if (!Validator.validateNull(hisCity)) {
                var $hisCitys = $("#history-cities");
                for (var i = 0; i < hisCity.length; i++) {
                    var $hisCity = $hisCitys.find("div:first").clone();
                    $hisCity.css("display", "block");
                    $hisCity.find("span:first").html(hisCity[i].cityName);
                    $hisCity.find("input:first").val(hisCity[i].cityCode);
                    $hisCitys.append($hisCity);
                    $hisCity.on("click", function (e) {
                        var name = $(this).find("span:first").text();
                        var code = $(this).find("input:first").val();
                        var params = {
                            patId: patId,
                            name: name,
                            cityCode: code,
                            token: token
                        }
                        var jsonStr = JSON.stringify(params);
                        $.ajax({
                            type: 'POST',
                            url: config.appserver_url + "/doctor/paint/addlocCity.json",
                            data: jsonStr,
                            dataType: 'JSON',
                            contentType: 'application/json',
                            success: function (data) {
                                sessionStorage.setItem("localCityCode", code);
                                sessionStorage.setItem("localCityName", name);
                                window.location.href = "index.html";
                            }, error: function () {
                            }
                        });
                    });
                }
                ;
            }

        },
        error: function () {
            alert("服务繁忙，请稍后再试！")
        }
    });
}