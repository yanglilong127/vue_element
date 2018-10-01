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
                <el-button type="primary" size="small" @click="onSearch()">筛选</el-button>
                <el-button type="primary" size="small" @click="onAddMoney()">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="tableData"
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

        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            myform: {
                startTime: '',
                endTime: ''
            },
            tableData: []
        }
    },
    mounted(){

    },
    methods: {
        onSearch(){

        },
        onAddMoney(){

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
</style>

