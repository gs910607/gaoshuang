<template>
	<div>
		<router-link :to="{path:'first'}" tab="a">第一页</router-link>
		<router-link :to="{path:'second'}" tab="a">第二页</router-link>
		<router-link :to="{path:'three'}" tab="a">第三页</router-link>
		<div>
			<transition enter-active-class="animated bounceInRight">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'tab',
		data() {
			return {

			}
		},
		methods: {

		},
		created() {
			document.title="tab";
			
		}
	}
</script>