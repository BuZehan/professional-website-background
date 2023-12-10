<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {},
};
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
}
p{
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width:4px; /*高宽分别对应横竖滚动条的尺寸*/
  border-radius:2px;
  /* height: 5px; */
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background-color: #006effb9;
  border-radius: 5px;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ffffff;
}
</style>
