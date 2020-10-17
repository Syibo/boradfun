<template>
  <div class="container attend-container">
    <!-- <div class="top-btn"> <el-button type="primary" size="mini">确认考勤数据</el-button> </div> -->
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
          show-checkbox
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
        />
      </div>
      <div class="right">
        <div class="top">
          <el-date-picker
            v-model="planDate"
            style="width: 200px;margin-left: 10px"
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
            <el-upload
              style="margin-right: 10px"
              :headers="myHeaders"
              name="file"
              :action="`${api}/v1/work/attendance/tmp`"
              :on-success="oneUpload"
              :show-file-list="false"
            >
              <el-button type="primary" size="mini">上传考勤</el-button>
            </el-upload>
            <el-dropdown @command="handleCommand">
              <el-button type="primary" size="mini" style="margin-right: 10px">
                导出考勤<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="POS">POS表格</el-dropdown-item>
                <el-dropdown-item command="ALL">考勤统计表格</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" size="mini" @click="checkData">确认考勤数据</el-button>
          </div>
        </div>
        <el-calendar id="calendar" v-model="value">
          <template slot="dateCell" slot-scope="{data}">
            <div slot="reference" class="date-cla" @click="handDayClick(data)">
              <div class="calendar-day">
                <span class="calendar-day-span">{{ data.day.split('-').slice(2).join('-') }}</span>
              </div>
              <div v-for="(item, index) in calendarData" :key="index" class="selected-con">
                <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                  <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                    <div v-for="(tmps, indexTmp) in item.tmps" :key="indexTmp" class="is-selected">
                      <!-- <span> {{ tmps.check_time }} </span> -->
                      <span :class="tmps.status !== 'Normal' ? 'error-color' : ''"> {{ tmps.check_time }} </span>
                      <!-- <el-tag v-if="item.in_status !== 'Normal'" size="mini" class="calendar-day-p" type="danger">{{ item.in_result }}</el-tag> -->
                    </div>
                    <!-- <div class="is-selected">
                      <span :class="item.out_status !== 'Normal' ? 'error-color' : ''"> {{ item.check_out }} </span>
                      <el-tag v-if="item.out_status !== 'Normal'" size="mini" class="calendar-day-p2" type="danger">{{ item.out_result }}</el-tag>
                    </div> -->
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
    <el-dialog :visible.sync="visible" :close-on-click-modal="false" width="900px" :show-close="false" class="contract-from" @close="closeVisble">
      <span slot="title" class="dialog-title">
        <div class="dialog-title-left">
          {{ name }} {{ value }} 打卡明细
        </div>
        <div class="dialog-title-right">
          <el-button v-if="isConfirm === 0" type="text" @click="addAtt"> 添加考勤 </el-button>
        </div>
      </span>
      <div class="dialog-content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="check_time" label="打卡时间" width="400">
            <template slot-scope="scope">
              <el-date-picker
                v-if="scope.row.isEdit"
                v-model="scope.row.check_time"
                style="margin: 0 10px"
                type="datetime"
                placeholder="选择日期时间"
                size="mini"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="false"
              />
              <span v-else>{{ scope.row.check_time }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="打卡结果">
            <template slot-scope="scope">
              <AttStatus :status="scope.row.status" />
            </template>
          </el-table-column>
          <el-table-column prop="address" label="异常判断">
            <template slot-scope="scope">
              <span>{{ scope.row.result === '' ? '无' : scope.row.result }}</span>
              <el-popover
                v-if="scope.row.isEdit"
                placement="bottom-start"
                width="200"
                title="打卡结果"
                trigger="click"
              >
                <el-radio-group v-model="scope.row.result" @change="inChange($event, scope.$index)">
                  <div class="radio">
                    <div class="radio-item">
                      <el-radio :label="'迟到'">迟到</el-radio>
                      <el-radio :label="'早退'">早退</el-radio>
                      <el-radio :label="'旷工'">旷工</el-radio>
                    </div>
                    <div class="radio-item">
                      <el-radio :label="'弹性'">弹性</el-radio>
                      <el-radio :label="'在家办公'">在家办公</el-radio>
                      <el-radio :label="'忘记打卡'">忘记打卡</el-radio>
                      <el-radio :label="'通宵'">通宵</el-radio>
                    </div>
                  </div>
                </el-radio-group>
                <i slot="reference" class="el-icon-arrow-down" />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button v-if="!scope.row.isEdit" type="text" @click="handEdit(scope.row, scope.$index)">编辑</el-button>
              <el-button v-if="scope.row.isEdit" type="text" @click="handSave(scope.row, scope.$index)">保存</el-button>
              <el-button v-if="isConfirm === 0" type="text" @click="handDel(scope.row, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="leave-history">
          关联请假记录
          <el-divider direction="vertical" />
          <el-popover
            placement="bottom-start"
            title=""
            trigger="click"
          >
            <el-checkbox-group v-model="checkList" @change="checkboxChange">
              <el-checkbox v-for="item in leaveList" :key="item.ID" :label="item.ID">{{ retCheclLabel(item) }}</el-checkbox>
            </el-checkbox-group>
            <i slot="reference" class="el-icon-circle-plus-outline" />
          </el-popover>
        </div>
        <el-table :data="leaveData" style="width: 100%">
          <el-table-column prop="e_name" label="申请人" />
          <el-table-column prop="type" label="请假类型">
            <template slot-scope="scope">
              {{ retLeaveValue(scope.row.type) }}
            </template>
          </el-table-column>
          <el-table-column prop="start_date" label="开始时间" />
          <el-table-column prop="end_date" label="结束时间" />
          <el-table-column prop="duration" label="休假时长" />
          <el-table-column prop="real_duration" label="实际休假时长" />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关 闭</el-button>
        <!-- <el-button type="primary" @click="handEditAtt">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import UploadExcelComponent from '@/components/Oa/UploadExcel/index'
import Moment from 'moment'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { retLeaveValue } from '@/utils/common'
import { getWorkAttendance, putWorkAttendance, getWorkAttendanceTmp, putWorkAttendanceTmp, delWorkAttendanceTmp,
  getWorkDeptuser, downWorkPos, downWorkData, checkPostAtt, getLeavebydate, addWorkAttendanceTmp } from '@/api/work'
import AttStatus from '@/components/common/AttStatus'
export default {
  name: 'MonthAtt',
  components: { AttStatus },
  data() {
    return {
      isConfirm: 0,
      checkList: [],
      leaveList: [],
      leaveData: [],
      tableHeader: [],
      tableData: [],
      calendarData: [],
      value: new Date(),
      planDate: new Date(),
      nowDate: new Date(),
      filterText: '',
      treedata: [],
      defaultProps: {
        children: 'users',
        label: 'name'
      },
      api: '',
      myHeaders: {},
      visible: false,
      ruleForm: {
        ID: '',
        dept: '',
        name: '',
        attendance_date: '',
        check_in: '',
        check_out: '',
        in_status: '',
        in_result: '',
        out_status: '',
        out_result: ''
      },
      radio: '',
      name: ''
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
    // this.init()
  },
  methods: {
    async init() {
      const res = await getWorkDeptuser({ name: '', year: '2020', month: '08' })
      const treedata = res.data
      for (let i = 0; i < treedata.length; i++) {
        treedata[i]['name'] = treedata[i].dept
      }
      this.treedata = treedata
    },
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
        if (Moment(this.nowDate).format('YYYY-MM-DD').substring(5, 7) !== Moment(this.value).format('YYYY-MM-DD').substring(5, 7)) {
          (async() => {
            this.value = Moment(this.value).format('YYYY-MM-DD')
            this.nowDate = this.value
            this.planDate = this.value
            this.getCalendarData()
          })()
        } else {
          (async() => {
            this.visible = true
            this.value = Moment(this.value).format('YYYY-MM-DD')
            this.nowDate = this.value
            this.planDate = this.value
            const res = await getLeavebydate({ date: this.value, name: this.name })
            if (res.ret === 0) {
              this.leaveList = res.data
            }
            const from = this.calendarData.find((item) => { return item.date === this.value })
            if (from) {
              const tmps = JSON.parse(JSON.stringify(from.tmps))
              for (let index = 0; index < tmps.length; index++) {
                tmps[index].isEdit = false
              }
              this.tableData = tmps
              if (this.tableData[0].leave_id !== 0) {
                this.checkList = [this.tableData[0].leave_id]
                this.leaveData = this.leaveList
              }
            } else {
              this.tableData = []
            }
          })()
        }
      }, 100)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    oneUpload(response, file, fileList) {
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
    async closeVisble() {
      const res = await getWorkAttendanceTmp({ name: this.name, year: this.value.substring(0, 4), month: this.value.substring(5, 7) })
      if (res.ret === 0 && res.data.length !== 0) {
        const attenData = res.data
        for (let i = 0; i < attenData.length; i++) {
          attenData[i]['months'] = [attenData[i].date.substring(5, 7)]
          attenData[i]['days'] = [attenData[i].date.substring(8, 10)]
        }
        this.calendarData = attenData
      }
    },
    addAtt() {
      this.tableData.push({
        dept: '', name: '', status: '', result: '', check_time: '', employee_id: '', leave_id: 0, isEdit: true
      })
    },
    inChange(value, index) {
      this.tableData[index].status = this.retResult(value)
    },
    async handleNodeClick(data) {
      this.$message.closeAll()
      this.$message({
        message: data.name,
        type: 'info'
      })
      this.isConfirm = data.is_confirm
      this.name = data.name
      switch (this.isConfirm) {
        case 0:
          this.getCalendarDataTmp()
          break
        case 1:
          this.getCalendarDataCheck()
          break
        default:
          this.getCalendarData()
          break
      }
    },
    /**
     * 获取考勤数据 先去请求getWorkAttendance如果getWorkAttendance没有数据再去请求getWorkAttendanceTmp临时表
     */
    async getCalendarData() {
      this.calendarData = []
      let attenData = []
      const res = await getWorkAttendance({ name: this.name, year: this.value.substring(0, 4), month: this.value.substring(5, 7) })
      if (res.ret === 0) {
        if (res.data.length === 0) {
          const resTmp = await getWorkAttendanceTmp({ name: this.name, year: this.value.substring(0, 4), month: this.value.substring(5, 7) })
          if (resTmp.ret === 0 && resTmp.data) {
            attenData = resTmp.data
            for (let i = 0; i < attenData.length; i++) {
              attenData[i]['months'] = [attenData[i].date.substring(5, 7)]
              attenData[i]['days'] = [attenData[i].date.substring(8, 10)]
            }
            this.calendarData = attenData
          }
        } else {
          attenData = res.data
          for (let i = 0; i < attenData.length; i++) {
            attenData[i]['months'] = [attenData[i].date.substring(5, 7)]
            attenData[i]['days'] = [attenData[i].date.substring(8, 10)]
          }
          this.calendarData = attenData
        }
      }
    },
    /**
     * 获取考勤数据isconfig === 1
     */
    async getCalendarDataCheck() {
      this.calendarData = []
      let attenData = []
      const res = await getWorkAttendance({ name: this.name, year: this.value.substring(0, 4), month: this.value.substring(5, 7) })
      if (res.ret === 0 && res.data) {
        attenData = res.data
        for (let i = 0; i < attenData.length; i++) {
          attenData[i]['months'] = [attenData[i].date.substring(5, 7)]
          attenData[i]['days'] = [attenData[i].date.substring(8, 10)]
        }
        this.calendarData = attenData
      }
    },
    /**
     * 获取考勤数据isconfig === 1
     */
    async getCalendarDataTmp() {
      this.calendarData = []
      let attenData = []
      const res = await getWorkAttendanceTmp({ name: this.name, year: this.value.substring(0, 4), month: this.value.substring(5, 7) })
      if (res.ret === 0 && res.data) {
        attenData = res.data
        for (let i = 0; i < attenData.length; i++) {
          attenData[i]['months'] = [attenData[i].date.substring(5, 7)]
          attenData[i]['days'] = [attenData[i].date.substring(8, 10)]
        }
        this.calendarData = attenData
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    handEdit(row, index) {
      this.tableData[index].isEdit = true
    },
    async handDel(row, index) {
      const isDelete = await this.$confirm(`确定删除`, '提示', { type: 'warning' })
      if (!isDelete) {
        return
      }
      const res = await delWorkAttendanceTmp(row.ID)
      if (res.ret === 0) {
        this.$message.success('删除成功')
        this.tableData.splice(index, 1)
      }
    },
    async handSave(row, index) {
      if (this.isConfirm === 1) {
        const obj = {
          ID: this.tableData[0].ID,
          dept: this.tableData[0].dept,
          name: this.tableData[0].name,
          attendance_date: this.tableData[0].attendance_date,
          check_in: this.tableData[0].check_time,
          check_out: this.tableData[1].check_time,
          in_status: this.tableData[0].status,
          out_status: this.tableData[1].status,
          in_result: this.tableData[0].result,
          out_result: this.tableData[1].result
        }
        const res = await await putWorkAttendance(obj)
        if (res.ret === 0) {
          this.$message.success('修改成功')
        }
        this.tableData[0].isEdit = false
        this.tableData[1].isEdit = false
      } else {
        if (row.ID === 0) {
          const resAdd = await addWorkAttendanceTmp(row)
          if (resAdd.ret === 0) {
            this.$message.success('新增记录成功')
            this.tableData[index].isEdit = false
          }
        } else {
          const res = await putWorkAttendanceTmp(row)
          if (res.ret === 0) {
            this.$message.success('修改记录成功')
            this.tableData[index].isEdit = false
          }
        }
      }
    },
    async dateChange() {
      this.value = this.planDate
      this.nowDate = this.planDate
      if (!this.value) {
        return
      }
      const resName = await getWorkDeptuser({ name: '', year: this.value.substring(0, 4), month: this.value.substring(5, 7) })
      const treedata = resName.data
      for (let i = 0; i < treedata.length; i++) {
        treedata[i]['name'] = treedata[i].dept
      }
      this.treedata = treedata
    },
    async handleCommand(command) {
      switch (command) {
        case 'POS':
          this.downWorkPos()
          break
        case 'ALL':
          this.downWorkData()
          break
        default:
          break
      }
    },
    async downWorkPos() {
      const res = await await downWorkPos({ year: '2020', month: '08' })
      const blob = new Blob([res])
      const fileName = `${Moment(this.value).format('YYYY-MM-DD')}.xlsx`
      if ('download' in document.createElement('a')) {
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        window.URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
      } else {
        window.navigator.msSaveBlob(blob, fileName)
      }
    },
    async downWorkData() {
      const res = await await downWorkData({ year: '2020', month: '08' })
      const blob = new Blob([res])
      const fileName = `${Moment(this.value).format('YYYY-MM-DD')}.xlsx`
      if ('download' in document.createElement('a')) {
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        window.URL.revokeObjectURL(link.href)
        document.body.removeChild(link)
      } else {
        window.navigator.msSaveBlob(blob, fileName)
      }
    },
    async checkboxChange() {
      /**
       * 目前只做了关联一条记录的 后续后端接口支持再优化
       */
      if (this.checkList.length === 0) {
        this.leaveData = []
        if (this.tableData) {
          const row = this.tableData[0]
          row.leave_id = 0
          await putWorkAttendanceTmp(row)
        }
      } else {
        this.leaveData = this.leaveList
        if (this.tableData) {
          const row = this.tableData[0]
          row.leave_id = this.checkList[0]
          const res = await putWorkAttendanceTmp(row)
          if (res.ret === 0) {
            this.$message.success('关联请假成功')
          }
        }
      }
    },
    async checkData() {
      const name = this.$refs.tree.getCheckedNodes().map((item) => item.name)
      if (name.length !== 0) {
        const res = await checkPostAtt({ year: '2020', month: '08', name })
        if (res.ret === 0) {
          this.$message.success('确定考勤成功')
        }
      } else {
        this.$message.error('请先选择员工')
      }
    },
    retLeaveValue,
    retCheclLabel(data) {
      return `${this.retLeaveValue(data.type)} ${data.start_date}(${data.start}) ${data.end_date}(${data.end}) ${data.duration}h `
    },
    retResult(value) {
      let res = ''
      if (value === '弹性' || value === '在家办公' || value === '忘记打卡' || value === '通宵') {
        res = 'Normal'
      } else {
        res = 'Exception'
      }
      return res
    }
  }
}
</script>

<style lang="scss">
.attend-container {
  .el-calendar__body {
    table {
      thead {
        background-color:#F7F9FA;
      }
    }
  }
  .el-calendar-day {
    padding: 0;
    height: auto;
    min-height: 100px;
  }
  .el-calendar__header {
    display: none;
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
  .top-btn {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 20px;
    margin-bottom: 10px;
  }
  .content {
    display: flex;
    .left {
      width: 230px;
      max-height: 700px;
      overflow-y: auto;
    }
    .left::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
      background-color:#f8f8f8;
    }
    .left::-webkit-scrollbar {//滚动条的宽度
      width:9px;
      height:9px;
    }
    .left::-webkit-scrollbar-thumb {//滚动条的设置
      background-color:#dddddd;
      background-clip:padding-box;
      min-height:28px;
    }
    .left::-webkit-scrollbar-thumb:hover {
      background-color:#bbb;
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
      .selected-con {
        position: relative;
        .is-selected {
          color: #BCC0C3;
          font-size: 14px;
          margin-bottom: 3px;
          display: flex;
          align-items: center;
          .calendar-day-p {
            position: absolute;
            top: -25px;
            right: 0;
          }
          .calendar-day-p2 {
            position: absolute;
            top: -25px;
            right: 50px;
          }
        }
      }
    }
  }
  .dialog-content {
    .header {
      background-color: #F7F8FA;
      display: flex;
      align-items: center;
      height: 44px;
      color: #2B2B2B;
      font-size: 14px;
      font-weight: 500;
      padding: 0 10px;
      div {
        flex: 1;
      }
    }
    .item-time {
      display: flex;
      align-items: center;
      height: 44px;
      font-size: 12px;
      color: #333333;
      border-top: 1px solid #D8D8D8;
      div {
        flex: 1;
        display: flex;
        align-items: center;
      }
      .item-date {
        flex: 1.2;
      }
    }
    .item-time:last-child {
      border-bottom: 1px solid #D8D8D8;
    }
    .leave-history {
      font-size: 14px;
      font-weight: 500;
      color: #2B2B2B;
      line-height: 21px;
      margin-top: 15px;
      .el-icon-circle-plus-outline {
        color: #3293FF;
      }
      .el-icon-circle-plus-outline:hover {
        cursor: pointer;
      }
    }
  }
}
.el-radio-group {
  .radio {
    display: flex;
    .radio-item {
      display: flex;
      flex-direction: column;
      label {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
