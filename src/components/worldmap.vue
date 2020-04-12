<template>
    <div id="worldmap">
        <div ref="mapbox" style="height:100%;width:100%;margin:0 auto; position: absolute;"></div>
    </div>
</template>

<script>
import 'echarts/map/js/world'
import { EventBus } from "./eventBus.js";
import axios from "axios";

const baseOption = {
    backgroundColor: '#1a1a1a',
    timeline: {
        show:true,
        tooltip: {
            formatter: '{b}'
        },

        loop:false,
        axisType: 'category',
        playInterval: 500,
        data: []
    },
    grid: {
        left: '6%',
        top: '9%',
        bottom: "50%",
        right: '80% '
    },
    xAxis: {
        name: "area",
        type: 'value',
        boundaryGap: [0, 0.01],
        splitLine:{
            show:false
        },
        axisLabel:{
            color: "white",
        },
    },
    yAxis: {
        type: 'category',
        axisLabel:{
            color: "white",
        },
        boundaryGap: true,
        splitLine:{
            show:false
        },
    },
    // dataZoom: [
    //     {
    //         show: true,
    //         start: 0,
    //         end: 100,
    //         height:10
    //     },
    //     {
    //         type: 'inside',
    //         start: 0,
    //         end: 100
    //     },
    //     {
    //         show: true,
    //         yAxisIndex: 0,
    //         filterMode: 'empty',
    //         width: 10,
    //         height: '80%',
    //         showDataShadow: false,
    //         start:90,
    //         end:100,
    //         left: '0%'
    //     }
    // ],
    title: {
        text: 'COVID-19',
        subtext: 'data from John Hopkins',
        sublink: 'https://www.baidu.com/',
        left: 'center',
        top: 10,
        right: '10%',
        itemGap: 0,
        textStyle: {
            fontSize: 40,
            color: '#eee'
        },
        subtextStyle: {
            fontSize: 15,
            color: 'gray'
        },
        z: 200
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            var value = (params.value + '').split('.');
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
            return params.name + '<br/>' + params.seriesName + ' : ' + value;
        }
    },
    toolbox: {
        show: false,
    },
    geo: {
        map: 'world',
        roam: true,
        label: {
            emphasis: {
                show: false
            }
        },
        show: false,
        silent: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    visualMap: {
        type: 'continuous', // continuous 类型为连续型  piecewise 类型为分段型
        show: true, // 是否显示 visualMap-continuous 组件 如果设置为 false，不会显示，但是数据映射的功能还存在
        // 指定 visualMapContinuous 组件的允许的最小/大值。'min'/'max' 必须用户指定。
        // [visualMap.min, visualMax.max] 形成了视觉映射的『定义域』
        min: 1,
        max: 10000,
        // 文本样式
        textStyle: {
            fontSize: 14,
            color: '#fff'
        },
        right: '15%',
        bottom: '5%',
        realtime: false, // 拖拽时，是否实时更新
        calculable: true, // 是否显示拖拽用的手柄
        // 定义 在选中范围中 的视觉元素
        inRange: {
            color: ['#f9d2ab', 'orange', '#ff0112', '#370306'] // 图元的颜色
        }
    },
    series : [{
        name: "confirmed",
        type: 'map',
        mapType: 'world',
        roam:true,
        itemStyle: {
            borderWidth: 0.5,
            borderColor: '#000',
            borderType: 'solid'
        },
        zlevel:-1
    },{
        name: 'confirmed',
        animationThreshold: 20000000,
        type: 'bar',
        stack: 'total',
        color: 'rgba(255,0,0,0.2)',
    },
        {
            name: 'recovered',
            animationThreshold: 20000000,
            type: 'bar',
            stack: 'total',
            color: 'rgba(125,255,22,0.2)',
        },
        {
            name: 'death',
            animationThreshold: 20000000,
            type: 'bar',
            stack: 'total',
            color: 'rgba(242,232,255,0.4)',
        },
        {
            name: '比例',
            type: 'pie',
            radius: '30%',
            center:['10%', '75%'],
            data: []
        }
    ],
}
var options = []
function getLocalTime(nS) {
    return new Date(parseInt(nS) ).toLocaleString().replace(/:\d{1,2}$/,' ').split(" ")[0];
}
export default {
    name: "worldmap",
    mounted() {
        //template挂载到页面时调用
        this.mychart = this.$echarts.init(this.$refs.mapbox);
        this.mychart.showLoading({
            text: '数据加载中，请耐心等待',
            textColor: 'white',
            color: '#c23531',
            maskColor: 'rgba(0, 0, 0, 0.8)',
        })
        this.getData(); //执行getData方法
        this.mychart.setOption({baseOption:baseOption, options:options});
        EventBus.$on("date", (dataIndex) => {
            // A发送来的消息
            this.mychart.setOption({timeline:[{currentIndex:dataIndex}]})
        });
    },
    methods: {
        processData(rawData){
            var data = {}
            rawData.forEach(item=>{
                var date = getLocalTime(item.updateTime)
                var country = item.name
                var c = item.currentConfirmedCount
                var r = item.curedCount
                var d = item.deadCount

                c += r + d
                if (!data[date]){
                    data[date] = {}
                }
                if (!data[date][country])
                    data[date][country] = [c, r, d]

            })
            return data
        },
        getData() {
            axios.get("/api/record/all").then(res => {
                var timeline_data = []
                var time_data = []
                var datas =  this.processData(res.data)

                for (var date in datas){
                    timeline_data.push(date)
                    var series = [{data:[]},{data:[]},{data:[]},{data:[]}, {data:[]}];
                    var data  = []
                    for (var key in datas[date]){
                        var s = datas[date][key]
                        series[0].data.push({name:key, value:s[0]})
                        data.push({name:name, c:s[0], r:s[1], d:s[2]})
                    }
                    data.sort((a, b) => b.c-a.c)
                    var cnt = data.length > 10 ? 10 : data.length
                    var option={
                        yAxis:{
                            data:[]
                        },
                        series:[]
                    }
                    var cs = 0, rs = 0, ds = 0;
                    for (var i = 0; i < data.length; ++i) {
                        if (i < cnt) {
                            option.yAxis.data.push(data[cnt - 1 - i].name)
                            series[1].data.push({
                                value: data[cnt - 1 - i].c - data[cnt - 1 - i].r - data[cnt - 1 - i].d,
                                visualMap: false
                            })
                            series[2].data.push({value: data[cnt - 1 - i].r, visualMap: false})
                            series[3].data.push({value: data[cnt - 1 - i].d, visualMap: false})
                        }
                        cs += data[i].c
                        rs += data[i].r
                        ds += data[i].d
                    }
                    series[4].data = [{value:cs+rs+ds, name: "确诊", visualMap: false}, {value:rs, name:"治愈", itemStyle:{color:"green"}, visualMap: false}, {value: ds, name: "死亡", visualMap: false}]
                    time_data.push({date:date, data:[cs,rs,ds]})
                    console.log(time_data)
                    option.series = series
                    options.push(option);
                }
                EventBus.$emit('time_data',time_data)
                baseOption.timeline.data = timeline_data
                baseOption.timeline.currentIndex = timeline_data.length - 1;
                this.mychart.hideLoading()
                this.mychart.setOption({baseOption:baseOption, options:options}); //这行代码    能执行的前提是DOM已经渲染完成，只有DOM已渲染完成才能echarts初始化
            });
        }
    },
    beforeDestroy(){
        this.mychart.clear()
    }
};

</script>


<style scoped>
    #worldmap {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0%;
        z-index: 1;
        background-color: rgba(3, 2, 28, 0.6);
    }
</style>
