<template>
  <div class="container">
    <router-view />
    <el-button v-if="this.$route.path === '/nested/menu1'" @click="gom2">xxxxx</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    gom2() {
      this.$router.push({
        path: '/nested/menu1/menu1-1'
      })
    }
  }
}
</script>
