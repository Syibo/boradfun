<template>
  <el-drawer
    :visible="visible"
    :show-close="false"
    :before-close="handleClose"
    custom-class="my-task-detail"
  >
    <template #title>
      <div class="drawer-title">
        <span>员工详细信息</span>
        <div class="actions">
          <i class="el-icon-close" @click="closeDrawer" />
        </div>
      </div>
    </template>
    <div class="archives-detail">
      <div class="left">
        <div
          v-for="item in label"
          :key="item.href"
          class="item"
          @click="changeAct(item.href)"
        >
          {{ item.label }}
          <span :class="item.href === active ? 'act' : 'nol'" /></div>
      </div>
      <div class="right">
        <Label id="baseInfo" title="基本信息" />
        <el-row class="item" style="margin-bottom: 40px">
          <el-col class="item-main" :span="12"> <span class="left-label"> 状态 </span> {{ baseData.status }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 实际入职时间 </span> {{ baseData.mobile }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 手机号码 </span> {{ baseData.entry_date }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 身份证号 </span> {{ baseData.id_card }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 员工编号 </span> {{ baseData.ID }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 民族 </span> {{ baseData.nation }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 出生年月 </span> {{ baseData.employee_basic.birthday }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 年龄 </span> {{ baseData.age }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 私人邮箱 </span> {{ baseData.personal_email }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 政治面貌 </span> {{ baseData.politic_status }} </el-col>
        </el-row>
        <Label id="interviewiInfo" title="面试信息" />
        <el-row class="item" style="margin-bottom: 40px">
          <el-col class="item-main" :span="24"> <span class="left-label"> 面试评价 </span> {{ baseData.interview_comment }} </el-col>
          <el-col class="item-main" :span="24"> <span class="left-label"> 履历 </span> <el-button icon="el-icon-upload" type="text">{{ baseData.resume }}</el-button></el-col>
        </el-row>
        <Label id="jobsInfo" title="岗位信息" />
        <el-row class="item" style="margin-bottom: 40px">
          <el-col class="item-main" :span="12"> <span class="left-label"> 所属部门 </span> {{ baseData.department_id }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 部门负责人 </span> {{ baseData.department.department_name }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 岗位 </span> {{ baseData.position }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 服务线 </span> {{ baseData.service_line }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 级别 </span> {{ baseData.level_id }} </el-col>
        </el-row>
        <Label id="schoolInfo" title="学历信息" />
        <el-row class="item" style="margin-bottom: 40px">
          <el-col class="item-main" :span="12"> <span class="left-label"> 毕业院校 </span> {{ baseData.employee_basic.graduation_school }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 专业 </span> {{ baseData.employee_basic.major }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 学历 </span> {{ baseData.employee_basic.degree }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 性质 </span> {{ baseData.employee_basic.degree_property }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 学历验证 </span> {{ baseData.employee_basic.degree_verification }} </el-col>
        </el-row>
        <Label id="certificate" title="资格证书" />
        <el-row class="item" style="margin-bottom: 40px">
          <el-col class="item-main" :span="12"> <span class="left-label"> 英语技能 </span> {{ baseData.employee_basic.en_skill }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 其他技能 </span> {{ baseData.employee_basic.other_language_skill }} </el-col>
        </el-row>
        <Label id="familyInfo" title="家庭信息" />
        <el-row class="item" style="margin-bottom: 40px">
          <el-col class="item-main" :span="12"> <span class="left-label"> 籍贯 </span> {{ baseData.employee_basic.birthplace }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 居住城市 </span> {{ baseData.employee_basic.inhabited_city }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 居住地址 </span> {{ baseData.employee_basic.inhabited_address }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 婚姻状况 </span> {{ baseData.employee_basic.marriage }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 家庭及亲属情况 </span> </el-col>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-table :data="baseData.employee_basic.relations" style="width: 100%;margin: 10px 0" :header-cell-style="{background:'#F7F8FA'}">
                <el-table-column prop="name" align="center" label="姓名" />
                <el-table-column prop="Relation" align="center" label="与您的关系" />
                <el-table-column prop="company" align="center" label="任职企业" />
                <el-table-column prop="job" align="center" label="职位" />
                <el-table-column prop="phone" align="center" label="联系方式" />
              </el-table>
            </el-col>
          </el-row>
          <el-col class="item-main" :span="12"> <span class="left-label"> 紧急联系人 </span> </el-col>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-table :data="baseData.employee_basic.contacts" style="width: 100%;margin: 10px 0" :header-cell-style="{background:'#F7F8FA'}">
                <el-table-column prop="name" align="center" label="姓名" />
                <el-table-column prop="Relation" align="center" label="与您的关系" />
                <el-table-column prop="phone" align="center" label="联系方式" />
              </el-table>
            </el-col>
          </el-row>
        </el-row>
        <Label id="cardInfo" title="卡号信息" />
        <el-row class="item" style="margin-bottom: 40px">
          <el-col class="item-main" :span="12"> <span class="left-label"> 工商银行卡卡号 </span> {{ baseData.employee_basic.debit_card1 }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 招商银行卡卡号 </span> {{ baseData.employee_basic.debit_card2 }} </el-col>
        </el-row>
        <Label id="accountInfo" title="账号信息" />
        <el-row class="item" style="margin-bottom: 40px">
          <el-col class="item-main" :span="12"> <span class="left-label"> 企业邮箱 </span> {{ baseData.email }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> 企业微信 </span> {{ baseData.wx_work }} </el-col>
          <el-col class="item-main" :span="12"> <span class="left-label"> TAPD </span> {{ baseData.tapd }} </el-col>
        </el-row>
        <Label id="contractInfo" title="合同信息" />
        <el-table :data="conData" style="width: 100%;margin: 20px 0" :header-cell-style="{background:'#F7F8FA'}">
          <el-table-column prop="contract_type" align="center" label="合同编号/名称" />
          <el-table-column prop="contract_start_date" align="center" label="合同开始时间" />
          <el-table-column prop="contract_end_date" align="center" label="合同到期时间" />
          <el-table-column prop="contract_party" align="center" label="签约方" />
          <el-table-column prop="contract_main" align="center" label="签订主体" />
          <el-table-column prop="status" align="center" label="签订状态" />
        </el-table>
        <Label id="documentInfo" title="文档信息" />
        <el-row class="item" style="margin-bottom: 40px">
          <el-col class="item-main" :span="24"> <span class="left-label"> 身份证复印件 </span></el-col>
          <el-col class="item-main" :span="12"> {{ baseData.employee_basic.id_card_front }} </el-col>
          <el-col class="item-main" :span="12"> {{ baseData.employee_basic.id_card_back }} </el-col>
          <el-col class="item-main" :span="24"> <span class="left-label"> 学历证书复印件 </span></el-col>
          <el-col class="item-main" :span="12"> {{ baseData.employee_basic.id_card_back }} </el-col>
        </el-row>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import Label from '@/components/common/Label.vue'
// import EmStatus from '@/components/common/EmStatus.vue'
export default {
  name: 'ArchivesDrawer',
  components: {
    Label
    // EmStatus
  },
  props: {
    baseData: {
      type: Object,
      default: () => {}
    },
    conData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      label: [
        { label: '基本信息', href: 'baseInfo' },
        { label: '面试信息', href: 'interviewiInfo' },
        { label: '岗位信息', href: 'jobsInfo' },
        { label: '学历信息', href: 'schoolInfo' },
        { label: '资格证书', href: 'certificate' },
        { label: '家庭信息', href: 'familyInfo' },
        { label: '卡号信息', href: 'cardInfo' },
        { label: '账号信息', href: 'accountInfo' },
        { label: '合同信息', href: 'contractInfo' },
        { label: '文档信息', href: 'documentInfo' }
      ],
      active: 'baseInfo'
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
    },
    changeAct(href) {
      this.active = href
      const anchor = this.$el.querySelector(`#${href}`)
      const total = anchor.offsetTop
      const right = document.getElementsByClassName('archives-detail')[0].getElementsByClassName('right')[0]
      let documentTotal = right.scrollTop
      let timer = null
      timer = setInterval(function() {
        if (documentTotal < total) {
          documentTotal += 10
          setScrollTop(documentTotal)
          if (Math.abs(documentTotal - total) < 10) {
            clearInterval(timer)
          }
        }
        if (documentTotal > total) {
          documentTotal -= 10
          setScrollTop(documentTotal)
          if (Math.abs(documentTotal - total) < 10) {
            clearInterval(timer)
          }
        }
      }, 5)
      function setScrollTop(total) {
        right.scrollTop = total - 68
      }
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
  .archives-detail {
    max-height: 900px;
    display: flex;
    .left {
      width: 80px;
      border-right: 1px solid #F0F1F2;
      display: flex;
      flex-direction: column;
      .item {
        position: relative;
        line-height: 30px;
        cursor: pointer;
        .nol {
          width: 10px;
          height: 10px;
          background: #E8E9EA;
          position: absolute;
          border-radius: 10px;
          right: -5px;
          top: 10px;
        }
        .act {
          width: 10px;
          height: 10px;
          background: #3293FF;
          position: absolute;
          border-radius: 10px;
          right: -5px;
          top: 10px;
        }
      }
    }
    .right {
      flex: 1;
      padding: 0 20px;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 900px;
      .test-hei {
        height: 400px;
        width: 100%;
      }
      .item {
        color: #2B2B2B;
        font-size: 14px;
        font-weight: 400;
        .item-main {
          height: 30px;
          line-height: 30px;
          .left-label {
            color: #999999;
            font-size: 14px;
            display: inline-block;
            width: 100px;
          }
        }
      }
    }
    .right::-webkit-scrollbar-track-piece {
      background-color:#f8f8f8;
    }
    .right::-webkit-scrollbar {
      width:9px;
      height:9px;
    }
    .right::-webkit-scrollbar-thumb {
      background-color:#dddddd;
      background-clip:padding-box;
      min-height:28px;
    }
    .right::-webkit-scrollbar-thumb:hover {
      background-color:#bbb;
    }
  }
}
</style>
