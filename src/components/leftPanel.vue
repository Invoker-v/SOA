<template>
    <div id="leftPanel">
        <div ref="barbox" style="height:100%;width:100%;margin:0 auto; position: absolute;"></div>
    </div>
</template>

<script>
    import axios from "axios";
    var option = {
        title: {
            text: 'Total Confirmed Rank',
            textStyle:{
                color:'white',
            },
        },
        textStyle:{
            color:'white',
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                start: 0,
                end: 100,
                handleSize: 8
            },
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                type: 'slider',
                show: false,
                yAxisIndex: 0,
                filterMode: 'filter',
                width: 12,
                height: '70%',
                handleSize: 8,
                showDataShadow: false,
                left: '93%'
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            textStyle:{
                color: "white"
            },
            data: []
        },
        series: [
            {
                name: 'confirmed',
                type: 'bar',
                stack: 'total',
                color: 'red',
                data: []
            },
            {
                name: 'recovered',
                type: 'bar',
                stack: 'total',
                color: 'green',
                data: []
            },
            {
                name: 'death',
                type: 'bar',
                stack: 'total',
                color: 'gray',
                data: []
            },
        ]
    };

    export default {
        name: "leftPanel",
        mounted() {
            //template挂载到页面时调用
            this.mychart = this.$echarts.init(this.$refs.barbox);
            this.mychart.showLoading()
            this.getData()
            this.mychart.setOption(option);
        },
        methods: {
            getData(){
                var data = []
                axios.get("http://123.56.229.91:8080/data/global_last").then(res => {
                    for (var key in res.data.data){
                        var name = key;
                        if (name == 'Mainland China')
                            name = 'China'
                        else if (name == 'US')
                            name = 'United States'
                        else if (name == 'South Sudan')
                            name = 'S. Sudan'
                        var s = this.stats(res.data.data[key])
                        data.push({name:name, c:s[0], r:s[1], d:s[2]})
                    }
                    data.sort((a, b) => b.c-a.c)
                    var cnt = 20
                    for (var i = 0; i < cnt; ++i) {
                        option.yAxis.data.push(data[cnt-1-i].name)
                        option.series[0].data.push(data[cnt-1-i].c - data[cnt-1-i].r- data[cnt-1-i].d)
                        option.series[1].data.push(data[cnt-1-i].r)
                        option.series[2].data.push(data[cnt-1-i].d)
                    }
                    this.mychart.hideLoading()
                    this.mychart.setOption(option)
                })

            }
        }
    }
</script>


<style scoped>
    #leftPanel {
        position: fixed;
        width: 20%;
        height: 91%;
        left: 0;
        top: 9%;
        z-index: 2000;
        background-color: rgba(1, 6, 17, 0.2);
    }
</style>