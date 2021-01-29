<template>
  <div class="container myapply-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first" />
      <el-tab-pane label="待审核" name="second" />
      <el-tab-pane label="待领用" name="third" />
      <el-tab-pane label="已领用" name="four" />
    </el-tabs>
    <el-row v-if="activeName === 'first'" class="table-top">
      <div class="left">
        <el-select v-model="seachValue.status" placeholder="全部节点" class="top-search" clearable>
          <el-option v-for="item in DECVICETYPE" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="right">
        <el-button type="primary" @click="init()">搜索</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="ID" align="center" label="申请编号" />
      <el-table-column prop="engagement_code" align="center" label="资产编号" />
      <el-table-column prop="device.brand" align="center" label="品牌" />
      <el-table-column prop="device.device_model" align="center" label="型号" />
      <el-table-column prop="device.device_category" align="center" label="类别" />
      <el-table-column prop="project" align="center" label="项目" />
      <el-table-column prop="CreatedAt" align="center" label="申请时间" />
      <el-table-column align="center" label="当前节点">
        <template slot-scope="scope">
          <ProWorkStatus :status="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" size="small" :disabled="!scope.row.can_receive" @click="recipientsFun(scope.row.device_id)">确认领用</el-button>
          <el-button class="Danger-color" :disabled="!scope.row.can_revoke" type="text" size="small" @click="lendFun(scope.row.ID)">撤销申请</el-button>
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
import { deviceIdApplyList, deviceReceive, deviceRevoke } from '@/api/property'
import { DECVICETYPE } from '@/utils/const'
import ProWorkStatus from '@/components/Property/ProWorkStatus'
export default {
  name: 'MyApply',
  components: {
    ProWorkStatus
  },
  data() {
    return {
      DECVICETYPE,
      activeName: 'first',
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        myreq: true,
        mytodo: '',
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
      this.dialogVisibleLeng = false
    },
    recipientsFun(id) {
      this.$confirm('确认领用', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.deviceReceive(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    async deviceReceive(id) {
      const res = await deviceReceive(id)
      if (res.ret === 0) {
        this.$message.success('领用成功')
      }
    },
    async deviceRevoke(id) {
      const res = await deviceRevoke(id)
      if (res.ret === 0) {
        this.$message.success('撤销成功')
      }
    },
    lendFun(id) {
      this.$confirm('确认撤销', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.deviceRevoke(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
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
          this.seachValue.status = 'Approved'
          this.init()
          break
        case 'four':
          this.seachValue.status = 'Received'
          this.init()
          break
        default:
          break
      }
    },
    handleDel() {},
    seachFun() {},
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
.myapply-container {
  background-color: white;
}
</style>
