<template>
  <el-drawer
    :visible="visible"
    :show-close="false"
    :before-close="handleClose"
    custom-class="my-work-detail"
  >
    <template #title>
      <div class="drawer-title">
        <span>设备领用申请</span>
        <div class="actions">
          <i class="el-icon-close" @click="closeDrawer" />
        </div>
      </div>
    </template>
    <div class="content">
      <div class="name">
        #{{ device.device_name }}
      </div>
      <div class="steps">
        <div class="top">
          流程信息
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
      <div class="base-cla">
        <el-row class="margin-b-10"><span>申请人</span>{{ employee.name || '' }}</el-row>
        <el-row class="margin-b-10"><span>所在部门</span>{{ employee.department.department_name || '' }}</el-row>
        <el-row class="margin-b-10">
          <span>领用设备</span>{{ device.device_name || '' }}
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="hover"
          >
            <el-row>
              <el-row class="margin-b-10">
                <el-col :span="12">设备类型</el-col> <el-col :span="12">{{ device.device_category }}</el-col>
              </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">资产编号</el-col> <el-col :span="12">{{ device.device_code }}</el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">设备名称</el-col> <el-col :span="12">{{ device.device_name }}</el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">CPU</el-col> <el-col :span="12">{{ device.cpu }}</el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">运存</el-col> <el-col :span="12">{{ device.mem }}</el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">显卡</el-col> <el-col :span="12">{{ }}</el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">储存容量</el-col> <el-col :span="12">{{ device.volume }}</el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">状态</el-col> <el-col :span="12"> <ProStatus :status="device.device_status" /></el-col> </el-row>
              <el-row class="margin-b-10"> <el-col :span="12">序列号</el-col> <el-col :span="12">{{ device.mac_address_1 }}</el-col> </el-row>
            </el-row>
            <i slot="reference" class="el-icon-warning" style="color: #999" />
          </el-popover>
        </el-row>
        <el-row><span>已领用设备</span>{{ collect_devices || '' }}</el-row>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import Label from '@/components/common/Label.vue'
import { retWorkflowLabel, retWorkflowIcon, getaActive } from '@/utils/common'
import { deviceApprovalDetail, deviceApplyInfo } from '@/api/property'
import ProStatus from '@/components/Property/ProStatus'
import { mapGetters } from 'vuex'
export default {
  name: 'PropertyDrawer',
  components: {
    Label,
    ProStatus
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
      employee: {
        department: {}
      },
      device: {},
      collect_devices: ''
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
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
      if (!this.id) {
        return false
      }
      const res = await deviceApprovalDetail(this.id)
      if (res.ret === 0) {
        this.active = this.getaActive(res.data.work_flow.nodes)
        this.workflow = res.data.work_flow.nodes
        this.device = res.data.info.device
        for (let i = 0; i < this.workflow.length; i++) {
          this.workflow[i].value = res.data.work_flow.elements[i].value
        }
      } else {
        this.active = 0
        this.device = {}
        this.workflow = []
      }
      const res3 = await deviceApplyInfo({ employee_id: this.userId, device_id: this.id })
      if (res3.ret === 0) {
        this.employee = res3.data.employee
        this.collect_devices = res3.data.collect_devices
      } else {
        this.employee = {}
        this.collect_devices = ''
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
.base-cla {
  padding: 5px;
  padding-left: 15px;
  color: #606266;
  font-size: 14px;
  span {
    display: inline-block;
    width: 100px;
  }
}
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
    }
}
</style>
