<template>
  <div class="container remide-container">
    <Label title="申请信息" />
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
      <el-table-column prop="ocurred_date" align="center" label="发生时间" />
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
      <el-input type="textarea" :rows="5" />
      <el-row class="btn">
        <el-button icon="el-icon-error" type="danger" plain>驳回</el-button>
        <el-button icon="el-icon-success" type="success" plain @click="passfun">通过</el-button>
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
          <el-button>发生邮件通知</el-button>
          <el-button>通过</el-button>
        </div>
      </div>
      <el-divider direction="vertical" style="height: 100%" />
      <div class="right">
        <Label title="支付流程" />
        <div class="right-item">
          <div class="label">待支付总金额(元)</div>
          <div class="num">125</div>
        </div>
        <div class="right-item">
          <div class="label">收款账号</div>
          <div class="num">612697712885464 <el-button type="text">复制</el-button></div>
        </div>
        <div class="pass-btn">
          <el-dropdown>
            <el-button type="primary">
              待支付<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>已支付</el-dropdown-item>
              <el-dropdown-item>驳回</el-dropdown-item>
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
import { getRemiDetail } from '@/api/remi'
export default {
  name: 'RemiDetail',
  directives: { permission },
  components: {
    Label
  },
  data() {
    return {
      pass: true,
      info: {
        expense_details: []
      },
      active: 0,
      workflow: [],
      tableData: [],
      id: ''
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.init()
  },
  methods: {
    async init() {
      if (this.id !== 0) {
        const res = await getRemiDetail(this.id)
        if (res.ret === 0) {
          this.active = this.getaActive(res.data.work_flow.nodes)
          this.info = res.data.info
          this.workflow = res.data.work_flow.nodes
        }
      }
    },
    getaActive,
    retWorkflowLabel,
    retWorkflowIcon,
    passfun() {
      this.pass = false
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

