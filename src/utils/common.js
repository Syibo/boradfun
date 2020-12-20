/**
 * @file common.js
 * @description 公共方法
 * @author YIBOSHEN
 * @date 09-22-2020
 */

/**
 * 获取当前流程的状态
 * @param {string} status value
 */
import { WORKFLOW, LEAVEVALUE, TYPEVALUE } from './const.js'
import Moment from 'moment'
export function retWorkflowLabel(status) {
  let s = ''
  switch (status) {
    case 'Completed':
      s = '已提交'
      break
    case 'Approved':
      s = '已同意'
      break
    case 'Rejected':
      s = '已拒绝'
      break
    case 'Processing':
      s = '正在处理'
      break
    case 'NA':
      s = '未处理'
      break
    case 'Paid':
      s = '已支付'
      break
    case 'Unpaid':
      s = '待支付'
      break
    default:
      break
  }
  return s
}
/**
 * 获取当前流程的icon
 * @param {string} status value
 */
export function retWorkflowIcon(status) {
  let s = ''
  switch (status) {
    case 'Completed':
      s = 'el-icon-success'
      break
    case 'Approved':
      s = 'el-icon-success'
      break
    case 'Rejected':
      s = 'el-icon-error error-color'
      break
    case 'Processing':
      s = 'el-icon-warning padd-color'
      break
    case 'NA':
      s = 'el-icon-warning'
      break
    case 'Paid':
      s = 'el-icon-success'
      break
    case 'Unpaid':
      s = 'el-icon-warning padd-color'
      break
    default:
      break
  }
  return s
}
/**
 * 获取当前流程的位置
 * @param {string} status value
 */
export function getaActive(notes) {
  let active = 0
  let Approved = 0
  let Paid = 0
  var na = notes.map((item) => item.status)
  const countOccurences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)
  active = countOccurences(na, 'Completed')
  Approved = countOccurences(na, 'Approved')
  Paid = countOccurences(na, 'Paid')
  return active + Approved + Paid
}
/**
 * 返回文件的名称
 */
export function retFileName(name) {
  let re = ''
  if (name) {
    re = name.split('_')[1]
  }
  return re
}
/**
 * 返回员工状态
 */
export function retStatus(status) {
  let s = ''
  switch (status) {
    case 0:
      s = '未入职'
      break
    case 1:
      s = '拟入职'
      break
    case 2:
      s = '已入职'
      break
    case 3:
      s = '申请离职'
      break
    case 4:
      s = '已离职'
      break
    default:
      break
  }
  return s
}
/**
 * 返回流程value
 */
export function retWorkflowEntity(status) {
  const workflow = WORKFLOW.find((item) => { return item.value === status })
  if (workflow) {
    return workflow.label || ''
  } else {
    return '未知状态'
  }
}
/**
 * 返回流程detail
 */
export function goDetail(status) {
  switch (status) {
    case 'Overtime':
      this.$router.push({
        path: 'attendance/workOvertime'
      })
      break
    case 'Leave':
      this.$router.push({
        path: 'attendance/vacate'
      })
      break
    case 'EmployeeEntry':
      this.$router.push({
        path: 'employees/induction'
      })
      break
    case 'EmployeeLeave':
      this.$router.push({
        path: 'employees/departure'
      })
      break
    default:
      break
  }
}
/**
 * 返回请假类型
 */
export function retLeaveValue(status) {
  const leave = LEAVEVALUE.find((item) => { return item.value === status })
  if (leave) {
    return leave.label || ''
  } else {
    return '未知状态'
  }
}
/**
 * 返回加班类型
 */
export function retWorkValue(status) {
  const leave = TYPEVALUE.find((item) => { return item.value === status })
  if (leave) {
    return leave.label || ''
  } else {
    return '未知状态'
  }
}
/**
 * 返回标准时间格式
 */
export function parseTime(date) {
  return Moment(date).format('YYYY-MM-DD HH:mm:ss')
}
/**
 * 根据日期算年龄
 */
export function ages(str) {
  const aDate = new Date()
  const thisYear = aDate.getFullYear()
  const brith = str.substr(0, 4)
  const age = (thisYear - brith)
  return age
}
