
const {FundFlow} = require('../models');

module.exports = {
    //获取数据
    getFundFlow(req, res, next){
        var firstReq = req.query.firstReq; //是否是第一次请求
        var page = Number(req.query.page);  //页码
        page = page<1? 1: page;
        var limitNum = Number(req.query.limitNum); //限制获取多少条数据
        var start = (page-1) * limitNum;
        var myform = JSON.parse(req.query.myform);
        var startTime = myform.startTime;
        var endTime = myform.endTime;
        //过滤数据
        var filter = {};
        if(startTime){
            filter['$gte'] = new Date(startTime);
        }
        if(endTime){
            filter['$lte'] = new Date(endTime);
        }
        var where_filter = null;
        if(filter && (filter['$gte'] || filter['$lte'])){
            where_filter = {
                where: {
                    createdAt: filter
                },
                order: [
                    ['ID', 'DESC']
                ],
                limit: limitNum,
                offset: start
            }
        }else{
            where_filter = {
                order: [
                    ['ID', 'DESC']
                ],
                limit: limitNum,
                offset: start
            }
        }
        FundFlow.findAll(where_filter)
        .then((allData)=>{
            if(firstReq){
                FundFlow.count()
                .then((count)=>{
                    res.send({msg:'OK',count,allData}).end();
                })
            }else{
                res.send({msg:'OK',allData}).end();
            }
        });
    },

    //添加数据
    addSingleData(req, res, next){
        var incomePayType = req.body.incomePayType;
        var incomePayDes = req.body.incomePayDes;
        var amount = Number(req.body.amount);
        var account_cash = Number(req.body.account_cash);
        var remark = req.body.remark;
        remark = remark? remark: '';
        FundFlow.create({
            incomePayType: incomePayType,
            incomePayDesc: incomePayDes,
            amount: amount,
            account_cash: account_cash,
            remark: remark
        })
        .then(()=>{
            res.send({msg:'OK'}).end();
        })
        .catch((ex)=>{
            res.send({msg:'ERR', ex:ex}).end();
        }); 
    },  

    //更新数据
    updateData(req, res, next){
        var ID = Number(req.body.ID);
        var incomePayType = req.body.incomePayType;
        var incomePayDes = req.body.incomePayDes;
        var amount = Number(req.body.amount);
        var account_cash = Number(req.body.account_cash);
        var remark = req.body.remark;
        remark = remark? remark: '';
        FundFlow.update({
            incomePayType: incomePayType,
            incomePayDesc: incomePayDes,
            amount: amount,
            account_cash: account_cash,
            remark: remark
        },{
            where: {
                ID: ID
            }
        })
        .then(()=>{
            res.send({msg:'OK'}).end();
        })
        .catch((ex)=>{
            res.send({msg:'ERR', ex:ex}).end();
        }); 
    },

    //删除单条数据
    deleteSingleData(req, res, next){
        var ID = Number(req.body.ID);
        FundFlow.destroy({
            where: {
                ID: ID
            }
        })
        .then(()=>{
            res.semd({msg:'OK'}).end();
        })
        .catch(ex=>{
            res.send({msg:'ERR', text:ex}).end();
        });
    }

}