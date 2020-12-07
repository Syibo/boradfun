<template>
  <div class="container settlement-container">
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
      <div class="right">
        <el-button type="primary">上传表格数据</el-button>
      </div>
    </el-row>

    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column label="申请人">
        <template slot-scope="scope">
          <span class="bule-hover"> {{ scope.row.e_name }} </span>
        </template>
      </el-table-column>
      <el-table-column align="right" label="流程信息">
        <template>
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
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  name: 'Settlement',
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
        { e_name: '#67566', name: '33' }
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
.settlement-container {
  padding-bottom: 50px;
  .pirce {
    font-size: 12px;
    margin-bottom: 10px;
  }
}
</style>
