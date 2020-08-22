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
    <el-table :data="tableData" border style="width: 100%">
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

    <el-dialog title="新建离职" :visible.sync="dialogVisible" :close-on-click-modal="false" width="800px" @close="open">
      <el-steps :active="active" simple style="margin-bottom: 20px">
        <el-step title="step1:填写离职信息" />
        <el-step title="step2:离职清算" />
      </el-steps>
      <el-form v-if="active === 1" ref="ruleForm" label-position="right" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编号" prop="name">
              <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="部门" prop="name">
              <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位" prop="name">
              <el-select v-model="ruleForm.name" placeholder="" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="离职日期" prop="name">
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
          <el-col :span="24">
            <el-form-item label="离职原因" prop="name">
              <el-input v-model="ruleForm.name" type="textarea" placeholder="请输入设备需求" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row v-if="active === 2">
        <el-row>
          <el-date-picker
            v-model="ruleForm.deadline"
            type="date"
            placeholder="开始日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="margin-right: 20px"
          />
          <el-date-picker
            v-model="ruleForm.deadline"
            type="date"
            placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-row>
        <el-table :data="tableData" border style="width: 100%;margin: 20px 0">
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
          <el-table-column align="center" label="加班" width="120">
            <template>
              <el-button type="text" size="small">加班记录</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form ref="ruleForm" label-position="right" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="剩余调休(d)" prop="name">
                <el-input v-model="ruleForm.name" placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="剩余年假(d)" prop="name">
                <el-input v-model="ruleForm.name" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="其他结算金额(元)" prop="name">
                <el-input v-model="ruleForm.name" placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="" prop="name">
                <el-input v-model="ruleForm.name" type="textarea" placeholder="其他结算说明" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="active === 1" @click="prev">上一步</el-button>
        <el-button :disabled="active === 2" @click="next">下一步</el-button>
        <el-button :disabled="active === 1" type="primary" @click="submitForm('ruleForm')">确 认</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
      <el-dialog
        width="400px"
        title="离职确认"
        :close-on-click-modal="false"
        :visible.sync="innerVisibleCheck"
        append-to-body
      >
        <P>确认员工A已离职，将通过邮箱通知it管理员，关闭账号。</P>
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
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitFormCheck('ruleForm')">确 定</el-button>
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
      active: 1,
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
