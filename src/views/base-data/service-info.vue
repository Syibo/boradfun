<template>
  <div class="service_info">
    <div class="service_btn">
      <!-- <el-button>额度调整</el-button> -->
    </div>
    <div class="service_name">
      {{ serviceInfo.service_name }}
    </div>
    <el-row :gutter="20" class="amount">
      <el-col :span="8">
        <div class="amount_item">
          <div>总额度</div>
          <div>{{ serviceInfo.amount }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="amount_item">
          <div>已使用</div>
          <div>{{ serviceInfo.used }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="amount_item">
          <div>剩余</div>
          <div>{{ serviceInfo.remain }}</div>
        </div>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="额度订单" name="first">
        <el-table :data="logData" header-cell-class-name="table-header-style" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.logs" style="width: 100%;padding: 0">
                <el-table-column prop="real_time" label="发生日期" />
                <el-table-column prop="change" label="" />
                <el-table-column prop="desc" width="500" label="" />
                <el-table-column prop="remark" label="" />
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="orderNumber" label="订单编号" />
          <el-table-column prop="amount" label="剩余额度" />
          <el-table-column prop="deadline" label="过期时间" />
          <el-table-column prop="" label="状态">
            <template slot-scope="scope">
              <span> {{ isOverTime(scope.row.deadline) ? '已逾期' : '正常' }} </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="120">
            <template v-if="isOverTime(scope.row.deadline)" slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">额度延期</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="额度消耗记录" name="second">
        <el-table :data="taskLogData" header-cell-class-name="table-header-style" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.logs" style="width: 100%;padding: 0">
                <el-table-column prop="UpdatedAt" label="发生日期" />
                <el-table-column prop="" label="" />
                <el-table-column prop="change" label="" />
                <el-table-column prop="desc" width="400" label="" />
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="taskSerial" label="taskSerial" />
          <el-table-column prop="amount" label="额度变化" />
          <el-table-column align="center" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">退次</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 额度转换 -->
    <el-dialog title="额度延期" :visible.sync="dialogVisibleChange" :close-on-click-modal="false" width="500px" @close="closeChange">
      <el-form ref="ruleFormChange" label-position="top" :model="ruleFormChange" :rules="rulesChange" class="demo-ruleForm">
        <!-- <div class="dialog_item">客户编号 {{ cusInfo.number }}</div>
        <div class="dialog_item">客户名称 {{ cusInfo.name }}</div> -->
        <el-form-item label="额度到期日期" prop="deadline">
          <el-date-picker
            v-model="ruleFormChange.deadline"
            style="width: 100%"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input v-model="ruleFormChange.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleChange = false">取 消</el-button>
        <el-button type="primary" @click="submitFormChange('ruleFormChange')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCusAmountList, handAmountLog, handTaskLog, delayAmount } from '@/api/service'
import Moment from 'moment'
export default {
  name: 'ServiceInfo',
  data() {
    return {
      dialogVisibleChange: false,
      rulesChange: {
        deadline: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      ruleFormChange: {
        id: '',
        deadline: '',
        remark: ''
      },
      cusId: '',
      serviceId: '',
      serviceInfo: {},
      activeName: 'first',
      logData: [],
      taskLogData: []
    }
  },
  mounted() {
    this.cusId = this.$route.query.cusId
    this.serviceId = this.$route.query.serviceId
    this.getCusAmountList()
    this.handAmountLog()
    this.handTaskLog()
  },
  methods: {
    async getCusAmountList() {
      const res = await getCusAmountList({ clientId: this.cusId, deadline: '' })
      const _this = this
      _this.serviceInfo = res.data.find(function(elem) {
        // eslint-disable-next-line eqeqeq
        return elem.service_id == _this.serviceId
      })
    },
    async handAmountLog() {
      const res = await handAmountLog({ clientId: this.cusId, serviceId: this.serviceId })
      if (res.ret === 0) {
        this.logData = res.data
      }
    },
    async handTaskLog() {
      const res = await handTaskLog({ clientId: this.cusId, serviceId: this.serviceId })
      if (res.ret === 0) {
        this.taskLogData = res.data
      }
    },
    isOverTime(time) {
      var now = Moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
      const isOverTime = Moment(time).isBefore(now)
      return isOverTime
    },
    handleClick(row) {
      console.log(row)
      this.ruleFormChange.id = row.id
      this.dialogVisibleChange = true
    },
    submitFormChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleFormChange
          console.log(form)
          this.delayAmount(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async delayAmount(form) {
      const res = await delayAmount(form)
      if (res.ret === 0) {
        this.handAmountLog()
        this.handTaskLog()
      }
    },
    closeChange() {
      this.ruleFormChange = {
        id: '',
        deadline: '',
        remark: ''
      }
    }
  }
}
</script>
<style lang="scss">
.service_info{
  .el-table__expanded-cell {
    padding: 0 50px;
  }
}
</style>
<style lang="scss" scoped>
.service_info {
  background-color: white;
  .service_btn {
    display: flex;
    justify-content: flex-end;
  }
  .service_name {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .amount {
    margin-bottom: 20px;
    .amount_item {
      background-color: #f1f1f1;
      height: 100px;
      padding: 20px;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
