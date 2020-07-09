/**
 * @file customer.js
 * @description 客户相关接口
 * @author YIBOSHEN
 * @date 07-09-2020
 */
import request from '@/utils/request'

/**
 * 客户列表
 */
export function getClientList() {
  return request({
    url: '/v1/client/list',
    method: 'get'
  })
}

/**
 * 新增客户
 */
export function addClient(data) {
  return request({
    url: '/v1/client',
    method: 'post',
    data: {
      level: data.level,
      mainManageId: Number(data.mainManageId),
      name: data.name,
      number: data.number,
      saleId: Number(data.saleId),
      subManageId: Number(data.subManageId),
      type: data.type
    }
  })
}

