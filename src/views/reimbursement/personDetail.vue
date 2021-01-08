<template>
  <el-dialog title="详情" :visible.sync="visible" :close-on-click-modal="false" width="1000px" @close="closeVisble">
    <el-table :data="diaData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="engagement_code" align="center" label="项目编号" />
      <el-table-column prop="employee_name" align="center" label="员工" />
      <el-table-column v-for="item in headerValue" :key="item" :prop="`date_field.${item}`" align="center" :label="item" />
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeVisble">取 消</el-button>
      <el-button type="primary" @click="closeVisble">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getEngagementDetail } from '@/api/remi'
export default {
  name: 'PersonDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    periodTime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      headerValue: [],
      diaData: []
    }
  },
  watch: {
    periodTime: {
      deep: true,
      async handler(value) {
        const res = await getEngagementDetail({ 'period_time': this.periodTime })
        if (res.ret === 0) {
          this.headerValue = Object.keys(res.data[0].date_field)
          this.diaData = res.data
        } else {
          this.$message.error(res.msg)
        }
      }
    }
  },
  mounted() {},
  methods: {
    closeVisble() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.contract-from {
  .el-dialog__header {
    padding: 0;
  }
  .el-input-number {
    text-align: left!important;
  }
}
</style>
