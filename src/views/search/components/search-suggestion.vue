<template>
  <div class="search-suggestion">
    <div class="search-suggestion">
      <van-cell
        icon="search"
        v-for="(text,index) in suggestions"
        :key="index"
        @click="$emit('searchResult',text)"
      >
        <div slot="title" v-html="highlight(text)"></div>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: [] // 联想建议列表
    }
  },

  props: {
    searchText: { // 父传子;搜索框里的内容
      type: String,
      required: true
    }
  },

  // 计算属性 类似于data概念",
  computed: {},

  // 监控data中的数据变化",
  watch: {
    // 侦听搜索框里是否有变化，如有变化发起'联想建议'请求;
    // debounce() 优化防抖(第三方库)
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value)
      }, 200),
      immediate: true // 即刻触发侦听
    }
  },

  methods: {
    // 加载'联想建议'列表
    async loadSearchSuggestion (q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('请求数据失败,稍后重试')
      }
    },
    // 1.处理搜索联想关键字高亮
    // 1.1将参数处理成高亮的格式
    highlight (text) {
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
  }
}
</script>

<style scoped lang="less">
/deep/ span.active {
  color: #3296fa;
}
</style>
