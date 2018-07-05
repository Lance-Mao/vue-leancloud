import Vue from 'vue'
import App from './App'

// 导入路由组件
import VueRouter from 'vue-router'

// 导入UI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// 导入路由配置文件
import routerConfig from './routerConfig.js'

// 注册插件
Vue.use(VueRouter)
Vue.use(ElementUI)

// 创建路由
const router = new VueRouter({
  routes: routerConfig
})

// 初始化 leancloud-storage
import AV from 'leancloud-storage'
const APP_ID = 'mv8ROUFyNvKDRKivG56AuCO1-gzGzoHsz'
const APP_KEY = 'mT3PAt3Olfq8G0VvxDPeGpuQ'
// const APP_ID = 'ShflYltr73enRgQtjEv4Q5sN-gzGzoHsz'
// const APP_KEY = 'cOGMCpRtQMhkH7CVqnlJGdvk'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})
Vue.prototype.$AV = AV

// 实例化根组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
