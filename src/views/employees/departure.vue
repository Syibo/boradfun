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
      <el-table-column prop="emp_no" align="center" label="离职员工编号" />
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
          <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
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
    <DepartureApproval :id="WorkApprovalId" :visible="dialogVisible" :title="title" @close="closeFunApp" @addSucc="addSuccApp" />
  </div>
</template>

<script>
import { getEmployeeList,
  leaveEmployee,
  getDepartmentList,
  getEmployeeWorkflow,
  editLeaveEmployee,
  delEmployeeId } from '@/api/employee'
// import Label from '@/components/common/Label.vue'
import DepartureApproval from '@/components/Oa/departureApproval'
import { retWorkflowLabel, retWorkflowIcon, getaActive } from '@/utils/common'
import permission from '@/directive/permission/index.js'
import { ruleFormDep, rulesDep } from './config'
import store from '@/store'
import { getToken } from '@/utils/auth'
export default {
  components: {
    // Label,
    DepartureApproval
  },
  directives: { permission },
  data() {
    return {
      title: '新建离职',
      visibleApprovaDep: false,
      WorkApprovalId: 0,
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
    addSuccApp() {
      this.dialogVisible = false
      this.init()
    },
    closeFunApp() {
      this.dialogVisible = false
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
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString === 0))
      }
    },
    async handleDel(row) {
      const isDelete = await this.$confirm(`确定删除`, '提示', { type: 'warning' })
      if (!isDelete) {
        return
      }
      const res = await delEmployeeId(row.ID)
      if (res.ret === 0) {
        this.$message.success('删除成功')
        this.init()
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
      this.WorkApprovalId = row.ID
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
