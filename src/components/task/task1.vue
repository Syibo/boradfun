<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left"> {{ data.client.name }} </div>
        <div class="task_name_btn">
          <el-button v-permission="[1, 2, 3]" @click="cacelTask"> 取消任务 </el-button>
          <el-button v-permission="[3]" type="primary" @click="accept"> 确认接受 </el-button>
        </div>
      </div>

      <div class="task_type">
        <el-button disabled>对接待确认</el-button>
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
          <span class="task_info_con"> {{ data.preAmount }} </span>
        </el-col>
      </el-row>

      <div class="task_label"> 需求信息 </div>

      <div class="task_demand">
        <i class="el-icon-circle-plus-outline" /> 填写需求
      </div>
    </div>
    <TaskLog :log="data.logs" />
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import { confirmTask, getOneTask } from '@/api/task'
import TaskLog from '@/components/task/taskLog'
export default {
  name: 'Task1',
  directives: { permission },
  components: {
    TaskLog
  },
  data() {
    return {
      taskId: 0,
      data: {
        client: {},
        service: {},
        taskDetail: {},
        exeUser: {},
        realService: {},
        logs: []
      }
    }
  },
  mounted() {
    this.taskId = Number(this.$route.query.id)
    this.getOneTask()
  },
  methods: {
    cacelTask() {
      this.$emit('cacelTask')
    },
    async getOneTask() {
      const res = await getOneTask({ id: this.taskId })
      if (res.ret === 0) {
        this.data = JSON.parse(JSON.stringify(res.data))
      }
    },
    accept() {
      this.$confirm('确认接受此任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.confirmTask()
      }).catch(() => {})
    },
    async confirmTask() {
      const res = await confirmTask({ id: this.taskId })
      if (res.ret === 0) {
        this.$message.success('任务已经接受')
        this.$emit('accept')
      }
    }
  }
}
</script>

<style lang="scss">
.broadfun_task {
    display: flex;
    min-height: calc(100vh - 100px);
    flex: 1;
    .task_left {
        width: 100%;
        padding: 15px;
        .task_name {
            display: flex;
            .task_name_left {
                flex: 1;
                font-size:22px;
                font-weight:500;
                color:rgba(32,45,64,1);
            }
        }
        .task_type {
            margin: 5px 0 25px 0;
        }
        .task_label {
            font-weight:500;
            color:rgba(43,43,43,1);
            margin-bottom: 10px;
        }
        .task_info {
            margin-bottom: 50px;
            .task_info_item {
                height: 35px;
                display: flex;
                align-items: center;
                .task_info_label {
                    display: inline-block;
                    font-size:14px;
                    font-weight:400;
                    color:rgba(133,146,166,1);
                    width: 120px;
                }
                .task_info_con {
                    font-size:14px;
                    font-weight:400;
                    color: #202D40;
                }
            }

        }
        .task_demand {
            height:42px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px dashed #E4E9EE;
            color: #BCC0C3;
            font-size: 14px;
            i {
                margin-right: 5px;
            }
        }
    }
}
</style>
