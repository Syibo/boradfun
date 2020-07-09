import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
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
    data
  })
}

export function getUserList({ type = 1 }) {
  return request({
    url: `v1/user/list?type=${type}`,
    method: 'get'
  })
}
