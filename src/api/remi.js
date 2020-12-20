/**
 * @file remi.js
 * @description 报销相关接口
 * @author YIBOSHEN
 * @date 12-16-2020
 */
import request from '@/utils/request'
// import requestDown from '@/utils/request-down'
/**
 * 获取报销项目
 */
export function getRemiProjects() {
  return request({
    url: `/v1/expense/projects`,
    method: 'get'
  })
}
/**
 * 获取报销审核人
 */
export function getRemiPeople() {
  return request({
    url: `/v1/expense/approvals`,
    method: 'get'
  })
}
/**
 * 报销列表
 */
export function getRemiList({ pagesize = 10, pagenum = 1, searchid = '', status = '', myreq, mytodo, application_date_begin, application_date_end, todostatus }) {
  return request({
    url: `/v1/expense?pagesize=${pagesize}&pagenum=${pagenum}&searchid=${searchid}&status=${status}&myreq=${myreq}&mytodo=${mytodo}&application_date_begin=${application_date_begin}&application_date_end=${application_date_end}&todostatus=${todostatus}`,
    method: 'get'
  })
}
/**
 * 申请报销
 */
export function setRemi(data) {
  return request({
    url: `/v1/expense`,
    method: 'post',
    data
  })
}
/**
 * 更新报销单
 */
export function putRemi({ comment, id, status }) {
  return request({
    url: `/v1/expense`,
    method: 'put',
    data: { comment, id, status }
  })
}
/**
 * 支付报销
 */
export function putRemiPaid({ comment, id, status }) {
  return request({
    url: `/v1/expense/paid`,
    method: 'put',
    data: { comment, id, status }
  })
}
/**
 * 获取单条报销记录
 */
export function getRemiDetail(id) {
  return request({
    url: `/v1/expense/${id}`,
    method: 'get'
  })
}
/**
 * 支付信息统计
 */
export function getPaidInfo() {
  return request({
    url: `/v1/expense/paid/info`,
    method: 'get'
  })
}
