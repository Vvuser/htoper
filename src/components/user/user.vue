<template>
	<div id="box">
		<div>
			<h1>用户管理</h1>
		</div>
		<div id="cityOper">
			<input type="text" placeholder="查找" v-model="search" />
		</div>
		<div>
			<el-table :data="List" style="width: 100%">
				<el-table-column prop="username" label="用户名">
				</el-table-column>
				<el-table-column prop="telephone" label="电话">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="180">
					<template scope="scope">
						<el-button type="text" size="small" @click="row=scope.row;updateVisible=true">编辑</el-button>
						<el-button type="text" size="small" @click="row=scope.row;delVisible=true">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="提示" :visible.sync="delVisible" size="tiny">
			<span>您确定删除吗？</span>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="delVisible = false">取 消</el-button>
			    <el-button type="primary" @click="del">确 定</el-button>
		  	</span>
		</el-dialog>
		<el-dialog title="编辑" :visible.sync="updateVisible" size="tiny">
			<el-form :model="row" ref="row" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名" prop="username">
					<el-input type="username" v-model.number="row.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话号" prop="telephone">
					<el-input type="telephone" v-model.number="row.telephone" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="updateVisible = false">取 消</el-button>
			    <el-button type="primary" @click="update">确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>

<script>
	import qs from 'qs';
	export default {
		data() {
			return {
				List: [],
				mainList:[],
				search:'',
				row:{},
				delVisible:false,
				updateVisible:false,
				search:''
			}
		},
		watch:{
			search(){
				if(this.search){
					this.List = this.List.filter(el=>{
						if(el.username.indexOf(this.search) > -1 || el.telephone.indexOf(this.search) > -1){
							return true
						}
					})
				}else{
					this.List = this.mainList
				}
			}
		},
		methods: {
			getInfo(){
				this.http.get('http://localhost/dudu_bus/git_user.php').then(res=>{
					console.log(res)
					this.List = res.data
					this.mainList = res.data
				})
			},
			del(){
				this.http.post('http://localhost/dudu_bus/del_user.php',qs.stringify({
					id:this.row.id
				}))
				this.getInfo()
			},
			update(){
				this.http.post('http://localhost/dudu_bus/update_user.php',qs.stringify({
					id:this.row.id,
					username:this.row.username,
					telephone:this.row.telephone
				})).then(()=>this.getInfo())
				
				this.updateVisible = false
			}
		},
		created() {
			this.getInfo()
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
	#cityOper>input{
		height: 3vh;
	}
</style>