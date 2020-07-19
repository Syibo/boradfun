<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20" class="today_container">
      <el-col :span="12">
        <div class="today_task">
          <div class="title"> 今日结单任务（4） </div>
          <div v-for="item in 3" :key="item" class="item">
            超级厉害娱乐信息公司 <span>深度兼容-Android 300</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="today_task">
          <div class="title"> 明日结单任务（4） </div>
          <div v-for="item in 6" :key="item" class="item">
            超级厉害娱乐信息公司 <span>深度兼容-Android 300</span>
          </div>
        </div>
      </el-col>
      <el-popover
        class="task_pop"
        placement="bottom-end"
        width="420"
        trigger="click"
      >
        <el-table :data="tableData" header-cell-class-name="table-header-style" style="width: 100%">
          <el-table-column width="200" property="date" label="类型" />
          <el-table-column property="name" label="需求" />
          <el-table-column property="address" label="实施" />
        </el-table>
        <el-button slot="reference" class="bor_btn" circle>总览</el-button>
      </el-popover>
    </el-row>

    <div class="measure">
      <div class="measure_label"> 任务列表 </div>
      <el-button v-permission="[1]" icon="el-icon-circle-plus-outline" type="primary" @click="measure">提测</el-button>
    </div>

    <el-row class="tabs_table">
      <el-tabs>
        <el-tab-pane label="急需解决 · 7" class="tabs_item">
          <table1 />
        </el-tab-pane>
        <el-tab-pane :label="`对接待确认 · ${createData.length}`" class="tabs_item">
          <table1 :date="createData" />
        </el-tab-pane>
        <el-tab-pane label="需求对接中 · 8" class="tabs_item">角色管理</el-tab-pane>
        <el-tab-pane label="待分配 · 4" class="tabs_item">定时任务补偿</el-tab-pane>
        <el-tab-pane label="待执行 · 4" class="tabs_item">定时任务补偿</el-tab-pane>
        <el-tab-pane label="执行中 · 4" class="tabs_item">定时任务补偿</el-tab-pane>
        <el-tab-pane label="待审核 · 4" class="tabs_item">定时任务补偿</el-tab-pane>
        <el-tab-pane label="已结单 · 4" class="tabs_item">定时任务补偿</el-tab-pane>
        <el-tab-pane :label="`任务取消 · ${cancelData.length}`" class="tabs_item">
          <table1 :date="cancelData" />
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
// eslint-disable-next-line no-unused-vars
import { getList, getCusAmountList } from '@/api/service'
import { getUserList } from '@/api/user'
import { addTask, taskList } from '@/api/task'
import table1 from '@/components/dashboard/table1.vue'
export default {
  name: 'DashboardAdmin',
  components: {
    table1
  },
  directives: { permission },
  data() {
    return {
      createData: [], // 对接待确认
      cancelData: [], // 任务取消
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
      tableData: [{
        date: '专家兼容精华-Android 100',
        name: '10',
        address: '20'
      }, {
        date: '专家兼容精华-Android 100',
        name: '10',
        address: '20'
      }, {
        date: '专家兼容精华-Android 100',
        name: '10',
        address: '20'
      }, {
        date: '专家兼容精华-Android 100',
        name: '10',
        address: '20'
      }, {
        date: '专家兼容精华-Android 100',
        name: '10',
        address: '20'
      }, {
        date: '专家兼容精华-Android 100',
        name: '10',
        address: '20'
      }],
      clientData: [],
      serviceData: [],
      manData: [],
      optiondate: {
        disabledDate(date) {
          return date.getTime() <= Date.now()
        }
      }
    }
  },
  mounted() {
    this.clientList()
    // this.getServiceList()
    this.getManList()
    this.taskListCreate()
    this.taskListCancel()
  },
  methods: {
    /**
     * 获取客户信息
     */
    async clientList() {
      const res = await getClientList()
      this.clientData = res.data
    },
    // async getServiceList() {
    //   const res = await getList()
    //   this.serviceData = res.data
    // },
    async taskListCreate() {
      const res = await taskList({ status: 'create', pageSize: '', pageNum: '' })
      if (res.ret === 0) {
        this.createData = res.data.list
      }
    },
    async taskListCancel() {
      const res = await taskList({ status: 'cacel ', pageSize: '', pageNum: '' })
      console.log(res)
      if (res.ret === 0) {
        this.cancelData = res.data.list
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
        this.dialogVisible = false
      } else {
        console.log('error')
      }
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
      this.dialogVisible = true
    }
  }
}
</script>

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
        span {
          display: inline-block;
          background:rgba(38,69,212,0.1);
          color: #2645D4;
          font-size:12px;
          margin-left: 15px;
          height: 22px;
          line-height: 22px;
          padding: 0 5px;
          border-radius:3px;
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
  }
}
</style>
