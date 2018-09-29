<template>
    <div class="info_container">
        <!--个人信息栏-->
        <el-row :gutter="10">
            <el-col :span="12" class="upload_row upload_row_avator">
                <div class="grid-content">
                    <img :src="avatarPic? avatarPic: 'images/avatar1.jpg'" alt="" class="my_avatar">
                </div>
            </el-col>
            <el-col :span="12" class="upload_row">
                <div class="grid-content info">
                    <p>姓名: <span>{{fullname}}</span></p>
                    <p>性别: <span>{{Math.random()>0.6? '女': '男'}}</span></p>
                    <p>年龄: <span>{{Math.round(Math.random()*15+15)}}</span></p>
                    <p>昵称: <span>{{nickname}}</span></p>
                    <p>投资年限: <span>{{Math.ceil(Math.random()*10)}}年</span></p>
                    <p>绑定手机: <span>{{telephone}}</span></p> 
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :before-upload="beforeupload"
                        accept="image/*">
                        <el-button size="small" type="primary">点击上传图像</el-button>
                    </el-upload>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return {
            //fullname: '',
            nickname: '',
            telephone: ''
        }
    },
    computed: {
        ...mapGetters(['avatarPic']),
        fullname(){
            return JSON.parse(localStorage.getItem('userinfo')).username;
        }
    },
    mounted(){
        this.nickname = this.getNickname();
        this.telephone = this.getPhoneNum();
    },
    methods:{
        //起昵称
        getNickname(length=10){
            var wordArr = ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f',
                        'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w',
                        'x','y','z'];
            var nickname = '';
            for(let i=0; i<length; i++){
                let chosen = wordArr[Math.floor(Math.random()*wordArr.length)];
                nickname += Math.random()>0.6? chosen.toUpperCase(): chosen;
            }
            return nickname;
        },
        //随机返回电话号码
        getPhoneNum(){
            var telenum = '1';
            for(let i=1; i<11; i++){
                let num;
                if(i>2 && i<7){
                    num = 'x';
                }else{
                   num = Math.round(Math.random()*9);
                } 
                telenum += num;
            }
            return telenum;
        },
        /* shout: function(){
            //this.$refs.file_cli.click(); //触发input框的点击事件
        }, */
        beforeupload(file){
            var that = this;
            var reader = new FileReader();
            reader.readAsDataURL(file); //将其转为base64位
            reader.onload = function(e){
                var imgFile = e.target.result;
                //that.$refs.avatar.src = imgFile;
                that.$store.dispatch('setAvatar', imgFile);
                var userinfo = JSON.parse(localStorage.getItem('userinfo'));
                //console.log(userinfo);
                var nickname = userinfo.username; 
                that.$http
                .post('/api/user/modifyAvatar',
                    that.$qs.stringify({
                        nickname: nickname,
                        avatarPic: imgFile
                    })
                )
                .then(response => {
                    //console.log(response.data)
                })
                .catch(ex => {
                    console.log(ex);
                })
            }
            return false;
        }
    }
}
</script>

<style scoped>
.info_container{
    padding: 10px;
    box-sizing: border-box;
}
.upload_row{
    height: 200px;
    box-sizing: border-box;
    .my_avatar{
        height: 180px;
        width: 180px;
        border: 1px solid #999;
        border-radius:50%;
        box-shadow:0 0 10px rgba(153,235,19,0.7)
    }
}
.upload_row_avator{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right:1px dashed #444;
}
.upload_row .info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p{
        line-height: 25px;
        color: #999;
        text-shadow:0 0 8px #eee;
    }
}
.file_inp{
    display: none;
}
</style>


