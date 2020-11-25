import Vue from 'vue'
import App from './App'
import 'mpvue-weui/src/style/weui.css';
Vue.config.productionTip = false
App.mpType = 'app'
// vue 中将实例挂载到节点当中但小程序没有
// app.json 与 小程序中的app.json是一样的
const app = new Vue(App)
app.$mount()
