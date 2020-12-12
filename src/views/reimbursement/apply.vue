<template>
  <div class="container apply-container">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="项目" prop="remi">
            <el-input v-model="ruleForm.remi" placeholder="项目" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核人" prop="people">
            <el-input v-model="ruleForm.people" placeholder="审核人" disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="pirce">
      <el-button type="primary">导入文件</el-button>
      <el-button type="text" style="margin-left: 10px">下载示例</el-button>
    </el-row>

    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column align="center" label="申请人">
        <template slot-scope="scope">
          <span class="bule-hover"> {{ scope.row.e_name }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" align="center" label="开始时间" />
      <el-table-column prop="duration" align="center" label="加班时长" />
      <el-table-column v-permission="[6, 7, 8, 9, 10]" prop="real_duration" align="center" label="实际加班时长" />
      <el-table-column prop="req_time" align="center" label="申请时间" />
      <el-table-column prop="name" align="center" label="流程信息">
        <template>
          <el-button slot="reference" type="text">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="broadfun_block-app">
      <el-button slot="reference" type="primary">提交</el-button>
      <el-button slot="reference">取消</el-button>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  name: 'Apply',
  directives: { permission },
  data() {
    return {
      activeName: 'first',
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        name: '',
        type: '',
        status: '',
        myreq: true,
        mytodo: ''
      },
      ruleForm: {
        remi: '',
        people: ''
      },
      rules: {
        remi: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        people: [
          { required: true, message: '请选择审核人', trigger: 'blur' }
        ]
      },
      total: 0,
      planDate: '',
      tableData: [
        { e_name: '#67566' }
      ]
    }
  },
  methods: {
    handleClick() {},
    handleSizeChange(val) {
      this.seachValue.pagenum = 1
      this.seachValue.pagesize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.seachValue.pagenum = val
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.apply-container {
  padding-bottom: 50px;
  .pirce {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .broadfun_block-app {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
  }
}
</style>

