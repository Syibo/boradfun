/**
 * @file work.js
 * @description 考勤相关接口
 * @author YIBOSHEN
 * @date 09-21-2020
 */
import request from '@/utils/request'
import requestDown from '@/utils/request-down'
/**
 * 加班列表
 */
export function getWorkList({ pagesize = 10, pagenum = 1, name = '', status = '', type = '', myreq, mytodo }) {
  return request({
    url: `/v1/work/overtime?pagesize=${pagesize}&pagenum=${pagenum}&name=${name}&status=${status}&type=${type}&myreq=${myreq}&mytodo=${mytodo}`,
    method: 'get'
  })
}
/**
 * 加班申请
 */
export function overtime({ type, project, duration, cause, engagement_code, leader_id, start_time, end_time }) {
  return request({
    url: '/v1/work/overtime',
    method: 'post',
    data: { type, project, duration: Number(duration), cause, overtime_date: start_time.substring(0, 10), engagement_code, leader_id, start_time, end_time }
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
 * 校验加班时长
 */
export function putOneOverTimeCheck({ id, real }) {
  return request({
    url: `/v1/work/overtime/${id}/check?real=${real}`,
    method: 'put'
  })
}
/**
 * 请假时长校验
 */
export function putOneLeaveCheck({ id, real }) {
  return request({
    url: `/v1/work/leave/${id}/check?real=${real}`,
    method: 'put'
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
 * 请假审批人
 */
export function getleaveApprovals() {
  return request({
    url: `/v1/work/leave/approvals`,
    method: 'get'
  })
}
/**
 * 请假列表
 */
export function getLeaveList({ pagesize = 10, pagenum = 1, name = '', status = '', type = '', myreq, mytodo }) {
  return request({
    url: `/v1/work/leave?pagesize=${pagesize}&pagenum=${pagenum}&name=${name}&status=${status}&type=${type}&myreq=${myreq}&mytodo=${mytodo}`,
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
/**
 * 部门下项目
 */
export function getWorkProjects(desc = '') {
  return request({
    url: `/v1/work/overtime/projects?desc=${desc}`,
    method: 'get'
  })
}
/**
 * 上传考勤
 */
export function upWorkAttendance() {
  return request({
    url: `/v1/work/attendance/tmp`,
    method: 'post'
  })
}
/**
 * 查询人员考勤tmp
 */
export function getWorkAttendanceTmp({ name = '', year = '', month = '' }) {
  return request({
    url: `/v1/work/attendance/tmp?name=${name}&year=${year}&month=${month}`,
    method: 'get'
  })
}
/**
 * 查询已确认考勤
 */
export function getWorkAttendance({ name = '', year = '', month = '' }) {
  return request({
    url: `/v1/work/attendance?name=${name}&year=${year}&month=${month}`,
    method: 'get'
  })
}
/**
 * 修改考勤tmp
 */
export function putWorkAttendanceTmp({ ID, dept, name, status, result, check_time, employee_id, leave_id }) {
  return request({
    url: `/v1/work/attendance/tmp`,
    method: 'put',
    data: { ID, dept, name, status, result, attendance_date: check_time.substring(0, 10), check_time, employee_id, leave_id }
  })
}
/**
 * 修改考勤
 */
export function putWorkAttendance({ ID, dept, name, attendance_date, check_in, check_out, in_status, out_status, in_result, out_result, leave_id }) {
  return request({
    url: `/v1/work/attendance`,
    method: 'put',
    data: { ID, dept, name, attendance_date, check_in, check_out, in_status, out_status, in_result, out_result, leave_id }
  })
}
/**
 * 删除考勤tmp
 */
export function delWorkAttendanceTmp(id) {
  return request({
    url: `/v1/work/attendance/tmp/${id}`,
    method: 'delete'
  })
}
/**
 * 查询部门人员
 */
export function getWorkDeptuser({ name = '', year = '', month = '' }) {
  return request({
    url: `/v1/work/attendance/deptuser?name=${name}&year=${year}&month=${month}`,
    method: 'get'
  })
}
/**
 * 导出POS
 */
export function downWorkPos({ year = '2020', month = '08' }) {
  return requestDown({
    url: `/v1/work/attendance/pos?year=${year}&month=${month}`,
    method: 'get',
    responseType: 'arraybuffer'
  })
}
/**
 * 导出考勤请假迟到
 */
export function downWorkData({ year = '2020', month = '08' }) {
  return requestDown({
    url: `/v1/work/attendance/data?year=${year}&month=${month}`,
    method: 'get',
    responseType: 'arraybuffer'
  })
}
/**
 * 批量确认考勤
 */
export function checkPostAtt({ year = '2020', month = '08', name }) {
  return requestDown({
    url: `/v1/work/attendance?year=${year}&month=${month}`,
    method: 'post',
    data: name
  })
}
/**
 * 按日期查询请假
 */
export function getLeavebydate({ date, name }) {
  return requestDown({
    url: `/v1/work/leavebydate?date=${date}&name=${name}`,
    method: 'get'
  })
}
/**
 * 添加考勤tmp
 */
export function addWorkAttendanceTmp({ dept, name, status, result, check_time, employee_id, leave_id, attendance_date }) {
  return request({
    url: `/v1/work/attendance/create/tmp`,
    method: 'post',
    data: { dept, name, status, result, attendance_date, check_time, employee_id, leave_id }
  })
}

/**
 * 获取剩余年假
 */
export function getHoliday() {
  return request({
    url: `/v1/work/remain/holiday`,
    method: 'get'
  })
}
