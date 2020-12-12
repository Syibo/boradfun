<template>
  <div class="container remide-container">
    <Label title="申请信息" />
    <el-row :gutter="20" class="three">
      <el-col :span="8">
        申请人: 员工1
      </el-col>
      <el-col :span="8">
        申请项目: 云测合研
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%;margin-bottom: 20px" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column align="center" label="申请人">
        <template slot-scope="scope">
          <span class="bule-hover"> {{ scope.row.e_name }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" align="center" label="开始时间" />
      <el-table-column prop="duration" align="center" label="加班时长" />
      <el-table-column prop="req_time" align="center" label="申请时间" />
      <el-table-column prop="name" align="center" label="流程信息">
        <template>
          <el-button slot="reference" type="text">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Label v-if="pass" title="申请流程" />
    <div v-if="pass" class="content">
      <el-steps style="padding: 0 10px;" :active="active" finish-status="finish">
        <el-step title="步骤 1" icon="el-icon-edit" />
        <el-step title="步骤 2" icon="el-icon-upload" />
        <el-step title="步骤 3" icon="el-icon-picture" />
        <!-- <el-step
          v-for="item in workflow"
          :key="item.ID"
          :icon="retWorkflowIcon(item.status)"
          :title="item.user ? item.user.name : ''"
          :description="retWorkflowLabel(item.status)"
        >
          <template slot="icon">
            <i :class="retWorkflowIcon(item.status)" />
          </template>
        </el-step>-->
      </el-steps>
      <el-input type="textarea" :rows="5" />
      <el-row class="btn">
        <el-button>驳回</el-button>
        <el-button @click="passfun">通过</el-button>
      </el-row>
    </div>
    <div v-else class="two">
      <div class="left">
        <Label title="申请流程" />
        <el-steps direction="vertical" style="padding: 0 10px;margin-top:10px" :active="active" finish-status="finish">
          <el-step title="步骤 1" icon="el-icon-edit" />
          <el-step title="步骤 2" icon="el-icon-upload" />
          <el-step title="步骤 3" icon="el-icon-picture" />
          <!-- <el-step
            v-for="item in workflow"
            :key="item.ID"
            :icon="retWorkflowIcon(item.status)"
            :title="item.user ? item.user.name : ''"
            :description="retWorkflowLabel(item.status)"
          >
            <template slot="icon">
              <i :class="retWorkflowIcon(item.status)" />
            </template>
          </el-step>-->
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
export default {
  name: 'RemiDetail',
  directives: { permission },
  components: {
    Label
  },
  data() {
    return {
      pass: true,
      active: 0,
      workflow: '',
      activeName: 'first',
      tableData: [
        { e_name: '#67566' }
      ],
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        name: '',
        type: '',
        status: '',
        myreq: true,
        mytodo: ''
      },
      ruleForm: {
        remi: '',
        people: ''
      },
      rules: {
        remi: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        people: [
          { required: true, message: '请选择审核人', trigger: 'blur' }
        ]
      },
      total: 0,
      planDate: ''
    }
  },
  methods: {
    getaActive,
    retWorkflowLabel,
    retWorkflowIcon,
    passfun() {
      this.pass = false
    },
    handleClick() {},
    handleSizeChange(val) {
      this.seachValue.pagenum = 1
      this.seachValue.pagesize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.seachValue.pagenum = val
      this.init()
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

