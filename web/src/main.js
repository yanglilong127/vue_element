import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store/';
import qs from 'qs';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;


router.beforeEach((route, redirect, next) => { 
	//定位到首页时，清空缓存数据;
	if (route.path === '/') {  
		localStorage.removeItem('userinfo')
	}  
	//判断是否有用户登录的记录
	let userinfo = JSON.parse(localStorage.getItem('userinfo'))  
	//...
	//console.log(route)
	if(!userinfo && route.path!='/'){
		next({path: '/'});
	}
	if(route.name){  //有路由名称信息
		next();
	}else{  //没有路由名称的，直接跳404页面。
		next({path:'/404'});
	}

});

const vm = new Vue({
	el: '#app',
	router,
	store,
	render: h=> h(App)
});