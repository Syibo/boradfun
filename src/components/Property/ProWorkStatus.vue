<template>
  <div>
    <span v-if="status === 'Approval'"> <i class="el-icon-success Success-color" />  审核通过</span>
    <span v-else-if="status === 'Approved'"> <i class="el-icon-success Success-color" /> 审核通过</span>
    <span v-else-if="status === 'Completed'"> <i class="el-icon-success Success-color" /> 已完成</span>
    <span v-else-if="status === 'Processing'"> <i class="el-icon-warning Warning-color" /> 待审核</span>
    <span v-else-if="status === 'NA'"> <i class="el-icon-warning Warning-color" /> 待审核</span>
    <span v-else-if="status === 'Rejected'"> <i class="el-icon-error Danger-color" /> 已驳回</span>
    <span v-else-if="status === 'Revoked'"> <i class="el-icon-remove Info-color" /> 已撤销</span>
    <span v-else-if="status === 'Received'"> <i class="el-icon-success Success-color" /> 已领用</span>
    <span v-else-if="status === 'Return'"> <i class="el-icon-info Info-color" /> 已归还</span>
    <span v-else-if="status === 'UnReceived'"> <i class="el-icon-question Brand-color" /> 待领用</span>
    <span v-else-if="status === 'Distributed'"><i class="el-icon-success Success-color" /> 已分配</span>
    <span v-else class="brof_status" />
  </div>
</template>

<script>

export default {
  name: 'ProWorkStatus',
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss">
.Warning-color {
  color: #E6A23C;
}
.Danger-color {
  color: #F56C6C;
}
.Success-color {
  color: #67C23A;
}
.Info-color {
  color: #909399;
}
.Brand-Color {
  color: #409EFF;
}
</style>
