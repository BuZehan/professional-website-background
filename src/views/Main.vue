<template>
  <div id="Main">

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <component-aside />
      </el-aside>

      <el-container>
        <!-- Header -->
        <el-header>
          <ComponentHeader />
          <ComponentTag />
        </el-header>
        <el-main>
          <!-- 路由视图 -->
          <transition name="fade" mode="out-in">
            <router-view id="MainView"></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ComponentAside from "@/components/component-aside.vue";
import ComponentHeader from "@/components/component-header.vue";
import ComponentTag from "@/components/component-tag.vue";
import svgaDemo from "@/components/svga-demo.vue";
export default {
  name: "Main",
  data() {
    return {};
  },
  computed: {},

  components: {
    ComponentAside,
    ComponentHeader,
    ComponentTag,
    svgaDemo
  },
  methods: {
  
  },
  watch: {},
};
</script>

<style scoped lang="less">
#Main,
.el-aside,
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter {
  transform: translateX(-50%);
}
.fade-leave-to {
  transform: translateX(30%);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
#MainView {
  margin-top: 15px;
}

</style>
