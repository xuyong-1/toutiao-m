/**
 * 文章接口模块
 */
import request from '@/utils/request'

/**
 * 获取频道的文章列表
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: 'v1_0/articles',
    params
  })
}

/**
 * 获取新闻详情
 */
export const getArticleDetail = articleId => {
  return request({
    method: 'GET',
    url: `v1_0/articles/${articleId}`
  })
}
