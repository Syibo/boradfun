<template>
  <div class="container settlement-container">
    <el-row v-if="isCeo" class="table-top">
      <div class="left">
        <el-select v-model="seachValue.project_name" multiple placeholder="请选择项目" style="width: 200px; margin-right: 20px">
          <el-option v-for="item in projectList" :key="item" :label="item" :value="item" />
        </el-select>
        <el-radio v-model="radio" label="1">按周
          <el-date-picker
            v-model="planDate"
            :disabled="radio === '2'"
            style="width: 150px;"
            type="week"
            placeholder="选择周"
            format="yyyy 第 WW 周"
            :picker-options="optiondate"
            value-format="yyyy-MM-dd"
          />
        </el-radio>
        <el-radio v-model="radio" label="2">按月
          <el-date-picker
            v-model="planDate"
            :disabled="radio === '1'"
            style="width: 150px;"
            type="week"
            placeholder="选择月"
            format="yyyy 第 WW 周"
            :picker-options="optiondate"
            value-format="yyyy-MM-dd"
          />
        </el-radio>
        <el-button type="primary">查询</el-button>
        <el-button>取消</el-button>
      </div>
      <!-- <div class="right">
        <el-button type="primary" @click="uploadData">上传表格数据</el-button>
      </div> -->
    </el-row>
    <el-row v-else class="table-top">
      <div class="left">
        <el-date-picker
          v-model="planDate"
          :disabled="radio === '2'"
          style="width: 150px;"
          type="week"
          placeholder="选择周"
          format="yyyy 第 WW 周"
          :picker-options="optiondate"
          value-format="yyyy-MM-dd"
          @change="periodTimeChange"
        />
      </div>
      <div class="right">
        <el-button type="primary" @click="uploadData">上传表格数据</el-button>
      </div>
    </el-row>

    <p v-for="item in list" :key="item.ID" class="list-cla">
      <span size="medium" type="text"> {{ item.period_time }} </span>
      <el-button size="medium" type="text" @click="checkDetail(item.period_time)"> 查看详情 </el-button>
    </p>

    <el-row v-if="isCeo" :gutter="20" class="three">
      <el-col :span="8">
        <div class="three-item">
          <div class="top">任务总成本</div>
          <div class="num">12</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="three-item">
          <div class="top">总耗时</div>
          <div class="num">322</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="three-item">
          <div class="top">总人数</div>
          <div class="num">322</div>
        </div>
      </el-col>
    </el-row>

    <PersonTable v-if="false" />

    <el-dialog title="" :visible.sync="dialogVisible" :close-on-click-modal="false" width="1000px">
      <el-upload
        class="upload-demo"
        :headers="myHeaders"
        name="file"
        :action="`${api}/v1/engagement/details`"
        :show-file-list="false"
        :on-success="oneUpload"
        :before-upload="beforeUpload"
        style="margin-bottom: 20px"
      >
        <el-button size="small" type="primary">选择文件</el-button>
      </el-upload>
      <el-table :data="diaData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
        <el-table-column prop="engagement_code" align="center" label="项目编号" />
        <el-table-column prop="employee_name" align="center" label="员工" />
        <el-table-column v-for="item in headerValue" :key="item" :prop="`date_field.${item}`" align="center" :label="item" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <PersonDetail :period-time="periodTime" :visible="personDetailVisible" @close="close" />
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import PersonTable from './personTable'
import PersonDetail from './personDetail'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { creatEengagement, getEngagement } from '@/api/remi'
import Moment from 'moment'
export default {
  name: 'Personnel',
  directives: { permission },
  components: {
    PersonTable,
    PersonDetail
  },
  data() {
    return {
      diaData: [],
      myHeaders: {},
      api: '',
      dialogVisible: false,
      personDetailVisible: false,
      projectList: ['项目1', '项目2', '项目3'],
      radio: '1',
      seachValue: {
        project_name: '',
        pagenum: 1,
        pagesize: 10,
        name: '',
        type: '',
        status: '',
        myreq: true,
        mytodo: ''
      },
      getValue: {
        pagenum: 1,
        pagesize: 100,
        period_time: ''
      },
      total: 0,
      planDate: '',
      tableData: [],
      optiondate: {
        'firstDayOfWeek': 1
      },
      periodTime: '',
      headerValue: [],
      email: '',
      file: {},
      list: []
    }
  },
  computed: {
    isCeo() {
      return this.email === 'ralph.ma@broadfun.cn'
    }
  },
  mounted() {
    this.email = JSON.parse(getToken()).email
    this.api = process.env.VUE_APP_BASE_API
    if (store.getters.token) {
      this.myHeaders = {
        'Authorization': JSON.parse(getToken()).session
      }
    }
    if (this.isCeo) {
      console.log('not ceo')
      // this.getEngagement()
    } else {
      this.getEngagement()
    }
  },
  methods: {
    async getEngagement() {
      const res = await getEngagement(this.getValue)
      if (res.ret === 0) {
        this.list = res.data
      }
    },
    async checkDetail(period_time) {
      this.periodTime = period_time
      this.personDetailVisible = true
    },
    periodTimeChange() {
      if (this.planDate) {
        const end = Moment(this.planDate).add(5, 'days').format('YYYY/MM/DD')
        const start = Moment(this.planDate).subtract(1, 'days').format('YYYY/MM/DD')
        this.getValue.period_time = `${start}-${end}`
      } else {
        this.getValue.period_time = ''
      }
      this.getEngagement()
    },
    uploadData() {
      this.dialogVisible = true
    },
    beforeUpload(file) {
      this.file = file
    },
    oneUpload(response, file, fileList) {
      if (response.ret === 0) {
        this.headerValue = Object.keys(response.data[0].date_field)
        this.diaData = response.data
      } else {
        this.$message.error(response.msg)
      }
    },
    async submitForm() {
      const formData = new FormData()
      formData.append('file', this.file)
      const res = await creatEengagement(formData)
      if (res.ret === 0) {
        this.dialogVisible = false
        this.$message.success('导入成功')
        this.getEngagement()
      } else {
        this.$message.error('导入失败')
      }
    },
    handleClick() {},
    handleSizeChange(val) {
      this.seachValue.pagenum = 1
      this.seachValue.pagesize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.seachValue.pagenum = val
      this.init()
    },
    close() {
      this.personDetailVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.settlement-container {
  padding-bottom: 50px;
  .pirce {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .three {
   margin-bottom: 10px;
   margin-top: 20px;
   .three-item {
     min-height: 100px;
     background: #f0f3f6;
     display: flex;
     flex-direction: column;
     justify-content: center;
     padding: 0 20px;
     border-radius: 5px;
     .top {
       margin-bottom: 10px;
       color: #666;
     }
   }
 }
 .list-cla {
   display: flex;
   align-items: center;
   padding:0 10px;
   span {
     flex: 1;
   }
 }
}
</style>
