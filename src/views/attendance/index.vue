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
          @node-click="handleNodeClick"
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
        <el-calendar id="calendar" v-model="value">
          <template slot="dateCell" slot-scope="{data}">
            <div slot="reference" class="date-cla" @click="handDayClick(data)">
              <div class="calendar-day">
                <span class="calendar-day-span">{{ data.day.split('-').slice(2).join('-') }}</span>
              </div>
              <div v-for="(item, index) in calendarData" :key="index" class="selected-con">
                <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                  <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                    <div class="is-selected"><span> {{ item.check_in }} </span> <el-tag v-if="item.in_status !== 'Normal'" size="mini" class="calendar-day-p" type="danger">{{ item.in_result }}</el-tag> </div>
                    <div class="is-selected"><span> {{ item.check_out }} </span> <el-tag v-if="item.out_status !== 'Normal'" size="mini" class="calendar-day-p2" type="danger">{{ item.out_result }}</el-tag> </div>
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
          员工{{ value }}打卡明细
        </div>
        <div class="dialog-title-right">
          <el-button type="text" @click="editAtt"> 编辑考勤 </el-button>
        </div>
      </span>
      <div class="dialog-content">
        <!-- <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="打卡时间" width="180" />
          <el-table-column prop="name" label="打卡结果" width="180" />
          <el-table-column prop="address" label="异常判断" />
        </el-table> -->
        <div class="header">
          <div style="flex: 1.2">打卡时间</div>
          <div>打卡结果</div>
          <div>异常判断</div>
        </div>
        <div class="item-time">
          <div class="item-date">
            <span>{{ ruleForm.check_in }}</span>
            <el-date-picker
              v-if="isEdit"
              v-model="ruleForm.check_in"
              style="margin: 0 10px"
              type="datetime"
              placeholder="选择日期时间"
              size="mini"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :clearable="false"
            />
          </div>
          <div> <AttStatus :status="ruleForm.in_status" /> </div>
          <div>
            <span>{{ ruleForm.in_result }}</span>
            <el-popover
              v-if="isEdit"
              placement="bottom-start"
              width="200"
              title="打卡结果"
              trigger="click"
            >
              <el-radio-group v-model="ruleForm.in_result" @change="inChange">
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
          </div>
        </div>
        <div class="item-time">
          <div class="item-date">
            <span>{{ ruleForm.check_out }}</span>
            <el-date-picker
              v-if="isEdit"
              v-model="ruleForm.check_out"
              style="margin: 0 10px"
              type="datetime"
              placeholder="选择日期时间"
              size="mini"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :clearable="false"
            />
          </div>
          <!-- <div>{{ ruleForm.out_status }}</div> -->
          <div> <AttStatus :status="ruleForm.out_status" /> </div>
          <div>
            <span>{{ ruleForm.out_result }}</span>
            <el-popover
              v-if="isEdit"
              placement="bottom-start"
              width="200"
              title="打卡结果"
              trigger="click"
            >
              <el-radio-group v-model="ruleForm.out_result" @change="outChange">
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
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handEditAtt">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import UploadExcelComponent from '@/components/Oa/UploadExcel/index'
import Moment from 'moment'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { getWorkAttendance, putWorkAttendance } from '@/api/work'
import AttStatus from '@/components/common/AttStatus'
export default {
  name: 'MonthAtt',
  components: { AttStatus },
  data() {
    return {
      tableHeader: [],
      tableData: [{
        date: '2016-05-02',
        name: '异常',
        address: '无'
      }],
      calendarData: [],
      value: new Date(),
      planDate: new Date(),
      nowDate: new Date(),
      filterText: '',
      treedata: [{
        id: 1,
        label: '游戏测试',
        children: [{
          id: 4,
          label: '陈鹏宇'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
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
      isEdit: false,
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
        if (Moment(this.nowDate).format('YYYY-MM-DD').substring(5, 7) !== Moment(this.value).format('YYYY-MM-DD').substring(5, 7)) {
          (async() => {
            this.value = Moment(this.value).format('YYYY-MM-DD')
            this.nowDate = this.value
            this.planDate = this.value
            if (!this.value) {
              return
            }
            if (!this.name) {
              this.$message.error('先选择员工')
              return
            }
            const res = await getWorkAttendance({ name: this.name, year: this.value.substring(0, 4), month: this.value.substring(5, 7) })
            if (res.ret === 0 && res.data.length !== 0) {
              const attenData = res.data[0].users[0].attendances
              for (let i = 0; i < attenData.length; i++) {
                attenData[i]['months'] = [attenData[i].attendance_date.substring(5, 7)]
                attenData[i]['days'] = [attenData[i].attendance_date.substring(8, 10)]
              }
              this.calendarData = attenData
            }
          })()
        } else {
          this.visible = true
          this.value = Moment(this.value).format('YYYY-MM-DD')
          this.nowDate = this.value
          this.planDate = this.value
          const from = this.calendarData.find((item) => { return item.attendance_date === this.value })
          if (from) {
            this.ruleForm = JSON.parse(JSON.stringify(from))
          }
        }
      }, 100)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
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
    closeVisble() {
      this.isEdit = false
    },
    editAtt() {
      this.isEdit = true
    },
    inChange(value) {
      this.ruleForm.in_status = this.retResult(value)
    },
    outChange(value) {
      this.ruleForm.out_status = this.retResult(value)
    },
    handleNodeClick(data) {
      // eslint-disable-next-line eqeqeq
      if (data.$treeNodeId == 2) {
        this.name = data.label
      }
    },
    async handEditAtt() {
      console.log(this.ruleForm)
      const res = await putWorkAttendance(this.ruleForm)
      if (res.ret === 0) {
        this.$message.success('修改记录成功')
        this.visible = false
        this.dateChange()
      }
    },
    async dateChange() {
      this.value = this.planDate
      if (!this.value) {
        return
      }
      if (!this.name) {
        this.$message.error('先选择员工')
        return
      }
      const res = await getWorkAttendance({ name: this.name, year: this.value.substring(0, 4), month: this.value.substring(5, 7) })
      if (res.ret === 0 && res.data.length !== 0) {
        const attenData = res.data[0].users[0].attendances
        for (let i = 0; i < attenData.length; i++) {
          attenData[i]['months'] = [attenData[i].attendance_date.substring(5, 7)]
          attenData[i]['days'] = [attenData[i].attendance_date.substring(8, 10)]
        }
        this.calendarData = attenData
      }
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
