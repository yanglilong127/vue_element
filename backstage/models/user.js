const Sequelize = require('sequelize');
const { db } = require('../db.js');


//创建model
var table = db.define('user_tb', {
		ID: {
			type: Sequelize.INTEGER(11), // 指定值的类型
	        primaryKey: true,
	        allowNull: false,
	        autoIncrement: true
		},
		sex: {   //性别
			//女  男 
			type: Sequelize.STRING(1),
			allowNull: false,
			defaultValue: '女'
		}, 
		nickname: {  //用户名
			type: Sequelize.STRING(12),
			allowNull: false,
			unique: true
		},
		password: {  //密码
			type: Sequelize.STRING(32),
			allowNull: false
		},
		age: {
			type: Sequelize.INTEGER(4),
			allowNull: false,
			defaultValue: 18
		},
		email: {  //邮箱
			type: Sequelize.STRING(255)
		},
		avatar: {  //头像地址
			type: Sequelize.TEXT
		},
		telephoto: {
			type: Sequelize.STRING(11)
		},
		ip: {
			type: Sequelize.STRING(15)
		}
	}, {
		 // 如果为 true 则表的名称和 model 相同，即 user
	    // 为 false MySQL创建的表名称会是复数 users
	    // 如果指定的表名称本就是复数形式则不变
	    freezeTableName: true,
	    //由于插件会自动添加createAt和updatedAt字段，使用false关闭
	    //createdAt: false,
	    updatedAt: false
	}
);
//table.sync({force: false});


module.exports = table;


