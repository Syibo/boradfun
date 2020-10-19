<template>
  <div class="container workbench-container">
    <el-tabs v-model="activeName" v-permission="[6, 10]" @tab-click="handleClick">
      <el-tab-pane :label="`代办 · ${total}`" name="first" />
      <el-tab-pane :label="`已完成 · ${totalDone}`" name="second" />
    </el-tabs>
    <div class="workbench-main">
      <div v-permission="[6, 10]" class="workbench-con">
        <div v-for="work in workData" :key="work.ID" class="item">
          <div class="left">
            <el-button type="text" @click="goDetail(work.definition.workflow_entity)">{{ retWorkflowEntity(work.definition.workflow_entity) }}</el-button>
            <el-popover
              placement="top-start"
              width="200"
              trigger="click"
              @show="show(work)"
            >
              <div style="height: auto">
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
              <WorkStatus slot="reference" :status="work.Status" />
            </el-popover>
          </div>
          <div class="right">
            <span>创建人：{{ work.nodes[0].user.name }}</span>
            <span>创建时间：{{ parseTime(work.CreatedAt) }}</span>
          </div>
        </div>
      </div>

      <div class="workbench-con workbench-over">
        <div class="title">
          我申请的流程 ({{ totalMyrep }}）
        </div>
        <div v-for="work in myreqData" :key="work.ID" class="item">
          <div class="left">
            <el-button type="text" @click="goDetail(work.definition.workflow_entity)">{{ retWorkflowEntity(work.definition.workflow_entity) }}</el-button>
            <el-popover
              placement="top-start"
              width="200"
              trigger="click"
              @show="show(work)"
            >
              <div style="height: auto">
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
              <WorkStatus slot="reference" :status="work.Status" />
            </el-popover>
          </div>
          <div class="right">
            <!-- <span>创建人：{{ work.nodes[0].user.name }}</span> -->
            <span>创建时间：{{ parseTime(work.CreatedAt) }}</span>
          </div>
        </div>
      </div>

      <div v-permission="[6]" class="workbench-con">
        <div class="title">
          待续签员工 ({{ totalContinue }}）
        </div>
        <div v-for="work in continueData" :key="work.ID" class="item">
          <div class="left">
            <el-button type="text">{{ retWorkflowEntity(work.definition.workflow_entity) }}</el-button>
          </div>
          <div class="right">
            <span>创建人：{{ work.nodes[0].user.name }}</span>
            <span>创建时间：{{ parseTime(work.CreatedAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBenchmMapprove, getBenchMyreq, getContinueList } from '@/api/employee'
import { retWorkflowLabel, retWorkflowIcon, getaActive, retWorkflowEntity, parseTime, goDetail } from '@/utils/common'
import WorkStatus from '@/components/common/WorkStatus'
import permission from '@/directive/permission/index.js'
export default {
  components: {
    WorkStatus
  },
  directives: { permission },
  data() {
    return {
      activeName: 'first',
      workData: [],
      myreqData: [],
      continueData: [],
      total: 0,
      totalDone: 0,
      totalContinue: 0,
      totalMyrep: 0,
      workflow: [],
      active: 0,
      todo: {
        pagesize: 100,
        pagenum: 1,
        type: 'todo'
      },
      done: {
        pagesize: 100,
        pagenum: 1,
        type: 'done'
      },
      myreq: {
        pagesize: 100,
        pagenum: 1,
        type: 'todo'
      },
      continue: {
        pagesize: 100,
        pagenum: 1
      }
    }
  },
  mounted() {
    this.init()
    this.initDoneTotal()
    this.getBenchMyreq()
    this.getContinueList()
  },
  methods: {
    retWorkflowEntity,
    getaActive,
    retWorkflowLabel,
    retWorkflowIcon,
    parseTime,
    goDetail,
    async init() {
      const res = await getBenchmMapprove(this.todo)
      if (res.ret === 0) {
        this.workData = res.data.list
        this.total = res.data.total
      } else {
        this.workData = []
        this.total = 0
      }
    },
    async initDone() {
      const res = await getBenchmMapprove(this.done)
      if (res.ret === 0) {
        this.workData = res.data.list
        this.totalDone = res.data.total
      } else {
        this.workData = []
        this.totalDone = 0
      }
    },
    async initDoneTotal() {
      const res = await getBenchmMapprove(this.done)
      if (res.ret === 0) {
        this.totalDone = res.data.total
      } else {
        this.totalDone = 0
      }
    },
    async getBenchMyreq() {
      const res = await getBenchMyreq(this.myreq)
      if (res.ret === 0) {
        this.myreqData = res.data.list
        this.totalMyrep = res.data.total
      } else {
        this.myreqData = []
        this.totalMyrep = 0
      }
    },
    async getContinueList() {
      const res = await getContinueList(this.continue)
      if (res.ret === 0) {
        this.continueData = res.data.list
        this.totalContinue = res.data.total
      } else {
        this.continueData = []
        this.totalContinue = 0
      }
    },
    async show(row) {
      this.active = this.getaActive(row.nodes)
      this.workflow = row.nodes
    },
    handleClick() {
      if (this.activeName === 'first') {
        this.init()
      } else {
        this.initDone()
      }
    }
  }
}
</script>

<style lang="scss">
.workbench-container {
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
.workbench-container {
  .workbench-main {
    background-color: white;
    .workbench-over {
      max-height: 328px;
      overflow-y: auto;
    }
    .workbench-over::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
      background-color:#f8f8f8;
    }
    .workbench-over::-webkit-scrollbar {//滚动条的宽度
      width:9px;
      height:9px;
    }
    .workbench-over::-webkit-scrollbar-thumb {//滚动条的设置
      background-color:#dddddd;
      background-clip:padding-box;
      min-height:28px;
    }
    .workbench-over::-webkit-scrollbar-thumb:hover {
      background-color:#bbb;
    }
    .workbench-con {
      background-color: #F7F8FA;
      padding: 12px;
      margin-bottom: 20px;
      .title {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        height: 30px;
        line-height: 30px;
        margin-bottom: 12px;
      }
      .item {
          display: flex;
          height: 55px;
          align-items: center;
          background-color: white;
          padding: 0 10px;
          border-bottom: 1px solid #D8D8D8;
          .left {
            flex: 1;
            display: flex;
            align-items: center;
            .status {
              width: 65px;
              height: 22px;
              background: rgba(147, 164, 173, 0.15);
              border-radius: 3px;
              text-align: center;
              line-height: 22px;
              color: #808387;
              font-size: 12px;
              margin-left: 65px;
            }
          }
          .right {
            color: #202D40;
            font-size: 14px;
            span {
              margin-right: 30px;
            }
            span:last-child {
              margin-right: 0;
            }
          }
      }
      .item:last-child {
        border: none;
      }
    }
  }
}
</style>
