import request from '@/utils/request'

export function getClientList() {
  return request({
    url: '/v1/client/list',
    method: 'get'
  })
}

