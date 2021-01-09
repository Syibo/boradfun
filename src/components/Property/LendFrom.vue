<template>
  <el-dialog title="设备领用申请" :visible="visible" :close-on-click-modal="false" width="800px" @close="closeVisble">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="已申请员工" prop="annual_leave">
            <el-radio-group v-model="ruleForm.use">
              <el-radio :label="0"> 仗义 </el-radio>
              <el-radio :label="1"> 沈奕博 </el-radio>
              <el-radio :label="2"> 王凯丽 </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="其他员工" prop="trial_period">
            <el-input v-model="ruleForm.annual_leave" placeholder="设备编号" />
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
  name: 'LengFrom',
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
