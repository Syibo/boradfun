<template>
  <div class="container attend-container">
    <div class="content">
      <div class="left">
        <el-input
          v-model="filterText"
          size="mini"
          placeholder="员工姓名"
          style="margin-bottom: 10px"
        />

        <el-tree
          ref="tree"
          class="filter-tree"
          :data="treedata"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
        />
      </div>
      <div class="right">
        <div class="top">
          <el-date-picker
            v-model="planDate"
            style="width: 200px"
            type="month"
            size="mini"
            placeholder="选择日期"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM-dd"
            @change="dateChange"
          />
          <div />
          <!-- <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" /> -->
          <div class="up-btn">
            <!-- <el-button type="primary" size="mini">上传考勤</el-button> -->
            <el-upload
              style="margin-right: 10px"
              :headers="myHeaders"
              name="file"
              :action="`${api}/v1/work/attendance`"
              :on-success="oneUpload"
              :show-file-list="false"
            >
              <el-button type="primary" size="mini">上传考勤</el-button>
            </el-upload>
            <el-dropdown>
              <el-button type="primary" size="mini">
                导出考勤<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>POS表格</el-dropdown-item>
                <el-dropdown-item>考勤统计表格</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <!-- <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:10px;">
          <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table> -->
        <el-calendar id="calendar" v-model="value">
          <template slot="dateCell" slot-scope="{data}">
            <div slot="reference" class="date-cla" @click="handDayClick(data)">
              <div class="calendar-day">
                <span class="calendar-day-span">{{ data.day.split('-').slice(2).join('-') }}</span>
                <p class="calendar-day-p" size="mini" type="danger">异常</p>
              </div>
              <div v-for="(item, index) in calendarData" :key="index">
                <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                  <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                    <div class="is-selected">{{ item.things }}</div>
                  </div>
                  <div v-else />
                </div>
                <div v-else />
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
    </div>
    <el-dialog :visible.sync="visible" :close-on-click-modal="false" width="700px" :show-close="false" class="contract-from" @close="closeVisble">
      <span slot="title" class="dialog-title">
        <div class="dialog-title-left">
          员工打卡明细
        </div>
        <div class="dialog-title-right">
          <el-button type="text"> 编辑考勤 </el-button>
        </div>
      </span>
      <div class="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="打卡时间" width="180" />
          <el-table-column prop="name" label="打卡结果" width="180" />
          <el-table-column prop="address" label="异常判断" />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import UploadExcelComponent from '@/components/Oa/UploadExcel/index'
import Moment from 'moment'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { getWorkAttendance } from '@/api/work'
export default {
  name: 'MonthAtt',
  // components: { UploadExcelComponent },
  data() {
    return {
      tableHeader: [],
      tableData: [{
        date: '2016-05-02',
        name: '异常',
        address: '无'
      }],
      calendarData: [
        { months: ['10'], days: ['01'], things: '2020-09-01 09:30:15' },
        { months: ['10'], days: ['01'], things: '2020-09-01 18:30:15' },
        { months: ['10'], days: ['01'], things: '2020-09-01 18:30:15' },
        { months: ['10'], days: ['02'], things: '2020-09-02 18:30:15' },
        { months: ['10'], days: ['02'], things: '2020-09-02 18:30:15' }
      ],
      value: new Date(),
      planDate: new Date(),
      filterText: '',
      treedata: [{
        id: 1,
        label: '游戏测试',
        children: [{
          id: 4,
          label: '员工1'
        }]
      }, {
        id: 2,
        label: '专家实施',
        children: [{
          id: 5,
          label: '员工2-1'
        }, {
          id: 6,
          label: '员工2-2'
        }]
      }, {
        id: 3,
        label: 'wetest',
        children: [{
          id: 7,
          label: '员工3-1'
        }, {
          id: 8,
          label: '员工3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      api: '',
      myHeaders: {},
      visible: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.api = process.env.VUE_APP_BASE_API
    if (store.getters.token) {
      this.myHeaders = {
        'Authorization': JSON.parse(getToken()).session
      }
      this.userType = JSON.parse(getToken()).userType
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    async handDayClick(data) {
      setTimeout(() => {
        console.log(Moment(this.value).format('YYYY-MM-DD'))
        this.visible = true
      }, 100)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    oneUpload(response, file, fileList) {
      console.log(response)
      if (response.ret === 0) {
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传失败')
      }
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    closeVisble() {
      console.log(9999)
    },
    async dateChange() {
      console.log(this.planDate)
      this.value = this.planDate
      const res = await getWorkAttendance({ name: '陈鹏宇', year: '2020', month: '08' })
      if (res.ret === 0 && res.data[0].users[0].attendances) {
        // this.calendarData = res.data[0].users[0].attendances
        console.log(this.calendarData)
        console.log(this.calendarData[0].attendance_date)
      }
    }
  }
}
</script>

<style lang="scss">
.attend-container {
  .el-calendar-day {
    padding: 0;
    height: auto;
    min-height: 100px;
  }
  .calendar-day {
    color: #5A5D5F;
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    .calendar-day-span {
      display: inline-block;
      flex: 1;
    }
    .calendar-day-p {
      width: 36px;
      height: 20px;
      background: rgba(255, 92, 92, 0.15);
      color: #EF5E54;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      margin: 0;
    }
  }
  .contract-from {
    .el-dialog__header {
      padding: 0;
    }
    .el-input-number {
      text-align: left!important;
    }
  }
}
</style>

<style lang="scss" scoped>
.attend-container {
  .content {
    display: flex;
    .left {
      width: 230px;
    }
    .right {
      flex: 1;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 20px;
        padding-left: 10px;
      }
      .up-btn {
        display: flex;
        align-items: center;
      }
      .date-cla {
        padding: 8px;
        width: 100%;
        height: 100%;
        min-height: 100px;
      }
      .is-selected {
        color: #BCC0C3;
        font-size: 14px;
        margin-bottom: 3px;
      }
    }
  }
}
</style>
