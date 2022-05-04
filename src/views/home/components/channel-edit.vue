<template>
  <div class="channel-edit">
    <!-- 我的频道头部 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button round type="danger" size="mini" plain>编辑</van-button>
    </van-cell>

    <!-- 我的频道列表 -->
    <van-grid class="my-channel" :gutter="10" clickable>
      <van-grid-item
        class="channel-item"
        icon="clear"
        v-for="(item,index) in MyChannels" :key="index"
      >
        <span class="text" :class="{active : index === active}" slot="text">{{ item.name }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐头部 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>

    <!-- 总频道列表 -->
    <van-grid class="recommend-channel" :gutter="10" clickable>
      <van-grid-item class="channel-item" icon="plus" text="文字" v-for="value in 8" :key="value"/>
    </van-grid>

  </div>
</template>

<script>
import { getAllChannel } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  data () {
    return {
      channels: [] // 所有频道
    }
  },

  props: { // 父传子
    MyChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },

  // 计算属性 类似于data概念",
  computed: {},

  // 监控data中的数据变化",
  watch: {},

  methods: {
    // 初始化加载所有频道
    async loadGetAllChannel () {
      try {
        const { data } = await getAllChannel()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('加载数据失败')
      }
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
    this.loadGetAllChannel()
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
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: rgb(51, 51, 51)
  }

  .van-cell__value {
    .van-button {
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: rgb(248, 90, 90);
      border: 1px solid #f85959;
    }
  }

  /deep/ .channel-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      white-space: nowrap; //内容过长时不折行
      background-color: rgb(244, 245, 246);

      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }

      .active {
        color: red;
      }
    }
  }

  .my-channel {
    margin-bottom: 74px;
  }

  /deep/ .recommend-channel {
    .channel-item {
      .van-grid-item__content {
        flex-direction: row;

        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }

  /deep/ .my-channel {
    .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color: #cacaca;
      z-index: 2;
    }
  }
}
</style>
