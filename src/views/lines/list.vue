<template>
  <div class="container">
    <el-row class="top">
      <el-button>导出</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" align="center" label="日期" />
      <el-table-column prop="name" align="center" label="客户名称" />
      <el-table-column prop="address" align="center" label="服务名称" />
      <el-table-column prop="change" align="center" label="额度变化" />
      <el-table-column prop="info" align="center" label="变化操作说明" />
      <el-table-column prop="note" align="center" label="备注说明" />
    </el-table>

    <div class="broadfun_block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      />
    </div>
    <!-- 额度调整 -->
    <el-dialog title="额度调整" :visible.sync="dialogVisible" :close-on-click-modal="false" width="30%" @close="close">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客户编号" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-select v-model="ruleForm.name" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务名称" prop="wechat">
          <el-select v-model="ruleForm.group" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="采购额度" prop="phone">
          <el-input-number v-model="ruleForm.phone" :min="1" :max="10" label="描述文字" />
        </el-form-item>
        <el-form-item label="额度到期日" prop="phone">
          <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="订单编号" prop="phone">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <el-form-item label="备注说明" prop="phone">
          <el-input v-model="ruleForm.phone" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 额度转换 -->
    <el-dialog title="额度转换" :visible.sync="dialogVisible1" :close-on-click-modal="false" width="40%" @close="close1">
      <el-form ref="ruleForm1" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客户编号" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-select v-model="ruleForm.name" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="转出服务名称" prop="wechat">
              <el-select v-model="ruleForm.group" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="转入服务名称" prop="wechat">
              <el-select v-model="ruleForm.group" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="转出服务额度" prop="phone">
              <el-input-number v-model="ruleForm.phone" :min="1" :max="10" label="描述文字" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="转入服务额度" prop="phone">
              <el-input-number v-model="ruleForm.phone" :min="1" :max="10" label="描述文字" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注说明" prop="phone">
          <el-input v-model="ruleForm.phone" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm1('ruleForm1')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  name: 'LinesList',
  directives: { permission },
  data() {
    return {
      currentPage: 1,
      dialogVisible: false,
      dialogVisible1: false,
      ruleForm: { name: '', email: '', wechat: '', phone: '', date: '2020-06-21', group: '', resource: '' },
      options: [
        { value: '条目一', label: '条目一' }, { value: '条目二', label: '条目二' }, { value: '条目三', label: '条目三' }
      ],
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }]
      },
      tableData: [{
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }, {
        date: '2016-05-02',
        name: '超级厉害娱乐信息公司',
        address: '深度兼容--Android 300',
        change: '-2',
        info: '实施消耗，实施任务编号：12345678',
        note: ''
      }]
    }
  },
  methods: {
    close() {
      this.$refs['ruleForm'].resetFields()
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
    close1() {
      this.$refs['ruleForm1'].resetFields()
    },
    submitForm1(formName) {
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
    lineChange() {
      this.dialogVisible = true
    },
    lineConver() {
      this.dialogVisible1 = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
