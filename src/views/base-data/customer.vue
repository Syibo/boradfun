<template>
  <div class="container">
    <router-view />
    <div v-if="this.$route.path === '/base/customer'">
      <el-row class="baradfun-top">
        <el-button type="primary" @click="add">新增客户</el-button>
      </el-row>

      <el-row :gutter="20">
        <el-col v-for="item in tableData" :key="item.name" :span="8">
          <el-card class="box-card" @click.native="goCusInfo(item.ID)">
            <div class="cus_num"> #{{ item.number }} </div>
            <div class="cus_name">
              <div class="cus_name_black">
                {{ item.name }}
                <span v-if="item.level === 'S'" class="level_class S">{{ item.level }}</span>
                <span v-else-if="item.level === 'A'" class="level_class A">{{ item.level }}</span>
                <span v-else class="level_class B">{{ item.level }}</span>
              </div>
              <div class="cus_type"> {{ item.type === 0 ? "内部客户" : "外部客户" }} </div>
              <i class="el-icon-edit edit-cla" @click.stop="handEditBtn(item)" />
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px" @close="open">
        <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="客户编号" prop="number">
            <el-input v-model="ruleForm.number" maxlength="10" show-word-limit placeholder="请输入客户编号" />
          </el-form-item>
          <el-form-item label="客户名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入客户名称" />
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
          <el-form-item label="销售">
            <el-select v-model="ruleForm.saleId" style="width: 100%" placeholder="请选择销售">
              <el-option
                v-for="item in userList"
                :key="item.ID"
                :label="item.name"
                :value="item.ID"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="客户服务经理(主)">
            <el-select v-model="ruleForm.mainManageId" style="width: 100%" placeholder="请选择客户服务经理(主)">
              <el-option
                v-for="item in serviceList"
                :key="item.ID"
                :label="item.name"
                :value="item.ID"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="客户服务经理(副)">
            <el-select v-model="ruleForm.subManageId" style="width: 100%" placeholder="请选择客户服务经理(副)">
              <el-option
                v-for="item in serviceList"
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
  </div>
</template>

<script>
import { getClientList, addClient, editClient } from '@/api/customer'
import { getUserList } from '@/api/user'
import Moment from 'moment'
export default {
  name: 'Customer',
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: '',
        number: '',
        type: '',
        level: '',
        saleId: '',
        mainManageId: '',
        subManageId: ''
      },
      title: '新增客户',
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
      tableData: [],
      userList: [],
      serviceList: []
    }
  },
  async mounted() {
    if (this.$route.path === '/base/customer') {
      this.init()
      this.getUserList()
      this.getSeriverist()
    }
  },
  methods: {
    handleClick() {},
    async init() {
      const res = await getClientList()
      this.tableData = res.data
    },
    async getUserList() {
      const res = await getUserList({ type: 2 })
      this.userList = res.data.users
    },
    async getSeriverist() {
      const res = await getUserList({ type: 3 })
      this.serviceList = res.data.users
    },
    add() {
      this.title = '新增客户'
      this.dialogVisible = true
    },
    goCusInfo(id) {
      this.$router.push({
        path: '/base/customer/info',
        query: {
          id
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm

          if (this.title === '新增客户') {
            this.addClient(form)
          } else {
            this.editClient(form)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async addClient(form) {
      const res = await addClient(form)
      if (res.ret === 0) {
        this.$message.success('客户新增成功')
        this.init()
        this.dialogVisible = false
      }
    },
    async editClient(form) {
      const res = await editClient(form)
      if (res.ret === 0) {
        this.$message.success('客户编辑成功')
        this.init()
        this.dialogVisible = false
      }
    },
    handEditBtn(item) {
      this.title = '编辑客户'
      this.ruleForm.ID = item.ID
      this.ruleForm.name = item.name
      this.ruleForm.number = item.number
      this.ruleForm.type = item.type
      this.ruleForm.level = item.level
      this.ruleForm.saleId = item.saleId
      this.ruleForm.mainManageId = item.mainManageId || ''
      this.ruleForm.subManageId = item.subManageId || ''
      this.dialogVisible = true
    },
    getMoment(date) {
      return Moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    open() {
      this.ruleForm = {
        name: '',
        number: '',
        type: '',
        level: '',
        saleId: '',
        mainManageId: '',
        subManageId: ''
      }
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
    margin-bottom: 10px;
    cursor: pointer;
    position: relative;
    .cus_num {
      color: #999;
      margin-bottom: 10px;
      font-size: 12px;
    }
    .cus_name {
      display: flex;
      align-items: center;
      .cus_name_black {
        color: #202D40;
        font-weight: 500;
        display: flex;
        align-items: center;
      }
      .edit-cla {
        position: absolute;
        top: 10px;
        right: 20px;
        display: none;
      }
    }
    .cus_type {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      color: #8592A6;
    }
  }
  .box-card:hover {
    .edit-cla {
      display: block;
    }
  }
  .server_info {
    font-size: 18px;
    margin: 10px 0;
    font-weight: bold;
  }
}
</style>
