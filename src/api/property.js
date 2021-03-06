/**
 * @file property.js
 * @description 设备相关接口
 * @author YIBOSHEN
 * @date 01-13-2021
 */
import request from '@/utils/request'
/**
 * 易耗品列表
 * @param pagenum 页码
 * @param pagesize 页数
 * @param category 类别
 * @param keyword 关键词
 */
export function getLowPriceArticle({ pagenum, pagesize, category, keyword }) {
  return request({
    url: `v1/low_price_article?pagenum=${pagenum}&pagesize=${pagesize}&category=${category}&keyword=${keyword}`,
    method: 'get'
  })
}
/**
 * 创建易耗品
 * @param low_price_article_category 类别
 * @param low_price_article_name 名称
 * @param brand 品牌
 * @param retailer 经销商
 */
export function addLowPriceArticle({ low_price_article_category, low_price_article_name, brand, retailer, site, purchase_price, total_quantity, comment, need_return }) {
  return request({
    url: `v1/low_price_article`,
    method: 'post',
    data: {
      low_price_article_category, low_price_article_name, brand, retailer, site, purchase_price, total_quantity, comment, need_return
    }
  })
}
/**
 * 易耗品借出
 * @param low_price_article_id 易耗品ID
 * @param operator_id 操作用户ID
 * @param associate_employee_id 关联领用用户ID
 * @param associate_employee_name 关联领用用户名称
 * @param quantity 数量
 * @param comment 备注
 */
export function postLowPriceArticleOutgoing({ low_price_article_id, operator_id, associate_employee_id, associate_employee_name, quantity, comment }) {
  return request({
    url: `v1/low_price_article_requisition/outgoing`,
    method: 'post',
    data: {
      low_price_article_id, operator_id, associate_employee_id, associate_employee_name, quantity, comment
    }
  })
}
/**
 * 易耗品操作记录列表
 * @param low_price_article_id 易耗品ID
 * @param employee_name 关键字
 */
export function getLowPriceArticleList({ pagenum, pagesize, low_price_article_id, employee_name, category }) {
  return request({
    url: `v1/low_price_article_requisition?pagenum=${pagenum}&pagesize=${pagesize}&low_price_article_id=${low_price_article_id}&employee_name=${employee_name}&category=${category}`,
    method: 'get'
  })
}
/**
 * 易耗品报废
 * @param low_price_article_id 易耗品ID
 * @param operator_id 操作用户ID
 * @param quantity 数量
 * @param comment 备注
 */
export function lowPriceArticleListScrap({ low_price_article_id, operator_id, quantity, comment }) {
  return request({
    url: `v1/low_price_article_requisition/scrap`,
    method: 'post',
    data: {
      low_price_article_id, operator_id, quantity, comment
    }
  })
}
/**
 * 易耗品详情
 * @param id id
 */
export function lowPriceArticleDetail(id) {
  return request({
    url: `v1/low_price_article/${id}`,
    method: 'get'
  })
}
/**
 * 易耗品归还
 * @param id id
 */
export function postLowPriceArticleReturn({ id, status }) {
  return request({
    url: `v1/low_price_article_requisition/${id}/return?status=${status}`,
    method: 'post'
  })
}
/**
 * 易耗品批量归还
 * @param ids ids
 */
export function postLowPriceArticleReturnBatch(ids) {
  return request({
    url: `v1/low_price_article_requisition/return/batch?ids=${ids}`,
    method: 'post'
  })
}
/**
 * 易耗品借出列表
 * @param pagenum 页码
 * @param pagesize 页数
 */
export function lowPriceArticleUutgoing({ pagenum, pagesize }) {
  return request({
    url: `v1/low_price_article/employee/outgoing?pagenum=${pagenum}&pagesize=${pagesize}`,
    method: 'get'
  })
}

/**
 * 设备列表
 * @param pagenum 页码
 * @param pagesize 页数
 */
