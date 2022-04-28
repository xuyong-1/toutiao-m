<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="rules.mobileCheck"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        type="number"
        maxlength="6"
        :rules="rules.codeCheck"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>

        <template #button>
          <!--倒计时-->
          <van-count-down @finish="isCountDownShow = false" :time="time" format="ss s" v-if="isCountDownShow"/>
          <!--点击 '获取验证码' 按钮 时会验证表单，加上 native-type="button" 会解决此症状-->
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
          >获取验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSMSCode } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      rules: {
        mobileCheck: [
          {
            required: true,
            message: '手机号不能为空'
          }, {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        codeCheck: [
          {
            required: true,
            message: '验证码不能为空'
          }, {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      time: 1000 * 60,
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    // 点击登录表单
    async onSubmit () {
      // 开始转圈圈
      this.$toast.loading({
        message: '登录中...', // 提示消息
        forbidClick: true, // 是否禁止背景点击
        duration: 0 // 持续时间，0表示持续展示不停止
      })
      try {
        const res = await login(this.user)
        // 将 vuex中的 state 改为 响应返回的token
        this.$store.commit('setUser', res.data.data)
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登录成功')
        // 登录成功后，哪里来哪里去
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录失败,手机号或验证码错误')
        } else {
          // 失败提示
          this.$toast.fail('登录失败,请重试')
        }
      }
    },
    // 点击获取验证码
    async onSendSms () {
      // 1. 校验手机号
      try {
        /**
         * 获取验证码之前验证手机号是否正确(符合规则)
         * validate 是 vant 提供的方法
         */
        await this.$refs.loginForm.validate('mobile')
        // 2. 验证通过，显示倒计时
        this.isCountDownShow = true

        // 3. 请求发送验证码
        try {
          await sendSMSCode(this.user.mobile)
          this.$toast('发送成功')
        } catch (err) {
          // 发送失败,关闭倒计时
          this.isCountDownShow = false
          if (err.response.status === 429) {
            this.$toast('发送太频繁了，请稍后重试')
          } else {
            this.$toast('发送验证码失败，请稍后重试')
          }
        }
      } catch (err) {
        return console.log('验证失败', err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }

}
</style>
