<template>
  <div>
    <el-table :data="date" header-cell-class-name="table-header-style" style="width: 100%">
      <el-table-column prop="ID" label="任务ID" width="180" />
      <el-table-column label="客户名称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.client.name }}</span> <level :level="scope.row.client.level" />
        </template>
      </el-table-column>
      <el-table-column prop="service.serviceName" label="任务类型" />
      <el-table-column prop="client.saleUser.name" label="销售" />
      <el-table-column prop="manage.name" label="客户服务经理" />
      <el-table-column prop="reason" label="取消原因" />
    </el-table>
  </div>
</template>

<script>
import Level from '@/components/common/level.vue'
export default {
  name: 'TableCancel',
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
  }
}
</script>

<style lang="scss" scoped>
.name {
    color: #3293FF;
    cursor: pointer;
}
</style>
