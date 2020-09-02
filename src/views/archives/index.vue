<template>
  <div class="container">
    <el-row class="table-top">
      <div class="left">
        <el-input placeholder="请输入员工编号" />
        <el-input placeholder="请输入员工姓名" style="width: 100%;margin-left: 10px" />
        <el-select v-model="ruleForm.name" placeholder="所属部门" style="width: 100%;margin-left: 10px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="ruleForm.name" placeholder="员工状态" style="width: 100%;margin: 0 10px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary">帅选</el-button>
      </div>
      <div class="right">
        <el-button type="primary" @click="induction">新建入职</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="name" align="center" label="员工编号" />
      <el-table-column prop="name" align="center" label="员工姓名" />
      <el-table-column prop="DepartmentID" align="center" label="所属部门" />
      <el-table-column prop="ServiceLine" align="center" label="服务线" />
      <el-table-column prop="ServiceLine" align="center" label="企业邮箱" />
      <el-table-column prop="ServiceLine" align="center" label="手机号码" />
      <el-table-column prop="EntryDate" align="center" label="实际入职时间" />
      <el-table-column align="center" label="合同信息">
        <template>
          <span class="bule-hover"> 查看详情 </span>
        </template>
      </el-table-column>
      <el-table-column prop="EntryDate" align="center" label="转正时间" />
      <el-table-column prop="EntryDate" align="center" label="员工状态" />
      <el-table-column prop="EntryDate" align="center" label="创建时间" />
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

    <el-dialog title="新建离职" :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false" width="80%" class="dialog-container" @close="close">
      <span slot="title" class="dialog-title">
        <div class="dialog-title-left">
          员工详情
        </div>
        <div class="dialog-title-right">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        </div>
      </span>
      <div class="archives-detail">
        <div class="left">
          <div
            v-for="item in label"
            :key="item.href"
            class="item"
            @click="changeAct(item.href)"
          >
            {{ item.label }}
            <!-- <a :href="`#${item.href}`">
              {{ item.label }}</a> -->
            <span :class="item.href === active ? 'act' : 'nol'" /></div>
        </div>

        <div class="right">
          <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
            <Label id="baseInfo" title="基本信息" />
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
            <Label id="interviewiInfo" title="面试信息" />
            <div class="test-hei">面试信息</div>
            <Label id="jobsInfo" title="岗位信息" />
            <div class="test-hei">岗位信息</div>
            <Label id="schoolInfo" title="学历信息" />
            <div class="test-hei">学历信息</div>
          </el-form>
        </div>
      </div>
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
      label: [
        { label: '基本信息', href: 'baseInfo' },
        { label: '面试信息', href: 'interviewiInfo' },
        { label: '岗位信息', href: 'jobsInfo' },
        { label: '学历信息', href: 'schoolInfo' }
      ],
      active: 'baseInfo',
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
        name: ''
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
        ]
      }
    }
  },
  methods: {
    induction() {
      this.$router.push({
        path: '/employees/induction'
      })
    },
    handleClick() {
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
    submitForm() {
      console.log(444)
    },
    changeAct(href) {
      this.active = href
      const anchor = this.$el.querySelector(`#${href}`)
      const total = anchor.offsetTop
      console.log(total)
      const right = document.getElementsByClassName('archives-detail')[0].getElementsByClassName('right')[0]
      let documentTotal = right.scrollTop
      let timer = null
      timer = setInterval(function() {
        if (documentTotal < total) {
          documentTotal += 10
          setScrollTop(documentTotal)
          if (Math.abs(documentTotal - total) < 10) {
            clearInterval(timer)
          }
        }
        if (documentTotal > total) {
          documentTotal -= 10
          setScrollTop(documentTotal)
          if (Math.abs(documentTotal - total) < 10) {
            clearInterval(timer)
          }
        }
      }, 5)
      function setScrollTop(total) {
        right.scrollTop = total - 68
      }
    },
    close() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
  .archives-detail {
    max-height: 500px;
    display: flex;
    .left {
      width: 80px;
      border-right: 1px solid #F0F1F2;
      display: flex;
      flex-direction: column;
      .item {
        position: relative;
        line-height: 30px;
        cursor: pointer;
        .nol {
          width: 10px;
          height: 10px;
          background: #E8E9EA;
          position: absolute;
          border-radius: 10px;
          right: -5px;
          top: 10px;
        }
        .act {
          width: 10px;
          height: 10px;
          background: #3293FF;
          position: absolute;
          border-radius: 10px;
          right: -5px;
          top: 10px;
        }
      }
    }
    .right {
      flex: 1;
      padding-left: 20px;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 500px;
      .test-hei {
        height: 400px;
        width: 100%;
      }
    }
    .right::-webkit-scrollbar-track-piece {
      background-color:#f8f8f8;
    }
    .right::-webkit-scrollbar {
      width:9px;
      height:9px;
    }
    .right::-webkit-scrollbar-thumb {
      background-color:#dddddd;
      background-clip:padding-box;
      min-height:28px;
    }
    .right::-webkit-scrollbar-thumb:hover {
      background-color:#bbb;
    }
  }
}
</style>
