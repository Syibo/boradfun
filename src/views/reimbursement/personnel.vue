<template>
  <div class="container settlement-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="上传数据" name="first">
        <el-row class="table-top">
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
      </el-tab-pane>

      <el-tab-pane v-if="roles[0] === 8 || isCeo " label="任务成本" name="second">
        <el-row class="table-top">
          <div class="left">
            <el-select v-model="listValue.engagement_codes" multiple placeholder="请选择项目" style="width: 250px; margin-right: 20px" clearable>
              <el-option v-for="item in projectList" :key="item.ID" :label="`${item.engagement_code_desc} - ${item.engagement_code}`" :value="item.engagement_code" />
            </el-select>
            <el-radio v-model="radio" label="1">按周
              <el-date-picker
                v-model="weekDate"
                :disabled="radio === '2'"
                style="width: 150px;"
                type="week"
                placeholder="选择周"
                format="yyyy 第 WW 周"
                :picker-options="optiondate"
                value-format="yyyy-MM-dd"
                @change="weekChange"
              />
            </el-radio>
            <el-radio v-model="radio" label="2">按月
              <el-date-picker
                v-model="monthDate"
                :disabled="radio === '1'"
                style="width: 150px;"
                type="month"
                placeholder="选择月"
                format="yyyy 第 MM 月"
                :picker-options="optiondate"
                value-format="yyyy-MM-dd"
                @change="monthChange"
              />
            </el-radio>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="cancel">取消</el-button>
          </div>
        </el-row>
        <el-row :gutter="20" class="three">
          <el-col :span="8">
            <div class="three-item">
              <div class="top">任务总成本</div>
              <div class="num"> {{ round(detailData.cost_summary, 2) }} </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="three-item">
              <div class="top">总耗时</div>
              <div class="num">{{ detailData.hour_summary }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="three-item">
              <div class="top">总人数</div>
              <div class="num"> {{ detailData.employee_nums }} </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <PersonTable v-for="(item, index) in detailData.list" :key="index" :data="item" />

    <el-dialog title="" :visible.sync="dialogVisible" :close-on-click-modal="false" width="1000px" @close="closeFun">
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
import { creatEengagement, getEngagement, getEngagementList, getEngagementProject } from '@/api/remi'
import Moment from 'moment'
import round from 'lodash/round'
import { mapGetters } from 'vuex'
export default {
  name: 'Personnel',
  directives: { permission },
  components: {
    PersonTable,
    PersonDetail
  },
  data() {
    return {
      activeName: 'first',
      diaData: [],
      myHeaders: {},
      api: '',
      dialogVisible: false,
      personDetailVisible: false,
      projectList: [],
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
      listValue: {
        engagement_codes: '',
        begin_time: '',
        end_time: '',
        type: 'week' // week ||  month
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
      list: [],
      detailData: {
        cost_summary: 0,
        employee_nums: 0,
        hour_summary: 0,
        list: []
      },
      weekDate: '',
      monthDate: ''
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
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
    this.getEngagementProject()
    this.getEngagement()
  },
  methods: {
    round,
    async getEngagement() {
      const res = await getEngagement(this.getValue)
      if (res.ret === 0) {
        this.list = res.data
      }
    },
    async getEngagementProject() {
      const res = await getEngagementProject()
      if (res.ret === 0) {
        this.projectList = res.data
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
    async search() {
      const res = await getEngagementList(this.listValue)
      if (res.ret === 0 && res.data.list) {
        this.detailData = res.data
      } else {
        this.detailData = {
          cost_summary: 0,
          employee_nums: 0,
          hour_summary: 0,
          list: []
        }
        this.$message.error('暂无数据')
      }
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
    // 按周查询
    weekChange() {
      if (this.weekDate) {
        const end = Moment(this.weekDate).add(5, 'days').format('YYYY-MM-DD')
        const start = Moment(this.weekDate).subtract(1, 'days').format('YYYY-MM-DD')
        this.listValue.begin_time = start
        this.listValue.end_time = end
      } else {
        this.listValue.begin_time = ''
        this.listValue.end_time = ''
      }
      this.listValue.type = 'week'
    },
    // 按月查询
    monthChange() {
      if (this.monthDate) {
        const lastDay = new Date(this.monthDate.substring(0, 4), this.monthDate.substring(5, 7), 0).getDate()
        this.listValue.begin_time = this.monthDate
        this.listValue.end_time = `${this.monthDate.substring(0, 4)}-${this.monthDate.substring(5, 7)}-${lastDay}`
      } else {
        this.seachValue.application_date_begin = ''
        this.seachValue.application_date_end = ''
      }
      this.listValue.type = 'month'
    },
    cancel() {
      this.detailData = {
        cost_summary: 0,
        employee_nums: 0,
        hour_summary: 0,
        list: []
      }
      this.listValue = {
        engagement_codes: '',
        begin_time: '',
        end_time: ''
      }
      this.weekDate = ''
      this.monthDate = ''
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
    },
    closeFun() {
      this.diaData = []
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
   border-bottom: 1px solid #ddd;
   span {
     flex: 1;
   }
 }
}
</style>
