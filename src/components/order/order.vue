<template>
	<div id="box">
		<div>
			<h1>订单管理</h1>
		</div>
		<div id="cityOper">
			<el-button @click="dialogVisible = true">添加</el-button>
			<input type="text" placeholder="查找" v-model="search" />
		</div>
		<div>
			<el-table :data="cityList" style="width: 100%">
				<el-table-column prop="city_name" label="城市">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="180">
					<template scope="scope">
						<el-button type="text" size="small" @click="updateVisible=true;cityListInsertForm.name=scope.row.city_name;index=scope.row.id">编辑</el-button>
						<el-button @click="delVisible=true;index=scope.$index;id=scope.row.id" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="添加" :visible.sync="dialogVisible" size="tiny">
			<el-form :model="cityListInsertForm" ref="cityListInsertForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="城市" prop="name">
					<el-input type="age" v-model.number="cityListInsertForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="insert">确 定</el-button>
		  	</span>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="delVisible" size="tiny">
			<span>您确定删除吗？</span>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="delVisible = false">取 消</el-button>
			    <el-button type="primary" @click="del">确 定</el-button>
		  	</span>
		</el-dialog>
		<el-dialog title="编辑" :visible.sync="updateVisible" size="tiny">
			<el-form :model="cityListInsertForm" ref="cityListInsertForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="城市" prop="name">
					<el-input type="age" v-model.number="cityListInsertForm.name" auto-complete="off"></el-input>
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
				cityList: [],
				mainList:[],
				dialogVisible: false,
				delVisible:false,
				updateVisible:false,
				index:'',
				id:0,
				cityListInsertForm: {
					name: ''
				},
				search:''
			}
		},
		watch:{
			search(){
				if(this.search){
					this.cityList = this.cityList.filter(el=>{
						if(el.city_name.indexOf(this.search) > -1){
							return true
						}
					})
				}else{
					this.cityList = this.mainList
				}
				
			}
		},
		methods: {
			insert() {
				if(this.cityListInsertForm.name) {
					this.http.post('http://localhost/dudu_bus/cityInsert.php',qs.stringify({
						city_name:this.cityListInsertForm.name
					})).then(res=>{
						console.log(res)
					})
					this.dialogVisible = false
					this.cityListInsertForm.name = ''
					this.getCity()
				}
			},
			del(){
				console.log(this.id)
				this.http.post('http://localhost/dudu_bus/delcity.php',qs.stringify({
					id:this.id
				})).then(res=>console.log(res));
				this.cityList.splice(this.index,1)
				this.delVisible=false
			},
			update(){
				this.http.post('http://localhost/dudu_bus/updaCity.php',qs.stringify({
					id:this.index,
					city_name:this.cityListInsertForm.name
				}))
				this.getCity()
				this.updateVisible = false
				this.cityListInsertForm.name = ''
			},
			getCity(){
				this.http('http://localhost/dudu_bus/city_list.php').then(res => {
					this.cityList = res.data
					this.mainList = res.data
				})
			}
		},
		created() {
			this.getCity()
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