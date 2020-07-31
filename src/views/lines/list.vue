<template>
  <div class="container">
    <el-row class="top">
      <el-button @click="Down">导出</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" align="center" label="日期" />
      <el-table-column prop="name" align="center" label="客户名称" />
      <el-table-column prop="address" align="center" label="服务名称" />
      <el-table-column prop="change" align="center" label="额度变化" />
      <el-table-column prop="info" align="center" label="变化操作说明" />
      <el-table-column prop="note" align="center" label="备注说明" />
    </el-table>

    <div class="broadfun_block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import { parseTime } from '@/utils'
export default {
  name: 'LinesList',
  directives: { permission },
  data() {
    return {
      currentPage: 1,
      dialogVisible: false,
      dialogVisible1: false,
      ruleForm: { name: '', email: '', wechat: '', phone: '', date: '2020-06-21', group: '', resource: '' },
      options: [
        { value: '条目一', label: '条目一' }, { value: '条目二', label: '条目二' }, { value: '条目三', label: '条目三' }
      ],
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }]
      },
      tableData: [{
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }]
    }
  },
  methods: {
    close() {
      this.$refs['ruleForm'].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    Down() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['date', 'name', 'address', 'change', 'info']
        const filterVal = ['date', 'name', 'address', 'change', 'info']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    close1() {
      this.$refs['ruleForm1'].resetFields()
    },
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    lineChange() {
      this.dialogVisible = true
    },
    lineConver() {
      this.dialogVisible1 = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
