const UUID = require('uuid');

const {User} = require('../models');
//md5加密
const { md5,get_IP } = require('../utils');

module.exports = {
    //用户注册
	login: function(req, res, next){
		var nickname = req.body.nickname; //用户名
        var password = req.body.password; //密码
        //console.log(nickname, password)
        password = md5(password).toUpperCase();
        //console.log(password)
		User.findOne({
            where: {
                nickname: nickname
            }
        })
		.then((data)=>{
			if(data){  
                if(data.password==password){
                    return data;
                }else{
                    throw {msg:'NotMatch'};
                }
			}else{
                var ip = get_IP(req);
                return User.create({
                    nickname: nickname,
                    password: password,
                    ip: ip
                });
			}
		})
		.then((data)=>{
            //console.log(data);
            res.send({msg:'OK', data:data.dataValues}).end();
		})
		.catch( ex=>{
            //console.log(ex,'错误')
			res.send(ex).end();
		});
    },
    
    //修改密码
    modify_pass: function(req, res, next){

    },

    //修改头像
    modifyAvatar: function(req, res, next){
        var nickname = req.body.nickname; //用户名
        var avatarPic = req.body.avatarPic; //头像
        User.update({
            avatar: avatarPic
        },{
            where: {
                nickname: nickname
            }
        })
        .then(()=>{
            res.send({msg: 'OK'}).end();
        });
    },

    //获取用户信息
    getUserInfo(req, res, next){
        var firstReq = req.query.firstReq; //是否是第一次请求
        var page = Number(req.query.page);  //页码
        page = page<1? 1: page;
        var limitNum = Number(req.query.limitNum); //限制获取多少条数据
        var start = (page-1) * limitNum;
        User.findAll({
            limit: limitNum,
            offset: start
        })
        .then((allData)=>{
            if(firstReq){
                User.count()
                .then((count)=>{
                    res.send({msg:'OK',count,allData}).end();
                })
            }else{
                res.send({msg:'OK',allData}).end();
            }
        })
    }

}