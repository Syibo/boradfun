/**
 * @file remi.js
 * @description 报销相关接口
 * @author YIBOSHEN
 * @date 12-16-2020
 */
import request from '@/utils/request'
// import requestDown from '@/utils/request-down'
/**
 * 报销列表
 */
export function getRemiList({ pagesize = 10, pagenum = 1, searchid = '', status = '', myreq, mytodo, application_date_begin, application_date_end }) {
  return request({
    url: `/v1/expense?pagesize=${pagesize}&pagenum=${pagenum}&searchid=${searchid}&status=${status}&myreq=${myreq}&mytodo=${mytodo}&application_date_begin=${application_date_begin}&application_date_end=${application_date_end}`,
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
