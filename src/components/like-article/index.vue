<template>
  <van-button
    :icon="value === 1? 'good-job':'good-job-o'"
    :class="{liked: value === 1}"
    @click="onLike"
  >
  </van-button>
</template>

<script>
import { deleteLike, addLike } from '@/api/article'

export default {
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: { // 点赞的值 -1 或 1 或 ...
      type: Number,
      required: true
    },
    articleId: { // 文章id 类型为什么是三种？ 因为前面的id因为数值国道导致精度问题，引入的插件解决的
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onLike () {
      this.loading = true
      try { // 已点赞，取消点赞
        let status = -1 // 点赞的状态值
        if (this.value === 1) {
          await deleteLike(this.articleId)
          this.$toast.fail('取消点赞')
        } else { // 未点赞，添加点赞
          await addLike(this.articleId)
          status = 1
          this.$toast.success('点赞成功')
        }
        this.$emit('input', status)
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: #eb5253;
  }
}
</style>
