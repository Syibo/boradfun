<template>
  <div class="container">
    <div class="broadfun_task">
      <div class="task_left">
        <div class="stop-info">
          <i class="el-icon-warning" /> 这是{{ history.title }} 在{{ history.createTime }}创建历史版本
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
      <TaskHistory :log="logs" @history="historyFun" />
    </div>
  </div>
</template>

<script>
import { gethistoryData, getOneTask } from '@/api/task'
import TaskHistory from '@/components/task/taskHistory'
export default {
  name: 'History',
  components: {
    TaskHistory
  },
  data() {
    return {
      currentRole: 'adminDashboard',
      taskId: '',
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
      logs: [],
      history: {}
    }
  },
  computed: {},
  mounted() {
    this.taskId = Number(this.$route.query.id)
    this.gethistoryData()
    this.getOneTask()
  },
  methods: {
    async gethistoryData() {
      const res = await gethistoryData({ id: this.taskId })
      // console.log(res)
      if (res.ret === 0) {
        this.logs = res.data
        this.history = res.data[0] || []
      }
    },
    async getOneTask() {
      const res = await getOneTask({ id: this.taskId })
      if (res.ret === 0) {
        this.data = JSON.parse(JSON.stringify(res.data))
      }
    },
    historyFun(item) {
      this.history = item
      this.data.taskDetail = item.history
      this.history = item
    }
  }
}
</script>

<style lang="scss" scoped>
.broadfun_task {
    display: flex;
    min-height: calc(100vh - 100px);
    .task_left {
		flex: 1;
		padding: 15px;
		overflow: hidden;
    .stop-info {
        height:40px;
        background:rgba(230,247,255,1);
        display: flex;
        align-items: center;
        margin-top: 10px;
        padding: 0 10px;
        font-size: 12px;
        margin-bottom: 10px;
        span {
          color: #3293FF;
          cursor: pointer;
        }
        i {
          color: #3293FF;
          margin-right: 10px;
        }
      }
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
</style>
