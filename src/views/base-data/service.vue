<template>
  <div class="container">
    <el-row class="baradfun-top">
      <el-button type="primary" @click="add">新增</el-button>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="serviceName" align="center" label="服务名称" />
      <el-table-column align="center" label="是否启用">
        <template slot-scope="scope">
          <span> {{ getState(scope.row.state) }} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span> {{ getMoment(scope.row.CreatedAt) }} </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small" :disabled="scope.$index === 0" @click="handleClickUp(scope)">上移</el-button>
          <el-button type="text" size="small" :disabled="scope.$index === tableData.length - 1" @click="handleClickDown(scope)">下移</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px" @close="close">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" class="demo-ruleForm">
        <el-form-item label="服务名称" prop="serviceName">
          <el-input v-model="ruleForm.serviceName" />
        </el-form-item>
        <el-form-item label="是否启用" prop="state">
          <el-radio-group v-model="ruleForm.state">
            <el-radio :label="0"> 启用 </el-radio>
            <el-radio :label="1"> 不启用 </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用途" prop="use">
          <el-checkbox-group v-model="ruleForm.use">
            <el-checkbox :label="1">可实施</el-checkbox>
            <el-checkbox :label="2">可转换</el-checkbox>
          </el-checkbox-group>
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
import { getList, addService, editService, switchService } from '@/api/service'
import Moment from 'moment'
export default {
  name: 'Service',
  data() {
    return {
      currentPage: 2,
      dialogVisible: false,
      ruleForm: {
        name: '',
        use: [],
        state: ''
      },
      rules: {
        serviceName: [
          { required: true, message: '请输入服务名称', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ],
        use: [
          { required: true, message: '请选择用途', trigger: 'change' }
        ]
      },
      tableData: [],
      title: '新增服务'
    }
  },
  async mounted() {
    this.getList()
  },
  methods: {
    handleClick(row) {
      this.title = '修改服务'
      if (row.use === 1) {
        row.use = [1]
      } else if (row.use === 2) {
        row.use = [2]
      } else {
        row.use = [1, 2]
      }
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    async getList() {
      const res = await getList()
      this.tableData = res.data
    },
    add() {
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const form = this.ruleForm
          if (this.title === '新增服务') {
            this.addService(form)
          } else {
            this.editService(form)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async addService(form) {
      let use = 0
      if (form.use.length === 2) {
        use = form.use[0] + form.use[1]
      } else {
        use = form.use[0]
      }
      form.use = use
      const res = await addService(form)
      if (res.ret === 0) {
        this.dialogVisible = false
        this.getList()
      }
    },
    async editService(form) {
      let use = 0
      if (form.use.length === 2) {
        use = form.use[0] + form.use[1]
      } else {
        use = form.use[0]
      }
      form.use = use
      const res = await editService(form)
      if (res.ret === 0) {
        this.dialogVisible = false
        this.getList()
      }
    },
    async handleClickUp(scope) {
      const index = scope.$index
      const id = this.tableData[index].ID
      const idPrev = this.tableData[index - 1].ID
      const ids = `${id},${idPrev}`
      const res = await switchService(ids)
      if (res.ret === 0) {
        this.getList()
      }
    },
    async handleClickDown(scope) {
      const index = scope.$index
      const id = this.tableData[index].ID
      const idPrev = this.tableData[index + 1].ID
      const ids = `${id},${idPrev}`
      const res = await switchService(ids)
      if (res.ret === 0) {
        this.getList()
      }
    },
    getState(state) {
      const ret = state === 0 ? '启用' : '不启用'
      return ret
    },
    getUse(use) {
      let ret = ''
      if (use === 1) {
        ret = '可实施'
      } else if (use === 2) {
        ret = '可转换'
      } else {
        ret = '可实施/可转换'
      }
      return ret
    },
    getMoment(date) {
      return Moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    close() {
      this.ruleForm = {
        name: '',
        use: [],
        state: ''
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
}
</style>
