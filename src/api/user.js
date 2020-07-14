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

export function getUserList({ type = 0, pageSize = 10, pageNum = 1 }) {
  return request({
    url: `v1/user/list?type=${type}&pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get'
  })
}
