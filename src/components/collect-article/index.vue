<template>
  <van-button
    :icon="value? 'star':'star-o'"
    :class="{collected: value}"
    @click="onCollect"
  >
  </van-button>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  data () {
    return {
      loading: false
    }
  },

  props: {
    value: { // 是否为收藏
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },

  // 计算属性 类似于data概念",
  computed: {},

  // 监控data中的数据变化",
  watch: {},

  methods: {
    async onCollect () {
      this.loading = true
      try { // 已收藏，取消收藏
        if (this.value) {
          await deleteCollect(this.articleId)
          this.$toast.success('取消收藏')
        } else { // 未收藏，添加收藏
          await addCollect(this.articleId)
          this.$toast.success('收藏成功')
        }
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
  }
}
</script>

<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}

</style>
