<template>
  <div class="container equipment-container">
    <el-row class="table-top">
      <div class="left">
        <el-input v-model="seachValue.emp_no" placeholder="请输入员工编号" clearable @input="seachFun" />
        <el-input v-model="seachValue.name" placeholder="请输入员工姓名" style="width: 100%;margin-left: 10px" clearable @input="seachFun" />
        <el-select v-model="seachValue.departmentid" placeholder="所属部门" style="width: 100%;margin: 0 10px" clearable @change="seachFun">
          <el-option v-for="item in departmentList" :key="item.ID" :label="item.department_name" :value="item.ID" />
        </el-select>
        <el-button type="primary">搜索</el-button>
      </div>
      <div class="right">
        <el-button type="primary" @click="putFromFun">设备入库</el-button>
        <el-button>列设置</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="emp_no" align="center" label="资产名称" />
      <el-table-column prop="name" align="center" label="资产标签" />
      <el-table-column prop="department.department_name" align="center" label="申请单数量" />
      <el-table-column prop="position" align="center" label="序列号" />
      <el-table-column prop="" align="center" label="型号" />
      <el-table-column prop="req_user" align="center" label="类别" />
      <el-table-column prop="create_time" align="center" label="状态" />
      <el-table-column prop="create_time" align="center" label="领用人" />
      <el-table-column prop="create_time" align="center" label="运存" />
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="recipientsFun">申请领用</el-button>
          <el-button type="text" size="small" @click="lendFun(scope.row)">借出</el-button>
          <el-button type="text" size="small" @click="handleDel(scope.row)">编辑</el-button>
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

    <PutFrom :visible="dialogVisible" @close="close" />
    <RecipientsFrom :visible="dialogVisibleRec" @close="close" />
    <LendFrom :visible="dialogVisibleLeng" @close="close" />
  </div>
</template>

<script>
import PutFrom from '@/components/Property/PutFrom'
import RecipientsFrom from '@/components/Property/RecipientsFrom'
import LendFrom from '@/components/Property/LendFrom'
export default {
  name: 'Equipment',
  components: {
    PutFrom,
    RecipientsFrom,
    LendFrom
  },
  data() {
    return {
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        name: '',
        departmentid: '',
        status: 3,
        emp_no: '',
        flow: 2
      },
      tableData: [
        { emp_no: '三星' }
      ],
      total: 0,
      departmentList: [],
      dialogVisible: false,
      dialogVisibleRec: false,
      dialogVisibleLeng: false
    }
  },
  methods: {
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
    handleDel() {},
    seachFun() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style lang="scss" scoped>
.equipment-container {
  background-color: white;
}
</style>
