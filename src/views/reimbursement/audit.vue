<template>
  <div class="container audit-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all" />
      <el-tab-pane label="待办" name="0" />
      <el-tab-pane label="已办" name="1" />
    </el-tabs>
    <el-row class="table-top">
      <div class="left">
        <el-input v-model="seachValue.searchid" placeholder="编号" class="top-search" clearable @input="changeSeachValue" />
        <el-input v-model="seachValue.name" placeholder="全部申请人" class="top-search" clearable @input="changeSeachValue" />
        <el-select v-model="seachValue.status" placeholder="全部状态" class="top-search" clearable @change="changeSeachValue">
          <el-option v-for="item in REIMSVALUE" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-date-picker
          v-model="planDate"
          class="top-search"
          type="month"
          placeholder="提交日期"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM-dd"
          @change="changeDateFun"
        />
        <el-button type="primary" style="margin-left: 10px" @click="resert">重置</el-button>
      </div>
      <div class="right">
        <el-button v-permission="[8]" type="primary" @click="downUnPaidFun">导出待支付表格</el-button>
      </div>
    </el-row>

    <el-row v-permission="[8]" class="batch-top">
      批量操作 <el-button class="margin-l-10" type="primary" @click="batchPaid">批量支付</el-button>
    </el-row>

    <el-table ref="multipleTable" :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}" @selection-change="handleSelectionChange">
      <el-table-column v-if="roles[0] === 8" type="selection" width="55" :selectable="checkboxSelect" />
      <el-table-column align="center" label="申请编号">
        <template slot-scope="scope">
          <span class="bule-hover" @click="openDrawer(scope.row.ID)"> #{{ scope.row.ID }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="e_name" align="center" label="申请人" />
      <el-table-column prop="expense_summary" align="center" label="报销金额" />
      <el-table-column prop="CreatedAt" align="center" label="提交时间" sortable>
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
                >
                  <template slot="icon">
                    <i :class="retWorkflowIcon(item.status)" />
                  </template>
                  <template slot="description">
                    <span>{{ retWorkflowLabel(item.status) }}</span><br><span v-if="item.value">{{ item.value }}</span>
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
          <el-button type="text" :disabled="retDisable(scope.row.status)" @click="goDetail(scope.row.ID)">编辑</el-button>
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
import { getRemiList, getRemiDetail, downUnpaid, batchPaid } from '@/api/remi'
import { parseTime } from '@/utils/common'
import AttStatus from '@/components/Oa/AttStatus'
import { TableSelections } from '@/mixins/TableSelections'
import Moment from 'moment'
import { mapGetters } from 'vuex'
import { REIMSVALUE } from '@/utils/const'
export default {
  name: 'RimbursementAudit',
  directives: { permission },
  components: {
    RemiDrawer,
    AttStatus
  },
  mixins: [TableSelections],
  data() {
    return {
      REIMSVALUE,
      activeName: 'all',
      seachValue: {
        pagesize: 10,
        pagenum: 1,
        name: '',
        searchid: '',
        status: '',
        mytodo: true,
        myreq: false,
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
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  watch: {
    'seachValue.pagenum': {
      handler() {
        this.pageSelection = []
      },
      deep: true
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
        this.tableData = res.data.list.map((item) => {
          if (this.selectIds.includes(item.ID)) {
            item.CHECKED = true
          }
          return item
        })
        this.selectionAsDataSource()
      }
    },
    /**
     * 选择对应的row (供父组件调用)
     * @param {Number} index 要选中的行
     */
    selectionRow(index) {
      this.$refs.multipleTable.toggleRowSelection(this.tableData[index], true)
    },
    /**
     * 遍历dataSource 选中
     * 用于参数配置了 CHECKED 属性之后默认选中
     */
    selectionAsDataSource() {
      this.tableData.forEach((item, index) => {
        if (item['CHECKED']) {
          this.$nextTick(() => this.selectionRow(index))
        }
      })
    },
    async downUnPaidFun() {
      const ids = this.selectIds.join(',')
      const prams = JSON.parse(JSON.stringify(this.seachValue))
      prams.ids = ids
      const res = await downUnpaid(prams)
      const blob = new Blob([res])
      const fileName = `${Moment(new Date()).format('YYYY-MM-DD')}.xlsx`
      if ('download' in document.createElement('a')) {
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        window.URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
      } else {
        window.navigator.msSaveBlob(blob, fileName)
      }
    },
    async batchPaid() {
      const ids = this.selectIds.join(',')
      const prams = JSON.parse(JSON.stringify(this.seachValue))
      prams.ids = ids
      const res = await batchPaid(prams)
      if (res.ret === 0) {
        this.$message.success('操作成功')
        this.init()
        this.selectIds = []
      } else {
        this.$message.error('操作失败')
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
      for (let i = 0; i < this.workflow.length; i++) {
        this.workflow[i].value = res.data.work_flow.elements[i].value
      }
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
    },
    changeSeach() {
      this.init()
    },
    changeSeachValue() {
      this.seachValue.pagenum = 1
      this.init()
    },
    handleSelectionChange(val) {
      this.selection(val, 'ID')
    },
    changeDateFun() {
      if (this.planDate) {
        this.seachValue.application_date_begin = this.planDate
        const lastDay = new Date(this.planDate.substring(0, 4), this.planDate.substring(5, 7), 0).getDate()
        this.seachValue.application_date_end = `${this.planDate.substring(0, 4)}-${this.planDate.substring(5, 7)}-${lastDay}`
      } else {
        this.seachValue.application_date_begin = ''
        this.seachValue.application_date_end = ''
      }
      this.init()
    },
    checkboxSelect(row, rowIndex) {
      if (row.status === 'Unpaid') {
        return true // 禁用
      } else {
        return false // 不禁用
      }
    },
    retDisable(status) {
      let disabled = false
      if (status === 'Approved' || status === 'Rejected' || status === 'Paid') {
        disabled = true
      }
      /**
       * 项目负责人且状态是待支付 不能编辑
       */
      if (this.roles[0] === 10 && status === 'Unpaid') {
        disabled = true
      }
      return disabled
    },
    resert() {
      this.seachValue = {
        pagesize: 10,
        pagenum: 1,
        name: '',
        searchid: '',
        status: '',
        mytodo: true,
        myreq: false,
        todostatus: '',
        application_date_begin: '',
        application_date_end: ''
      }
      this.planDate = ''
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.audit-container {
  padding-bottom: 50px;
  .batch-top {
    display: flex;
    align-items: center;
    height: 40px;
    margin-bottom: 10px;
  }
}
</style>
