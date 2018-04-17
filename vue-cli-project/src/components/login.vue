<template>
	<div class="login">
		<p>
			<label for="account">账号:</label>
			<input type="text" name="account" id="account" v-model="account">
		</p>
		<p>
			<label for="password">密码:</label>
			<input type="password" name="password" id="password" v-model="password">
		</p>
		<p>
			<button @click="login">登录</button>
		</p>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'login',
		data() {
			return {
				account: '',
				password: ''
			}
		},
		methods: {
			login() {
				
			}
		}
	}
</script>