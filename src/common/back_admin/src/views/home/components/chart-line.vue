<template>
    <div class="chart-line" ref="chartLine">111</div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/grid';
    import 'echarts/lib/component/markPoint'
    
    export default {
        props: {
            lineList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                chart: {},
                lbList: [],
                dataList: []
            };
        },
        mounted() {
            this.bindData();
            this.chart = echarts.init(this.$refs.chartLine);
            setTimeout(() => {
                this.setDefaultOption();
            }, 100);
        },
        methods: {  
            bindData() {
                let lbList = [];
                let dataList = [];
                for(let item of this.lineList){
                    lbList.push(this.globalFun.dateFormat(item.browsDate, 'MM-dd'));
                    dataList.push(item.browsCount);
                }
                this.lbList = lbList.reverse();
                this.dataList = dataList.reverse();
                
            },
            // 绘制饼状图
            setDefaultOption(){

                var _this = this;
                _this.chart.setOption({
                   
                    xAxis: {
                        type: 'category',
                        data: _this.lbList
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel:{  
                            formatter : function(v) { 
                               return v
                            }  
                        }, 
                        axisLine:{
                            show:false
                        },
                        splitLine:{
                            lineStyle:{
                            type:'dashed'
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    grid: {
                        left: '2%',
                        right: '2%',
                        bottom: '0%',
                        containLabel: true
                    },
                    series: [{
                        data: _this.dataList,
                        type: 'line'
                    }]
                });
            }
        },
        components: {}
    }
</script>

<style lang="less" scoped="scoped">
    .chart-line {
        width: 100%;
        height: 500px;
    }
</style>