<template>
	<div>
		<div class="block">
			<el-carousel trigger="click" height="500px">
				<el-carousel-item v-for="item in items" :key="item.index" :style="item.cauouseStyle">
					<h3>{{ item.index }}</h3>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		data(){
			return {
				items: [
					{
						index: 1,
						cauouseStyle: {
							background: 'url('+ require("../assets/images/bg-1.jpg") +') no-repeat center center / 100% 100%'
						}
					},
					{
						index: 2,
						cauouseStyle: {
							background: 'url('+ require("../assets/images/bg-2.jpg") +') no-repeat center center / 100% 100%'
						}
					},
					{
						index: 3,
						cauouseStyle: {
							background: 'url('+ require("../assets/images/bg-3.jpg") +') no-repeat center center / 100% 100%'
						}
					},
					{
						index: 4,
						cauouseStyle: {
							background: 'url('+ require("../assets/images/bg-4.jpg") +') no-repeat center center / 100% 100%'
						}
					},
				]
			}
		}
	}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 500px;
    margin: 0;
    text-align: center;
  }
</style>