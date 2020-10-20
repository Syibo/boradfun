<template>
  <span>
    <el-tag v-if="status === 'NA'" type="info">待审核</el-tag>
    <el-tag v-else-if="status === 'Approved'" type="success">审核通过</el-tag>
    <el-tag v-else-if="status === 'Rejected'" type="danger">驳回</el-tag>
    <span v-else type="info">位置状态</span>
  </span>
</template>

<script>

export default {
  name: 'AttStatus',
  props: {
    status: {
      type: Number,
      default: 0
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
