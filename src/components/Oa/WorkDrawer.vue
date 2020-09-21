<template>
  <el-drawer
    :visible="visible"
    :show-close="false"
    :before-close="handleClose"
    custom-class="my-work-detail"
  >
    <template #title>
      <div class="drawer-title">
        <span>申请加班</span>
        <div class="actions">
          <i class="el-icon-close" @click="closeDrawer" />
        </div>
      </div>
    </template>
    <div class="content">
      <div class="name">
        {{ info.e_name }}
      </div>
      <div class="steps">
        <div class="top">
          审批流程
        </div>
        <el-steps :active="active" finish-status="success" style="padding: 0 10px">
          <el-step
            v-for="item in workflow"
            :key="item.ID"
            :title="item.user ? item.user.name : ''"
            icon="el-icon-time"
            :description="item.status === 'Completed' ? '已提交' : item.status === 'Processing' ? '正在处理' : '未处理'"
          />
        </el-steps>
      </div>
      <Label title="申请信息" />
      <div class="item" style="margin-top: 15px">
        <span>加班项目：</span> {{ info.project }}
      </div>
      <div class="item">
        <span>加班类型：</span> {{ info.type }}
      </div>
      <div class="item">
        <span>加班日期：</span> {{ info.overtime_date }}
      </div>
      <div class="item">
        <span>加班工时：</span> {{ info.duration }}
      </div>
      <div class="item">
        <span>加班事由：</span> {{ info.cause }}
      </div>
    </div>
  </el-drawer>
</template>

<script>
import Label from '@/components/common/Label.vue'
import { getOneOverTime } from '@/api/work'
export default {
  name: 'WorkDrawer',
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
      workflow: ''
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
    getaActive(notes) {
      let active = 0
      var na = notes.map((item) => item.status)
      const countOccurences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)
      active = countOccurences(na, 'Completed')
      return active
    },
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
