<template>
	<div class="hello">
		整个世界清静了
		<p><router-link :to="{path:'/'}" tag="a">回首页</router-link></p>
		<helloWorld :name="name"></helloWorld>
		<a href="javascript:;" @click="showDialog">弹框</a>
		<myDialog :dialogShow="dialogShow" @onClose="closeDialog" @onSure="sureDialog"></myDialog>
	</div>
</template>

<script>
	import helloWorld from '../components/helloWorld'
	import myDialog from '../components/myDialog'
	export default {
		name: 'hello',
		components: {
			helloWorld,
			myDialog
		},
		data() {
			return {
				name: 'gaoshuang',
				dialogShow: false
			}
		},
		methods: {
			showDialog() {
				this.dialogShow = true;
			},
			closeDialog(data) {
				console.log(data)
				this.dialogShow = false;
			},
			sureDialog(data) {
				console.log(data)
				this.dialogShow = false;
			}
		}
	}
</script>

<style scoped>
	p {
		text-align: center;
	}
	.hello .myDialog >>> .dialogContWrap {
		color: yellow;
	}
</style>

