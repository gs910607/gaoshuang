<template>
	<header v-if="showHeader">
		<div class="logo">
			<router-link :to="{path:'/'}" ag="a"><img src="../assets/logo.png"></router-link>
		</div>
		<div class="title">{{curPage}}</div>
		<div class="login">
			<a href="javascript:;">登录</a>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'layoutHeader',
		data() {
			return {
				curPage: '',
				showHeader: true
			}
		},
		methods: {
			routeChange() {
				switch(this.$route.path) {
					case '/':
						this.curPage = 'index';
						break;
					case '/list':
						this.curPage = 'list';
						this.showHeader = false;
						break;
					case '/hello':
						this.curPage = 'hello';
						break;
					case '/tab/first':
						this.curPage = 'first';
						break;
					case '/tab/second':
						this.curPage = 'second';
						break;
					case '/tab/three':
						this.curPage = 'three';
						break;
					default:
						this.curPage = ''
						this.showHeader = true;
				};

				switch(this.$route.path) {
					case '/list':
						this.showHeader = false;
						break;
					default:
						this.showHeader = true;
				}
			}
		},
		created() {
			this.routeChange()
		},
		watch: {
			$route() {
				this.routeChange();
			}
		}
	}
</script>

<style scoped>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 50px;
		background: #ff6600;
		padding: 0 10px;
	}
	header .logo {
		float: left;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
	}
	header .logo a {
		display: inline-block;
		height: 100%;
	}
	header .logo img {
		vertical-align: middle;
		height: 100%;
	}
	header .login {
		float: right;
		height: 100%;
		line-height: 50px;
	}
	header .title {
		float: left;
		line-height: 50px;
	}
</style>