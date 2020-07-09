<template>
  <div class="cus_info">
    <router-view />
    <div v-if="this.$route.path === '/base/customer/info'" style="padding: 15px">
      <div class="cus_detail">
        <div class="cus_name">客户A <span class="level_class S">s</span></div>
        <div class="cus_type">内部客户</div>
      </div>
      <div class="blue_label"> <span /> 基本信息 </div>
      <div class="info_container">
        <div class="info_item">
          <div class="info_type">销售</div>
          <div class="info_name">周杰伦</div>
        </div>
        <div class="info_item">
          <div class="info_type">客户服务经理(主)</div>
          <div class="info_name">林俊杰</div>
        </div>
        <div class="info_item">
          <div class="info_type">客户服务经理(副)</div>
          <div class="info_name">王力宏</div>
        </div>
      </div>
      <div class="blue_label"> <span /> 服务信息 </div>
      <div class="info_content">
        <el-row :gutter="20">
          <el-col v-for="item in 4" :key="item" :span="8" @click.native="goSerInfo">
            <div class="service_item">
              <div class="service_name">
                深度兼容-androad 300
              </div>
              <div class="service_content">
                <div class="service_mid">
                  <div class="service_type">10</div>
                  <div class="service_num">总额度</div>
                </div>
                <div class="service_mid">
                  <div class="service_type">10</div>
                  <div class="service_num">总额度</div>
                </div>
                <div class="service_mid">
                  <div class="service_type">10</div>
                  <div class="service_num">总额度</div>
                </div>
                <div class="service_time_out">
                  <div class="service_num">已逾期1</div>
                </div>
              </div>
              <div class="service_bot">
                最近到期时间：2020-07-09
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

      <el-dialog title="购买服务" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px" @open="open">
        <div class="dialog_item">客户编号</div>
        <div class="dialog_item">客户名称</div>
        <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="服务类型" prop="number">
            <el-select v-model="ruleForm.type" style="width: 100%" placeholder="请选择">
              <el-option
                v-for="item in serviceList"
                :key="item.ID"
                :label="item.serviceName"
                :value="item.ID"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="采购额度" prop="name">
            <el-input-number v-model="ruleForm.number" controls-position="right" />
          </el-form-item>
          <el-form-item label="额度到期日期" prop="type">
            <el-date-picker
              v-model="ruleForm.overdate"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="备注" prop="level">
            <el-input type="textarea" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="ç('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/service'
export default {
  name: 'CusInfo',
  data() {
    return {
      cusId: '',
      dialogVisible: false,
      serviceList: [],
      ruleForm: {},
      rules: {}
    }
  },
  mounted() {
    this.getServiceList()
    this.cusId = this.$route.query.id
  },
  methods: {
    buyService() {
      this.dialogVisible = true
    },
    async getServiceList() {
      const res = await getList()
      this.serviceList = res.data
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          this.addClient(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    open() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    },
    goSerInfo() {
      this.$router.push({
        path: '/base/customer/info/ser'
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
