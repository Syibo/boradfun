import request from '@/utils/request'

export function login({ username, password }) {
  return request({
    url: 'v1/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function userLeader() {
  return request({
    url: 'v1/user/leaders',
    method: 'get'
  })
}
/**
 * 新增用户
 * @param name 姓名
 * @param email 邮箱
 * @param wx 微信
 * @param phone 手机
 * @param userType 类型
 * @param leaderId 领导Id
 */
export function addUser(data) {
  return request({
    url: 'v1/user',
    method: 'post',
    data: {
      name: data.name,
      email: data.email,
      wx: data.wx,
      phone: data.phone,
      userType: data.userType,
      leaderId: Number(data.leaderId)
    }
  })
}
/**
 * 编辑用户
 * @param 同上
 */
export function editUser(data) {
  return request({
    url: `v1/user/${data.ID}`,
    method: 'put',
    data: {
      name: data.name,
      email: data.email,
      wx: data.wx,
      phone: data.phone,
      userType: data.userType,
      leaderId: Number(data.leaderId)
    }
  })
}

export function getUserList({ type = 0, pageSize = 10, pageNum = 1 }) {
  return request({
    url: `v1/user/list?type=${type}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get'
  })
}

/**
 * 实施人员列表, 任务指派时根据leaderId筛选
 * @param leaderId 组长id
 */
export function getUserImpls({ leaderId }) {
  return request({
    url: `/v1/user/impls?leaderId=${leaderId}`,
    method: 'get'
  })
}
