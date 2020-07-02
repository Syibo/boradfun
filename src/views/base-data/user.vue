<template>
  <div class="container">
    <el-row class="baradfun-top">
      <el-button type="primary" @click="add">新增用户</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="email" align="center" label="邮箱" />
      <el-table-column prop="name" align="center" label="姓名" />
      <el-table-column prop="wx" align="center" label="企业微信" />
      <el-table-column prop="phone" align="center" label="手机号码" />
      <el-table-column align="center" label="用户类型">
        <template slot-scope="scope">
          {{ getUserType(scope.row.userType) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button :disabled="true" type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button :disabled="true" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </div>

    <el-dialog title="新增用户" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%" @open="open">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="企业微信" prop="wx">
          <el-input v-model="ruleForm.wx" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone" maxlength="11" show-word-limit />
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-radio-group v-model="ruleForm.userType">
            <el-radio :label="1"> 管理员 </el-radio>
            <el-radio :label="2"> 销售 </el-radio>
            <el-radio :label="3"> 客户服务经理 </el-radio>
            <el-radio :label="4"> 资源分配 </el-radio>
            <el-radio :label="5"> 实施人员 </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="资源组长" prop="leaderId">
          <el-select v-model="ruleForm.leaderId" placeholder="请选择">
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
import { userLeader, addUser, getUserList } from '@/api/user'
export default {
  name: 'User',
  data() {
    return {
      currentPage: 2,
      dialogVisible: false,
      ruleForm: {
        name: '',
        email: '',
        wx: '',
        phone: '',
        userType: '',
        leaderId: ''
      },
      options: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        wx: [
          { required: true, message: '请输入企业微信', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: 'change' }
        ]
      },
      tableData: []
    }
  },
  async mounted() {
    this.init()
    this.getUserLeader()
  },
  methods: {
    handleClick() {},
    async getUserLeader() {
      const res = await userLeader()
      this.options = res.data
    },
    async init() {
      const res = await getUserList()
      this.tableData = res.data
    },
    add() {
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          this.addUser(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async addUser(form) {
      const res = await addUser(form)
      if (res.ret === 0) {
        this.dialogVisible = false
        this.init()
      }
    },
    getUserType(type) {
      let resl = ''
      switch (type) {
        case 1:
          resl = '管理员'
          break
        case 2:
          resl = '销售'
          break
        case 3:
          resl = '客户服务经理'
          break
        case 4:
          resl = '资源分配'
          break
        case 5:
          resl = '实施人员'
          break
        default:
          resl = 'null'
          break
      }
      return resl
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
}
</style>
