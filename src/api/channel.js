/**
 * 频道相关的请求模块
 */
import request from '@/utils/request'

/**
 * 获取所有频道列表
 * @returns {*}
 */
export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: 'v1_0/channels'
  })
}
