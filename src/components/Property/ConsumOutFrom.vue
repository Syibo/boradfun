<template>
  <el-dialog title="易耗品借出" :visible="visible" :close-on-click-modal="false" width="600px" @close="closeVisble">
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
            <el-input v-model="info.brand" placeholder="品牌" disabled />
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
          <el-form-item label="领用人">
            <el-autocomplete
              v-model="ruleForm.associate_employee_name"
              style="width: 100%"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入领用人"
              @select="handleSelect"
            />
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
import { postLowPriceArticleOutgoing } from '@/api/property'
import { mapGetters } from 'vuex'
import { getEmployeeList } from '@/api/employee'
export default {
  name: 'ConsumOutFrom',
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
        low_price_article_id: '', operator_id: '', associate_employee_id: '', associate_employee_name: '', quantity: 0,
        comment: ''
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
        low_price_article_id: '', operator_id: '', associate_employee_id: '', associate_employee_name: '', quantity: 0,
        comment: ''
      }
      this.$emit('close')
    },
    async querySearchAsync(queryString, cb) {
      let restaurants = []
      const seach = {
        pagenum: 1,
        pagesize: 10,
        name: this.ruleForm.associate_employee_name,
        departmentid: '',
        status: 2
      }
      const res = await getEmployeeList(seach)
      if (res.ret === 0 && res.data.list.length !== 0) {
        for (let i = 0, len = res.data.list.length; i < len; i++) {
          res.data.list[i].value = res.data.list[i].name
        }
        restaurants = res.data.list
      } else {
        restaurants = []
      }
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
      this.ruleForm.associate_employee_id = item.ID
    },
    async checkBtn() {
      this.ruleForm.low_price_article_id = this.id
      this.ruleForm.operator_id = this.userId
      console.log(this.ruleForm)
      const res = await postLowPriceArticleOutgoing(this.ruleForm)
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
