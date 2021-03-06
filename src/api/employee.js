/**
 * @file employee.js
 * @description 员工相关接口
 * @author YIBOSHEN
 * @date 09-06-2020
 */
import request from '@/utils/request'
/**
 * 部门列表
 */
export function getDepartmentList() {
  return request({
    url: '/v1/department/list',
    method: 'get'
  })
}
/**
 * 部门下级别
 */
export function getDepartmentLevelList(id) {
  return request({
    url: `/v1/department/level/${id}`,
    method: 'get'
  })
}
/**
 * 部门下服务线
 */
export function getDepartmentServiceList(id) {
  return request({
    url: `/v1/department/service/${id}`,
    method: 'get'
  })
}

/**
 * 删除员工
 */
export function delEmployeeId(id) {
  return request({
    url: `/v1/employee/${id}`,
    method: 'delete'
  })
}

/**
 * 员工列表
 */
export function getEmployeeList({ pagesize = 10, pagenum = 1, name = '', departmentid = '', status = '', emp_no = '', flow }) {
  return request({
    url: `/v1/employee/entry/list?pagesize=${pagesize}&pagenum=${pagenum}&name=${name}&departmentid=${departmentid}&status=${status}&emp_no=${emp_no}&flow=${flow}`,
    method: 'get'
  })
}
/**
 * 新建入职
 * @param name 姓名
 * @param gender 服务id
 * @param status integer
 * @param mobile 手机
 * @param id_card 身份证
 * @param interview_comment 面试评价
 * @param 'http://172.16.9.198:3000/project/87/interface/api/1774'
 */
export function addEmployee({ name, gender, status, mobile, id_card, interview_comment, resume, email, wx_work, tapd, service_line, department_id, leader_id,
  level_id, position, entry_date = '', seat_number, device_req, plan_date }) {
  return request({
    url: `/v1/employee/new`,
    method: 'post',
    data: {
      name,
      gender,
      status,
      mobile,
      id_card,
      interview_comment,
      resume, email, wx_work, tapd, service_line: String(service_line), department_id, leader_id,
      level_id, position, entry_date, seat_number, device_req, plan_date
    }
  })
}
/**
 * 提交入职流程信息
 */
export function putEmployee(id, { email, wx_work, tapd, plan_date, seat_number, device_req }) {
  return request({
    url: `/v1/employee/workflow/${id}`,
    method: 'put',
    data: { email, wx_work, tapd, plan_date, seat_number, device_req }
  })
}
/**
 * employee详情
 */
export function getEmployeeDetail(id) {
  return request({
    url: `/v1/employee/entry/detail/${id}`,
    method: 'get'
  })
}
/**
 * 流程信息
 */
export function getEmployeeWorkflow(id, type = 'entry') {
  return request({
    url: `/v1/employee/workflow/${id}?type=${type}`,
    method: 'get'
  })
}
/**
 * hr新建离职
 * @param 'http://172.16.9.198:3000/project/87/interface/api/1774'
 */
export function leaveEmployee(id, { account, computer, phone, expense, device_req, work_day, off_day, half_day,
  change_day, others, late_day, things_day, salary_day, annual_day, resignation_date, reason }) {
  return request({
    url: `/v1/employee/leave/${id}`,
    method: 'post',
    data: {
      account, computer, phone, expense, device_req, work_day, off_day, half_day,
      change_day, others, late_day, things_day, salary_day, annual_day, resignation_date, reason
    }
  })
}
/**
 * 编辑离职
 * @param 'http://172.16.9.198:3000/project/87/interface/api/1774'
 */
export function editLeaveEmployee(id, { account, computer, phone, expense, device_req, work_day, off_day, half_day, ID,
  change_day, others, late_day, things_day, salary_day, annual_day }) {
  return request({
    url: `/v1/employee/leave/${id}`,
    method: 'put',
    data: {
      account, computer, phone, expense, device_req, work_day, off_day, half_day, ID,
      change_day, others, late_day, things_day, salary_day, annual_day
    }
  })
}
/**
 * 离职详情
 */
