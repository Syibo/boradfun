<template>
  <el-dialog title="设备领用申请" :visible="visible" :close-on-click-modal="false" width="800px" @close="closeVisble">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="请选择项目" prop="trial_period">
            <el-input v-model="ruleForm.annual_leave" placeholder="设备编号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核人">
            <el-input v-model="ruleForm.annual_leave" placeholder="品牌" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="基本信息" prop="trial_period">
            <div class="base-cla">
              <el-row>申请人</el-row>
              <el-row>所在部门</el-row>
              <el-row>领用设备</el-row>
              <el-row>已领用设备</el-row>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeVisble">取 消</el-button>
      <el-button type="primary" @click="closeVisble">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { rulesCon } from '@/views/archives/config'
export default {
  name: 'RecipientsFrom',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        contract_type: '', contract_party: '', contract_main: '', contract_start_date: '', contract_end_date: '',
        trial_period: 6, annual_leave: '', status, soft_copy: '', scanned_copy: '', ID: '', use: 1, type: 'PC'
      },
      rules: rulesCon,
      myHeaders: {},
      api: '',
      eleContract: [],
      eleContractScanned: []
    }
  },
  mounted() {},
  methods: {
    closeVisble() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        contract_type: '', contract_party: '', contract_main: '', contract_start_date: '', contract_end_date: '',
        trial_period: 6, annual_leave: '', status, soft_copy: '', scanned_copy: '', ID: ''
      }
      this.$emit('close')
      this.eleContract = []
      this.eleContractScanned = []
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
</style>
