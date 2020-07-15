<template>
  <div class="container">
    <Task1 />
  </div>
</template>

<script>
import Task1 from '@/components/task/task1'
export default {
  name: 'Task',
  components: {
    Task1
  }
}
</script>

<style lang="scss" scoped>
.container {
    padding-bottom: 10px;
}
</style>
