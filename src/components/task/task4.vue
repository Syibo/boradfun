<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left">
          {{ baseData.client.name }}
          <el-tooltip class="item" effect="dark" content="查看历史版本" placement="right">
            <i class="el-icon-time" @click="goHistory" />
          </el-tooltip>
        </div>
        <div class="task_name_btn">
          <el-button v-show="type === 'assign'" v-permission="[5]" type="primary" @click="startTask"> 启动执行 </el-button>
          <div v-show="type === 'execute'">
            <el-button v-permission="[5]" type="primary" style="margin-right: 10px" @click="completeTask"> 执行完成 </el-button>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                更多操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-permission="[5]" command="stop">任务暂停</el-dropdown-item>
                <el-dropdown-item v-permission="[1, 2, 3]" command="cancel">任务取消</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-show="type === 'pause'">
            <el-button v-if="taskFrom === 3 && baseData.isPause === 0" v-permission="[5]" type="primary" style="margin-right: 10px" @click="startTaskAgain"> 重新启动 </el-button>
            <el-button v-show="changeOver" v-permission="[3]" type="primary" style="margin-right: 10px" @click="changeOverFun"> 变更完成 </el-button>
            <el-dropdown @command="handleCommandPa">
              <span class="el-dropdown-link">
                更多操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-permission="[1, 2, 3]" command="cancel">任务取消</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

      <div class="task_type">
        <el-button v-if="type === 'assign'" disabled>待执行</el-button>
        <el-button v-else-if="type === 'execute'" style="color: #FFB959; border-color: #FFC069" disabled>执行中</el-button>
        <div v-else>
          <el-button style="color: #FF5C5C; border-color: #FF5C5C" disabled>任务暂停</el-button>
          <div v-permission="[3]" class="stop-info">
            <i class="el-icon-warning" /> 你好！现在任务处于暂停中，您可以选择进行 <span @click="changeInfo">需求变更</span> 或是 <span @click="noChange">无需变更</span> ，通知实施人员重新执行！
          </div>
        </div>
      </div>

      <div class="task_label"> 基本信息 </div>

      <el-row class="task_info">
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 应用/游戏名称 </span>
          <span class="task_info_con"> {{ baseData.appName }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 期望交付时间 </span>
          <span v-if="taskFrom === 3" class="task_info_con"> {{ baseData.expDeliverTime }} </span>
          <span v-else class="task_info_con">
            <el-date-picker
              v-model="baseData.expDeliverTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="optiondate"
            />
          </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务类型 </span>
          <span class="task_info_con"> {{ baseData.realService.serviceName }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 期望结单时间 </span>
          <span v-if="taskFrom === 3" class="task_info_con"> {{ baseData.expEndTime }} </span>
          <span v-else class="task_info_con">
            <el-date-picker
              v-model="baseData.expEndTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="optiondate"
            />
          </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务额度 </span>
          <span class="task_info_con"> {{ baseData.realAmount }} </span>
        </el-col>
      </el-row>

      <div class="task_label"> 指派信息 </div>
      <el-row class="task_info">
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务类型 </span>
          <span class="task_info_con"> {{ baseData.realService.serviceName }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 处理人 </span>
          <span class="task_info_con"> {{ baseData.exeUser.name }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务额度 </span>
          <span class="task_info_con"> {{ baseData.deliverAmount }} </span>
        </el-col>
      </el-row>

      <div class="task_label"> 需求信息 </div>

      <Task2From v-if="taskFrom === 2 || taskFrom === 3" :task-from="taskFrom" :data="baseData" :is-edit="isEdit" @cacelTask="cacelTaskFun" @saveTask="saveTask" />

    </div>

    <TaskLog :log="baseData.logs" :manage="baseData.manage" :sale-user="baseData.client.saleUser" />

    <CheckDialog :dialog-visible="dialogVisibleCheck" :base-data="baseData" @check="checkFun" @update:dialogVisible="dialogVisibleCheck = false" />

    <el-dialog title="执行信息确认" :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px" @close="close">
      <el-form ref="ruleForm" label-width="120px" label-position="left" :model="ruleForm" :rules="rules">
        <el-form-item label="任务执行时长" prop="usedTime">
          <el-input-number v-model="ruleForm.usedTime" :min="1" controls-position="right" />
        </el-form-item>
        <el-form-item label="执行批次" prop="executeBatch">
          <el-input-number v-model="ruleForm.executeBatch" :min="1" controls-position="right" />
        </el-form-item>
        <el-form-item label="执行台次" prop="executeTai">
          <el-input-number v-model="ruleForm.executeTai" :min="1" controls-position="right" />
        </el-form-item>
        <el-form-item label="外部延误时长" prop="delayTime">
          <el-input-number v-model="ruleForm.delayTime" :min="1" controls-position="right" />
        </el-form-item>
        <el-form-item label="整体任务说明" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" rows="5" maxlength="250" show-word-limit placeholder="整体任务说明" />
        </el-form-item>
        <el-form-item label="" prop="tags">
          <el-checkbox-group v-model="ruleForm.tags">
            <el-checkbox v-for="item in tagsList" :key="item.id" :disabled="item.disabled" style="width: 110px" :label="item.id" @change="changeBox"> {{ item.name }} </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="需求变更" :visible.sync="dialogVisibleChange" :close-on-click-modal="false" width="600px" @close="closeChange">
      <el-form ref="ruleFormChange" label-width="420px" label-position="top" :model="ruleFormChange" :rules="rulesChange">
        <el-form-item label="本次需求变更是否涉及任务类型或额度变化？（如果涉及到额度和任务类型的变化 此任务将取消）" prop="isChange">
          <el-radio-group v-model="ruleFormChange.isChange">
            <el-radio :label="'是'" />
            <el-radio :label="'否'" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleChange = false">取 消</el-button>
        <el-button type="primary" @click="submitFormChange('ruleFormChange')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="变更说明" :visible.sync="dialogVisibleInfo" :close-on-click-modal="false" width="600px" @close="closeInfo">
      <el-form ref="ruleFormInfo" label-width="420px" label-position="top" :model="ruleFormInfo" :rules="rulesInfo">
        <!-- <el-form-item label="本次需求变更是否涉及任务类型或额度变化？（如果涉及到额度和任务类型的变化 此任务将取消）" prop="isChange">
          <el-radio-group v-model="ruleFormInfo.isChange">
            <el-radio :label="'是'" />
            <el-radio :label="'否'" />
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="变更说明" prop="changeLog">
          <el-input v-model="ruleFormInfo.changeLog" type="textarea" rows="5" maxlength="250" show-word-limit placeholder="变更说明" />
        </el-form-item>
        <div>是否已和客户就此次需求变更结单时间，用例内容达成一致，准备需求冻结进入执行</div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleInfo = false">取 消</el-button>
        <el-button type="primary" @click="submitFormInfo('ruleFormInfo')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import Task2From from '../From/task2-from'
import { executeTask, tagsTask, finishTask, stopTask, saveTaskInfo, getOneTask, changeTask } from '@/api/task'
import TaskLog from '@/components/task/taskLog'
import CheckDialog from '@/components/common/CheckDialog.vue'
export default {
  name: 'Task4',
  directives: { permission },
  components: {
    Task2From,
    TaskLog,
    CheckDialog
  },
  props: {
    service: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'assign'
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisibleCheck: false,
      dialogVisibleChange: false,
      dialogVisibleInfo: false,
      taskId: 0,
      baseData: {
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
      datacopy: {},
      isEdit: true,
      taskFrom: 3,
      changeOver: false,
      ruleFormChange: {
        isChange: ''
      },
      rulesChange: {
        isChange: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      ruleFormInfo: {
        changeLog: ''
      },
      rulesInfo: {
        changeLog: [
          { required: true, message: '请输入变更说明', trigger: 'blur' }
        ]
      },
      ruleForm: {
        delayTime: '',
        desc: '',
        executeBatch: '',
        executeTai: '',
        usedTime: '',
        tags: []
      },
      rules: {
        usedTime: [
          { required: true, message: '请输入任务执行时长', trigger: 'blur' }
        ],
        executeBatch: [
          { required: true, message: '请输入执行批次', trigger: 'blur' }
        ],
        executeTai: [
          { required: true, message: '请输入执行台次', trigger: 'blur' }
        ],
        delayTime: [
          { required: true, message: '请输入外部延误时长', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入整体任务说明', trigger: 'blur' }
        ],
        tags: [
          { type: 'array', required: true, message: '请选择', trigger: 'change' }
        ]
      },
      formInfo: {},
      tagsList: [],
      optiondate: {
        disabledDate(date) {
          return date.getTime() <= Date.now()
        },
        selectableRange: ['09:30:00 - 18:30:00']
      }
    }
  },
  mounted() {
    this.taskId = Number(this.$route.query.id)
    this.getOneTask()
    this.tagsTask()
  },
  methods: {
    async getOneTask() {
      const res = await getOneTask({ id: this.taskId })
      if (res.ret === 0) {
        this.baseData = JSON.parse(JSON.stringify(res.data))
        this.datacopy = JSON.parse(JSON.stringify(res.data))
      }
    },
    async getNewTask() {
      const res = await getOneTask({ id: this.taskId })
      if (res.ret === 0) {
        this.baseData = JSON.parse(JSON.stringify(res.data))
        this.datacopy = JSON.parse(JSON.stringify(res.data))
      }
    },
    goHistory() {
      this.$router.push({
        path: 'history',
        query: {
          id: this.taskId
        }
      })
    },
    startTask() {
      this.$confirm('确认启动此任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.executeTask()
      }).catch(() => {})
    },
    startTaskAgain() {
      this.$confirm('已了解此次变更内容，打算重启执行任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.executeTask()
      }).catch(() => {})
    },
    async executeTask() {
      const res = await executeTask({ id: this.taskId })
      if (res.ret === 0) {
        const template = `<div>
          <div style="font-size: 16px;margin-bottom: 10px">任务启动成功，请根据本次任务需求，按时完成</div>
          <div>任务类型：${this.baseData.realService.serviceName}</div>
          <div>期望交付时间：${this.baseData.expDeliverTime}</div>
        </div>`
        this.$alert(template, '启动执行', {
          dangerouslyUseHTMLString: true,
          showClose: false,
          confirmButtonText: '确定',
          callback: action => {
            this.getOneTask()
            this.$emit('startTask')
          }
        })
      }
    },
    async tagsTask() {
      const res = await tagsTask()
      this.tagsList = res.data
      for (let index = 0; index < this.tagsList.length; index++) {
        this.tagsList[index].disabled = false
      }
    },
    checkFun() {
      this.dialogVisibleCheck = false
      this.dialogVisible = true
    },
    completeTask() {
      this.dialogVisibleCheck = true
    },
    async finishTask(form) {
      const res = await finishTask({ id: this.taskId, data: form })
      if (res.ret === 0) {
        this.$message.success('任务执行成功')
        this.$emit('complete')
      }
    },
    async stopTask() {
      const res = await stopTask({ id: this.taskId })
      if (res.ret === 0) {
        this.getOneTask()
        this.$message.success('任务暂停成功')
        this.$emit('stopTask')
      }
    },
    cacelTaskFun(ise) {
      this.baseData = this.datacopy
      if (ise) {
        this.taskFrom = 3
      } else {
        this.taskFrom = 1
      }
    },
    async saveTask(ruleFormInfo) {
      this.formInfo = ruleFormInfo
      if (this.baseData.realServiceId === '' ||
        this.baseData.realAmount === '' ||
        this.baseData.expDeliverTime === null ||
        this.baseData.expEndTime === null) {
        this.$message.error('基本信息不完整')
        return
      }
      ruleFormInfo.realServiceId = this.baseData.realServiceId
      ruleFormInfo.realAmount = this.baseData.realAmount
      ruleFormInfo.expDeliverTime = this.baseData.expDeliverTime
      ruleFormInfo.expEndTime = this.baseData.expEndTime
      ruleFormInfo.reUse = ruleFormInfo.reUse.join(',')
      const res = await saveTaskInfo({ id: this.taskId, data: ruleFormInfo })
      if (res.ret === 0) {
        this.changeOver = true
        this.getNewTask()
        this.taskFrom = 3
        this.$message.success('保存成功')
      }
    },
    handleCommand(command) {
      switch (command) {
        case 'stop':
          this.$confirm('确定任务暂时无法继续执行，需要暂停任务吗？?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.stopTask()
          }).catch(() => {})
          break
        case 'change':
          console.log('change')
          break
        case 'cancel':
          this.$emit('cacelTask')
          break
        default:
          break
      }
    },
    handleCommandPa(command) {
      switch (command) {
        case 'change':
          this.dialogVisible = true
          break
        case 'cancel':
          this.$emit('cacelTask')
          break
        default:
          break
      }
    },
    // eslint-disable-next-line vue/no-dupe-keys
    async changeOverFun() {
      this.dialogVisibleInfo = true
      // const res = await changeTask({ id: this.taskId })
      // if (res.ret === 0) {
      //   this.changeOver = false
      //   this.$message.success('变更完成，等待实施重新启动')
      // }
      // if (this.baseSerMon.realAmount !== this.baseData.realAmount || this.baseSerMon.realServiceId !== this.baseData.realServiceId) {
      //   this.$confirm('本次变更设计服务，额度变化，需重新提测', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消'
      //   }).then(() => {
      //     // this.executeTask()
      //     this.$emit('changAmount', this.baseData)
      //   }).catch(() => {})
      // } else {
      //   this.changeOver = false
      //   this.$message.success('变更完成，等待实施重新启动')
      // }
    },
    async noChange() {
      const res = await changeTask({ id: this.taskId })
      if (res.ret === 0) {
        this.taskFrom = 3
        this.$message.success('本次没有变更，等待实施重新启动')
      }
    },
    changeBox() {
      if (this.ruleForm.tags[0] === 1 && this.ruleForm.tags.length === 1) {
        const arr = this.tagsList
        for (let index = 0; index < arr.length; index++) {
          arr[index].disabled = true
        }
        arr[0].disabled = false
        this.tagsList = arr
      } else if (this.ruleForm.tags.length === 0) {
        for (let index = 0; index < this.tagsList.length; index++) {
          this.tagsList[index].disabled = false
        }
      } else {
        for (let index = 0; index < this.tagsList.length; index++) {
          this.tagsList[index].disabled = false
        }
        this.tagsList[0].disabled = true
      }
    },
    changeInfo() {
      this.dialogVisibleChange = true
      // this.taskFrom = 2
      // this.changeOver = false
    },
    async changeInfoDia(form) {
      const ruleFormInfo = this.formInfo
      ruleFormInfo.realServiceId = this.baseData.realServiceId
      ruleFormInfo.realAmount = this.baseData.realAmount
      ruleFormInfo.expDeliverTime = this.baseData.expDeliverTime
      ruleFormInfo.expEndTime = this.baseData.expEndTime
      ruleFormInfo.changeLog = form.changeLog
      const res = await saveTaskInfo({ id: this.taskId, data: ruleFormInfo })
      if (res.ret === 0) {
        const res2 = await changeTask({ id: this.taskId })
        if (res2.ret === 0) {
          this.changeOver = false
          this.dialogVisibleInfo = false
          this.$message.success('变更完成，等待实施重新启动')
          this.getOneTask()
        }
      }
    },
    submitFormInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleFormInfo
          console.log(form)
          console.log(this.formInfo)
          this.changeInfoDia(form)
          // this.dialogVisibleChange = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitFormChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleFormChange
          if (form.isChange === '是') {
            this.$emit('changAmount', this.baseData)
          } else {
            this.taskFrom = 2
            this.changeOver = false
          }
          this.dialogVisibleChange = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          this.finishTask(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close() {
      this.ruleForm = {
        delayTime: 1,
        desc: '',
        executeBatch: 1,
        executeTai: 1,
        usedTime: 1,
        tags: []
      }
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    },
    closeChange() {
      this.ruleFormChange = {
        isChange: ''
      }
      if (this.$refs['ruleFormChange']) {
        this.$refs['ruleFormChange'].resetFields()
      }
    },
    closeInfo() {
      this.ruleFormInfo = {
        changeLog: ''
      }
      if (this.$refs['ruleFormInfo']) {
        this.$refs['ruleFormInfo'].resetFields()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.task_name_left {
  display: flex;
  align-items: center;
  i {
    font-size: 16px;
    color: royalblue;
    margin-left: 10px;
    cursor: pointer;
  }
}
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
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.stop-info {
  height:40px;
  background:rgba(230,247,255,1);
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 0 10px;
  font-size: 12px;
  span {
    color: #3293FF;
    cursor: pointer;
  }
  i {
    color: #3293FF;
    margin-right: 10px;
  }
}
</style>
