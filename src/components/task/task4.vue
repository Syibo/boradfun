<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left"> 超级厉害娱乐信息公司 </div>
        <div class="task_name_btn">
          <el-button v-if="type === 'allot'" type="primary" @click="startTask"> 启动执行 </el-button>
          <div v-else>
            <el-button type="primary" style="margin-right: 10px" @click="completeTask"> 执行完成 </el-button>
            <el-dropdown>
              <span class="el-dropdown-link">
                更多操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>任务暂停</el-dropdown-item>
                <el-dropdown-item>需求变更</el-dropdown-item>
                <el-dropdown-item>任务取消</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

      <div class="task_type">
        <el-button v-if="type === 4" disabled>待执行</el-button>
        <el-button v-else style="color: #FFB959; border-color: #FFC069" disabled>执行中</el-button>
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

      <div class="task_label"> 指派信息 </div>
      <el-row class="task_info">
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务类型 </span>
          <span class="task_info_con"> {{ data.service.serviceName }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 处理人 </span>
          <span class="task_info_con"> {{ data.exeUserId }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务额度 </span>
          <span class="task_info_con"> {{ data.deliverAmount }} </span>
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

    <el-dialog title="执行信息确认" :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px" @close="close">
      <el-form ref="ruleForm" label-width="120px" label-position="left" :model="ruleForm" :rules="rules">
        <el-form-item label="任务执行时长" prop="serviceId">
          <el-input-number v-model="ruleForm.serviceId" :min="1" controls-position="right" />
        </el-form-item>
        <el-form-item label="执行批次" prop="serviceId">
          <el-input-number v-model="ruleForm.serviceId" :min="1" controls-position="right" />
        </el-form-item>
        <el-form-item label="执行台次" prop="serviceId">
          <el-input-number v-model="ruleForm.serviceId" :min="1" controls-position="right" />
        </el-form-item>
        <el-form-item label="外部延误时长" prop="serviceId">
          <el-input-number v-model="ruleForm.serviceId" :min="1" controls-position="right" />
        </el-form-item>
        <el-form-item label="整体任务说明" prop="serviceId">
          <el-input v-model="ruleForm.version" type="textarea" rows="5" maxlength="250" show-word-limit placeholder="整体任务说明" />
        </el-form-item>
        <el-checkbox-group v-model="ruleForm.checkList">
          <el-checkbox label="无执行难度" />
          <el-checkbox label="文件上传指定目录" />
          <el-checkbox label="小容量热度" />
          <el-checkbox label="GM指令操作" />
          <el-checkbox label="其他途径安装包" />
        </el-checkbox-group>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Task4',
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
    },
    type: {
      type: String,
      default: 'allot'
    }
  },
  data() {
    return {
      dialogVisible: false,
      options: [{
        value: '项目计划变更',
        label: '项目计划变更'
      }, {
        value: '不想做了',
        label: '不想做了'
      }],
      ruleForm: {
        serviceId: '',
        checkList: []
      },
      rules: {
        serviceId: [
          { required: true, message: '请选择服务', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    startTask() {
      this.$confirm('确认启动此任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$emit('startTask')
      }).catch(() => {})
    },
    completeTask() {
      this.dialogVisible = true
    },
    complete() {
      this.$emit('complete')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          console.log(form)
          this.complete()
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close() {
      this.ruleForm = {
        result: '',
        checkList: []
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
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>
