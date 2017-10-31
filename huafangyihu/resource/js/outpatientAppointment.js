// JavaScript Document
//点击评价
// $(".evaluate-ul").html(mailList)
	
	function judgeGrade(){
			    	if(score == 1) {
				mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	        mailList+='<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
	    	        mailList+='<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
	    	        mailList+='<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
	    	        mailList+='<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
			} else if(score == 2) {
				mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	    mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	        mailList+='<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
	    	        mailList+='<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
	    	        mailList+='<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
			} else if(score == 3) {
				mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	    mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	    mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	        mailList+='<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
	    	        mailList+='<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
			} else if(score == 4) {
				mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	    mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	    mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	    mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	        mailList+='<img class="evaluateNumber-img" src="../../images/star2.png" alt="" />'
			} else if(score == 5) {
				mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	    mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	    mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	    mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
	    	    mailList+='<img class="evaluateNumber-img" src="../../images/star.png" alt="" />'
			} else {
				alert("评分范围1~5")
			}
	}