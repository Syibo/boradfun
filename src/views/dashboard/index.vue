<template>
  <div class="container">
    <adminDashboard />
  </div>
</template>

<script>
import adminDashboard from './admin'

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>

</style>
