<template>
  <div>
    <el-table :data="date" header-cell-class-name="table-header-style" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="ID" label="任务ID" width="180" />
      <el-table-column label="客户名称" width="180">
        <template slot-scope="scope">
          <span class="name" @click="goTask(scope.row.ID, scope.row.status)">{{ scope.row.client.name }}</span> <level :level="scope.row.client.level" />
        </template>
      </el-table-column>
      <el-table-column prop="appName" label="应用/游戏名称" />
      <el-table-column prop="service.serviceName" label="任务类型" />
      <el-table-column prop="manage.name" label="客户服务经理" />
      <el-table-column prop="expEndDate" label="期望结单时间" />
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
    hight: {
      type: Array,
      default: () => []
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
          type: status,
          id
        }
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (this.hight.indexOf(row.ID) !== -1) {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>

<style>
  .el-table .warning-row {
    background: rgba(255,92,92,0.09);
  }
</style>

<style lang="scss" scoped>
.name {
    color: #3293FF;
    cursor: pointer;
}
</style>
