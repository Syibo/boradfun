<template>
  <div class="container contract-container">
    <el-row class="table-top">
      <div class="left">
        <el-input v-model="seachValue.number" placeholder="请输入员工编号" clearable @input="seachFun" />
        <el-input v-model="seachValue.name" placeholder="请输入员工姓名" style="width: 100%;margin-left: 10px" clearable @input="seachFun" />
        <el-select v-model="seachValue.status" placeholder="状态" style="width: 100%;margin-left: 10px" clearable @change="seachFun">
          <el-option key="已签" label="已签" value="已签" />
          <el-option key="未签" label="未签" value="未签" />
        </el-select>
      </div>
      <div class="right">
        <el-button type="primary" @click="induction">新建合同</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column align="center" label="合同编号/名称" prop="contract_type">
        <!-- <template slot-scope="scope">
          <span class="bule-hover" @click="openDra"> {{ scope.row.contract_type }} </span>
        </template> -->
      </el-table-column>
      <el-table-column prop="contract_start_date" align="center" label="合同开始时间" />
      <el-table-column prop="contract_end_date" align="center" label="合同到期时间" />
      <el-table-column align="center" label="签约方">
        <template slot-scope="scope">
          {{ scope.row.contract_party }}
        </template>
      </el-table-column>
      <el-table-column prop="contract_main" align="center" label="签订主体" />
      <el-table-column align="center" label="签订状态">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDeleta(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="broadfun_block">
      <el-pagination
        :current-page="seachValue.pagenum"
        :page-sizes="[10, 20, 50]"
        :page-size="seachValue.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%" :show-close="false" @close="open">
      <span slot="title" class="dialog-title">
        <div class="dialog-title-left">
          {{ title }}
        </div>
        <div class="dialog-title-right">
          <el-button @click="dialogVisible = false">取 消</el-button>
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
                  <el-option key="宁波比孚" label="宁波比孚" value="宁波比孚" />
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
                <!-- <el-input-number v-model="ruleForm.trial_period" :min="0" controls-position="right" class="num-inp" style="width: 100%;" /> -->
                <el-input v-model="ruleForm.trial_period" :min="0" placeholder="请输入试用期（月）" />
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
                  :limit="1"
                  :action="`${api}/v1/file/upload?bucket=contract`"
                  :on-success="oneUpload"
                  :show-file-list="true"
                  :file-list="eleContract"
                >
                  <el-button icon="el-icon-upload" size="small" type="text">上传文件</el-button>
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
                  :limit="1"
                  :action="`${api}/v1/file/upload?bucket=contract`"
                  :on-success="oneUploadScanned"
                  :show-file-list="true"
                  :file-list="eleContractScanned"
                >
                  <el-button icon="el-icon-upload" size="small" type="text">上传文件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getContractsList,
  addContracts,
  delContracts,
  getContractsDetail,
  editContracts,
  getEmployeeList } from '@/api/employee'
import { STATUSVALUE } from '@/utils/const'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { retFileName } from '@/utils/common'
import { ruleFormCon, rulesCon } from './config'
export default {
  data() {
    return {
      tableData: [],
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        name: '',
        number: '',
        status: ''
      },
      state2: '',
      dialogVisible: false,
      innerVisible: false,
      innerVisibleCheck: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      ruleForm: ruleFormCon,
      options: STATUSVALUE,
      rules: rulesCon,
      myHeaders: {},
      api: '',
      title: '新建合同',
      eleContract: [],
      eleContractScanned: []
    }
  },
  mounted() {
    this.init()
    this.api = process.env.VUE_APP_BASE_API
    if (store.getters.token) {
      this.myHeaders = {
        'Authorization': JSON.parse(getToken()).session
      }
    }
  },
  methods: {
    retFileName,
    async init() {
      const res = await getContractsList(this.seachValue)
      if (res.ret === 0 && res.data.list) {
        this.tableData = res.data.list
        this.total = res.data.total
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    seachFun() {
      this.init()
    },
    async input(val) {
      const seach = {
        pagenum: 1,
        pagesize: 10,
        name: val,
        departmentid: '',
        status: 2
      }
      const res = await getEmployeeList(seach)
      if (res.ret === 0 && res.data.list.length !== 0) {
        this.ruleForm.ID = res.data.list[0].ID
      } else {
        this.$message.error('没有该员工的信息')
      }
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
    handleSelect(item) {
      this.ruleForm.ID = item.ID
    },
    oneUpload(response, file, fileList) {
      this.ruleForm.soft_copy = response.data
    },
    oneUploadScanned(response, file, fileList) {
      this.ruleForm.scanned_copy = response.data
    },
    induction() {
      this.title = '新建合同'
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      this.seachValue.pagenum = 1
      this.seachValue.pagesize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.seachValue.pagenum = val
      this.init()
    },
    async handleClick(row) {
      this.title = '编辑'
      const res = await getContractsDetail(row.ID)
      if (res.ret === 0) {
        this.dialogVisible = true
        this.ruleForm = res.data
        const obj = {
          name: this.ruleForm.soft_copy.split('_')[1]
        }
        const objS = {
          name: this.ruleForm.scanned_copy.split('_')[1]
        }
        if (this.ruleForm.soft_copy) {
          this.eleContract.push(obj)
        }
        if (this.ruleForm.scanned_copy) {
          this.eleContractScanned.push(objS)
        }
      }
    },
    async handleDeleta(row) {
      const isDelete = await this.$confirm(`确定删除`, '提示', { type: 'warning' })
      if (!isDelete) {
        return
      }
      const res = await delContracts(row.ID)
      if (res.ret === 0) {
        this.$message.success('删除成功')
        this.init()
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
          this.dialogVisible = false
          this.init()
        }
      } else {
        const res = await editContracts(this.ruleForm)
        if (res.ret === 0) {
          this.$message.success('编辑合同成功')
          this.dialogVisible = false
          this.init()
        }
      }
    },
    openDra() {
      // this.$refs.employDrawer.openDrawer()
    },
    open() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        contract_type: '', contract_party: '', contract_main: '', contract_start_date: '', contract_end_date: '',
        trial_period: 6, annual_leave: '', status, soft_copy: '', scanned_copy: '', ID: ''
      }
      this.eleContract = []
      this.eleContractScanned = []
    }
  }
}
</script>

<style lang="scss">
.contract-container {
  .el-dialog__header {
    padding: 0;
  }
  .el-input-number {
    text-align: left!important;
  }
}
</style>
<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
}
</style>
