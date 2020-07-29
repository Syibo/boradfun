<template>
  <div class="service_info">
    <div class="service_btn">
      <el-button>额度调整</el-button>
    </div>
    <div class="service_name">
      {{ serviceInfo.service_name }}
    </div>
    <el-row :gutter="20" class="amount">
      <el-col :span="8">
        <div class="amount_item">
          <div>总额度</div>
          <div>{{ serviceInfo.amount }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="amount_item">
          <div>已使用</div>
          <div>{{ serviceInfo.used }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="amount_item">
          <div>剩余</div>
          <div>{{ serviceInfo.remain }}</div>
        </div>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="额度订单" name="first">
        <el-table :data="logData" header-cell-class-name="table-header-style" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.logs" style="width: 100%;padding: 0">
                <el-table-column prop="real_time" label="发生日期" />
                <el-table-column prop="change" label="" />
                <el-table-column prop="desc" width="500" label="" />
                <el-table-column prop="remark" label="" />
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="orderNumber" label="订单编号" />
          <el-table-column prop="amount" label="剩余额度" />
          <el-table-column prop="deadline" label="过期时间" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="额度消耗记录" name="second">额度消耗记录</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCusAmountList, handAmountLog } from '@/api/service'
export default {
  name: 'ServiceInfo',
  data() {
    return {
      cusId: '',
      serviceId: '',
      serviceInfo: {},
      activeName: 'first',
      logData: []
    }
  },
  mounted() {
    this.cusId = this.$route.query.cusId
    this.serviceId = this.$route.query.serviceId
    this.getCusAmountList()
    this.handAmountLog()
  },
  methods: {
    async getCusAmountList() {
      const res = await getCusAmountList({ clientId: this.cusId, deadline: '' })
      const _this = this
      _this.serviceInfo = res.data.find(function(elem) {
        // eslint-disable-next-line eqeqeq
        return elem.service_id == _this.serviceId
      })
    },
    async handAmountLog() {
      const res = await handAmountLog({ clientId: 1, serviceId: 1 })
      if (res.ret === 0) {
        this.logData = res.data
        console.log(res.data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.service_info {
  background-color: white;
  .service_btn {
    display: flex;
    justify-content: flex-end;
  }
  .service_name {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .amount {
    margin-bottom: 20px;
    .amount_item {
      background-color: #f1f1f1;
      height: 100px;
      padding: 20px;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
