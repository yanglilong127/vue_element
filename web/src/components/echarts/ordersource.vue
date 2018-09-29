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
            if(type == "ordersource"){
                series_data = {
                    text: "用户投资途径",
                    legend_data: ['直达','营销广告','搜索引擎','邮件营销','联盟广告','谷歌'],
                    inner_data: [
                        {value:335, name:'直达', selected:true},
                        {value:679, name:'营销广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
					outer_data: [
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:634, name:'谷歌'}
					]
                };
            }else{
                series_data = {
                    text: "用户投资职业",
                    legend_data: ['金融人员','IT人员','保险人员','理财师','律师'],
                    inner_data: [
                        {value:335, name:'金融人员', selected:true},
                        {value:679, name:'IT人员'},
                        {value:1548, name:'保险人员'}
                    ],
					outer_data: [
						{value:310, name:'理财师'},
						{value:528, name:'律师'},
					]
                }
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
                    //itemGap: 20,
                    //selected: series_data.selected
                },
                tooltip: {
                    tigger: 'item',
                    formatter: '{a}<br/>{b}: {c}({d}%)'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: [0, '30%'],
                        center: ['50%', '50%'],
                        data: series_data.inner_data,
                        hoverOffset: 5,  //高亮扇区偏移距离， 默认10
                        emphasis: {  //鼠标覆盖上去的样式
                            shadowBlur: 200,
                            color: '#ffff00',
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        label: {
                            position: 'inner'
                        }
                    },
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50', '58%'],
                        center: ['50%', '50%'],
                        data: series_data.outer_data,
                        hoverOffset: 5,  //高亮扇区偏移距离， 默认10
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


