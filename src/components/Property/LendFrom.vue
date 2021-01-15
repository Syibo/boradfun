<template>
  <el-dialog title="借出至" :visible="visible" :close-on-click-modal="false" width="800px" @close="closeVisble">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="已申请员工" prop="annual_leave">
            <el-radio-group v-model="ruleForm.device_apply_id">
              <el-radio v-for="item in lendData" :key="item.ID" :label="item.ID"> {{ item.e_name }} </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="其他员工">
            <el-input v-model="ruleForm.annual_leave" disabled placeholder="设备编号" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeVisble">取 消</el-button>
      <el-button type="primary" @click="checkBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { rulesCon } from '@/views/archives/config'
import { deviceIdApply, deviceOutgoing } from '@/api/property'
export default {
  name: 'LengFrom',
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
        device_apply_id: 0
      },
      rules: rulesCon,
      lendData: []
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
    async init() {
      const res = await deviceIdApply(this.id)
      if (res.ret === 0) {
        this.lendData = res.data
      }
    },
    async checkBtn() {
      // console.log(this.ruleForm.device_apply_id)
      const res = await deviceOutgoing({ id: this.id, device_apply_id: this.ruleForm.device_apply_id })
      if (res.ret === 0) {
        this.$emit('success')
      }
    },
    closeVisble() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        device_apply_id: 0
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
</style>
