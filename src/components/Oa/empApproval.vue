<template>
  <el-dialog :visible.sync="visible" width="60%" :close-on-click-modal="false" :show-close="false" class="contract-from" @close="closeVisble">
    <span slot="title" class="dialog-title">
      <div class="dialog-title-left">
        {{ title }}
      </div>
      <div class="dialog-title-right">
        <el-button @click="closeVisble">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">提 交</el-button>
      </div>
    </span>
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <Label :title="'基本信息'" />
      <el-row v-if="title === '编辑'" style="color: #2B2B2B;margin: 15px 0;margin-bottom: 50px">
        <el-col :span="4"> 姓名：{{ ruleForm.name }}</el-col>
        <el-col :span="4"> 性别：{{ ruleForm.gender }} </el-col>
        <!-- <el-col :span="4"> 入职状态：<EmStatus :status="ruleForm.status" /> </el-col> -->
        <el-col :span="6"> 身份证号码：{{ ruleForm.id_card }} </el-col>
        <el-col :span="4"> 手机号码：{{ ruleForm.mobile }} </el-col>
      </el-row>
      <el-row v-else>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="ruleForm.gender">
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="入职状态" prop="status">
              <el-select v-model="ruleForm.status" placeholder="" style="width: 100%">
                <el-option v-for="item in STATUSVALUEADD" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="ruleForm.mobile" maxlength="11" show-word-limit placeholder="请输入手机号码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="身份证号" prop="id_card">
              <el-input v-model="ruleForm.id_card" maxlength="18" show-word-limit placeholder="请输入身份证号" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <Label :title="'面试'" />
      <el-row v-if="title === '编辑'" style="color: #2B2B2B;margin: 15px 0;margin-bottom: 50px">
        <el-col :span="24"> {{ ruleForm.interview_comment }} </el-col>
        <el-col v-if="ruleForm.resume" :span="24">
          <el-button icon="el-icon-upload" type="text">{{ retFileName(ruleForm.resume) }}</el-button>
        </el-col></el-row>
      <div v-else>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="面试评价" prop="">
              <el-input v-model="ruleForm.interview_comment" maxlength="200" show-word-limit :rows="3" type="textarea" placeholder="请输入面试评价" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="empolyees-upload">
          <el-col :span="24">
            <el-upload
              style="margin-top: -10px"
              :headers="myHeaders"
              name="file"
              :limit="1"
              :action="`${api}/v1/file/upload?bucket=resume`"
              :on-success="oneUpload"
              :show-file-list="true"
              :file-list="resumeArr"
            >
              <el-button icon="el-icon-upload" size="small" type="text">点击上传履历</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </div>
      <Label :title="'岗位信息'" />
      <el-row v-if="title === '编辑'" style="color: #2B2B2B;margin: 15px 0;margin-bottom: 50px">
        <el-col :span="4"> 所属部门：{{ ruleForm.department.department_name || '' }}</el-col>
        <el-col :span="4"> 部门负责人：{{ ruleForm.department.leader.name }} </el-col>
        <el-col :span="6"> 岗位：{{ ruleForm.position }} </el-col>
        <el-col :span="4"> 服务线：{{ ruleForm.service_line }} </el-col>
        <el-col :span="4"> 级别：{{ ruleForm.level.level_name }} </el-col>
      </el-row>
      <div v-else>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属部门" prop="department_id">
              <el-select v-model="ruleForm.department_id" placeholder="请选择部门" style="width: 100%" @change="departmentChange">
                <el-option v-for="item in departmentList" :key="item.ID" :label="item.department_name" :value="item.ID" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门负责人" prop="leader_id">
              <el-select v-model="ruleForm.leader_id" placeholder="部门负责人" style="width: 100%" disabled>
                <el-option v-for="item in leaderList" :key="item.ID" :label="item.name" :value="item.ID" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="岗位" prop="position">
              <el-input v-model="ruleForm.position" maxlength="23" placeholder="请输入岗位" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务线" prop="service_line">
              <el-select v-model="ruleForm.service_line" placeholder="请选择服务线" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="级别" prop="level_id">
              <el-select v-model="ruleForm.level_id" placeholder="请选择级别" style="width: 100%">
                <el-option v-for="item in levelList" :key="item.ID" :label="item.level_name" :value="item.ID" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <Label :title="'账号信息'" />
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :prop="userType === 7 ? 'email' : ''">
            <template slot="label"><span class="form-label-slot">企业邮箱<span>（IT填写）</span></span></template>
            <el-input v-model="ruleForm.email" placeholder="请输入企业邮箱" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :prop="userType === 7 ? 'wx_work' : ''">
            <template slot="label"><span class="form-label-slot">企业微信<span>（IT填写）</span></span></template>
            <el-input v-model="ruleForm.wx_work" placeholder="请输入企业微信" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :prop="userType === 7 ? 'tapd' : ''">
            <template slot="label"><span class="form-label-slot">TAPD<span>（IT填写）</span></span></template>
            <el-input v-model="ruleForm.tapd" placeholder="请输入TAPD" />
          </el-form-item>
        </el-col>
      </el-row>
      <Label :title="'流程信息'" />
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="plan_date">
            <template slot="label"><span class="form-label-slot">计划入职时间<span>（HR填写）</span></span></template>
            <el-date-picker
              v-model="ruleForm.plan_date"
              style="width: 100%"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="seat_number">
            <template slot="label"><span class="form-label-slot">座位号<span>（HR填写）</span></span></template>
            <el-input v-model="ruleForm.seat_number" placeholder="请输入座位号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :prop="userType === 10 ? 'device_req' : ''">
            <template slot="label"><span class="form-label-slot">设备需求<span>（部门负责人填写）</span></span></template>
            <el-input v-model="ruleForm.device_req" type="textarea" placeholder="请输入设备需求" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { addEmployee,
  putEmployee,
  getDepartmentList,
  getEmployeeDetail } from '@/api/employee'
