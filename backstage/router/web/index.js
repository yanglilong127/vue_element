const express = require('express');
const path = require('path');

//控制器
const { user,Util } = require(path.join(__dirname,'../../constrollers'));

module.exports = function(){
    var router = express.Router();

    router
    .post('/user/login', user.login)
    .post('/user/modify_pass', user.modify_pass)
    .post('/user/modifyAvatar', user.modifyAvatar)
    .get('/users/info', user.getUserInfo)

    .get('/getip', Util.getip)

    return router;
}