<template>
  <el-dialog title="设备入库" :visible="visible" :close-on-click-modal="false" width="800px" @close="closeVisble">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="设备类别">
              <el-select v-model="ruleForm.type" placeholder="请选择合同类型" style="width: 100%">
                <el-option key="PC" label="PC" value="PC" />
                <el-option key="Laptop" label="Laptop" value="Laptop" />
                <el-option key="NetWork" label="NetWork" value="NetWork" />
                <el-option key="Monlitor" label="Monlitor" value="Monlitor" />
                <el-option key="iPad" label="iPad" value="iPad" />
                <el-option key="iMac" label="iMac" value="iMac" />
                <el-option key="Moblie" label="Moblie" value="Moblie" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备编号" prop="trial_period">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="品牌" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备名称" prop="trial_period">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备型号" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备型号" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- line -->
        <!-- line -->
        <el-row
          v-if="ruleForm.type === 'PC' || ruleForm.type === 'Monlitor' || ruleForm.type === 'iPad' || ruleForm.type === 'iMac' || ruleForm.type === 'Moblie'"
          :gutter="20"
        >
          <el-col :span="12">
            <el-form-item label="CPU" prop="trial_period">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运存" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备型号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="ruleForm.type === 'iPad' || ruleForm.type === 'Moblie'" :gutter="20">
          <el-col :span="12">
            <el-form-item label="核数" prop="trial_period">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          v-if="ruleForm.type === 'PC' || ruleForm.type === 'Monlitor' || ruleForm.type === 'iPad' || ruleForm.type === 'iMac' || ruleForm.type === 'Moblie'"
          :gutter="20"
        >
          <el-col :span="12">
            <el-form-item label="GPU" prop="trial_period">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="储存容量" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备型号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          v-if="ruleForm.type === 'PC' || ruleForm.type === 'Monlitor' || ruleForm.type === 'iPad' || ruleForm.type === 'iMac' || ruleForm.type === 'Moblie'"
          :gutter="20"
        >
          <el-col :span="12">
            <el-form-item label="操作系统" prop="trial_period">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备名称" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="ruleForm.type === 'iPad' || ruleForm.type === 'Moblie'" :gutter="20">
          <el-col :span="12">
            <el-form-item label="系统版本" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备型号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="屏幕尺寸" prop="trial_period">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备名称" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="ruleForm.type === 'iPad' || ruleForm.type === 'Moblie'" :gutter="20">
          <el-col :span="12">
            <el-form-item label="分辨率" prop="trial_period">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="屏幕比" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备型号" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- line -->
        <!-- line -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="MAC地址1">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="MAC地址2">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备型号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="购买日期" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="零售商" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="设备型号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="购买价格" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="购买价格" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="增值税价格" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="增值税价格" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="保修日期" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="保修日期" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="位置">
              <el-input v-model="ruleForm.annual_leave" placeholder="位置" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="是否可申领" prop="annual_leave">
              <el-radio-group v-model="ruleForm.use">
                <el-radio :label="0"> 可申领 </el-radio>
                <el-radio :label="1"> 不可申领 </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
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
  name: 'PutFrom',
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
