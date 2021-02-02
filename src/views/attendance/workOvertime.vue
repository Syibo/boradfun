<template>
  <div class="container workOvertime-container">
    <el-tabs v-model="activeName" v-permission="[1, 6, 9, 10]" @tab-click="handleClick">
      <el-tab-pane v-if="roles.indexOf(6)!=-1" label="加班记录" name="first" />
      <el-tab-pane label="我的申请" name="second" />
      <el-tab-pane label="待我审核" name="third" />
    </el-tabs>
    <el-row class="table-top">
      <div class="left">
        <el-input v-model="seachValue.name" placeholder="请输入申请人姓名" @input="changeSeach" />
        <el-select v-model="seachValue.type" placeholder="加班类型" style="width: 100%;margin-left: 10px" clearable @change="changeSeach">
          <el-option v-for="item in TYPEVALUE" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="seachValue.status" placeholder="状态" style="width: 100%;margin-left: 10px" clearable @change="changeSeach">
          <el-option v-for="item in WORKSTATUSVALUE" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="right">
        <el-button type="primary" @click="overtime">申请加班</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column align="center" label="申请人">
        <template slot-scope="scope">
          <span class="bule-hover" @click="openDra(scope.row)"> {{ scope.row.e_name }} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="加班类型">
        <template slot-scope="sope">
          {{ retType(sope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column prop="start_time" align="center" label="开始时间" />
      <el-table-column prop="duration" align="center" label="加班时长" />
      <el-table-column v-permission="[6, 7, 8, 9, 10]" prop="real_duration" align="center" label="实际加班时长" />
      <el-table-column prop="req_time" align="center" label="申请时间" />
      <el-table-column align="center" label="申请状态">
        <template slot-scope="sope">
          <!-- {{ retStatus(sope.row.status) }} -->
          <AttStatus :status="sope.row.status" />
        </template>
      </el-table-column>
      <el-table-column prop="name" align="center" label="流程信息">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
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
      <el-table-column v-if="activeName === 'third'" align="center" label="操作">
        <template slot-scope="sope">
          <el-button type="text" :disabled="sope.row.status === 'Approved' || sope.row.status === 'Rejected'" @click="openCheck(sope.row)">编辑</el-button>
          <el-button v-permission="[6, 9]" type="text" @click="timeCheck(sope.row)">时长校验</el-button>
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

    <WorkFrom :visible="visible" @close="closeFun" @addSucc="addSucc" />
    <WorkDrawer :id="workDrawerId" ref="workDrawer" :time="new Date().getTime()" />
    <WorkApproval :id="WorkApprovalId" :visible="visibleApprova" :title="title" @close="closeFunApp" @addSucc="addSuccApp" />
  </div>
</template>

<script>
import { STATUSVALUE, TYPEVALUE, WORKSTATUSVALUE } from '@/utils/const'
import { retWorkflowLabel, retWorkflowIcon, getaActive } from '@/utils/common'
import { getWorkList, getOneOverTime } from '@/api/work'
import permission from '@/directive/permission/index.js'
import WorkFrom from '@/components/Oa/WorkFrom'
import AttStatus from '@/components/Oa/AttStatus'
import WorkDrawer from '@/components/Oa/WorkDrawer'
import WorkApproval from '@/components/Oa/WorkApproval'
import { mapGetters } from 'vuex'
export default {
  name: 'WorkOvertime',
  components: {
    WorkFrom,
    WorkDrawer,
    WorkApproval,
    AttStatus
  },
  directives: { permission },
  data() {
    return {
      STATUSVALUE,
      TYPEVALUE,
      WORKSTATUSVALUE,
      activeName: 'second',
      name: '',
      visible: false,
      visibleApprova: false,
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        name: '',
        type: '',
        status: '',
        myreq: true,
        mytodo: ''
      },
      total: 0,
      tableData: [],
      workflow: [],
      active: 0,
      workDrawerId: 0,
      WorkApprovalId: 0,
      userType: '',
      title: '申请加班'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const res = await getWorkList(this.seachValue)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    handleClick() {
      if (this.activeName === 'first') {
        this.reseveFrom()
        this.init()
      } else if (this.activeName === 'second') {
        this.seachValue = {
          pagenum: 1,
          pagesize: 10,
          name: '',
          type: '',
          status: '',
          myreq: true,
          mytodo: ''
        }
        this.init()
      } else if (this.activeName === 'third') {
        this.seachValue = {
          pagenum: 1,
          pagesize: 10,
          name: '',
          type: '',
          status: 'NA',
          myreq: '',
          mytodo: true
        }
        this.init()
      } else {
        this.reseveFrom()
        this.init()
      }
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
    async show(row) {
      const res = await getOneOverTime(row.ID)
      this.active = this.getaActive(res.data.work_flow.nodes)
      this.workflow = res.data.work_flow.nodes
      for (let i = 0; i < this.workflow.length; i++) {
        this.workflow[i].value = res.data.work_flow.elements[i].value
      }
    },
    async openDra(row) {
      this.workDrawerId = row.ID
      this.$refs.workDrawer.openDrawer()
    },
    openCheck(row) {
      this.title = '申请加班'
      this.visibleApprova = true
      this.WorkApprovalId = row.ID
    },
    timeCheck(row) {
      this.title = '时长校验'
      this.visibleApprova = true
      this.WorkApprovalId = row.ID
    },
    changeSeach() {
      this.init()
    },
    async overtime() {
      this.visible = true
    },
    addSucc() {
      this.visible = false
      this.init()
    },
    addSuccApp() {
      this.visibleApprova = false
      this.init()
    },
    closeFun() {
      this.visible = false
    },
    closeFunApp() {
      this.visibleApprova = false
    },
    retType(type) {
      let res = ''
      const ret = TYPEVALUE.find((item) => { return item.value === type })
      if (ret) {
        res = ret.label
      }
      return res
    },
    retStatus(type) {
      let res = ''
      const ret = WORKSTATUSVALUE.find((item) => { return item.value === type })
      if (ret) {
        res = ret.label
      }
      return res
    },
    reseveFrom() {
      this.seachValue = {
        pagenum: 1,
        pagesize: 10,
        name: '',
        type: '',
        status: '',
        myreq: '',
        mytodo: ''
      }
    },
    getaActive,
    retWorkflowLabel,
    retWorkflowIcon
  }
}
</script>

<style lang="scss" scoped>
.workOvertime-container {
  padding-bottom: 50px;
}
</style>
