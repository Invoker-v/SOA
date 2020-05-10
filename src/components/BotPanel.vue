<template>
    <div id="BotPanel">
        <div ref="barbox" style="height:100%;width:100%;margin:0 auto; position: absolute;"></div>
    </div>
</template>

<script>
    // import axios from "axios";
    // import { EventBus } from "./eventBus.js";
    var option = {
        title: {
            text: '世界疫情统计'
        },
        tooltip: {
            trigger: 'axis',
            triggerOn: 'click|mousemove',
            formatter: function (params) {
                var date = new Date(params[0].name);
                var text = ""
                text +=  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
                for (var i = 0; i < params.length; ++i)
                    text +=  "<br>" + params[i].seriesName+ ' : ' + params[i].value;
                return text
            },
            textStyle:{
                align:'left'
            },
            axisPointer: {
                animation: true
            }
        },
        grid:{
            left: "10%",
            right: "5%",
            bottom:"10%"
        },
        legend: {
            data: [{name:'累计确诊', icon:"circle"}, {name:'累计治愈', icon:"rect"}, {name:'累计死亡', icon:"diamond"}],
            textStyle:{color:"white"}
        },
        xAxis: {
            type: 'category',
            splitLine: {
                show: false
            },
            textStyle:{color:"white"},
            data:[]
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            textStyle:{color:"white"},

            splitLine: {
                show: true
            }
        },
        series: [{
            name: '累计确诊',
            type: 'line',
            showSymbol: true,
            lineStyle:{
                color: "red"
            },
            data:[]
        },
            {
                name: '累计治愈',
                type: 'line',
                showSymbol: true,
                lineStyle:{
                    color: "green"
                },
                data:[]
            },
            {
                name: '累计死亡',
                type: 'line',
                showSymbol: true,
                data:[]
            }
        ]
    };

    export default {
        name: "BotPanel",
        mounted() {
            //template挂载到页面时调用
            this.mychart = this.$echarts.init(this.$refs.barbox);
            this.mychart.showLoading({
                text: '',
                color: '#c23531',
                maskColor: 'rgba(0, 0, 0, 0.1)',
            })
            var out = this

            this.$EventBus.$on("time_data", (time_data) => {
                // A发送来的消息
                option.series[0].data = []
                option.series[1].data = []
                option.series[2].data = []
                option.xAxis.data = []
                time_data.forEach(item=>{
                    option.xAxis.data.push({value:item.date, textStyle:{color: 'white'}})
                    for (var i = 0; i < 3; ++i)
                        option.series[i].data.push({value:item.data[i], textStyle:{color: 'white'}})
                })
                this.mychart.hideLoading()
                this.mychart.setOption(option)
            });
            this.$EventBus.$on("timelinechanged", (currentIndex)=>{
                this.mychart.dispatchAction({
                    type: 'showTip',
                    seriesIndex:0,
                    dataIndex: currentIndex
                })
            })
            this.$EventBus.$on("SwitchMap",  (time_data, region)=>{
                option.series[0].data = []
                option.series[1].data = []
                option.series[2].data = []
                option.xAxis.data = []
                time_data.forEach(item=>{
                    option.xAxis.data.push({value:item.date, textStyle:{color: 'white'}})
                    for (var i = 0; i < 3; ++i)
                        option.series[i].data.push({value:item.data[i], textStyle:{color: 'white'}})
                })
                this.mychart.setOption(option)
                this.mychart.setOption({title:[{text: region+"疫情统计"}]})
            }),
            this.mychart.on("click", function(param){
                if (param.dataIndex != undefined) {
                    out.$EventBus.$emit('date', param.dataIndex)
                }
            })
        },
        beforeDestroy(){
            this.mychart.clear()
        }
    }
</script>


<style scoped>
    #BotPanel {
        position: fixed;
        width: 60%;
        left: 20%;
        height: 35%;
        bottom: 0;
        top: 60%;
        z-index: 2000;
        background-color: rgba(1, 6, 17, 0.2);
    }
</style>