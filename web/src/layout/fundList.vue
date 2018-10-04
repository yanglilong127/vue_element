<template>
    <div class="fillcontain">
        <el-form ref="myform" :model="myform">
            <el-form-item label="投标时间筛选:">
                <el-date-picker
                    type="datetime"
                    placeholder="选择开始时间"
                    align="right"
                    v-model="myform.startTime">
                </el-date-picker>
                --
                <el-date-picker
                    type="datetime"
                    placeholder="选择结束时间"
                    align="right"
                    v-model="myform.endTime">
                </el-date-picker>
                &nbsp;&nbsp;
                <el-button type="primary" size="small" @click="getList(true)">筛选</el-button>
                <el-button type="primary" size="small" @click="onAddBtn()">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="tableData"
            v-loading="loading"
            border
            style="width:100%">
            <el-table-column
                prop="index"
                label="序号"
                width="80"
                align="center">
            </el-table-column>
            <el-table-column
                prop="ctime"
                label="创建时间"
                width="220"
                align="center">
            </el-table-column>
            <el-table-column
                prop="incomePayType"
                label="收支类型"
                width="220"
                align="center">
            </el-table-column>
            <el-table-column
                prop="incomePayDes"
                label="收支描述"
                align="center">
            </el-table-column>
            <el-table-column
                prop="amount"
                label="金额"
                align="center">
                <template slot-scope='scope'>
                    <span :class="scope.row.amount>=0? 'earn': 'loss'">
                        {{ scope.row.amount>=0? '+'+scope.row.amount: scope.row.amount}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="account_cash"
                label="账户现金"
                align="center">
                <template slot-scope='scope'>
                    <span :class="scope.row.account_cash>=0? 'earn': 'loss'">
                        {{ scope.row.account_cash>=0? '+'+scope.row.account_cash: scope.row.account_cash}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                align="center">
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button @click="onEditMoney(scope.row)" type="warning" size="small">编辑</el-button>
                    <el-button @click="onDeleteMoney(scope.row,scope.$index)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--弹出框-->
        <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body='false'
            width='50%'>
            <div class='form'>
                <el-form ref='myform1' :model='myform1' :rules='myform1Rules' 
                    :label-width="dialog.formLabelWidth" 
                    style="margin:10px;width:auto;">
                    <el-form-item label="收支类型:" class='is-required'>
                        <el-select v-model="myform1.incomePayType" placeholder="收支类型">
                            <el-option v-for='(item) in format_type_list' 
                                :key='item' 
                                :label="item" 
                                :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop='incomePayDes' label="收支描述:">
                        <el-input type="textarea" v-model="myform1.incomePayDes"></el-input>
                    </el-form-item>
                    <el-form-item prop='amount'  label="金额:">
                        <el-input type="number" v-model.number="myform1.amount"></el-input>
                    </el-form-item>
                    <el-form-item prop='account_cash'  label="账户现金:">
                        <el-input type="number" v-model.number="myform1.account_cash"></el-input>
                    </el-form-item>
                    <el-form-item prop='remark'  label="备注:">
                        <el-input type="textarea" v-model.number="myform1.remark"></el-input>
                    </el-form-item>
                    <el-form-item class="right">
                        <el-button @click='dialog.show=false'>取 消</el-button>
                        <el-button type='primary' @click="onAddMoney('myform1')">提 交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>


        <!--分页-->
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="limitNum"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {forMatDate} from '../utils/index.js';
export default {
    data(){
        return {
            addData: true,  //是增加还是更改数据
            ID: '',
            myform: {
                startTime: '',
                endTime: ''
            },
            tableData: [],
            loading: false,  //正在加载数据
            currentPage: 1,
            total: 0,  //数据总条数
            limitNum: 10, //每页显示数据多少条
            dialog: {
                show: false,
                title: '新增资金信息',
                formLabelWidth: '120px'
            },
            myform1: {
                incomePayType: '',
                incomePayDes: '',
                amount: '',
                account_cash: '',
                remark: ''
            },
            //弹出框表数据校验规则
            myform1Rules: {
                incomePayDes: [
                    {required: true, message:'收支描述不能为空!', trigger:'blur'}
                ],
                amount: [
                    {required: true, message:'输入金额不能为空!', trigger:'blur'}
                ],
                account_cash: [
                    {required: true, message:'输入不能为空!', trigger:'blur'}
                ]
            },
            format_type_list: ['提现','提现手续费','提现锁定','理财服务退出',
                '购买宜定盈','充值','优惠券','充值礼券','转账'],
            
        }
    },
    mounted(){
        this.getList(true);
    },
    methods: {
        //点击添加按钮
        onAddBtn(){
            this.myform1.incomePayType = '';
            this.myform1.incomePayDes = '';
            this.myform1.amount = '';
            this.myform1.account_cash = '';
            this.myform1.remark = '';
            this.dialog.title = '新增资金信息';
            this.dialog.show = true;
            this.addData = true; //增加数据
        },
        //表单提交
        onAddMoney(formName){
            var that = this;
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    //此外还要检查下收支类型
                    if(that.myform1.incomePayType){
                        var isAddData = that.addData;
                        that.$http
                        .post(
                            isAddData? '/api/fund/addSingleData': '/api/fund/updateData',
                            that.$qs.stringify({
                                ID: that.ID,
                                incomePayType: that.myform1.incomePayType,
                                incomePayDes: that.myform1.incomePayDes,
                                amount: that.myform1.amount,
                                account_cash: that.myform1.account_cash,
                                remark: that.myform1.remark,
                            })
                        )
                        .then((response)=>{
                            var data = response.data;
                            that.dialog.show = false;
                            that.getList(true);
                        })
                        .catch(ex=>{
                            console.log(ex);
                        });
                    }else{
                        that.$notify.error({
                            title: '错误',
                            message: '请填写收支类型'
                        });
                    }
                }else{
                    that.$notify.error({
                        title: '错误',
                        message: '请填写完整后再提交'
                    });
                }
            });
        },
        handleSizeChange(val) {
            //console.log(val, typeof val) //为数值
            if(val == this.limitNum) return;
            this.limitNum = val;
            this.getList();
        },
        handleCurrentChange(val) {
            //console.log(val, typeof val)
            if(val == this.currentPage) return;
            this.currentPage = val;
            this.getList();
        },
        /** 获取数据
         * params bool  是否是第一次加载
         * **/
        getList(firstReq=false){
            var that = this;
            that.loading = true;
            if(this.myform.startTime){
                this.myform.startTime = forMatDate(new Date(this.myform.startTime).getTime());
            }else{
                this.myform.startTime = "";
            }
            if(this.myform.endTime){
                this.myform.endTime = forMatDate(new Date(this.myform.endTime).getTime());
            }else{
                this.myform.endTime = "";
            }
            this.$http.get('/api/fund/getFundFlow',{
                params: {
                    page: that.currentPage,
                    limitNum: that.limitNum,
                    firstReq: firstReq,
                    myform: that.myform
                },
                timeout: 1000
            })
            .then((response)=>{
                var res = response.data;
                if(res.msg=='OK'){
                    var data = res.allData;
                    var count = res.count;
                    count = count? count: 0;
                    that.total = count;
                    that.loading = false;
                    that.tableData = [];  //清空
                    data.forEach((item, index)=>{
                        let ctime = forMatDate(new Date(item.createdAt).getTime())
                        let tmp_obj = {
                            id: item.ID, //该条数据的id
                            index : index+1,
                            ctime: ctime,
                            incomePayType: item.incomePayType,
                            incomePayDes: item.incomePayDesc,
                            amount: item.amount,
                            account_cash: item.account_cash,
                            remark: item.remark
                        }
                        that.tableData.push(tmp_obj);
                    });
                }else{
                    that.$notify.error({
                        title: '错误',
                        message: '加载错误，请刷新'
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
                that.$notify.error({
                    title: '错误',
                    message: '加载错误，请刷新'
                });
            })
        },
        //编辑数据
        onEditMoney(row){
            //row表示tableData数组里的第几个数据
            this.ID = row.id;
            this.myform1.incomePayType = row.incomePayType;
            this.myform1.incomePayDes = row.incomePayDes;
            this.myform1.amount = Number(row.amount);
            this.myform1.account_cash = Number(row.account_cash);
            this.myform1.remark = row.remark;

            this.dialog.title = '修改资金信息';
            this.dialog.show  = true;
            this.addData = false; //修改数据
        },
        //删除数据
        onDeleteMoney(row){
            //根据id来删除数据
            var that = this;
            this.ID = row.id;
            this.$message({
                showClose: true,
                message: 'Sorry,您暂无此操作权限',
                type: 'success'
            });
            return;
            this.$http
            .post(
                '/api/fund/deleteSingleData',
                that.$qs.stringify({
                    ID: that.ID
                })
            )
            .then((response)=>{
                var data = response.data;
                //console.log(data);
                that.getList(true);
            })
            .catch(ex=>{
                console.log(ex);
            })
        }
    }
}
</script>

<style scoped>
.fillcontain{
    padding: 10px;
    box-sizing: border-box;
}
.right{
    float: right;
}
.el-form{
    overflow: hidden;
}
.earn{
    color:#00d053;
}
.loss{
    color:#f56767
}
</style>

