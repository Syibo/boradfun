<template>
  <div class="container">
    <Task1 v-if="type === 1" @accept="accept" />
    <Task2 v-else-if="type === 2" :service="serviceData" @freeze="freezeTask" />
    <Task3 v-else-if="type === 3" :service="serviceData" @resourcesTask="resourcesTask" />
    <Task4
      v-else-if="type === 4 || type === 5"
      :type="type"
      :service="serviceData"
      @startTask="startTask"
      @complete="complete"
    />
    <Task6 v-else-if="type === 6" :service="serviceData" />
    <div v-else>else</div>
  </div>
</template>

<script>
import Task1 from '@/components/task/task1'
import Task2 from '@/components/task/task2'
import Task3 from '@/components/task/task3'
import Task4 from '@/components/task/task4'
import Task6 from '@/components/task/task6'
import { getList } from '@/api/service'
export default {
  name: 'Task',
  components: {
    Task1,
    Task2,
    Task3,
    Task4,
    Task6
  },
  data() {
    return {
      type: 4,
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
    },
    freezeTask() {
      this.type = 3
    },
    resourcesTask() {
      this.type = 4
    },
    startTask() {
      this.type = 5
    },
    complete() {
      this.type = 6
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    padding-bottom: 10px;
}
</style>
