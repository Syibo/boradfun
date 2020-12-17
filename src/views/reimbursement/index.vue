<template>
  <div class="container rimbu-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="" />
      <el-tab-pane label="待审核" name="1" />
      <el-tab-pane label="待支付" name="2" />
      <el-tab-pane label="已支付" name="3" />
    </el-tabs>
    <el-row :gutter="20" class="three">
      <el-col :span="12">
        <div class="three-item">
          <div class="top">最近一个月内报销金额合计
            <el-tooltip class="item" effect="dark" content="最近一个月内提交报销单总金额" placement="right">
              <i class="el-icon-warning" />
            </el-tooltip>
          </div>
          <div class="num">787</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="three-item">
          <div class="top">最近一个月内已支付金额合计
            <el-tooltip class="item" effect="dark" content="最近一个月内已支付总金额" placement="right">
              <i class="el-icon-warning" />
            </el-tooltip>
          </div>
          <div class="num">446</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="table-top">
      <div class="left">
        <el-input v-model="seachValue.searchid" placeholder="编号" @input="changeSeach" />
        <el-date-picker
          v-model="planDate"
          style="width: 300px;margin-left: 10px"
          type="month"
          placeholder="选择日期"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM-dd"
          @change="changeDateFun"
        />
        <el-button type="primary" style="margin-left: 10px">重置</el-button>
      </div>
      <div class="right">
        <el-button type="primary" @click="goApply">申请报销</el-button>
      </div>
    </el-row>

    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column align="center" label="申请编号">
        <template slot-scope="scope">
          <span class="bule-hover" @click="openDrawer(scope.row.ID)"> #{{ scope.row.ID }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="e_name" align="center" label="申请人" />
      <el-table-column prop="expense_summary" align="center" label="报销金额" />
      <el-table-column prop="CreatedAt" align="center" label="提交时间">
        <template slot-scope="scope">
          {{ parseTime(scope.row.CreatedAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="project" align="center" label="相关项目" />
      <el-table-column prop="status" align="center" label="申请状态" />
      <el-table-column prop="name" align="center" label="流程信息">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            style="height: 100%"
            width="200"
            trigger="click"
            @show="show(scope.row)"
          >
            <div v-if="scope">
              <el-steps direction="vertical" :active="active" finish-status="finish">
                <el-step
                  v-for="item in workflow"
                  :key="item.ID"
                  :icon="retWorkflowIcon(item.status)"
                  :title="item.user ? item.user.name : ''"
                  :description="retWorkflowLabel(item.status)"
                >
                  <template slot="icon">
                    <i :class="retWorkflowIcon(item.status)" />
                  </template>
                </el-step>
              </el-steps>
            </div>
            <el-button slot="reference" type="text">查看详情</el-button>
          </el-popover>
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
    </div>
    <RemiDrawer :id="remiDrawerId" ref="remiDrawer" />
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import RemiDrawer from './reimDrawer'
import { getRemiList, getRemiDetail } from '@/api/remi'
import { parseTime } from '@/utils/common'
import { retWorkflowLabel, retWorkflowIcon, getaActive } from '@/utils/common'
export default {
  name: 'RimbursementIndex',
  directives: { permission },
  components: {
    RemiDrawer
  },
  data() {
    return {
      activeName: 'first',
      seachValue: {
        pagesize: 10,
        pagenum: 1,
        searchid: '',
        status: '',
        myreq: true,
        application_date_begin: '',
        application_date_end: ''
      },
      remiDrawerId: 0,
      workflow: [],
      active: 0,
      total: 0,
      planDate: '',
      tableData: [
        { e_name: '#67566' }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const res = await getRemiList(this.seachValue)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
      }
    },
    retWorkflowLabel,
    retWorkflowIcon,
    parseTime,
    getaActive,
    async show(row) {
      const res = await getRemiDetail(row.ID)
      this.active = this.getaActive(res.data.work_flow.nodes)
      this.workflow = res.data.work_flow.nodes
    },
    changeSeach() {
      this.init()
    },
    changeDateFun() {
      this.seachValue.application_date_begin = this.planDate
      const lastDay = new Date(this.planDate.substring(0, 4), this.planDate.substring(5, 7), 0).getDate()
      this.seachValue.application_date_end = `${this.planDate.substring(0, 4)}-${this.planDate.substring(5, 7)}-${lastDay}`
      this.init()
    },
    goApply() {
      this.$router.push({
        path: 'apply'
      })
    },
    async openDrawer(id) {
      this.remiDrawerId = id
      this.$refs.remiDrawer.openDrawer()
      // const res = await getRemiDetail(id)
      // if (res.ret === 0) {
      //   console.log(res)
      // }
    },
    handleClick() {
      console.log(this.activeName)
      this.seachValue.status = this.activeName
      if (this.activeName === '0') this.seachValue.status = ''
      this.init()
    },
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
.rimbu-container {
  padding-bottom: 50px;
 .three {
   margin-bottom: 10px;
   .three-item {
     min-height: 100px;
     background: #f0f3f6;
     display: flex;
     flex-direction: column;
     justify-content: center;
     padding: 0 20px;
     .top {
       margin-bottom: 10px;
       color: #666;
     }
   }
 }
}
</style>
