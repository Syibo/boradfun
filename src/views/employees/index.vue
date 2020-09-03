<template>
  <div class="container employees-container">
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
        <el-button type="primary" @click="induction">新建入职</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column align="center" label="员工编号/姓名">
        <template slot-scope="scope">
          <span class="bule-hover" @click="openDra"> {{ scope.row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="DepartmentID" align="center" label="所属部门" />
      <el-table-column prop="ServiceLine" align="center" label="岗位" />
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.Status }}
        </template>
      </el-table-column>
      <el-table-column prop="EntryDate" align="center" label="计划入职时间" />
      <el-table-column align="center" label="流程信息">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
          >
            <div v-if="scope" style="height: 150px;">
              <el-steps direction="vertical" :active="2" finish-status="success">
                <el-step title="shiwen" icon="el-icon-timer" description="提交" />
                <el-step title="qianqianniu" icon="el-icon-timer" description="提交" />
                <el-step title="louyikai" icon="el-icon-timer" description="未提交" />
              </el-steps>
            </div>
            <el-button slot="reference" type="text">查看详情</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="280">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small">录入设备需求</el-button>
          <el-button type="text" size="small">录入账号信息</el-button>
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
          新建入职
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
              <el-form-item label="性别" prop="Gender">
                <el-radio-group v-model="ruleForm.name">
                  <el-radio label="男" />
                  <el-radio label="女" />
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="入职状态">
                <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="身份证号">
                <el-input v-model="ruleForm.IDcard" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <Label :title="'面试'" />
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="面试评价">
              <el-input v-model="ruleForm.name" type="textarea" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="empolyees-upload">
          <el-col :span="2">
            <el-upload
              style="margin-top: -20px"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <el-button icon="el-icon-upload" size="small" type="text">点击上传履历</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <Label :title="'岗位信息'" />
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
            <el-form-item label="服务线" prop="name">
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
        </el-row>
        <Label :title="'账号信息'" />
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="name">
              <template slot="label"><span class="form-label-slot">企业邮箱<span>（IT填写）</span></span></template>
              <el-input v-model="ruleForm.name" placeholder="请输入企业邮箱" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="name">
              <template slot="label"><span class="form-label-slot">企业微信<span>（IT填写）</span></span></template>
              <el-input v-model="ruleForm.name" placeholder="请输入企业微信" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="name">
              <template slot="label"><span class="form-label-slot">TAPD<span>（IT填写）</span></span></template>
              <el-input v-model="ruleForm.name" placeholder="请输入TAPD" />
            </el-form-item>
          </el-col>
        </el-row>
        <Label :title="'流程信息'" />
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="name">
              <template slot="label"><span class="form-label-slot">计划入职时间<span>（HR填写）</span></span></template>
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
            <el-form-item prop="name">
              <template slot="label"><span class="form-label-slot">座位号<span>（HR填写）</span></span></template>
              <el-input v-model="ruleForm.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="name">
              <template slot="label"><span class="form-label-slot">设备需求<span>（部门负责人填写）</span></span></template>
              <el-input v-model="ruleForm.name" type="textarea" placeholder="请输入设备需求" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <EmployDrawer ref="employDrawer" />
  </div>
</template>

<script>
import Label from '@/components/common/Label.vue'
import EmployDrawer from '@/components/Oa/EmployDrawer'
export default {
  components: {
    Label,
    EmployDrawer
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
.empolyees-upload {
	.el-upload {
		width: 100%;
		.el-upload-dragger {
			width: 100%;
			height: 150px;
		}
	}
}
.employees-container {
  .el-dialog__header {
    padding: 0;
  }
}
</style>
<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
  .form-label-slot {
    display: inline-block;
    span {
      color: #999999;
      font-weight: 400;
    }
  }
}
</style>
