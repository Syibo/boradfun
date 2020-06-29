<template>
  <div class="container">
    <el-row class="baradfun-top">
      <el-button type="primary" @click="add">新增用户</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="email" align="center" label="邮箱" />
      <el-table-column prop="name" align="center" label="姓名" />
      <el-table-column prop="wechat" align="center" label="企业微信" />
      <el-table-column prop="phone" align="center" label="手机号码" />
      <el-table-column prop="type" align="center" label="用户类型" />
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
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

    <el-dialog title="新增用户" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%" @close="close">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="企业微信" prop="wechat">
          <el-input v-model="ruleForm.wechat" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <el-form-item label="用户类型" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="管理员" />
            <el-radio label="销售" />
            <el-radio label="客户服务经理" />
            <el-radio label="资源分配" />
            <el-radio label="实施人员" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="资源组长" prop="group">
          <el-select v-model="ruleForm.group" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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

export default {
  name: 'LinesList',
  data() {
    return {
      currentPage: 2,
      dialogVisible: false,
      ruleForm: {
        name: '',
        email: '',
        wechat: '',
        phone: '',
        resource: '',
        group: ''
      },
      options: [
        {
          value: '条目一',
          label: '条目一'
        }, {
          value: '条目二',
          label: '条目二'
        }, {
          value: '条目三',
          label: '条目三'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      },
      tableData: [{
        email: 'admin@broadfun.cn',
        name: '张三',
        wechat: '123456789',
        phone: '18720579999',
        type: 'admin'
      }, {
        email: 'admin@broadfun.cn',
        name: '张三',
        wechat: '123456789',
        phone: '18720579999',
        type: 'admin'
      }, {
        email: 'admin@broadfun.cn',
        name: '张三',
        wechat: '123456789',
        phone: '18720579999',
        type: 'admin'
      }]
    }
  },
  mounted() {
    console.log(1111)
  },
  methods: {
    handleClick() {},
    add() {
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close() {
      this.$refs['ruleForm'].resetFields()
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
