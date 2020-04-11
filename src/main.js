// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// 导入自定义插件
import MyHttpServer from '@/plugins/http'

// 导入css样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'

// 生产环境下输出的调试不显示
Vue.config.productionTip = false

// 安装vue插件
Vue.use(ElementUI)
Vue.use(MyHttpServer) // 安装自定义插件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
