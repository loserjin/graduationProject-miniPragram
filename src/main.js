import Vue from 'vue'
import App from './App'
import store from './store/store'

import axios from 'axios'
import qs from 'qs'
import req from "./utils/axios";

import fly from './utils/request'

Vue.prototype.$fly = fly

Vue.prototype.$req = req;//设置原型，方便在全局中随时使用
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

 


Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'


const app = new Vue(App)
app.$mount()
