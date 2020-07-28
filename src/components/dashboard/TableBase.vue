<template>
  <div>
    <el-table :data="date" header-cell-class-name="table-header-style" style="width: 100%">
      <el-table-column prop="ID" label="任务ID" width="180" />
      <el-table-column label="客户名称" width="180">
        <template slot-scope="scope">
          <span class="name" @click="goTask(scope.row.ID, scope.row.status)">{{ scope.row.client.name }}</span> <level :level="scope.row.client.level" />
        </template>
      </el-table-column>
      <el-table-column prop="appName" label="应用/游戏名称" />
      <el-table-column prop="service.serviceName" label="任务类型" />
      <el-table-column prop="manageId" label="客户服务经理" />
      <el-table-column prop="expEndDate" label="期望结单日期/时间" />
    </el-table>
  </div>
</template>

<script>
import Level from '@/components/common/level.vue'
export default {
  name: 'TableBase',
  components: {
    Level
  },
  props: {
    date: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'create'
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    goTask(id, status) {
      this.$router.push({
        path: 'task',
        query: {
          type: this.type,
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.name {
    color: #3293FF;
    cursor: pointer;
}
</style>
