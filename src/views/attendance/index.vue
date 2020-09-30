<template>
  <div class="container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <!-- <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:10px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table> -->

    <el-calendar id="calendar" v-model="value">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{data}">
        <div slot="reference" @click="handDayClick(data)">
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
</template>

<script>
import UploadExcelComponent from '@/components/Oa/UploadExcel/index'
import Moment from 'moment'

export default {
  name: 'MonthAtt',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      calendarData: [
        { months: ['09'], days: ['01'], things: '2020-09-01 09:30:15' },
        { months: ['09'], days: ['01'], things: '2020-09-01 18:30:15' },
        { months: ['09'], days: ['02'], things: '2020-09-02 18:30:15' },
        { months: ['09'], days: ['02'], things: '2020-09-02 18:30:15' }
      ],
      value: new Date()
    }
  },
  // watch: {
  //   value: {
  //     deep: true,
  //     handler(value) {
  //       console.log(value)
  //     }
  //   }
  // },
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
    handleSuccess({ results, header }) {
      console.log(results)
      console.log(header)
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>
