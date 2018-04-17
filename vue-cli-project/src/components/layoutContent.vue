<template>
	<section class="content" v-bind:style="{'margin-top': marginTop}">
		<slot></slot>
	</section>
</template>

<script>
	export default {
		name: 'layoutContent',
		data() {
			return {
				marginTop: '50px',
			}
		},
		methods: {
			pathChange() {
				switch(this.$route.path) {
					case '/list':
						this.marginTop = 0;
						break;
					default: 
						this.marginTop = '50px';
				}
			}
		},
		created() {
			this.pathChange();
		},
		watch: {
			$route() {
				this.pathChange();
			}
		}
	}
</script>

<style scoped>
	.content {
		background: #ccc;
		padding: 10px;
		width: 1200px;
		margin-left: auto;
		margin-right: auto;
	}
</style>