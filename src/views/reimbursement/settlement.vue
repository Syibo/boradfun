<template>
  <div class="container personnel-container">
    <el-row class="table-top">
      <div class="left">
        <el-select v-model="seachValue.project_name" placeholder="请选择项目" style="width: 200px; margin-right: 10px">
          <el-option v-for="item in projectList" :key="item" :label="item" :value="item" />
        </el-select>
        <el-date-picker
          v-model="periodTime"
          type="daterange"
          value-format="yyyy/MM/dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="periodTimeChange"
        />
        <!-- <el-select v-model="seachValue.period_time" placeholder="请选择日期" style="width: 200px">
          <el-option v-for="item in dateList" :key="item" :label="item" :value="item" />
        </el-select> -->
        <el-button type="primary" style="margin-left: 10px" @click="search">查询</el-button>
        <el-button style="margin-left: 10px" @click="reseve">重置</el-button>
      </div>
      <div class="right">
        <el-button type="primary" @click="uploadData">上传结算数据</el-button>
      </div>
    </el-row>

    <el-row class="pirce">
      总支付价值 {{ totalDeliveryValue || '---' }}
    </el-row>

    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="project_name" align="center" label="项目名称" />
      <el-table-column prop="project_category_code" align="center" label="项目编码" />
      <el-table-column prop="main_service_amount" align="center" label="主服务交付数量" />
      <el-table-column prop="sub_service_amount" align="center" label="子服务交付数量" />
      <el-table-column prop="project_delivery_value" align="center" label="项目交付价值" />
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

    <el-dialog title="上传结算数据" :visible.sync="dialogVisible" :close-on-click-modal="false" width="1000px" @close="clsoe">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="请选择交付周期" prop="time">
          <el-date-picker
            v-model="ruleForm.time"
            type="daterange"
            value-format="yyyy/MM/dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="dateChange"
          />
        </el-form-item>
      </el-form>
      <el-upload
        class="upload-demo"
        :headers="myHeaders"
        name="file"
        :action="`${api}/v1/project/details`"
        :show-file-list="false"
        :on-success="oneUpload"
      >
        <el-button icon="el-icon-upload2" size="small" type="text">上传结算数据</el-button>
      </el-upload>
      <el-table :data="diaData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
        <el-table-column prop="project_name" align="center" label="项目名称" />
        <el-table-column prop="project_category_code" align="center" label="项目编码" />
        <el-table-column prop="main_service_amount" align="center" label="主服务交付数量" />
        <el-table-column prop="sub_service_amount" align="center" label="子服务交付数量" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import { sublimtProject, sublimtProjectFilter, getProjectList } from '@/api/remi'
import store from '@/store'
import { getToken } from '@/utils/auth'
export default {
  name: 'Settlement',
  directives: { permission },
  data() {
    return {
      totalDeliveryValue: 0,
      myHeaders: {},
      paramsData: {
        period_time: ''
      },
      api: '',
      dialogVisible: false,
      projectList: [],
      dateList: [],
      ruleForm: {
        time: ''
      },
      rules: {
        time: [
          { required: true, message: '请选择交付日期', trigger: 'change' }
        ]
      },
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        period_time: '',
        project_name: ''
      },
      total: 0,
      planDate: '',
      tableData: [],
      diaData: [],
      periodTime: '',
      // 目前马总和部门负责人的usertype都是10 所以无法通过v-permission进行权限显示，现在根据唯一的邮箱号判断
      // ralph.ma@broadfun.cn
      email: ''
    }
  },
  computed: {
    isCeo() {
      return this.email === 'ralph.ma@broadfun.cn'
    }
  },
  async mounted() {
    this.email = JSON.parse(getToken()).email
    this.api = process.env.VUE_APP_BASE_API
    if (store.getters.token) {
      this.myHeaders = {
        'Authorization': JSON.parse(getToken()).session
      }
    }
    this.init()
  },
  methods: {
    async init() {
      const res = await sublimtProjectFilter()
      if (res.ret === 0) {
        this.projectList = res.data.project_name
        this.dateList = res.data.period_time
      }
    },
    async search() {
      const res = await getProjectList(this.seachValue)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
        this.totalDeliveryValue = res.data.total_delivery_value
      }
    },
    async reseve() {
      this.seachValue.period_time = ''
      this.seachValue.project_name = ''
      this.seachValue.period_time = ''
      this.seachValue.pagenum = 1
      this.seachValue.pagesize = 10
      this.totalDeliveryValue = ''
      this.tableData = []
      this.periodTime = ''
    },
    handleClick() {},
    handleSizeChange(val) {
      this.seachValue.pagenum = 1
      this.seachValue.pagesize = val
      this.search()
    },
    handleCurrentChange(val) {
      this.seachValue.pagenum = val
      this.search()
    },
    uploadData() {
      this.dialogVisible = true
    },
    dateChange() {
      this.paramsData.period_time = this.ruleForm.time.join('-')
    },
    periodTimeChange() {
      this.seachValue.period_time = this.periodTime.join('-')
    },
    oneUpload(response, file, fileList) {
      if (response.ret === 0) {
        this.diaData = response.data
      } else {
        this.$message.error(response.msg)
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sublimtProject()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async sublimtProject() {
      const res = await sublimtProject(this.paramsData.period_time, this.diaData)
      if (res.ret === 0) {
        this.dialogVisible = false
        this.$message.success('上传数据成功')
        this.init()
      }
    },
    clsoe() {
      this.diaData = []
      this.ruleForm.time = ''
      this.paramsData.period_time = ''
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.personnel-container {
  padding-bottom: 50px;
  .pirce {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .upload-demo {
    margin-bottom: 15px;
  }
}
</style>

