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