import { TYPEVALUE } from '@/utils/const'
import Label from '@/components/common/Label.vue'
import { isNum, isEmail } from '@/utils/validate'
import store from '@/store'
import { getToken } from '@/utils/auth'
export default {
  name: 'DepartureApproval',
  components: {
    Label
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: '编辑'
    }
  },
  data() {
    return {
      TYPEVALUE,
      info: {},
      active: 0,
      workflow: '',
      comment: '',
      userType: 0,
      departmentList: [],
      rules: {
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
      },
      ruleForm: {
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
    }
  },
  watch: {
    id: {
      deep: true,
      handler(value) {
        this.init()
      }
    }
  },
  methods: {
    async init() {
      if (store.getters.token) {
        this.userType = JSON.parse(getToken()).userType
      }
      if (this.id !== 0) {
        const res = await getEmployeeDetail(this.id)
        this.getDepartmentList()
        this.ruleForm = res.data
      }
    },
    async getDepartmentList() {
      const res = await getDepartmentList()
      this.departmentList = res.data
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addEmployee()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async addEmployee() {
      if (this.title === '新建入职') {
        const res = await addEmployee(this.ruleForm)
        if (res.ret === 0) {
          this.$message.success('入职提交成功，已流转到部门负责人填写设备需求信息')
          this.getEmployeeList()
          this.dialogVisible = false
        }
      } else {
        const res = await putEmployee(this.ruleForm.ID, this.ruleForm)
        if (res.ret === 0) {
          this.$message.success('录入成功')
          this.$emit('addSucc')
        }
      }
    },
    closeVisble() {
      this.ruleForm = {
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
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.contract-from {
  .el-dialog__header {
    padding: 0;
  }
  .el-input-number {
    text-align: left!important;
  }
}
</style>
<style lang="scss" scoped>
.work-container {
    padding-top: 5px;
    .item {
        margin: 10px 0;
        font-size: 14px;
        color: #333;
        span {
          display: inline-block;
          width: 80px;
        }
    }
    .steps {
        background-color: #F7F9FA;
        padding-bottom: 10px;
        margin-bottom: 10px;
        .top {
          height: 36px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #DADFE6;
          padding: 20px 0 20px 10px;
          font-size: 14px;
          color: #808387;
          margin-bottom: 10px;
        }
      }
}
</style>
