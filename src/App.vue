<template>
  <div id="app">
    <myHeader></myHeader>
    <worldmap></worldmap>
    <BotPanel></BotPanel>
  </div>
</template>


<script>
import worldmap from './components/worldmap.vue';
import myHeader from './components/header.vue';
import BotPanel from './components/BotPanel.vue';
// import virus from './components/virus.vue';
// import scrollNews from './components/scrollNews.vue';
export default {
  name: 'App',
  components: {
    myHeader,
    BotPanel,
    worldmap,
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
