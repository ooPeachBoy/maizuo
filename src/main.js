import Vue from 'vue'
import router from './router'
import store from './store'
import App from './APP'
import { Tab, Tabs } from "vant";
import './assets/styles/base.scss'
Vue.use(Tab).use(Tabs)

new Vue({
    el: '#app',
    router,
    store,
    
    render: h => h(App)
})
