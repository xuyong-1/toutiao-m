<template>
  <div class="home-container">
    <!-- 搜索头部 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" size="small" round slot="title" type="info" icon="search" to="/search">搜索</van-button>
    </van-nav-bar>

    <!-- 频道列表 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">

        <!-- 文章列表 -->
        <article-list :channels="item"></article-list>
        <!-- 文章列表 -->

      </van-tab>
      <!-- 此标签的插槽起到占位的作用,让所有频道都能展示出来，不与‘更多’图标重合 -->
      <div slot="nav-right" class="placeholder"></div>

      <!-- 汉堡按钮(频道编辑)  -->
      <div slot="nav-right" class="hamburger-btn" @click="show = true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!--popup弹出层-->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 频道编辑组件 -->
      <ChannelEdit :my-channels="channels" :active="active" @editChannel="onToggleChannel"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { userChannels } from '@/api/user'
import ArticleList from '@/views/home/components/article-list'
import ChannelEdit from '@/views/home/components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'homeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [], // 用户的频道
      show: false // 默认初始化不展示弹窗
    }
  },

  props: {},

  // 计算属性 类似于data概念",
  computed: {
    ...mapState(['user'])
  },

  // 监控data中的数据变化",
  watch: {},

  methods: {
    // 加载用户频道
    // 提示：获取登录用户的频道列表和获取默认推荐的频道列表是同一个数据接口。后端会根据接口中的 token 来判定返回数据。
    async onLoadChannels () {
      try {
        let channels = []
        if (this.user) { // 已经登录，请求获取用户频道数据
          const { data } = await userChannels()
          channels = data.data.channels
        } else { // 没有登录
          // 先判断本地存储是否有数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 有数据，则使用本地存储数据
          if (localChannels) {
            channels = localChannels
          } else {
            // 没有本地频道数据，则请求获取默认推荐的频道列表
            const { data } = await userChannels()
            channels = data.data.channels
          }
        }
        // 将数据更新到组件中
        this.channels = channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    // 切换频道
    // 第二个参数,如果子组件传值给父组件,固定为true,只有切换频道触发这个方法时才关闭弹窗
    onToggleChannel (index, show = true) {
      this.active = index
      // 切换频道后关闭弹窗
      this.show = show
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
    this.onLoadChannels()
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
  // 解决频道与文章内容重叠问题
  padding-top: 174px;

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
    .van-tabs__wrap {
      height: 82px;
      // 以下是解决频道与页面头部重叠问题
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }

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
