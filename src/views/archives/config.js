export const ruleForm = {
  ID: '',
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
  department: {},
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
    { required: true, message: '请输入试用期（月）', trigger: 'blur' }
  ],
  annual_leave: [
    { required: true, message: '请输入年假', trigger: 'blur' }
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
  ]
}
