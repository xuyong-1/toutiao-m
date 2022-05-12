<template>
  <div class="search-container">
    <!-- 头部搜索框 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
    <form class="searchForm" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background='rgb(50,150,250)'
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result :searchText="searchText" v-if="isResultShow"></search-result>

    <!-- 搜索联想建议 -->
    <search-suggestion
      @searchResult="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    >
    </search-suggestion>

    <!-- 搜索历史记录 -->
    <search-history
      @clearHistory="historyRecord = []"
      @searchResult = "onSearch"
      :historyRecord="historyRecord"
      v-else
    ></search-history>
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history'
import SearchResult from '@/views/search/components/search-result'
import SearchSuggestion from '@/views/search/components/search-suggestion'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '', // 搜索框里的内容
      isResultShow: false, // 显示对应组件的内容
      historyRecord: getItem('SEARCH-HISTORY') || [] // 历史记录
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
  watch: {
    // 历史记录列表有变化，存储到本地
    historyRecord (val) {
      setItem('SEARCH-HISTORY', val)
    }
  },

  methods: {
    // 用户点击 '搜索' 按钮
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val // 将搜索框的值赋予用户点击的那个内容
      // 存储搜索历史记录
      // 历史记录要求：1.不重复的数据;2.最新的搜索内容在最上边排列
      const index = this.historyRecord.indexOf(val)
      // -1:表示数组中没有找到匹配的字符串
      if (index !== -1) {
        this.historyRecord.splice(index, 1)
      }
      this.historyRecord.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
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
  padding-top: 108px;

  .van-search__action {
    color: white;
  }

  .searchForm { // 固定搜索框
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
