<template>
  <div class="container">
    <el-row class="table-top">
      <div class="left">
        <el-date-picker
          v-model="ruleForm.deadline"
          type="date"
          placeholder="开始日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="margin-right: 20px"
        />
      </div>
      <div class="right">
        <el-button type="primary" @click="induction">新建入职</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" align="center" label="员工编号/姓名" />
      <el-table-column prop="DepartmentID" align="center" label="所属部门" />
      <el-table-column prop="ServiceLine" align="center" label="岗位" />
      <el-table-column prop="EntryDate" align="center" label="计划入职时间" />
      <el-table-column align="center" label="手机号码">
        <template slot-scope="scope">
          {{ scope.row.Mobile }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.Status }}
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

    <el-dialog title="新建入职" :visible.sync="dialogVisible" :close-on-click-modal="false" width="800px" @close="open">
      <el-form ref="ruleForm" label-position="right" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
        <el-alert style="margin-bottom: 10px;padding-left: 0" title="基本信息" :closable="false" type="info" />
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别" prop="Gender">
              <el-select v-model="ruleForm.Gender" placeholder="" style="width: 100%">
                <el-option key="男" label="男" value="男" />
                <el-option key="女" label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号">
              <el-input v-model="ruleForm.name" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-alert style="margin-bottom: 10px;padding-left: 0" title="履历" :closable="false" type="info" />
        <el-row :gutter="20" class="empolyees-upload">
          <el-col :span="24">
            <el-upload
              style="width: 100%"
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-col>
        </el-row>
        <el-alert style="margin: 10px 0 10px 0;padding-left: 0" title="岗位信息" :closable="false" type="info" />
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属部门" prop="name">
              <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门负责人" prop="name">
              <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="岗位" prop="name">
              <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属项目" prop="name">
              <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="级别" prop="name">
              <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划入职时间" prop="name">
              <el-date-picker
                v-model="ruleForm.deadline"
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
            <el-form-item label="基本薪资" prop="name">
              <el-input v-model="ruleForm.name" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-alert style="margin: 10px 0 10px 0;padding-left: 0" title="账号信息" :closable="false" type="info" />
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业邮箱" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入企业邮箱" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业微信" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入企业微信" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="TAPD" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入TAPD" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-alert style="margin: 0 0 10px 0;padding-left: 0" title="其他" :closable="false" type="info" />
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="座位号" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入座位号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备需求" prop="name">
              <el-input v-model="ruleForm.name" type="textarea" placeholder="请输入设备需求" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="circulation('ruleForm')">流 转</el-button>
        <el-button @click="checkInduction('ruleForm')">确认入职</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
      <el-dialog
        width="400px"
        title="流转"
        :close-on-click-modal="false"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form ref="ruleForm" label-position="right" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="IT部门负责人" prop="name">
                <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="部门负责人" prop="name">
                <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          <el-button @click="innerVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        width="400px"
        title="确认入职"
        :close-on-click-modal="false"
        :visible.sync="innerVisibleCheck"
        append-to-body
      >
        <P>确认入职后，入职流程结束，请到全部员工信息页面录入详细信息以及合同信息</P>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          <el-button @click="innerVisibleCheck = false">取 消</el-button>
        </span>
      </el-dialog>
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
</style>
<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
}
</style>
