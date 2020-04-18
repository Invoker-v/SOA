<template>
    <div id="RightPanel">
        <timeline>
            <timeline-title>今日新闻</timeline-title>
            <timeline-item v-for="item in news[index[0]]" :key="item.index" style="color: white;">{{item}}</timeline-item>
        </timeline>
    </div>
</template>
<script>
    import axios from "axios";
    import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
    export default {
        data(){
            return {
                news: [],
                index: [0]
            }
        },
        components: {
            Timeline,
            TimelineItem,
            TimelineTitle
        },
        mounted() {
            axios.get('/api/news/all').then(res => {
                var news = []
                var i  = 0

                for (var time in res.data) {
                    news.push([])
                    res.data[time].forEach(item=>{
                        news[i].push(item.title)
                    })
                    i += 1
                }
                this.news = news
            })
            this.$EventBus.$on("date", (index)=>{
                console.log(this.index)
                this.$set(this.index, 0, index)
            })
            this.$EventBus.$on("timelinechanged", (index)=>{
                console.log(index)
                this.$set(this.index , 0, index)
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