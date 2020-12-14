<template>
  <el-drawer
    :visible="visible"
    :show-close="false"
    :before-close="handleClose"
    custom-class="my-work-detail"
  >
    <template #title>
      <div class="drawer-title">
        <span>报销申请</span>
        <div class="actions">
          <i class="el-icon-close" @click="closeDrawer" />
        </div>
      </div>
    </template>
    <div class="content">
      <Label title="#10010" />
      <div class="steps">
        <div class="top">
          审批流程
        </div>
        <el-steps style="padding: 0 10px" :active="active" finish-status="finish">
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
      <Label title="申请信息" />
      <el-row :gutter="20" class="three">
        <el-col :span="8">
          申请人: 员工1
        </el-col>
        <el-col :span="8">
          申请项目: 云测合研
        </el-col>
        <el-col :span="8">
          总计: 80
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
        <el-table-column align="center" label="申请人">
          <template slot-scope="scope">
            <span class="bule-hover" @click="openDrawer"> {{ scope.row.e_name }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="start_time" align="center" label="开始时间" />
        <el-table-column prop="duration" align="center" label="加班时长" />
        <el-table-column prop="req_time" align="center" label="申请时间" />
        <el-table-column prop="name" align="center" label="流程信息">
          <template>
            <el-button slot="reference" type="text">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-drawer>
</template>

<script>
import Label from '@/components/common/Label.vue'
import { retWorkflowLabel, retWorkflowIcon, getaActive } from '@/utils/common'
import { getOneOverTime } from '@/api/work'
export default {
  name: 'RemiDrawer',
  components: {
    Label
  },
  props: {
    time: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false,
      info: {},
      active: 0,
      workflow: '',
      tableData: [
        { e_name: '#67566' }
      ]
    }
  },
  watch: {
    time: {
      deep: true,
      handler(value) {
        this.init()
      }
    }
  },
  methods: {
    async init() {
      if (this.id !== 0) {
        const res = await getOneOverTime(this.id)
        this.active = this.getaActive(res.data.work_flow.nodes)
        this.info = res.data.info
        this.workflow = res.data.work_flow.nodes
      }
    },
    closeDrawer() {
      this.visible = false
    },
    handleClose() {
      this.visible = false
    },
    getaActive,
    retWorkflowLabel,
    retWorkflowIcon,
    openDrawer() {
      this.visible = true
    }
  }
}
</script>

<style lang="scss">
.my-work-detail {
  width: 700px!important;
    .el-drawer__header {
        padding: 0;
        margin-bottom: 20px;
    }
    .el-drawer__body {
        padding: 0 20px;
        overflow-y: auto;
    }
    .table-container {
        padding: 0;
    }
    .el-step__icon {
      background-color: #F7F9FA;
    }
}
</style>
<style lang="scss" scoped>
.my-work-detail {
    width: 700px!important;
    .drawer-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        height: 44px;
        border-bottom: 1px solid #F1F2F3;
        color: #5A5D5F;
        .icon-minus {
            display: inline-block;
            width: 1px;
            background-color: #afafaf;
            height: 12px;
            margin-right: 10px;
        }
        i {
            color: #999999;
            cursor: pointer;
        }
    }
    .content {
      .name {
        color: #5A5D5F;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 15px;
      }
      .steps {
        background-color: #F7F9FA;
        padding-bottom: 10px;
        margin-bottom: 10px;
        .top {
          height: 36px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #DADFE6;
          padding: 20px 0 20px 10px;
          font-size: 14px;
          color: #808387;
          margin-bottom: 10px;
        }
      }
      .three {
        padding-left: 5px;
        margin: 15px 0;
      }
      .item {
        margin: 10px 0;
        font-size: 14px;
        color: #333;
        span {
          display: inline-block;
          width: 80px;
        }
      }
    }
}
</style>
