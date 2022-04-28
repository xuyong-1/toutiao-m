<template>
  <div class="my-container">

    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            fit="cover"
            round
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!--  消息通知  -->
    <van-cell title="消息通知" is-link/>
    <!--  小连同学  -->
    <van-cell title="大连同学" is-link/>
    <!--  退出登录  -->
    <van-cell @click="logoutBtn" v-if="user" class="logout-cell" title="退出登录" clickable/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {} // 用户信息
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
    // 加载用户信息
    async onLoadUserInfo () {
      try {
        const res = await getUserInfo()
        // console.log(res.data.data)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    },

    // 退出登录
    logoutBtn () {
      this.$dialog.confirm({
        title: '退出登录'
      })
        .then(() => {
          // 确认
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // 取消
        })
    }
  },

  // 生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created () {
    if (this.user) {
      this.onLoadUserInfo()
    }
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
.my-container {
  // 头部公共样式
  .header {
    height: 361px;
    background-color: #47a1fb;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  // 未登录容器样式
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  // 已登录容器样式
  .user-info {
    .base-info {
      height: 231px;
      display: flex;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }

        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }

    .data-stats {
      height: 130px;
      display: flex;
      color: #fff;

      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  // 宫格导航
  .grid-nav {
    height: 141px;
    margin-top: 10px;

    .grid-item {
      i.iconfont {
        font-size: 45px;
      }

      .icon-shoucang {
        color: #eb5253;
      }

      .icon-lishi {
        color: #ff9d1d;
      }

      span.text {
        font-size: 28px;
      }
    }
  }

  // 退出登录
  .logout-cell {
    margin-top: 9px;
    text-align: center;
    color: #d86262;
  }
}
</style>
