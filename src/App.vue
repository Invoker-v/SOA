<template>

  <div id="app">
    <scrollNews> </scrollNews>
    <echarts></echarts>
    <virus></virus>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import echarts from './components/echarts.vue'
import virus from './components/virus.vue'
import scrollNews from './components/scrollNews.vue'
export default {
  name: 'App',
  components: {
    echarts,
    scrollNews,
    virus
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
  margin-top: 60px;
}
</style>
