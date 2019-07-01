import Vue from 'vue'
import router from './router'
import store from './store'
import App from './APP'


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
