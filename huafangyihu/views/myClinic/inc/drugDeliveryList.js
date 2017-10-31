// $(function(){

	var cityCode;
	var token;
	var id1;
	var id2;
    var hospitalId;
    hospitalId = GetQueryStr("hospitalId");
    console.log(hospitalId)
	getItems();
	
	
    init3(7,0)
	// 底部切换
	$(document).on("click", ".online-footer:not(':last')", function() {
		$(this).addClass("footer-hover").siblings().removeClass("footer-hover");
		$("#fr_list").html($("#fr_list li:first"));
		$(".fr_rightPos").html("");
		id1 = $(this).data("id");
		init3(id1, 0)
		$(".articleList-li:first").addClass("picactive").siblings().removeClass("picactive");
	})

	$(document).on("click", ".articleList-li:first", function(){
		$(".titleContent-all").html("");
		init2(id1, id2);
	})

	// 侧边切换
	$(document).on("click", ".articleList-li", function(){
		$(this).addClass("picactive").siblings().removeClass("picactive");

	});

	$(document).on("click", ".articleList-li:not(':first')", function() {
		var id1 = $(this).data("id1");
		var id2 = $(this).data("id2");
		$(".titleContent-all").html("");
		init2(id1, id2);
	});

	$(document).on("click", ".articleList-li:first", function() {
		$(".titleContent-all").html("");
		init2(id1, 0);
	})

// 左侧初始化渲染
	function init3(id1,id2) {
		var params = {
			cityCode: cityCode,
			id: id1,
			token: token
		};

		$("#"+id1).addClass("footer-hover")

        this.id1=id1;

		$.ajax({
			type: 'GET',
			url: config.appserver_url + '/serviceItem/queryServiceCategoryType.json',
			data: params,
			dataType: 'json',
			success: function(response) {
				tokenLose(response.status);
				// 二级菜单（左面）
				var arr = response.data;
				console.log(arr)
				$("#articleListAll").html($("#articleListAll li:first"));
				var fr_list = $("#articleListAll").html();
				for(var i=0; i<arr.length; i++) {
					var obj = arr[i];
                     if(obj.id==id2){
						 fr_list += '<li class="articleList-li picactive" data-id1="'+ params.id +'" data-id2="'+ obj.id +'">';
					 } else {
						 fr_list += '<li class="articleList-li" data-id1="'+ params.id +'" data-id2="'+ obj.id +'">';
					 }
					 fr_list += '<div class="articleList-li-div">'+ obj.name +'</div>';
					 fr_list += '</li>';
				}
				$("#articleListAll").html(fr_list);

				init2(id1, id2);

			},
			error: function() {
				alert("服务繁忙，请稍后再试！");
			}
		});
	};

	// 右侧初始化渲染
	function init2(id1, id2) {
		var params2 = {
			cityCode: cityCode,
			hospitalId:hospitalId,
			id1: id1,
			id2: id2,
			token: token
		};
		$.ajax({
			type: 'GET',
			url: config.appserver_url + '/serviceItem/queryServiceItem.json',
			data: params2,
			dataType: 'json',
			success: function(response) {
				tokenLose(response.status);
				var arr2 = response.data;
				console.log(arr2)
				var list2 = '';
				for(var i=0; i<arr2.length; i++) {
					var obj2 = arr2[i];
					var arr3 = obj2.body;
					for(var j=0; j<arr3.length; j++) {
						var oBody = arr3[j];
						list2 += '<li class="drug-details" data-serviceid="'+ oBody.serviceId +'" >';
						list2 += '<div class="drug-details-img">';
						list2 += '<img src="'+ oBody.picUrl +'" alt="" />';
						list2 += '</div>';
						list2 += '<div class="drug-details-text">';
						list2 += '<p class="drug-name">'+ oBody.serviceName +'</p>';
						list2 += '<p class="drug-specification">暂无描述</p>';
						list2 += '<div class="drug-price">';
						list2 += '<p class="new-price">￥<span>'+ oBody.price +'</span></p>';
						list2 += '</div>';
						list2 += '</div>';
						list2 += '</li>';
					}
				}
				$(".titleContent-all").html(list2);
				
			}
		})
	}
	
	// 获取本地数据
	function getItems() {
		token = JSON.parse(localStorage.getItem("user")).token;
		cityCode = JSON.parse(sessionStorage.getItem("localCityInfo")).localCityCode;

	}
	// $(document).on("click", ".drug-details", function() {
	// 	sessionStorage.setItem("serviceItemId", $(this).data("serviceid"));
	// })
// });
	
	$(document).on("click", ".drug-details", function() {
          location.href ="drugIntroduction.html"
	})


//$("#goBack").on("click",function(){
//	$("header>a").attr("href","javascript:;");
//	var params = "default=default&hospitalId="+hospitalId
//	location.href="clinicIndex.html?"+params;
//});