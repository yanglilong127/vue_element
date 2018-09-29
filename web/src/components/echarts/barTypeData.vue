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
        this.myChart.setOption(this.readyBarOption());
    },
    beforeDestroy(){
        if (!this.myChart) {
            return
        }
        this.myChart.dispose();
        this.myChart = null;
    },
    methods: {
        readyBarOption(){
            var dataOptions = {
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度'],
                selected: function(){
                    var selected = {};
                    for(var i=0; i<this.data.length; i++){
                        //selected[this.data[i]] = Math.random() > 0.65;
                        selected[this.data[i]] = true;  //全部选中
                    }
                    return selected;
                }
            };
            let options = {
                title: {
                    text: '数据对比图1',
                    subtext: '纯属虚构',
                    top: 10,
                    left: 'center'
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 20,
                    data: dataOptions.data,
                    selected: dataOptions.selected()
                },
                xAxis: {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'axis',  //坐标轴触发
                    axisPointer: { // 坐标轴指示器配置项，hover坐标轴时的配置，坐标轴触发有效
                        type: 'shadow'  // 默认为直线，可选为：'line' | 'shadow' | 'cross' | 'none'
                    }
                },
                grid: {  //设置图表与容器的间隔
                    left: '3%',
                    right: '14%',
                    bottom: '3%',
                    containLabel: true  //是否包含坐标轴的刻度标签。
                },
                series: [
                    {
                        type: 'bar',
                        name: '直接访问',
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'邮件营销',
                        type:'bar',
                        stack: '广告',   //数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'bar',
                        stack: '广告',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'bar',
                        stack: '广告',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'搜索引擎',
                        type:'bar',
                        data:[862, 1018, 964, 1026, 1679, 1600, 1570],
                        markLine : {
                            lineStyle: {
                                type: 'dashed'
                            },
                            data : [
                                [{type : 'min'}, {type : 'max'}]
                            ]
                        }
                    },
                    {
                        name:'百度',
                        type:'bar',
                        barWidth : 5,
                        stack: '搜索引擎',
                        data:[620, 732, 701, 734, 1090, 1130, 1120]
                    }
                ]
            }
            return options;
        }
    },
    watch: {
        id:()=>{
            this.readyBarOption();
        }
    }

}
</script>


<style>

</style>
