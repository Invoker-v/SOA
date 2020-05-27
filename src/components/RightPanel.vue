<template>
    <div id="RightPanel">
        <div id="info-box" class="roundedRectangle"  v-if="showGroup" >
            <button  type="button" class="closeButton" aria-label="Close" v-on:click="showGroup=false" n><span aria-hidden="true">&times;</span></button>
            <div class="outer">
                <div  class="head"><span  > 新闻标题 </span></div>
                <div  class="content"> <p id="title" > {{cur_news.title}}} </p></div>
            </div>
            <div class="outer">
                <div class="head"> <span> 新闻概要 </span></div>
                <div class="content">  <p > {{cur_news.summary}}}</p> </div>
            </div>
            <div class="outer">
                <div class="head"><span> 新闻链接 </span></div>
            <div class="content"><a :href="cur_news.sourceUrl" target="_blank"> {{cur_news.sourceUrl}}></a></div>
            </div>

        </div>
        <span style="color:orange">今日新闻</span>  <input class="inputStyle" v-model="inputVal" type="text" placeholder="输入关键词">
        <div id = 'scrollPart'>
            <timeline>
            <timeline-item v-for="item in dayData"  :key="item.index"><a target="_blank" v-on:click="show(item)" style="color: white;" >{{item.title}}</a></timeline-item>
        </timeline>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import { Timeline, TimelineItem} from 'vue-cute-timeline';
    var TIME = []

    export default {
        data(){
            return {
                news: {},
                date: null,
                showGroup: false,
                cur_news: undefined,
                filt: '',
                inputVal: ''
            }
        },
        components: {
            Timeline,
            TimelineItem,
        },
        computed: {
            dayData: function() {
                if (this.date != null) {
                    return this.news[this.date].filter(n => n.title.includes(this.inputVal))
                }
                return []
            }
        },
        mounted() {
            document.body.addEventListener('click',()=>{
                this.groupShow = false;
            },false);
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
                this.date = TIME[TIME.length-1]
                this.$forceUpdate()
                // this.$set(this.date, 0, TIME[TIME.length-1])
            })
            this.$EventBus.$on("date", (index)=>{
                this.date = TIME[index]
                this.$forceUpdate()
                // this.$set(this.date, 0, TIME[index])
            })
            this.$EventBus.$on("timelinechanged", (index)=>{
                this.date = TIME[index]
                this.$forceUpdate()
                // this.$set(this.date , 0, TIME[index])
            })
        },
        methods:{
            show(news){
                this.showGroup = true;
                this.cur_news = news;
            }
        },
        watch:{
            inputVal(curVal, oldVal) {
                // 实现input连续输入，只发一次请求
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.filt = curVal;
                    console.log(oldVal)
                }, 300);
            }
        },
    }
</script>
<style scoped>
    .outer{
        height:auto;
        overflow: auto;
    }
    .head{
        width: 10%;
        font-family: "Microsoft YaHei";
        font-weight:bold;
        display: inline-block;
        float: left;
    }
    .content{
        width: 85%;
        float: left;
        display: inline-block;
        position: relative;
        /*margin-left: 10px;*/
    }
#info-box{
    width: 40%;
    height: 80%;
    top: 0%;
    left: 30%;
    position: fixed;
    font-size: 14px;
    text-align: left;
    background-color: rgba(1, 6, 17, 0.9);
    z-index: 1000000;
}
#RightPanel{
    color: white;
    height: 90%;
    width: 20%;
    font-size: 14px;
    position: absolute;
    overflow: hidden;
    top:10%;
    right: 0%;
    z-index: 2001;
    text-align: left;

}
#scrollPart{
    height: 100%;
    position: absolute;
    overflow: scroll;
}
.closeButton{
    position: absolute;
    right: 0%;
    top: 0%;
    /*background-color: transparent;*/
    border: 0px;
    appearance: none;
}
.roundedRectangle{
    height: 70px;
    width: 100px;
    margin-top: 100px;
    background: #9BD1FA;
    border-width: 10px;
    border-style: solid;
    border-radius: 15px;
    border-color: #000 #000 #000 #000;
}
.inputStyle{
        width: auto;
        margin-left: 20px;
        min-width: 50%;
        border: none;
        outline: none;
        text-indent: 3px;
        letter-spacing: 1px;
        color: white;
        background-color:  rgba(1, 6, 17, 0.9);
        /* border-bottom: 1px solid #6a7c9f; */
}
#scrollPart::-webkit-scrollbar{      display:none    }

</style>