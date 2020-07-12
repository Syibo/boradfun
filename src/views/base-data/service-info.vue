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
          <div>0</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="amount_item">
          <div>剩余</div>
          <div>{{ serviceInfo.amount }}</div>
        </div>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="额度订单" name="first">额度订单</el-tab-pane>
      <el-tab-pane label="额度消耗记录" name="second">额度消耗记录</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCusAmountList } from '@/api/service'
export default {
  name: 'ServiceInfo',
  data() {
    return {
      cusId: '',
      serviceId: '',
      serviceInfo: {},
      activeName: 'first'
    }
  },
  mounted() {
    this.cusId = this.$route.query.cusId
    this.serviceId = this.$route.query.serviceId
    this.getCusAmountList()
  },
  methods: {
    async getCusAmountList() {
      const res = await getCusAmountList({ clientId: this.cusId, deadline: '' })
      const _this = this
      _this.serviceInfo = res.data.find(function(elem) {
        // eslint-disable-next-line eqeqeq
        return elem.service_id == _this.serviceId
      })
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
