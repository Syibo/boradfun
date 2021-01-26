<template>
  <div class="container apply-container">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目" prop="project">
            <el-select v-model="ruleForm.project" placeholder="请选择项目" style="width: 100%" @change="proChange">
              <el-option v-for="item in projectList" :key="item.ID" :label="item.engagement_code_desc" :value="item.engagement_code_desc" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审核人">
            <el-input v-model="people" placeholder="审核人" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="验证码">
            <el-input v-model="code" placeholder="验证码" :disabled="codeDisable" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="pirce">
      <el-upload
        class="upload-demo"
        :headers="myHeaders"
        name="file"
        :data="{ code }"
        :action="`${api}/v1/expense/details`"
        :show-file-list="false"
        :on-success="oneUpload"
      >
        <el-button icon="el-icon-upload" size="small" type="primary">导入文件</el-button>
      </el-upload>
      <el-link download="example.xlsx" href="/example.xlsx" type="primary" :underline="false" style="margin-left: 15px">下载模版</el-link>
    </el-row>

    <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="ocurred_date" align="center" label="发生时间" />
      <el-table-column prop="expense_account.expense_account_name" align="center" label="报销科目" />
      <el-table-column prop="expense_amount" align="center" label="费用金额" />
      <el-table-column prop="remarks1" align="center" label="备注一" />
      <el-table-column prop="remarks2" align="center" label="备注二" />
      <el-table-column prop="remarks3" align="center" label="备注三" />
    </el-table>
    <div class="broadfun_block-app">
      <el-button slot="reference" type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button slot="reference" @click="goBack">取消</el-button>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { setRemi, getRemiProjects, getRemiPeople } from '@/api/remi'
import { getToken } from '@/utils/auth'
export default {
  name: 'Apply',
  data() {
    return {
      projectList: [],
      api: '',
      myHeaders: {},
      people: '',
      code: '',
      codeDisable: false,
      ruleForm: {
        'engagement_code': '',
        'expense_details': [],
        'project': '',
        'import_file': '',
        'leader_id': ''
      },
      rules: {
        project: [
          { required: true, message: '请输入项目', trigger: 'change' }
        ],
        people: [
          { required: true, message: '请选择审核人', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  async mounted() {
    this.api = process.env.VUE_APP_BASE_API
    if (store.getters.token) {
      this.myHeaders = {
        'Authorization': JSON.parse(getToken()).session
      }
    }
    const res = await getRemiPeople()
    this.people = res.data || '财务'
    this.financialName = res.data || '财务'
    const resP = await getRemiProjects()
    this.projectList = resP.data
  },
  methods: {
    proChange(val) {
      const obj = this.projectList.find((item) => { return item.engagement_code_desc === val })
      if (obj) {
        this.people = `${obj.owner.name},${this.financialName}`
        this.ruleForm.engagement_code = obj.engagement_code
        this.ruleForm.leader_id = obj.code_owner_id
      }
    },
    oneUpload(response, file, fileList) {
      if (response.ret === 0) {
        this.tableData = response.data.details
        this.ruleForm.import_file = response.data.file_name
        this.ruleForm.expense_details = response.data.details
        this.codeDisable = true
      } else {
        this.$message.error(response.msg)
      }
    },
    submitForm(formName) {
      if (this.tableData.length === 0) {
        this.$message.error('无报销信息')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.setRemi()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async setRemi() {
      const res = await setRemi(this.ruleForm, this.code)
      if (res.ret === 0) {
        this.$message.success('申请报销成功')
        this.$router.go(-1)
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.apply-container {
  padding-bottom: 50px;
  .pirce {
    font-size: 12px;
    display: flex;
    margin-bottom: 10px;
  }
  .broadfun_block-app {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
  }
}
</style>

