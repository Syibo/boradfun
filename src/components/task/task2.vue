<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left"> {{ data.client.name }} </div>
        <div class="task_name_btn">
          <el-button type="primary" @click="freezeTask"> 需求冻结 </el-button>
          <el-button @click="cacelTask"> 取消任务 </el-button>
        </div>
      </div>

      <div class="task_type">
        <el-button disabled>需求对接中</el-button>
      </div>

      <div class="task_label"> 基本信息 </div>

      <el-row class="task_info">
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 应用/游戏名称 </span>
          <span class="task_info_con"> {{ data.appName }} </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 期望测试日期 </span>
          <span v-if="taskFrom === 3" class="task_info_con"> {{ data.expDeliverTime }} </span>
          <span v-else class="task_info_con">
            <el-date-picker
              v-model="data.expDeliverTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务类型 </span>
          <span v-if="taskFrom === 3" class="task_info_con"> {{ data.realService.serviceName }} </span>
          <span v-else class="task_info_con">
            <el-select v-model="data.realServiceId" style="width: 100%" placeholder="请选择任务类型">
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
          <span v-if="taskFrom === 3" class="task_info_con"> {{ data.expEndTime }} </span>
          <span v-else class="task_info_con">
            <el-date-picker
              v-model="data.expEndTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务额度 </span>
          <span v-if="taskFrom === 3" class="task_info_con"> {{ data.realAmount }} </span>
          <span v-else class="task_info_con">
            <el-input-number v-model="data.realAmount" controls-position="right" :min="1" />
          </span>
        </el-col>
      </el-row>

      <div class="task_label"> 需求信息 <el-button v-if="taskFrom === 3" style="float: right" type="text" @click="editTask">编辑需求</el-button> </div>

      <div v-if="taskFrom === 1" class="task_demand task_bule" @click="taskFromFun">
        <i class="el-icon-circle-plus-outline" /> 填写需求
      </div>

      <Task2From v-if="taskFrom === 2 || taskFrom === 3" :task-from="taskFrom" :data="data" :is-edit="isEdit" @cacelTask="cacelTaskFun" @saveTask="saveTask" />

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

    <el-dialog title="任务取消" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px" @close="close">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules">
        <el-form-item label="任务取消原因" prop="clientId">
          <el-select v-model="ruleForm.result" style="width: 100%" placeholder="请选择原因">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
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
import Task2From from '../From/task2-from'
import { saveTaskInfo, cancelTask, frozenTask } from '@/api/task'
export default {
  name: 'Task2',
  components: {
    Task2From
  },
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
      datacopy: {},
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
        result: ''
      },
      rules: {},
      baseData: {
        time: '2020-07-16 00:00:00',
        num: 2,
        service: 1
      }
    }
  },
  watch: {
    data(newData, prevData) {
      this.data = newData
      this.datacopy = JSON.parse(JSON.stringify(newData))
      if (this.data.expDeliverTime === '0001-01-01 00:00:00') {
        this.data.expDeliverTime = this.data.preDate
        this.data.expEndTime = this.data.expEndDate
        this.data.realServiceId = this.data.serviceId
        this.data.realAmount = this.data.preAmount
      }
      if (newData.taskDetail.version !== '' && newData.taskDetail.version !== undefined) {
        this.taskFrom = 3
      }
    }
  },
  mounted() {

  },
  methods: {
    cacelTask() {
      this.dialogVisible = true
    },
    freezeTask() {
      if (this.taskFrom !== 3) {
        this.$message.error('请先填写需求')
        return
      }
      this.$confirm('确认冻结此任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message.success('任务冻结成功')
        this.frozenTask()
      }).catch(() => {})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          this.cancelTask(form)
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async frozenTask() {
      const res = await frozenTask({ id: this.taskId })
      if (res.ret === 0) {
        this.$emit('freeze')
      }
    },
    async cancelTask(from) {
      const res = await cancelTask({ id: this.taskId, userId: 1, reason: from.result })
      if (res.ret === 0) {
        this.$message.success('任务取消成功')
        this.$router.go(-1)
      }
    },
    taskFromFun() {
      this.taskFrom = 2
    },
    cacelTaskFun(ise) {
      this.data = this.datacopy
      if (ise) {
        this.taskFrom = 3
      } else {
        this.taskFrom = 1
      }
    },
    async saveTask(ruleFormInfo) {
      ruleFormInfo.realServiceId = this.data.realServiceId
      ruleFormInfo.realAmount = this.data.realAmount
      ruleFormInfo.expDeliverTime = this.data.expDeliverTime
      ruleFormInfo.expEndTime = this.data.expEndTime
      console.log(ruleFormInfo.reUse)
      ruleFormInfo.reUse = ruleFormInfo.reUse.join(',')
      const res = await saveTaskInfo({ id: this.taskId, data: ruleFormInfo })
      if (res.ret === 0) {
        // this.data.taskDetail = ruleFormInfo
        this.$message.success('保存成功')
        this.$emit('saveTask')
        setTimeout(() => {
          this.taskFrom = 3
        }, 1000)
      }
    },
    editTask() {
      this.isEdit = true
      this.taskFrom = 2
    },
    close() {
      this.ruleForm = {
        result: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.task_bule {
	color: #1F8DFB !important;
	cursor: pointer;
}
</style>
