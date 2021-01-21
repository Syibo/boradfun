<template>
  <el-dialog title="资产详情" :visible="visible" :close-on-click-modal="false" width="800px" @close="closeVisble">
    <el-row style="color: rgba(0, 0, 0, 0.85); font-size: 14px;">
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">物品名称</span> {{ detailData.low_price_article_name }}</el-col>
        <el-col :span="10"><span class="w100">品牌</span> {{ detailData.brand }}</el-col>
      </el-row>
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">价格</span> {{ detailData.purchase_price }}</el-col>
        <el-col :span="10"><span class="w100">是否需归还</span>{{ detailData.need_return === 0 ? '否' : '是' }}</el-col>
      </el-row>
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">零售商：</span> {{ detailData.retailer }}</el-col>
        <el-col :span="10"><span class="w100">数量：</span> {{ detailData.total_quantity }}</el-col>
      </el-row>
      <el-row class="margin-b-20">
        <el-col :span="10"><span class="w100">位置：</span> {{ detailData.site }}</el-col>
      </el-row>
    </el-row>
  </el-dialog>
</template>

<script>
import { lowPriceArticleDetail } from '@/api/property'
export default {
  name: 'LowDetail',
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
      const res = await lowPriceArticleDetail(this.id)
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
