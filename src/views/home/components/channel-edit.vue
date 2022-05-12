<template>
  <div class="channel-edit">
    <!-- 我的频道头部 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        @click="isShow = !isShow"
        round
        type="danger"
        size="mini"
        plain
      >
        {{ isShow ? '完成' : '编辑' }}
      </van-button>
    </van-cell>

    <!-- 我的频道列表 -->
    <van-grid class="my-channel" :gutter="10" clickable>
      <van-grid-item
        class="channel-item"
        v-for="(item,index) in MyChannels" :key="index"
        @click="onUserChannelClick(item,index)"
      >
        <van-icon v-show="isShow && !fixedChannels.includes(item.id)" slot="icon" name="clear"></van-icon>
        <span class="text" :class="{active : index === active}" slot="text">{{ item.name }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐头部 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>

    <!-- 总频道列表 -->
    <van-grid class="recommend-channel" :gutter="10" clickable>
      <van-grid-item
        class="channel-item"
        icon="plus"
        :text="item.name"
        v-for="(item,index) in recommendChannel" :key="index"
        @click="addMyChannel(item)"
      />
    </van-grid>

  </div>
</template>

<script>
import { getAllChannel, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [], // 所有频道
      isShow: false, // 我的频道关闭按钮是否显示
      fixedChannels: [0] // 固定频道，不可删除; 频道id为0: '推荐频道'
    }
  },

  props: { // 父传子
    MyChannels: { // 我的频道数组对象
      type: Array,
      required: true
    },
    active: { // 高亮频道的索引
      type: Number,
      required: true
    }
  },

  // 计算属性 类似于data概念",
  computed: {
    // 处理展示推荐频道
    // 思路: 所有频道 - 我的频道 = 频道推荐
    recommendChannel () {
      // 过滤全部频道；遍历数组，根据函数的返回值(过滤条件决定是否收集遍历项)
      return this.allChannels.filter(channel => {
        return !this.MyChannels.find((MyChannels) => {
          return MyChannels.id === channel.id
        })
      })
    },
    ...mapState(['user'])
  },

  methods: {
    // 初始化加载所有频道
    async 'loadGetAllChannel' () {
      try {
        const { data } = await getAllChannel()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('加载数据失败')
      }
    },

    // 添加-我的频道
    async addMyChannel (item) {
      this.MyChannels.push(item)
      // 已经登录,通过接口保存到线上
      if (this.user) {
        try {
          await addUserChannel({
            id: item.id, // 频道id
            seq: this.MyChannels.length // 我的频道排列序号
          })
        } catch (err) {
          this.$toast('操作失败，请稍后再试')
        }
      } else { // 没有登录,添加操作的数据存到本地
        setItem('TOUTIAO_CHANNELS', this.MyChannels)
      }
    },
    // 编辑&删除我的频道
    onUserChannelClick (item, index) {
      // 编辑状态，执行删除操作
      if (this.isShow) {
        // 如果要删除固定的'推荐'频道，则不执行删除操作，直接返回即可
        if (this.fixedChannels.includes(item.id)) {
          return
        }
        // 删除点击的频道
        this.MyChannels.splice(index, 1)
        // 如果点击的频道索引小于当前激活频道的索引 ,删除后,当前激活频道的索引 -1
        if (index <= this.active) {
          this.$emit('editChannel', this.active - 1) // 子传父
        }
        // 删除频道持久化
        this.deleteChannel(item)
      } else { // 非编辑状态，执行切换操作
        this.$emit('editChannel', index, false) // 子传父
      }
    },

    // 删除频道
    async deleteChannel (item) {
      try {
        console.log(item)
        // 已经登录,通过接口保存到线上
        if (this.user) {
          await deleteUserChannel(item.id)
        } else { // 没有登录,添加操作的数据存到本地
          setItem('TOUTIAO_CHANNELS', this.MyChannels)
        }
      } catch (err) {
        this.$toast('操作数据失败，请稍后再试')
      }
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
    this.loadGetAllChannel()
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

      // 使关闭按钮图标的父元素是它的祖父而不是它的父亲
      .van-grid-item__icon-wrapper {
        position: unset;
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
