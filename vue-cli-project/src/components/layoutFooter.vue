<template>
	<footer v-if="showFooter">
		页脚
	</footer>
</template>

<script>
	export default {
		name: 'layoutFooter',
		data() {
			return {
				showFooter: true
			}
		},
		methods: {
			footIsShow() {
				switch(this.$route.path) {
					case '/list':
						this.showFooter = false;
						break;
					default:
						this.showFooter = true;
				}	
			}
		},
		created() {
			this.footIsShow();
		},
		watch: {
			$route() {
				this.footIsShow();
			}
		}
	}
</script>

<style scoped>
	footer {
		height: 30px;
		background: #fff117;
		text-align: center;
	}
</style>