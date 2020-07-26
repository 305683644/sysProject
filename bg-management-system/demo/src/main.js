// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入store
import store from './store'
//引入全局组件
import gCom from './common'
for(let i in gCom){
  Vue.component(i,gCom[i])
}

//清除默认样式
import './assets/css/reset.css'

//设定一个服务器地址用于文件上传
Vue.prototype.$imgUrl = 'http://localhost:3000'

//全局引入 elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
