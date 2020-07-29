<template>
  <div>
    <div v-if="taskFrom === 2" class="task_demand_info">
      <el-form ref="ruleFormInfo" :label-position="labelPosition" label-width="140px" :model="ruleFormInfo" :rules="rulesInfo">
        <el-form-item label="本次测试版本" prop="version">
          <el-input v-model="ruleFormInfo.version" style="width: 420px" placeholder="请输入本次测试版本" />
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="安装包内网地址" prop="pkgAddress">
              <el-input v-model="ruleFormInfo.pkgAddress" style="width: 420px" placeholder="请输入安装包内网地址" />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="">
              <el-checkbox v-model="checkSame">已验证版本包体一致性</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="测试环境类型" prop="testType">
              <el-select v-model="ruleFormInfo.testType" style="width: 420px" placeholder="测试环境类型">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="ruleFormInfo.testType === '生产环境'" :span="13">
            <el-form-item label="">
              <el-checkbox v-model="checkDes">已告知客户生产环境风险</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="">
          <el-input v-model="ruleFormInfo.testExtInfo" type="textarea" rows="3" style="width: 420px" maxlength="250" show-word-limit placeholder="测试环境补充信息" />
        </el-form-item>

        <el-form-item label="白名单" prop="whiteList">
          <el-radio-group v-model="ruleFormInfo.whiteList">
            <el-radio :label="'无'">无</el-radio>
            <el-radio :label="'ip地址'">ip地址</el-radio>
            <el-radio :label="'账号白名单'">账号白名单</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="测试账号" prop="testAccountType">
          <el-select v-model="ruleFormInfo.testAccountType" style="width: 420px" placeholder="测试账号">
            <el-option v-for="item in optionsNum" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="" prop="reUse">
          <el-checkbox-group v-model="ruleFormInfo.reUse">
            <el-checkbox label="帐号互踢" />
            <el-checkbox label="帐号可重复使用" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="账号内网地址" prop="accountAddress">
          <el-input v-model="ruleFormInfo.accountAddress" style="width: 420px" placeholder="请输入账号内网地址" />
        </el-form-item>

        <el-form-item label="测试账号数量">
          <el-input-number v-model="ruleFormInfo.accountNum" :min="0" controls-position="right" />
        </el-form-item>

        <el-form-item label="手机号码/微信数量">
          <el-input-number v-model="ruleFormInfo.phoneNum" :min="0" controls-position="right" />
        </el-form-item>

        <el-form-item label="系统并发限制">
          <el-input-number v-model="ruleFormInfo.concurrentNum" :min="0" controls-position="right" />
          <span style="margin-left: 10px">无限制 则填0</span>
        </el-form-item>

        <el-form-item label="机型需求">
          <el-input v-model="ruleFormInfo.reqPhone" type="textarea" rows="5" style="width: 420px" maxlength="250" show-word-limit placeholder="提供手机品牌、型号及操作系统限制等" />
        </el-form-item>

        <el-form-item label="其他需求">
          <el-input v-model="ruleFormInfo.extReq" type="textarea" rows="5" style="width: 420px" maxlength="250" show-word-limit placeholder="所有其他要求" />
        </el-form-item>

        <el-form-item label="文字用例内网地址" prop="instanceTxt">
          <el-input v-model="ruleFormInfo.instanceTxt" style="width: 420px" placeholder="请输入文字用例内网地址" />
        </el-form-item>

        <el-form-item label="视频用例内网地址" prop="instanceMv">
          <el-input v-model="ruleFormInfo.instanceMv" style="width: 420px" placeholder="请输入视频用例内网地址" />
        </el-form-item>

        <div>
          <el-button type="primary" @click="submitFormInfo">保存</el-button>
          <el-button @click="cacelTask">取消</el-button>
        </div>

      </el-form>
    </div>

    <div v-if="taskFrom === 3" class="task_demand_detail">
      <div class="task_demand_item"> <span>本次测试版本</span> {{ data.taskDetail.version }} </div>
      <div class="task_demand_item"> <span>安装包内网地址</span> {{ data.taskDetail.pkgAddress }} </div>
      <div class="task_demand_item"> <span>测试环境类型</span> {{ data.taskDetail.testType }} </div>
      <div class="task_demand_item"> <span /> {{ data.taskDetail.testExtInfo }} </div>
      <div class="task_demand_item"> <span>白名单</span> {{ data.taskDetail.whiteList }} </div>
      <div class="task_demand_item"> <span>测试账号</span> {{ data.taskDetail.testAccountType }} </div>
      <div class="task_demand_item"> <span>测试账号数量</span> {{ data.taskDetail.accountNum }} </div>
      <div class="task_demand_item"> <span>手机号码/微信数量</span> {{ data.taskDetail.phoneNum }} </div>
      <div class="task_demand_item"> <span>系统并发限制</span> {{ data.taskDetail.concurrentNum }} </div>
      <div class="task_demand_item"> <span>机型需求</span> {{ data.taskDetail.reqPhone }} </div>
      <div class="task_demand_item"> <span>其他需求</span> {{ data.taskDetail.extReq }} </div>
      <div class="task_demand_item"> <span>文字用例内网地址</span> {{ data.taskDetail.instanceTxt }} </div>
      <div class="task_demand_item"> <span>视频用例内网地址</span> {{ data.taskDetail.instanceMv }} </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task2From',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    taskFrom: {
      type: Number,
      default: 1
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      detail: false,
      labelPosition: 'left',
      checkSame: false,
      checkDes: false,
      ruleFormInfo: {
        'accountAddress': '',
        'accountNum': 0,
        'changeLog': '',
        'concurrentNum': 0,
        'extReq': '',
        'instanceMv': '',
        'instanceTxt': '',
        'phoneNum': 0,
        'pkgAddress': '',
        'reUse': [],
        'reqPhone': '',
        'testAccountType': '',
        'testExtInfo': '',
        'testType': '',
        'version': '',
        'whiteList': '',
        'realServiceId': 0,
        'realAmount': 0,
        'expDeliverTime': '',
        'expEndTime': ''
      },
      rulesInfo: {
        version: [
          { required: true, message: '请输入版本', trigger: 'blur' }
        ],
        pkgAddress: [
          { required: true, message: '请输入安装包内网地址', trigger: 'blur' }
        ],
        testType: [
          { required: true, message: '请选择测试环境类型', trigger: 'change' }
        ],
        whiteList: [
          { required: true, message: '请选择白名单', trigger: 'change' }
        ],
        testAccountType: [
          { required: true, message: '请选择测试账号', trigger: 'change' }
        ],
        accountAddress: [
          { required: true, message: '请输入账号内网地址', trigger: 'blur' }
        ],
        instanceTxt: [
          { required: true, message: '请输入文字用例内网地址', trigger: 'blur' }
        ],
        instanceMv: [
          { required: true, message: '请输入视频用例内网地址', trigger: 'blur' }
        ]
      },
      options: [{
        value: '测试环境',
        label: '测试环境'
      }, {
        value: '生产环境',
        label: '生产环境'
      }],
      optionsNum: [{
        value: '客户提供',
        label: '客户提供'
      }, {
        value: '微信注册',
        label: '微信注册'
      }, {
        value: '手机号码注册',
        label: '手机号码注册'
      }],
      ruleFormInfoCopy: {}
    }
  },
  watch: {
    data(newData, prevData) {
      this.ruleFormInfo = newData.taskDetail
      this.ruleFormInfo.checkSame = []
      this.ruleFormInfoCopy = JSON.parse(JSON.stringify(newData.taskDetail))
      if (this.ruleFormInfo.reUse === '') {
        this.ruleFormInfo.reUse = []
        this.ruleFormInfoCopy.reUse = []
      } else {
        this.ruleFormInfo.reUse = newData.taskDetail.reUse.split(',')
        this.ruleFormInfoCopy.reUse = newData.taskDetail.reUse
      }
    }
  },
  mounted() {
    this.ruleFormInfo = this.data.taskDetail
    this.ruleFormInfo.checkSame = []
    this.ruleFormInfoCopy = JSON.parse(JSON.stringify(this.data.taskDetail))
    if (this.ruleFormInfo.reUse === '' || this.ruleFormInfo.reUse === undefined) {
      this.ruleFormInfo.reUse = []
      this.ruleFormInfoCopy.reUse = []
    } else {
      this.ruleFormInfo.reUse = this.data.taskDetail.reUse.split(',')
      this.ruleFormInfoCopy.reUse = this.data.taskDetail.reUse
    }
  },
  methods: {
    cacelTask() {
      this.ruleFormInfo = this.ruleFormInfoCopy
      this.$emit('cacelTask', this.isEdit)
    },
    submitFormInfo() {
      this.$refs['ruleFormInfo'].validate((valid) => {
        if (valid) {
          if (!this.checkSame) {
            this.$message.closeAll()
            this.$message.error('请确定版本包体一致性')
            return
          }
          if (!this.checkDes && this.ruleFormInfo.testType === '生产环境') {
            this.$message.closeAll()
            this.$message.error('请确定已告知客户生产环境风险')
            return
          }
          this.checkTask()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    checkTask() {
      this.ruleFormInfoCopy = JSON.parse(JSON.stringify(this.ruleFormInfo))
      this.$emit('saveTask', this.ruleFormInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.task_demand_info {
  background-color: #F7F8FA;
  padding: 15px;
}
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
</style>
