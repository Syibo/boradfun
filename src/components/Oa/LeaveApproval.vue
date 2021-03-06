<template>
  <el-dialog :visible.sync="visible" width="60%" :close-on-click-modal="false" :show-close="false" class="contract-from" @close="closeVisble">
    <span slot="title" class="dialog-title">
      <div class="dialog-title-left">
        {{ title }}
      </div>
      <div class="dialog-title-right">
        <el-button @click="closeVisble">取 消</el-button>
        <el-button v-if="title === '时长校验'" type="primary" @click="submitForm(1)">确 定</el-button>
        <el-button v-if="title === '申请请假' && active !== workflow.length" @click="submitForm(0)">拒 绝</el-button>
        <el-button v-if="active !== workflow.length && title === '申请请假'" size="small" type="primary" @click="submitForm(1)">同 意</el-button>
        <el-button v-if="active === workflow.length && title === '申请请假'" @click="closeVisble">关 闭</el-button>
      </div>
    </span>
    <div class="work-container">
      <Label title="请假信息" />
      <el-row>
        <el-col :span="12">
          <div class="item">
            <span>员工编号：</span> {{ info.emp_id }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="item">
            <span>员工姓名：</span> {{ info.e_name }}
          </div>
        </el-col>
      </el-row>
      <div class="item" style="margin-top: -3px">
        <span>请假类型：</span> {{ retLeaveValue(info.type) }}
      </div>
      <div class="item">
        <span>开始日期：</span> {{ info.start_date }}
      </div>
      <div class="item">
        <span>结束日期：</span> {{ info.end_date }}
      </div>
      <div class="item">
        <span>请假工时：</span> {{ info.duration }}
      </div>
      <div class="item" style="margin-bottom: 50px">
        <span>请假事由：</span> {{ info.cause }}
      </div>
      <div v-if="title === '申请请假'">
        <Label title="审批流程" />
        <div class="steps">
          <div class="top">
            审批流程
          </div>
          <el-steps style="padding: 0 10px" :active="active" finish-status="finish">
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
        <el-input v-model="comment" type="textarea" rows="5" placeholder="请输入审核意见" />
      </div>
      <div v-else>
        <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
          <el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="实际请假时长" prop="real">
                  <el-input
                    v-model="ruleForm.real"
                    type="number"
                    placeholder="实际请假时长"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  getOneLeave,
  putOneLeaveCheck,
  putOneLeave } from '@/api/work'
import { TYPEVALUE } from '@/utils/const'
import Label from '@/components/common/Label.vue'
import { retWorkflowLabel, retWorkflowIcon, getaActive, retLeaveValue } from '@/utils/common'
// import { isNum } from '@/utils/validate'
export default {
  name: 'LeaveApproval',
  components: {
    Label
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
      default: '申请请假'
    }
  },
  data() {
    return {
      TYPEVALUE,
      info: {},
      ruleForm: {
        real: ''
      },
      active: 0,
      workflow: '',
      comment: '',
      rules: {
        real: [
          { required: true, message: '请输入时长', trigger: 'blur' }
        ]
      }
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
  methods: {
    async init() {
      if (this.id !== 0) {
        const res = await getOneLeave(this.id)
        this.active = this.getaActive(res.data.work_flow.nodes)
        this.info = res.data.info
        this.workflow = res.data.work_flow.nodes
        this.comment = ''
      }
    },
    submitForm(status) {
      if (this.title === '申请请假') {
        const label = status ? '同意' : '拒绝'
        this.$confirm(`确认${label}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.addContracts(status)
        }).catch(() => {})
      } else {
        this.timeCheck(status)
      }
    },
    async addContracts(status) {
      const res = await putOneLeave({ id: this.id, status, comment: this.comment })
      if (res.ret === 0) {
        this.$message.success('审核成功')
        this.$emit('addSucc')
      }
    },
    async timeCheck(status) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.timeCheckFun(status)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async timeCheckFun(status) {
      const res = await putOneLeaveCheck({ id: this.id, real: this.ruleForm.real })
      if (res.ret === 0) {
        this.$message.success('校验成功')
        this.$emit('addSucc')
      }
    },
    getaActive,
    retWorkflowLabel,
    retWorkflowIcon,
    retLeaveValue,
    closeVisble() {
      this.ruleForm.real = ''
      this.$emit('close')
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
  .el-step__icon {
    background-color: #F7F9FA;
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
