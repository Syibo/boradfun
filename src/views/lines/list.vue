<template>
  <div class="container">
    <el-row class="top">
      <el-button v-permission="['editor']">额度调整</el-button>
      <el-button v-permission="['editor']" type="primary">额度转换</el-button>
      <el-button v-permission="['admin']" type="success">任务退次</el-button>
      <el-button v-permission="['admin']" type="info">额度延期</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" align="center" label="日期" />
      <el-table-column prop="name" align="center" label="客户名称" />
      <el-table-column prop="address" align="center" label="服务名称" />
      <el-table-column prop="change" align="center" label="额度变化" />
      <el-table-column prop="info" align="center" label="变化操作说明" />
      <el-table-column prop="note" align="center" label="备注说明" />
    </el-table>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  name: 'LinesList',
  directives: { permission },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
