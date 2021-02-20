<template>
  <el-dialog title="易耗品入库" :visible="visible" :close-on-click-modal="false" width="600px" @close="closeVisble">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <el-form-item label="类型" prop="low_price_article_category">
            <el-select v-model="ruleForm.low_price_article_category" placeholder="类别" style="width: 100%" clearable>
              <el-option v-for="item in CATEGORY" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="资产名称" prop="low_price_article_name">
            <el-input v-model="ruleForm.low_price_article_name" placeholder="资产名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="品牌" prop="brand">
            <el-input v-model="ruleForm.brand" placeholder="品牌" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="数量" prop="total_quantity">
            <el-input-number v-model="ruleForm.total_quantity" :min="1" style="width: 200px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="零售商" prop="retailer">
            <el-input v-model="ruleForm.retailer" placeholder="零售商" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="购买价格" prop="purchase_price">
            <el-input-number v-model="ruleForm.purchase_price" :min="0" style="width: 200px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="位置" prop="site">
            <el-input v-model="ruleForm.site" placeholder="位置" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="">
            <el-checkbox v-model="ruleForm.need_return" :true-label="1" :false-label="0">需归还</el-checkbox>
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
import { CATEGORY } from '@/utils/const'
import { addLowPriceArticle } from '@/api/property'
export default {
  name: 'ConsumableFrom',
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
      rules: {
        low_price_article_category: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        low_price_article_name: [
          { required: true, message: '请输入资产名称', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '请输入品牌', trigger: 'blur' }
        ],
        total_quantity: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
        retailer: [
          { required: true, message: '请输入零售商', trigger: 'blur' }
        ],
        purchase_price: [
          { required: true, message: '请输入购买价格', trigger: 'blur' }
        ],
        site: [
          { required: true, message: '请输入位置', trigger: 'blur' }
        ]
      },
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
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.checkFun()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async checkFun() {
      const res = await addLowPriceArticle(this.ruleForm)
      if (res.ret === 0) {
        this.$emit('success')
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
