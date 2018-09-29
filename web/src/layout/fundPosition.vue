<template>
    <div class="fillcontainer">
        <div id="fundPosition" class="echartsPosition"></div> 
    </div>
</template>

<script>
import echarts from 'echarts';
import chinaJson from '../../../node_modules/echarts/map/json/china.json';

export default {
    data(){
        return {
            myCharts: null,
        }
    },
    mounted(){
        var that = this;
        echarts.registerMap('china', chinaJson);
        this.myCharts = echarts.init(document.getElementById('fundPosition'));

        this.myCharts.setOption(that.readyMapOption());
        
        var resizeTimer = null;
        // 保证页面在放大或缩小时，也能够动态的显示数据
        window.onresize = function() {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                //触发echarts的resize事件
                that.myCharts.resize();
            }, 100);
        }
        //就是
        /* this.$nextTick(()=>{
            
        }); */
        
    },
    methods: {
        readyMapOption(){
            var that = this;
            //console.log(this)
            let data =  [
                {name: '北京',value: that.randomData() },
                {name: '天津',value: that.randomData() },
                {name: '上海',value: that.randomData() },
                {name: '重庆',value: that.randomData() },
                {name: '河北',value: that.randomData() },
                {name: '河南',value: that.randomData() },
                {name: '云南',value: that.randomData() },
                {name: '辽宁',value: that.randomData() },
                {name: '黑龙江',value: that.randomData() },
                {name: '湖南',value: that.randomData() },
                {name: '安徽',value: that.randomData() },
                {name: '山东',value: that.randomData() },
                {name: '新疆',value: that.randomData() },
                {name: '江苏',value: that.randomData() },
                {name: '浙江',value: that.randomData() },
                {name: '江西',value: that.randomData() },
                {name: '湖北',value: that.randomData() },
                {name: '广西',value: that.randomData() },
                {name: '甘肃',value: that.randomData() },
                {name: '山西',value: that.randomData() },
                {name: '内蒙古',value: that.randomData() },
                {name: '陕西',value: that.randomData() },
                {name: '吉林',value: that.randomData() },
                {name: '福建',value: that.randomData() },
                {name: '贵州',value: that.randomData() },
                {name: '广东',value: that.randomData() },
                {name: '青海',value: that.randomData() },
                {name: '西藏',value: that.randomData() },
                {name: '四川',value: that.randomData() },
                {name: '宁夏',value: that.randomData() },
                {name: '海南',value: that.randomData() },
                {name: '台湾',value: that.randomData() },
                {name: '香港',value: that.randomData() },
                {name: '澳门',value: that.randomData() }
            ];
            var options = {
                title: {
                    text: new Date().getFullYear()+'年全国各省份投资情况',
                    subtext: '单位/万元',
                    left: 'center'
                },
                tooltip: {
                    tigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['总投资额']
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    feature: {
                        saveAsImage: {
                            title: '保存图片'
                        },
                        dataView: {
                            readOnly: true
                        }
                    }
                },
                visualMap: {  //也就是将数据映射到视觉元素（视觉通道）。
                    min: 0,
                    max: 1000000,
                    left: 'left',
                    top: 'bottom',
                    text:['高','低'],           // 文本，默认为数值文本
                    calculable : true
                },
                series: [
                    {
                        name: '总投资额',
                        type: 'map',
                        mapType: 'china',
                        label: {
                            show: true,
                            position: ['50%','50%']
                        },
                        data: data
                    }
                ]
                
            };
            return options;
        },
        randomData(){
            return Math.round(Math.random() *1000000);
        }
    },
}
</script>

<style>

</style>


