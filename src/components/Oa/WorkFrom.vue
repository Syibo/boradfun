<template>
  <el-dialog :visible.sync="visible" :close-on-click-modal="false" width="60%" :show-close="false" class="contract-from" @close="closeVisble">
    <span slot="title" class="dialog-title">
      <div class="dialog-title-left">
        {{ title }}
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
            <el-form-item label="加班项目" prop="project">
              <el-input v-model="ruleForm.project" placeholder="请输入项目" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="请选择加班类型" prop="type">
              <el-select v-model="ruleForm.type" placeholder="请选择加班类型" style="width: 100%">
                <el-option v-for="item in TYPEVALUE" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="加班日期" prop="overtime_date">
              <el-date-picker
                v-model="ruleForm.overtime_date"
                style="width: 100%"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="加班时长(h)" prop="duration">
              <el-input v-model="ruleForm.duration" placeholder="请输入时长" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="加班事由" prop="cause">
              <el-input v-model="ruleForm.cause" type="textarea" rows="5" maxlength="100" show-word-limit placeholder="请输入加班事由" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="审核人">
              <el-input v-model="ruleForm.people" placeholder="" disabled />
            </el-form-item>
          </el-col>
        </el-row>

      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  getWorkApprovals,
  overtime } from '@/api/work'
import { TYPEVALUE } from '@/utils/const'
import { isNum } from '@/utils/validate'
export default {
  name: 'WorkFrom',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '申请加班'
    }
  },
  data() {
    return {
      TYPEVALUE,
      ruleForm: {
        type: '',
        project: '',
        duration: '',
        cause: '',
        overtime_date: '',
        people: ''
      },
      rules: {
        project: [
          { required: true, message: '请输入项目', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        duration: [
          { required: true, message: '请输入时长', trigger: 'blur' },
          { validator: isNum, trigger: 'blur' }
        ],
        overtime_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      myHeaders: {},
      api: ''
    }
  },
  watch: {
    visible: {
      deep: true,
      handler(value) {
        this.getWorkApprovals()
      }
    }
  },
  methods: {
    async getWorkApprovals() {
      const res = await getWorkApprovals()
      this.ruleForm.people = res.data
    },
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
      const res = await overtime(this.ruleForm)
      if (res.ret === 0) {
        this.$message.success('申请成功')
        this.$emit('addSucc')
      }
    },
    closeVisble() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        type: '',
        project: '',
        duration: '',
        cause: '',
        overtime_date: '',
        people: ''
      }
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
