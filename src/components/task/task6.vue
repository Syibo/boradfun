<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left"> 超级厉害娱乐信息公司 </div>
        <div class="task_name_btn">
          <el-button v-if="type === 6" type="primary" @click="statement"> 交付结单 </el-button>
          <el-button v-else-if="type === 7 && !eva" type="primary" @click="evaluation"> 评价 </el-button>
        </div>
      </div>

      <div class="task_type">
        <el-button v-if="type === 6" disabled>待审核</el-button>
        <el-button v-else disabled>已结单</el-button>
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

      <div class="task_label"> <i class="el-icon-arrow-down" @click="show = !show" /> 需求信息 </div>

      <div v-show="show" class="task_demand_detail">
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

      <div v-if="eva" class="task_eva">
        <div class="title">实施评价</div>
        <div class="task_eva_con">
          <div class="left">
            <div class="task_eva_num">90</div>
            <div>工作评分</div>
          </div>
          <div class="mid" />
          <div class="right">
            <div> <span>实际交付时间</span> 2020-02-02 20:20:20</div>
            <div> <span>实施反工次数</span> 2</div>
            <div> <span>其他补充信息</span> 这是一段其他补充信息…</div>
          </div>
        </div>
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

    <el-dialog title="结单确认" :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px" @close="close">
      <el-form ref="ruleForm" label-width="120px" label-position="top" :model="ruleForm" :rules="rules">
        <el-form-item label="包体信息" prop="checked">
          <el-row>
            <el-col :span="8">本次测试版本</el-col>
            <el-col :span="10">1.0.42</el-col>
            <el-col :span="6">
              <el-checkbox v-model="ruleForm.checked">确认无误</el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">安装包内网地址</el-col>
            <el-col :span="10">\\172.16.10.200\xasfasf</el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="测试环境信息" prop="checked">
          <el-row>
            <el-col :span="8">本次测试版本</el-col>
            <el-col :span="10">1.0.42</el-col>
            <el-col :span="6">
              <el-checkbox v-model="ruleForm.checked">确认无误</el-checkbox>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="测试账号信息" prop="checked">
          <el-row> <el-col :span="8">测试账号</el-col> <el-col :span="10">客户提供</el-col>
            <el-col :span="6"> <el-checkbox v-model="ruleForm.checked">确认无误</el-checkbox> </el-col>
          </el-row>
          <el-row> <el-col :span="8">测试账号数量</el-col> <el-col :span="10">3</el-col> </el-row>
          <el-row> <el-col :span="8">手机号码/微信数量</el-col> <el-col :span="10">300</el-col> </el-row>
          <el-row> <el-col :span="8">系统并发限制</el-col> <el-col :span="10">30</el-col> </el-row>
        </el-form-item>

        <el-form-item label="机型需求" prop="checked">
          <el-row> <el-col :span="8">机型需求</el-col> <el-col :span="10">提供手机品牌、型号及操作系统限制等</el-col>
            <el-col :span="6"> <el-checkbox v-model="ruleForm.checked">确认无误</el-checkbox> </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="其他需求" prop="checked">
          <el-row> <el-col :span="8">其他需求</el-col> <el-col :span="10">所有其他要求</el-col>
            <el-col :span="6"> <el-checkbox v-model="ruleForm.checked">确认无误</el-checkbox> </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="用例信息" prop="checked">
          <el-row> <el-col :span="8">文字用例内网地址</el-col> <el-col :span="10">\\172.16.10.200\xzfsdf\用例.xlxs</el-col>
            <el-col :span="6"> <el-checkbox v-model="ruleForm.checked">确认无误</el-checkbox> </el-col>
          </el-row>
          <el-row> <el-col :span="8">视频用例内网地址</el-col> <el-col :span="10">\\172.16.10.200\xzfsdf\用例.mp4</el-col> </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="实施评价" :visible.sync="dialogVisibleEva" :close-on-click-modal="false" width="600px" @close="closeEva">
      <el-form ref="ruleFormEva" label-width="120px" label-position="top" :model="ruleFormEva" :rules="rulesEva">
        <el-form-item label="实际交付时间" prop="name">
          <el-date-picker
            v-model="ruleFormEva.name"
            style="width: 100%"
            type="datetime"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="结单反工次数" prop="name">
          <el-input-number v-model="ruleFormEva.name" :min="1" controls-position="right" />
        </el-form-item>
        <el-form-item label="客户服务评分" prop="name">
          <el-input-number v-model="ruleFormEva.name" :min="1" controls-position="right" />
        </el-form-item>
        <el-form-item label="其他补充信息" prop="name">
          <el-input v-model="ruleFormEva.name" type="textarea" rows="5" maxlength="100" show-word-limit placeholder="请输入补充信息" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEva = false">取 消</el-button>
        <el-button type="primary" @click="submitFormEva('ruleFormEva')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Task6',
  props: {
    service: {
      type: Array,
      default: () => []
    },
    type: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      eva: false,
      show: true,
      dialogVisible: false,
      dialogVisibleEva: false,
      options: [{
        value: '项目计划变更',
        label: '项目计划变更'
      }, {
        value: '不想做了',
        label: '不想做了'
      }],
      ruleForm: {
        checked: ''
      },
      ruleFormEva: {
        name: '2020'
      },
      rulesEva: {
        name: [
          { required: true, message: '请确认信息', trigger: 'blur' }
        ]
      },
      rules: {
        checked: [
          { required: true, message: '请确认信息', trigger: 'blur' }
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
    },
    statement() {
      this.dialogVisible = true
    },
    evaluation() {
      this.dialogVisibleEva = true
    },
    statementFun() {
      this.$emit('statement')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          console.log(form)
          this.statementFun()
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitFormEva(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleFormEva
          console.log(form)
          this.eva = true
          this.show = false
          this.dialogVisibleEva = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close() {
      this.ruleForm = {
        checked: ''
      }
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    },
    closeEva() {
      this.ruleFormEva = {
        name: ''
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
.task_eva {
  background:rgba(255,178,24,0.1);
  height: 150px;
  border-radius:4px;
  padding: 10px;
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
    }
  }
}
</style>
