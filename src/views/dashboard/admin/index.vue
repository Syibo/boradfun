<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content bg-purple" />
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>今日结单/交付任务</span>
          </div>
          <div class="text item">
            <el-link type="primary">超级厉害娱乐信息公司（深度兼容--Android 300）</el-link>
          </div>
          <div class="text item">
            <el-link type="primary">超级厉害娱乐信息公司（深度兼容--iOS 50）</el-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple" />
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>明日结单/交付任务</span>
          </div>
          <div class="text item">
            <el-link type="primary">超级厉害娱乐信息公司（深度兼容--Android 300）</el-link>
          </div>
          <div class="text item">
            <el-link type="primary">超级厉害娱乐信息公司（深度兼容--iOS 50）</el-link>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple" />
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>总体任务看板</span>
          </div>
          <div class="text item">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" align="center" label="" />
              <el-table-column prop="name" align="center" label="需求" />
              <el-table-column prop="address" align="center" label="实施" />
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="tabs_table">
      <el-tabs type="border-card">
        <el-tab-pane label="急需关注" class="tabs_item">
          <el-table :data="tableData" border="" style="width: 100%">
            <el-table-column prop="date" align="center" label="" />
            <el-table-column prop="name" align="center" label="需求" />
            <el-table-column prop="address" align="center" label="实施" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="对接待确认(2)" class="tabs_item">配置管理</el-tab-pane>
        <el-tab-pane label="需求对接中(8)" class="tabs_item">角色管理</el-tab-pane>
        <el-tab-pane label="需求冻结待资源分配(3)" class="tabs_item">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'DashboardAdmin',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300'
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  .item {
    margin-bottom: 5px;
  }
  .tabs_table {
    margin-top: 10px;
    .tabs_item {
      min-height: 520px;
    }
  }
}
</style>
