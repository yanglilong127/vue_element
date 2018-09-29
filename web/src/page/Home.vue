<template>
    <div class="home_page">
        <head-nav></head-nav>
        <div class="left-fixed-right-auto">
            <left-menu></left-menu>
            <div class="content_page" 
                :style="{'margin-left':sliderWidth,
                         'width':win_size.width+'px',
                         'height':win_size.height+'px'}">
                <div class="content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { LeftMenu,HeadNav } from '../layout';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'home',
    data(){
        return {
            win_size: {
                width: '',
                height: ''
            }
        }
    },
    computed: mapGetters([
        'sliderWidth'
    ]),
    components: {
        HeadNav, 
        LeftMenu
    },
    methods: {
        //用于自适配窗口页面大小
        setSize() {
            this.win_size = {
                height:document.body.clientHeight-73,
                width:document.body.clientWidth-183
            }
            //将content部分的宽高，存入store中，
            this.$store.dispatch('set_win_content',this.win_size); //触发动作，content部分的宽高也随即改变。
        },
    },
    created(){
        this.setSize();
    },
    mounted(){
        //console.log(this.$store.state)
        window.onresize = () => {
            this.setSize();
        }
    }

}
</script>

<style scoped>
.content_page{
    position: fixed;
    top:71px;
    background: #FFF;
    overflow:auto;
}
.content{
    width:100%;
    height:100%;
}
</style>


