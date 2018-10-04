### 项目技术栈
##### 前端技术栈
vue + vuex + elementUI + vuex-router + axios(qs) + less
##### 后端技术栈
 nodejs + express + mysql + ORM框架:sequelize

### 项目介绍
[项目演示地址](https://www.burtyang.top:8001/)


## 项目运行
1. npm i (安装所需要的依赖包)
2. npm run build(打包并监听端口号8001)
3. 加载本地的sql文件(vue_element.sql)
4. 运行node fengkong
5. 浏览器输入 localhost:8001 (或者127.0.0.1：8001)


#### 主页
![项目主页](https://raw.githubusercontent.com/yanglilong127/vue_element/master/index.png)

### 功能
- 登录/退出
- 首页
- 用户列表
- 信息管理
    1. 个人信息
    2. 制作个人名片二维码
- 资金管理
    1. 资金流水


### 目录结构 
|-- backstage              //node服务端文件夹
|   |-- constrollers       //控制器
|   |-- deal_table         //对表操作
|   |-- models             //表的ORM model
|   |-- router             //api请求
|   |-- utils              //功能
|   |-- db.js              //数据库配置
|-- web                    //前端代码文件夹
├-- .babelrc               // babel-loader 配置
├-- .gitignore             // git 忽略项
├-- package.json           // 包依赖配置
|-- README.md              // 说明文件