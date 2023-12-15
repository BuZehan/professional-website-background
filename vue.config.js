const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  },
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: "static", //放置生成的静态文件目录（js css img）
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = { //打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  },
  devServer: {
    //同plugins同级
    host: "192.168.55.232",
    port: 80,
    proxy: {
      //配置代理服务器
      "/api": {
        target: 'http://192.168.55.232:3000/', //目标url
        changeOrigin: true, //允许跨域
        pathRewrite: (path) => path.replace(/^\/api/, "/api/v1"), //重写路径,替换/api
      },
      
    },
  },
})