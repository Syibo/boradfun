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
          <el-col :span="12">
            <el-form-item label="合同类型" prop="contract_type">
              <el-select v-model="ruleForm.contract_type" placeholder="请选择合同类型" style="width: 100%">
                <el-option key="劳动合同" label="劳动合同" value="劳动合同" />
                <el-option key="劳务合同" label="劳务合同" value="劳务合同" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签约方" prop="contract_party">
              <el-autocomplete
                v-model="ruleForm.contract_party"
                style="width: 100%"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入签约方"
                @select="handleSelect"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="签约主体" prop="contract_main">
              <el-select v-model="ruleForm.contract_main" placeholder="请选择签约主体" style="width: 100%">
                <el-option key="宁波比浮" label="宁波比浮" value="宁波比浮" />
                <el-option key="上海游因" label="上海游因" value="上海游因" />
                <el-option key="上海比程" label="上海比程" value="上海比程" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同开始日期" prop="contract_start_date">
              <el-date-picker
                v-model="ruleForm.contract_start_date"
                style="width: 100%"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同结束日期" prop="contract_end_date">
              <el-date-picker
                v-model="ruleForm.contract_end_date"
                style="width: 100%"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="试用期（月）" prop="trial_period">
              <el-input-number v-model="ruleForm.trial_period" :min="0" controls-position="right" class="num-inp" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年假" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="请输入年假" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同状态" prop="status">
              <el-select v-model="ruleForm.status" placeholder="请输入合同状态" style="width: 100%">
                <el-option key="已签" label="已签" value="已签" />
                <el-option key="未签" label="未签" value="未签" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="电子版合同">
              <el-upload
                class="upload-demo"
                :headers="myHeaders"
                name="file"
                :action="`${api}/v1/file/upload?bucket=contract`"
                :on-success="oneUpload"
                :show-file-list="false"
              >
                <el-button v-if="ruleForm.soft_copy === ''" icon="el-icon-upload" size="small" type="text">上传文件</el-button>
                <el-button v-else icon="el-icon-upload" size="small" type="text">{{ ruleForm.soft_copy }}</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="合同扫描件">
              <el-upload
                class="upload-demo"
                :headers="myHeaders"
                name="file"
                :action="`${api}/v1/file/upload?bucket=contract`"
                :on-success="oneUploadScanned"
                :show-file-list="false"
              >
                <el-button v-if="ruleForm.scanned_copy === ''" icon="el-icon-upload" size="small" type="text">上传文件</el-button>
                <el-button v-else icon="el-icon-upload" size="small" type="text">{{ ruleForm.scanned_copy }}</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  addContracts,
  editContracts,
  getEmployeeList } from '@/api/employee'
import store from '@/store'
import { rulesCon } from '@/views/archives/config'
import { getToken } from '@/utils/auth'
export default {
  name: 'ContactFrom',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    fromData: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: '新建合同'
    }
  },
  data() {
    return {
      ruleForm: {
        contract_type: '', contract_party: '', contract_main: '', contract_start_date: '', contract_end_date: '',
        trial_period: 6, annual_leave: '', status, soft_copy: '', scanned_copy: '', ID: ''
      },
      rules: rulesCon,
      myHeaders: {},
      api: ''
    }
  },
  watch: {
    fromData: {
      deep: true,
      handler(value) {
        this.ruleForm = value
      }
    }
  },
  mounted() {
    this.api = process.env.VUE_APP_BASE_API
    if (store.getters.token) {
      this.myHeaders = {
        'Authorization': JSON.parse(getToken()).session
      }
    }
  },
  methods: {
    oneUpload(response, file, fileList) {
      this.ruleForm.soft_copy = response.data
    },
    oneUploadScanned(response, file, fileList) {
      this.ruleForm.scanned_copy = response.data
    },
    async querySearchAsync(queryString, cb) {
      let restaurants = []
      const seach = {
        pagenum: 1,
        pagesize: 10,
        name: this.ruleForm.contract_party,
        departmentid: '',
        status: 2
      }
      const res = await getEmployeeList(seach)
      if (res.ret === 0 && res.data.list.length !== 0) {
        for (let i = 0, len = res.data.list.length; i < len; i++) {
          res.data.list[i].value = res.data.list[i].name
        }
        restaurants = res.data.list
      } else {
        restaurants = []
      }
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
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
      if (!this.ruleForm.ID) {
        this.$message.error('信息错误')
        return
      }
      if (this.title === '新建合同') {
        const res = await addContracts(this.ruleForm.ID, this.ruleForm)
        if (res.ret === 0) {
          this.$message.success('新建合同成功')
          this.$emit('addSucc', this.ruleForm.ID)
        }
      } else {
        const res = await editContracts(this.ruleForm)
        if (res.ret === 0) {
          this.$message.success('编辑合同成功')
          this.$emit('addSucc', this.ruleForm.employee_id)
        }
      }
    },
    handleSelect(item) {
      this.ruleForm.ID = item.ID
    },
    closeVisble() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        contract_type: '', contract_party: '', contract_main: '', contract_start_date: '', contract_end_date: '',
        trial_period: 6, annual_leave: '', status, soft_copy: '', scanned_copy: '', ID: ''
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
