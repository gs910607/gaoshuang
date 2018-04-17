<template>
	<div>
		<transition 
		enter-active-class="animated fadeIn" 
		leave-active-class="animated fadeOut">
			<div class="modal-shadow" v-if="modalShow"></div>
		</transition>
		<transition 
		name="custom-classes-transition"
	    enter-active-class="animated bounceInDown"
	    leave-active-class="animated bounceOutUp">
	    	<div class="modal-wrapper" v-if="modalShow">
				<div class="modal" :style="{width:width}">
					<div class="modal-header"><h3>{{title}}</h3><i>x</i></div>
					<div class="modal-body">
						<slot></slot>
					</div>
					<div class="modal-footer">
						<button class="btn btn-default" @click="clickCancel">取消</button>
						<button class="btn btn-primary" @click="clickSure">确定</button>
					</div>
				</div>
	    	</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'myDialog',
	props: ['title','width','modalShow'],
	data(){
		return {

		}
	},
	methods: {
		clickSure(){
			this.$emit("clickSure",'确定')
		},
		clickCancel(){
			this.$emit("clickCancel","取消")
		}
	}
}
</script>

<style scope>

.modal-shadow {
	position: fixed;
	left: 0;
	right:0;
	top: 0;
	bottom: 0;
	z-index: 1044;
	background: rgba(0,0,0,.3);
}
.modal-wrapper {
	position: fixed;
	left: 0;
	right:0;
	top: 0;
	bottom: 0;
	z-index: 1045;
}
.modal {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	background: #fff;
	border-radius: 5px;
	z-index: 1045;
}
.modal-header {
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #ccc;
	padding: 0 10px;
	overflow: hidden;
}
.modal-header h3 {
	font-size: 18px;
	font-weight: normal;
	float: left;
}
.modal-header i {
	float: right;
	font-style: normal;
	color: #ccc;
}
.modal-body {
	padding: 10px;
	min-height: 200px;
	max-height: 450px;
	word-break: break-all;
	overflow: auto;
}
.modal-footer {
	padding: 10px;
	text-align: right;
	border-top: 1px solid #ccc;
}

</style>