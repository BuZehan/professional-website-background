import vue from 'vue'
import Vuex from 'vuex'
vue.use(Vuex)
import tapAside from './tap'

const store = new Vuex.Store({
    modules: {
        tapAside
    }
})

export default store