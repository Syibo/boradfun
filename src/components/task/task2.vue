<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left"> 超级厉害娱乐信息公司 </div>
        <div class="task_name_btn">
          <el-button type="primary"> 需求冻结 </el-button>
          <el-button @click="cacelTask"> 取消任务 </el-button>
        </div>
      </div>

      <div class="task_type">
        <el-button>需求对接中</el-button>
      </div>

      <div class="task_label"> 基本信息 </div>

      <el-row class="task_info">
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 应用/游戏名称 </span>
          <span class="task_info_con"> 王者荣耀 </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 期望测试日期 </span>
          <span class="task_info_con">
            <el-date-picker
              v-model="baseData.time"
              type="datetime"
              placeholder="选择日期时间"
            />
          </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务类型 </span>
          <span class="task_info_con">
            <el-select v-model="baseData.service" style="width: 100%" placeholder="请选择任务类型">
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
          <span class="task_info_con">
            <el-date-picker
              v-model="baseData.time"
              type="datetime"
              placeholder="选择日期时间"
            />
          </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务额度 </span>
          <span class="task_info_con">
            <el-input-number v-model="baseData.num" controls-position="right" :min="1" />
          </span>
        </el-col>
      </el-row>

      <div class="task_label"> 需求信息 <el-button v-if="taskFrom === 3" style="float: right" type="text" @click="editTask">编辑需求</el-button> </div>

      <div v-if="taskFrom === 1" class="task_demand task_bule" @click="taskFromFun">
        <i class="el-icon-circle-plus-outline" /> 填写需求
      </div>

      <Task2From v-if="taskFrom === 2 || taskFrom === 3" :task-from="taskFrom" :is-edit="isEdit" @cacelTask="cacelTaskFun" @saveTask="saveTask" />

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
export default {
  name: 'Task2',
  components: {
    Task2From
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
  methods: {
    cacelTask() {
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          console.log(form)
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    taskFromFun() {
      this.taskFrom = 2
    },
    cacelTaskFun(ise) {
      if (ise) {
        this.taskFrom = 3
      } else {
        this.taskFrom = 1
      }
    },
    saveTask() {
      this.taskFrom = 3
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
