<template>
	<div class="login_page">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<span class="title">小金风控后台管理</span>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
					<el-form-item prop="username">
					    <span class="fa-tips"><i class="iconfont icon_vue-yonghu"></i></span>
						<el-input class="area_input" type="text" placeholder="用户名" v-model="loginForm.username" ></el-input>
					</el-form-item>
					<el-form-item prop="password">
					    <span class="fa-tips"><i class="iconfont icon_vue-mima"></i></span>
						<el-input class="area_input" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
				  	</el-form-item>
					<div class="tiparea">
						<p class="wxtip">温馨提示：</p>
						<p class="tip">未登录过的新用户，自动注册</p>
						<p class="tip">注册过的用户可凭账号密码登录</p>
					</div>
				</el-form>
			
	  		</section>
	  	</transition>
	</div>
</template>


<script>
export default {
	data(){
		return {
			loginForm: {
				username: '',
				password: ''
			},
			rules: {
				username: [
		            { required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 2, max: 13, message: '长度在 2 到 12 个字符', trigger: 'blur' }
		        ],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 2, message: '长度最少为2个字符', trigger: 'blur' }
				],
			},
			showLogin: false,
			ip:'',
		}
	},
	mounted(){
		this.showLogin = true;
		this.getip();  // 在页面初始化时，就去获取公网ip
	},
	methods: {
		getip(){
			var that = this;
            this.$http.get('/api/getip',{
            	params: {

            	}
            })
            .then(function(response){
            	var ip = response.data.ip;
            	//console.log(ip)
            	that.ip = ip;
            })
            .catch((err)=>{
            	console.log(err);
            });
        },
        //表单提交事件
        submitForm(loginForm){
        	var that = this;
        	var username = this.loginForm.username.trim();
        	var password = this.loginForm.password.trim();
        	this.$refs[loginForm].validate((valid) => {
        		if(valid){  //验证通过
        			that.$http
        			.post('/api/user/login',
        				that.$qs.stringify({
			            	nickname: username,
			            	password: password
			            })
		            )
		            .then(function(response){
		            	var data = response.data;
		            	if(data.msg=='OK'){
		            		that.$notify({
		            			title: '成功',
		            			message: '登录成功',
								type: 'success',
								duration: 2000
		            		});
							that.saveUserInfo() // 存入缓存，用于显示用户名
							that.$store.dispatch('setAvatar', data.data.avatar);
		            		that.$router.push({path:'/index'});
		            	}else if(data.msg=='NotMatch'){
		            		that.$notify.error({
								title: '错误',
								message: '帐号或者密码错误',
								//offset: 100  //偏移
							});
		            	}else{
		            		that.$notify.error({
								title: '错误',
								message: '未知错误',
								//offset: 100  //偏移
							});
		            	}
		            })
		            .catch((err)=>{
		            	console.log(err);
		            });
        		}else {
					that.$notify.error({
						title: '错误',
						message: '请输入正确的用户名密码',
						//offset: 100  //偏移
					});
					return false;
				}
        	});
        },

        // 存入缓存，用于显示用户名
        saveUserInfo(){
        	var userinfo = {
				username: this.loginForm.username
			};
			localStorage.setItem('userinfo', JSON.stringify(userinfo));
        }
	}
}
</script>

<style scoped>
.login_page{
	position: absolute;
	width: 100%;
	height: 100%;
	background: url(../assets/images/bg.jpg) no-repeat center center;
	background-size: 100% 100%;
}
.loginForm{
	 background-color: #fff;
	 padding:20px;
	 border-radius:3px;
	 box-shadow: 5px 5px 10px #01144c;
	.fa-tips{
		position: absolute;
		top: 0px;
		left: 10px;
		z-index: 20;
		color:#FF7C1A;
		font-size: 18px;
	}
	
}
.manage_tip{
	margin-bottom:20px;
	.title{
		font-family: cursive;
		font-weight: bold;
		font-size: 26px;
		color:#fff;
	}
	.logo{
		width:60px;
		height:60px;
	}
}
.form_contianer{
	width:370px;
	height:210px;
	position: absolute;
	top: 20%;
    left: 34%;
	padding: 25px;
	border-radius: 5px;
	text-align: center;
	.submit_btn{
		width: 100%;
		font-size: 16px;
		letter-spacing:20px;
	}
}
.tiparea{
	text-align:left;
	font-size: 12px;
	color: #4cbb15;
	.tip{
		margin-left: 54px;
	}
}

.form-fade-enter-active, .form-fade-leave-active {
  	transition: all 1s;
}
.form-fade-enter, .form-fade-leave-active {
  	transform: translate3d(0, -50px, 0);
  	opacity: 0;
}
.loginForm{
	.el-button--primary{
		background-color:#FF7C1A;
		border:1px solid #FF7C1A;
	}
}

</style>

