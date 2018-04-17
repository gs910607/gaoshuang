<template>
	<div class="list">
		<div>
			<router-link :to="{path:'/'}" tag="a">回首页</router-link>
		</div>
		<div>
			<input type="text" name="name" placeholder="请输入姓名" v-model="name">
			<input type="text" name="yuwen" placeholder="请输入语文成绩" v-model="yuwen">
			<input type="text" name="shuxue" placeholder="请输入数学成绩" v-model="shuxue">
			<input type="text" name="yingyu" placeholder="请输入英语成绩" v-model="yingyu">
			<button @click="search">搜索</button>
		</div>
		<table width="500">
			<thead>
				<tr>
					<th width="30"></th>
					<th @click="sortArr('name')">姓名</th>
					<th @click="sortArr('yuwen')">语文成绩</th>
					<th @click="sortArr('shuxue')">数学成绩</th>
					<th @click="sortArr('yingyu')">英语成绩</th>
					<th>操作</th>
				</tr>
			</thead>
			<tr align="center" v-for="(item,index) in newArr">
				<td>{{index+1}}</td>
				<td>{{item.name}}</td>
				<td>{{item.yuwen}}</td>
				<td>{{item.shuxue}}</td>
				<td>{{item.yingyu}}</td>
				<td>
					<a href="javascript:;" @click="change(item.id)">修改</a>
					<a href="javascript:;" @click="deleteThis(item.id)">删除</a>
				</td>
			</tr>
			<tr v-if="newArr.length <= 0">
				<td colspan="6" align="center">暂无数据</td>
			</tr>
		</table>
		<div>
			<router-link :to="{path:'/add'}" tag="a">新增</router-link>
		</div>
		<myDialog :title="title" :dialogShow="dialogShow" @onSure="deleteSure" @onClose="closeDialog"></myDialog>
	</div>
</template>

<script type="text/javascript">
	import {config,alertSomthing} from '../util/config'
	import myDialog from '../components/myDialog'
	export default {
		name: 'list',
		components: {
			myDialog
		},
		data() {
			return {
				title: '确定删除',
				dialogShow: false,
				name: '',
				yuwen: '',
				yingyu: '',
				shuxue: '',
				nameSort: false,
				yuwenSort: false,
				shuxueSort: false,
				yingyuSort: false,
				listId: '',
				newArr: [],
				dataList: [
					{
						name: '小王',
						yuwen: '111',
						shuxue: '19',
						yingyu: '82',
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
		methods: {
			sortArr(data) {
				console.log(data)
				var _this = this;
				// var sorts = false;

				if(_this[data+'Sort']) {
					_this.nameSort = false,
					_this.yuwenSort = false,
					_this.shuxueSort = false,
					_this.yingyuSort = false,
					_this[data+'Sort'] = false;
				} else {
					_this.nameSort = false,
					_this.yuwenSort = false,
					_this.shuxueSort = false,
					_this.yingyuSort = false,
					_this[data+'Sort'] = true;
				}
				_this.newArr.sort(function(a,b) {
					if(_this[data+'Sort']) {
						return a[data] - b[data]
					} else {
						return b[data] - a[data]
					}

				});
			},
			deleteThis(data) {
				var _this = this;
				_this.dialogShow = true;
				_this.listId = data;
			},
			change(id) {
				this.$router.push("/add?id="+id)
			},
			deleteSure() {
				var _this = this;
				_this.dataList.map(function(o,i){
					if(o.id == _this.listId) {
						_this.dataList.splice(i,1)
					}
				})
				_this.search();
				_this.dialogShow = false;
			},
			closeDialog() {
				this.dialogShow = false;
			},
			search() {
				var _this = this;
				var name = _this.name;
				var yuwen = _this.yuwen;
				var shuxue = _this.shuxue;
				var yingyu = _this.yingyu;
				_this.newArr = [];
				_this.dataList.map(function(o,i,arr) {
					if((name=='' || name==null || name==undefined || o.name.indexOf(name) >= 0)
					&& (yuwen=='' || yuwen==null || yuwen==undefined || o.yuwen==yuwen)
					&& (shuxue=='' || shuxue==null || shuxue==undefined ||  o.shuxue==shuxue) 
					&& (yingyu=='' || yingyu==null || yingyu==undefined ||  o.yingyu==yingyu) )
					{
						_this.newArr.push(o)
					}
				})
			}
		},
		mounted() {
			this.$nextTick(function() {
				var _this = this;
				_this.search();
				console.log(config)
				var time = 1519785880162;
				var formatTime = new Date(time).format('yyyy-MM-dd hh:mm:ss');
				console.log(formatTime)
				// alertSomthing()

			})
		}
	}
</script>

<style scoped>
	.list >>> .dialogContWrap {
		color: red;
	}
	thead th {
		cursor: pointer;
	}
</style>