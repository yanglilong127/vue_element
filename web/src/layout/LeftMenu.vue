<template>
    <el-row class="menu_page">
        <el-col>
                <el-menu 
                mode="vertical"
                theme="dark" 
                class="el-menu-vertical-demo"
                :default-active="$route.path" 
                :collapse="$store.state.isCollapse"
                background-color="#324057"
                text-color="#fff"
                active-text-color="#42b983">
                    <template v-for="(item,index) in menuData">
                        <el-submenu v-if="item.children && !item.noDropdown && item.children.length > 0"  :index="item.path">
                            <template slot="title">
                                <i :class="'iconfont '+item.icon"></i>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <router-link v-for="(citem,cindex) in item.children" :to="citem.path"  :key="citem.path">
                                <el-menu-item 
                                    :index='citem.path'>
                                    <span slot="title">{{citem.name}}</span>
                                </el-menu-item> 
                            </router-link>
                        </el-submenu>

                        <router-link :to="item.path">
                            <el-submenu class="dropItem" v-if="item.children && item.noDropdown && item.children.length > 0"  :index="item.path">
                                <template slot="title" >
                                    <i :class="'iconfont '+item.icon"  @mouseover="showDropdown"></i>
                                    <span :class="{'hiddenDropname':$store.state.isDropname}"  slot="title">{{item.name}}</span> 
                                </template>

                                <router-link :to="item.path">
                                    <el-menu-item 
                                        :index='item.children[0].path'
                                        :class="{'hiddenDropdown':!$store.state.isDropname}" >
                                        <span slot="title">{{item.children[0].name}}</span>
                                    </el-menu-item> 
                                </router-link>
                            </el-submenu>
                        </router-link>
                    </template>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name:'left-Menu',
		data(){
			return {
                isDropdown:false,
                //菜单数据
                menuData: [
                    {path:'/index',name:'首页',icon:'icon_vue-shouye',noDropdown:true,
						children:[
							{path:'/index',name:'首页'}
						]
                    },
                    {path:'/index/fundData',name:'资金数据',icon:'icon_vue-shuju',
						children:[
							{path:'/index/fundPosition',name:'投资分布'},
							{path:'/index/typePosition',name:'项目分布'},
							{path:'/index/incomePayPosition',name:'收支统计'}
						]
                    },
                    {path:'/index/infoManage',name:'信息管理',icon:'icon_vue-xinxiguanli',
						children:[
							{path:'/index/infoShow',name:'个人信息'},                        
							{path:'/index/qrCode',name:'制作个人二维码'},                        
						]
					},
                    {path:'/index/userList',name:'用户列表',icon:'icon_vue-yonghu',noDropdown:true,
						children:[
							{path:'/index/userList',name:'用户列表'}
						]
                    },
					{path:'/index/fundManage',name:'资金管理',icon:'icon_vue-zijinguanli',
						children:[
							{path:'/index/fundList',name:'资金流水'},
							{path:'/index/payList',name:'支付单据'}
						]
			        },
					{path:'/index/touziManage',name:'投资管理',icon:'icon_vue-touziguanli',
						children:[
							{path:'/index/chinaTouziList',name:'省份投资'},
							{path:'/index/chinaTabsList',name:'区域投资'}
						]
                    },
                    {path:'/index/fundArticle',name:'金融文章',icon:'icon_vue-wenzhang',
						children:[
							{path:'/index/createFundArticle',name:'发布文章'},
							{path:'/index/modifyFundArticle',name:'编辑文章'},
							{path:'/index/showFundArticle',name:'查看文章'}
						]
			        }
                ]
			}
		},
        methods:{
           showDropdown(){ // 
               this.isDropdown = this.$store.state.isCollapse;
           },
         
        }    
}
</script>

<style scoped>
    .menu{margin-top:100px;}
	.menu_page{
		position: fixed;
		top:71px;
        left:0;
        height: 100%; 
        bottom: 71px;
        background-color: #324057;
        z-index: 99;
        overflow-y: auto;
	}
    .fa-margin{
        margin-right:5px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        min-height: 400px;
    }
    .el-menu-vertical-demo{
        width:35px;
    }
    .el-submenu .el-menu-item{
        min-width:180px;
    }
    .el-menu{
        .el-menu-item{
            padding-left:40px !important;
        }
     }
 
    .hiddenDropdown,
    .hiddenDropname{
        display:none;
    }

</style>

