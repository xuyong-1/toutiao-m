<template>
  <div class="article-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh
      :success-text="refreshSuccessText"
      :success-duration="1500"
      v-model="isRefreshLoading"
      @refresh="onRefresh">
      <!-- 文章列表 -->
      <van-list
        :error.sync="error"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 列表项内容 -->
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        >
        </article-item>
        <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title"/>-->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [], // 文章列表数据
      loading: false, // 上拉加载更多的 loading 状态
      finished: false, // 是否加载结束
      timestamp: null, // 请求下一页数据的时间戳
      error: false, // 是否加载失败
      isRefreshLoading: false, // 下拉刷新加载状态
      refreshSuccessText: '刷新成功' // 刷新成功时默认显示的文本
    }
  },
  props: {
    channels: { // 频道(父传子)
      type: Object,
      required: true
    }
  },

  // 计算属性 类似于data概念",
  computed: {},

  // 监控data中的数据变化",
  watch: {},

  methods: {
    // 频道初始化时或者切换频道时,调用该函数
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channels.id, // 频道 id
          timestamp: this.timestamp || Date.now() // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        })
        // 2. 把数据添加到 list 数组中
        const { results } = data.data
        // 数组的展开操作符，它会把数组元素一个一个拿出来
        this.list.push(...results)
        // 3. 设置本次加载中 loading 状态结束
        this.loading = false // 上拉加载更多的 loading 状态
        // 4. 判断数据是否加载结束
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = false // 没有数据 设置结束
        }
      } catch (err) {
        // 请求失败
        this.error = true // 开启错误提示
        this.loading = false // 关闭 loading 效果
      }
    },

    // 下拉刷新列表触发该函数
    async onRefresh () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channels.id, // 频道 id
          timestamp: Date.now() // 下拉刷新每次都应该获取最新数据
        })
        // 2. 将数据追加到列表的顶部
        const { results } = data.data
        // 数组的展开操作符，它会把数组元素一个一个拿出来
        this.list.unshift(...results)
        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false
        // 提示成功
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        // 失败提示
        this.refreshSuccessText = '刷新失败' // 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false
      }
    }
  },

  created () {
  }
}
</script>

<style scoped lang="less">
// 为了解决 页面滚动不相互影响，给当前自己所在的容器设置一个固定的高度
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
