<template>
    <div class="fillcontain">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content myqrcode">
                    <p class="small-txt">制作通讯录名片</p>
                    <div id="qrcode"></div>
                    <p class="small-txt">请使用微信扫一扫该二维码</p>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content box">
                    <el-form ref="myform" :rules="rules" :model="myform" label-width="130px" label-position="left">
                        <el-form-item label="姓名:" prop="username">
                            <el-input v-model="myform.username"></el-input>
                        </el-form-item>
                        <el-form-item label="公司/学校/组织:" prop="company">
                            <el-input v-model="myform.company"></el-input>
                        </el-form-item>
                        <el-form-item label="职位:" prop="job">
                            <el-input v-model="myform.job"></el-input>
                        </el-form-item>
                        <el-form-item label="工作地址:" prop="job_addr">
                            <el-input v-model="myform.job_addr"></el-input>
                        </el-form-item>
                        <el-form-item label="工作电话:" prop="telephone">
                            <el-input v-model="myform.telephone"></el-input>
                        </el-form-item>
                        <el-form-item label="电子邮箱:" prop="email">
                            <el-input v-model="myform.email"></el-input>
                        </el-form-item>
                        <el-form-item label="个人主页:" prop="my_page">
                            <el-input v-model="myform.my_page"></el-input>
                        </el-form-item>
                        <el-form-item label="备注:" prop="remark">
                            <el-input v-model="myform.remark"></el-input>
                        </el-form-item>
                        
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('myform')">开始制作</el-button>
                            <el-button type="" @click="resetForm('myform')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            myform: {
                username: '',
                company: '',
                job: '',
                job_addr: '',
                telephone: '',
                email: '',
                my_page: '',
                remark: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { max: 6, message: '你名字有呢么长吗', trigger: 'blur' }
                ],
                company: [
                    { required: true, message: '请输入公司', trigger: 'blur' }
                ],
                telephone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '只能为11位', trigger: 'blur'}
                ]
            },
            myqrcode: ''
        }
    },
    mounted(){

    },
    methods: {
        submitForm(formName){
            var that = this;
            this.$refs[formName].validate((valid) => {
                if(valid){
                    that.createQRCode(that.myform, 'qrcode');
                }else{
                    that.$notify.error({
                        title: '错误',
                        message: '校验不通过'
                    });
                    return false;
                }
            });
        },
        //重置表单
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        //生成二维码
        createQRCode(obj, id){
            new QRCode(document.getElementById(id), {
                text: `BEGIN:VCARD
                        FN:${obj.username}
                        ORG:${obj.company}
                        TITLE:${obj.job}
                        ADR;WORK:${obj.job_addr}
                        TEL;WORK:${obj.telephone}
                        EMAIL;WORK:${obj.email}
                        URL:${obj.my_page}
                        NOTE:${obj.remark}
                        END:VCARD`,
                width: 200,
                height: 200,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.M  //容错级别
            });
        }
        
    }
}
</script>

<style scoped>
.fillcontain{
    padding: 10px;
    box-sizing: border-box;
}
.box{
    width: 500px;
    margin: 0 auto;
    border: 1px solid #eee;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 8px;
}
.el-col{
    text-align: center;
}
.myqrcode{
    text-align: center;
    
}
.myqrcode p{
    color: #444;
    text-shadow:5px 5px 8px green;
}
#qrcode{
    min-height: 200px;
    border-radius: 8px;
    border:1px solid #e5e5e5;
}
</style>

<style>
.myqrcode img{
    width: 200px;
    height:200px;
    margin: 20px auto;
}
</style>


