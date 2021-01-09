<template>
  <div class="container">
    <el-row class="table-top">
      <div class="left">
        <el-select v-model="ruleForm.name" placeholder="请输入员工名称" style="margin-right: 10px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
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
        <el-button type="primary" @click="departure">转正申请</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="name" align="center" label="转正员工编号" />
      <el-table-column prop="name" align="center" label="转正员工" />
      <el-table-column prop="DepartmentID" align="center" label="所属部门" />
      <el-table-column prop="ServiceLine" align="center" label="岗位" />
      <el-table-column prop="ServiceLine" align="center" label="部门领导" />
      <el-table-column prop="ServiceLine" align="center" label="申请人" />
      <el-table-column prop="EntryDate" align="center" label="转正日期" />
      <el-table-column align="center" label="状态">
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

    <el-dialog title="申请转正" :visible.sync="dialogVisible" :close-on-click-modal="false" width="800px" @close="open">
      <el-form ref="ruleForm" label-position="right" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="active === 1" type="primary" @click="submitForm('ruleForm')">确 认</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      tableData: [],
      dialogVisible: false,
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
		}
	}
}
</style>
<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
}
</style>
