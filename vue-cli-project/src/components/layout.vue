<template>
	<div>
		<layoutHeader></layoutHeader>
		<layoutContent>
			<transition enter-active-class="animated fadeIn">
				<router-view></router-view>
			</transition>
		</layoutContent>
		<layoutFooter></layoutFooter>
	</div>
</template>

<script>
import layoutHeader from './layoutHeader'
import layoutContent from './layoutContent'
import layoutFooter from './layoutFooter'
export default {
	name: 'layout',
	components: {
		layoutHeader,
		layoutContent,
		layoutFooter
	},
	data() {
		return {
			
		}
	},
	created() {

	},
	methods: {

	}
}
</script>

<style type="text/css">
	html,
	body,
	div,
	p,
	header,
	section,
	footer,
	aside,
	article,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	ul,
	ol,
	li,
	span,
	em,
	i,
	strong,
	dl,
	dt,
	dd,
	b {
		padding: 0;
		margin: 0;
	}
	.clearfix::before {
		content: '';
		display: block;
	}
	.clearfix::after {
		content: '';
		display: block;
		clear: both;
	}
	.pull-left {
		float: left;
	}
	.pull-right {
		float: right;
	}
	.animated {
		animation-duration: .3s;
	}
</style>