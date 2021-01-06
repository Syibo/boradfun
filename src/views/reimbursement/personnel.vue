<template>
  <div class="container settlement-container">
    <el-row class="table-top">
      <div class="left">
        <el-select v-model="seachValue.project_name" multiple placeholder="请选择项目" style="width: 200px; margin-right: 20px">
          <el-option v-for="item in projectList" :key="item" :label="item" :value="item" />
        </el-select>
        <el-radio v-model="radio" label="1">按周
          <el-date-picker
            v-model="planDate"
            :disabled="radio === '2'"
            style="width: 150px;"
            type="week"
            placeholder="选择周"
            format="yyyy 第 WW 周"
            :picker-options="optiondate"
            value-format="yyyy-MM-dd"
          />
        </el-radio>
        <el-radio v-model="radio" label="2">按月
          <el-date-picker
            v-model="planDate"
            :disabled="radio === '1'"
            style="width: 150px;"
            type="week"
            placeholder="选择月"
            format="yyyy 第 WW 周"
            :picker-options="optiondate"
            value-format="yyyy-MM-dd"
          />
        </el-radio>
        <el-button type="primary">查询</el-button>
        <el-button>取消</el-button>
      </div>
      <div class="right">
        <el-button type="primary">上传表格数据</el-button>
      </div>
    </el-row>

    <el-row :gutter="20" class="three">
      <el-col :span="8">
        <div class="three-item">
          <div class="top">任务总成本</div>
          <div class="num">12</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="three-item">
          <div class="top">总耗时</div>
          <div class="num">322</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="three-item">
          <div class="top">总人数</div>
          <div class="num">322</div>
        </div>
      </el-col>
    </el-row>

    <PersonTable />
    <PersonTable />
    <PersonTable />

    <!-- <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column label="申请人">
        <template slot-scope="scope">
          <span class="bule-hover"> {{ scope.row.e_name }} </span>
        </template>
      </el-table-column>
      <el-table-column align="right" label="流程信息">
        <template>
          <el-button type="text">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="broadfun_block">
      <el-pagination
        :current-page="seachValue.pagenum"
        :page-sizes="[10, 20, 50]"
        :page-size="seachValue.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import PersonTable from './personTable'
// import { getProjectList } from '@/api/remi'
export default {
  name: 'Personnel',
  directives: { permission },
  components: {
    PersonTable
  },
  data() {
    return {
      projectList: ['项目1', '项目2', '项目3'],
      radio: '1',
      seachValue: {
        project_name: '',
        pagenum: 1,
        pagesize: 10,
        name: '',
        type: '',
        status: '',
        myreq: true,
        mytodo: ''
      },
      total: 0,
      planDate: '',
      tableData: [],
      optiondate: {
        'firstDayOfWeek': 1
      }
    }
  },
  methods: {
    handleClick() {},
    handleSizeChange(val) {
      this.seachValue.pagenum = 1
      this.seachValue.pagesize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.seachValue.pagenum = val
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.settlement-container {
  padding-bottom: 50px;
  .pirce {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .three {
   margin-bottom: 10px;
   margin-top: 20px;
   .three-item {
     min-height: 100px;
     background: #f0f3f6;
     display: flex;
     flex-direction: column;
     justify-content: center;
     padding: 0 20px;
     border-radius: 5px;
     .top {
       margin-bottom: 10px;
       color: #666;
     }
   }
 }
}
</style>
