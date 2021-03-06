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

/**
 * 客户额度转换
 * @parms clientId 客户id
 */
export function handAmountSwitch({ clientId, sOutId, sOutNum, sInId, sInNum, remark }) {
  return request({
    url: `/v1/amount/switch`,
    method: 'put',
    data: {
      clientId,
      sOutId,
      sOutNum,
      sInId,
      sInNum,
      remark
    }
  })
}

/**
 * 查询客户的额度历史,订单维度
 * @parms clientId   客户id
 * @parms serviceId  服务id
 */
export function handAmountLog({ clientId, serviceId }) {
  return request({
    url: `/v1/amount/log?clientId=${clientId}&serviceId=${serviceId}`,
    method: 'get'
  })
}

/**
 * 查询客户的额度历史
 * @parms clientId   客户id
 * @parms serviceId  服务id
 */
export function handTaskLog({ clientId, serviceId }) {
  return request({
    url: `/v1/amount/tasklog?clientId=${clientId}&serviceId=${serviceId}`,
    method: 'get'
  })
}

/**
 * 额度延期
 * @parms id        额度id
 * @parms deadline  重新设置的过期时间
 * @parms remark    备注
 */
export function delayAmount({ id, deadline, remark }) {
  return request({
    url: `/v1/amount/delay/${id}`,
    method: 'put',
    data: {
      deadline,
      remark
    }
  })
}

/**
 * 额度历史
 */
export function amountHistory({ pageSize, pageNum }) {
  return request({
    url: `/v1/amount/history?pageSize=${pageSize}&pageNum=${pageNum}`,
    method: 'get'
  })
}