export function leaveEmployeeDetail(id) {
  return request({
    url: `/v1/employee/leave/${id}`,
    method: 'get'
  })
}
/**
 * 合同列表
 */
export function getContractsList({ pagesize = 10, pagenum = 1, name = '', number = '', status = '', main = '' }) {
  return request({
    url: `/v1/employee/contracts?pagesize=${pagesize}&pagenum=${pagenum}&name=${name}&number=${number}&status=${status}&main=${main}`,
    method: 'get'
  })
}
/**
 * 单个合同删除
 */
export function delContracts(id) {
  return request({
    url: `/v1/employee/contract/${id}`,
    method: 'delete'
  })
}
/**
 * 单个合同信息
 */
export function getContractsDetail(id) {
  return request({
    url: `/v1/employee/contract/${id}`,
    method: 'get'
  })
}
/**
 * 新建合同
 */
export function addContracts(id, { contract_type, contract_party, contract_main, contract_start_date, contract_end_date,
  trial_period, annual_leave, status, soft_copy, scanned_copy }) {
  return request({
    url: `/v1/employee/contract/${id}`,
    method: 'post',
    data: {
      contract_type, contract_party, contract_main, contract_start_date, contract_end_date,
      trial_period: Number(trial_period),
      annual_leave: Number(annual_leave),
      status, soft_copy, scanned_copy
    }
  })
}

/**
 * 单个员工合同列表
 */
export function getContractsAllDetail(id) {
  return request({
    url: `/v1/employee/contracts/${id}`,
    method: 'get'
  })
}
/**
 * 编辑合同
 */
export function editContracts({ ID, contract_type, contract_party, employee_id, contract_main, contract_start_date, contract_end_date,
  trial_period, annual_leave, status, soft_copy, scanned_copy }) {
  return request({
    url: `/v1/employee/contract`,
    method: 'put',
    data: {
      ID,
      employee_id,
      contract_type, contract_party, contract_main, contract_start_date, contract_end_date,
      trial_period: Number(trial_period),
      annual_leave: Number(annual_leave),
      status, soft_copy, scanned_copy
    }
  })
}
/**
 * 获取emp详情
 */
export function getEmployeeAllDetail(id) {
  return request({
    url: `/v1/employee/detail/${id}`,
    method: 'get'
  })
}
/**
 * 保存所有信息
 */
export function putEmployeeDetail(data) {
  return request({
    url: `/v1/employee/save`,
    method: 'put',
    data
  })
}
/**
 * 我的审批
 */
export function getBenchmMapprove({ pagesize = 100, pagenum = 1, type = 'todo' }) {
  return request({
    url: `/v1/bench/myapprove?pagesize=${pagesize}&pagenum=${pagenum}&type=${type}`,
    method: 'get'
  })
}
/**
 * 我的申请
 */
export function getBenchMyreq({ pagesize = 100, pagenum = 1, type = 'todo' }) {
  return request({
    url: `/v1/bench/myreq?pagesize=${pagesize}&pagenum=${pagenum}&type=${type}`,
    method: 'get'
  })
}
/**
 * 续签列表
 */
export function getContinueList({ pagesize = 100, pagenum = 1 }) {
  return request({
    url: `/v1/employee/contract/continue?pagesize=${pagesize}&pagenum=${pagenum}`,
    method: 'get'
  })
}
/**
 * 更新入职状态
 */
export function putEmployeeStatus({ id, status, entry_date }) {
  return request({
    url: `/v1/employee/status/${id}?status=${status}&entry_date=${entry_date}`,
    method: 'put'
  })
}
/**
 * 社保信息
 */
export function getSslist() {
  return request({
    url: `/v1/file/sslist`,
    method: 'get'
  })
}
/**
 * 获取信息
 */
export function getEmpSearch(name) {
  return request({
    url: `/v1/employee/search?name=${name}`,
    method: 'get'
  })
}
