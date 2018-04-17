<template>
	<div class="index">
	<!-- 	<el-switch
		  v-model="value1"
		  active-color="#13ce66"
		  inactive-color="#ff4949">
		</el-switch>
		<div class="block">
		    <span class="demonstration">默认</span>
		    <el-slider v-model="value2"></el-slider>
	  	</div>
	  	<el-time-select
		  v-model="value3"
		  :picker-options="{
		    start: '08:30',
		    step: '00:15',
		    end: '18:30'
		  }"
		  placeholder="选择时间">
		</el-time-select>
		<el-time-picker
		    v-model="value4"
		    :picker-options="{
		      selectableRange: '00:00:00 - 23:59:59'
		    }"
		    placeholder="任意时间点">
		 </el-time-picker>
		 <el-upload
		 	  accept="image/*"
			  class="upload-demo"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :before-remove="beforeRemove"
			  multiple
			  :limit="3"
			  :on-exceed="handleExceed"
			  :file-list="fileList">
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<el-alert
		    title="成功提示的文案"
		    type="success">
		   </el-alert>
		   <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

			<el-dialog
			  title="提示"
			  :visible.sync="dialogVisible"
			  width="30%"
			  :before-close="handleClose">
			  <span>这是一段信息</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogSure">确 定</el-button>
			  </span>
			</el-dialog> -->
			<div>
				<router-link :to="{path: '/hello'}" tag='a'>hello</router-link>
			</div>
			<div>
				<router-link :to="{path: '/list'}" tag="a">list</router-link>
			</div>
			<div>
				<router-link :to="{path: '/tab'}" tag="a">tab</router-link>
			</div>
	</div>
</template>

<script>
import hello from './hello'
export default {
	name: 'index',
	components: {
		hello
	},
	data() {
		return {
			value1: false,
			value2: 10,
			value3: '10:30',
			value4: '10:30:30',
			fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
			dialogVisible: false
   	}
	},
	methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleClose(done) {
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
      },
      dialogSure(){
      	this.dialogVisible = false;
      	alert("保存成功");
      }
    }
	}
</script>

<style scoped>
	.index >>> .hello .myDialog .dialogContWrap {
		color: green;
	}
</style>