<template>
  <van-button
    v-if="is_followed"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
  >已关注
  </van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    :loading="loading"
    size="small"
    icon="plus"
    @click="onFollow"
  >关注
  </van-button>
</template>

<script>
import { cancelFollowUser, followUser } from '@/api/user'

export default {
  name: 'FollowUser',
  data () {
    return {
      loading: false // loading 状态 默认是关闭的
    }
  },

  props: {
    is_followed: { // 关注的状态
      type: Boolean,
      required: true
    },
    UserId: { // 用户id
      type: [Number, String, Object],
      required: true
    }
  },

  // 计算属性 类似于data概念",
  computed: {},

  // 监控data中的数据变化",
  watch: {},

  methods: {
    // 关注用户&取消关注用户
    async onFollow () {
      try {
        // 展示关注按钮的 loading 状态
        this.loading = true
        // 如果关注了，操作取消关注
        if (this.is_followed) {
          await cancelFollowUser(this.UserId)
        } else { // 如果没有关注,操作添加关注
          await followUser(this.UserId)
        }
        // 更新视图状态(按钮的显示)
        // this.article.is_followed = !this.article.is_followed
        this.$emit('updata-is_followed', !this.is_followed)
      } catch (err) {
        let message = '操作失败, 请稍后再试'
        if (err.response && err.response.status === 400) {
          message = '您不能关注自己'
        }
        this.$toast(message)
      }
      // 关闭关注按钮的 loading 状态
      this.loading = false
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
  }
}
</script>

<style scoped lang="less">
</style>
