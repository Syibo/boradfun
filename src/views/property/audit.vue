<template>
  <div class="container myaudit-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first" />
      <el-tab-pane label="待审核" name="second" />
      <el-tab-pane label="审核完成" name="third" />
    </el-tabs>
    <el-row class="table-top">
      <div class="left">
        <el-select v-model="seachValue.category" placeholder="类别" class="top-search" clearable>
          <el-option v-for="item in DECVICECATEGORY" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-if="activeName === 'first'" v-model="seachValue.status" placeholder="全部节点" clearable>
          <el-option v-for="item in DECVICETYPE2" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="right">
        <el-input v-model="seachValue.search" class="top-search" placeholder="搜索" clearable />
        <el-button type="primary" @click="seachFun">搜索</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="ID" align="center" label="申请编号" />
      <el-table-column prop="device.device_name" align="center" label="名称" />
      <el-table-column prop="device.device_model" align="center" label="型号" />
      <el-table-column prop="device.device_category" align="center" label="类别" />
      <el-table-column prop="project" align="center" label="项目" />
      <el-table-column prop="UpdatedAt" align="center" label="申请时间" />
      <el-table-column align="center" label="当前节点">
        <template slot-scope="scope">
          <ProWorkStatus :status="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.status !== 'NA'" type="text" size="small" @click="putFromFun(scope.row.ID)">编辑</el-button>
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

    <EditFrom :id="editId" :visible="dialogVisible" @close="close" @success="putSuccess" />
  </div>
</template>

<script>
import { deviceIdApplyList } from '@/api/property'
import { DECVICECATEGORY, DECVICETYPE2 } from '@/utils/const'
import EditFrom from '@/components/Property/EditFrom'
import ProWorkStatus from '@/components/Property/ProWorkStatus'
export default {
  name: 'MyAudit',
  components: {
    EditFrom,
    ProWorkStatus
  },
  data() {
    return {
      DECVICECATEGORY,
      DECVICETYPE2,
      activeName: 'first',
      dialogVisible: false,
      editId: 0,
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        myreq: '',
        mytodo: true,
        status: '',
        category: '',
        search: ''
      },
      tableData: [],
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
    putFromFun(id) {
      this.editId = id
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    putSuccess() {
      this.dialogVisible = false
      this.init()
    },
    handleClick() {
      switch (this.activeName) {
        case 'first':
          this.seachValue.status = ''
          this.init()
          break
        case 'second':
          this.seachValue.status = 'NA'
          this.init()
          break
        case 'third':
          this.seachValue.status = 'Approved,Rejected'
          this.init()
          break
        default:
          break
      }
    },
    handleDel() {},
    seachFun() {
      this.init()
    },
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
.myaudit-container {
  background-color: white;
}
</style>
