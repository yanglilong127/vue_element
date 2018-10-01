import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../page/login.vue';
import Nopage from '../page/404.vue';
import Home from '../page/home.vue';
import { Index,FundPosition,typePosition,incomePayPosition,infoShow,userList,
    qrCode,fundList} from '../layout/';


Vue.use(VueRouter);

//浏览器调试时的router
const router = new VueRouter({
    //mode:'history',  //切换路径模式，编程history模式
	//滚动条滚动行为，不加这个默认就会记忆原来滚动条的位置
    routes: [
        {
            path:'/',  //首页时
            component: Login,
            name: '登录'
        },{
            path:'/404',
            name: '未找到',
            component: Nopage
        },{
            path:'/index',
            name:'首页',
            component:Home,
            children: [
                {
                    path:'/index/',
                    name: '首页',
                    component: Index
                },{
                    path:'/index/fundPosition',
                    name:'投资分布',
                    component: FundPosition
                },{
                    path:'/index/typePosition',
                    name:'项目分布',
                    component: typePosition
                },{
                    path:'/index/incomePayPosition',
                    name:'收支统计',
                    component: incomePayPosition
                },{
                    path:'/index/infoShow',
                    name:'个人信息',
                    component: infoShow
                },{
                    path:'/index/userList',
                    name: '用户列表',
                    component: userList
                },{
                    path: '/index/qrCode',
                    name: '通讯二维码',
                    component: qrCode
                },{
                    path: '/index/fundList',
                    name: '资金流水',
                    component: fundList
                }
            ]
        }
    ]
});




export default router;