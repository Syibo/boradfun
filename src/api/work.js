/**
 * @file work.js
 * @description 考勤相关接口
 * @author YIBOSHEN
 * @date 09-21-2020
 */
import request from '@/utils/request'
/**
 * 加班列表
 */
export function getWorkList({ pagesize = 10, pagenum = 1, name = '', status = '', type = '' }) {
  return request({
    url: `/v1/work/overtime?pagesize=${pagesize}&pagenum=${pagenum}&name=${name}&status=${status}&type=${type}`,
    method: 'get'
  })
}
/**
 * 加班申请
 */
export function overtime({ type, project, duration, cause, overtime_date }) {
  return request({
    url: '/v1/work/overtime',
    method: 'post',
    data: { type, project, duration: Number(duration), cause, overtime_date }
  })
}
/**
 * 单个加班信息
 */
export function getOneOverTime(id) {
  return request({
    url: `/v1/work/overtime/${id}`,
    method: 'get'
  })
}
