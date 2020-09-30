<template>
  <el-dialog :visible.sync="visible" :close-on-click-modal="false" width="500px" :show-close="false" class="contract-from" @close="closeVisble">
    <span slot="title" class="dialog-title">
      <div class="dialog-title-left">
        确定入职时间
      </div>
      <div class="dialog-title-right">
        <el-button @click="closeVisble">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">提 交</el-button>
      </div>
    </span>
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="请确认入职" prop="entry_date">
              <el-date-picker
                v-model="ruleForm.entry_date"
                style="width: 100%"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  putEmployeeStatus } from '@/api/employee'
export default {
  name: 'StatusFrom',
  props: {
    id: {
      type: Number,
      default: 0
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      ruleForm: {
        entry_date: ''
      },
      visible: false,
      rules: {
        entry_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addContracts()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async addContracts() {
      const res = await putEmployeeStatus({ id: this.id, status: this.type, entry_date: this.ruleForm.entry_date })
      if (res.ret === 0) {
        this.$message.success('修改状态成功')
        this.visible = false
        this.$emit('addSucc')
      }
    },
    openDia() {
      this.visible = true
    },
    closeVisble() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        entry_date: ''
      }
      this.visible = false
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
