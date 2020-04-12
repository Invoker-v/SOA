<template>
    <div id="RightPanel">
        <timeline>
            <timeline-title>今日新闻</timeline-title>
            <timeline-item v-for="item in news" :key="item.index">{{item}}</timeline-item>
        </timeline>
    </div>
</template>
<script>
    import axios from "axios";
    import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
    var news = []

    export default {
        data(){
            return {
                news: news
            }
        },
        components: {
            Timeline,
            TimelineItem,
            TimelineTitle
        },
        mounted() {
            axios.get('https://lab.isaaclin.cn/nCoV/api/news').then(res => {
                news = []
                res.data.results.forEach(item => {
                        news.push(item.title)
                    }
                );   //从接口获取到数据后，使用map()函数，进行接口数据映射
            })
        },
        methods:{
            getNews(){
                return news;
            }
        }
    }
</script>
<style scoped>
#RightPanel{
    color: white;
    font-size: 16px;
    position: fixed;
    top:10%;
    right: 10%;
    z-index: 2000;
}
</style>