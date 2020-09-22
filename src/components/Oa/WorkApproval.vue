<template>
  <el-dialog :visible.sync="visible" width="60%" :show-close="false" class="contract-from" @close="closeVisble">
    <span slot="title" class="dialog-title">
      <div class="dialog-title-left">
        {{ title }}
      </div>
      <div class="dialog-title-right">
        <el-button @click="submitForm(0)">拒 绝</el-button>
        <el-button size="small" type="primary" @click="submitForm(1)">同 意</el-button>
      </div>
    </span>
    <div class="work-container">
      <Label title="申请信息" />
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
        <span>加班项目：</span> {{ info.project }}
      </div>
      <div class="item">
        <span>加班类型：</span> {{ info.type }}
      </div>
      <div class="item">
        <span>加班日期：</span> {{ info.overtime_date }}
      </div>
      <div class="item">
        <span>加班工时：</span> {{ info.duration }}
      </div>
      <div class="item" style="margin-bottom: 50px">
        <span>加班事由：</span> {{ info.cause }}
      </div>
      <Label title="审批流程" />
      <div class="steps">
        <div class="top">
          审批流程
        </div>
        <el-steps :active="active" finish-status="success" style="padding: 0 10px">
          <el-step
            v-for="item in workflow"
            :key="item.ID"
            :title="item.user ? item.user.name : ''"
            icon="el-icon-time"
            :description="item.status === 'Completed' ? '已提交' : item.status === 'Processing' ? '正在处理' : '未处理'"
          />
        </el-steps>
      </div>
      <el-input v-model="comment" type="textarea" rows="5" placeholder="请输入审核意见" />
    </div>
  </el-dialog>
</template>

<script>
import {
  getOneOverTime,
  putOneOverTime } from '@/api/work'
import { TYPEVALUE } from '@/utils/const'
import Label from '@/components/common/Label.vue'
export default {
  name: 'WorkApproval',
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
      default: '申请加班'
    }
  },
  data() {
    return {
      TYPEVALUE,
      info: {},
      active: 0,
      workflow: '',
      comment: ''
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
        const res = await getOneOverTime(this.id)
        this.active = this.getaActive(res.data.work_flow.nodes)
        this.info = res.data.info
        this.workflow = res.data.work_flow.nodes
      }
    },
    submitForm(status) {
      const label = status ? '同意' : '拒绝'
      this.$confirm(`确认${label}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.addContracts(status)
      }).catch(() => {})
    },
    async addContracts(status) {
      const res = await putOneOverTime({ id: this.id, status, comment: this.comment })
      if (res.ret === 0) {
        this.$message.success('审核成功')
        this.$emit('addSucc')
      }
    },
    getaActive(notes) {
      let active = 0
      var na = notes.map((item) => item.status)
      const countOccurences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)
      active = countOccurences(na, 'Completed')
      return active
    },
    closeVisble() {
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
