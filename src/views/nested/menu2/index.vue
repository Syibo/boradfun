<template>
  <div class="container">
    menu2
    <el-button @click="gom2">xxxxx</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    gom2() {
      this.$router.push({
        path: '/nested/menu2/menu2-1'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
