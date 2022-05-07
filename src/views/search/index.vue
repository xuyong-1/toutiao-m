<template>
  <div class="search-container">
    <!-- 头部搜索框 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        background='rgb(50,150,250)'
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <!-- 搜索历史记录 -->
    <search-history></search-history>
    <!-- 搜索联想建议 -->
    <search-suggestion></search-suggestion>
    <!-- 搜索结果 -->
    <search-result></search-result>
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history'
import SearchResult from '@/views/search/components/search-result'
import SearchSuggestion from '@/views/search/components/search-suggestion'

export default {
  name: 'SearchIndex',
  data () {
    return {
      value: '' // 搜索框里的内容
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },

  props: {},

  // 计算属性 类似于data概念",
  computed: {},

  // 监控data中的数据变化",
  watch: {},

  methods: {
    onSearch (val) {
      console.log(val)
    },
    // 取消返回上一级
    onCancel () {
      this.$router.back()
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: white;
  }
}
</style>
