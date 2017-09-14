<template>
	<div id="box">
		<div>
			<h1>站点管理</h1>
		</div>
		<div id="cityOper">
			<el-button @click="insertVisible=true">添加</el-button>
			<input type="text" placeholder="查找" v-model="search" />
		</div>
		<div>
			<el-table :data="List" style="width: 100%">
				<el-table-column prop="name" label="站点">
				</el-table-column>
				<el-table-column prop="longitude" label="经度">
				</el-table-column>
				<el-table-column prop="latitude" label="纬度">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="180">
					<template scope="scope">
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
		<el-dialog title="添加" :visible.sync="insertVisible" size="tiny">
			<el-form :model="row" ref="row" label-width="100px" class="demo-ruleForm">
				<el-form-item label="站点" prop="name">
					<el-input type="name" v-model.number="row.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="longitude">
					<el-input type="longitude" v-model.number="row.longitude" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input type="latitude" v-model.number="row.latitude" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="路线" prop="line_id">
					<el-select v-model="row.line_id">
						<el-option label="软件园南站-上地西里" value="1"></el-option>
						<el-option label="软件园-地铁西二旗" value="2"></el-option>
						<el-option label="上地地铁站-北京西站" value="3"></el-option>
						<el-option label="北京西站-北京南站" value="4"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="insertVisible = false">取 消</el-button>
			    <el-button type="primary" @click="insert">确 定</el-button>
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
				mainList: [],
				search: '',
				row: {},
				delVisible: false,
				insertVisible: false,
				search: ''
			}
		},
		watch: {
			search() {
				if(this.search) {
					this.List = this.List.filter(el => {
						if(el.name.indexOf(this.search) > -1) {
							return true
						}
					})
				} else {
					this.List = this.mainList
				}
			}
		},
		methods: {
			getInfo() {
				this.http.get('http://localhost/dudu_bus/get_stations.php').then(res => {
					console.log(res)
					this.List = res.data
					this.mainList = res.data
				})
			},
			del() {
				console.log(this.row.id)
				this.http.post('http://localhost/dudu_bus/del_stations.php', qs.stringify({
					id: this.row.id
				}))
				this.getInfo()
				this.delVisible = false
			},
			insert() {
				console.log(this.row.line_id)
				this.http.post('http://localhost/dudu_bus/insert_stations.php', qs.stringify({
					line_id: this.row.line_id,
					name: this.row.name,
					longitude: this.row.longitude,
					latitude: this.row.latitude
				})).then((res) => {
					console.log(res)
					this.getInfo()
				})

				this.insertVisible = false
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
	
	#cityOper>input {
		height: 3vh;
	}
</style>