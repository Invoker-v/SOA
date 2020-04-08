<template>
  <div id="app">
    <myHeader></myHeader>
<!--    <leftPanel></leftPanel>-->
    <echarts></echarts>

  </div>
</template>


<script>
import echarts from './components/echarts.vue';
import myHeader from './components/header.vue';
// import leftPanel from './components/leftPanel.vue';
// import virus from './components/virus.vue';
// import scrollNews from './components/scrollNews.vue';
export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    myHeader,
    // leftPanel,
    echarts,

    // scrollNews
    // virus
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}


</style>
