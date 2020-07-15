<template>
  <div>
    <el-table :data="tableData" header-cell-class-name="table-header-style" style="width: 100%">
      <el-table-column prop="id" label="任务ID" width="180" />
      <el-table-column label="客户名称" width="180">
        <template slot-scope="scope">
          <span class="name" @click="goTask">{{ scope.row.name }}</span> <level :level="scope.row.level" />
        </template>
      </el-table-column>
      <el-table-column prop="app" label="应用/游戏名称" />
      <el-table-column prop="type" label="任务类型" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="date" label="期望结单日期/时间" />
    </el-table>
  </div>
</template>

<script>
import Level from '@/components/common/level.vue'
export default {
  name: 'Table1',
  components: {
    Level
  },
  data() {
    return {
      tableData: [{
        id: '#1234',
        name: '超级厉害娱乐信息公司',
        app: '王者荣耀',
        level: 'S',
        type: '深度兼容-Android 300',
        status: 1,
        date: '2020-02-02 20:20:20'
      }, {
        id: '#1234',
        name: '超级厉害娱乐信息公司',
        app: '王者荣耀',
        level: 'A',
        type: '上海市普陀区金沙江路 1518 弄',
        status: 1,
        date: '2020-02-02 20:20:20'
      }, {
        id: '#1234',
        name: '超级厉害娱乐信息公司',
        app: '王者荣耀',
        level: 'B',
        type: '上海市普陀区金沙江路 1518 弄',
        status: 1,
        date: '2020-02-02 20:20:20'
      }, {
        id: '#1234',
        name: '超级厉害娱乐信息公司',
        app: '王者荣耀',
        level: 'S',
        type: '上海市普陀区金沙江路 1518 弄',
        status: 1,
        date: '2020-02-02 20:20:20'
      }, {
        id: '#1234',
        name: '超级厉害娱乐信息公司',
        app: '王者荣耀',
        level: 'S',
        type: '上海市普陀区金沙江路 1518 弄',
        status: 1,
        date: '2020-02-02 20:20:20'
      }]
    }
  },
  mounted() {

  },
  methods: {
    goTask() {
      this.$router.push({
        path: 'task'
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
