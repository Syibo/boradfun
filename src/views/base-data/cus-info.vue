<template>
  <div class="cus_info">
    <router-view />
    <div v-if="this.$route.path === '/base/customer/info'" style="padding: 15px">
      <div class="cus_detail">
        <div class="cus_name">{{ cusInfo.name }}
          <span v-if="cusInfo.level === 'S'" class="level_class S">{{ cusInfo.level }}</span>
          <span v-else-if="cusInfo.level === 'A'" class="level_class A">{{ cusInfo.level }}</span>
          <span v-else class="level_class B">{{ cusInfo.level }}</span>
        </div>
        <div class="cus_type">{{ cusInfo.type === 0 ? "内部客户" : "外部客户" }}</div>
      </div>
      <div class="blue_label"> <span /> 基本信息 </div>
      <div class="info_container">
        <div class="info_item">
          <div class="info_type">销售</div>
          <div class="info_name">{{ cusInfo.sale.name }}</div>
        </div>
        <div class="info_item">
          <div class="info_type">客户服务经理(主)</div>
          <div class="info_name">{{ cusInfo.manager.name }}</div>
        </div>
        <div class="info_item">
          <div class="info_type">客户服务经理(副)</div>
          <div class="info_name">{{ cusInfo.subManager.name }}</div>
        </div>
      </div>
      <div class="blue_label"> <span /> <i>服务信息</i>  <el-button type="primary" @click="amountChange">额度转换</el-button></div>
      <div class="info_content">
        <el-row :gutter="20">
          <el-col v-for="(item, index) in serviceInfo" :key="index" :span="8" @click.native="goSerInfo(item.service_id)">
            <div class="service_item">
              <div class="service_name">
                {{ item.service_name }}
              </div>
              <div class="service_content">
                <div class="service_mid">
                  <div class="service_type">{{ item.amount }}</div>
                  <div class="service_num">总额度</div>
                </div>
                <div class="service_mid">
                  <div class="service_type">{{ item.used }}</div>
                  <div class="service_num">已使用</div>
                </div>
                <div class="service_mid">
                  <div class="service_type">{{ item.remain }}</div>
                  <div class="service_num">剩余</div>
                </div>
                <div class="service_time_out">
                  <div class="service_num">已逾期 {{ item.delay }}</div>
                </div>
              </div>
              <div class="service_bot">
                最近到期时间：{{ item.deadline }}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="buy_service">
              <el-button type="text" icon="el-icon-circle-plus-outline" @click="buyService">购买服务</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-dialog title="购买服务" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px" @close="open">
        <div class="dialog_item">客户编号 {{ cusInfo.number }}</div>
        <div class="dialog_item">客户名称 {{ cusInfo.name }}</div>
        <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="服务类型" prop="serviceId">
            <el-select v-model="ruleForm.serviceId" style="width: 100%" placeholder="请选择">
              <el-option
                v-for="item in serviceList"
                :key="item.ID"
                :label="item.serviceName"
                :value="item.ID"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="采购额度" prop="amount">
            <el-input-number v-model="ruleForm.amount" :min="1" controls-position="right" />
          </el-form-item>
          <el-form-item label="额度到期日期" prop="deadline">
            <el-date-picker
              v-model="ruleForm.deadline"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="optiondate"
            />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="ruleForm.remark" type="textarea" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 额度转换 -->
      <el-dialog title="额度转换" :visible.sync="dialogVisibleChange" :close-on-click-modal="false" width="500px" @close="closeChange">
        <el-form ref="ruleFormChange" label-position="top" :model="ruleFormChange" :rules="rulesChange" class="demo-ruleForm">
          <div class="dialog_item">客户编号 {{ cusInfo.number }}</div>
          <div class="dialog_item">客户名称 {{ cusInfo.name }}</div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="转出服务名称" prop="sOutId">
                <el-select v-model="ruleFormChange.sOutId" style="width: 100%" placeholder="请选择">
                  <el-option
                    v-for="item in serviceInfo"
                    :key="item.service_id"
                    :label="item.service_name"
                    :value="item.service_id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转入服务名称" prop="sOutId">
                <el-select v-model="ruleFormChange.sInId" style="width: 100%" placeholder="请选择">
                  <el-option
                    v-for="item in serviceInfo"
                    :key="item.service_id"
                    :label="item.service_name"
                    :value="item.service_id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="转出服务额度" prop="sOutNum">
                <el-input-number v-model="ruleFormChange.sOutNum" :min="1" controls-position="right" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="转入服务额度" prop="sOutNum">
                <el-input-number v-model="ruleFormChange.sInNum" :min="1" controls-position="right" />
              </el-form-item>
            </el-col>
          </el-row>
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
  </div>
</template>