export function getDeviceList({ pagenum, pagesize, keyword, device_category, device_status }) {
  return request({
    url: `v1/device?pagenum=${pagenum}&pagesize=${pagesize}&keyword=${keyword}&device_category=${device_category}&device_status=${device_status}`,
    method: 'get'
  })
}
/**
 * 新增设备
 */
export function addDevice(data) {
  return request({
    url: `v1/device`,
    method: 'post',
    data
  })
}
/**
 * 编辑设备
 */
export function editDevice(data) {
  return request({
    url: `v1/device`,
    method: 'put',
    data
  })
}
/**
 * 设备详情
 */
export function deviceDetail(id) {
  return request({
    url: `v1/device/${id}`,
    method: 'get'
  })
}
/**
 * 申请设备选择项目和审核人
 */
export function deviceProjects() {
  return request({
    url: `v1/device/projects`,
    method: 'get'
  })
}
/**
 * 申请设备基本信息
 */
export function deviceApplyInfo({ employee_id, device_id }) {
  return request({
    url: `v1/device/apply/info?employee_id=${employee_id}&device_id=${device_id}`,
    method: 'get'
  })
}
/**
 * 申请设备
 */
export function deviceApply({ engagement_code, device_id, project, leader_id }) {
  return request({
    url: `v1/device/apply`,
    method: 'post',
    data: {
      engagement_code,
      device_id,
      project,
      leader_id
    }
  })
}
/**
 * 设备已申请列表
 */
export function deviceIdApply(id) {
  return request({
    url: `v1/device/${id}/apply`,
    method: 'get'
  })
}
/**
 * 申请设备列表
 */
export function deviceIdApplyList({ pagenum, pagesize, myreq, mytodo, status, category = '', search = '', todostatus }) {
  return request({
    url: `v1/device/apply?pagenum=${pagenum}&pagesize=${pagesize}&myreq=${myreq}&mytodo=${mytodo}&status=${status}&category=${category}&search=${search}&todostatus=${todostatus}`,
    method: 'get'
  })
}
/**
 * 审核申请设备
 */
export function deviceApproval({ id, status, comment }) {
  return request({
    url: `v1/device/apply/approval`,
    method: 'put',
    data: {
      id, status, comment
    }
  })
}
/**
 * 申请设备详情
 */
export function deviceApprovalDetail(id) {
  return request({
    url: `v1/device/apply/${id}`,
    method: 'get'
  })
}
/**
 * 申请借出
 */
export function deviceOutgoing({ id, device_apply_id }) {
  return request({
    url: `v1/device/${id}/outgoing?device_apply_id=${device_apply_id}`,
    method: 'put'
  })
}
/**
 *  我的资产-设备借出列表
 */
export function employeeOutgoing() {
  return request({
    url: `v1/device/employee/outgoing`,
    method: 'get'
  })
}
/**
 *  我的资产--易耗品借出列表
 */
export function lowPriceArticleOutgoing() {
  return request({
    url: `v1/low_price_article/employee/outgoing`,
    method: 'get'
  })
}
/**
 *  我的资产--设备归还列表
 */
export function lowPriceArticleReturn() {
  return request({
    url: `v1/device/employee/return`,
    method: 'get'
  })
}
/**
 *  设备领用
 */
export function deviceReceive(id) {
  return request({
    url: `v1/device/${id}/receive`,
    method: 'put'
  })
}
/**
 *  设备分配
 */
export function deviceDistribution({ id, employee_id, employee_name, engagement_code, project }) {
  return request({
    url: `v1/device/${id}/distribution?employee_id=${employee_id}&employee_name=${employee_name}&engagement_code=${engagement_code}&project=${project}`,
    method: 'put'
  })
}
/**
 *  申请设备撤回
 */
export function deviceRevoke(id) {
  return request({
    url: `v1/device/apply/${id}/revoke`,
    method: 'put'
  })
}
