<template>
  <div class="container remide-container">
    <el-row type="flex">
      <el-row style="flex: 1">
        <Label title="申请信息" />
      </el-row>
      <el-row>
        <!-- <Label title="申请信息" /> -->
        <el-button type="primary" @click="checkBtn">提交</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-row>
    </el-row>
    <el-row :gutter="20" class="three">
      <el-col :span="8">
        申请人: {{ info.e_name }}
      </el-col>
      <el-col :span="8">
        申请项目: {{ info.project }}
      </el-col>
    </el-row>
    <el-table :data="info.expense_details" border style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="ocurred_date" align="center" label="发生时间" width="200">
        <template slot-scope="scope">
          <el-row type="flex" align="center" justify="center">
            <el-col> {{ scope.row.ocurred_date }} <el-button class="margin-l-10" type="text" @click="getLeavebydate(scope.row.ocurred_date)"> 查看考勤 </el-button> </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="expense_account.expense_account_name" align="center" label="报销科目" />
      <el-table-column prop="expense_amount" align="center" label="费用金额" />
      <el-table-column prop="remarks1" align="center" label="备注一" />
      <el-table-column prop="remarks2" align="center" label="备注二" />
      <el-table-column prop="remarks3" align="center" label="备注三" />
    </el-table>
    <Label v-if="pass" title="申请流程" style="margin-top: 20px" />
    <div v-if="pass" class="content">
      <el-steps style="padding: 0 10px;margin-bottom: 10px" :active="active" finish-status="finish">
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
      <el-input v-model="putInfo.comment" type="textarea" :rows="5" />
      <el-row class="btn">
        <el-button icon="el-icon-error" type="danger" plain @click="passfun(0)">驳回</el-button>
        <el-button icon="el-icon-success" type="success" plain @click="passfun(1)">通过</el-button>
      </el-row>
    </div>
    <div v-else class="two">
      <div class="left">
        <Label title="申请流程" />
        <el-steps style="padding: 0 10px;margin-top: 20px" direction="vertical" :active="active" finish-status="finish">
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
        <div class="pass-btn">
          <!-- <el-button>发生邮件通知</el-button> -->
          <!-- <el-button>通过</el-button> -->
        </div>
      </div>
      <el-divider direction="vertical" style="height: 100%" />
      <div v-permission="[8]" class="right">
        <Label title="支付流程" />
        <div class="right-item">
          <div class="label">待支付总金额(元)</div>
          <div class="num">{{ info.expense_summary }}</div>
        </div>
        <div class="right-item">
          <div class="label">收款账号</div>
          <div id="copy_num" class="num">{{ card }} <el-button type="text" @click="copyFun">复制</el-button></div>
        </div>
        <div class="pass-btn">
          <el-button v-if="btnType !== ''" :type="btnType === 'Paid' ? 'success' : 'danger'" style="margin-right: 10px">{{ btnType === 'Paid' ? '已支付' : '驳回' }}</el-button>
          <el-dropdown v-else @command="handleCommand">
            <el-button type="primary">
              待支付<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="pass">已支付</el-dropdown-item>
              <el-dropdown-item command="stop">驳回</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!-- <div class="broadfun_block-app">
      <el-button slot="reference" type="primary">提交</el-button>
      <el-button slot="reference">取消</el-button>
    </div> -->
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import Label from '@/components/common/Label.vue'
import { retWorkflowLabel, retWorkflowIcon, getaActive } from '@/utils/common'
import { getRemiDetail, putRemi, putRemiPaid, getDebitCard } from '@/api/remi'
import { mapGetters } from 'vuex'
import { getLeavebydate } from '@/api/work'
export default {
  name: 'RemiDetail',
  directives: { permission },
  components: {
    Label
  },
  data() {
    return {
      pass: true,
      card: '',
      btnType: '',
      info: {
        expense_details: []
      },
      active: 0,
      workflow: [],
      tableData: [],
      id: '',
      putInfo: {
        comment: '', id: '', status: 1
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  mounted() {
    this.id = this.$route.query.id
    this.putInfo.id = Number(this.$route.query.id)
    this.init()
    this.getDebitCard()
  },
  methods: {
    async init() {
      if (this.id !== 0) {
        const res = await getRemiDetail(this.id)
        if (res.ret === 0) {
          this.active = this.getaActive(res.data.work_flow.nodes)
          const activeRe = this.getaActive(res.data.work_flow.nodes, true)
          this.info = res.data.info
          this.workflow = res.data.work_flow.nodes
          if (activeRe >= 2 && this.roles[0] !== 8) {
            this.pass = false
          }
          if (activeRe >= 3 && this.roles[0] === 8) {
            this.pass = false
            if (activeRe === 4) {
              console.log(res.data.work_flow.nodes[3].status)
              this.btnType = res.data.work_flow.nodes[3].status
            }
          }
        }
      }
    },
    async getDebitCard() {
      const res = await getDebitCard(this.id)
      if (res.ret === 0) {
        this.card = res.data.CardID
      }
    },
    async getLeavebydate(date) {
      const res = await getLeavebydate({ date, name: this.info.e_name })
      if (res.ret === 0) {
        console.log(res)
      }
    },
    getaActive,
    retWorkflowLabel,
    retWorkflowIcon,
    async handleCommand(command) {
      switch (command) {
        case 'pass':
          this.putInfo.status = 1
          break
        case 'stop':
          this.putInfo.status = 0
          break
        default:
          break
      }
      const res = await putRemiPaid(this.putInfo)
      if (res.ret === 0) {
        this.init()
      }
    },
    copyFun() {
      const el = document.getElementById('copy_num')
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(el)
      selection.removeAllRanges()
      selection.addRange(range)
      const copyState = document.execCommand('copy')
      if (copyState) {
        this.$message.success('复制成功')
      }
    },
    async passfun(num) {
      this.putInfo.status = num
    },
    async checkBtn() {
      const res = await putRemi(this.putInfo)
      if (res.ret === 0) {
        this.pass = false
        this.init()
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.remide-container {
  .el-divider--vertical {
    height: 100%;
  }
}
</style>

<style lang="scss" scoped>
.remide-container {
  padding-bottom: 50px;
  .pirce {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .three {
    padding-left: 5px;
    margin: 15px 0;
  }
  .line {
    background-color: #f2f2f2;
    height: 10px;
  }
  .content {
    width: 500px;
    margin: 0 auto;
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
    }
  }
  .two {
    height: 300px;
    display: flex;
    margin-top: 20px;
    .left {
      flex: 1;
      position: relative;
      .pass-btn {
        position: absolute;
        top: 0;
        right: 10px;
      }
    }
    .right {
      flex: 1;
      position: relative;
      .pass-btn {
        position: absolute;
        top: 0;
        right: 10px;
      }
      .right-item {
        display: flex;
        flex-direction: column;
        margin-top: 50px;
        .label {
          font-size: 12;
          color: #666;
          margin-bottom: 10px;
        }
        .num {
          font-size: 20px;
          display: flex;
          align-items: center;
          button {
            margin-left: 20px;
          }
        }
      }
    }
  }
  .broadfun_block-app {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
  }
}
</style>

