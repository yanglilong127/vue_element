<template>
    <div class="fillcontainer">
        <div :id="id" class="echartsPosition"></div> 
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    data(){
        return {
            myCharts: null,
        }
    },
    props: {
        id: {
            type: String,
            default: 'incomePayPosition'
        }
    },
    mounted(){
        this.myCharts = echarts.init(document.getElementById(this.id));
        this.myCharts.setOption(this.getOption());
    },
    methods: {
        getOption(){
            function getData(n, max){
                var data = [];
                for(let i=0; i<n; i++){
                    data.push(Math.round(Math.random()*max));
                }
                return data;
            }
            let options = {
                title: {
                    text: '收支统计',
                    subtext: '单位/万元'
                },
                legend: {
                    data: ['收入', '支出', '平均'],
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['1月份','2月份','3月份','4月份','5月份','6月份','7月份','8月份','9月份','10月份','11月份','12月份']
                },
                yAxis: {
                    type: 'value'
                },
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        height: 30,
                        start: 1,
                        end: 90,
                        borderColor: '#339999',
                        handleStyle: {
                            color: '#336699'
                        },
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        stack: '总量',
                        name: '收入',
                        barWidth: 20,
                        data: getData(12, 6000)
                    },{
                        type: 'bar',
                        stack: '总量',
                        name: '支出',
                        barWidth: 20,
                        data: getData(12, 2000)
                    },{
                        type: 'line',
                        name: '平均',
                        data: getData(12, 10000)
                    }
                ]
            };
            return options;
        }
    }
}
</script>

<style>

</style>


