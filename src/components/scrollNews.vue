<template>
    <div>
        <h2>新闻速递</h2>
        <div class="scrollNews">
            <transition name="slide">
                <p class="text" :key="text.id">{{text.val}}</p>
            </transition>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: 'scrollNews',
        data () {
            return {
                textArr: [

                ],
                number: 0
            }
        },
        computed: {
            text () {
                return {
                    id: this.number,
                    val: this.textArr[this.number]
                }
            }
        },
        mounted () {
            this.startMove()
            this.getNews()
        },
        methods: {
            startMove () {
                // eslint-disable-next-line
                let timer = setTimeout(() => {
                    if (this.number === this.textArr.length) {
                        this.number = 0;
                    } else {
                        this.number += 1;
                    }
                    this.startMove();
                }, 2000); // 滚动不需要停顿则将2000改成动画持续时间
            },
            getNews(){
                axios.get('https://lab.isaaclin.cn/nCoV/api/news').then(res=>{
                    // let news = []
                    res.data.results.forEach(item=>{
                            this.textArr.push(item.title)
                        }
                    );   //从接口获取到数据后，使用map()函数，进行接口数据映射
                })
            }
        }
    }
</script>

<style scoped>
    h2 {
        padding: 14px 0
    }
    .scrollNews {
        width: 100%;
        height: 40px;
        margin: 0 auto;
        overflow: scroll;
        position: relative;
        text-align: center;
    }
    .text {
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    .slide-enter-active, .slide-leave-active {
        transition: all 0.5s linear;
    }
    .slide-enter{
        transform: translateY(20px) scale(1);
        opacity: 1;
    }
    .slide-leave-to {
        transform: translateY(-20px) scale(0.8);
        opacity: 0;
    }
</style>
