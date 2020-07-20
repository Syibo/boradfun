<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left"> 超级厉害娱乐信息公司 </div>
        <div class="task_name_btn">
          <el-button type="primary" @click="resources"> 资源指派 </el-button>
        </div>
      </div>

      <div class="task_type">
        <el-button style="color: #FFB959; border-color: #FFC069" disabled>需求冻结</el-button>
      </div>

      <div class="task_label"> 基本信息 </div>

      <el-row class="task_info">
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 应用/游戏名称 </span>
          <span class="task_info_con"> {{ data.appName }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 期望测试日期 </span>
          <span class="task_info_con"> {{ data.preDate }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务类型 </span>
          <span class="task_info_con"> {{ data.service.serviceName }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 期望结单日期 </span>
          <span class="task_info_con"> {{ data.expEndDate }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务额度 </span>
          <span class="task_info_con"> {{ data.realAmount }} </span>
        </el-col>
      </el-row>

      <div class="task_label"> 需求信息 </div>

      <div class="task_demand_detail">
        <div class="task_demand_item"> <span>本次测试版本</span> {{ data.taskDetail.version }} </div>
        <div class="task_demand_item"> <span>安装包内网地址</span> {{ data.taskDetail.pkgAddress }} </div>
        <div class="task_demand_item"> <span>测试环境类型</span> {{ data.taskDetail.testType }} </div>
        <div class="task_demand_item"> <span /> {{ data.taskDetail.testExtInfo }} </div>
        <div class="task_demand_item"> <span>白名单</span> {{ data.taskDetail.whiteList }} </div>
        <div class="task_demand_item"> <span>测试账号</span> {{ data.taskDetail.testAccountType }} </div>
        <div class="task_demand_item"> <span>测试账号数量</span> {{ data.taskDetail.accountNum }} </div>
        <div class="task_demand_item"> <span>手机号码/微信数量</span> {{ data.taskDetail.phoneNum }} </div>
        <div class="task_demand_item"> <span>系统并发限制</span> {{ data.taskDetail.concurrentNum }} </div>
        <div class="task_demand_item"> <span>机型需求</span> {{ data.taskDetail.reqPhone }} </div>
        <div class="task_demand_item"> <span>其他需求</span> {{ data.taskDetail.extReq }} </div>
        <div class="task_demand_item"> <span>文字用例内网地址</span> {{ data.taskDetail.instanceTxt }} </div>
        <div class="task_demand_item"> <span>视频用例内网地址</span> {{ data.taskDetail.instanceMv }} </div>
      </div>

    </div>
    <div class="task_right">
      <div class="task_label"> 基本信息 </div>
      <el-row class="task_info">
        <el-col :span="24" class="task_info_item">
          <span class="task_info_label"> 应用/游戏名称 </span>
          <span class="task_info_con"> 王者荣耀 </span>
        </el-col>
        <el-col :span="24" class="task_info_item">
          <span class="task_info_label"> 期望测试日期 </span>
          <span class="task_info_con"> 2020-02-03 </span>
        </el-col>
      </el-row>
      <div class="task_label"> 变更记录 </div>

      <div class="task_record">
        <span class="task_record_ra" />
        <div class="task_record_label">2020-06-25 20:20:20  </div>
        <div class="task_record_con">先旭创建任务</div>
      </div>
    </div>

    <el-dialog title="交付侧额度评估" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px" @close="close">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules">
        <el-form-item label="任务类型">
          <!-- <el-select v-model="ruleForm.serviceId" style="width: 100%" placeholder="请选择任务类型">
            <el-option
              v-for="item in service"
              :key="item.ID"
              :label="item.serviceName"
              :value="item.ID"
            />
          </el-select> -->
          {{ data.service.serviceName }}
        </el-form-item>

        <el-form-item label="任务额度">
          <el-input-number v-model="ruleForm.amount" :min="1" controls-position="right" />
        </el-form-item>

        <el-form-item label="处理人">
          <!-- <el-radio-group v-model="ruleForm.preAmount">
            <el-radio :label="3">TE1(0/1)</el-radio>
            <el-radio :label="6">TE2(1/1)</el-radio>
            <el-radio :label="9">TE3(1/1)</el-radio>
          </el-radio-group> -->
          <el-select v-model="ruleForm.exeUserId" style="width: 100%" placeholder="请选择处理人">
            <el-option
              v-for="item in userImpls"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserImpls } from '@/api/user'
import { assignTask } from '@/api/task'
export default {
  name: 'Task3',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    taskId: {
      type: Number,
      default: 0
    },
    service: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      taskFrom: 1,
      isEdit: false,
      dialogVisible: false,
      options: [{
        value: '项目计划变更',
        label: '项目计划变更'
      }, {
        value: '不想做了',
        label: '不想做了'
      }],
      ruleForm: {
        exeUserId: '',
        amount: ''
      },
      rules: {
        serviceId: [
          { required: true, message: '请选择服务', trigger: 'blur' }
        ]
      },
      userImpls: []
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'name'
    ])
  },
  mounted() {
    this.getUserImpls()
  },
  methods: {
    async getUserImpls() {
      const res = await getUserImpls({ leaderId: this.userId })
      if (res.ret === 0) {
        this.userImpls = res.data
      }
    },
    resources() {
      this.dialogVisible = true
    },
    async resourcesTask(form) {
      const res = await assignTask({ id: this.data.ID, data: form })
      if (res.ret === 0) {
        this.$emit('resourcesTask')
      }
      // this.$emit('resourcesTask')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          this.resourcesTask(form)
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close() {
      this.ruleForm = {
        result: ''
      }
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.task_demand_item {
  display: flex;
  color: #2B2B2B;
  font-size: 14px;
  height: 30px;
  align-items: center;
  span {
    width: 140px;
    color: #808387;
  }
}
</style>
