<template>
	<div class="myDialog" v-if="dialogShow">
		<div class="dialogContWrap">
			<div class="dialogHeader">{{title}}</div>
			<div class="dialogContent">
				<slot></slot>
			</div>
			<div class="dialogFooter">
				<a href="javascript:;" class="btn btn-default" @click="closeDialog">取消</a>
				<a href="javascript:;" class="btn btn-default" @click="sure">确定</a>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'myDialog',
		props: {
			dialogShow: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '标题'
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			sure() {
				this.$emit("onSure",'sure')
			},
			closeDialog() {
				this.$emit("onClose", 'close')
			},
		},
		watch: {
			dialogShow() {
				if(this.dialogShow) {
					document.getElementsByTagName("body")[0].style.overflow = 'hidden'
				} else {
					document.getElementsByTagName("body")[0].style.overflow = 'auto'
				}
			}
		}
	}
</script>

<style type="text/css" scoped>
	.myDialog {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,0.3);
		overflow-x: hidden;
		overflow-y: auto;
	}
	.dialogContWrap {
		width: 500px;
		margin: 100px auto;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 5px #ccc;
		text-align: center;
	}
	.overHidden {
		overflow: hidden;
	}
	.overAuto {
		overflow: auto;
	}
</style>

