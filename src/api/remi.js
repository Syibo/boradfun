/**
 * @file remi.js
 * @description 报销相关接口
 * @author YIBOSHEN
 * @date 12-16-2020
 */
import request from '@/utils/request'
import requestDown from '@/utils/request-down'
// import requestFormdata from '@/utils/request-formdata'
// const config = {
//   headers: { 'Content-Type': 'multipart/form-data' }
// }
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
export function getRemiList({ pagesize = 10, pagenum = 1, searchid = '', name = '', status = '', myreq, mytodo = '', application_date_begin, application_date_end, todostatus = '' }) {
  return request({
    url: `/v1/expense?pagesize=${pagesize}&pagenum=${pagenum}&searchid=${searchid}&status=${status}&name=${name}&myreq=${myreq}&mytodo=${mytodo}&application_date_begin=${application_date_begin}&application_date_end=${application_date_end}&todostatus=${todostatus}`,
    method: 'get'
  })
}
/**
 * 申请报销
 */
export function setRemi(data, code) {
  return request({
    url: `/v1/expense?code=${code}`,
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
/**
 * 支付银行卡信息
 */
export function getDebitCard(id) {
  return request({
    url: `/v1/expense/${id}/debit_card`,
    method: 'get'
  })
}
/**
 * 导出待支付信息
 */
export function downUnpaid({ pagesize = 10, pagenum = 1, searchid = '', name = '', status = '', myreq, mytodo = '', application_date_begin, application_date_end, todostatus = '', ids }) {
  return requestDown({
    url: `/v1/expense/export/unpaid?pagesize=${pagesize}&pagenum=${pagenum}&searchid=${searchid}&status=${status}&name=${name}&myreq=${myreq}&mytodo=${mytodo}&application_date_begin=${application_date_begin}&application_date_end=${application_date_end}&todostatus=${todostatus}&ids=${ids}`,
    method: 'get',
    responseType: 'arraybuffer'
  })
}
/**
 * 批量支付
 */
export function batchPaid({ pagesize = 10, pagenum = 1, searchid = '', name = '', status = '', myreq, mytodo = '', application_date_begin, application_date_end, todostatus = '', ids }) {
  return request({
    url: `/v1/expense/paid/batch?pagesize=${pagesize}&pagenum=${pagenum}&searchid=${searchid}&status=${status}&name=${name}&myreq=${myreq}&mytodo=${mytodo}&application_date_begin=${application_date_begin}&application_date_end=${application_date_end}&todostatus=${todostatus}&ids=${ids}`,
    method: 'put'
  })
}
/**
 * 项目交付创建
 */
export function sublimtProject(period_time, data) {
  return request({
    url: `/v1/project?period_time=${period_time}`,
    method: 'post',
    data
  })
}
/**
 * 项目交付过滤字段
 */
export function sublimtProjectFilter() {
  return request({
    url: `/v1/project/filter`,
    method: 'get'
  })
}
/**
 * 项目交付列表
 */
export function getProjectList({ pagenum, pagesize, period_time, project_name }) {
  return request({
    url: `/v1/project?pagenum=${pagenum}&pagesize=${pagesize}&period_time=${period_time}&project_name=${project_name}`,
    method: 'get'
  })
}
/**
 * 创建engagement
 */
export function creatEengagement(fromData) {
  return request({
    url: `/v1/engagement`,
    method: 'post',
    data: fromData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
/**
 * 人员管理周数据列表
 */
export function getEngagement({ pagenum, pagesize, period_time }) {
  return request({
    url: `/v1/engagement/period?pagenum=${pagenum}&pagesize=${pagesize}&period_time=${period_time}`,
    method: 'get'
  })
}
/**
 * 人员管理周数据详细
 */
export function getEngagementDetail({ period_time }) {
  return request({
    url: `/v1/engagement/period/detail?period_time=${period_time}`,
    method: 'get'
  })
}
/**
 * 项目列表
 */
export function getEngagementList({ engagement_codes = [], begin_time, end_time }) {
  const engagement_codesString = engagement_codes.join(',')
  console.log(engagement_codesString)
  return request({
    url: `/v1/engagement?engagement_codes=${engagement_codesString}&begin_time=${begin_time}&end_time=${end_time}`,
    method: 'get'
  })
}
/**
 * 获取项目
 */
export function getEngagementProject() {
  return request({
    url: `/v1/engagement/project`,
    method: 'get'
  })
}
