<template>
  <div class="container">
    <el-row class="top">
      <el-button @click="Down">导出</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="real_time" align="center" label="日期" />
      <el-table-column prop="name" align="center" label="客户名称" />
      <el-table-column prop="service_name" align="center" label="服务名称" />
      <el-table-column prop="change" align="center" label="额度变化" />
      <el-table-column prop="desc" width="500" align="center" label="变化操作说明" />
      <el-table-column prop="remark" align="center" label="备注说明" />
    </el-table>

    <div class="broadfun_block">
      <el-pagination
        :current-page="pageNum"
        :page-size="pageSize"
        :page-sizes="[20, 50, 100, 500]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import { amountHistory } from '@/api/service'
import { parseTime } from '@/utils'
export default {
  name: 'LinesList',
  directives: { permission },
  data() {
    return {
      pageSize: 20,
      pageNum: 1,
      tableData: [],
      total: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    close() {
      this.$refs['ruleForm'].resetFields()
    },
    async init() {
      const res = await amountHistory({ pageNum: this.pageNum, pageSize: this.pageSize })
      console.log(res)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
      }
    },
    Down() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['日期', '客户名称', '服务名称', '额度变化', '变化操作说明', '备注说明']
        const filterVal = ['real_time', 'name', 'service_name', 'change', 'desc', 'remark']
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
    handleSizeChange(val) {
      this.pageNum = 1
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.init()
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
  .top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
