<template>
  <div class="container myaudit-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first" />
      <el-tab-pane label="待审核" name="second" />
      <el-tab-pane label="审核完成" name="third" />
    </el-tabs>
    <el-row class="table-top">
      <div class="left">
        <el-select v-model="seachValue.device_category" placeholder="类别" style="width: 100%;margin-right: 10px" clearable>
          <el-option v-for="item in DECVICECATEGORY" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="seachValue.departmentid" placeholder="全部节点" style="width: 100%" clearable>
          <el-option v-for="item in DECVICETYPE" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="right">
        <el-input v-model="seachValue.emp_no" style="width: 120px;margin: 0 10px" placeholder="搜索" clearable @input="seachFun" />
        <el-button type="primary">搜索</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="emp_no" align="center" label="申请编号" />
      <el-table-column prop="name" align="center" label="资产编号" />
      <el-table-column prop="department.department_name" align="center" label="品牌" />
      <el-table-column prop="" align="center" label="型号" />
      <el-table-column prop="req_user" align="center" label="类别" />
      <el-table-column prop="create_time" align="center" label="项目" />
      <el-table-column prop="create_time" align="center" label="申请时间" />
      <el-table-column prop="create_time" align="center" label="当前节点" />
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="recipientsFun">确认领用</el-button>
          <el-button type="text" size="small" @click="lendFun(scope.row)">撤销申请</el-button>
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
import { deviceIdApplyList } from '@/api/property'
import { DECVICECATEGORY, DECVICETYPE } from '@/utils/const'
export default {
  name: 'MyAudit',
  data() {
    return {
      DECVICECATEGORY,
      DECVICETYPE,
      activeName: 'first',
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        myreq: '',
        mytodo: true,
        status: ''
      },
      tableData: [
        { emp_no: '三星' }
      ],
      total: 0,
      departmentList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const res = await deviceIdApplyList(this.seachValue)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    putFromFun() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
      this.dialogVisibleRec = false
      this.dialogVisibleLeng = false
    },
    recipientsFun() {
      this.dialogVisibleRec = true
    },
    lendFun() {
      this.dialogVisibleLeng = true
    },
    handleClick() {},
    handleDel() {},
    seachFun() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style lang="scss" scoped>
.myaudit-container {
  background-color: white;
}
</style>
