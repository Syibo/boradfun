<template>
  <div class="container workbench-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="`代办 · ${total}`" name="first" />
      <el-tab-pane :label="`已完成 · ${totalDone}`" name="second" />
    </el-tabs>
    <div class="workbench-main">
      <div class="workbench-con">
        <div v-for="work in workData" :key="work.ID" class="item">
          <div class="left">
            <el-button type="text">{{ retWorkflowEntity(work.definition.workflow_entity) }}</el-button>
            <!-- <WorkStatus :status="work.definition.workflow_type" /> -->
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
              <WorkStatus slot="reference" :status="work.definition.workflow_type" />
            </el-popover>
          </div>
          <div class="right">
            <span>创建人：{{ '-' }}</span>
            <span>创建时间：{{ parseTime(work.CreatedAt) }}</span>
          </div>
        </div>
      </div>

      <div class="workbench-con">
        <div class="title">
          我申请的流程 ({{ totalMyrep }}）
        </div>
        <div v-for="work in myreqData" :key="work.ID" class="item">
          <div class="left">
            <el-button type="text">{{ retWorkflowEntity(work.definition.workflow_entity) }}</el-button>
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
              <WorkStatus slot="reference" :status="work.definition.workflow_type" />
            </el-popover>
          </div>
          <div class="right">
            <span>创建人：{{ '-' }}</span>
            <span>创建时间：{{ parseTime(work.CreatedAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBenchmMapprove, getBenchMyreq } from '@/api/employee'
import { retWorkflowLabel, retWorkflowIcon, getaActive, retWorkflowEntity, parseTime } from '@/utils/common'
import WorkStatus from '@/components/common/WorkStatus'
export default {
  components: {
    WorkStatus
  },
  data() {
    return {
      activeName: 'first',
      workData: [],
      myreqData: [],
      total: 0,
      totalDone: 0,
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
      }
    }
  },
  mounted() {
    this.init()
    this.getBenchMyreq()
  },
  methods: {
    retWorkflowEntity,
    getaActive,
    retWorkflowLabel,
    retWorkflowIcon,
    parseTime,
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
    async show(row) {
      console.log(row)
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
