<template>
	<el-row class="tac">
		<el-col :span="3" :style="tabStyle">
			<el-menu
			:style="tabStyle"
			:default-active="activeIndex"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose">
				<el-menu-item index="2-1" @click="linkTo('2-1')">
					<i class="el-icon-menu"></i>
					<span slot="title">选项1</span>
				</el-menu-item>
				<el-menu-item index="2-2" @click="linkTo('2-2')">
					<i class="el-icon-menu"></i>
					<span slot="title">选项2</span>
				</el-menu-item>
				<el-menu-item index="2-3" @click="linkTo('2-3')">
					<i class="el-icon-document"></i>
					<span slot="title">选项3</span>
				</el-menu-item>
				<el-menu-item index="2-4" disabled>
					<i class="el-icon-setting"></i>
					<span slot="title">选项4</span>
				</el-menu-item> 
			</el-menu>
		</el-col>
		<el-col :span="9" style="padding:10px 20px 20px;">
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
			}
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		getParams(){
			this.activeIndex = this.$route.params.id;
		},
		linkTo(id){
			var _this = this;
			_this.activeIndex = id;
			switch(id){
	        	case '2-1':
	        		_this.$router.push({
	        			name: 'pageOne',
	        			params: {
	        				id: '2-1'
	        			}
	        		});
	        		break;
	        	case '2-2':
	        		_this.$router.push({
	        			name: 'pageTwo',
	        			params: {
	        				id: '2-2'
	        			}
	        		});
	        		break;
	        	case '2-3':
	        		_this.$router.push({
	        			name: 'pageThree',
	        			params: {
	        				id: '2-3'
	        			}
	        		});
	        		break;
	        }
		}
	},
	mounted(){
		this.getParams();
	},
	created() {
		
	},
	watch: {
		$route() {
			this.getParams();
		}
	}
}
</script>

<style scoped>
	
</style>