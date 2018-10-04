//资金流水表

const Sequelize = require('sequelize');
const { db } = require('../db.js');


//创建model
var table = db.define('fundList_tb', {
		ID: {
			type: Sequelize.INTEGER(11), // 指定值的类型
	        primaryKey: true,
	        allowNull: false,
	        autoIncrement: true
		},
		incomePayType: {   //收支类型
			//女  男 
			type: Sequelize.STRING(30),
			allowNull: false
		}, 
		incomePayDesc: {  //收支描述
			type: Sequelize.TEXT,
			allowNull: false,
		},
		amount: {  //金额
			type: Sequelize.FLOAT
		},
		account_cash:{
			type: Sequelize.FLOAT
		},
		remark: {   //备注
			type: Sequelize.STRING(255)
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


