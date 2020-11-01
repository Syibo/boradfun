<template>
  <div>
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
          <el-row style="margin-bottom: 10px">
            <el-col :span="6"> 员工名称：{{ ruleForm.name }} </el-col>
            <el-col :span="6"> 员工编号：{{ ruleForm.employeeID }} </el-col>
            <el-col :span="6"> 所属部门：{{ ruleForm.department_id }} </el-col>
            <el-col :span="6"> 岗位：{{ ruleForm.position }} </el-col>
          </el-row>
          <el-row>
            <el-col :span="6"> 离职日期：{{ ruleForm.resignation_date }} </el-col>
            <el-col :span="6"> 离职原因：{{ ruleForm.reason }} </el-col>
          </el-row>
        </el-row>
        <div v-else>
          <el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                  <el-button @click="choserEmp">选择员工</el-button> {{ ruleForm.name }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="员工编号" prop="">
                  <el-input v-model="ruleForm.employeeID" placeholder="员工编号" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所属部门">
                  <el-input v-model="ruleForm.department_id" placeholder="所属部门" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="岗位" prop="">
                  <el-input v-model="ruleForm.position" placeholder="岗位" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="离职日期" prop="resignation_date">
                  <el-date-picker
                    v-model="ruleForm.resignation_date"
                    style="width: 100%"
                    type="date"
                    placeholder="选择离职日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="离职原因" prop="reason">
                  <el-input v-model="ruleForm.reason" type="textarea" placeholder="离职原因" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </div>
        <Label :title="'流程信息'" />
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :prop="userType === 7 ? 'account' : ''">
              <template slot="label"><span class="form-label-slot">账号<span>（IT填写）</span></span></template>
              <el-input v-model="ruleForm.account" placeholder="请输入账号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :prop="userType === 7 ? 'computer' : ''">
              <template slot="label"><span class="form-label-slot">电脑<span>（IT填写）</span></span></template>
              <el-input v-model="ruleForm.computer" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :prop="userType === 8 ? 'phone' : ''">
              <template slot="label"><span class="form-label-slot">手机<span>（财务填写）</span></span></template>
              <el-input v-model="ruleForm.phone" placeholder="请输入手机" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :prop="userType === 8 ? 'expense' : ''">
              <template slot="label"><span class="form-label-slot">报销<span>（财务填写）</span></span></template>
              <el-input v-model="ruleForm.expense" placeholder="请输入报销" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :prop="userType === 9 ? 'device_req' : ''">
              <template slot="label"><span class="form-label-slot">物品领用归还<span>（前台）</span></span></template>
              <el-input v-model="ruleForm.device_req" placeholder="物品领用归还" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :prop="userType === 6 ? 'work_day' : ''">
              <template slot="label"><span class="form-label-slot">实际出勤天数<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.work_day" type="number" placeholder="实际出勤天数" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :prop="userType === 6 ? 'off_day' : ''">
              <template slot="label"><span class="form-label-slot">旷工<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.off_day" type="number" placeholder="旷工" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :prop="userType === 6 ? 'half_day' : ''">
              <template slot="label"><span class="form-label-slot">病假<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.half_day" type="number" placeholder="病假" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :prop="userType === 6 ? 'change_day' : ''">
              <template slot="label"><span class="form-label-slot">剩余调休<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.change_day" type="number" placeholder="剩余调休" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :prop="userType === 6 ? 'others' : ''">
              <template slot="label"><span class="form-label-slot">其他结算<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.others" placeholder="其他结算" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :prop="userType === 6 ? 'late_day' : ''">
              <template slot="label"><span class="form-label-slot">迟到/早退<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.late_day" type="number" placeholder="迟到/早退" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :prop="userType === 6 ? 'things_day' : ''">
              <template slot="label"><span class="form-label-slot">事假<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.things_day" type="number" placeholder="事假" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :prop="userType === 6 ? 'salary_day' : ''">
              <template slot="label"><span class="form-label-slot">带薪假<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.salary_day" type="number" placeholder="带薪假" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :prop="userType === 6 ? 'annual_day' : ''">
              <template slot="label"><span class="form-label-slot">剩余年假<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.annual_day" type="number" placeholder="剩余年假" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <DepartureFrom :visible="dialogVisible" @close="closeFunApp" @addSucc="addSuccApp" />
  </div>
</template>

<script>
import { leaveEmployee,
  editLeaveEmployee,
  leaveEmployeeDetail } from '@/api/employee'
import Label from '@/components/common/Label.vue'
import DepartureFrom from '@/components/Oa/departureFrom.vue'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { ruleFormDep, rulesDep } from '@/views/employees/config'
export default {
  name: 'DepartureApproval',
  components: {
    Label,
    DepartureFrom
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
      default: '新建离职'
    }
  },
  data() {
    return {
      dialogVisible: false,
      info: {},
      active: 0,
      workflow: '',
      comment: '',
      userType: 0,
      rules: rulesDep,
      ruleForm: ruleFormDep
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
  mounted() {
    if (store.getters.token) {
      this.userType = JSON.parse(getToken()).userType
    }
  },
  methods: {
    async init() {
      if (this.id !== 0) {
        const res = await leaveEmployeeDetail(this.id)
        console.log(res)
        this.ruleForm.ID = res.data.Emp.ID
        this.ruleForm.name = res.data.Emp.name
        this.ruleForm.employeeID = res.data.Emp.ID
        this.ruleForm.department_id = res.data.Emp.department_id
        this.ruleForm.position = res.data.Emp.position
        this.ruleForm.reason = res.data.Emp.reason
        this.ruleForm.resignation_date = res.data.Emp.resignation_date
        this.ruleForm.account = res.data.FlowInfo.account
        this.ruleForm.computer = res.data.FlowInfo.computer
        this.ruleForm.phone = res.data.FlowInfo.phone
        this.ruleForm.expense = res.data.FlowInfo.expense
        this.ruleForm.device_req = res.data.FlowInfo.device_req
        this.ruleForm.work_day = res.data.FlowInfo.work_day
        this.ruleForm.off_day = res.data.FlowInfo.off_day
        this.ruleForm.half_day = res.data.FlowInfo.half_day
        this.ruleForm.change_day = res.data.FlowInfo.change_day
        this.ruleForm.others = res.data.FlowInfo.others
        this.ruleForm.late_day = res.data.FlowInfo.late_day
        this.ruleForm.things_day = res.data.FlowInfo.things_day
        this.ruleForm.salary_day = res.data.FlowInfo.salary_day
        this.ruleForm.annual_day = res.data.FlowInfo.annual_day
        console.log(this.ruleForm)
      }
    },
    closeFunApp() {
      this.dialogVisible = false
    },
    addSuccApp(row) {
      this.ruleForm.ID = row.ID
      this.ruleForm.name = row.name
      this.ruleForm.employeeID = row.ID
      this.ruleForm.department_id = row.department.department_name
      this.ruleForm.position = row.position
      this.dialogVisible = false
    },
    choserEmp() {
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.leaveEmployee()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async leaveEmployee() {
      if (this.title === '新建离职') {
        const res = await leaveEmployee(this.ruleForm.employeeID, this.ruleForm)
        if (res.ret === 0) {
          this.$message.success('新建离职成功！')
          this.$emit('addSucc')
        }
      } else {
        const res = await editLeaveEmployee(this.ruleForm.employeeID, this.ruleForm)
        if (res.ret === 0) {
          this.$message.success('编辑成功！')
          this.$emit('addSucc')
        }
      }
    },
    closeVisble() {
      this.$emit('close')
      // this.ruleForm = {
      //   name: '',
      //   department_id: '',
      //   employeeID: '',
      //   ID: '',
      //   position: '',
      //   account: '', computer: '', phone: '', expense: '', device_req: '', work_day: '', off_day: '', half_day: '',
      //   change_day: '', others: '', late_day: '', things_day: '', salary_day: '', annual_day: '', resignation_date: '', reason: ''
      // }
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
