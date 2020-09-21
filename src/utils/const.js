/**
 * 协议
 */
export const STATUSVALUE = [
  { value: 0, label: '未入职' },
  { value: 1, label: '拟入职' },
  { value: 2, label: '已入职' },
  { value: 3, label: '申请离职' },
  { value: 4, label: '已离职' }
]

/**
 * 加班类型
 */
export const TYPEVALUE = [
  { value: 'workday', label: '工作日' },
  { value: 'weekend', label: '周末' },
  { value: 'holiday', label: '节假日' }
]

/**
 * 加班状态
 */
export const WORKSTATUSVALUE = [
  { value: 'NA', label: '未完成' },
  { value: 'Approved', label: '审核中' },
  { value: 'Rejected', label: '已完成' }
]

export const DOWNURL = 'http://172.16.9.195:9000'
