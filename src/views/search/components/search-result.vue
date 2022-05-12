<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(searchResult, index) in list" :key="index" :title="searchResult.title"/>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  data () {
    return {
      list: [], // 查询结果列表
      error: false,
      loading: false,
      finished: false,
      page: 1, // 页数，不传默认为1
      per_page: 20 // 每页数量
    }
  },

  props: {
    searchText: { // 搜索结果列表
      type: String,
      required: true
    }
  },

  // 计算属性 类似于data概念",
  computed: {},

  // 监控data中的数据变化",
  watch: {},

  methods: {
    async onLoad () {
      // 1.请求获取数据
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })

        // 测试失败请求使用
        // if (Math.random() > 0.5) {
        //   JSON.parse('JLDSKJDSOAF')
        // }

        // 解构出响应数据中的数组
        const { results } = data.data
        // 2.将数据添加到列表中
        this.list.push(...results)
        // 3. 将本次加载中的 loading 的状态改为false
        this.loading = false
        // 4.判断数据是否加载完成
        if (results.length) { // 如果有数据，将获取下一页的页码
          this.page++
        } else { // 如果没有数据，将 finished 设置成 true
          this.finished = true
        }
      } catch (err) {
        // 展示加载失败的提示状态
        this.error = true
        // 将本次的 loading 改为 false
        this.loading = false
      }
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
  }
}
</script>

<style scoped lang="less">
</style>
