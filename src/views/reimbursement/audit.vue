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
      <el-table-column align="center" label="申请人">
        <template slot-scope="scope">
          <span class="bule-hover"> {{ scope.row.e_name }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" align="center" label="开始时间" />
      <el-table-column prop="duration" align="center" label="加班时长" />
      <el-table-column v-permission="[6, 7, 8, 9, 10]" prop="real_duration" align="center" label="实际加班时长" />
      <el-table-column prop="req_time" align="center" label="申请时间" />
      <el-table-column prop="name" align="center" label="流程信息">
        <template>
          <el-button slot="reference" type="text">查看详情</el-button>
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
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  name: 'RimbursementAudit',
  directives: { permission },
  data() {
    return {
      activeName: 'first',
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        name: '',
        type: '',
        status: '',
        myreq: true,
        mytodo: ''
      },
      total: 0,
      planDate: '',
      tableData: [
        { e_name: '#67566' }
      ]
    }
  },
  methods: {
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
