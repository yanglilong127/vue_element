const crypto = require('crypto');

const passKey = "FUNlyfMD46559";  //md5加密密匙


module.exports = {
	//md5加密
	md5: function(str){
		str = passKey + str;
		var obj=crypto.createHash('md5');
	    obj.update(str);
	    return obj.digest('hex');
	},
	//不加任何参数的纯md5加密
	pure_md5: function(str){
		var obj=crypto.createHash('md5');
	    obj.update(str);
	    return obj.digest('hex').toUpperCase();
    },
    //IP地址获取以及切片
    get_IP: function(req){
        var IP_addr = req.headers['x-forwarded-for'] ||
                        req.connection.remoteAddress ||
                        req.socket.remoteAddress ||
                        req.connection.socket.remoteAddress;;  //IP地址
        IP_addr = IP_addr.toString().split('');
        IP_addr = IP_addr.slice(IP_addr.lastIndexOf(':')+1).join('');
        return IP_addr;
    }
}