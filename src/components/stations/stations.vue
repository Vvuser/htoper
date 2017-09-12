<template>
	<div id="box">
		<div>
			<h1>站点管理</h1>
		</div>
		<div id="cityOper">
			<el-button @click="dialogVisible = true">添加</el-button>
			<input type="text" placeholder="查找" v-model="search" />
		</div>
		<div>
			<el-table :data="userList" style="width: 100%">
				<el-table-column prop="username" label="用户名">
				</el-table-column>
				<el-table-column prop="telephone" label="电话">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="180">
					<template scope="scope">
						<el-button type="text" size="small" @click="updateVisible=true;index=scope.row.id">编辑</el-button>
						<el-button @click="delVisible=true;index=scope.$index;id=scope.row.id" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import qs from 'qs';
	export default {
		data() {
			return {
				userList: [],
				mainList:[],
				search:''
			}
		},
		watch:{
			
		},
		methods: {
			getInfo(){
				this.http.get('')
			}
		},
		created() {
			
		}
	}
</script>

<style>
	#box {
		width: 100%;
		height: 100vh;
	}
	
	#box>div {
		display: flex;
		justify-content: center;
	}
	
	#cityOper {
		display: flex;
		justify-content: flex-start !important;
	}
	
	#cityOper input {
		margin-left: 2vw;
	}
</style>