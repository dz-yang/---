import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/css/bootstrap.css'
// import VDistpicker from 'v-distpicker'
// import VuePickers from 'vue-pickers'
// Vue.component('v-distpicker', VDistpicker);
// Vue.component('vue-distpicker', VuePickers);
Vue.use(MintUI)
import { Toast } from 'mint-ui';
Vue.config.productionTip = false
Vue.filter('priceFilter', function(val, n) {
    var n = n || 2
    return parseFloat(val).toFixed(n)
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')