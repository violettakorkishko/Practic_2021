import Vue from 'vue'
import App from './Components/App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
console.log('test')

Vue.use(VueAxios, axios)

new Vue({
   render: h => h(App),
   el: '#main',
})

