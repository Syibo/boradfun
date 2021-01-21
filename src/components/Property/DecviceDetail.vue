<template>
  <el-dialog title="资产详情" :visible="visible" :close-on-click-modal="false" width="800px" @close="closeVisble">
    <el-row style="color: rgba(0, 0, 0, 0.85); font-size: 14px;">
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">设备类型</span> {{ detailData.device_category }}</el-col>
        <el-col :span="10"><span class="w100">购买日期</span> {{ detailData.purchase_date }}</el-col>
      </el-row>
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">资产编号</span> {{ detailData.device_code }}</el-col>
        <el-col :span="10"><span class="w100">供应商</span> {{ detailData.retailer }}</el-col>
      </el-row>
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">设备名称</span> {{ detailData.device_name }}</el-col>
        <el-col :span="10"><span class="w100">购买价格</span> {{ detailData.purchase_price }}</el-col>
      </el-row>
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">CPU</span> {{ detailData.cpu }}</el-col>
        <el-col :span="10"><span class="w100">增值税价格</span> {{ detailData.vat }}</el-col>
      </el-row>
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">运存</span> {{ detailData.mem }}</el-col>
        <el-col :span="10"><span class="w100">保修日期(月)</span> {{ detailData.warranty_period }}</el-col>
      </el-row>
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">显卡</span> {{ detailData.device_code }}</el-col>
        <el-col :span="10"><span class="w100">是否可以申领</span> {{ detailData.is_apply }}</el-col>
      </el-row>
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">存储容量</span> {{ detailData.volume }}</el-col>
        <el-col :span="10"><span class="w100">位置</span> {{ detailData.site }}</el-col>
      </el-row>
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">状态</span> <ProStatus :status="detailData.device_status" /> </el-col>
      </el-row>
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">序列号</span> {{ detailData.mac_address_1 }}</el-col>
      </el-row>
    </el-row>
  </el-dialog>
</template>

<script>
import { deviceDetail } from '@/api/property'
import ProStatus from '@/components/Property/ProStatus'
export default {
  name: 'DecviceDetail',
  components: {
    ProStatus
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      detailData: {}
    }
  },
  watch: {
    visible: {
      handler(value) {
        if (value && this.id) {
          this.init()
        }
      }
    }
  },
  mounted() {},
  methods: {
    async init() {
      const res = await deviceDetail(this.id)
      if (res.ret === 0) {
        this.detailData = res.data
      }
    },
    closeVisble() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.w100 {
    font-size: 14px;
    color: #808387;
    display: inline-block;
    width: 120px;
}
</style>
