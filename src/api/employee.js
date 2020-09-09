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
 * 员工列表
 */
export function getEmployeeList({ pagesize = 10, pagenum = 1, name = '', departmentid = '', status = '' }) {
  return request({
    url: `/v1/employee/entry/list?pagesize=${pagesize}&pagenum=${pagenum}&name=${name}&departmentid=${departmentid}&status=${status}`,
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
      resume, email, wx_work, tapd, service_line, department_id, leader_id,
      level_id, position, entry_date, seat_number, device_req, plan_date
    }
  })
}
/**
 * 提交入职流程信息
 */
export function putEmployee(id, { email, wx_work, tapd, plan_time, seat_number, device_req }) {
  return request({
    url: `/v1/employee/workflow/${id}`,
    method: 'put',
    data: { email, wx_work, tapd, plan_time, seat_number, device_req }
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
export function getEmployeeWorkflow(id) {
  return request({
    url: `/v1/employee/workflow/${id}`,
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
export function getContractsList({ pagesize = 10, pagenum = 1, name = '', number = '', status = '' }) {
  return request({
    url: `/v1/employee/contracts?pagesize=${pagesize}&pagenum=${pagenum}&name=${name}&number=${number}&status=${status}`,
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
 * 编辑合同
 */
export function editContracts(id, { contract_type, contract_party, contract_main, contract_start_date, contract_end_date,
  trial_period, annual_leave, status, soft_copy, scanned_copy }) {
  return request({
    url: `/v1/employee/contract/${id}`,
    method: 'put',
    data: {
      contract_type, contract_party, contract_main, contract_start_date, contract_end_date,
      trial_period: Number(trial_period),
      annual_leave: Number(annual_leave),
      status, soft_copy, scanned_copy
    }
  })
}
