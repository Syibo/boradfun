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
  level_id, position, entry_date, seat_number, device_req }) {
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
      level_id, position, entry_date, seat_number, device_req
    }
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
