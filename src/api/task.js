/**
 * @file task.js
 * @description 任务相关接口
 * @author YIBOSHEN
 * @date 07-15-2020
 */
import request from '@/utils/request'

/**
 * 任务提测
 * @param clientId 客户id
 * @param appName 应用名称
 * @param serviceId 服务id
 * @param preAmount 预计额度
 * @param preDate 预计测试日期
 * @param expEndDat 期望结单日期
 * @param manageId 客户服务经理id
 */
export function addTask({ clientId, appName, serviceId, preAmount, preDate, expEndDate, manageId }) {
  return request({
    url: '/v1/task',
    method: 'post',
    data: {
      clientId,
      appName,
      serviceId,
      preAmount,
      preDate,
      expEndDate,
      manageId
    }
  })
}

/**
 * 任务列表
 * @param status 状态
 * @param pageSize
 * @param pageNum
 */
export function taskList({ status, pageSize, pageNum }) {
  return request({
    url: `/v1/task/list?status=${status}&pageSize=${pageSize}&pageNum=${pageNum}`,
    method: 'get'
  })
}

/**
 * 单个任务
 * @param id 任务id
 */
export function getOneTask({ id }) {
  return request({
    url: `/v1/task/${id}`,
    method: 'get'
  })
}

/**
 * 取消任务
 * @param id 任务id
 * @param userId 操作人id
 * @param reason 取消原因
 */
export function cancelTask({ id, userId, reason }) {
  return request({
    url: `/v1/task/cancel/${id}`,
    method: 'put',
    data: {
      userId,
      reason
    }
  })
}
