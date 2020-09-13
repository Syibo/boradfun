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
        <el-button type="primary">筛选</el-button>
      </div>
      <div class="right">
        <el-button type="primary" @click="induction">新建入职</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="ID" align="center" label="员工编号" />
      <el-table-column align="center" label="员工姓名">
        <template slot-scope="scope">
          <span class="bule-hover" @click="openDra(scope.row)"> {{ scope.row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="department.department_name" align="center" label="所属部门" />
      <el-table-column prop="service_line" align="center" label="服务线" />
      <el-table-column prop="email" align="center" label="企业邮箱" show-overflow-tooltip />
      <el-table-column prop="mobile" align="center" label="手机号码" />
      <el-table-column prop="create_time" align="center" label="实际入职时间" show-overflow-tooltip sortable />
      <el-table-column align="center" label="合同信息">
        <template>
          <span class="bule-hover"> 查看详情 </span>
        </template>
      </el-table-column>
      <el-table-column prop="" align="center" label="转正时间" />
      <el-table-column prop="status" align="center" label="员工状态" />
      <el-table-column prop="create_time" align="center" label="创建时间" show-overflow-tooltip sortable />
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="broadfun_block">
      <el-pagination
        :current-page="seachValue.pagenum"
        :page-sizes="[10, 20, 50]"
        :page-size="seachValue.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog title="新建离职" :visible.sync="dialogVisible" top="50px" :close-on-click-modal="false" :show-close="false" width="80%" class="dialog-container" @close="close">
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
            <el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" disabled placeholder="请输入姓名" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" prop="Gender">
                    <el-radio-group v-model="ruleForm.gender">
                      <el-radio label="男" />
                      <el-radio label="女" />
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="入职状态">
                    <el-select v-model="ruleForm.status" placeholder="" style="width: 100%">
                      <el-option v-for="item in STATUSVALUE" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="实际入职时间">
                    <el-date-picker
                      v-model="ruleForm.entry_date"
                      style="width: 100%"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="ruleForm.mobile" placeholder="" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号">
                    <el-input v-model="ruleForm.id_card" placeholder="" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="员工编号" prop="phone">
                    <el-input v-model="ruleForm.ID" placeholder="" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="民族">
                    <el-input v-model="ruleForm.nation" placeholder="" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="出生年月" prop="phone">
                    <el-input v-model="ruleForm.employee_basic.birthday" placeholder="" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="年龄">
                    <el-input v-model="ruleForm.age" placeholder="" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="私人邮箱" prop="phone">
                    <el-input v-model="ruleForm.personal_email" placeholder="" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="政治面貌">
                    <el-input v-model="ruleForm.politic_status" placeholder="" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
            <Label id="interviewiInfo" title="面试信息" />
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="面试评价">
                  <el-input v-model="ruleForm.interview_comment" type="textarea" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="empolyees-upload">
              <el-col :span="2">
                <el-upload
                  style="margin-top: -20px"
                  :headers="myHeaders"
                  name="file"
                  :action="`${api}/v1/file/upload?bucket=resume`"
                  :on-success="oneUpload"
                  :show-file-list="false"
                >
                  <el-button v-if="ruleForm.resume === ''" icon="el-icon-upload" size="small" type="text">点击上传履历</el-button>
                  <div v-else style="display: flex">
                    <el-button icon="el-icon-upload" type="text">{{ ruleForm.resume }}</el-button>
                    <el-button type="text" @click.stop="downFile(ruleForm.resume)"> 下载 </el-button>
                  </div>
                </el-upload>
              </el-col>
            </el-row>
            <Label id="jobsInfo" title="岗位信息" />
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所属部门">
                  <el-select v-model="ruleForm.department_id" placeholder="" style="width: 100%">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门负责人" prop="phone"> <el-input v-model="ruleForm.department.department_name" placeholder="" /> </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="岗位" prop="phone"> <el-input v-model="ruleForm.position" placeholder="" /> </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="服务线"> <el-input v-model="ruleForm.service_line" placeholder="" /> </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="级别">
                  <el-select v-model="ruleForm.level_id" placeholder="" style="width: 100%">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <Label id="schoolInfo" title="学历信息" />
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="毕业院校">
                  <el-input v-model="ruleForm.employee_basic.graduation_school" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专业">
                  <el-input v-model="ruleForm.employee_basic.major" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="学历">
                  <el-input v-model="ruleForm.employee_basic.degree" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性质">
                  <el-input v-model="ruleForm.employee_basic.degree_property" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="学历验证" prop="Gender">
                  <el-radio-group v-model="ruleForm.employee_basic.degree_verification">
                    <el-radio label="未验证" />
                    <el-radio label="已验证" />
                    <el-radio label="无法验证" />
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <Label id="certificate" title="资格证书" />
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="英语技能">
                  <el-input v-model="ruleForm.employee_basic.en_skill" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="其他技能">
                  <el-input v-model="ruleForm.employee_basic.other_language_skill" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <Label id="familyInfo" title="家庭信息" />
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="籍贯">
                  <el-input v-model="ruleForm.employee_basic.birthplace" placeholder="" />
                  <!-- <el-cascader
                    v-model="ruleForm.employee_basic.birthplace"
                    style="width: 100%"
                    size="small"
                    :options="provinceAndCityData"
                  /> -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="居住城市">
                  <el-cascader
                    v-model="ruleForm.employee_basic.inhabited_city"
                    style="width: 100%"
                    size="small"
                    :options="regionData"
                    @change="handleChange"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="居住详细地址">
                  <el-input v-model="ruleForm.employee_basic.inhabited_address" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="婚姻状态" prop="Gender">
                  <el-radio-group v-model="ruleForm.employee_basic.marriage">
                    <el-radio label="未婚" />
                    <el-radio label="已婚" />
                    <el-radio label="已婚以育" />
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="家庭及其亲属情况">
                  <el-table :data="ruleForm.employee_basic.relations" style="width: 100%;margin: 10px 0" :header-cell-style="{background:'#F7F8FA'}">
                    <el-table-column align="center" label="姓名">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.name" placeholder="请输入姓名" />
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="与您的关系">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.Relation" placeholder="请输入与您的关系" />
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="任职企业">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.company" placeholder="请输入任职企业" />
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="职位">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.job" placeholder="请输入职位" />
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="联系方式">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.phone" placeholder="请输入联系方式" />
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="紧急联系人">
                  <el-table :data="ruleForm.employee_basic.contacts" style="width: 100%;margin-top: 10px" :header-cell-style="{background:'#F7F8FA'}">
                    <el-table-column align="center" label="姓名">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.name" placeholder="请输入姓名" />
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="与您的关系">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.Relation" placeholder="请输入与您的关系" />
                      </template>
                    </el-table-column>
                    <el-table-column align="center" label="联系方式">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.phone" placeholder="请输入联系方式" />
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
            </el-row>
            <Label id="cardInfo" title="卡号信息" />
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="工商银行卡卡号">
                  <el-input v-model="ruleForm.employee_basic.debit_card1" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="招商银行卡卡号">
                  <el-input v-model="ruleForm.employee_basic.debit_card2" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <Label id="accountInfo" title="账号信息" />
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="name">
                  <template slot="label"><span class="form-label-slot">企业邮箱<span>（IT填写）</span></span></template>
                  <el-input v-model="ruleForm.email" placeholder="请输入企业邮箱" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="name">
                  <template slot="label"><span class="form-label-slot">企业微信<span>（IT填写）</span></span></template>
                  <el-input v-model="ruleForm.wx_work" placeholder="请输入企业微信" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="name">
                  <template slot="label"><span class="form-label-slot">TAPD<span>（IT填写）</span></span></template>
                  <el-input v-model="ruleForm.tapd" placeholder="请输入TAPD" />
                </el-form-item>
              </el-col>
            </el-row>
            <Label id="contractInfo" title="合同信息" />
            <el-table :data="conData" style="width: 100%;margin: 20px 0" :header-cell-style="{background:'#F7F8FA'}">
              <el-table-column prop="contract_type" align="center" label="合同编号/名称" />
              <el-table-column prop="contract_start_date" align="center" label="合同开始时间" />
              <el-table-column prop="contract_end_date" align="center" label="合同到期时间" />
              <el-table-column prop="contract_party" align="center" label="签约方" />
              <el-table-column prop="contract_main" align="center" label="签订主体" />
              <el-table-column prop="status" align="center" label="签订状态" />
              <el-table-column align="center" label="操作" width="120">
                <template>
                  <el-button type="text" size="small">编辑</el-button>
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <Label id="documentInfo" title="文档信息" />
            <el-row :gutter="20">
              <el-form-item label="身份证复印件">
                <el-col :span="8">
                  <el-upload
                    class="avatar-uploader"
                    :headers="myHeaders"
                    name="file"
                    :action="`${api}/v1/file/upload?bucket=idcard`"
                    :on-success="oneUploadCardfront"
                    :show-file-list="false"
                  >
                    <img v-if="ruleForm.employee_basic.id_card_front" :src="ruleForm.employee_basic.id_card_front" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="avatar-uploader"
                    :headers="myHeaders"
                    name="file"
                    :action="`${api}/v1/file/upload?bucket=idcard`"
                    :on-success="oneUploadCardBack"
                    :show-file-list="false"
                  >
                    <img v-if="ruleForm.employee_basic.id_card_back" :src="ruleForm.employee_basic.id_card_back" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row :gutter="20">
              <el-form-item label="学历证书复印件">
                <el-col :span="24">
                  <el-upload
                    class="avatar-uploader"
                    :headers="myHeaders"
                    name="file"
                    :action="`${api}/v1/file/upload?bucket=degree`"
                  >
                    <i class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <ArchivesDrawer ref="archivesDrawer" :base-data="baseData" :con-data="conData" />

  </div>
</template>

<script>
import Label from '@/components/common/Label.vue'
import { regionData, provinceAndCityData } from 'element-china-area-data'
import { getEmployeeList, getEmployeeAllDetail, putEmployeeDetail, getContractsAllDetail } from '@/api/employee'
import { ruleForm } from './config'
import { STATUSVALUE, DOWNURL } from '@/utils/const'
import store from '@/store'
import { getToken } from '@/utils/auth'
import ArchivesDrawer from '@/components/Oa/ArchivesDrawer'
export default {
  components: {
    Label,
    ArchivesDrawer
  },
  data() {
    return {
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        name: '',
        departmentid: '',
        status: 2
      },
      regionData,
      STATUSVALUE,
      provinceAndCityData,
      selectedOptions: [],
      label: [
        { label: '基本信息', href: 'baseInfo' },
        { label: '面试信息', href: 'interviewiInfo' },
        { label: '岗位信息', href: 'jobsInfo' },
        { label: '学历信息', href: 'schoolInfo' },
        { label: '资格证书', href: 'certificate' },
        { label: '家庭信息', href: 'familyInfo' },
        { label: '卡号信息', href: 'cardInfo' },
        { label: '账号信息', href: 'accountInfo' },
        { label: '合同信息', href: 'contractInfo' },
        { label: '文档信息', href: 'documentInfo' }
      ],
      active: 'baseInfo',
      tableData: [],
      conData: [],
      dialogVisible: false,
      total: 0,
      ruleForm,
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
      },
      myHeaders: {},
      api: '',
      baseData: ruleForm
    }
  },
  mounted() {
    this.init()
    this.api = process.env.VUE_APP_BASE_API
    if (store.getters.token) {
      this.myHeaders = {
        'Authorization': JSON.parse(getToken()).session
      }
    }
  },
  methods: {
    async init() {
      const res = await getEmployeeList(this.seachValue)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    induction() {
      this.$router.push({
        path: '/employees/induction'
      })
    },
    async handleClick(item) {
      const con = await getContractsAllDetail(item.ID)
      if (con.ret === 0 && con.data) {
        this.conData = con.data
      }
      const res = await getEmployeeAllDetail(item.ID)
      if (res.ret === 0) {
        this.ruleForm = res.data
        if (this.ruleForm.employee_basic === null) {
          this.ruleForm.employee_basic = ruleForm.employee_basic
        } else {
          this.ruleForm.employee_basic.relations = JSON.parse(this.ruleForm.employee_basic.relations)
          this.ruleForm.employee_basic.contacts = JSON.parse(this.ruleForm.employee_basic.contacts)
          this.ruleForm.employee_basic.inhabited_city = this.ruleForm.employee_basic.inhabited_city ? JSON.parse(this.ruleForm.employee_basic.inhabited_city) : []
        }
      }
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      this.seachValue.pagenum = 1
      this.seachValue.pagesize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.seachValue.pagenum = val
      this.init()
    },
    oneUploadCardfront(response, file, fileList) {
      this.ruleForm.employee_basic.id_card_front = `${DOWNURL}${response.data}`
    },
    oneUploadCardBack(response) {
      this.ruleForm.employee_basic.id_card_back = `${DOWNURL}${response.data}`
    },
    oneUpload(response, file, fileList) {
      this.ruleForm.resume = response.data
    },
    async submitForm() {
      const parms = JSON.parse(JSON.stringify(this.ruleForm))
      parms.employee_basic.relations = JSON.stringify(parms.employee_basic.relations)
      parms.employee_basic.contacts = JSON.stringify(parms.employee_basic.contacts)
      parms.employee_basic.inhabited_city = JSON.stringify(parms.employee_basic.inhabited_city)
      parms.age = Number(parms.age)
      const res = await putEmployeeDetail(parms)
      if (res.ret === 0) {
        console.log(res)
      }
      this.dialogVisible = false
    },
    async openDra(row) {
      const con = await getContractsAllDetail(row.ID)
      if (con.ret === 0 && con.data) {
        this.conData = con.data
      }
      const res = await getEmployeeAllDetail(row.ID)
      if (res.ret === 0) {
        this.baseData = res.data
        this.baseData.employee_basic.relations = JSON.parse(res.data.employee_basic.relations)
        this.baseData.employee_basic.contacts = JSON.parse(res.data.employee_basic.contacts)
      }
      this.$refs.archivesDrawer.openDrawer()
    },
    changeAct(href) {
      this.active = href
      const anchor = this.$el.querySelector(`#${href}`)
      const total = anchor.offsetTop
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
    handleChange(value) {
      console.log(value)
    },
    downFile(file) {
      window.open(`${DOWNURL}${file}`)
    },
    close() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 300px;
    height: 178px;
    display: block;
  }
</style>

<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
  .archives-detail {
    max-height: 700px;
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
      padding: 0 20px;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 700px;
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
