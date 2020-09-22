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
  var na = notes.map((item) => item.status)
  const countOccurences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)
  active = countOccurences(na, 'Completed')
  Approved = countOccurences(na, 'Approved')
  return active + Approved
}
