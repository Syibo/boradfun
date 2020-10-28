/**
 * 状态
 */
export const STATUSVALUE = [
  { value: 0, label: '未入职' },
  { value: 1, label: '拟入职' },
  { value: 2, label: '已入职' },
  { value: 3, label: '申请离职' },
  { value: 4, label: '已离职' }
]
/**
 * 状态
 */
export const STATUSVALUEAll = [
  { value: 0, label: '未入职' },
  { value: 2, label: '在职' },
  { value: 3, label: '离职' }
]
/**
 * 状态
 */
export const STATUSVALUEADD = [
  { value: 0, label: '未入职' },
  { value: 1, label: '拟入职' },
  { value: 2, label: '已入职' }
]

/**
 * 加班类型
 */
export const TYPEVALUE = [
  { value: 'workday', label: '工作日' },
  { value: 'weekend', label: '周末' },
  { value: 'holiday', label: '节假日' },
  { value: 'home', label: '在家办公' }
]

/**
 * 请假类型
 */
export const LEAVEVALUE = [
  { value: 'PrivateAffair', label: '事假' },
  { value: 'Sick', label: '病假' },
  { value: 'Shift', label: '轮休' },
  { value: 'Flexible', label: '调休' },
  { value: 'Annual', label: '年假' },
  { value: 'Marital', label: '婚假' },
  { value: 'Maternity', label: '产假' },
  { value: 'Funeral', label: '丧假' }
]

/**
 * 加班状态
 */
export const WORKSTATUSVALUE = [
  { value: 'NA', label: '待审核' },
  { value: 'Approved', label: '审核通过' },
  { value: 'Rejected', label: '驳回' }
]

/**
 * 工作流程
 */
export const WORKFLOW = [
  { value: 'Overtime', label: '加班流程' },
  { value: 'Leave', label: '请假流程' },
  { value: 'EmployeeEntry', label: '入职流程' },
  { value: 'EmployeeLeave', label: '离职流程' }
]

export const DOWNURL = 'http://172.16.9.195:9000'
