<template>
  <div class="container">
    <el-row class="baradfun-top">
      <el-button type="primary" @click="add">新增客户</el-button>
    </el-row>

    <el-row :gutter="20">
      <el-col v-for="item in tableData" :key="item.name" :span="8">
        <el-card class="box-card" @click.native="goCusInfo">
          <div class="cus_num"> #{{ item.number }} </div>
          <div class="cus_name">
            <div class="cus_name_black">
              {{ item.name }}
              <span>{{ item.level }}</span>
            </div>
            <div class="cus_type"> {{ item.type === 0 ? "内部客户" : "外部客户" }} </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" align="center" label="姓名" />
      <el-table-column prop="level" align="center" label="客户等级" />
      <el-table-column prop="number" align="center" label="number" />
      <el-table-column prop="saleId" align="center" label="saleId" />
      <el-table-column prop="subManageId" align="center" label="subManageId" />
      <el-table-column prop="type" align="center" label="type" />
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span> {{ getMoment(scope.row.CreatedAt) }} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button :disabled="true" type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button :disabled="true" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <el-dialog title="新增客户" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px" @open="open">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客户编号" prop="number">
          <el-input v-model="ruleForm.number" />
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="客户分类" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="0"> 内部 </el-radio>
            <el-radio :label="1"> 外部 </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="重要级别" prop="level">
          <el-radio-group v-model="ruleForm.level">
            <el-radio label="S"> S </el-radio>
            <el-radio label="A"> A </el-radio>
            <el-radio label="B"> B </el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="server_info">服务信息</div>
        <el-form-item label="销售" prop="leaderId">
          <el-select v-model="ruleForm.leaderId" style="width: 100%" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.ID"
              :label="item.name"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客户服务经理(主)" prop="leaderId">
          <el-select v-model="ruleForm.leaderId" style="width: 100%" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.ID"
              :label="item.name"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客户服务经理(副)" prop="leaderId">
          <el-select v-model="ruleForm.leaderId" style="width: 100%" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.ID"
              :label="item.name"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getClientList } from '@/api/customer'
import Moment from 'moment'
export default {
  name: 'Customer',
  data() {
    return {
      currentPage: 2,
      dialogVisible: false,
      ruleForm: {
        name: '',
        number: '',
        type: '',
        level: ''
      },
      options: [],
      rules: {
        name: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入客户编号', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择客户分类', trigger: 'change' }
        ],
        level: [
          { required: true, message: '请选择重要级别', trigger: 'change' }
        ]
      },
      tableData: []
    }
  },
  async mounted() {
    this.init()
  },
  methods: {
    handleClick() {},
    async init() {
      const res = await getClientList()
      this.tableData = res.data
    },
    add() {
      console.log(8888888888)
      this.dialogVisible = true
    },
    goCusInfo() {
      console.log(4444)
      this.$router.push({
        path: '/base/customer/cusInfo'
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          console.log(form)
          // this.addUser(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getMoment(date) {
      return Moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    open() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .block {
    position: absolute;
    bottom: 10px;
    right: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .box-card {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    .cus_num {
      color: #999;
      margin-bottom: 10px;
      font-size: 12px;
    }
    .cus_name {
      display: flex;
      align-items: center;
      .cus_name_black {
        color: #333;
        font-weight: bold;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: chocolate;
          border-radius: 20px;
          line-height: 20px;
          text-align: center;
          font-weight: normal;
          color: white;
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
    .cus_type {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
  }
  .server_info {
    font-size: 18px;
    margin: 10px 0;
    font-weight: bold;
  }
}
</style>
