<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left"> {{ baseData.client.name }} </div>
        <div class="task_name_btn">
          <el-button v-if="type === 'allot'" v-permission="[5]" type="primary" @click="startTask"> 启动执行 </el-button>
          <div v-else-if="type === 'execute'">
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
          <div v-else>
            <el-button v-if="taskFrom === 3" v-permission="[5]" type="primary" style="margin-right: 10px" @click="startTaskAgain"> 重新启动 </el-button>
            <el-button v-if="changeOver" v-permission="[3]" type="primary" style="margin-right: 10px" @click="changeOverFun"> 变更完成 </el-button>
            <el-dropdown @command="handleCommandPa">
              <span class="el-dropdown-link">
                更多操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-permission="[3]" command="change">无需变更</el-dropdown-item>
                <el-dropdown-item v-permission="[1, 2, 3]" command="cancel">任务取消</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

      <div class="task_type">
        <el-button v-if="type === 'allot'" disabled>待执行</el-button>
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
          <span class="task_info_label"> 期望测试日期 </span>
          <span v-if="taskFrom === 3" class="task_info_con"> {{ baseData.expDeliverTime }} </span>
          <span v-else class="task_info_con">
            <el-date-picker
              v-model="baseData.expDeliverTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务类型 </span>
          <span v-if="taskFrom === 3" class="task_info_con"> {{ baseData.realService.serviceName }} </span>
          <span v-else class="task_info_con">
            <el-select v-model="baseData.realServiceId" style="width: 100%" placeholder="请选择任务类型">
              <el-option
                v-for="item in service"
                :key="item.ID"
                :label="item.serviceName"
                :value="item.ID"
              />
            </el-select>
          </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 期望结单日期 </span>
          <span v-if="taskFrom === 3" class="task_info_con"> {{ baseData.expEndTime }} </span>
          <span v-else class="task_info_con">
            <el-date-picker
              v-model="baseData.expEndTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务额度 </span>
          <span v-if="taskFrom === 3" class="task_info_con"> {{ baseData.realAmount }} </span>
          <span v-else class="task_info_con">
            <el-input-number v-model="baseData.realAmount" controls-position="right" :min="1" />
          </span>
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

    <TaskLog :log="baseData.logs" />

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
        <el-checkbox-group v-model="ruleForm.tags">
          <el-checkbox v-for="item in tagsList" :key="item.id" style="width: 110px" :label="item.id"> {{ item.name }} </el-checkbox>
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
import permission from '@/directive/permission/index.js'
import Task2From from '../From/task2-from'
import { executeTask, tagsTask, finishTask, stopTask, saveTaskInfo, getOneTask } from '@/api/task'
import TaskLog from '@/components/task/taskLog'
export default {
  name: 'Task4',
  directives: { permission },
  components: {
    Task2From,
    TaskLog
  },
  props: {
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
      taskId: 0,
      baseData: {
        client: {},
        service: {},
        taskDetail: {},
        exeUser: {},
        realService: {}
      },
      datacopy: {},
      isEdit: true,
      taskFrom: 3,
      changeOver: true,
      options: [{
        value: '项目计划变更',
        label: '项目计划变更'
      }, {
        value: '不想做了',
        label: '不想做了'
      }],
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
        ]
      },
      tagsList: []
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
    startTask() {
      this.$confirm('确认启动此任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.executeTask()
      }).catch(() => {})
    },
    startTaskAgain() {
      this.$confirm('已了解此次变更内容，打算重启执行任务？?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.executeTask()
      }).catch(() => {})
    },
    async executeTask() {
      const res = await executeTask({ id: this.taskId })
      if (res.ret === 0) {
        this.$message.success('任务启动成功')
        this.$emit('startTask')
      }
    },
    async tagsTask() {
      const res = await tagsTask()
      this.tagsList = res.data
    },
    completeTask() {
      this.dialogVisible = true
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
        this.$message.success('保存成功')
        this.getOneTask()
        this.taskFrom = 3
        this.changeOver = true
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
    changeOverFun() {
      this.changeOver = false
    },
    noChange() {
      // this.dialogVisible = true
      this.taskFrom = 3
    },
    changeInfo() {
      this.taskFrom = 2
      this.changeOver = true
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
