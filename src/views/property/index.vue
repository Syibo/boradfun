<template>
  <div class="container myproperty-container">
    <div class="left">
      <div class="top">
        <el-row class="label">{{ `设备(${decviceList.length || 0})` }}</el-row>
        <el-row class="border-top">
          <el-row v-for="item in decviceList" :key="item.ID" class="decvice-item">
            <i class="el-icon-monitor" />
            <span class="bule-hover margin-l-10" @click="openDia(item.device_id)">#{{ item.device.device_code }}</span>
            <span class="flex1 margin-l-10">{{ item.device.device_name }}</span>
            <span>{{ Moment(item.receive_date).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </el-row>
        </el-row>
      </div>
      <div class="bot">
        <el-row class="label">{{ `易耗品(${lowList.length || 0})` }}</el-row>
        <el-row class="border-top">
          <el-row v-for="item in lowList" :key="item.ID" class="decvice-item">
            <i class="el-icon-monitor" />
            <span class="bule-hover margin-l-10" @click="openLowFrom(item.ID)">#{{ item.ID }}</span>
            <span class="margin-l-10">{{ item.low_price_article_name }}</span>
            <span class="flex1 margin-l-10">{{ item.low_price_article_requisitions ? item.low_price_article_requisitions.length : 0 }}</span>
            <span class="bule-hover" @click="openLow(item)"> <span v-if="item.need_return" class="need-re margin-r-10">需归还</span> {{ `领用记录` }}</span>
          </el-row>
        </el-row>
      </div>
    </div>
    <div class="right">
      <el-row class="label">{{ `已归还(${returnList.length || 0})` }}</el-row>
      <el-row class="border-top">
        <el-row v-for="item in returnList" :key="item.ID" class="decvice-item">
          <i class="el-icon-monitor" />
          <span class="margin-l-10">#{{ item.id }}</span>
          <span class="flex1 margin-l-10">{{ item.name }}</span>
          <span class="margin-l-10">{{ Moment(item.created_at).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </el-row>
      </el-row>
    </div>
    <DecviceDetail :id="detailId" :visible="visible" @close="close" />
    <LowDetail :id="lowId" :visible="lowFromVisible" @close="close" />
    <el-dialog title="领用记录" :visible="lowVisible" :close-on-click-modal="false" width="800px" @close="closeVisble">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
        <el-table-column prop="operator_name" align="center" label="领用人" />
        <el-table-column prop="quantity" align="center" label="领用数量" />
        <el-table-column prop="UpdatedAt" align="center" label="领用日期">
          <template slot-scope="scope">
            {{ Moment(scope.row.UpdatedAt).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            {{ retlowValue(scope.row.operator_category) }}
          </template>
        </el-table-column>
      </el-table></el-dialog>
  </div>
</template>

<script>
import { employeeOutgoing, lowPriceArticleOutgoing, lowPriceArticleReturn } from '@/api/property'
import DecviceDetail from '@/components/Property/DecviceDetail'
import LowDetail from '@/components/Property/LowDetail'
import Moment from 'moment'
import { retlowValue } from '@/utils/common'
export default {
  name: 'MyProperty',
  components: {
    DecviceDetail,
    LowDetail
  },
  data() {
    return {
      decviceList: [],
      returnList: [],
      lowList: [],
      visible: false,
      lowVisible: false,
      lowFromVisible: false,
      detailId: 0,
      lowId: 0,
      tableData: []
    }
  },
  mounted() {
    this.init()
    this.outing()
    this.lowReturn()
  },
  methods: {
    Moment,
    retlowValue,
    async init() {
      const res = await employeeOutgoing()
      if (res.ret === 0 && res.data) {
        this.decviceList = res.data
      }
    },
    async outing() {
      const res = await lowPriceArticleOutgoing()
      if (res.ret === 0 && res.data) {
        this.lowList = res.data
      }
    },
    async lowReturn() {
      const res = await lowPriceArticleReturn()
      if (res.ret === 0 && res.data) {
        this.returnList = res.data
      }
    },
    openDia(id) {
      this.detailId = id
      this.visible = true
    },
    openLowFrom(id) {
      this.lowId = id
      this.lowFromVisible = true
    },
    openLow(item) {
      this.tableData = item.low_price_article_requisitions
      this.lowVisible = true
    },
    close() {
      this.visible = false
      this.lowFromVisible = false
    },
    closeVisble() {
      this.tableData = []
      this.lowVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.border-top {
  border-top: 1px solid #dee4e7;
  margin-top: 10px;
  .decvice-item {
    font-size: 14px;
    border-left: 1px solid #dee4e7;
    border-right: 1px solid #dee4e7;
    border-bottom: 1px solid #dee4e7;
    color: #202d40;
    display: flex;
    height: 42px;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0px 2px 0px 0px
		rgba(222, 228, 231, 0.3);
  }
}
.label {
  color: #808387;
}
.need-re {
  display: inline-block;
  width: 54px;
	height: 20px;
	background-color: rgba(198, 161, 85, 0.15);
	border-radius: 3px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #8b7952;
}
.myproperty-container {
  background-color: white;
  display: flex;
  .left {
    background-color:#F7F8FA;
    flex: 1;
    border-right: 10px solid white;
    .top {
      min-height: 200px;
      border-bottom: 10px solid white;;
      padding: 10px;
      }
    }
    .bot {
      padding: 10px;
    }
  }
  .right {
    width: 400px;
    background-color:#F7F8FA;
    padding: 10px;
  }
</style>
