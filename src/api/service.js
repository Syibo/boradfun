import request from '@/utils/request'

export function getList() {
  return request({
    url: '/v1/service/list',
    method: 'get'
  })
}

export function addService(data) {
  return request({
    url: '/v1/service',
    method: 'post',
    data
  })
}

export function editService(data) {
  return request({
    url: `/v1/service/${data.ID}`,
    method: 'put',
    data: {
      'serviceName': data.serviceName,
      'state': data.state,
      'use': data.use
    }
  })
}

export function switchService(data) {
  return request({
    url: `/v1/service/switch?ids=${data}`,
    method: 'put'
  })
}
