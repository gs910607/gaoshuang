var problempaperId=GetQueryString("problempaperId");
 $.ajax({
 	type: 'post',
 	url: '/xlhaBeta/opinionSurvey/problemPaperRecord.do',
 	data: {"problempaperId":problempaperId},
 	dataType: 'json',
 	success: function(response) {
		 ajaxLoading.hide();
		if(response.status == 0) {
			var data = response.data;
			// var area = data.area;
			var examination = data.examination;

			$(".articleTitle").text(data.title);

			var str = '';
//			 var allAreaPoll = 0
//			 area.map(function(obj,ind) {
//			 	allAreaPoll += obj.poll;
//			 });
//
//			 for(var i=0;i<area.length;i++) {
//			 	str += '<tr>';
//			 	(i<1)?
//			 	str += '	<td rowspan="'+ area.length +'" style="vertical-align:middle;">居住区域</td>'
//			 	: '';
//			 	str += '	<td width="450" class="text-left"><p style="width:450px">'+ area[i].name +'</p></td>';
//			 	str += '	<td style="vertical-align:middle;">';
//			 	str += '		<div class="progress">';
//			 	str += '			<div class="progress-bar" style="width:'+ ((area[i].poll/allAreaPoll*100).toFixed(2)) +'%;">';
//			 	str += '			</div>';
//			 	str += '		</div>';
//			 	str += '	</td>';
//			 	str += '	<td>'+ ((area[i].poll/allAreaPoll*100).toFixed(2)) +'%</td>';
//			 	str += '	<td>'+ area[i].poll +'</td>';
//			 	str += '</tr>';
//			 }

			for(var i=0;i<examination.length;i++) {
				var objExam = examination[i]
				var allAnsPoll = 0;
				for(var j=0;j<objExam.answer.length;j++) {
					allAnsPoll += Number(objExam.answer[j].poll); 
				};
				for(var j=0;j<objExam.answer.length;j++) {
					var objAns = objExam.answer[j]
					str += '<tr>';
					if(j<1) {
						str += '	<td rowspan="'+ objExam.answer.length +'" style="vertical-align:middle;">'+ objExam.question +'</td>'
					}
					str += '	<td width="450" class="text-left"><p style="width:450px">'+ objAns.item +'</p></td>';
					str += '	<td style="vertical-align:middle;">';
					str += '		<div class="progress">';
					str += '			<div class="progress-bar" style="width:'+ ((objAns.poll/allAnsPoll*100).toFixed(2)) +'%;">';
					str += '			</div>';
					str += '		</div>';
					str += '	</td>';
					str += '	<td>'+ ((objAns.poll/allAnsPoll*100).toFixed(2)) +'%</td>';
					str += '	<td>'+ objAns.poll +'</td>';
					str += '</tr>';
				}
			}
			$("#statisticsCont").html(str)
		}
 	},
 	error: function() {
 		ajaxLoading.hide();
 		alert("服务繁忙，请稍后再试")
 	},
 	beforeSend: function() {
 		ajaxLoading.show();
 	},
 	completed: function() {
 		ajaxLoading.hide();
 	}
 })