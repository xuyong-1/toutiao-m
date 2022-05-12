<template>
  <div class="layout-container">
    <!-- 二级路由显示的位置 -->
    <router-view/>
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/home">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/vedio">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {}
  },

  props: {},

  // 计算属性 类似于data概念",
  computed: {},

  // 监控data中的数据变化",
  watch: {},

  methods: {},

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
  },

  // 生命周期 - 挂载之前",html模板未渲染
  beforeMount () {
  },

  // 生命周期 - 挂载完成（可以访问DOM元素）",html模板已渲染
  mounted () {
  },

  // 生命周期 - 更新之前",数据模型已更新,html模板未更新
  beforeUpdate () {
  },

  // 生命周期 - 销毁之前调用
  beforeDestroy () {
  },

  // 生命周期 - 更新之后",数据模型已更新,html模板已更新
  updated () {
  },

  // 生命周期 - 销毁完成"
  destroyed () {
  },

  // 如果页面有keep-alive缓存功能，这个函数会触发",
  activated () {
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
