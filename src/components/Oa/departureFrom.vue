<template>
  <el-dialog :visible.sync="visible" :close-on-click-modal="false" width="50%" :show-close="false" class="contract-from" @close="closeVisble">
    <span slot="title" class="dialog-title">
      <div class="dialog-title-left">
        选择员工
      </div>
      <div class="dialog-title-right">
        <el-button @click="closeVisble">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm">提 交</el-button>
      </div>
    </span>
    <el-row class="table-top">
      <div class="left">
        <el-input v-model="name" placeholder="请输入员工姓名" style="width: 100%;margin-left: 10px" clearable @input="seachFun" />
      </div>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :header-cell-style="{background:'#F7F8FA'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column prop="emp_no" align="center" label="离职员工编号" />
      <el-table-column prop="name" align="center" label="员工姓名" />
      <el-table-column prop="department.department_name" align="center" label="所属部门" />
      <el-table-column prop="position" align="center" label="岗位" />
    </el-table>
  </el-dialog>
</template>

<script>
import { getEmployeeList } from '@/api/employee'
export default {
  name: 'DepartureFrom',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: '',
      tableData: [],
      multipleSelection: []
    }
  },
  watch: {
    visible: {
      deep: true,
      handler(value) {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const seach = {
        pagenum: 1,
        pagesize: 100,
        name: this.name,
        departmentid: '',
        status: 2
      }
      const res = await getEmployeeList(seach)
      if (res.ret === 0 && res.data.list.length !== 0) {
        this.tableData = res.data.list
      } else {
        this.tableData = []
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    seachFun() {
      this.init()
    },
    submitForm() {
      if (this.multipleSelection.length !== 1) {
        this.$message.error('请选择一位员工')
        return
      }
      this.$emit('addSucc', this.multipleSelection[0])
    },
    closeVisble() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.contract-from {
  .el-dialog__header {
    padding: 0;
  }
  .el-input-number {
    text-align: left!important;
  }
}
</style>
