/**
 * @file service.js
 * @description 服务相关接口
 * @author YIBOSHEN
 * @date 07-07-2020
 */
import request from '@/utils/request'
/**
 * 获取服务列表
 */
export function getList() {
  return request({
    url: '/v1/service/list',
    method: 'get'
  })
}
/**
 * 添加服务
 */
export function addService(data) {
  return request({
    url: '/v1/service',
    method: 'post',
    data
  })
}
/**
 * 修改服务
 */
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
/**
 * 服务排序
 * @parms id 服务的id 已逗号隔开
 */
export function switchService(data) {
  return request({
    url: `/v1/service/switch?ids=${data}`,
    method: 'put'
  })
}

/**
 * 查询客户的额度列表
 * @parms clientId 客户id
 */
export function getCusAmountList({ clientId, deadline }) {
  return request({
    url: `/v1/amount/list?clientId=${clientId}&deadline=${deadline}`,
    method: 'get'
  })
}

/**
 * 购买服务
 * @param clientId 客户id
 * @param serviceId 服务id
 * @param amount 额度
 * @param deadline 到期日期
 * @param orderNumber 订单编号
 * @param remark 备注说明
 */
export function addAmount({ clientId, serviceId, amount, deadline, orderNumber, remark }) {
  return request({
    url: `/v1/amount`,
    method: 'post',
    data: {
      clientId,
      serviceId,
      amount,
      deadline,
      orderNumber,
      remark
    }
  })
}
