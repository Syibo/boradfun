<template>
  <div>
    <el-tag v-if="status === 'Exception'" type="danger">异常</el-tag>
    <el-tag v-else-if="status === 'Normal'" type="success">正常</el-tag>
    <el-tag v-else type="info" />
  </div>
</template>

<script>

export default {
  name: 'AttStatus',
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

