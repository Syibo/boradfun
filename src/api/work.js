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
/**
 * 加班审批
 */
export function putOneOverTime({ id, status, comment }) {
  return request({
    url: `/v1/work/overtime`,
    method: 'put',
    data: {
      id: Number(id), status: Number(status), comment
    }
  })
}
/**
 * 审批人
 */
export function getWorkApprovals() {
  return request({
    url: `/v1/work/approvals`,
    method: 'get'
  })
}
/**
 * 请假列表
 */
export function getLeaveList({ pagesize = 10, pagenum = 1, name = '', status = '', type = '' }) {
  return request({
    url: `/v1/work/leave?pagesize=${pagesize}&pagenum=${pagenum}&name=${name}&status=${status}&type=${type}`,
    method: 'get'
  })
}
/**
 * 请假申请
 */
export function workLeave({ type, duration, cause, start_date, end_date, start, end }) {
  return request({
    url: '/v1/work/leave',
    method: 'post',
    data: { type, duration: Number(duration), cause, start_date, end_date, start, end }
  })
}
/**
 * 单个请假信息
 */
export function getOneLeave(id) {
  return request({
    url: `/v1/work/leave/${id}`,
    method: 'get'
  })
}
/**
 * 请假审批
 */
export function putOneLeave({ id, status, comment }) {
  return request({
    url: `/v1/work/leave`,
    method: 'put',
    data: {
      id: Number(id), status: Number(status), comment
    }
  })
}
