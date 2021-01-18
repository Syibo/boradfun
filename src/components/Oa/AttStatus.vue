<template>
  <span>
    <el-tag v-if="status === 'NA'" type="info">待审核</el-tag>
    <el-tag v-else-if="status === 'Approved'" type="success">审核通过</el-tag>
    <el-tag v-else-if="status === 'Rejected'" type="danger">驳回</el-tag>
    <el-tag v-else-if="status === 'Unpaid'" type="warning">待支付</el-tag>
    <el-tag v-else-if="status === 'Paid'" type="success">已支付</el-tag>
    <span v-else type="info">未知状态</span>
  </span>
</template>

<script>

export default {
  name: 'AttStatus',
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
