<template>
    <div :id="id" style="width:100%; height: 400px;"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    data(){
        return {
            myChart: null,
        }
    },
    props: ['id'],
    mounted(){
        this.myChart = echarts.init(document.getElementById(this.id));
        this.myChart.setOption(this.readyLineOption());
    },
    beforeDestroy(){
        if (!this.myChart) {
            return
        }
        this.myChart.dispose();
        this.myChart = null;
    },
    methods: {
        readyLineOption(){
            let options = {
                legend: {
                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
                },
                xAxis: {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    boundaryGap : false,  //设置坐标原点之间不留空， 即周一与y轴都在原点位置
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'axis',  //坐标轴触发
                    axisPointer: { // 坐标轴指示器配置项，hover坐标轴时的配置，坐标轴触发有效
                        type: 'cross',  // 默认为直线，可选为：'line' | 'shadow' | 'cross' | 'none'
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                toolbox: { 
                    show: true,
                    feature: {
                        saveAsImage: {
                            title: '保存图片'
                        },
                        magicType: { //切换数据图类型
                            type: ['line','bar']
                        }
                    },
                    right: '3%'
                },
                grid: {  //设置图表与容器的间隔
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true  //是否包含坐标轴的刻度标签。
                },
                series: [
                    {
                        type: 'line',
                        name:'邮件营销',
                        areaStyle: {},   //区域填充样式， 不开启则不会填充
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        type: 'line',
                        name:'联盟广告',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        type: 'line',
                        name:'视频广告',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        type: 'line',
                        name:'直接访问',
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        type: 'line',
                        name:'搜索引擎',
                        label: { //在线上显示数据
                            show: true,
                            position: 'top'
                        },
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            }
            return options;
        }
    },
    watch: {
        id:()=>{
            this.readyLineOption();
        }
    }

}
</script>


<style>

</style>
