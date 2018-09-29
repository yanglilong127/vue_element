const mysql = require('mysql2');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
	//原生
	pool : mysql.createPool({
		connectionLimit : 400, //连接池最多可以创建连接数
	    host:'localhost',
	    user:'root',
	    password:'123456',
	    database:'vue_elementUI',
	    //queueLimit:8 // 队伍中等待连接的最大数量，0为不限制。默认为0
	}),
	db: new Sequelize('vue_elementUI', 'root', '123456', {
		host: 'localhost', // 数据库地址
		dialect: 'mysql', // 指定连接的数据库类型
		pool: {
		    max: 100, // 连接池中最大连接数量
		    min: 0, // 连接池中最小连接数量
		    acquire: 30000,
		    idle: 1000 // 如果一个线程 1 秒钟内没有被使用过的话，那么就释放线程
		},
		operatorsAliases:{
		    $eq: Op.eq,
	            $ne: Op.ne,
	            $gte: Op.gte,
	            $gt: Op.gt,
	            $lte: Op.lte,
	            $lt: Op.lt,
	            $not: Op.not,
	            $in: Op.in,
	            $notIn: Op.notIn,
	            $is: Op.is,
	            $like: Op.like,
	            $notLike: Op.notLike,
	            $iLike: Op.iLike,
	            $notILike: Op.notILike,
	            $regexp: Op.regexp,
	            $notRegexp: Op.notRegexp,
	            $iRegexp: Op.iRegexp,
	            $notIRegexp: Op.notIRegexp,
	            $between: Op.between,
	            $notBetween: Op.notBetween,
	            $overlap: Op.overlap,
	            $contains: Op.contains,
	            $contained: Op.contained,
	            $adjacent: Op.adjacent,
	            $strictLeft: Op.strictLeft,
	            $strictRight: Op.strictRight,
	            $noExtendRight: Op.noExtendRight,
	            $noExtendLeft: Op.noExtendLeft,
	            $and: Op.and,
	            $or: Op.or,
	            $any: Op.any,
	            $all: Op.all,
	            $values: Op.values,
	            $col: Op.col
		}
	})
};