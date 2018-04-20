<template>
	<el-row class="tac">
		<el-col :span="4" :style="tabStyle">
			<el-menu
			:style="tabStyle"
			:default-active="$route.path"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose"
			router>
				<el-menu-item v-for="item in navList" :index="item.path">
					<i class="el-icon-menu"></i>
					<span slot="title">{{item.name}}</span>
				</el-menu-item>
			</el-menu>
		</el-col>
		<el-col :span="20" style="padding:10px 20px 20px;">
			<router-view/>
		</el-col>
	</el-row>
</template>

<script>
export default {
	name: 'tab',
	data(){
		return {
			activeIndex: null,
			tabStyle: {
				height: window.innerHeight - 61 - 50 + 'px'
			},
			navList: [
				{
					name: '选项1111',
					path: '/tab/pageOne',
				},
				{
					name: '选项222',
					path: '/tab/pageTwo',
				},
				{
					name: '选项322',
					path: '/tab/pageThree',
				},
				{
					name: '选项444',
					path: '/tab/pageFour'
				}
			]
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
	},
	mounted(){
		
	},
	created() {
		
	},
	watch: {
		$route() {
			
		}
	}
}
</script>

<style scoped>
	.el-menu-item {

	}
</style>