<template>
  <div class="container contract-container">
    <el-row class="table-top">
      <div class="left">
        <el-input placeholder="请输入员工姓名" />
        <el-select v-model="ruleForm.name" placeholder="所属部门" style="width: 100%;margin-left: 10px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="ruleForm.name" placeholder="状态" style="width: 100%;margin-left: 10px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="right">
        <el-button type="primary" @click="induction">新建合同</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column align="center" label="合同编号/名称">
        <template slot-scope="scope">
          <span class="bule-hover" @click="openDra"> {{ scope.row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="DepartmentID" align="center" label="合同开始时间" />
      <el-table-column prop="ServiceLine" align="center" label="合同到期时间" />
      <el-table-column align="center" label="签约方">
        <template slot-scope="scope">
          {{ scope.row.Status }}
        </template>
      </el-table-column>
      <el-table-column prop="EntryDate" align="center" label="签订主体" />
      <el-table-column align="center" label="签订状态">
        <template slot-scope="scope">
          {{ scope.row.Status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="broadfun_block">
      <el-pagination
        :current-page="pageNum"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%" :show-close="false" @close="open">
      <span slot="title" class="dialog-title">
        <div class="dialog-title-left">
          新建合同
        </div>
        <div class="dialog-title-right">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        </div>
      </span>
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
        <Label :title="'基本信息'" />
        <!-- <el-row style="color: #2B2B2B">
          <el-col :span="4"> 姓名：沈奕博 </el-col>
          <el-col :span="4"> 性别：男 </el-col>
          <el-col :span="8"> 身份证号码：362330199512263656 </el-col>
          <el-col :span="6"> 手机号码：18720573255 </el-col>
        </el-row> -->
        <el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="合同类型" prop="name">
                <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签约方" prop="Gender">
                <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="签约主体" prop="name">
                <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="合同开始日期" prop="name">
                <el-date-picker
                  v-model="ruleForm.deadline"
                  style="width: 100%"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同结束日期" prop="Gender">
                <el-date-picker
                  v-model="ruleForm.deadline"
                  style="width: 100%"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="试用期" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年假" prop="Gender">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="合同状态" prop="name">
                <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="电子版合同">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                >
                  <el-button icon="el-icon-upload" size="small" type="text">上传文件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="合同扫描件">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                >
                  <el-button icon="el-icon-upload" size="small" type="text">上传文件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '沈意波',
          DepartmentID: '合研',
          ServiceLine: '前端开发',
          EntryDate: '2020-02-03',
          Mobile: 18720573255,
          Status: '未入职'
        }
      ],
      dialogVisible: false,
      innerVisible: false,
      innerVisibleCheck: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      ruleForm: {
        name: '',
        email: '',
        wx: '',
        phone: '',
        userType: '',
        leaderId: ''
      },
      options: [
        { value: '拟入职', label: '拟入职' },
        { value: '未入职', label: '未入职' },
        { value: '已入职', label: '已入职' }
      ],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 23, message: '长度在 2 到 23 个字符', trigger: 'blur' }
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
        ],
        leaderId: [
          { required: true, message: '请选择资源组长', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    induction() {
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      this.pageNum = 1
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.init()
    },
    circulation(formName) {
      this.innerVisible = true
    },
    checkInduction() {
      this.innerVisibleCheck = true
    },
    submitForm(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     const form = this.ruleForm
      //     this.addUser(form)
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    openDra() {
      this.$refs.employDrawer.openDrawer()
    },
    open() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    }
  }
}
</script>

<style lang="scss">
.contract-container {
  .el-dialog__header {
    padding: 0;
  }
}
</style>
<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
}
</style>
