<template>
    <div id="Home">
      <el-row>
        Student
      </el-row>
    </div>
  </template>
  
  <script>
  import { reqData } from "@/api";
  export default {
    name: "Home",
    data() {
      return {
     
      };
    },
    mounted() {
    },
    methods: {
    
    },
  };
  </script>
  
  <style scoped lang="less">
  .UserInfo {
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .user-info-txt {
      margin-left: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        padding-top: 5px;
        font-size: 13px;
        color: #aaa;
      }
    }
  }
  .login-info {
    padding-top: 15px;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    p {
      font-size: 13px;
      color: #999;
      span {
        margin-left: 50px;
      }
    }
  }
  .box-card {
    margin-bottom: 20px;
    height: 250px;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    .el-card {
      width: 30%;
      height: 80px;
      margin-bottom: 15px;
    }
    .icon-outer {
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background-color: #aaa;
      border-radius: 4px;
      margin: 0;
    }
    .detail {
      margin-left: 20px;
      p {
        font-size: 15px;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }
  }
  #content {
    display: flex;
    justify-content: center;
  }
  
  .mid-card {
    width: 95%;
    margin: 10px auto;
    margin-top: 5px;
    height: 280px;
  }
  .two-card {
    display: flex;
    justify-content: space-between;
    height: 200px;
    width: 95%;
    margin: 0 auto;
    .el-card {
      width: 48%;
      margin-top: 10px;
    }
  }
  </style>
  