<template>
  <div class="container">
    <el-row class="table-top">
      <div class="left">
        <el-input v-model="seachValue.emp_no" placeholder="请输入员工编号" clearable @input="seachFun" />
        <el-input v-model="seachValue.name" placeholder="请输入员工姓名" style="width: 100%;margin-left: 10px" clearable @input="seachFun" />
        <el-select v-model="seachValue.departmentid" placeholder="所属部门" style="width: 100%;margin-left: 10px" clearable @change="seachFun">
          <el-option v-for="item in departmentList" :key="item.ID" :label="item.department_name" :value="item.ID" />
        </el-select>
      </div>
      <div class="right">
        <el-button v-permission="[6]" type="primary" @click="departure">新建离职</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="ID" align="center" label="离职员工编号" />
      <el-table-column prop="name" align="center" label="员工姓名" />
      <el-table-column prop="department.department_name" align="center" label="所属部门" />
      <el-table-column prop="position" align="center" label="岗位" />
      <el-table-column prop="" align="center" label="部门领导" />
      <el-table-column prop="req_user" align="center" label="创建人" />
      <el-table-column prop="create_time" align="center" label="创建时间" />
      <el-table-column align="center" label="离职原因">
        <template slot-scope="scope">
          {{ scope.row.reason }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="流程信息">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="200"
            trigger="click"
            @show="show(scope.row)"
          >
            <div v-if="scope" style="height: auto">
              <el-steps direction="vertical" :active="active" finish-status="finish">
                <el-step
                  v-for="item in workflow"
                  :key="item.ID"
                  :icon="retWorkflowIcon(item.status)"
                  :title="item.user ? item.user.name : ''"
                  :description="retWorkflowLabel(item.status)"
                >
                  <template slot="icon">
                    <i :class="retWorkflowIcon(item.status)" />
                  </template>
                </el-step>
              </el-steps>
            </div>
            <el-button slot="reference" type="text">查看详情</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="broadfun_block">
      <el-pagination
        :current-page="seachValue.pagenum"
        :page-sizes="[10, 20, 50]"
        :page-size="seachValue.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false" width="60%" class="dialog-container" @close="open">
      <span slot="title" class="dialog-title">
        <div class="dialog-title-left">
          {{ title }}
        </div>
        <div class="dialog-title-right">
          <el-button @click="dialogVisible = false">取 消</el-button>
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
                  <el-autocomplete
                    v-model="ruleForm.name"
                    style="width: 100%"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入姓名"
                    @select="handleSelect"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="员工编号" prop="">
                  <el-input v-model="ruleForm.employeeID" placeholder="" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所属部门">
                  <el-input v-model="ruleForm.department_id" placeholder="" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="岗位" prop="">
                  <el-input v-model="ruleForm.position" placeholder="" disabled />
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
  </div>
</template>

<script>
import { getEmployeeList,
  leaveEmployee,
  getDepartmentList,
  getEmployeeWorkflow,
  editLeaveEmployee,
  leaveEmployeeDetail } from '@/api/employee'
import Label from '@/components/common/Label.vue'
import { retWorkflowLabel, retWorkflowIcon, getaActive } from '@/utils/common'
import permission from '@/directive/permission/index.js'
import { ruleFormDep, rulesDep } from './config'
import store from '@/store'
import { getToken } from '@/utils/auth'
export default {
  components: {
    Label
  },
  directives: { permission },
  data() {
    return {
      title: '新建离职',
      tableData: [],
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        name: '',
        departmentid: '',
        status: 3,
        emp_no: '',
        flow: 2
      },
      dialogVisible: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      ruleForm: ruleFormDep,
      options: [
        { value: '拟入职', label: '拟入职' },
        { value: '未入职', label: '未入职' },
        { value: '已入职', label: '已入职' }
      ],
      rules: rulesDep,
      userType: 0,
      departmentList: [],
      workflow: [],
      active: 0
    }
  },
  mounted() {
    if (store.getters.token) {
      this.userType = JSON.parse(getToken()).userType
    }
    this.init()
    this.getDepartmentList()
  },
  methods: {
    async init() {
      const res = await getEmployeeList(this.seachValue)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    seachFun() {
      this.init()
    },
    async getDepartmentList() {
      const res = await getDepartmentList()
      this.departmentList = res.data
    },
    async querySearchAsync(queryString, cb) {
      let restaurants = []
      const seach = {
        pagenum: 1,
        pagesize: 10,
        name: this.ruleForm.name,
        departmentid: '',
        status: 2
      }
      const res = await getEmployeeList(seach)
      if (res.ret === 0 && res.data.list.length !== 0) {
        for (let i = 0, len = res.data.list.length; i < len; i++) {
          res.data.list[i].value = res.data.list[i].name
        }
        restaurants = res.data.list
      } else {
        restaurants = []
      }
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    async show(row) {
      const res = await getEmployeeWorkflow(row.ID, 'leave')
      this.active = this.getaActive(res.data.nodes)
      this.workflow = res.data.nodes
    },
    handleSelect(item) {
      this.ruleForm.ID = item.ID
      this.ruleForm.name = item.name
      this.ruleForm.employeeID = item.ID
      this.ruleForm.department_id = item.department.department_name
      this.ruleForm.position = item.position
    },
    departure() {
      this.title = '新建离职'
      this.dialogVisible = true
    },
    async input(val) {
      const seach = {
        pagenum: 1,
        pagesize: 10,
        name: val,
        departmentid: '',
        status: ''
      }
      const res = await getEmployeeList(seach)
      if (res.ret === 0 && res.data.list.length !== 0) {
        this.ruleForm.employeeID = res.data.list[0].ID
        this.ruleForm.department_id = res.data.list[0].department.department_name
        this.ruleForm.position = res.data.list[0].position
      } else {
        this.$message.error('没有该员工的信息')
      }
    },
    handleSizeChange(val) {
      this.seachValue.pagenum = 1
      this.seachValue.pagesize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.seachValue.pagenum = val
      this.init()
    },
    submitForm(formName) {
      this.innerVisibleCheck = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.leaveEmployee()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async handleClick(row) {
      this.title = '编辑'
      const res = await leaveEmployeeDetail(row.ID)
      console.log(res.data)
      this.ruleForm.ID = res.data.ID
      this.ruleForm.name = row.name
      this.ruleForm.employeeID = row.ID
      this.ruleForm.department_id = row.department_id
      this.ruleForm.position = row.position
      this.ruleForm.reason = row.reason
      this.ruleForm.resignation_date = row.resignation_date
      this.ruleForm.account = res.data.account
      this.ruleForm.computer = res.data.computer
      this.ruleForm.phone = res.data.phone
      this.ruleForm.expense = res.data.expense
      this.ruleForm.device_req = res.data.device_req
      this.ruleForm.work_day = res.data.work_day
      this.ruleForm.off_day = res.data.off_day
      this.ruleForm.half_day = res.data.half_day
      this.ruleForm.change_day = res.data.change_day
      this.ruleForm.others = res.data.others
      this.ruleForm.late_day = res.data.late_day
      this.ruleForm.things_day = res.data.things_day
      this.ruleForm.salary_day = res.data.salary_day
      this.ruleForm.annual_day = res.data.annual_day
      this.dialogVisible = true
    },
    async leaveEmployee() {
      if (this.title === '新建离职') {
        const res = await leaveEmployee(this.ruleForm.employeeID, this.ruleForm)
        if (res.ret === 0) {
          this.$message.success('新建离职成功！')
          this.dialogVisible = false
          this.init()
        }
      } else {
        const res = await editLeaveEmployee(this.ruleForm.employeeID, this.ruleForm)
        if (res.ret === 0) {
          this.$message.success('编辑成功！')
          this.dialogVisible = false
          this.init()
        }
      }
    },
    getaActive,
    retWorkflowLabel,
    retWorkflowIcon,
    open() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        name: '',
        department_id: '',
        employeeID: '',
        ID: '',
        position: '',
        account: '', computer: '', phone: '', expense: '', device_req: '', work_day: '', off_day: '', half_day: '',
        change_day: '', others: '', late_day: '', things_day: '', salary_day: '', annual_day: '', resignation_date: '', reason: ''
      }
    }
  }
}
</script>

<style lang="scss">
.empolyees-upload {
	.el-upload {
		width: 100%;
		.el-upload-dragger {
			width: 100%;
			height: 150px;
		}
	}
}
.dialog-container {
  .el-dialog__header {
    padding: 0;
  }
}
</style>
<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
}
</style>
