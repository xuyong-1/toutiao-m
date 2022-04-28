/**
 * 封装本地存储代码
 */

/**
 * 封装存储用户登录返回的token
 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取用户登录返回的token
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * 删除用户登录返回的token
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
