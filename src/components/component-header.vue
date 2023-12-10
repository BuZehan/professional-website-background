<template>
  <div>
    <div id="Header">
      <div class="el-left-content">
        <el-button
          @click="changeCollapse"
          size="mini"
          icon="el-icon-menu"
        ></el-button>
        <el-breadcrumb class="bread" separator="/">
          <el-breadcrumb-item
            v-for="(item, index) in this.tapList"
            @click.native="navigatorTo(item.path)"
            :key="index"
            >{{ item.label }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="el-right-content">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="../assets/user-icon.svg" alt="" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapState("tapAside", ["tapList"]),
  },
  methods: {
    ...mapMutations("tapAside", ["CHANG_ISCOLLAPSE"]),
    changeCollapse() {
      this.CHANG_ISCOLLAPSE();
    },
    navigatorTo(path) {
      this.$router.push({ path: path }).catch((err) => err);
    },
    loginOut(){
      localStorage.removeItem("TOKEN")
      localStorage.removeItem("MENUS")
      localStorage.removeItem("ROUTES")
      this.$message({
          message: '退出成功',
          type: 'success'
        });
      this.$router.push({path:"/login"})
    }
  },
};
</script>

<style scoped lang="less">
#Header {
  width: 100%;
  height: 60px;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(211, 211, 211);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
}
.el-left-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.bread {
  padding-left: 20px;
}
.el-dropdown-link img {
  vertical-align: middle;
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

/deep/.el-breadcrumb__inner {
  cursor: pointer;
  font-weight: 900;
}
/deep/.el-breadcrumb__inner:hover {
  color: #006eff;
}
/deep/.el-breadcrumb__inner:last-child(1) {
  font-weight: 400 !important;
}
</style>
