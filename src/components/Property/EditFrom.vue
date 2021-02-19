<template>
  <el-dialog title="设备领用审核" :visible="visible" :close-on-click-modal="false" width="800px" @close="closeVisble">
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="ID" align="center" label="申请编号" />
      <el-table-column align="center" label="资产编号">
        <template slot-scope="scope">
          <span> {{ scope.row.device.device_name }} </span>
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="hover"
          >
            <el-row>
              <el-row class="margin-b-10">
                <el-col :span="12">设备类型</el-col> <el-col :span="12">{{ device.device_category }}</el-col>
              </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">资产编号</el-col> <el-col :span="12">{{ device.device_code }}</el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">设备名称</el-col> <el-col :span="12">{{ device.device_name }}</el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">CPU</el-col> <el-col :span="12">{{ device.cpu }}</el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">运存</el-col> <el-col :span="12">{{ device.mem }}</el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">显卡</el-col> <el-col :span="12">{{ }}</el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">储存容量</el-col> <el-col :span="12">{{ device.volume }}</el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">状态</el-col> <el-col :span="12"> <ProStatus :status="device.device_status" /></el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">序列号</el-col> <el-col :span="12">{{ device.mac_address_1 }}</el-col> </el-row>
            </el-row>
            <i slot="reference" class="el-icon-warning" style="color: #999" />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="device.device_category" align="center" label="类别" />
      <el-table-column prop="" align="center" label="折旧信息" />
      <el-table-column prop="project" align="center" label="项目" />
      <el-table-column align="center" label="申请时间" width="200">
        <template slot-scope="scope">
          <span> {{ Moment(scope.row.UpdatedAt).format('YYYY-MM-DD HH:mm:ss') }} </span>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="mid-cen">
      <el-row class="work-cla">
        <el-steps style="padding: 0 10px;margin-bottom: 10px" :active="active" finish-status="finish">
          <el-step
            v-for="item in workflow"
            :key="item.ID"
            :icon="retWorkflowIcon(item.status)"
            :title="item.user ? item.user.name : ''"
          >
            <template slot="icon">
              <i :class="retWorkflowIcon(item.status)" />
            </template>
            <template slot="description">
              <span>{{ retWorkflowLabel(item.status) }}</span><br><span v-if="item.value">{{ item.value }}</span>
            </template>
          </el-step>
        </el-steps>
      </el-row>
      <el-input v-model="ruleForm.comment" type="textarea" :rows="5" />
      <el-row class="margin-t-10">
        <el-button icon="el-icon-error" type="danger" plain @click="passfun(0)">驳回</el-button>
        <el-button icon="el-icon-success" type="success" plain @click="passfun(1)">通过</el-button>
      </el-row>
    </el-row>
    <!-- <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="其他员工" prop="trial_period">
            <el-input v-model="ruleForm.annual_leave" placeholder="设备编号" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeVisble">取 消</el-button>
      <el-button type="primary" @click="checkBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { rulesCon } from '@/views/archives/config'
import { retWorkflowLabel, retWorkflowIcon, getaActive } from '@/utils/common'
import { deviceApprovalDetail, deviceApproval } from '@/api/property'
import ProStatus from '@/components/Property/ProStatus'
import Moment from 'moment'
export default {
  name: 'EditFrom',
  components: {
    ProStatus
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      ruleForm: {
        id: 0,
        status: 0,
        comment: ''
      },
      tableData: [],
      workflow: [],
      active: 0,
      device: {},
      rules: rulesCon
    }
  },
  watch: {
    visible: {
      handler(value) {
        if (value && this.id) {
          this.init()
        }
      }
    }
  },
  mounted() {},
  methods: {
    Moment,
    getaActive,
    retWorkflowLabel,
    retWorkflowIcon,
    async init() {
      const res = await deviceApprovalDetail(this.id)
      if (res.ret === 0) {
        this.tableData = [res.data.info]
        this.active = this.getaActive(res.data.work_flow.nodes)
        this.workflow = res.data.work_flow.nodes
        this.device = res.data.info.device
        for (let i = 0; i < this.workflow.length; i++) {
          this.workflow[i].value = res.data.work_flow.elements[i].value
        }
      }
    },
    passfun(status) {
      this.ruleForm.status = status
    },
    async checkBtn() {
      this.ruleForm.id = this.id
      const res = await deviceApproval(this.ruleForm)
      if (res.ret === 0) {
        this.$emit('success')
      }
    },
    closeVisble() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        id: 0,
        status: 0,
        comment: ''
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.base-cla {
  padding: 5px;
  background-color:#F7F8FA;
}
.contract-from {
  .el-dialog__header {
    padding: 0;
  }
  .el-input-number {
    text-align: left!important;
  }
}
.mid-cen {
    padding: 40px 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .work-cla {
        width: 100%;
    }
}
</style>
