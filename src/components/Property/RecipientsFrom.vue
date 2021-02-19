<template>
  <el-dialog title="设备领用申请" :visible="visible" :close-on-click-modal="false" width="800px" @close="closeVisble">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="请选择项目">
            <el-select v-model="ruleForm.project" placeholder="请选择项目" style="width: 100%" @change="proChange">
              <el-option v-for="item in projectList" :key="item.ID" :label="item.engagement_code_desc" :value="item.engagement_code_desc" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核人">
            <el-input v-model="people" placeholder="审核人" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="基本信息">
            <div class="base-cla">
              <el-row><span>申请人</span>{{ employee.name || '' }}</el-row>
              <el-row><span>所在部门</span>{{ employee.department.department_name || '' }}</el-row>
              <el-row>
                <span>领用设备</span>{{ device.device_name || '' }}
                <el-popover
                  placement="bottom-start"
                  width="200"
                  trigger="hover"
                >
                  <el-row>
                    <el-row class="margin-b-10">
                      <el-col :span="12">设备类型</el-col> <el-col :span="12">{{ device.device_category }}</el-col>
                    </el-row>
                    <el-row class="margin-b-10"> <el-col :span="12">资产编号</el-col> <el-col :span="12">{{ device.device_code }}</el-col> </el-row>
                    <el-row class="margin-b-10"> <el-col :span="12">设备名称</el-col> <el-col :span="12">{{ device.device_name }}</el-col> </el-row>
                    <el-row class="margin-b-10"> <el-col :span="12">CPU</el-col> <el-col :span="12">{{ device.cpu }}</el-col> </el-row>
                    <el-row class="margin-b-10"> <el-col :span="12">运存</el-col> <el-col :span="12">{{ device.mem }}</el-col> </el-row>
                    <el-row class="margin-b-10"> <el-col :span="12">显卡</el-col> <el-col :span="12">{{ }}</el-col> </el-row>
                    <el-row class="margin-b-10"> <el-col :span="12">储存容量</el-col> <el-col :span="12">{{ device.volume }}</el-col> </el-row>
                    <el-row class="margin-b-10"> <el-col :span="12">状态</el-col> <el-col :span="12"> <ProStatus :status="device.device_status" /></el-col> </el-row>
                    <el-row class="margin-b-10"> <el-col :span="12">序列号</el-col> <el-col :span="12">{{ device.mac_address_1 }}</el-col> </el-row>
                  </el-row>
                  <i slot="reference" class="el-icon-warning" style="color: #999" />
                </el-popover>
              </el-row>
              <el-row><span>已领用设备</span>{{ collect_devices || '' }}</el-row>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeVisble">取 消</el-button>
      <el-button type="primary" @click="checkBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { rulesCon } from '@/views/archives/config'
import { deviceProjects, deviceApplyInfo, deviceApply } from '@/api/property'
import { mapGetters } from 'vuex'
import ProStatus from '@/components/Property/ProStatus'
export default {
  name: 'RecipientsFrom',
  components: {
    ProStatus
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      projectList: [],
      people: '',
      ruleForm: {
        'engagement_code': '',
        'device_id': 0,
        'project': '',
        'leader_id': ''
      },
      rules: rulesCon,
      myHeaders: {},
      api: '',
      eleContract: [],
      eleContractScanned: [],
      employee: {
        department: {}
      },
      device: {},
      collect_devices: ''
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  watch: {
    visible: {
      handler(value) {
        if (value && this.id) {
          this.init()
        }
      }
    }
  },
  mounted() {},
  methods: {
    async init() {
      if (this.id) {
        const res = await deviceProjects()
        if (res.ret === 0) {
          this.projectList = res.data
        }
        const res3 = await deviceApplyInfo({ employee_id: this.userId, device_id: this.id })
        if (res3.ret === 0) {
          this.employee = res3.data.employee
          this.device = res3.data.device
          this.collect_devices = res3.data.collect_devices
        }
      }
    },
    proChange(val) {
      const obj = this.projectList.find((item) => { return item.engagement_code_desc === val })
      if (obj) {
        this.people = `${obj.owner.name}`
        this.ruleForm.engagement_code = obj.engagement_code
        this.ruleForm.leader_id = obj.code_owner_id
      }
    },
    async checkBtn() {
      this.ruleForm.device_id = this.id
      const res = await deviceApply(this.ruleForm)
      if (res.ret === 0) {
        this.$message.success('申请成功')
        this.$emit('success')
      }
    },
    closeVisble() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        contract_type: '', contract_party: '', contract_main: '', contract_start_date: '', contract_end_date: '',
        trial_period: 6, annual_leave: '', status, soft_copy: '', scanned_copy: '', ID: ''
      }
      this.$emit('close')
      this.eleContract = []
      this.eleContractScanned = []
    }
  }
}
</script>

<style lang="scss" scoped>
.base-cla {
  padding: 5px;
  padding-left: 15px;
  background-color:#F7F8FA;
  span {
    display: inline-block;
    width: 100px;
  }
}
.contract-from {
  .el-dialog__header {
    padding: 0;
  }
  .el-input-number {
    text-align: left!important;
  }
}
</style>
