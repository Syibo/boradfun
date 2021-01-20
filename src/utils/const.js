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
export const STATUSVALUEDIS = [
  { value: 0, label: '未入职' },
  { value: 1, label: '未入职' },
  { value: 2, label: '在职' },
  { value: 3, label: '离职' },
  { value: 4, label: '离职' }
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
  { value: 'holiday', label: '节假日' }
]

/**
 * 请假类型
 */
export const LEAVEVALUE = [
  { value: 'PrivateAffair', label: '事假' },
  { value: 'Sick', label: '病假' },
  { value: 'Shift', label: '调休' },
  { value: 'Flexible', label: '弹性' },
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
 * 报销状态
 */
export const REIMSVALUE = [
  { value: 'NA', label: '待审核' },
  { value: 'Rejected', label: '驳回' },
  { value: 'Paid', label: '已支付' },
  { value: 'Unpaid', label: '待支付' }
]

/**
 * 工作流程
 */
export const WORKFLOW = [
  { value: 'Overtime', label: '加班流程' },
  { value: 'Leave', label: '请假流程' },
  { value: 'EmployeeEntry', label: '入职流程' },
  { value: 'EmployeeLeave', label: '离职流程' },
  { value: 'Expense', label: '报销流程' }
]

/**
 * 易耗品类别
 */
export const CATEGORY = [
  { value: 'IT', label: 'IT耗件' },
  { value: 'Office', label: '办公用品' }
]

/**
 * 设备分类
 */
export const DECVICECATEGORY = [
  { value: 'PC', label: 'PC' },
  { value: 'Laptop', label: 'Laptop' },
  { value: 'iMac', label: 'iMac' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'Pad', label: 'Pad' },
  { value: 'Monitor', label: 'Monitor' },
  { value: 'Network', label: 'Network' }
]

/**
 * 设备分类
 */
export const DECVICESTATUS = [
  { value: 'Free', label: '空闲' },
  { value: 'Possessed', label: '占有' },
  { value: 'Fixing', label: '维修' },
  { value: 'Scrap', label: '报废' }
]

/**
 * 设备分类
 */
export const DECVICETYPE = [
  { value: 'Approved', label: '审核通过' },
  { value: 'Rejected', label: '驳回' },
  { value: 'Distributed', label: '已分配' },
  { value: 'Revoked', label: '已撤销' }
]

/**
 * 设备分类
 */
export const LOWTYPE = [
  { value: 'Ingoing', label: '入库' },
  { value: 'Outgoing', label: '借出' },
  { value: 'Scrap', label: '报废' },
  { value: 'Return', label: '归还' }
]

export const DOWNURL = 'http://172.16.9.195:9000'
