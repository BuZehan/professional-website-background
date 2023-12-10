import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import * as echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        store.commit("tapAside/ADD_MENU", router)
    }
}).$mount('#app')