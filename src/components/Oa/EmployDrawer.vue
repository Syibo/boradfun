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
      <div class="name">员工1 <i class="el-icon-male" /> </div>
      <div class="status"> 拟入职 </div>
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
        <el-col :span="12"> 身份证号码：362330199512263656 </el-col>
        <el-col :span="12"> 手机号码：18720573255 </el-col>
      </el-row>
      <Label title="面试" />
      <el-row class="item" style="margin-bottom: 40px">
        这是一条面试评价
      </el-row>
      <Label title="岗位信息" />
      <el-row class="item">
        <el-col :span="8"> 所属部门：云测合研 </el-col>
        <el-col :span="8"> 部门负责人：qianqian </el-col>
        <el-col :span="8"> 服务线：wetest </el-col>
      </el-row>
      <el-row class="item" style="margin-bottom: 40px">
        <el-col :span="8"> 岗位：前端开发工程师 </el-col>
        <el-col :span="8"> 级别：中级 </el-col>
        <el-col :span="8"> 座位号：13 </el-col>
      </el-row>
      <Label title="账号信息" />
      <el-row class="item" style="margin-bottom: 40px">
        <el-col :span="8"> 企业邮箱：- </el-col>
        <el-col :span="8"> 企业微信：- </el-col>
        <el-col :span="8"> TAPD：- </el-col>
      </el-row>
      <Label title="流程信息" />
      <el-row class="item">
        <el-col :span="12"> 计划入职日期：2020-05-06 </el-col>
        <el-col :span="12"> 座位号：2020-05-06 </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="12"> 设备需求：2020-05-06 </el-col>
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
