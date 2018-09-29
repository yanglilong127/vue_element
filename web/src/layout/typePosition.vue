<template>
    <div class="fillcontainer">
        <el-row :gutter="10"> 
          <el-col :span="12">
               <div id="typePosition1"></div> 
          </el-col>
           <el-col :span="12">
               <div id="typePosition2"></div> 
          </el-col>
       </el-row>
    </div>
</template>

<script>
import echarts from 'echarts';

export default {
    data(){
        return {
            myCharts1: null,
            myCharts2: null,
        }
    },
    mounted(){
        var that = this;
        this.myCharts1 = echarts.init(document.getElementById('typePosition1'));
        this.myCharts2 = echarts.init(document.getElementById('typePosition2'));

        this.myCharts1.setOption(that.readPolarOption1());
        this.myCharts2.setOption(that.readPolarOption2());
        
        var resizeTimer = null;
        // 保证页面在放大或缩小时，也能够动态的显示数据
        window.onresize = function() {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                //触发echarts的resize事件
                that.myCharts1.resize();
                that.myCharts2.resize();
            }, 100);
        }
        //就是
        /* this.$nextTick(()=>{
            
        }); */
        
    },
    methods: {
        readPolarOption1(){
            //极坐标系下的堆叠柱状图
            var options = {
                tooltip: {
                    tigger: 'item'
                },
                legend: {
                    left: 'center',
                    show: true,
                    data: ['储蓄', '基金', '股票','债券','期货']
                },
                angleAxis: {},
                radiusAxis: {
                    type: 'category',
                    data: ['2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年'],
                    z: 10, //层级
                    axisLabel: {
                        rotate: 45 //坐标轴名称旋转45度
                    }
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    right: 30,
                    feature: {
                        saveAsImage: {
                            title: '保存图片'
                        },
                        dataView: {
                            readOnly: true
                        }
                    }
                }, 
                polar: {},  //极坐标时这个属性必须要加
                series: [
                    {
                        type: 'bar',
                        data: [80, 20, 30, 40, 70, 50, 10],
                        coordinateSystem: 'polar',
                        name: '储蓄',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [60, 40, 60, 10, 30, 20, 10],
                        coordinateSystem: 'polar',
                        name: '基金',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [10, 80, 30, 40, 50, 20, 50],
                        coordinateSystem: 'polar',
                        name: '股票',
                        stack: 'a'
                    },{
                        type: 'bar',
                        data: [60, 20, 10, 80, 30, 20, 50],
                        coordinateSystem: 'polar',
                        name: '债券',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [90, 20, 10, 40, 10, 20, 50],
                        coordinateSystem: 'polar',
                        name: '期货',
                        stack: 'a'
                    }
                ]
            };
            return options;
        },
        readPolarOption2(){
            let options = {
                title: {},
                legend: {
                    left: 'center',
                    data: ['储蓄', '基金', '股票','债券','期货']
                },
                polar: {},
                tooltip: {
                    trigger: 'item',
                    show: true
                },
                angleAxis: {
                    type: 'category',
                    data: ['2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年'],
                    z: 10
                },
                radiusAxis: {
                    z: 10
                },
                series: [
                    {
                        type: 'bar',
                        data: [80, 20, 30, 40, 70, 50, 10],
                        coordinateSystem: 'polar',
                        name: '储蓄',
                        stack: 'a'
                    },{
                        type: 'bar',
                        data: [60, 40, 60, 10, 30, 20, 10],
                        coordinateSystem: 'polar',
                        name: '基金',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [10, 80, 30, 40, 50, 20, 50],
                        coordinateSystem: 'polar',
                        name: '股票',
                        stack: 'a'
                    },{
                        type: 'bar',
                        data: [60, 20, 10, 80, 30, 20, 50],
                        coordinateSystem: 'polar',
                        name: '债券',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [90, 20, 10, 40, 10, 20, 50],
                        coordinateSystem: 'polar',
                        name: '期货',
                        stack: 'a'
                    }
                ]
            };
            return options;
        }
    },
}
</script>

<style scoped>
#typePosition1,#typePosition2 {
    position: relative;
    width: 90%;
    height: 530px;
    margin: 10px auto;
    box-shadow: 0 0 10px #A6E3E9;
    border-radius: 10px;
}	
</style>


