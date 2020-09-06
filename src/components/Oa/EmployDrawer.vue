<template>
  <el-drawer
    :visible="visible"
    :show-close="false"
    :before-close="handleClose"
    custom-class="my-task-detail"
  >
    <template #title>
      <div class="drawer-title">
        <span>入职申请</span>
        <div class="actions">
          <i class="el-icon-close" @click="closeDrawer" />
        </div>
      </div>
    </template>
    <div class="content">
      <div class="name"> {{ baseData.name }} <i class="el-icon-male" /> </div>
      <div class="status"> {{ baseData.status }} </div>
      <div class="steps">
        <div class="top">
          入职流程
        </div>
        <el-steps :active="2" finish-status="success">
          <el-step title="shiwen 提交" icon="el-icon-time" description="" />
          <el-step title="qianqianniu 提交" icon="el-icon-time" description="" />
          <el-step title="louyikai 待提交" icon="el-icon-time" description="" />
        </el-steps>
      </div>
      <Label title="基本信息" />
      <el-row class="item" style="margin-bottom: 40px">
        <el-col :span="12"> 身份证号码：{{ baseData.id_card }} </el-col>
        <el-col :span="12"> 手机号码：{{ baseData.mobile }} </el-col>
      </el-row>
      <Label title="面试" />
      <el-row class="item" style="margin-bottom: 40px">
        {{ baseData.interview_comment }}
      </el-row>
      <Label title="岗位信息" />
      <el-row class="item">
        <el-col :span="8"> 所属部门：{{ baseData.department.department_name }} </el-col>
        <el-col :span="8"> 部门负责人：{{ baseData.department.leader.name }} </el-col>
        <el-col :span="8"> 服务线：{{ baseData.service_line }} </el-col>
      </el-row>
      <el-row class="item" style="margin-bottom: 40px">
        <el-col :span="8"> 岗位：{{ baseData.position }} </el-col>
        <el-col :span="8"> 级别：{{ baseData.level.level_name }} </el-col>
        <el-col :span="8"> 座位号：{{ baseData.seat_number }} </el-col>
      </el-row>
      <Label title="账号信息" />
      <el-row class="item">
        <el-col :span="12"> 企业邮箱：{{ baseData.email }} </el-col>
        <el-col :span="12"> 企业微信：{{ baseData.wx_work }} </el-col>
      </el-row>
      <el-row class="item" style="margin-bottom: 40px">
        <el-col :span="12"> 座位号：{{ baseData.seat_number }} </el-col>
      </el-row>
      <Label title="流程信息" />
      <el-row class="item">
        <el-col :span="12"> 计划入职日期：{{ baseData.entry_date }} </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="12"> 设备需求：{{ baseData.device_req }} </el-col>
      </el-row>
    </div>
  </el-drawer>
</template>

<script>
import Label from '@/components/common/Label.vue'
export default {
  name: 'EmployDrawer',
  components: {
    Label
  },
  props: {
    baseData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    closeDrawer() {
      this.visible = false
    },
    handleClose() {
      this.visible = false
    },
    openDrawer() {
      this.visible = true
    }
  }
}
</script>

<style lang="scss">
.my-task-detail {
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
.my-task-detail {
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
        font-weight: 500;
        font-size: 18px;
        .el-icon-male {
          color: #F58989;
        }
      }
      .status {
        width: 57px;
        height: 22px;
        background: rgba(147, 164, 173, 0.15);
        border-radius: 3px;
        line-height: 22px;
        font-size: 12px;
        text-align: center;
        color: #808387;
        margin: 15px 0;
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
        color: #2B2B2B;
        font-size: 14px;
        margin: 10px 0;
      }
    }
}
</style>
