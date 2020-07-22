<template>
  <div class="container">
    <Task1 v-if="type === 'create'" :task-id="taskId" :data="taskData" @accept="accept" />
    <Task2 v-else-if="type === 'frozen'" :task-id="taskId" :data="taskData" :service="serviceData" @saveTask="saveTask" @freeze="freezeTask" />
    <Task3 v-else-if="type === 'assign'" :task-id="taskId" :data="taskData" :service="serviceData" @resourcesTask="resourcesTask" />
    <Task4
      v-else-if="type === 'allot' || type === 'execute'"
      :type="type"
      :task-id="taskId"
      :data="taskData"
      :service="serviceData"
      @startTask="startTask"
      @complete="complete"
    />
    <Task6
      v-else-if="type === 'finish' || type === 'end'"
      :type="type"
      :task-id="taskId"
      :data="taskData"
      :service="serviceData"
      @statement="statement"
    />
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
import { getOneTask } from '@/api/task'
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
      type: 'create',
      taskId: 0,
      serviceData: [],
      taskData: {
        client: {},
        service: {},
        taskDetail: {},
        exeUser: {},
        realService: {}
      }
    }
  },
  mounted() {
    this.type = this.$route.query.type
    this.taskId = Number(this.$route.query.id)
    this.getServiceList()
    this.getOneTask()
  },
  methods: {
    async getServiceList() {
      const res = await getList()
      this.serviceData = res.data
    },
    async getOneTask() {
      const res = await getOneTask({ id: this.taskId })
      if (res.ret === 0) {
        this.taskData = res.data
      }
    },
    accept() {
      this.type = 'frozen'
      this.getOneTask()
      this.$router.replace({
        path: 'task',
        query: {
          type: 'frozen',
          id: this.taskId
        }
      })
    },
    saveTask() {
      this.getOneTask()
    },
    freezeTask() {
      this.type = 'assign'
      this.$router.replace({
        path: 'task',
        query: {
          type: 'assign',
          id: this.taskId
        }
      })
    },
    resourcesTask() {
      this.getOneTask()
      this.type = 'allot'
      this.$router.replace({
        path: 'task',
        query: {
          type: 'allot',
          id: this.taskId
        }
      })
    },
    startTask() {
      this.type = 'execute'
      this.$router.replace({
        path: 'task',
        query: {
          type: 'execute',
          id: this.taskId
        }
      })
    },
    complete() {
      this.type = 'finish'
      this.$router.replace({
        path: 'task',
        query: {
          type: 'finish',
          id: this.taskId
        }
      })
    },
    statement() {
      this.type = 'end'
      this.$router.replace({
        path: 'task',
        query: {
          type: 'end',
          id: this.taskId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    padding-bottom: 10px;
}
</style>
