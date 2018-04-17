<template>
	<div>
		<div>
			<label for="name">姓名</label>
			<input type="text" name="name" id="name" v-model="name" placeholder="请输入姓名">
		</div>
		<div>
			<label for="yuwen">语文成绩</label>
			<input type="text" name="yuwen" id="yuwen" v-model="yuwen" placeholder="请输入语文成绩">
		</div>
		<div>
			<label for="shuxue">数学成绩</label>
			<input type="text" name="shuxue" id="shuxue" v-model="shuxue" placeholder="请输入数学成绩">
		</div>
		<div>
			<label for="yingyu">英语成绩</label>
			<input type="text" name="yingyu" id="yingyu" v-model="yingyu" placeholder="请输入英语成绩">
		</div>
		<div>
			<button @click="submitForm">提交</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'add',
		data() {
			return {
				name: '',
				yuwen: '',
				shuxue: '',
				yingyu: '',
				dataList: [
					{
						name: '小王',
						yuwen: '100',
						shuxue: '90',
						yingyu: '80',
						id: '001'
					},
					{
						name: '大王',
						yuwen: '101',
						shuxue: '91',
						yingyu: '81',
						id: '002'
					},
					{
						name: '老王',
						yuwen: '102',
						shuxue: '92',
						yingyu: '82',
						id: '003'
					},
					{
						name: '王炸',
						yuwen: '103',
						shuxue: '93',
						yingyu: '83',
						id: '004'
					},
					{
						name: '小虎',
						yuwen: '103',
						shuxue: '93',
						yingyu: '83',
						id: '005'
					},
					{
						name: '老大',
						yuwen: '103',
						shuxue: '93',
						yingyu: '83',
						id: '006'
					},
					{
						name: '大哥',
						yuwen: '103',
						shuxue: '93',
						yingyu: '83',
						id: '007'
					}

				]
			}
		},
		mounted() {
			var id = this.$route.query.id;
			if(id) {
				var data;
				this.dataList.map(function(o,i,arr) {
					if(o.id == id) {
						data = o;
					}
					console.log(o)
				})
				console.log(data)
				this.name = data.name;
				this.yuwen = data.yuwen;
				this.shuxue = data.shuxue;
				this.yingyu = data.yingyu;
			}
		},
		methods: {
			submitForm() {
				var _this = this;
				var params = {
					name: _this.name,
					yuwen: _this.yuwen,
					shuxue: _this.shuxue,
					yingyu: _this.yingyu
				};
				console.log(params)
				_this.$router.push({path:"/list"})
			}
		},
		
	}
</script>