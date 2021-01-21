<template>
  <div class="container equipment-container">
    <el-row class="table-top">
      <div class="left">
        <el-select v-model="seachValue.device_category" placeholder="类别" style="width: 100%;margin-right: 10px" clearable>
          <el-option v-for="item in DECVICECATEGORY" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="seachValue.device_status" placeholder="状态" style="width: 100%;margin-right: 10px" clearable>
          <el-option v-for="item in DECVICESTATUS" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="seachValue.keyword" placeholder="搜索" style="width: 100%;margin-right: 10px" clearable />
        <el-button type="primary" @click="searchFun">搜索</el-button>
      </div>
      <div class="right">
        <el-button v-permission="[7, 8]" type="primary" class="margin-r-10" @click="putFromFun">设备入库</el-button>
        <el-popover
          placement="bottom"
          width="100"
          trigger="click"
        >
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="操作系统" />
            <el-checkbox label="存储容量" />
            <el-checkbox label="版本" />
            <el-checkbox label="屏幕尺寸" />
            <el-checkbox label="分辨率" />
            <el-checkbox label="屏幕比" />
            <el-checkbox label="零售商" />
            <el-checkbox label="购买价格" />
          </el-checkbox-group>
          <el-row class="margin-t-10" type="flex" justify="end">
            <el-button size="mini" @click="handCheckListBtn">确定</el-button>
          </el-row>
          <el-button slot="reference">列设置</el-button>
        </el-popover>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="device_name" align="center" label="资产名称">
        <template slot-scope="scope">
          <span class="bule-hover" @click="goDetail(scope.row.ID)">{{ scope.row.device_name || '未知名称' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="device_code" align="center" label="资产标签" />
      <el-table-column prop="" align="center" label="申请单数量">
        <template slot-scope="scope">
          {{ retNum(scope.row.device_applys) || 0 }}
        </template>
      </el-table-column>
      <el-table-column prop="" align="center" label="序列号" />
      <el-table-column prop="device_model" align="center" label="型号" />
      <el-table-column prop="device_category" align="center" label="类别" />
      <el-table-column prop="device_status" align="center" label="状态">
        <template slot-scope="scope">
          <ProStatus :status="scope.row.device_status" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="领用人">
        <template slot-scope="scope">
          {{ retName(scope.row.device_apply) || '' }}
        </template>
      </el-table-column>
      <el-table-column prop="mem" align="center" label="运存" />
      <el-table-column v-for="item in checkList" :key="item" :prop="retPops(item)" align="center" :label="item" />
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" size="small" :disabled="scope.row.device_status !== 'Free'" @click="recipientsFun(scope.row)">申请领用</el-button>
          <el-button type="text" size="small" @click="lendFun(scope.row)">借出</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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

    <PutFrom :id="putId" :visible="dialogVisible" :title="putTitle" @close="close" @success="putSuccess" />
    <RecipientsFrom :id="recipientsId" :visible="dialogVisibleRec" @close="close" @success="putSuccess" />
    <LendFrom :id="lendId" :visible="dialogVisibleLeng" @close="close" @success="putSuccess" />
  </div>
</template>

<script>
import PutFrom from '@/components/Property/PutFrom'
import permission from '@/directive/permission/index.js' // 权限判断指令
import RecipientsFrom from '@/components/Property/RecipientsFrom'
import LendFrom from '@/components/Property/LendFrom'
import ProStatus from '@/components/Property/ProStatus'
import { getDeviceList } from '@/api/property'
import { DECVICECATEGORY, DECVICESTATUS, CHECKLIST } from '@/utils/const'
export default {
  name: 'Equipment',
  directives: { permission },
  components: {
    PutFrom,
    RecipientsFrom,
    LendFrom,
    ProStatus
  },
  data() {
    return {
      putTitle: '设备录入',
      putId: 0,
      recipientsId: 0,
      lendId: 0,
      checkList: [],
      DECVICECATEGORY,
      DECVICESTATUS,
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        device_category: '',
        device_status: '',
        keyword: ''
      },
      tableData: [],
      total: 0,
      departmentList: [],
      dialogVisible: false,
      dialogVisibleRec: false,
      dialogVisibleLeng: false
    }
  },
  mounted() {
    this.init()
    this.checkList = localStorage.getItem('checkList') || '[]'
    this.checkList = JSON.parse(this.checkList)
  },
  methods: {
    async init() {
      const res = await getDeviceList(this.seachValue)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    goDetail(id) {
      this.$router.push({
        path: '/property/equipdetail',
        query: {
          id
        }
      })
    },
    handCheckListBtn() {
      localStorage.setItem('checkList', JSON.stringify(this.checkList))
    },
    searchFun() {
      this.init()
    },
    putSuccess() {
      this.dialogVisible = false
      this.dialogVisibleRec = false
      this.dialogVisibleLeng = false
      this.init()
    },
    putFromFun() {
      this.putTitle = '设备录入'
      this.putId = 0
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
      this.dialogVisibleRec = false
      this.dialogVisibleLeng = false
    },
    recipientsFun(row) {
      this.recipientsId = row.ID
      this.dialogVisibleRec = true
    },
    lendFun(row) {
      this.lendId = row.ID
      this.dialogVisibleLeng = true
    },
    handleEdit(row) {
      this.putTitle = '编辑设备'
      this.putId = row.ID
      this.dialogVisible = true
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
    },
    retNum(num) {
      if (num && num.length) {
        return num.length
      } else {
        return 0
      }
    },
    retName(num) {
      if (num) {
        return num.e_name
      } else {
        return ''
      }
    },
    retPops(status) {
      const leave = CHECKLIST.find((item) => { return item.label === status })
      if (leave) {
        return leave.value || ''
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.equipment-container {
  background-color: white;
}
</style>
