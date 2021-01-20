<template>
  <el-dialog title="报废录入" :visible="visible" :close-on-click-modal="false" width="600px" @close="closeVisble">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <el-form-item label="类型">
            <el-select v-model="info.low_price_article_category" disabled placeholder="类别" style="width: 100%" clearable>
              <el-option v-for="item in CATEGORY" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="资产名称">
            <el-input v-model="info.low_price_article_name" disabled placeholder="资产名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="品牌">
            <el-input v-model="info.brand" disabled placeholder="品牌" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="数量">
            <el-input-number v-model="ruleForm.quantity" style="width: 200px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="ruleForm.comment" placeholder="备注" />
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
import { lowPriceArticleListScrap } from '@/api/property'
import { mapGetters } from 'vuex'
export default {
  name: 'ConsumScrap',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      CATEGORY,
      ruleForm: {
        low_price_article_id: 0, operator_id: 0, quantity: 0, comment: ''
      },
      rules: rulesCon,
      myHeaders: {},
      api: '',
      eleContract: [],
      eleContractScanned: []
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  mounted() {},
  methods: {
    closeVisble() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        low_price_article_id: 0, operator_id: 0, quantity: 0, comment: ''
      }
      this.$emit('close')
    },
    async checkBtn() {
      this.ruleForm.operator_id = this.userId
      this.ruleForm.low_price_article_id = this.id
      const res = await lowPriceArticleListScrap(this.ruleForm)
      if (res.ret === 0) {
        this.$emit('success')
      } else {
        this.$emit('close')
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
