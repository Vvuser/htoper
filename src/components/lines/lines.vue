<template>
	<div id="box">
		<div>
			<h1>路线管理</h1>
		</div>
		<div id="cityOper">
			<el-button @click="insertVisible=true">添加</el-button>
			<input type="text" placeholder="查找" v-model="search" />
		</div>
		<div>
			<el-table :data="List" style="width: 100%">
				<el-table-column prop="city_name" label="城市">
				</el-table-column>
				<el-table-column prop="start" label="起点">
				</el-table-column>
				<el-table-column prop="end" label="终点">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="180">
					<template scope="scope">
						<el-button type="text" size="small" @click="getStations(scope.row)">站点</el-button>
						<el-button type="text" size="small" @click="row=scope.row;updateVisible=true">编辑</el-button>
						<el-button type="text" size="small" @click="row=scope.row;delVisible=true">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="提示" :visible.sync="stationsVisible" size="tiny">
			<p v-for="item in show">{{item.name}}</p>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="stationsVisible = false">取 消</el-button>
			    <el-button type="primary" @click="stationsVisible = false">确 定</el-button>
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
			<el-form :model="row" ref="row" label-width="100px" class="demo-ruleForm">
				<el-form-item label="起点" prop="start">
					<el-input type="start" v-model.number="row.start" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="终点" prop="end">
					<el-input type="end" v-model.number="row.end" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="updateVisible = false">取 消</el-button>
			    <el-button type="primary" @click="update">确 定</el-button>
		  	</span>
		</el-dialog>
		<el-dialog title="添加" :visible.sync="insertVisible" size="tiny">
			<el-form :model="row" ref="row" label-width="100px" class="demo-ruleForm">
				<el-form-item label="起点" prop="start">
					<el-input type="start" v-model.number="row.start" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="终点" prop="end">
					<el-input type="end" v-model.number="row.end" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="城市" prop="city_id">
					<el-select v-model="row.city_id">
						<el-option label="北京" value="1"></el-option>
						<el-option label="上海" value="2"></el-option>
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
				updateVisible: false,
				insertVisible: false,
				stationsVisible: false,
				search: '',
				stationList:[],
				show:[]
			}
		},
		watch: {
			search() {
				if(this.search) {
					this.List = this.List.filter(el => {
						if(el.city_name.indexOf(this.search) > -1) {
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
				this.http.get('http://localhost/dudu_bus/get_lines.php').then(res => {
					console.log(res)
					this.List = res.data
					this.mainList = res.data
				})
				this.http.get('http://localhost/dudu_bus/get_stations.php').then(res => {
					this.stationList = res.data
				})
			},
			del() {
				console.log(this.row.id)
				this.http.post('http://localhost/dudu_bus/del_lines.php', qs.stringify({
					id: this.row.id
				}))
				this.getInfo()
				this.delVisible = false
			},
			update() {
				this.http.post('http://localhost/dudu_bus/update_lines.php', qs.stringify({
					id: this.row.id,
					start: this.row.start,
					end: this.row.end
				})).then(() => this.getInfo())

				this.updateVisible = false
			},
			insert() {
				console.log(this.row.city_id)
				this.http.post('http://localhost/dudu_bus/insert_lines.php', qs.stringify({
					start: this.row.start,
					end: this.row.end,
					city_id: this.row.city_id
				})).then((res) => {
					console.log(res)
					this.getInfo()
				})

				this.insertVisible = false
			},
			getStations(row){
				this.row=row;
				this.stationsVisible=true
				
				this.show = this.stationList.filter(el=>{
					if(el.line_id == this.row.id){
						return true
					}
				})
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