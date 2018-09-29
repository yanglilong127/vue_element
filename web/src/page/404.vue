<template>
    <div class="nofundcontain">
    <h3>What have you done?</h3>
        <h1>404</h1>
        <h3>!ERROR PAGE!</h3>
        <el-alert
        title="该页面不存在"
        type="error"
        show-icon center :closable="false">
      </el-alert>
    </div>
</template>

<script>

    export default {
        data(){
            return {
            
            }
        }
              
    }
</script>

<style scoped>
.nofundcontain{ 
    text-align: center;
    background: #B397FE;
    color: #fff;
}
h1{
    line-height: 80px;
    font-size:80px;
}
h3{
    line-height: 40px;
    font-size: 30px;
}
</style>