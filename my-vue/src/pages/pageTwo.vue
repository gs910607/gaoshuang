<template>
	<div>
		<button class="btn btn-primary" @click="showDialog">弹窗</button>
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
	</div>
</template>

<script>
	import myDialog  from '../components/myDialog'
	export default {
		name: 'pageTwo',
		components: {
			myDialog
		},
		data(){
			return {
				title: '我是标题',
				modalShow: false,
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
			}
		}
	}
</script>

