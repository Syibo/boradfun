<template>
  <div class="container employees-container">
    <el-row class="table-top">
      <div class="left">
        <el-input v-model="seachValue.name" placeholder="请输入员工姓名" clearable @input="seachFun" />
        <el-select v-model="seachValue.departmentid" placeholder="所属部门" style="width: 100%;margin-left: 10px" clearable @change="seachFun">
          <el-option v-for="item in departmentList" :key="item.ID" :label="item.department_name" :value="item.ID" />
        </el-select>
        <el-select v-model="seachValue.status" placeholder="状态" style="width: 100%;margin-left: 10px" clearable @change="seachFun">
          <el-option v-for="item in STATUSVALUEADD" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="right">
        <el-button v-permission="[6]" type="primary" @click="induction">新建入职</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column align="center" label="员工姓名">
        <template slot-scope="scope">
          <span class="bule-hover" @click="openDra(scope.row)"> {{ scope.row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="department.department_name" align="center" label="所属部门" />
      <el-table-column prop="position" align="center" label="岗位" />
      <el-table-column prop="plan_date" align="center" label="计划入职时间" sortable />
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 1">
            <el-select :value="scope.row.status" placeholder="状态" :disabled="roles[0] !== 6" style="width: 100px" size="mini" @change="statusChange($event, scope.row)">
              <el-option v-for="item in STATUSVALUEADD" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <EmStatus v-else :status="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column prop="create_time" align="center" label="创建时间" sortable />
      <el-table-column align="center" label="流程信息">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="200"
            trigger="click"
            @show="show(scope.row)"
          >
            <div v-if="scope" style="height: 100%;">
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
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-permission="[6]" type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
          <el-button v-permission="[7]" :disabled="scope.row.status !== 1" type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button v-permission="[10]" :disabled="scope.row.status !== 1" type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
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

    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%" :show-close="false" @close="open">
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
          <el-col :span="4"> 所属部门：{{ ruleForm.department.department_name }}</el-col>
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
    <EmployDrawer ref="employDrawer" :base-data="detailData" :notes="workflow" :active="active" />
    <StatusFrom :id="statusId" ref="statusFrom" :type="statusType" @addSucc="addSucc" />
  </div>
</template>

<script>
import Label from '@/components/common/Label.vue'
import EmployDrawer from '@/components/Oa/EmployDrawer'
import permission from '@/directive/permission/index.js'
import { retWorkflowLabel, retWorkflowIcon, getaActive } from '@/utils/common'
import EmStatus from '@/components/common/EmStatus.vue'
import { mapGetters } from 'vuex'
import { getDepartmentList,
  getEmployeeList,
  getDepartmentLevelList,
  addEmployee,
  putEmployeeStatus,
  putEmployee,
  getEmployeeWorkflow,
  delEmployeeId,
  getEmployeeDetail } from '@/api/employee'
import { STATUSVALUEADD } from '@/utils/const'
import { retFileName } from '@/utils/common'
import { rules, ruleForm } from './config'
import store from '@/store'
import { getToken } from '@/utils/auth'
import StatusFrom from '@/components/Oa/StatusFrom'
export default {
  components: {
    Label,
    EmployDrawer,
    EmStatus,
    StatusFrom
  },
  directives: { permission },
  data() {
    return {
      active: 0,
      tableData: [],
      dialogVisible: false,
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        name: '',
        departmentid: '',
        status: '',
        flow: 1
      },
      total: 0,
      ruleForm,
      detailData: {
        department: {
          leader: {}
        },
        level: {}
      },
      options: [
        { value: '测试数据1', label: '测试数据1' },
        { value: '测试数据2', label: '测试数据2' }
      ],
      STATUSVALUEADD,
      rules,
      departmentList: [],
      levelList: [],
      workflow: [],
      api: '',
      myHeaders: {},
      title: '新建入职',
      leaderList: [],
      userType: 0,
      statusId: 0,
      statusType: 0,
      resumeArr: []
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  mounted() {
    this.api = process.env.VUE_APP_BASE_API
    this.getEmployeeList()
    this.getDepartmentList()
    if (store.getters.token) {
      this.myHeaders = {
        'Authorization': JSON.parse(getToken()).session
      }
      this.userType = JSON.parse(getToken()).userType
    }
    const openFrom = this.$route.query.openFrom
    if (openFrom) {
      setTimeout(() => {
        this.dialogVisible = true
      }, 500)
    }
  },
  methods: {
    retFileName,
    async getDepartmentList() {
      const res = await getDepartmentList()
      this.departmentList = res.data
    },
    async getEmployeeList() {
      const res = await getEmployeeList(this.seachValue)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    async statusChange(value, row) {
      this.statusId = row.ID
      this.statusType = value
      if (value === 2) {
        this.$refs.statusFrom.openDia()
      } else {
        const res = await putEmployeeStatus({ id: this.statusId, status: this.statusType, entry_date: '' })
        if (res.ret === 0) {
          this.$message.success('修改状态成功')
          this.getEmployeeList()
        }
      }
    },
    addSucc() {
      this.getEmployeeList()
    },
    async departmentChange(value) {
      this.ruleForm.level_id = ''
      this.ruleForm.leader_id = this.departmentList.find((item) => { return item.ID === value }).department_leader_id
      this.leaderList = [this.departmentList.find((item) => { return item.ID === value }).leader]
      const res = await getDepartmentLevelList(value)
      if (res.ret === 0 && res.data) {
        this.levelList = res.data
      } else {
        this.levelList = []
      }
    },
    async handleClick(row) {
      this.title = '编辑'
      const res = await getEmployeeDetail(row.ID)
      this.ruleForm.ID = row.ID
      this.ruleForm.name = res.data.name
      this.ruleForm.gender = res.data.gender
      this.ruleForm.status = res.data.status
      this.ruleForm.mobile = res.data.mobile
      this.ruleForm.id_card = res.data.id_card
      this.ruleForm.interview_comment = res.data.interview_comment
      this.ruleForm.department_id = res.data.department_id
      this.ruleForm.position = res.data.position
      this.ruleForm.service_line = res.data.service_line
      this.ruleForm.position = res.data.position
      this.ruleForm.level_id = res.data.level_id
      this.ruleForm.level = res.data.level
      /**
       * 如果邮箱没有@符号为空
       */
      if (res.data.email.indexOf('@') === -1) {
        this.ruleForm.email = ''
      } else {
        this.ruleForm.email = res.data.email
      }
      this.ruleForm.resume = res.data.resume
      const obj = {
        name: this.ruleForm.resume.split('_')[1]
      }
      if (this.ruleForm.resume) {
        this.resumeArr.push(obj)
      }
      this.ruleForm.wx_work = res.data.wx_work
      this.ruleForm.leader_id = res.data.department.department_leader_id
      this.ruleForm.plan_date = res.data.plan_date
      this.ruleForm.tapd = res.data.tapd
      this.ruleForm.department = res.data.department
      this.leaderList = [res.data.department.leader]
      const resL = await getDepartmentLevelList(res.data.department_id)
      if (res.ret === 0 && res.data) {
        this.levelList = resL.data
      } else {
        this.levelList = []
      }
      const resEle = await getEmployeeWorkflow(row.ID)
      this.ruleForm.seat_number = resEle.data.elements[1].value
      this.ruleForm.device_req = resEle.data.elements[2].value
      this.dialogVisible = true
    },
    async handleDel(row) {
      const isDelete = await this.$confirm(`确定删除`, '提示', { type: 'warning' })
      if (!isDelete) {
        return
      }
      const res = await delEmployeeId(row.ID)
      if (res.ret === 0) {
        this.$message.success('删除成功')
        this.getEmployeeList()
      }
    },
    seachFun() {
      this.getEmployeeList()
    },
    induction() {
      this.title = '新建入职'
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      this.seachValue.pagenum = 1
      this.seachValue.pagesize = val
      this.getEmployeeList()
    },
    handleCurrentChange(val) {
      this.seachValue.pagenum = val
      this.getEmployeeList()
    },
    oneUpload(response, file, fileList) {
      this.ruleForm.resume = response.data
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
          this.getEmployeeList()
          this.dialogVisible = false
        }
      }
    },
    async show(row) {
      const res = await getEmployeeWorkflow(row.ID)
      this.active = this.getaActive(res.data.nodes)
      this.workflow = res.data.nodes
    },
    async openDra(row) {
      const res = await getEmployeeDetail(row.ID)
      this.detailData = res.data
      const resEle = await getEmployeeWorkflow(row.ID)
      // this.detailData.plan_date = resEle.data.elements[0].value
      this.detailData.seat_number = resEle.data.elements[1].value
      this.detailData.device_req = resEle.data.elements[2].value
      this.show(row)
      this.$refs.employDrawer.openDrawer()
    },
    open() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
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
      this.resumeArr = []
    },
    getaActive,
    retWorkflowLabel,
    retWorkflowIcon
  }
}
</script>

<style lang="scss">
// .empolyees-upload {
// 	.el-upload {
// 		width: 100%;
// 		.el-upload-dragger {
// 			width: 100%;
// 			height: 150px;
// 		}
// 	}
// }
.employees-container {
  .el-dialog__header {
    padding: 0;
  }
}
</style>
<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
  .form-label-slot {
    display: inline-block;
    span {
      color: #999999;
      font-weight: 400;
    }
  }
}
</style>
