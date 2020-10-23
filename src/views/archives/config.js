import { isNum } from '@/utils/validate'
export const ruleForm = {
  ID: 0,
  name: '',
  gender: '',
  status: '',
  mobile: '',
  emp_no: '',
  nation: '',
  age: '',
  politic_status: '',
  id_card: '',
  interview_comment: '',
  resume: '',
  email: '',
  personal_email: '',
  wx_work: '',
  tapd: '',
  service_line: '',
  department_id: '',
  department: {
    leader: {}
  },
  level_id: '',
  level: {},
  create_time: '',
  position: '',
  plan_date: '',
  entry_date: '',
  resignation_date: '',
  reason: '',
  req_user: '',
  employee_basic: {
    ID: 0,
    employee_id: 16,
    id_card_front: '',
    id_card_back: '',
    debit_card1: '',
    issuing_bank1: '',
    issuing_bank1_detail: '',
    debit_card1_front: '',
    debit_card2: '',
    issuing_bank2: '',
    issuing_bank2_detail: '',
    debit_card2_front: '',
    field_53: '',
    public_fund: '',
    degree: '',
    degree_property: '',
    major: '',
    graduation_school: '',
    degree_certification_copy: '',
    degree_verification: '',
    en_skill: '',
    other_language_skill: '',
    birthday: '',
    birthplace: '',
    inhabited_city: [],
    inhabited_district: '',
    inhabited_address: '',
    marriage: '',
    children: 0,
    relations: [
      { name: '', Relation: '父亲', company: '', job: '', phone: '' },
      { name: '', Relation: '母亲', company: '', job: '', phone: '' },
      { name: '', Relation: '配偶', company: '', job: '', phone: '' }
    ],
    contacts: [
      { name: '', Relation: '父亲', phone: '' },
      { name: '', Relation: '母亲', phone: '' }
    ]
  }
}

export const ruleFormCon = {
  contract_type: '', contract_party: '', contract_main: '', contract_start_date: '', contract_end_date: '',
  trial_period: 6, annual_leave: '', status, soft_copy: '', scanned_copy: '', ID: ''
}

export const rulesCon = {
  contract_party: [
    { required: true, message: '请输入签约方', trigger: 'change' }
  ],
  contract_type: [
    { required: true, message: '请选择合同类型', trigger: 'change' }
  ],
  contract_main: [
    { required: true, message: '请选择签约主体', trigger: 'change' }
  ],
  contract_start_date: [
    { required: true, message: '请选择合同开始日期', trigger: 'change' }
  ],
  contract_end_date: [
    { required: true, message: '请选择合同结束日期', trigger: 'change' }
  ],
  trial_period: [
    { required: true, message: '请输入试用期（月）', trigger: 'blur' },
    { validator: isNum, trigger: 'blur' }
  ],
  annual_leave: [
    { required: true, message: '请输入年假', trigger: 'blur' },
    { validator: isNum, trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择合同状态', trigger: 'blur' }
  ]
}

export const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 23, message: '长度在 2 到 23 个字符', trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入手机号码', trigger: 'blur' }
  ],
  id_card: [
    { required: true, message: '请输入身份证号码', trigger: 'blur' }
  ],
  ID: [
    { required: true, message: '请输入员工编号', trigger: 'blur' }
  ],
  nation: [
    { required: true, message: '请输入民族', trigger: 'blur' }
  ],
  'employee_basic.birthday': [
    { required: true, message: '请输入出生年月', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { validator: isNum, trigger: 'blur' }
  ],
  personal_email: [
    { required: true, message: '请输入私人邮箱', trigger: 'blur' }
  ],
  politic_status: [
    { required: true, message: '请输入政治面貌', trigger: 'blur' }
  ],
  interview_comment: [
    { required: true, message: '请输入面试评价', trigger: 'blur' }
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
  'employee_basic.graduation_school': [
    { required: true, message: '请输入毕业院校', trigger: 'blur' }
  ],
  'employee_basic.major': [
    { required: true, message: '请输入专业', trigger: 'blur' }
  ],
  'employee_basic.degree': [
    { required: true, message: '请输入学历', trigger: 'blur' }
  ],
  'employee_basic.degree_property': [
    { required: true, message: '请输入学历性质', trigger: 'blur' }
  ],
  'employee_basic.degree_verification': [
    { required: true, message: '学历验证', trigger: 'blur' }
  ],
  'employee_basic.en_skill': [
    { required: true, message: '请输入英语技能', trigger: 'blur' }
  ],
  'employee_basic.other_language_skill': [
    { required: true, message: '请输入其他技能', trigger: 'blur' }
  ],
  'employee_basic.birthplace': [
    { required: true, message: '请输入籍贯', trigger: 'blur' }
  ],
  'employee_basic.inhabited_city': [
    { required: true, message: '请输入居住城市', trigger: 'blur' }
  ],
  'employee_basic.inhabited_address': [
    { required: true, message: '请输入居住详细地址', trigger: 'blur' }
  ],
  'employee_basic.marriage': [
    { required: true, message: '请选择婚姻状态', trigger: 'blur' }
  ],
  'employee_basic.debit_card1': [
    { required: true, message: '请输入工商银行卡卡号', trigger: 'blur' }
  ],
  'employee_basic.debit_card2': [
    { required: true, message: '请输入招商银行卡卡号', trigger: 'blur' }
  ],
  'employee_basic.issuing_bank1': [
    { required: true, message: '请输入工商银行发卡行', trigger: 'blur' }
  ],
  'employee_basic.issuing_bank2': [
    { required: true, message: '请输入招商银行发卡行', trigger: 'blur' }
  ],
  'employee_basic.public_fund': [
    { required: true, message: '请输入公积金信息', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入企业邮箱', trigger: 'blur' }
  ],
  wx_work: [
    { required: true, message: '请输入企业微信', trigger: 'blur' }
  ],
  tapd: [
    { required: true, message: '请输入TAPD', trigger: 'blur' }
  ]
}

