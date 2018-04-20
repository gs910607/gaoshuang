<template>
	<el-form ref="form" :model="form" label-position="right" label-width="80px">
		<el-form-item label="日期">
			<el-input v-model="form.date"></el-input>
		</el-form-item>
		<el-form-item label="姓名">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="省份">
			<el-input v-model="form.province"></el-input>
		</el-form-item>
		<el-form-item label="市区">
			<el-input v-model="form.city"></el-input>
		</el-form-item>
		<el-form-item label="地址">
			<el-input v-model="form.address"></el-input>
		</el-form-item>
		<el-form-item label="邮编">
			<el-input v-model="form.zip"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
			<el-button @click="onClose">取消</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
export default {
	name: 'newsCenter',
	data() {
		return {
			form: {
				date: '',
				name: '',
				province: '',
				city: '',
				address: '',
				zip: null
			}
		}
	},
	methods: {
		onSubmit() {
			this.$router.push("/tab/pageOne")
		},
		onClose() {
			this.$router.go(-1)
		},
		getData() {
			var _this = this;
			var data = _this.$route.params;
			_this.form.date = data.date;
			_this.form.name = data.name;
			_this.form.province = data.province;
			_this.form.city = data.city;
			_this.form.address = data.address;
			_this.form.zip = data.zip;
		}
	},
	mounted() {
		var _this = this;
		_this.getData();

		console.log(_this.$store)


	}
}
</script>

<style>
	form {
		width: 400px;
		margin-top:50px;
	}
</style>