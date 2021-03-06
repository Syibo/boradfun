import { isNum, isEmail, isNumPlus } from '@/utils/validate'
export const ruleForm = {
  department: {
    leader: {}
  },
  level: {},
  name: '',
  gender: '',
  status: 1,
  mobile: '',
  id_card: '', plan_date: '',
  interview_comment: '',
  resume: '', email: '', wx_work: '', tapd: '', service_line: '', department_id: '', leader_id: '',
  level_id: '', position: '', entry_date: '', seat_number: '', device_req: ''
}

export const ruleFormDep = {
  name: '',
  department_id: '',
  employeeID: '',
  ID: '',
  position: '',
  account: '', computer: '', phone: '', expense: '', device_req: '', work_day: '', off_day: '', half_day: '',
  change_day: '', others: '', late_day: '', things_day: '', salary_day: '', annual_day: '', resignation_date: '', reason: ''
}

export const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 23, message: '长度在 2 到 23 个字符', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  id_card: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { min: 18, max: 18, message: '身份证号应为18位字符', trigger: 'blur' }
  ],
  interview_comment: [
    { required: true, message: '请输入面试评价', trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '手机号码应为11位数字', trigger: 'blur' },
    { validator: isNum, trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择入职状态', trigger: 'change' }
  ],
  department_id: [
    { required: true, message: '请选择部门', trigger: 'change' }
  ],
  position: [
    { required: true, message: '请输入岗位', trigger: 'blur' }
  ],
  service_line: [
    { required: true, message: '请选择服务线', trigger: 'change' }
  ],
  level_id: [
    { required: true, message: '请选择级别', trigger: 'change' }
  ],
  email: [
    { required: true, message: '请输入企业邮箱', trigger: 'blur' },
    { validator: isEmail, trigger: 'blur' }
  ],
  wx_work: [
    { required: true, message: '请输入企业微信', trigger: 'blur' }
  ],
  tapd: [
    { required: true, message: '请输入TAPD', trigger: 'blur' }
  ],
  plan_date: [
    { required: true, message: '请选择计划入职时间', trigger: 'change' }
  ],
  seat_number: [
    { required: true, message: '请输入座位号', trigger: 'blur' }
  ],
  device_req: [
    { required: true, message: '请输入设备需求', trigger: 'blur' }
  ]
}

export const rulesDep = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'change' }
  ],
  resignation_date: [
    { required: true, message: '选择离职日期', trigger: 'change' }
  ],
  reason: [
    { required: true, message: '请输入离职原因', trigger: 'blur' }
  ],
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  computer: [
    { required: true, message: '请输入电脑型号', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机型号', trigger: 'blur' }
  ],
  expense: [
    { required: true, message: '请输入报销', trigger: 'blur' },
    { validator: isNumPlus, trigger: 'blur' }
  ],
  device_req: [
    { required: true, message: '请输入物品领用归还', trigger: 'blur' }
  ],
  work_day: [
    { required: true, message: '请输入实际出勤天数', trigger: 'blur' },
    { validator: isNumPlus, trigger: 'blur' }
  ],
  off_day: [
    { required: true, message: '请输入旷工', trigger: 'blur' },
    { validator: isNumPlus, trigger: 'blur' }
  ],
  half_day: [
    { required: true, message: '请输入病假', trigger: 'blur' },
    { validator: isNumPlus, trigger: 'blur' }
  ],
  change_day: [
    { required: true, message: '请输入剩余调休', trigger: 'blur' },
    { validator: isNumPlus, trigger: 'blur' }
  ],
  others: [
    { required: true, message: '请输入其他结算', trigger: 'blur' },
    { validator: isNumPlus, trigger: 'blur' }
  ],
  late_day: [
    { required: true, message: '请输入迟到/早退', trigger: 'blur' },
    { validator: isNumPlus, trigger: 'blur' }
  ],
  things_day: [
    { required: true, message: '请输入事假', trigger: 'blur' },
    { validator: isNumPlus, trigger: 'blur' }
  ],
  salary_day: [
    { required: true, message: '请输入带薪假', trigger: 'blur' },
    { validator: isNumPlus, trigger: 'blur' }
  ],
  annual_day: [
    { required: true, message: '请输入剩余年假', trigger: 'blur' },
    { validator: isNumPlus, trigger: 'blur' }
  ]
}
