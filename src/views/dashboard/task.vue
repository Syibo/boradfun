<template>
  <div class="container">
    <Task1 v-if="type === 1" @accept="accept" />
    <Task2 v-else-if="type === 2" :service="serviceData" />
    <div v-else>else</div>
  </div>
</template>

<script>
import Task1 from '@/components/task/task1'
import Task2 from '@/components/task/task2'
import { getList } from '@/api/service'
export default {
  name: 'Task',
  components: {
    Task1,
    Task2
  },
  data() {
    return {
      type: 1,
      serviceData: []
    }
  },
  mounted() {
    this.getServiceList()
  },
  methods: {
    async getServiceList() {
      const res = await getList()
      this.serviceData = res.data
    },
    accept() {
      this.type = 2
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    padding-bottom: 10px;
}
</style>
