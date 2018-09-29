<template>
    <div class="fillcontain">
        <el-table
            :data="tableData"
            v-loading="loading"
            border
            style="width: 100%">
            <el-table-column
                prop="sortnum"
                label="#"
                align='center'
                width="60">
            </el-table-column>
            <el-table-column
                prop="name"
                label="用户姓名"
                align='center'>
            </el-table-column>
            <el-table-column
                prop="ip"
                label="IP地址"
                align='center'>
            </el-table-column>
            <el-table-column
                prop="ctime"
                label="注册时间"
                align='center'>
            </el-table-column>
        </el-table>

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
import { forMatDate } from '../utils/index.js';
export default {
    data(){
        return {
            tableData: [],
            loading: false,  //正在加载数据
            currentPage: 1,
            total: 0,  //数据总条数
            limitNum: 10, //每页显示数据多少条
        }
    },
    mounted(){
        this.getList(true);
    },
    methods: {
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
            this.$http.get('/api/users/info',{
                params: {
                    page: that.currentPage,
                    limitNum: that.limitNum,
                    firstReq: firstReq
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
                            sortnum : index+1,
                            name: item.nickname,
                            ip: item.ip,
                            ctime: ctime
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
        }
    }
}
</script>

<style scoped>
.block{
    height: 40px;
    display: flex;
    margin-top:5px;
    flex-direction: column;
    justify-content: center;
}
.fillcontain{
    padding: 10px;
    box-sizing: border-box;
}
</style>

<style>
.el-pagination{
    .el-pagination__total,.btn-prev,.btn-next{
        margin-top:5px;
    }
    .el-pager{
        height: 40px;
        li{
            line-height: 40px;
        }
    }
}

</style>



