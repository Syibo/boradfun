<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left"> {{ data.client.name }} </div>
        <div class="task_name_btn">
          <el-button v-permission="[1, 2, 3]" @click="cacelTask"> 取消任务 </el-button>
          <el-button v-permission="[4]" type="primary" @click="resources"> 资源指派 </el-button>
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
          <span class="task_info_label"> 期望交付时间 </span>
          <span class="task_info_con"> {{ data.expDeliverTime }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务类型 </span>
          <span class="task_info_con"> {{ data.realService.serviceName }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 期望结单时间 </span>
          <span class="task_info_con"> {{ data.expEndTime }} </span>
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
        <div class="task_demand_item"> <span /> <p>{{ data.taskDetail.testExtInfo }}</p> </div>
        <div class="task_demand_item"> <span>白名单</span> {{ data.taskDetail.whiteList }} </div>
        <div class="task_demand_item"> <span>测试账号</span> {{ data.taskDetail.testAccountType }} </div>
        <div v-if="data.taskDetail.testAccountType === '客户提供'" class="task_demand_item"> <span>账号文件内网地址</span> {{ data.taskDetail.accountAddress }} </div>
        <div v-if="data.taskDetail.testAccountType === '客户提供'" class="task_demand_item"> <span>测试账号数量</span> {{ data.taskDetail.accountNum }} </div>
        <div v-if="data.taskDetail.testAccountType === '微信注册' || data.taskDetail.testAccountType === '手机号码注册'" class="task_demand_item"> <span> {{ data.taskDetail.testAccountType === '微信注册' ? '微信数量' : '手机号码数量' }}</span> {{ data.taskDetail.phoneNum }} </div>
        <div class="task_demand_item"> <span>系统并发限制</span> {{ data.taskDetail.concurrentNum }} </div>
        <div class="task_demand_item"> <span>机型需求</span> {{ data.taskDetail.reqPhone }} </div>
        <div class="task_demand_item"> <span>其他需求</span> {{ data.taskDetail.extReq }} </div>
        <div class="task_demand_item"> <span>文字用例内网地址</span> <el-link :href="data.taskDetail.instanceTxt" target="_blank" type="primary">{{ data.taskDetail.instanceTxt }}</el-link> </div>
        <div class="task_demand_item"> <span>视频用例内网地址</span> <el-link :href="data.taskDetail.instanceMv" target="_blank" type="primary">{{ data.taskDetail.instanceMv }}</el-link> </div>
      </div>
    </div>

    <TaskLog :log="data.logs" :manage="data.manage" :sale-user="data.client.saleUser" />

    <el-dialog title="交付侧额度评估" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px" @close="close">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules">
        <el-form-item label="任务类型">
          <el-select v-model="ruleForm.serviceId" style="width: 100%" placeholder="请选择任务类型">
            <el-option
              v-for="item in service"
              :key="item.ID"
              :label="item.serviceName"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="任务额度" prop="amount">
          <el-input-number v-model="ruleForm.amount" :min="1" controls-position="right" />
        </el-form-item>

        <!-- <el-form-item label="处理人" prop="exeUserId">
          <el-select v-model="ruleForm.exeUserId" style="width: 100%" placeholder="请选择处理人" @change="change">
            <el-option
              v-for="item in userImpls"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="处理人" prop="exeUserId">
          <el-radio-group v-model="ruleForm.exeUserId" @change="change">
            <el-radio v-for="item in userImpls" :key="item.Id" :label="item.Id">{{ item.Name + '(' + item.ExeNum + '/' + item.AssignNum + ')' }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-for="item in list" :key="item.Id" class="list-clas">
          <div>{{ item.exp_deliver_time }}</div>
          <div>{{ item.app_name }} &nbsp; {{ item.service_name }} &nbsp; {{ item.name }} &nbsp; {{ item.real_amount }}额度</div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import { mapGetters } from 'vuex'
import { getUserImpls } from '@/api/user'
import TaskLog from '@/components/task/taskLog'
import { assignTask, getOneTask } from '@/api/task'
export default {
  name: 'Task3',
  directives: { permission },
  components: {
    TaskLog
  },
  props: {
    service: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      taskFrom: 1,
      taskId: 0,
      isEdit: false,
      dialogVisible: false,
      data: {
        client: {
          saleUser: {}
        },
        service: {},
        taskDetail: {},
        exeUser: {},
        realService: {},
        manage: {},
        logs: []
      },
      options: [{
        value: '项目计划变更',
        label: '项目计划变更'
      }, {
        value: '不想做了',
        label: '不想做了'
      }],
      ruleForm: {
        serviceId: '',
        exeUserId: '',
        amount: 1
      },
      rules: {
        amount: [
          { required: true, message: '请输入额度', trigger: 'blur' }
        ],
        exeUserId: [
          { required: true, message: '请选择处理人', trigger: 'change' }
        ]
      },
      userImpls: [],
      list: []
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'name'
    ])
  },
  mounted() {
    this.taskId = Number(this.$route.query.id)
    this.getUserImpls()
    this.getOneTask()
  },
  methods: {
    async getUserImpls() {
      const res = await getUserImpls({ leaderId: this.userId })
      if (res.ret === 0) {
        this.userImpls = res.data
      }
    },
    change(value) {
      const obj = this.userImpls.find((item) => {
        return item.Id === value
      })
      this.list = obj.List
    },
    async getOneTask() {
      const res = await getOneTask({ id: this.taskId })
      if (res.ret === 0) {
        this.data = JSON.parse(JSON.stringify(res.data))
        this.ruleForm.serviceId = this.data.realService.ID
      }
    },
    cacelTask() {
      this.$emit('cacelTask')
    },
    resources() {
      this.dialogVisible = true
    },
    async resourcesTask(form) {
      console.log(form)
      const res = await assignTask({ id: this.taskId, data: form })
      if (res.ret === 0) {
        this.dialogVisible = false
        this.$message.success('指派成功')
        this.$emit('resourcesTask')
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          this.resourcesTask(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close() {
      this.ruleForm = {
        exeUserId: '',
        amount: 1
      }
      this.list = []
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
  min-height: 30px;
  align-items: center;
  span {
    width: 140px;
    color: #808387;
  }
  p {
    flex: 1;
    height: auto;
    word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;
    margin: 10px 0;
  }
}
.list-clas {
  color: #999999;
  font-size:14px;
  margin-bottom: 10px;
}
</style>
