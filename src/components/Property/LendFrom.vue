<template>
  <el-dialog title="借出至" :visible="visible" :close-on-click-modal="false" width="800px" @close="closeVisble">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-tabs v-model="activeName">
        <el-tab-pane label="借出" name="first">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="已申请员工" prop="annual_leave">
                <el-radio-group v-model="ruleForm.device_apply_id">
                  <el-radio v-for="item in lendData" :key="item.ID" :label="item.ID"> {{ item.e_name }} </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="分配" name="second">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="请选择项目">
                <el-select v-model="ruleForm.engagement_code" placeholder="请选择项目" style="width: 100%" @change="proChange">
                  <el-option v-for="item in projectList" :key="item.ID" :label="item.engagement_code_desc" :value="item.engagement_code" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="领用人">
                <el-autocomplete
                  v-model="ruleForm.employee_name"
                  style="width: 100%"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入领用人"
                  @select="handleSelect"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeVisble">取 消</el-button>
      <el-button type="primary" @click="checkBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { rulesCon } from '@/views/archives/config'
import { deviceIdApply, deviceOutgoing, deviceProjects, deviceDistribution } from '@/api/property'
import { getEmployeeList } from '@/api/employee'
export default {
  name: 'LengFrom',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      ruleForm: {
        device_apply_id: 0,
        employee_id: 0,
        employee_name: '',
        engagement_code: '',
        project: ''
      },
      rules: rulesCon,
      lendData: [],
      projectList: [],
      activeName: 'first'
    }
  },
  watch: {
    visible: {
      handler(value) {
        if (value && this.id) {
          this.init()
        }
      }
    }
  },
  mounted() {},
  methods: {
    async init() {
      const res = await deviceIdApply(this.id)
      if (res.ret === 0) {
        this.lendData = res.data
      }
      const res2 = await deviceProjects()
      if (res2.ret === 0) {
        this.projectList = res2.data
      }
    },
    proChange(val) {
      const obj = this.projectList.find((item) => { return item.engagement_code === val })
      if (obj) {
        this.ruleForm.project = obj.engagement_code_desc
      }
    },
    async querySearchAsync(queryString, cb) {
      let restaurants = []
      const seach = {
        pagenum: 1,
        pagesize: 10,
        name: this.ruleForm.employee_name,
        departmentid: '',
        status: 2
      }
      const res = await getEmployeeList(seach)
      if (res.ret === 0 && res.data.list.length !== 0) {
        for (let i = 0, len = res.data.list.length; i < len; i++) {
          res.data.list[i].value = res.data.list[i].name
        }
        restaurants = res.data.list
      } else {
        restaurants = []
      }
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      this.ruleForm.employee_id = item.ID
    },
    async checkBtn() {
      if (this.activeName === 'first') {
        const res = await deviceOutgoing({ id: this.id, device_apply_id: this.ruleForm.device_apply_id })
        if (res.ret === 0) {
          this.$emit('success')
        }
      } else {
        const prams = {
          id: this.id,
          employee_id: this.ruleForm.employee_id,
          employee_name: this.ruleForm.employee_name,
          engagement_code: this.ruleForm.engagement_code,
          project: this.ruleForm.project
        }
        const res = await deviceDistribution(prams)
        if (res.ret === 0) {
          this.$emit('success')
        }
      }
    },
    closeVisble() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        device_apply_id: 0
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.base-cla {
  padding: 5px;
  background-color:#F7F8FA;
}
.contract-from {
  .el-dialog__header {
    padding: 0;
  }
  .el-input-number {
    text-align: left!important;
  }
}
</style>
