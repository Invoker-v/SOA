<template>
    <div id="header">
        <div id="titleContainer"><span id="headerTitle">新冠病毒疫情动态信息</span></div>
        <div id="timeContainer">
            <span id="date"></span>
            <span id="clock"></span>
        </div>
    </div>
</template>

<script>
    import $ from  'jquery'
    setInterval(function(){
        var date = new Date();
        var y = date.getFullYear();
        var m =date.getMonth()+1;
        var d = date.getDate();
        var w = date.getDay();
        var ww = ' 星期'+'日一二三四五六'.charAt(w) ;//星期几
        var h = date.getHours();
        var minute = date.getMinutes()
        var s = date.getSeconds(); //秒
        var sss = date.getMilliseconds() ; //毫秒
        if(m<10){
            m = "0"+m;
        }
        if(d<10){
            d = "0"+d;
        }
        if(h<10){
            h = "0"+h;
        }
        if(minute<10){
            minute = "0"+minute;
        }
        if(s<10){
            s = "0"+s;
        }
        if(sss<10){
            sss = "00"+sss;
        }else if(sss<100){
            sss = "0"+sss;
        }
        let html = "";
        html = html + '<span style="float:left">' + h + "</span>";
        html =
            html +
            '<span id="online" style="width:16px; display:block; float:left">' +
            ": " +
            "</span>";
        html = html + '<span style="float:left">' + minute + "</span>";
        html =
            html +
            '<span id="online2" style="width:16px; display:block; float:left">' +
            ": " +
            "</span>";
        html = html + '<span style="float:left">' + s + "</span>";
        $("#date").text(y + " " + m + " " + d + " " + ww);
        $("#clock").html(html);
    },1000);


    export default {
        name: "header.vue"
    }
</script>

<style scoped>
    #header {
        position: fixed;
        z-index: 2;
        width: 100%;
        background-color: rgba(1, 6, 17, 0.6);
        height: 9%;
    }
    #titleContainer {
        float: left;
        margin: 1% auto auto auto;
        border-right: 1px solid #fff;
        padding-right: 1%;
    }
    #headerTitle {
        letter-spacing: 3.5px;
        color: #fff;
        font-size: 0.28rem;
        line-height: 46px;
        display: block;
    }
    #timeContainer {
        float: left;
        text-align: center;
        margin-left: 1%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #date {
        display: block;
        font-size: 15px;
        font-weight: normal;
        line-height: 24px;
        color: #fff;
    }
    #clock {
        display: block;
        letter-spacing: 3.5px;
        color: #fff;
        font-size: 0.28rem;
        line-height: 0.28rem;
    }
</style>