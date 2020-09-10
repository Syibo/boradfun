<template>
  <div class="container">
    <el-row class="baradfun-top">
      <el-button type="primary" @click="departure">新建离职</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="ID" align="center" label="离职员工编号" />
      <el-table-column prop="name" align="center" label="员工姓名" />
      <el-table-column prop="department.department_name" align="center" label="所属部门" />
      <el-table-column prop="position" align="center" label="岗位" />
      <el-table-column prop="" align="center" label="部门领导" />
      <el-table-column prop="" align="center" label="创建人" />
      <el-table-column prop="create_time" align="center" label="创建时间" />
      <el-table-column align="center" label="离职原因">
        <template slot-scope="scope">
          {{ scope.row.reason }}
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
        <!-- <el-row style="color: #2B2B2B">
          <el-col :span="4"> 姓名：沈奕博 </el-col>
          <el-col :span="4"> 性别：男 </el-col>
          <el-col :span="8"> 身份证号码：362330199512263656 </el-col>
          <el-col :span="6"> 手机号码：18720573255 </el-col>
        </el-row> -->
        <el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <!-- <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名" @change="input" />
              </el-form-item> -->
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
                <el-input v-model="ruleForm.employeeID" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="所属部门">
                <el-input v-model="ruleForm.department_id" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位" prop="">
                <el-input v-model="ruleForm.position" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="离职日期">
                <el-date-picker
                  v-model="ruleForm.resignation_date"
                  style="width: 100%"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="离职原因">
                <el-input v-model="ruleForm.reason" type="textarea" placeholder="离职原因" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <Label :title="'流程信息'" />
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item>
              <template slot="label"><span class="form-label-slot">账号<span>（IT填写）</span></span></template>
              <el-input v-model="ruleForm.account" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="computer">
              <template slot="label"><span class="form-label-slot">电脑<span>（IT填写）</span></span></template>
              <el-input v-model="ruleForm.computer" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="">
              <template slot="label"><span class="form-label-slot">手机<span>（财务填写）</span></span></template>
              <el-input v-model="ruleForm.phone" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="expense">
              <template slot="label"><span class="form-label-slot">报销<span>（财务填写）</span></span></template>
              <el-input v-model="ruleForm.expense" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="device_req">
              <template slot="label"><span class="form-label-slot">物品领用归还<span>（前台）</span></span></template>
              <el-input v-model="ruleForm.device_req" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="work_day">
              <template slot="label"><span class="form-label-slot">实际出勤天数<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.work_day" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="off_day">
              <template slot="label"><span class="form-label-slot">旷工<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.off_day" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="half_day">
              <template slot="label"><span class="form-label-slot">病假<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.half_day" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="change_day">
              <template slot="label"><span class="form-label-slot">剩余调休<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.change_day" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="others">
              <template slot="label"><span class="form-label-slot">其他结算<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.others" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="late_day">
              <template slot="label"><span class="form-label-slot">迟到/早退<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.late_day" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="things_day">
              <template slot="label"><span class="form-label-slot">事假<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.things_day" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="salary_day">
              <template slot="label"><span class="form-label-slot">带薪假<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.salary_day" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="annual_day">
              <template slot="label"><span class="form-label-slot">剩余年假<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.annual_day" placeholder="" />
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
  editLeaveEmployee,
  leaveEmployeeDetail } from '@/api/employee'
import Label from '@/components/common/Label.vue'
export default {
  components: {
    Label
  },
  data() {
    return {
      title: '新建离职',
      tableData: [],
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        name: '',
        departmentid: '',
        status: 3
      },
      dialogVisible: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      ruleForm: {
        name: '',
        department_id: '',
        employeeID: '',
        ID: '',
        position: '',
        account: '', computer: '', phone: '', expense: '', device_req: '', work_day: '', off_day: '', half_day: '',
        change_day: '', others: '', late_day: '', things_day: '', salary_day: '', annual_day: '', resignation_date: '', reason: ''
      },
      options: [
        { value: '拟入职', label: '拟入职' },
        { value: '未入职', label: '未入职' },
        { value: '已入职', label: '已入职' }
      ],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.init()
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
    handleSelect(item) {
      console.log(item)
      this.ruleForm.ID = item.ID
      this.ruleForm.name = item.name
      this.ruleForm.employeeID = item.ID
      this.ruleForm.department_id = item.department.department_name
      this.ruleForm.position = item.position
      console.log(this.ruleForm)
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
    open() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        name: '', department_id: '', employeeID: '', ID: '', position: '',
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
