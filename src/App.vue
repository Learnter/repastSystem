<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  overflow-x:hidden;
  overflow-y:hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:#191919;
  width:100vw;
  height:100vh;
  overflow: hidden;
  box-sizing: border-box; 
  min-width:1290px;
}

/* chrome 浏览器隐藏滚动条 */
/* *::-webkit-scrollbar { 
  display:none} */
</style>
