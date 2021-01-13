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
        <el-button type="primary" class="margin-r-10 " @click="putFromFun">设备入库</el-button>
        <!-- <el-button>列设置</el-button> -->
        <el-popover
          placement="bottom"
          width="100"
          trigger="click"
        >
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="存储容量" />
            <el-checkbox label="版本" />
            <el-checkbox label="屏幕尺寸" />
            <el-checkbox label="分辨率" />
            <el-checkbox label="屏幕比" />
          </el-checkbox-group>
          <el-row class="margin-t-10" type="flex" justify="end">
            <el-button size="mini">确定</el-button>
          </el-row>
          <el-button slot="reference">列设置</el-button>
        </el-popover>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="device_name" align="center" label="资产名称" />
      <el-table-column prop="device_code" align="center" label="资产标签" />
      <el-table-column prop="" align="center" label="申请单数量">
        <template slot-scope="scope">
          {{ retNum(scope.row.device_applys) || 0 }}
        </template>
      </el-table-column>
      <el-table-column prop="device_code" align="center" label="序列号" />
      <el-table-column prop="device_model" align="center" label="型号" />
      <el-table-column prop="device_category" align="center" label="类别" />
      <el-table-column prop="device_status" align="center" label="状态" />
      <el-table-column align="center" label="领用人">
        <template slot-scope="scope">
          {{ retName(scope.row.device_applys) || '' }}
        </template>
      </el-table-column>
      <el-table-column prop="mem" align="center" label="运存" />
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

    <PutFrom :visible="dialogVisible" @close="close" @success="putSuccess" />
    <RecipientsFrom :visible="dialogVisibleRec" @close="close" />
    <LendFrom :visible="dialogVisibleLeng" @close="close" />
  </div>
</template>

<script>
import PutFrom from '@/components/Property/PutFrom'
import RecipientsFrom from '@/components/Property/RecipientsFrom'
import LendFrom from '@/components/Property/LendFrom'
import { getDeviceList } from '@/api/property'
import { DECVICECATEGORY, DECVICESTATUS } from '@/utils/const'
export default {
  name: 'Equipment',
  components: {
    PutFrom,
    RecipientsFrom,
    LendFrom
  },
  data() {
    return {
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
  mounted() {
    this.init()
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
    searchFun() {
      this.init()
    },
    putSuccess() {
      this.dialogVisible = false
      this.init()
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
    handleDel() {},
    seachFun() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    retNum(num) {
      if (num && num.length) {
        return num.length
      } else {
        return 0
      }
    },
    retName(num) {
      if (num && num.length) {
        return num[0].e_name
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
