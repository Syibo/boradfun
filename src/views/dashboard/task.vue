<template>
  <div class="container">
    <Task1
      v-if="type === 'create'"
      :task-id="taskId"
      :data="taskData"
      @accept="accept"
    />
    <Task2
      v-else-if="type === 'frozen'"
      :task-id="taskId"
      :data="taskData"
      :service="serviceData"
      @saveTask="saveTask"
      @freeze="freezeTask"
      @cacelTask="cacelTask"
    />
    <Task3
      v-else-if="type === 'assign'"
      :task-id="taskId"
      :data="taskData"
      :service="serviceData"
      @resourcesTask="resourcesTask"
      @cacelTask="cacelTask"
    />
    <Task4
      v-else-if="type === 'allot' || type === 'execute'"
      :type="type"
      :task-id="taskId"
      :data="taskData"
      :service="serviceData"
      @startTask="startTask"
      @complete="complete"
      @cacelTask="cacelTask"
    />
    <Task6
      v-else-if="type === 'finish' || type === 'end'"
      :type="type"
      :task-id="taskId"
      :data="taskData"
      :service="serviceData"
      @statement="statement"
    />
    <div v-else>以取消</div>
    <el-dialog title="任务取消" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px" @close="close">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules">
        <el-form-item label="任务取消原因" prop="result">
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
import { cancelTask } from '@/api/task'
import Task1 from '@/components/task/task1'
import Task2 from '@/components/task/task2'
import Task3 from '@/components/task/task3'
import Task4 from '@/components/task/task4'
import Task6 from '@/components/task/task6'
import { getList } from '@/api/service'
import { getOneTask } from '@/api/task'
export default {
  name: 'Task',
  components: {
    Task1,
    Task2,
    Task3,
    Task4,
    Task6
  },
  data() {
    return {
      type: 'create',
      taskId: 0,
      serviceData: [],
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
      rules: {
        result: [
          { required: true, message: '请选择取消原因', trigger: 'change' }
        ]
      },
      taskData: {
        client: {},
        service: {},
        taskDetail: {},
        exeUser: {},
        realService: {}
      }
    }
  },
  mounted() {
    this.type = this.$route.query.type
    this.taskId = Number(this.$route.query.id)
    this.getServiceList()
    this.getOneTask()
  },
  methods: {
    async getServiceList() {
      const res = await getList()
      this.serviceData = res.data
    },
    async cacelTask() {
      this.dialogVisible = true
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
    async cancelTask(from) {
      const res = await cancelTask({ id: this.taskId, userId: 1, reason: from.result })
      if (res.ret === 0) {
        this.$message.success('任务取消成功')
        this.$router.go(-1)
      }
    },
    close() {
      this.ruleForm = {
        result: ''
      }
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    },
    async getOneTask() {
      const res = await getOneTask({ id: this.taskId })
      if (res.ret === 0) {
        this.taskData = res.data
      }
    },
    async accept() {
      await this.getOneTask()
      this.type = 'frozen'
      this.$router.replace({
        path: 'task',
        query: {
          type: 'frozen',
          id: this.taskId
        }
      })
    },
    async saveTask() {
      await this.getOneTask()
    },
    freezeTask() {
      this.type = 'assign'
      this.$router.replace({
        path: 'task',
        query: {
          type: 'assign',
          id: this.taskId
        }
      })
    },
    async resourcesTask() {
      await this.getOneTask()
      this.type = 'allot'
      this.$router.replace({
        path: 'task',
        query: {
          type: 'allot',
          id: this.taskId
        }
      })
    },
    startTask() {
      this.type = 'execute'
      this.$router.replace({
        path: 'task',
        query: {
          type: 'execute',
          id: this.taskId
        }
      })
    },
    complete() {
      this.type = 'finish'
      this.$router.replace({
        path: 'task',
        query: {
          type: 'finish',
          id: this.taskId
        }
      })
    },
    statement() {
      this.type = 'end'
      this.$router.replace({
        path: 'task',
        query: {
          type: 'end',
          id: this.taskId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    padding-bottom: 10px;
}
</style>
