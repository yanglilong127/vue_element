const fs=require('fs');
const express=require('express');
const expressSession=require('express-session');
const compression=require('compression');  //开启gzip压缩
const bodyParser=require('body-parser');     //post方式数值
const cookieParser=require('cookie-parser');
const consolidate=require('consolidate');
const session=require('connect-session');
const MysqlStore=require('connect-mysql')(expressSession);
const enforceHttps = require('express-sslify'); //强制使用https
const path=require('path');
const { pool } = require('./backstage/db.js');
const options = {
	pool: pool,
	cleanup:false
}

//创建中间件服务器
var privateKey  = fs.readFileSync('./2_burtyang.top.key', 'utf8');
var certificate = fs.readFileSync('./1_burtyang.top_bundle.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const app=express();
const server=require('https').createServer(credentials, app);
//转换http 请求https
app.use(enforceHttps.HTTPS({redirectMethods:['GET']}));

//const server=require('http').createServer(app);
server.listen(8001,(err)=>{
    if(err)
        throw new err;
    else 
        console.log('成功监听8001端口。');
});
app.use(compression());
//获取数据请求  post方式
app.use(bodyParser.urlencoded({
    extended:true,
    maxAge:5*1024*1024,
    limit: '50mb'
}));
app.use(cookieParser('fsafgs4324rfrt34edfg5'));//签名
(function(){
    var sessionArr=[];
    for(var i=0;i<100000;i++)
        sessionArr.push('key_'+Math.random().toString().replace('.',''));
        app.use(expressSession({
        secret:'fsafgs4324rfrt34edfg5',
        name:'my_session_id',
        cookie:{maxAge:24*3600*1000},
        resave:false,
        saveUninitialized:true,
        keys:sessionArr,
        store: new MysqlStore(options)
    }));//24小时
})();
//清除过期的session
function sessionCleanup(){
    pool.getConnection((err,connection)=>{
        if(err){
            console.log(err);
            throw err;
        }else{
            var sql=`DELETE from sessions WHERE expires>0 AND expires<UNIX_TIMESTAMP()`;
            connection.query(sql,(err)=>{
                connection.release();
                if(err){
                    console.log(err);
                    throw err;
                }
            }); 
        }
    });
}
setInterval(sessionCleanup, 1800000);

//3.模版
//输出什么东西
app.set('view engine','html');
//模版文件放在哪儿
app.set('views','./web/dist');
//哪种模版引擎
app.engine('html',consolidate.ejs);

//route
app.use('/api',require('./backstage/router/web/index.js')());

//静态文件放置位置，即根目录
app.use(express.static('./web/dist'));