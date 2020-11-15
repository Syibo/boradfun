<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left"> {{ baseData.client.name }} </div>
        <div class="task_name_btn">
          <el-button v-permission="[1, 2, 3]" @click="cacelTask"> 取消任务 </el-button>
          <el-button v-permission="[3]" type="primary" @click="freezeTask"> 需求冻结 </el-button>
        </div>
      </div>

      <div class="task_type">
        <el-button disabled>需求对接中</el-button>
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
          <span v-if="taskFrom === 3" class="task_info_con"> {{ baseData.realService !== null ? baseData.realService.serviceName : '' }} </span>
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
          <span v-if="taskFrom === 3" class="task_info_con"> {{ baseData.realAmount }} </span>
          <span v-else class="task_info_con">
            <el-input-number v-model="baseData.realAmount" controls-position="right" :min="1" />
          </span>
        </el-col>
      </el-row>

      <div class="task_label"> 需求信息 <el-button v-if="taskFrom === 3" v-permission="[3]" style="float: right" type="text" @click="editTask">编辑需求</el-button> </div>

      <div v-show="taskFrom === 1" v-permission="[3]" class="task_demand task_bule" @click="taskFromFun">
        <i class="el-icon-circle-plus-outline" /> 填写需求
      </div>

      <Task2From v-if="taskFrom === 2 || taskFrom === 3" :task-from="taskFrom" :data="baseData" :is-edit="isEdit" @cacelTask="cacelTaskFun" @saveTask="saveTask" />

    </div>
    <TaskLog :log="baseData.logs" :manage="baseData.manage" :sale-user="baseData.client.saleUser" />
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import Task2From from '../From/task2-from'
import { saveTaskInfo, frozenTask, getOneTask } from '@/api/task'
import TaskLog from '@/components/task/taskLog'
import Moment from 'moment'
import _ from 'lodash'
export default {
  name: 'Task2',
  directives: { permission },
  components: {
    Task2From,
    TaskLog
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    service: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
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
      taskFrom: 1,
      isEdit: false,
      optiondate: {
        disabledDate(date) {
          return date.getTime() <= Date.now()
        },
        selectableRange: ['09:00:00 - 18:00:00']
      }
    }
  },
  // watch: {
  //   data(newData, prevData) {
  //     this.baseData = JSON.parse(JSON.stringify(newData))
  //     this.datacopy = JSON.parse(JSON.stringify(newData))
  //     if (this.data.expDeliverTime === '0001-01-01 00:00:00') {
  //       this.baseData.expDeliverTime = this.baseData.preDate
  //       this.baseData.expEndTime = this.baseData.expEndDate
  //       this.baseData.realServiceId = this.baseData.serviceId
  //       this.baseData.realAmount = this.baseData.preAmount
  //     }
  //     if (newData.taskDetail.version !== '' && newData.taskDetail.version !== undefined) {
  //       this.taskFrom = 3
  //     }
  //   }
  // },
  mounted() {
    this.taskId = Number(this.$route.query.id)
    this.getOneTask()
  },
  methods: {
    async getOneTask() {
      const res = await getOneTask({ id: this.taskId })
      if (res.ret === 0) {
        this.baseData = JSON.parse(JSON.stringify(res.data))
        this.datacopy = JSON.parse(JSON.stringify(res.data))
        if (res.data.expDeliverTime === '0001-01-01 00:00:00' || res.data.expDeliverTime === '') {
          this.baseData.expEndTime = _.replace(this.baseData.expEndDate, '00:00:00', '18:00:00')
          this.baseData.expDeliverTime = Moment(this.baseData.expEndTime).subtract(3, 'hours').format('YYYY-MM-DD HH:mm:ss')
          this.baseData.realServiceId = this.baseData.serviceId
          this.baseData.realAmount = this.baseData.preAmount
        }
        if (res.data.taskDetail.version !== '' && res.data.taskDetail.version !== undefined) {
          this.taskFrom = 3
        }
      }
    },
    cacelTask() {
      this.$emit('cacelTask')
    },
    freezeTask() {
      if (this.taskFrom !== 3) {
        this.$message.error('请保存当前需求')
        return
      }
      // if (this.baseData.taskDetail.instanceTxt === '' || this.baseData.taskDetail.instanceMv === '') {
      //   this.$message.error('内网地址不完整')
      //   return
      // }
      this.$confirm('确认冻结此任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.frozenTask()
      }).catch(() => {})
    },
    async frozenTask() {
      const res = await frozenTask({ id: this.taskId })
      if (res.ret === 0) {
        this.$message.success('任务冻结成功')
        this.$emit('freeze')
      }
    },
    taskFromFun() {
      this.taskFrom = 2
    },
    cacelTaskFun(ise) {
      this.baseData = this.datacopy
      if (this.baseData.expDeliverTime === '0001-01-01 00:00:00') {
        this.baseData.expDeliverTime = this.baseData.preDate
        this.baseData.expEndTime = this.baseData.expEndDate
        this.baseData.realServiceId = this.baseData.serviceId
        this.baseData.realAmount = this.baseData.preAmount
      }
      if (ise) {
        this.taskFrom = 3
      } else {
        this.taskFrom = 1
      }
    },
    async saveTask(ruleFormInfo) {
      const isBefore = this.isOverTime(this.baseData.expDeliverTime, this.baseData.expEndTime)
      if (!isBefore) {
        this.$message.error('交付时间和结单时间不能间隔3小时')
        return
      }
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
      console.log(ruleFormInfo)
      const res = await saveTaskInfo({ id: this.taskId, data: ruleFormInfo })
      if (res.ret === 0) {
        this.$message.success('保存成功')
        this.getOneTask()
        this.taskFrom = 3
      }
    },
    editTask() {
      this.isEdit = true
      this.taskFrom = 2
    },
    isOverTime(before, end) {
      var now = Moment(before).add(3, 'hours').format('YYYY-MM-DD HH:mm:ss')
      const isOverTime = Moment(end).isSameOrBefore(now)
      return isOverTime
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
