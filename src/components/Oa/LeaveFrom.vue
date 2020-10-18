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
      <Label :title="'基本信息'" />
      <el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="请选择请假类型" prop="type">
              <el-select v-model="ruleForm.type" placeholder="请选择请假类型" style="width: 100%">
                <el-option v-for="item in LEAVEVALUE" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开始日期" prop="start_date">
              <el-date-picker
                v-model="ruleForm.start_date"
                :picker-options="pickerOptions1"
                style="width: 100%"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="时间" prop="start">
              <el-select v-model="ruleForm.start" placeholder="请选择" style="width: 100%">
                <el-option key="am" label="上午" value="am" />
                <el-option key="pm" label="下午" value="pm" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="结束日期" prop="end_date">
              <el-date-picker
                v-model="ruleForm.end_date"
                :picker-options="pickerOptions2"
                style="width: 100%"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="时间" prop="end">
              <el-select v-model="ruleForm.end" placeholder="请选择" style="width: 100%">
                <el-option key="am" label="上午" value="am" />
                <el-option key="pm" label="下午" value="pm" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="休假时长(h)" prop="duration">
              <el-input v-model="ruleForm.duration" placeholder="请输入时长" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="请假事由" prop="cause">
              <el-input v-model="ruleForm.cause" type="textarea" rows="5" maxlength="100" show-word-limit placeholder="请输入加班事由" />
            </el-form-item>
          </el-col>
        </el-row>

      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  workLeave } from '@/api/work'
import { LEAVEVALUE } from '@/utils/const'
export default {
  name: 'LeaveFrom',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '申请请假'
    }
  },
  data() {
    return {
      LEAVEVALUE,
      ruleForm: {
        type: '',
        start_date: '',
        duration: '',
        cause: '',
        start: '',
        end: '',
        end_date: ''
      },
      rules: {
        project: [
          { required: true, message: '请输入项目', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        duration: [
          { required: true, message: '请输入时长', trigger: 'blur' }
        ],
        start_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        start: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        end: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        end_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      myHeaders: {},
      api: ''
    }
  },
  computed: {
    /**
     * 日期选择禁用
    */
    pickerOptions1() {
      return {
        disabledDate: this.disabledDate1
      }
    },
    pickerOptions2() {
      return {
        disabledDate: this.disabledDate2
      }
    }
  },
  mounted() {

  },
  methods: {
    disabledDate1(time) {
      const endTime = new Date(this.ruleForm.end_date).getTime()
      if (this.ruleForm.end_date) {
        const filterEndTime = new Date(this.ruleForm.end_date).getTime()
        return time.getTime() < Date.now() - 8.64e7 || time.getTime() > filterEndTime // 选择了结束日期, 禁点之后日期
      } else {
        return time.getTime() < Date.now() - 8.64e7 || time.getTime() > endTime // 禁用以前的日期，今天不禁用
      }
    },
    disabledDate2(time) {
      if (this.ruleForm.start_date) {
        const thisTime = this.ruleForm.start_date.replace(/-/g, '/')
        const startTime = new Date(thisTime).getTime()
        return time.getTime() < startTime
      } else {
        return time.getTime() < Date.now() - 8.64e7
      }
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
      const res = await workLeave(this.ruleForm)
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
        start_date: '',
        duration: '',
        cause: '',
        start: '',
        end: '',
        end_date: ''
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
