function selectArea(id,options) {
	var options = $.extend({
		data: '000',
		isSelect: false
	},options);
	this.id = id
	var _this = this;
	_this.clearDistrict();
	_this.clearCounty();
	_this.clearVillage();
	if(options.isSelect) {

		for(var i=0;i<areaList.length;i++) {
			var objArea = areaList[i]
			for(var j in objArea) {
				var codeArr = j.split('');
				if(codeArr.length == 3) {
					var disStr = '';
					disStr = '<option value="'+ j +'">'+ objArea[j] +'</option>';
					$("#district",this.id).append(disStr);
				}
			}
		}

		$("#district",this.id).on("change", function() {
			
			_this.clearCounty();
			_this.clearVillage();
			var curDis = $(this).val().toString();
			for(var i=0;i<areaList.length;i++) {
				var objArea = areaList[i];
				for(var j in objArea) {
					var codeArr = j.split('');
					if(codeArr.length == 6 && j.substr(0,3) == curDis) {
						var disStr = '';
						disStr = '<option value="'+ j +'">'+ objArea[j] +'</option>';
						$("#county",_this.id).append(disStr);
					}
				}
			}
		});
	} else {
		this.init(options.data);
	}
	
	var _this = this;
	// 选择县时获取村
	$("#county",this.id).on("change", function() {
		var thisVal = $(this).val();

		_this.clearVillage();

		for(var i=0;i<areaList.length;i++) {
			var data = areaList[i];
			for(var j in data) {
				if(j.substr(0,6) == thisVal && j.split('').length == 9) {
					var str = '';
					str = '<option value="'+ j +'">'+ data[j] +'</option>';
					$("#village",_this.id).append(str);
				}
			}
		}
	});
}
selectArea.prototype.init = function(data) {
	var _this = this;
	this.clearCounty();
	this.clearVillage();
	dataStr = data.toString();
	var dataLen = dataStr.split('').length;

	if(dataLen == 3) {
		for(var i=0;i<areaList.length;i++) {	
			var areaObj1 = areaList[i]

			// 区/县
			if(areaObj1[dataStr]) {
				var districtStr = '';
				districtStr = '<option value="'+ data +'">'+ areaObj1[dataStr] +'</option>';
				$("#district",_this.id).html(districtStr).attr("disabled", true);
			};

			// 乡/镇
			for(var j in areaObj1) {
				var arrJ = j.split('');
				if(arrJ.length == 6 && j.substr(0,3) == dataStr) {
					var countyStr = '';
					countyStr = '<option value="'+ j +'">'+ areaObj1[j] +'</option>';
					$("#county",_this.id).append(countyStr);
				}
			}
		}
	} else if(dataLen == 6) {
		
		for(var i=0;i<areaList.length;i++) {	
			var areaObj1 = areaList[i]

			// 区/县
			var distStr =  dataStr.substr(0,3);
			if(areaObj1[distStr]) {
				var districtStr = '';
				districtStr = '<option value="'+ distStr +'">'+ areaObj1[distStr] +'</option>';
				$("#district",_this.id).html(districtStr).attr("disabled", true);
			}

			// 乡/镇
			if(areaObj1[dataStr]) {
				var countyStr = '';
				countyStr = '<option value="'+ data +'">'+ areaObj1[dataStr] +'</option>';
				$("#county",_this.id).html(countyStr).attr("disabled", true);
			};

			// 村
			for(var j in areaObj1) {
				var arrJ = j.split('');
				if(arrJ.length == 9 && j.substr(0,6) == dataStr) {
					var villageStr = '';
					villageStr = '<option value="'+ j +'">'+ areaObj1[j] +'</option>';
					$("#village",_this.id).append(villageStr);
				}
			}		
		}
	} else if(dataLen == 9) {
		for(var i=0;i<areaList.length;i++) {	
			var areaObj1 = areaList[i]

			// 区/县
			var distStr =  dataStr.substr(0,3);
			if(areaObj1[distStr]) {
				var districtStr = '';
				districtStr = '<option value="'+ distStr +'">'+ areaObj1[distStr] +'</option>';
				$("#district",_this.id).html(districtStr).attr("disabled", true);
			}

			// 乡/镇
			var couStr =  dataStr.substr(0,6);
			if(areaObj1[couStr]) {
				var countyStr = '';
				countyStr = '<option value="'+ couStr +'">'+ areaObj1[couStr] +'</option>';
				$("#county",_this.id).html(countyStr).attr("disabled", true);
			}

			// 村
			if(areaObj1[dataStr]) {
				var villageStr = '';
				villageStr = '<option value="'+ data +'">'+ areaObj1[dataStr] +'</option>';
				$("#village",_this.id).html(villageStr).attr("disabled", true);
			};
		}
	}
}

selectArea.prototype.clearCounty = function() {
	var _this = this;
	$("#county", _this.id).html('<option value="">请选择</option>');
	$("#village",_this.id).html('<option value="">请选择</option>');
}

selectArea.prototype.clearVillage = function() {
	var _this = this;
	$("#village",_this.id).html('<option value="">请选择</option>');
}

selectArea.prototype.clearDistrict = function() {
	var _this = this;
	$("#district",_this.id).html('<option value="">请选择</option>');
}

