<template>
  <div id="login">
    <el-form class="elForm" ref="formName" label-width="auto" :rules="rules" :model="form" :inline="true">
      <h3>网站后台管理系统</h3>
      <el-form-item prop="username" label="用户名">
        <el-input style="width: 260px" v-model="form.username" size="small"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" style="width: 260px" v-model="form.password" size="small"></el-input>
      </el-form-item>
      <el-form-item class="code" prop="verification" label="验证码">
        <el-input type="verification" style="width: 100px" v-model="form.verification" size="small"></el-input>
        <el-image :src="`data:image/svg+xml;base64,${code}`" alt="验证码" @click="resetCode" />
      </el-form-item>
      <el-row>
        <el-button type="primary" size="small" @click="Submit" plain> 登录 </el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getMenu, getCode } from "@/api";
import { mapMutations, ADD_MENU } from "vuex";
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        verification: ""
      },
      code: '',
      codeUrl: process.env.VUE_APP_API_URL,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verification: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
    };
  },
  mounted() {
    // console.log(process.env.VUE_APP_API_URL,process.env.VUE_APP_FLAG);
    // console.log("当前环境变量："+process.env.NODE_ENV)
    this.resetCode()
  },
  methods: {
    ...mapMutations("tapAside", ['SET_ROUTE_MENU', "ADD_MENU"]),
    Submit() {
      this.$refs.formName.validate((valid) => {
        // if (this.form.verification.toLocaleLowerCase() !== localStorage.getItem('code').toLocaleLowerCase()) {
          // console.log(localStorage.getItem('code'),this.form.verification);
        //   this.$message({
        //     message: "验证码错误",
        //     type: "error",
        //   });
        //   return
        // }
        if (valid) {
          let data = this.form;
          getMenu(data).then((res) => {
            //请求登录接口
            if (res.data.code === 200) {
              this.$message({
                message: "登录成功",
                type: "success",
              });
              //将列表存储与Store
              this.SET_ROUTE_MENU(res.data.routeMenu.data)
              this.ADD_MENU(this.$router)
              this.$router.push({ path: "/home" }).catch((err) => err);
            } else {
              console.log(res.data);
              this.$message.error(res.data.message);
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async resetCode() {
      let code = await getCode()
      // console.log(code);
      // localStorage.setItem("code", code.data.Code.toLocaleLowerCase())
      this.code = window.btoa(unescape(encodeURIComponent(code.data.codeSvg)));
    }
  },
  computed: {

  }
};
</script>

<style scoped lang="less">
#login{
  background: url("../assets/logo/logobg.png") no-repeat bottom;
}
.elForm {
  width: 400px;
  height: fit-content;
  border-radius: 8px;
  background-color: #ffffff;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08),0px 2px 6px 0px rgba(0, 0, 0, 0.06),0px 4px 8px 2px rgba(0, 0, 0, 0.04);

}

#login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
}

h3 {
  margin-bottom: 35px;
  padding-top: 10px;
  width: 100%;
  text-align: center;
}

.el-form-item {
  width: 96%;
  display: flex;
  justify-content: center;
}

.items {}

.code {
  position: relative;
  width: 85%;
  display: flex;
  justify-content: flex-start;

  .el-image {
    position: absolute;
    width: 100px;
    height: 40px;
    transform: scale(.85);
    margin-left: 20px;
  }
}
</style>
