<template>
  <div class="container">
    <el-row class="baradfun-top">
      <el-button type="primary" @click="departure">新建离职</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" align="center" label="离职员工编号" />
      <el-table-column prop="name" align="center" label="员工姓名" />
      <el-table-column prop="DepartmentID" align="center" label="所属部门" />
      <el-table-column prop="ServiceLine" align="center" label="岗位" />
      <el-table-column prop="ServiceLine" align="center" label="部门领导" />
      <el-table-column prop="ServiceLine" align="center" label="创建人" />
      <el-table-column prop="EntryDate" align="center" label="创建时间" />
      <el-table-column align="center" label="离职原因">
        <template slot-scope="scope">
          {{ scope.row.Mobile }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
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

    <el-dialog title="新建离职" :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false" width="60%" class="dialog-container" @close="open">
      <span slot="title" class="dialog-title">
        <div class="dialog-title-left">
          新建离职
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
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="员工编号" prop="phone">
                <el-input v-model="ruleForm.name" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="所属部门">
                <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="离职日期">
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
            <el-col :span="24">
              <el-form-item label="离职原因">
                <el-input v-model="ruleForm.name" type="textarea" placeholder="离职原因" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <Label :title="'流程信息'" />
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Label from '@/components/common/Label.vue'
export default {
  components: {
    Label
  },
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
    next() {
      this.active = 2
    },
    prev() {
      this.active = 1
    },
    departure() {
      this.active = 1
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
    submitForm(formName) {
      this.innerVisibleCheck = true
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
    open() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    }
  }
}
</script>

<style lang="scss">
.empolyees-upload {
	.el-upload {
		width: 100%;
		.el-upload-dragger {
			width: 100%;
			height: 150px;
		}
	}
}
.dialog-container {
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
