import Vue from 'vue'
import router from './router'
import store from './store'
import App from './APP'
import { Tab, Tabs,Search } from "vant";
import './assets/styles/base.scss'
Vue.use(Tab).use(Tabs).use(Search)

new Vue({
    el: '#app',
    router,
    store,
    
    render: h => h(App)
})
