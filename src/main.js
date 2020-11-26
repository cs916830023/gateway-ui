import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

// 引入router, 'cnpm install vue-router'
import VueRouter from 'vue-router'
import routes from './routers/routes.js'
// 引入axios, 'cnpm install axios -S'
import axios from 'axios'
// 引入echarts, 'cnpm install echarts'
import echarts from 'echarts'
//  引入echarts-gl, 'cnpm install echarts-gl'
import 'echarts-gl'
//  引入babel-polyfill, 'cnpm install --save babel-polyfill'
import 'babel-polyfill'
// import with ES6
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


// require('echarts/lib/chart/bar')
// require('echarts/lib/commponent/tooltip')
// require('echarts/lib/commponent/title')

//引用全局变量文件
import GLOBAL_VAR from './api/global_variable.js'
import GLOBAL_FUN from './api/global_function.js'

// use
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(mavonEditor)

//绑定到vue属性
Vue.prototype.GLOBAL_VAR = GLOBAL_VAR
Vue.prototype.GLOBAL_FUN = GLOBAL_FUN
Vue.prototype.$ajax = axios
Vue.prototype.$echarts = echarts

/**
 * 去重，防止重复加载当前页面，抛错误提示
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
		return originalPush.call(this, location).catch(err => err)
}

/**
 * 创建 router 实例，然后传 `routes` 配置
 */
const router = new VueRouter({
	mode: 'history', //模式设为history，否则跳转时 URL 上会带有 # 符号
	routes//（缩写）相当于 routes: routes
})


new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
