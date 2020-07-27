<template>
  <div>
    <el-table :data="date" header-cell-class-name="table-header-style" style="width: 100%">
      <el-table-column prop="ID" label="任务ID" width="180" />
      <el-table-column prop="appName" label="应用/游戏名称" />
      <el-table-column prop="service.serviceName" label="任务类型" />
      <el-table-column prop="manageId" label="客户服务经理" />
      <el-table-column prop="expEndDate" label="期望结单日期/时间" />
      <el-table-column prop="reason" label="取消原因" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TableHigh',
  components: {},
  props: {
    date: {
      type: Array,
      default: () => []
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

<style lang="scss" scoped>
.name {
    color: #3293FF;
    cursor: pointer;
}
</style>
