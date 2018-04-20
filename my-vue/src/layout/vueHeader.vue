<template>
	<div>
		<el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
			<template v-for="(item,index) in navTop">
				<template v-if="!item.children">
					<el-menu-item :index="item.path">
						{{item.name}}
					</el-menu-item>
				</template>
				<template v-else>
					<el-submenu :index="item.path">
						<template slot="title">{{item.name}}</template>
						<template v-for="(n, i) in item.children">
							<el-menu-item v-if="!n.children" :index="n.path">{{n.name}}</el-menu-item>
							<el-submenu v-else :index="n.path">
								<template slot="title">{{n.name}}</template>
								<el-menu-item v-for="(a,ind) in n.children" :disabled="!a.path" :index="a.path">
									{{a.name}}
								</el-menu-item>
							</el-submenu>
						</template>
					</el-submenu>
				</template>
			</template>
		</el-menu>
		<div class="line"></div>
	</div>
</template>

<script>
export default {
	name: "vueHeader",
	data() {
		return {
			activeIndex: '/',
	        navTop: [
		        {
		        	name: '首页',
		        	path: '/'
		        },
		        {
		        	name: '我的工作台',
		        	path: '/tab/pageOne',
		        	children: [
		        		{
		        			name: '选项一',
		        			path: '/tab/pageOne'
		        		},
		        		{
		        			name: '选项二',
		        			path: '/tab/pageTwo'
		        		},
		        		{
		        			name: '选项333',
		        			path: '/tab/pageThree',
		        			children: [
		        				{
		        					name: '选项333',
		        					path: '/tab/pageThree'
		        				},
		        				{
		        					name: '选项444',
		        					path: '/tab/pageFour'
		        				},
		        				{
		        					name: '选项3-3',
		        					path: ''
		        				}
		        			]
		        		}
		        	]
		        },
		        {
		        	name: '消息中心',
		        	path: '/newsCenter'
		        },
		        {
		        	name: '手风琴',
		        	path: '/HelloWorld'
		        }
	        ]
	    };
	},
	methods: {
		handleSelect(key, keyPath) {
	       
	    }
	},
	beforeUpdate(newData, oldData) {
		this.activeIndex = this.$route.path
	},
}
</script>

<style>

</style>