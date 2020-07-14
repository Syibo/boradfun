<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20" class="today_container">
      <el-col :span="12">
        <div class="today_task">
          <div class="title"> 今日结单任务（4） </div>
          <div v-for="item in 3" :key="item" class="item">
            超级厉害娱乐信息公司 <span>深度兼容-Android 300</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="today_task">
          <div class="title"> 明日结单任务（4） </div>
          <div v-for="item in 6" :key="item" class="item">
            超级厉害娱乐信息公司 <span>深度兼容-Android 300</span>
          </div>
        </div>
      </el-col>
      <el-popover
        class="task_pop"
        placement="bottom-end"
        width="420"
        trigger="click"
      >
        <el-table :data="tableData" header-cell-class-name="table-header-style" style="width: 100%">
          <el-table-column width="200" property="date" label="类型" />
          <el-table-column property="name" label="需求" />
          <el-table-column property="address" label="实施" />
        </el-table>
        <el-button slot="reference" class="bor_btn" circle>总览</el-button>
      </el-popover>
    </el-row>

    <div class="measure">
      <div class="measure_label"> 任务列表 </div>
      <el-button v-permission="[1]" icon="el-icon-circle-plus-outline" type="primary">提测</el-button>
    </div>

    <el-row class="tabs_table">
      <el-tabs>
        <el-tab-pane label="急需解决 ·7" class="tabs_item">
          <table1 />
        </el-tab-pane>
        <el-tab-pane label="对接待确认(2)" class="tabs_item">配置管理</el-tab-pane>
        <el-tab-pane label="需求对接中(8)" class="tabs_item">角色管理</el-tab-pane>
        <el-tab-pane label="需求冻结待资源分配(3)" class="tabs_item">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import table1 from '@/components/dashboard/table1.vue'
export default {
  name: 'DashboardAdmin',
  components: {
    table1
  },
  directives: { permission },
  data() {
    return {
      tableData: [{
        date: '专家兼容精华-Android 100',
        name: '10',
        address: '20'
      }, {
        date: '专家兼容精华-Android 100',
        name: '10',
        address: '20'
      }, {
        date: '专家兼容精华-Android 100',
        name: '10',
        address: '20'
      }, {
        date: '专家兼容精华-Android 100',
        name: '10',
        address: '20'
      }, {
        date: '专家兼容精华-Android 100',
        name: '10',
        address: '20'
      }, {
        date: '专家兼容精华-Android 100',
        name: '10',
        address: '20'
      }]
    }
  }
}
</script>

<style lang="scss">
.dashboard-editor-container {
  .el-tabs__active-bar {
    background-color: black;
  }
  .el-tabs__item.is-active {
    font-weight:500;
    color: #2B2B2B;
    font-size:14px;
  }
  .el-tabs__item {
    color: #808387;
  }
}
</style>

<style lang="scss" scoped>
.dashboard-editor-container {
  .today_container {
    position: relative;
    .today_task {
      height:280px;
      background:rgba(247,248,250,1);
      border-radius:4px;
      padding: 16px 12px;
      overflow-y: auto;
      .title {
        font-size:16px;
        font-weight:500;
        color:rgba(51,51,51,1);
        margin-bottom: 16px;
      }
      .item {
        height: 48px;
        background-color: white;
        width: 100%;
        border-bottom: 1px solid #D8D8D8;
        display: flex;
        align-items: center;
        color: #202D40;
        font-size:14px;
        padding: 0 15px;
        span {
          display: inline-block;
          background:rgba(38,69,212,0.1);
          color: #2645D4;
          font-size:12px;
          margin-left: 15px;
          height: 22px;
          line-height: 22px;
          padding: 0 5px;
          border-radius:3px;
        }
      }
    }
    .today_task::-webkit-scrollbar-track-piece {
      background-color:#f8f8f8;
    }
    .today_task::-webkit-scrollbar {
      width:6px;
      height:6px;
    }
    .today_task::-webkit-scrollbar-thumb {
      background-color:#dddddd;
      background-clip:padding-box;
      min-height:28px;
      border-radius: 6px;
    }
    .today_task::-webkit-scrollbar-thumb:hover {
      background-color:#bbb;
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
  .measure {
    display: flex;
    margin-top: 20px;
    .measure_label {
      font-size:18px;
      color: #202D40;
      flex: 1;
    }
  }
  .tabs_table {
    padding: 0 5px;
    .tabs_item {
      min-height: 420px;
    }
  }
}
</style>
