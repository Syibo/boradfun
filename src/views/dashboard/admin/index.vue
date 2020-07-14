<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20" class="today_container">
      <el-col :span="12">
        <div class="today_task">
          s
        </div>
        <!-- <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>今日结单/交付任务</span>
          </div>
          <div class="text item">
            <el-link type="primary">超级厉害娱乐信息公司（深度兼容--Android 300）</el-link>
          </div>
          <div class="text item">
            <el-link type="primary">超级厉害娱乐信息公司（深度兼容--iOS 50）</el-link>
          </div>
        </el-card> -->
      </el-col>
      <el-col :span="12">
        <div class="today_task">
          s
        </div>
      </el-col>

      <el-popover
        class="task_pop"
        placement="bottom"
        title="标题"
        width="200"
        trigger="click"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      >
        <el-button slot="reference" class="bor_btn" circle>总览</el-button>
      </el-popover>
      <!-- <el-col :span="8">
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
      </el-col> -->
    </el-row>

    <el-row class="tabs_table">
      <el-tabs>
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
  .today_container {
    position: relative;
    .today_task {
      height:280px;
      background:rgba(247,248,250,1);
      border-radius:4px;
    }
    .task_pop {
      position: absolute;
      right: 0;
      top: -10px;
      .bor_btn {
        width: 48px;
        height: 48px;
        color: #17222F;
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
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
