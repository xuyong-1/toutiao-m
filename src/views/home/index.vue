<template>
  <div class="home-container">
    <!-- 搜索头部 -->
    <van-nav-bar class="page-nav-bar">
      <van-button class="search-btn" size="small" round slot="title" type="info" icon="search">搜索</van-button>
    </van-nav-bar>

    <!-- 标签栏 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">{{ item.name }}的内容</van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { userChannels } from '@/api/user'

export default {
  name: 'homeIndex',
  data () {
    return {
      active: 0,
      channels: [] // 用户的频道
    }
  },

  props: {},

  // 计算属性 类似于data概念",
  computed: {},

  // 监控data中的数据变化",
  watch: {},

  methods: {
    // 加载用户频道
    async onLoadChannels () {
      try {
        const { data } = await userChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('加载频道失败')
      }
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
    this.onLoadChannels()
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
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    height: 65px;
    width: 555px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;

    .van-icon {
      font-size: 32px;
    }
  }

  /deep/ .channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0; // 1:参与剩余空间的计算 ; 0:不参与剩余空间的计算
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.9;
      width: 66px;
      height: 82px;
      background-color: #fff;

      i.iconfont {
        font-size: 33px;
      }

      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px; //宽度设为1px在真正的手机端可以看到效果,在调试工具看不到效果。(如果要看，可以设置为2px)
        height: 100%;
        background: url("~@/assets/gradient-gray-line.png");
        background-size: contain;
      }
    }
  }
}
</style>
