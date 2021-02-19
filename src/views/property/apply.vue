<template>
  <div class="container myapply-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first" />
      <el-tab-pane label="待审核" name="second" />
      <el-tab-pane label="待领用" name="third" />
      <el-tab-pane label="已领用" name="four" />
      <el-tab-pane label="已撤销" name="five" />
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
      <el-table-column align="center" label="申请编号">
        <template slot-scope="scope">
          <span class="bule-hover" @click="openDra(scope.row)"> {{ scope.row.ID }} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="资产编号">
        <template slot-scope="scope">
          <span class="bule-hover" @click="openDra(scope.row)"> {{ scope.row.engagement_code }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="device.brand" align="center" label="品牌" />
      <el-table-column prop="device.device_model" align="center" label="型号" />
      <el-table-column prop="device.device_category" align="center" label="类别" />
      <el-table-column prop="project" align="center" label="项目" />
      <el-table-column align="center" label="申请 / 分配时间">
        <template slot-scope="scope">
          <span> {{ Moment(scope.row.CreatedAt).format('YYYY-MM-DD HH:mm:ss') }} </span>
        </template>
      </el-table-column>
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

    <PropertyDrawer :id="propertyId" ref="PropertyDrawer" :time="new Date().getTime()" />
  </div>
</template>

<script>
import { deviceIdApplyList, deviceReceive, deviceRevoke } from '@/api/property'
import { DECVICETYPE } from '@/utils/const'
import Moment from 'moment'
import ProWorkStatus from '@/components/Property/ProWorkStatus'
import PropertyDrawer from '@/components/Property/PropertyDrawer'
export default {
  name: 'MyApply',
  components: {
    ProWorkStatus,
    PropertyDrawer
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
      tableData: [],
      total: 0,
      departmentList: [],
      propertyId: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    Moment,
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
    async openDra(row) {
      this.propertyId = row.ID
      this.$refs.PropertyDrawer.openDrawer()
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
        this.init()
      }
    },
    async deviceRevoke(id) {
      const res = await deviceRevoke(id)
      if (res.ret === 0) {
        this.$message.success('撤销成功')
        this.init()
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
      this.seachValue.pagenum = 1
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
        case 'five':
          this.seachValue.status = 'Revoked'
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
