<template>
	<div>
		<myDialog 
		:modalShow="modalShow" 
		:title="title" 
		:width="'500px'" 
		:height="'300px'" 
		@clickSure="clickSure"
		@clickCancel="clickCancel">
			<div>
				我通过slot插槽插入内容
			</div>
		</myDialog>
		
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide">
		        	1111
		        	<button class="btn btn-primary" @click="showDialog">弹窗</button>
		        </div>	
		        <div class="swiper-slide">
		        	<div>
		        		<button id="btn1" class="btn btn-default">jquery改变input值</button>
						<input type="text" id="curDate" name="name" v-model="curDate">
						<button id="btn2" class="btn btn-default" @click="changeVal">vue改变input值</button>
		        	</div>
		        </div>
		        <div class="swiper-slide">Slide 3</div>
		    </div>
		    <!-- 如果需要分页器 -->
		    <div class="swiper-pagination"></div>
		    
		    <!-- 如果需要导航按钮 -->
		    <div class="swiper-button-prev"></div>
		    <div class="swiper-button-next"></div>
		    
		    <!-- 如果需要滚动条 -->
		    <!-- <div class="swiper-scrollbar"></div> -->
		</div>
	</div>
</template>

<script>
	import myDialog  from '../components/myDialog'
	// import Swiper from 'swiper';
	// import 'swiper/dist/css/swiper.min.css';
	import Swiper from 'swiper';
	export default {
		name: 'pageTwo',
		components: {
			myDialog
		},
		data(){
			return {
				title: '我是标题',
				modalShow: false,
				curDate: new Date().format("yyyy-MM-dd hh-mm-ss")
			}
		},
		methods: {
			clickSure(data){
				this.$message({
					type: 'success',
					message: '你选择了确认',
					center: true,
				})
				this.modalShow = false;
			},
			clickCancel(data){
				this.$message({
					type: 'error',
					message: '你选择了取消',
					center: true,
				})
				this.modalShow = false;
			},
			showDialog(){
				this.modalShow = true;
			},
			changeVal() {
				this.curDate = "我通过vue改变内容"
			},
			_initSwiper() {
			    var mySwiper = new Swiper ('.swiper-container', {
				    loop: true,
				    
				    // 如果需要分页器
				    pagination: {
				      el: '.swiper-pagination',
				    },
				    
				    // 如果需要前进后退按钮
				    navigation: {
				      nextEl: '.swiper-button-next',
				      prevEl: '.swiper-button-prev',
				    },

				})
			}
		},
		mounted() {
			this.$nextTick(function(){
				var _this = this;
				$("#btn1").on("click", function(){
					_this.curDate = "我通过jquery改变内容"
					// $("#curDate").val("我通过jquery改变内容")
				})

				_this._initSwiper();
			})
		}
	}
</script>

<style scoped>
.swiper-container {
    width: 100%;
    height: 300px;
    text-align: center;
}  

</style>