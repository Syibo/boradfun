<template>
  <span>
    <el-tag v-if="status === 'Scrap'" type="info">报废</el-tag>
    <el-tag v-else-if="status === 'Free'" type="success">空闲中</el-tag>
    <el-tag v-else-if="status === 'Fixing'" type="danger">维修中</el-tag>
    <el-tag v-else-if="status === 'Possessed'" type="warning">占用中</el-tag>
    <el-tag v-else-if="status === 'Ingoing'">入库中</el-tag>
    <el-tag v-else-if="status === 'Outgoing'">出库中</el-tag>
    <el-tag v-else-if="status === 'Return'">归还</el-tag>
    <el-tag v-else type="info">未知状态</el-tag>
  </span>
</template>

<script>

export default {
  name: 'ProStatus',
  props: {
    status: {
      type: String,
      default: 'NA'
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
