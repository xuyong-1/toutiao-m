/**
 * 处理相对时间
 */
import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// dayjs 默认语言是英文，我们配置使用中文语言包
dayjs.locale('zh-cn') // 全局使用

// 定义一个过滤器，然后就可以任何模板中使用了
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
