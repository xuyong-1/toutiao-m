/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'

/**
 * 用户登录
 * @param data
 * @returns {*}
 */
export const login = data => {
  return request({
    method: 'POST',
    url: 'v1_0/authorizations',
    data
  })
}
/**
 * 发送短信验证码
 * 注意：每手机号每分钟1次
 */
export const sendSMSCode = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户自己信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: 'v1_0/user'
    //  发送头部请求数据
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

/**
 * 获取用户的频道
 */
export const userChannels = () => {
  return request({
    method: 'GET',
    url: 'v1_0/user/channels'
  })
}
