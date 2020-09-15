<template>
  <div class="container workOvertime-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="请假记录" name="first" />
      <el-tab-pane label="我的申请" name="second" />
      <el-tab-pane label="待我审核" name="third" />
    </el-tabs>
    <el-row class="table-top">
      <div class="left">
        <el-input v-model="name" placeholder="请输入申请人姓名" />
        <el-select v-model="name" placeholder="加班类型" style="width: 100%;margin-left: 10px" clearable>
          <el-option v-for="item in STATUSVALUE" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="name" placeholder="状态" style="width: 100%;margin-left: 10px" clearable>
          <el-option v-for="item in STATUSVALUE" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="right">
        <el-button type="primary">申请请假</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column align="center" label="申请人">
        <template slot-scope="scope">
          <span class="bule-hover"> {{ scope.row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="name" align="center" label="加班类型" />
      <el-table-column prop="name" align="center" label="开始时间" />
      <el-table-column prop="name" align="center" label="加班时长" />
      <el-table-column prop="name" align="center" label="实际加班时长" />
      <el-table-column prop="name" align="center" label="申请时间" />
      <el-table-column prop="name" align="center" label="申请状态" />
      <el-table-column prop="name" align="center" label="流程信息" />
    </el-table>

    <div class="broadfun_block">
      <el-pagination
        :current-page="seachValue.pagenum"
        :page-sizes="[10, 20, 50]"
        :page-size="seachValue.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { STATUSVALUE } from '@/utils/const'
export default {
  name: 'Vacate',
  data() {
    return {
      STATUSVALUE,
      activeName: 'first',
      name: '',
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        name: '',
        departmentid: '',
        status: ''
      },
      total: 0,
      tableData: [
        {
          name: 'mock'
        }
      ]
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
}
</style>
