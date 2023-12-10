<template>
  <div id="aside">
    <el-menu
    :collapse="IsCollapse"
    background-color="#333"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="$route.name"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse-transition="false"
  >
    <h3 class="el-h3">{{ IsCollapse ? "后台" : "网络专业宣传管理" }}</h3>
    <!-- 无子菜单 -->
    <el-menu-item v-if="item.label ==='数据展示'"
      @click="clickMenu(item)"
      :index="item.name"
      v-for="(item, index) in noChildrenMenu"
      :key="item.name"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 有子菜单 -->

    <el-submenu  
      v-for="item in hasChildrenMenu"
      :key="item.label"
      class="user-item"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="el.name"
          @click="clickMenu(el)"
          v-for="el in item.children"
          >{{ el.label }}</el-menu-item
        >
      </el-menu-item-group>
      
    </el-submenu>
    <el-menu-item  v-if="item.label !=='数据展示'"
      @click="clickMenu(item)"
      :index="item.name"
      v-for="(item, index) in noChildrenMenu"
      :key="item.name"
    >   <i :class="`el-icon-${item.icon}`"></i>
    <span slot="title">{{ item.label }}</span>
  </el-menu-item>
    
  </el-menu>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Aside",
  data() {
    return {
    };
  },
  mounted() {
  },  
  computed: {
    ...mapState("tapAside", ["IsCollapse","Menus"]),
    
    menu(){
      return JSON.parse(localStorage.getItem("MENUS")) || this.Menus
    },
    noChildrenMenu() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildrenMenu() {
      return this.menu.filter((item) => item.children);
    },
  },
  methods: {
    ...mapMutations("tapAside",["SET_BREADCRUMB"]),
    handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //   console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({ path: item.path }).catch((err) => err);
      this.SET_BREADCRUMB(item)
    },
  },
};
</script>

<style scoped lang="less">
.el-menu {
  height: 100%;
    transition: all .5s;

}
#aside {
  height: 100%;
}
.user-item {
  padding: 0 !important;
}
.el-aside,
.el-menu{
  ::v-deep .el-submenu__title,&>.el-menu-item{
   // padding: 0 10px !important;
  }
}
.el-h3 {
  text-align: center;
  font-size: 15px;
  letter-spacing: 3px;
  color: rgb(255, 255, 255);
  font-weight: 400;
  padding: 0 10px;
  padding: 10px;
}
</style>
