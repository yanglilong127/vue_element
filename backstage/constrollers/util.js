const {get_IP}  = require('../utils/index');

module.exports = {
    //获取公网ip
    getip: function(req, res, next){
        var ip = get_IP(req);
        res.send({msg:'OK', ip:ip}).end();
    }
}