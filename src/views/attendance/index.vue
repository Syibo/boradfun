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
            <el-button type="primary" size="mini">导出考勤</el-button>
          </div>
        </div>
        <!-- <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:10px;">
          <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table> -->
        <el-calendar id="calendar" v-model="value">
          <template slot="dateCell" slot-scope="{data}">
            <div slot="reference" class="date-cla" @click="handDayClick(data)">
              <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
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
  </div>
</template>

<script>
// import UploadExcelComponent from '@/components/Oa/UploadExcel/index'
import Moment from 'moment'
import store from '@/store'
import { getToken } from '@/utils/auth'
export default {
  name: 'MonthAtt',
  // components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      calendarData: [
        { months: ['10'], days: ['01'], things: '2020-09-01 09:30:15' },
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
      myHeaders: {}
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
    handDayClick(data) {
      setTimeout(() => {
        console.log(Moment(this.value).format('YYYY-MM-DD'))
      }, 100)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    oneUpload(response, file, fileList) {
      console.log(response)
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    dateChange() {
      console.log(this.planDate)
      this.value = this.planDate
    }
  }
}
</script>

<style lang="scss">
.attend-container {
  .el-calendar-day {
    padding: 0;
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
      }
    }
  }
}
</style>
