<template>
  <div class="container audit-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all" />
      <el-tab-pane label="待办" name="0" />
      <el-tab-pane label="已办" name="1" />
    </el-tabs>
    <el-row class="table-top">
      <div class="left">
        <el-input v-model="planDate" placeholder="编号" />
        <el-date-picker
          v-model="planDate"
          style="width: 200px;margin-left: 10px"
          type="month"
          placeholder="选择日期"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM-dd"
        />
      </div>
      <el-button type="primary" style="margin-left: 10px">重置</el-button>
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
      <el-table-column align="center" label="申请状态">
        <template slot-scope="scope">
          <AttStatus :status="scope.row.status" />
        </template>
      </el-table-column>
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
      <el-table-column prop="name" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" :disabled="!scope.row.status === 'NA'" @click="goDetail(scope.row.ID)">编辑</el-button>
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
import { retWorkflowLabel, retWorkflowIcon, getaActive } from '@/utils/common'
import { getRemiList, getRemiDetail } from '@/api/remi'
import { parseTime } from '@/utils/common'
import AttStatus from '@/components/Oa/AttStatus'
export default {
  name: 'RimbursementAudit',
  directives: { permission },
  components: {
    RemiDrawer,
    AttStatus
  },
  data() {
    return {
      activeName: 'all',
      seachValue: {
        pagesize: 10,
        pagenum: 1,
        searchid: '',
        status: '',
        mytodo: true,
        todostatus: '',
        application_date_begin: '',
        application_date_end: ''
      },
      remiDrawerId: 0,
      workflow: [],
      total: 0,
      active: 0,
      planDate: '',
      tableData: []
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
    getaActive,
    parseTime,
    async show(row) {
      const res = await getRemiDetail(row.ID)
      this.active = this.getaActive(res.data.work_flow.nodes)
      this.workflow = res.data.work_flow.nodes
    },
    async openDrawer(id) {
      this.remiDrawerId = id
      this.$refs.remiDrawer.openDrawer()
    },
    goDetail(id) {
      this.$router.push({
        path: 'remiDetail',
        query: {
          id
        }
      })
    },
    handleClick() {
      this.seachValue.todostatus = this.activeName
      if (this.activeName === 'all') this.seachValue.todostatus = ''
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
.audit-container {
  padding-bottom: 50px;
}
</style>
