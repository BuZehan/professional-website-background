import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Main from "../views/Main.vue"
//1.创建路由组件
//2.将路由与组件进行映射
//3.创建router实例
const routes = [{
    //主路由
    path: "/",
    component: Main,
    name: "main",
    redirect: 'home',
    children: []
}, {
    path: "/login",
    name: "login",
    component: () =>
        import ("@/views/login.vue")
}

]

const router = new VueRouter({
        routes,
        base:'/'
    })
    //全局路由守卫
router.beforeEach((to, from, next) => {
    //获取token
    const token = localStorage.getItem("TOKEN")
        //token 不存在  只能跳转login页面
    if (!token && to.name !== 'login') {
        next({ path: "/login" })
    } else if (token && to.name == "login") { //有token 用户已经登陆 若是跳转登录页面 则禁止
        next({ path: "/home" })
    } else {
        next()
    }
})


export default router