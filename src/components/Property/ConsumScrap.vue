<template>
  <el-dialog title="报废录入" :visible="visible" :close-on-click-modal="false" width="600px" @close="closeVisble">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <el-form-item label="类型">
            <el-select v-model="ruleForm.low_price_article_category" placeholder="类别" style="width: 100%" clearable>
              <el-option v-for="item in CATEGORY" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="资产名称">
            <el-input v-model="ruleForm.low_price_article_name" placeholder="资产名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="品牌">
            <el-input v-model="ruleForm.brand" placeholder="品牌" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="数量">
            <el-input-number v-model="ruleForm.total_quantity" style="width: 200px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="ruleForm.site" placeholder="位置" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeVisble">取 消</el-button>
      <el-button type="primary" @click="checkBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { rulesCon } from '@/views/archives/config'
import { CATEGORY } from '@/utils/const'
import { addLowPriceArticle } from '@/api/property'
export default {
  name: 'ConsumScrap',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      CATEGORY,
      ruleForm: {
        low_price_article_category: '', low_price_article_name: '', brand: '', retailer: '', site: '',
        purchase_price: 0, total_quantity: 0, comment: '', need_return: 0
      },
      rules: rulesCon,
      myHeaders: {},
      api: '',
      eleContract: [],
      eleContractScanned: []
    }
  },
  mounted() {},
  methods: {
    closeVisble() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        low_price_article_category: '', low_price_article_name: '', brand: '', retailer: '', site: '',
        purchase_price: 0, total_quantity: 0, comment: '', need_return: 0
      }
      this.$emit('close')
    },
    async checkBtn() {
      console.log(this.ruleForm)
      const res = await addLowPriceArticle(this.ruleForm)
      if (res.ret === 0) {
        this.$emit('success')
      } else {
        // this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-cla {
  padding: 5px;
  background-color:#F7F8FA;
}
.contract-from {
  .el-dialog__header {
    padding: 0;
  }
  .el-input-number {
    text-align: left!important;
  }
}
</style>
