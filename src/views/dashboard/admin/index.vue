<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20" class="today_container">
      <el-col :span="12">
        <div class="today_task">
          <div class="title"> 今日结单任务 {{ focusData.length }} </div>
          <div v-for="item in focusData" :key="item.ID" class="item">
            <i @click="goTask(item.ID, item.status)">{{ item.client.name }} <level :level="item.client.level" /> </i> <span class="ser-name">{{ item.realService.serviceName }}</span> <Status :status="item.status" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="today_task">
          <div class="title"> 明日结单任务{{ temData.length }} </div>
          <div v-for="item in temData" :key="item.ID" class="item">
            <i @click="goTask(item.ID, item.status)">{{ item.client.name }} <level :level="item.client.level" /> </i> <span class="ser-name">{{ item.realService.serviceName }}</span> <Status :status="item.status" />
          </div>
        </div>
      </el-col>
      <el-popover
        class="task_pop"
        placement="bottom-end"
        width="420"
        trigger="click"
      >
        <el-table :data="dashboardData" header-cell-class-name="table-header-style" height="400" style="width: 100%">
          <el-table-column width="200" property="name" label="类型" />
          <el-table-column property="reqNum" label="需求" />
          <el-table-column property="impNum" label="实施" />
        </el-table>
        <el-button slot="reference" class="bor_btn" circle>总览</el-button>
      </el-popover>
    </el-row>

    <div class="measure">
      <div class="measure_label"> 任务列表 </div>
      <el-button v-permission="[1, 2, 3]" icon="el-icon-circle-plus-outline" type="primary" @click="measure">提测</el-button>
    </div>

    <el-row class="tabs_table">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="`亟需关注 · ${hightData.length}`" name="hight" class="tabs_item">
          <TableHigh :date="hightData" />
        </el-tab-pane>
        <el-tab-pane :label="`对接待确认 · ${createData.length}`" name="create" class="tabs_item">
          <TableBase :date="createData" :hight="hightArr" />
        </el-tab-pane>
        <el-tab-pane :label="`需求对接中 · ${confirmData.length}`" name="confirm" class="tabs_item">
          <TableBase :date="confirmData" :hight="hightArr" />
        </el-tab-pane>
        <el-tab-pane :label="`待分配 · ${frozenData.length}`" name="frozen" class="tabs_item">
          <!-- <TableBase :date="frozenData" :hight="hightArr" /> -->
          <el-table :data="frozenData" header-cell-class-name="table-header-style" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="ID" label="任务ID" width="180" />
            <el-table-column label="客户名称" width="180">
              <template slot-scope="scope">
                <span class="name" @click="goTask(scope.row.ID, scope.row.status)">{{ scope.row.client.name }}</span> <level :level="scope.row.client.level" />
              </template>
            </el-table-column>
            <el-table-column prop="appName" label="应用/游戏名称" />
            <el-table-column prop="service.serviceName" label="任务类型" />
            <el-table-column prop="realAmount" label="任务额度" />
            <el-table-column prop="expEndTime" label="期望结单时间" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="`待执行 · ${assignData.length}`" name="assign" class="tabs_item">
          <!-- <TableExecute :date="assignData" :hight="hightArr" /> -->
          <el-table :data="assignData" header-cell-class-name="table-header-style" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="ID" label="任务ID" width="180" />
            <el-table-column label="客户名称" width="180">
              <template slot-scope="scope">
                <span class="name" @click="goTask(scope.row.ID, scope.row.status)">{{ scope.row.client.name }}</span> <level :level="scope.row.client.level" />
              </template>
            </el-table-column>
            <el-table-column prop="service.serviceName" label="任务类型" />
            <el-table-column prop="realAmount" label="任务额度" />
            <el-table-column prop="exeUser.name" label="实施人员" />
            <el-table-column prop="expEndTime" label="期望交付时间" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="`执行中 · ${executeData.length}`" name="execute" class="tabs_item">
          <TableStop :date="executeData" :hight="hightArr" />
        </el-tab-pane>
        <el-tab-pane :label="`待审核 · ${finishData.length}`" name="finish" class="tabs_item">
          <!-- <TableExecute :date="finishData" :hight="hightArr" /> -->
          <el-table :data="finishData" header-cell-class-name="table-header-style" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="ID" label="任务ID" width="180" />
            <el-table-column label="客户名称" width="180">
              <template slot-scope="scope">
                <span class="name" @click="goTask(scope.row.ID, scope.row.status)">{{ scope.row.client.name }}</span> <level :level="scope.row.client.level" />
              </template>
            </el-table-column>
            <el-table-column prop="service.serviceName" label="任务类型" />
            <el-table-column prop="realAmount" label="任务额度" />
            <el-table-column prop="manage.name" label="客户服务经理" />
            <el-table-column prop="expEndTime" label="期望结单时间" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="`已结单 · ${endData.length}`" name="end" class="tabs_item">
          <TableEnd :date="endData" :hight="hightArr" />
        </el-tab-pane>
        <el-tab-pane :label="`任务取消 · ${cancelData.length}`" name="cancel" class="tabs_item">
          <TableCancel :date="cancelData" />
        </el-tab-pane>
      </el-tabs>
    </el-row>

    <el-dialog title="提测" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px" @close="close">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules">
        <el-form-item label="客户名称" prop="clientId">
          <el-select v-model="ruleForm.clientId" style="width: 100%" placeholder="请选择客户" @change="getCusAmountList">
            <el-option
              v-for="item in clientData"
              :key="item.ID"
              :label="item.name"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="游戏/应用名称" prop="appName">
          <el-input v-model="ruleForm.appName" placeholder="请输入应用" />
        </el-form-item>
        <el-form-item label="任务类型" prop="serviceId">
          <el-select v-model="ruleForm.serviceId" style="width: 100%" placeholder="请选择任务类型">
            <el-option
              v-for="item in serviceData"
              :key="item.service_id"
              :label="item.service_name"
              :value="item.service_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="预计提测额度" prop="preAmount">
          <el-input-number v-model="ruleForm.preAmount" :min="1" controls-position="right" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="预计测试日期" prop="preDate">
              <el-date-picker
                v-model="ruleForm.preDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="optiondate"
                @change="dateChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="期望结单日期" prop="expEndDate">
              <el-date-picker
                v-model="ruleForm.expEndDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="optiondate"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户服务经理" prop="manageId">
          <el-select v-model="ruleForm.manageId" style="width: 100%" placeholder="请选择客户">
            <el-option
              v-for="item in manData"
              :key="item.ID"
              :label="item.name"
              :value="item.ID"
              :disabled="roles[0] === 3"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import { getClientList } from '@/api/customer'
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
import { getList, getCusAmountList } from '@/api/service'
import { getUserList } from '@/api/user'
import { addTask, taskList, getFocusList, getDashboardData, getHightData } from '@/api/task'
import TableBase from '@/components/dashboard/TableBase.vue'
import TableCancel from '@/components/dashboard/TableCancel.vue'
import TableHigh from '@/components/dashboard/TableHigh.vue'
import TableStop from '@/components/dashboard/TableStop.vue'
import Status from '@/components/common/Status.vue'
// import TableExecute from '@/components/dashboard/TableExecute.vue'
import TableEnd from '@/components/dashboard/TableEnd.vue'
import Moment from 'moment'
import Level from '@/components/common/level.vue'
export default {
  name: 'DashboardAdmin',
  components: {
    TableBase,
    TableCancel,
    TableHigh,
    TableStop,
    TableEnd,
    Level,
    Status
  },
  directives: { permission },
  data() {
    return {
      createData: [], // 对接待确认
      cancelData: [], // 任务取消
      confirmData: [], // 需求对接中
      frozenData: [], // 待分配
      assignData: [], // 待执行
      executeData: [], // 执行中
      finishData: [], // 待审核
      endData: [], // 已结单
      focusData: [], // 已结单
      temData: [], // 明日结单
      dashboardData: [], // 纵览
      hightData: [], // 急需解决
      dialogVisible: false,
      ruleForm: {
        clientId: '',
        appName: '',
        serviceId: '',
        preAmount: '',
        preDate: '',
        expEndDate: '',
        manageId: ''
      },
      activeName: 'hight',
      rules: {
        clientId: [
          { required: true, message: '请选择客户', trigger: 'blur' }
        ],
        appName: [
          { required: true, message: '请输入应用', trigger: 'change' }
        ],
        serviceId: [
          { required: true, message: '请选择服务', trigger: 'blur' }
        ],
        preAmount: [
          { required: true, message: '请输入额度', trigger: 'blur' }
        ],
        preDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        expEndDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        manageId: [
          { required: true, message: '请选择客户服务经理', trigger: 'blur' }
        ]
      },
      clientData: [],
      serviceData: [],
      manData: [],
      hightArr: [],
      optiondate: {
        disabledDate(date) {
          return date.getTime() <= Date.now()
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'roles'
    ])
  },
  mounted() {
    this.clientList()
    this.getDashboardData()
    this.getHightData()
    this.getFocusList()
    this.getTemList()
    this.getManList()
    this.taskListCreate()
    this.taskListCancel()
    this.taskListConfirm()
    this.taskListFrozen()
    this.taskListAssign()
    this.taskListExecute()
    this.taskListFinish()
    this.taskListEnd()
    setInterval(() => {
      this.getHightData()
      this.getFocusList()
      this.getTemList()
      this.getManList()
      this.taskListCreate()
      this.taskListCancel()
      this.taskListConfirm()
      this.taskListFrozen()
      this.taskListAssign()
      this.taskListExecute()
      this.taskListFinish()
      this.taskListEnd()
    }, 600000)
  },
  methods: {
    /**
     * 获取客户信息
     */
    async clientList() {
      const res = await getClientList()
      this.clientData = res.data
    },
    handleClick(tab, event) {
      switch (this.activeName) {
        case 'hight':
          this.getHightData()
          break
        case 'create':
          this.taskListCreate()
          break
        case 'confirm':
          this.taskListConfirm()
          break
        case 'frozen':
          this.taskListFrozen()
          break
        case 'assign':
          this.taskListAssign()
          break
        case 'execute':
          this.taskListExecute()
          break
        case 'finish':
          this.taskListFinish()
          break
        case 'end':
          this.taskListEnd()
          break
        case 'cancel':
          this.taskListCancel()
          break
        default:
          break
      }
    },
    // async getServiceList() {
    //   const res = await getList()
    //   this.serviceData = res.data
    // },
    async getHightData() {
      const res = await getHightData()
      if (res.ret === 0) {
        this.hightData = res.data
        this.hightArr = res.data.map((item) => item.ID)
      }
    },
    async getDashboardData() {
      const res = await getDashboardData()
      if (res.ret === 0) {
        this.dashboardData = res.data
      }
    },
    async getFocusList() {
      const res = await getFocusList({ type: '' })
      if (res.ret === 0) {
        this.focusData = res.data
      }
    },
    async getTemList() {
      const res = await getFocusList({ type: 1 })
      if (res.ret === 0) {
        this.temData = res.data
      }
    },
    async taskListCreate() {
      const res = await taskList({ status: 'create', pageSize: '', pageNum: '' })
      if (res.ret === 0) {
        this.createData = res.data.list
      }
    },
    async taskListCancel() {
      const res = await taskList({ status: 'cancel', pageSize: '', pageNum: '' })
      if (res.ret === 0) {
        this.cancelData = res.data.list
      }
    },
    async taskListConfirm() {
      const res = await taskList({ status: 'confirm', pageSize: '', pageNum: '' })
      if (res.ret === 0) {
        this.confirmData = res.data.list
      }
    },
    async taskListFrozen() {
      const res = await taskList({ status: 'frozen', pageSize: '', pageNum: '' })
      if (res.ret === 0) {
        this.frozenData = res.data.list
      }
    },
    async taskListAssign() {
      const res = await taskList({ status: 'assign', pageSize: '', pageNum: '' })
      if (res.ret === 0) {
        this.assignData = res.data.list
      }
    },
    async taskListExecute() {
      const res = await taskList({ status: 'execute', pageSize: '', pageNum: '' })
      if (res.ret === 0) {
        this.executeData = res.data.list
      }
    },
    async taskListFinish() {
      const res = await taskList({ status: 'finish', pageSize: '', pageNum: '' })
      if (res.ret === 0) {
        this.finishData = res.data.list
      }
    },
    async taskListEnd() {
      const res = await taskList({ status: 'end', pageSize: '', pageNum: '' })
      if (res.ret === 0) {
        this.endData = res.data.list
      }
    },
    async getManList() {
      const res = await getUserList({ type: 3, pageNum: 1, pageSize: 50 })
      if (res.ret === 0) {
        this.manData = res.data.users
      }
    },
    /**
     * 根据客户id获取任务类型
     */
    async getCusAmountList() {
      this.ruleForm.serviceId = ''
      this.serviceData = []
      const res = await getCusAmountList({ clientId: this.ruleForm.clientId, deadline: '' })
      this.serviceData = res.data
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          this.addTask(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async addTask(form) {
      const res = await addTask(form)
      if (res.ret === 0) {
        this.$message.success('提测成功')
        this.taskListCreate()
        this.taskListConfirm()
        this.getHightData()
        this.dialogVisible = false
      } else {
        console.log('error')
      }
    },
    goTask(id, status) {
      this.$router.push({
        path: 'task',
        query: {
          type: status,
          id
        }
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (this.hightArr.indexOf(row.ID) !== -1) {
        return 'warning-row'
      }
      return ''
    },
    dateChange(value) {
      this.ruleForm.expEndDate = Moment(value).add(3, 'days').format('YYYY-MM-DD HH:mm:ss')
    },
    close() {
      this.ruleForm = {
        clientId: '',
        appName: '',
        serviceId: '',
        preAmount: '',
        preDate: '',
        expEndDate: '',
        manageId: ''
      }
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    },
    measure() {
      if (this.roles[0] === 3) {
        this.ruleForm.manageId = this.userId
      }
      this.dialogVisible = true
    }
  }
}
</script>

<style>
  .el-table .warning-row {
    background: rgba(255,92,92,0.09);
  }
</style>

<style lang="scss">
.dashboard-editor-container {
  .el-tabs__active-bar {
    background-color: black;
  }
  .el-tabs__item.is-active {
    font-weight:500;
    color: #2B2B2B;
    font-size:14px;
  }
  .el-tabs__item {
    color: #808387;
  }
}
</style>

<style lang="scss" scoped>
.dashboard-editor-container {
  .today_container {
    position: relative;
    .today_task {
      height:280px;
      background:rgba(247,248,250,1);
      border-radius:4px;
      padding: 16px 12px;
      overflow-y: auto;
      .title {
        font-size:16px;
        font-weight:500;
        color:rgba(51,51,51,1);
        margin-bottom: 16px;
      }
      .item {
        height: 48px;
        background-color: white;
        width: 100%;
        border-bottom: 1px solid #D8D8D8;
        display: flex;
        align-items: center;
        color: #202D40;
        font-size:14px;
        padding: 0 15px;
        i {
          color: #3293FF;
          cursor: pointer;
          font-style: normal;
        }
        .ser-name {
          display: inline-block;
          font-size:12px;
          height: 22px;
          line-height: 22px;
          padding: 0 5px;
          border-radius:3px;
          margin: 0 20px;
          cursor: pointer;
        }
      }
    }
    .today_task::-webkit-scrollbar-track-piece {
      background-color:#f8f8f8;
    }
    .today_task::-webkit-scrollbar {
      width:6px;
      height:6px;
    }
    .today_task::-webkit-scrollbar-thumb {
      background-color:#dddddd;
      background-clip:padding-box;
      min-height:28px;
      border-radius: 6px;
    }
    .today_task::-webkit-scrollbar-thumb:hover {
      background-color:#bbb;
    }
    .task_pop {
      position: absolute;
      right: 0;
      top: -10px;
      .bor_btn {
        width: 48px;
        height: 48px;
        color: #17222F;
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
  .measure {
    display: flex;
    margin-top: 20px;
    .measure_label {
      font-size:18px;
      color: #202D40;
      flex: 1;
    }
  }
  .tabs_table {
    padding: 0 5px;
    .tabs_item {
      min-height: 420px;
    }
    .name {
      color: #3293FF;
      cursor: pointer;
    }
  }
}
</style>
