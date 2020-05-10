<template>
    <div id="RightPanel">
        <timeline>
            <timeline-title style="color: orange">今日新闻</timeline-title>
            <timeline-item v-for="item in news[date[0]]"  :key="item.index" ><a target="_blank" :href="item.sourceUrl" style="color: white;">{{item.title}}</a></timeline-item>
        </timeline>
    </div>
</template>
<script>
    import axios from "axios";
    import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
    var TIME = []
    export default {
        data(){
            return {
                news: {},
                date: [null]
            }
        },
        components: {
            Timeline,
            TimelineItem,
            TimelineTitle
        },
        mounted() {
            axios.get('/api/news/all').then(res => {
                var news = {}
                for (var date in res.data) {
                    news[date] = []
                    res.data[date].forEach(item=>{
                        news[date].push(item)
                    })
                }
                this.news = news
            })
            this.$EventBus.$on("time", (time)=>{
                TIME = time
                this.$set(this.date, 0, TIME[TIME.length-1])
            })
            this.$EventBus.$on("date", (index)=>{
                this.$set(this.date, 0, TIME[index])
            })
            this.$EventBus.$on("timelinechanged", (index)=>{
                this.$set(this.date , 0, TIME[index])
            })
        }
    }
</script>
<style scoped>
#RightPanel{
    color: white;
    width: 20%;
    overflow: scroll;
    font-size: 14px;
    position: absolute;
    top:10%;
    right: 0%;
    z-index: 1000;
    text-align: left;

}
#RightPanel::-webkit-scrollbar{      display:none    }
</style>