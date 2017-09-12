<template>
	<div id="loginBox">
		<div id="from">
			<el-form label-position="right" label-width="80px" :model="formLabelAlign">
				<el-form-item label="用户名：">
					<el-input v-model="formLabelAlign.name"></el-input>
				</el-form-item>
				<el-form-item label="密码：">
					<el-input v-model="formLabelAlign.password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="dark" @click="goHome">登陆</el-button>
					<el-button type="dark">注册</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formLabelAlign: {
					name: '',
					password: ''
				}
			}
		},
		methods:{
			goHome(){
				this.$router.push({
					path:'/home'
				})
			}
		}
	}
</script>

<style>
	#loginBox {
		width: 100vw;
		height: 100vh;
		background: url(../../../static/img/earth.jpg);
	}
	
	#from {
		width: 20vw;
		height: 30vh;
		position: absolute;
		top: 40vh;
		right: 10vw;
		background: white;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 1vh;
	}
</style>