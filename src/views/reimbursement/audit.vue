<template>
  <div class="container audit-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first" />
      <el-tab-pane label="待办" name="second" />
      <el-tab-pane label="已办" name="third" />
    </el-tabs>
    <el-row class="table-top">
      <div class="left">
        <el-input v-model="planDate" placeholder="编号" />
        <el-date-picker
          v-model="planDate"
          style="width: 200px;margin-left: 10px"
          type="month"
          placeholder="选择日期"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM-dd"
        />
      </div>
    </el-row>

    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column align="center" label="申请编号">
        <template slot-scope="scope">
          <span class="bule-hover" @click="openDrawer"> #{{ scope.row.ID }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="e_name" align="center" label="申请人" />
      <el-table-column prop="expense_summary" align="center" label="报销金额" />
      <el-table-column prop="CreatedAt" align="center" label="提交时间">
        <template slot-scope="scope">
          {{ parseTime(scope.row.CreatedAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="project" align="center" label="相关项目" />
      <el-table-column prop="status" align="center" label="申请状态" />
      <el-table-column prop="name" align="center" label="流程信息">
        <template>
          <!-- <el-button slot="reference" type="text">查看详情</el-button> -->
          <el-button type="text">查看详情</el-button>
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
    <RemiDrawer ref="remiDrawer" />
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import RemiDrawer from './reimDrawer'
import { getRemiList } from '@/api/remi'
import { parseTime } from '@/utils/common'
export default {
  name: 'RimbursementAudit',
  directives: { permission },
  components: {
    RemiDrawer
  },
  data() {
    return {
      activeName: 'first',
      seachValue: {
        pagesize: 10,
        pagenum: 1,
        searchid: '',
        status: '',
        mytodo: true,
        application_date_begin: '',
        application_date_end: ''
      },
      total: 0,
      planDate: '',
      tableData: [
        { e_name: '#67566' }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const res = await getRemiList(this.seachValue)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
      }
      console.log(res)
    },
    parseTime,
    openDrawer() {
      this.$refs.remiDrawer.openDrawer()
    },
    goDetail() {
      this.$router.push({
        path: 'remiDetail'
      })
    },
    handleClick() {},
    handleSizeChange(val) {
      this.seachValue.pagenum = 1
      this.seachValue.pagesize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.seachValue.pagenum = val
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.audit-container {
  padding-bottom: 50px;
}
</style>
