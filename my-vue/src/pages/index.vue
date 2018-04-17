<template>
	<div>
		<div class="block">
			<el-carousel trigger="click" height="500px">
				<el-carousel-item v-for="item in items" :key="item.index" :style="{background: item.background}">
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
						background: 'red'
					},
					{
						index: 2,
						background: 'yellow'
					},
					{
						index: 3,
						background: 'blue'
					},
					{
						index: 4,
						background: 'green'
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