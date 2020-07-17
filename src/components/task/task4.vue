<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left"> 超级厉害娱乐信息公司 </div>
        <div class="task_name_btn">
          <el-button v-if="type === 4" type="primary" @click="startTask"> 启动执行 </el-button>
          <div v-else>
            <el-button type="primary" style="margin-right: 10px"> 执行完成 </el-button>
            <el-dropdown>
              <span class="el-dropdown-link">
                更多操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>任务暂停</el-dropdown-item>
                <el-dropdown-item>需求变更</el-dropdown-item>
                <el-dropdown-item>任务取消</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

      <div class="task_type">
        <el-button v-if="type === 4" disabled>待执行</el-button>
        <el-button v-else style="color: #FFB959; border-color: #FFC069" disabled>执行中</el-button>
      </div>

      <div class="task_label"> 基本信息 </div>

      <el-row class="task_info">
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 应用/游戏名称 </span>
          <span class="task_info_con"> 王者荣耀 </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 期望测试日期 </span>
          <span class="task_info_con"> 2020-02-02 20:20:20 </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务类型 </span>
          <span class="task_info_con"> 深度兼容-Android 300 </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 期望结单日期 </span>
          <span class="task_info_con"> 2020-02-02 20:20:20 </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务额度 </span>
          <span class="task_info_con"> 3 </span>
        </el-col>
      </el-row>

      <div class="task_label"> 指派信息 </div>
      <el-row class="task_info">
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务类型 </span>
          <span class="task_info_con"> 深度兼容-Android 300 </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 处理人 </span>
          <span class="task_info_con"> tony </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务额度 </span>
          <span class="task_info_con"> 3 </span>
        </el-col>
      </el-row>

      <div class="task_label"> 需求信息 </div>

      <div class="task_demand_detail">
        <div class="task_demand_item"> <span>本次测试版本</span> 1.0.42 </div>
        <div class="task_demand_item"> <span>安装包内网地址</span> \\172.16.10.200\xasfasf </div>
        <div class="task_demand_item"> <span>测试环境类型</span> 正式环境 </div>
        <div class="task_demand_item"> <span /> 测试环境补充信息 </div>
        <div class="task_demand_item"> <span>白名单</span> 无 </div>
        <div class="task_demand_item"> <span>测试账号</span> 客户提供 </div>
        <div class="task_demand_item"> <span>测试账号数量</span> 3 </div>
        <div class="task_demand_item"> <span>手机号码/微信数量</span> 300 </div>
        <div class="task_demand_item"> <span>系统并发限制</span> 30 </div>
        <div class="task_demand_item"> <span>机型需求</span> 提供手机品牌、型号及操作系统限制等 </div>
        <div class="task_demand_item"> <span>其他需求</span> 所有其他要求 </div>
        <div class="task_demand_item"> <span>文字用例内网地址</span> \\172.16.10.200\xzfsdf\用例.xlxs </div>
        <div class="task_demand_item"> <span>视频用例内网地址</span> \\172.16.10.200\xzfsdf\用例.xlxs </div>
      </div>
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
  </div>
</template>

<script>
export default {
  name: 'Task4',
  props: {
    service: {
      type: Array,
      default: () => []
    },
    type: {
      type: Number,
      default: 4
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
        serviceId: '',
        preAmount: ''
      },
      rules: {
        serviceId: [
          { required: true, message: '请选择服务', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    startTask() {
      this.$confirm('确认启动此任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$emit('startTask')
      }).catch(() => {})
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
</style>
