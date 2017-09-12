<template>
	<div>
		<el-row>
			<el-col :span="3">
				<el-menu class="el-menu-vertical-demo" :collapse="false" :router="true" @open="handleOpen" @close="handleClose" theme="dark">
					<h2>菜单</h2>
					<el-menu-item index="/cityList">
						<i class="el-icon-d-caret"></i>
						<span slot="title">城市列表</span>
					</el-menu-item>
					<el-menu-item index="/user">
						<i class="el-icon-d-caret"></i>
						<span slot="title">用户管理</span>
					</el-menu-item>
					<el-menu-item index="/lines">
						<i class="el-icon-d-caret"></i>
						<span slot="title">路线管理</span>
					</el-menu-item>
					<el-menu-item index="/stations">
						<i class="el-icon-d-caret"></i>
						<span slot="title">站点管理</span>
					</el-menu-item>
					<el-menu-item index="/order">
						<i class="el-icon-d-caret"></i>
						<span slot="title">订单管理</span>
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="21">
				<router-view></router-view>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	.el-menu-vertical-demo {
		height: 100vh;
	}
	.el-menu-vertical-demo h2{
		color: #bfcbd9;
		text-align: center;
		height: 5vh;
		line-height: 5vh;
		border-bottom: 2px solid #bfcbd9;
	}
</style>