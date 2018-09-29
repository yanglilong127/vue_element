<template>
    <div :id='id' style="width:100%; height:280px;"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    data(){
        return {
            myChart: null
        }
    },
    mounted(){
        this.myChart = echarts.init(document.getElementById(this.id));
        this.myChart.setOption(this.readyPieOption(this.type));
    },
    props: ['id', 'type'],
    methods: {
        readyPieOption(type){
            let series_data = {};
            function selectedData(seriesData){
                var selected = {};
                for(let i=0; i<seriesData.length; i++){
                    selected[seriesData[i].name] = i<6;
                }
                return selected;
            }
            if(type == "ordertype"){
                series_data = {
                    text: "用户投资类型",
                    legend_data: ['基金','股票','债券','储蓄','期货'],
                    data: [
                        {value:335, name:'基金'},
                        {value:310, name:'股票'},
                        {value:234, name:'债券'},
                        {value:135, name:'储蓄'},
                        {value:1548, name:'期货'}
                    ]
                };
                series_data.selected = selectedData(series_data.data);
            }else{
                series_data = {
                    text: "用户投资区域",
                    legend_data: ['华东区','华南区','华中区','华北区','西南区','东北区','台港澳','小监利','小毛市'],
                    data: [
                        {value:335, name:'华东区'},
                        {value:310, name:'华南区'},
                        {value:234, name:'华中区'},
                        {value:835, name:'华北区'},
                        {value:1548, name:'西南区'},
                        {value:335, name:'东北区'},
                        {value:454, name:'台港澳'},
                        {value:250, name:'小监利'},
                        {value:350, name:'小毛市'}
                    ]
                }
                series_data.selected = selectedData(series_data.data)
            }
            let options = {
                title: {
                    text: series_data.text,
                    subtext: '纯属虚构',
                    left: 'center'
                },
                legend:{
                    data: series_data.legend_data,
                    left: 'left',
                    type: 'scroll',
                    orient: 'vertical',
                    top: 30,
                    bottom: 20,
                    itemGap: 20,
                    selected: series_data.selected
                },
                tooltip: {
                    tigger: 'item',
                    formatter: '{a}<br/>{b}: {c}({d}%)'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '50%'],
                        data: series_data.data,
                        hoverOffset: 20,  //高亮扇区偏移距离， 默认10
                        itemStyle: {},
                        emphasis: {  //鼠标覆盖上去的样式
                            shadowBlur: 200,
                            color: '#ffff00',
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                ]

            }
            return options;
        }
    },
    watch: {
        type:(v) => {
            this.readyPieOption(v);
        }
    }

}
</script>

<style>

</style>


