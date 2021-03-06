import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './styles/index.less'

// 加载 Vant 全局样式
import Vant from 'vant'
import 'vant/lib/index.css'

// 动态设置 REM 基准值
import 'amfe-flexible'

// 初始化加载相对时间
import './utils/dayjs'

Vue.config.productionTip = false

// 注册使用 Vant 组件库
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
