<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left"> {{ data.client.name }} </div>
        <div class="task_name_btn">
          <div v-if="type === 'finish'">
            <el-button v-permission="[1, 2, 3]" @click="cacelTask"> 取消任务 </el-button>
            <el-button v-permission="[3]" type="primary" @click="statement"> 交付结单 </el-button>
          </div>
          <el-button v-if="type === 'end' && !eva" v-permission="[2]" type="primary" @click="evaluation"> 评价 </el-button>
          <el-button v-if="type === 'end' && !evaCus" v-permission="[3]" type="primary" @click="evaluation"> 评价 </el-button>
        </div>
      </div>

      <div class="task_type">
        <el-button v-if="type === 'finish'" disabled>待审核</el-button>
        <el-button v-else disabled>已结单</el-button>
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
          <span class="task_info_con"> {{ data.service.serviceName }} </span>
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

      <div class="task_label"> 指派信息 </div>
      <el-row class="task_info">
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务类型 </span>
          <span class="task_info_con"> {{ data.service.serviceName }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 处理人 </span>
          <span class="task_info_con"> {{ data.exeUser.name }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务额度 </span>
          <span class="task_info_con"> {{ data.deliverAmount }} </span>
        </el-col>
      </el-row>

      <div class="task_label"> <i class="el-icon-arrow-down" @click="show = !show" /> 需求信息 </div>

      <div v-show="show" class="task_demand_detail">
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

      <div v-if="eva" v-permission="[1, 2, 4, 5]" class="task_eva">
        <div class="title">实施评价</div>
        <div class="task_eva_con">
          <div class="left">
            <div class="task_eva_num">{{ evaData.score }}</div>
            <div>工作评分</div>
          </div>
          <div class="mid" />
          <div class="right">
            <div> <span>实际交付时间</span> {{ evaData.realTime }} </div>
            <div> <span>实施返工次数</span> {{ evaData.reExeTimes }}</div>
            <div> <span>其他补充信息</span> {{ evaData.other }} </div>
          </div>
        </div>
      </div>

      <div v-if="evaCus" v-permission="[1, 2, 3, 4]" class="task_eva">
        <div class="title">客户服务经理评价</div>
        <div class="task_eva_con">
          <div class="left">
            <div class="task_eva_num">{{ evaCusData.score }}</div>
            <div>工作评分</div>
          </div>
          <div class="mid" />
          <div class="right">
            <div> <span>实际结单时间</span> {{ evaCusData.realTime }} </div>
            <div> <span>实施返工次数</span> {{ evaCusData.reExeTimes }}</div>
            <div> <span>其他补充信息</span> {{ evaCusData.other }} </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="结单确认" :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px" @close="close">
      <el-form ref="ruleForm" label-width="120px" label-position="top" :model="ruleForm">
        <el-form-item label="包体信息">
          <el-row>
            <el-col :span="8">本次测试版本</el-col>
            <el-col :span="10">{{ data.taskDetail.version }}</el-col>
            <el-col :span="6">
              <el-checkbox-group v-model="ruleForm.checkedInfo">
                <el-checkbox :label="'确认无误'" name="checkedInfo" disabled />
              </el-checkbox-group>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">安装包内网地址</el-col>
            <el-col :span="10">{{ data.taskDetail.pkgAddress }}</el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="测试环境信息">
          <el-row>
            <el-col :span="8">测试环境类型</el-col>
            <el-col :span="10">{{ data.taskDetail.testType }}</el-col>
            <el-col :span="6">
              <el-checkbox-group v-model="ruleForm.checkedEnv">
                <el-checkbox label="确认无误" disabled />
              </el-checkbox-group>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="测试账号信息">
          <el-row> <el-col :span="8">测试账号</el-col> <el-col :span="10">{{ data.taskDetail.testAccountType }}</el-col>
            <el-col :span="6">
              <el-checkbox-group v-model="ruleForm.checkedNum">
                <el-checkbox label="确认无误" disabled />
              </el-checkbox-group>
            </el-col>
          </el-row>
          <el-row> <el-col :span="8">测试账号数量</el-col> <el-col :span="10">{{ data.taskDetail.accountNum }}</el-col> </el-row>
          <el-row> <el-col :span="8">手机号码/微信数量</el-col> <el-col :span="10">{{ data.taskDetail.phoneNum }}</el-col> </el-row>
          <el-row> <el-col :span="8">系统并发限制</el-col> <el-col :span="10">{{ data.taskDetail.concurrentNum }}</el-col> </el-row>
        </el-form-item>

        <el-form-item label="机型需求">
          <el-row> <el-col :span="8">机型需求</el-col> <el-col :span="10"> {{ data.taskDetail.reqPhone ? data.taskDetail.reqPhone : '-' }} </el-col>
            <el-col :span="6">
              <el-checkbox-group v-model="ruleForm.checkedPhone">
                <el-checkbox label="确认无误" disabled />
              </el-checkbox-group>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="其他需求">
          <el-row> <el-col :span="8">其他需求</el-col> <el-col :span="10"> {{ data.taskDetail.extReq ? data.taskDetail.extReq : '-' }} </el-col>
            <el-col :span="6">
              <el-checkbox-group v-model="ruleForm.checkedOther">
                <el-checkbox label="确认无误" disabled />
              </el-checkbox-group>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="用例信息">
          <el-row> <el-col :span="8">文字用例内网地址</el-col> <el-col :span="10">{{ data.taskDetail.instanceTxt }} </el-col>
            <el-col :span="6">
              <el-checkbox-group v-model="ruleForm.checkedCase">
                <el-checkbox label="确认无误" disabled />
              </el-checkbox-group>
            </el-col>
          </el-row>
          <el-row> <el-col :span="8">视频用例内网地址</el-col> <el-col :span="10">{{ data.taskDetail.instanceMv }} </el-col> </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="评价" :visible.sync="dialogVisibleEva" :close-on-click-modal="false" width="600px" @close="closeEva">
      <el-form ref="ruleFormEva" label-width="120px" label-position="top" :model="ruleFormEva" :rules="rulesEva">
        <el-form-item label="实际交付时间" prop="realTime">
          <el-date-picker
            v-model="ruleFormEva.realTime"
            style="width: 100%"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="结单返工次数" prop="reExeTimes">
          <el-input-number v-model="ruleFormEva.reExeTimes" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="客户服务评分" prop="score">
          <!-- <el-input-number v-model="ruleFormEva.score" :min="1" controls-position="right" /> -->
          <el-rate
            v-model="ruleFormEva.score"
            :max="10"
          />
        </el-form-item>
        <el-form-item label="其他补充信息" prop="other">
          <el-input v-model="ruleFormEva.other" type="textarea" rows="5" maxlength="100" show-word-limit placeholder="请输入补充信息" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEva = false">取 消</el-button>
        <el-button type="primary" @click="submitFormEva('ruleFormEva')">确 定</el-button>
      </span>
    </el-dialog>
    <TaskLog :log="data.logs" :manage="data.manage" :sale-user="data.client.saleUser" />
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import TaskLog from '@/components/task/taskLog'
import { mapGetters } from 'vuex'
import { endTask, commentTask, getCommentTask, getOneTask } from '@/api/task'
export default {
  name: 'Task6',
  directives: { permission },
  components: {
    TaskLog
  },
  props: {
    service: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'finish'
    }
  },
  data() {
    return {
      eva: false,
      evaCus: false,
      show: true,
      taskId: 0,
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
      dialogVisible: false,
      dialogVisibleEva: false,
      evaData: {},
      evaCusData: {},
      options: [{
        value: '项目计划变更',
        label: '项目计划变更'
      }, {
        value: '不想做了',
        label: '不想做了'
      }],
      ruleForm: {
        checkedInfo: ['确认无误'],
        checkedEnv: ['确认无误'],
        checkedNum: ['确认无误'],
        checkedPhone: ['确认无误'],
        checkedOther: ['确认无误'],
        checkedCase: ['确认无误']
      },
      ruleFormEva: {
        commentType: 0,
        other: '',
        reExeTimes: 0,
        realTime: '',
        score: 0,
        type: 0
      },
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      rulesEva: {
        realTime: [
          { required: true, message: '请输入实际交付时间', trigger: 'blur' }
        ],
        reExeTimes: [
          { required: true, message: '请输入结单返工次数', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请输入客户服务评分', trigger: 'blur' }
        ],
        other: [
          { required: true, message: '请输入其他补充信息', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'name',
      'roles'
    ])
  },
  mounted() {
    this.taskId = Number(this.$route.query.id)
    this.getCommentTask()
    this.getOneTask()
  },
  methods: {
    statement() {
      this.dialogVisible = true
    },
    cacelTask() {
      this.$emit('cacelTask')
    },
    async getOneTask() {
      const res = await getOneTask({ id: this.taskId })
      if (res.ret === 0) {
        this.data = JSON.parse(JSON.stringify(res.data))
      }
    },
    evaluation() {
      this.dialogVisibleEva = true
    },
    async getCommentTask() {
      const res = await getCommentTask({ id: this.taskId })
      if (res.ret === 0) {
        if (res.data.length !== 0) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].commentType === 0) {
              this.evaCus = true
              this.show = false
              this.evaCusData = res.data[i]
            }
            if (res.data[i].commentType === 1) {
              this.eva = true
              this.show = false
              this.evaData = res.data[i]
            }
          }
        }
      }
    },
    async statementFun() {
      const data = {
        'other': 'string',
        'reExeTimes': 1,
        'realTime': {},
        'score': 1
      }
      const res = await endTask({ id: this.data.ID, data: data })
      if (res.ret === 0) {
        this.$message.success('结单成功')
        this.dialogVisible = false
        this.getOneTask()
        this.$emit('statement')
      }
    },
    submitForm(formName) {
      this.statementFun()
    },
    async commentTask(form) {
      if (this.roles[0] === 2) {
        form.commentType = 1
      } else if (this.roles[0] === 3) {
        form.commentType = 0
      // eslint-disable-next-line no-empty
      } else {}
      const res = await commentTask({ id: this.taskId, data: form })
      if (res.ret === 0) {
        this.$message.success('评价成功')
        if (form.commentType === 0) {
          this.evaCusData = JSON.parse(JSON.stringify(form))
          this.evaCus = true
        } else {
          this.evaData = JSON.parse(JSON.stringify(form))
          this.eva = true
        }
        this.show = false
        this.dialogVisibleEva = false
      }
    },
    submitFormEva(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleFormEva
          this.commentTask(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close() {
      this.ruleForm = {
        checkedInfo: ['确认无误'],
        checkedEnv: ['确认无误'],
        checkedNum: ['确认无误'],
        checkedPhone: ['确认无误'],
        checkedOther: ['确认无误'],
        checkedCase: ['确认无误']
      }
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    },
    closeEva() {
      this.ruleFormEva = {
        other: '',
        reExeTimes: 0,
        realTime: '',
        score: 0,
        type: 0,
        commentType: 0
      }
      if (this.$refs['ruleFormEva']) {
        this.$refs['ruleFormEva'].resetFields()
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
  a {
    text-decoration: underline;
  }
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.task_eva {
  background:rgba(255,178,24,0.1);
  height: 150px;
  border-radius:4px;
  padding: 10px;
  margin-bottom: 10px;
  .title {
    color: #2B2B2B;
    font-size: 14px;
  }
  .task_eva_con {
    display: flex;
    height: 120px;
    align-items: center;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 118px;
      font-size:12px;
      font-weight:400;
      color:rgba(43,43,43,1);
      .task_eva_num {
        font-size:36px;
        font-weight:500;
        margin-bottom: 10px;
        color:rgba(255,178,24,1);
      }
    }
    .mid {
      width:1px;
      height:79px;
      background:rgba(255,232,185,1);
    }
    .right {
      flex: 1;
      display: flex;
      height: 80px;
      padding-left: 20px;
      flex-direction: column;
      justify-content: space-between;
      font-size:14px;
      font-weight:400;
      color:rgba(32,45,64,1);
      span {
        display: inline-block;
        width: 110px;
        color: #999999;
      }
      p {
        flex: 1;
        height: auto;
        word-wrap:break-word;
        word-break:break-all;
        overflow: hidden;
      }
    }
  }
}
</style>
