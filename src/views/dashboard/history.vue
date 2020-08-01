<template>
  <div class="container">
    hi
  </div>
</template>

<script>
import { gethistoryData } from '@/api/task'
export default {
  name: 'History',
  data() {
    return {
      currentRole: 'adminDashboard',
      taskId: ''
    }
  },
  computed: {},
  mounted() {
    this.taskId = Number(this.$route.query.id)
    this.gethistoryData()
  },
  methods: {
    async gethistoryData() {
      const res = await gethistoryData({ id: this.taskId })
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