<script>
import { getList, addAmount, getCusAmountList, handAmountSwitch } from '@/api/service'
import { getClientinfo } from '@/api/customer'
import Moment from 'moment'
export default {
  name: 'CusInfo',
  data() {
    return {
      cusId: '',
      dialogVisible: false,
      dialogVisibleChange: false,
      serviceList: [],
      ruleForm: {
        clientId: '',
        serviceId: '',
        amount: 1,
        deadline: '',
        orderNumber: '',
        remark: ''
      },
      ruleFormChange: {
        sOutId: '',
        sInId: '',
        sOutNum: 1,
        sInNum: 1,
        remark: ''
      },
      rules: {
        serviceId: [
          { required: true, message: '请选择服务', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请输入额度', trigger: 'blur' }
        ],
        deadline: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      rulesChange: {
        sOutId: [
          { required: true, message: '请选择服务', trigger: 'change' }
        ],
        sOutNum: [
          { required: true, message: '请输入额度', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请填写备注', trigger: 'blur' }
        ]
      },
      cusInfo: {
        name: '',
        sale: {},
        manager: {},
        subManager: {}
      },
      serviceInfo: [],
      optiondate: {
        disabledDate(date) {
          return date.getTime() <= Date.now()
        }
      }
    }
  },
  mounted() {
    if (this.$route.path === '/base/customer/info') {
      this.cusId = this.$route.query.id
      this.getClientinfo()
      this.getServiceList()
      this.getCusAmountList()
    }
  },
  methods: {
    buyService() {
      this.dialogVisible = true
    },
    amountChange() {
      this.dialogVisibleChange = true
    },
    async getClientinfo() {
      const res = await getClientinfo({ id: this.cusId })
      this.cusInfo = res.data
    },
    async getCusAmountList() {
      const res = await getCusAmountList({ clientId: this.cusId, deadline: '' })
      this.serviceInfo = res.data
    },
    async getServiceList() {
      const res = await getList()
      this.serviceList = res.data
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          this.addAmount(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitFormChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleFormChange
          this.handAmountSwitch(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async addAmount(form) {
      const da = new Date()
      const bu = Moment(da).format('YYYY-MM-DD HH:mm:ss')
      form.orderNumber = bu
      form.clientId = Number(this.cusInfo.ID)
      const res = await addAmount(form)
      if (res.ret === 0) {
        this.$message.success('购买服务成功')
        this.dialogVisible = false
        this.getCusAmountList()
      }
    },
    async handAmountSwitch(form) {
      form.clientId = Number(this.cusInfo.ID)
      if (form.sInId === form.sOutId) {
        this.$message.error('相同服务不能转换')
        return
      }
      const res = await handAmountSwitch(form)
      if (res.ret === 0) {
        this.$message.success('转换服务成功')
        this.dialogVisibleChange = false
        this.getCusAmountList()
      }
    },
    open() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        clientId: '',
        serviceId: '',
        amount: 1,
        deadline: '',
        orderNumber: '',
        remark: ''
      }
    },
    closeChange() {
      if (this.$refs['ruleFormChange']) {
        this.$refs['ruleFormChange'].resetFields()
      }
      this.ruleFormChange = {
        sOutId: '',
        sInId: '',
        sOutNum: 1,
        sInNum: 1,
        remark: ''
      }
    },
    goSerInfo(serviceId) {
      this.$router.push({
        path: '/base/customer/info/ser',
        query: {
          cusId: this.cusId,
          serviceId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cus_info {
  .cus_detail {
    background-color: white;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    .cus_name {
      color: #333;
      font-size: 20px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .cus_type {
      color: #999;
    }
  }
  .blue_label {
    display: flex;
    align-items: center;
    color: #333;
    margin-bottom: 20px;
    margin-top: 30px;
    i {
      flex: 1;
      font-style: normal;
    }
    span {
      width: 3px;
      height: 15px;
      background-color: blue;
      margin-right: 5px;
    }
  }
  .info_container {
    .info_item {
      display: flex;
      height: 30px;
      align-items: center;
      .info_type {
        color: #999;
        width: 200px;
      }
      .info_name {
        color: #333;
      }
    }
  }
  .info_content {
    background-color: #f1f1f1;
    padding: 15px;
    .service_item {
      background-color: white;
      margin-bottom: 20px;
      cursor: pointer;
      .service_name {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        border-bottom: 1px solid #f1f1f1;
      }
      .service_content {
        display: flex;
        height: 100px;
        align-items: center;
        padding: 0 10px;
        border-bottom: 1px solid #f1f1f1;
        .service_mid {
          display: flex;
          flex-direction: column;
          margin-right: 5px;
          .service_type {
            color: #333;
            font-size: 20px;
            margin-bottom: 5px;
          }
          .service_num {
            color: #999;
            font-size: 12px;
          }
        }
        .service_time_out {
          display: flex;
          height: 41px;
          flex-direction: column;
          justify-content: flex-end;
          font-size: 12px;
          color: red;
        }
      }
      .service_bot {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        color: #666;
        font-size: 14px;
      }
    }
    .buy_service {
      height: 180px;
      outline: 1px dashed #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .dialog_item {
    height: 30px;
    line-height: 30px;
  }
}
</style>
