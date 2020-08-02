<template>
  <el-dialog title="结单确认" :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px" @close="close">
    <el-form ref="ruleForm" label-width="120px" label-position="top" :model="ruleForm" :rules="rules">
      <el-form-item label="包体信息" prop="checkedInfo">
        <el-row>
          <el-col :span="8">本次测试版本</el-col>
          <el-col :span="10">{{ data.taskDetail.version }}</el-col>
          <el-col :span="6">
            <el-checkbox-group v-model="ruleForm.checkedInfo">
              <el-checkbox :label="'确认无误'" name="checkedInfo" />
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">安装包内网地址</el-col>
          <el-col :span="10">{{ data.taskDetail.pkgAddress }}</el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="测试环境信息" prop="checkedEnv">
        <el-row>
          <el-col :span="8">测试环境类型</el-col>
          <el-col :span="10">{{ data.taskDetail.testType }}</el-col>
          <el-col :span="6">
            <el-checkbox-group v-model="ruleForm.checkedEnv">
              <el-checkbox label="确认无误" />
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="测试账号信息" prop="checkedNum">
        <el-row> <el-col :span="8">测试账号</el-col> <el-col :span="10">{{ data.taskDetail.testAccountType }}</el-col>
          <el-col :span="6">
            <el-checkbox-group v-model="ruleForm.checkedNum">
              <el-checkbox label="确认无误" />
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row> <el-col :span="8">测试账号数量</el-col> <el-col :span="10">{{ data.taskDetail.accountNum }}</el-col> </el-row>
        <el-row> <el-col :span="8">手机号码/微信数量</el-col> <el-col :span="10">{{ data.taskDetail.phoneNum }}</el-col> </el-row>
        <el-row> <el-col :span="8">系统并发限制</el-col> <el-col :span="10">{{ data.taskDetail.concurrentNum }}</el-col> </el-row>
      </el-form-item>

      <el-form-item label="机型需求" prop="checkedPhone">
        <el-row> <el-col :span="8">机型需求</el-col> <el-col :span="10"> {{ data.taskDetail.reqPhone ? data.taskDetail.reqPhone : '-' }} </el-col>
          <el-col :span="6">
            <el-checkbox-group v-model="ruleForm.checkedPhone">
              <el-checkbox label="确认无误" />
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="其他需求" prop="checkedOther">
        <el-row> <el-col :span="8">其他需求</el-col> <el-col :span="10"> {{ data.taskDetail.extReq ? data.taskDetail.extReq : '-' }} </el-col>
          <el-col :span="6">
            <el-checkbox-group v-model="ruleForm.checkedOther">
              <el-checkbox label="确认无误" />
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="用例信息" prop="checkedCase">
        <el-row> <el-col :span="8">文字用例内网地址</el-col> <el-col :span="10">{{ data.taskDetail.instanceTxt }} </el-col>
          <el-col :span="6">
            <el-checkbox-group v-model="ruleForm.checkedCase">
              <el-checkbox label="确认无误" />
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row> <el-col :span="8">视频用例内网地址</el-col> <el-col :span="10">{{ data.taskDetail.instanceMv }} </el-col> </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name: 'CheckDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    baseData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {
        checkedInfo: [],
        checkedEnv: [],
        checkedNum: [],
        checkedPhone: [],
        checkedOther: [],
        checkedCase: []
      },
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
      rules: {
        checkedInfo: [
          { type: 'array', required: true, message: '请确认信息', trigger: 'change' }
        ],
        checkedEnv: [
          { type: 'array', required: true, message: '请确认信息', trigger: 'change' }
        ],
        checkedNum: [
          { type: 'array', required: true, message: '请确认信息', trigger: 'change' }
        ],
        checkedPhone: [
          { type: 'array', required: true, message: '请确认信息', trigger: 'change' }
        ],
        checkedOther: [
          { type: 'array', required: true, message: '请确认信息', trigger: 'change' }
        ],
        checkedCase: [
          { type: 'array', required: true, message: '请确认信息', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    baseData(newData, prevData) {
      this.data = newData
    }
  },
  mounted() {

  },
  methods: {
    async statementFun() {
      this.$emit('check')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.statementFun()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialog() {
      this.$emit('update:dialogVisible', false)
    },
    close() {
      this.ruleForm = {
        checkedInfo: [],
        checkedEnv: [],
        checkedNum: [],
        checkedPhone: [],
        checkedOther: [],
        checkedCase: []
      }
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
