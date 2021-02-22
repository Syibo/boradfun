<template>
  <div class="container equipmentdetail-container">
    <h3>设备编号：{{ detailData.device_code }}</h3>
    <el-tabs v-model="activeName">
      <el-tab-pane label="详细信息" name="first">
        <el-row style="color: rgba(0, 0, 0, 0.85); font-size: 14px;">
          <el-row class="margin-b-20">
            <el-col :span="8"><span class="w100">设备类型</span> {{ detailData.device_category }}</el-col>
            <el-col :span="8"><span class="w100">购买日期</span> {{ detailData.purchase_date }}</el-col>
          </el-row>
          <el-row class="margin-b-20">
            <el-col :span="8"><span class="w100">资产编号</span> {{ detailData.device_code }}</el-col>
            <el-col :span="8"><span class="w100">供应商</span> {{ detailData.retailer }}</el-col>
          </el-row>
          <el-row class="margin-b-20">
            <el-col :span="8"><span class="w100">设备名称</span> {{ detailData.device_name }}</el-col>
            <el-col :span="8"><span class="w100">购买价格</span> {{ detailData.purchase_price }}</el-col>
          </el-row>
          <el-row class="margin-b-20">
            <el-col :span="8"><span class="w100">CPU</span> {{ detailData.cpu }}</el-col>
            <!-- <el-col :span="8"><span class="w100">订单号</span> </el-col> -->
            <el-col :span="8"><span class="w100">增值税价格</span> {{ detailData.vat }}</el-col>
          </el-row>
          <el-row class="margin-b-20">
            <el-col :span="8"><span class="w100">运存</span> {{ detailData.mem }}</el-col>
            <el-col :span="8"><span class="w100">保修日期(月)</span> {{ detailData.warranty_period }}</el-col>
          </el-row>
          <el-row class="margin-b-20">
            <el-col :span="8"><span class="w100">显卡</span> {{ detailData.device_code }}</el-col>
            <el-col :span="8"><span class="w100">是否可以申领</span> {{ detailData.is_apply ? '是' : '否' }}</el-col>
          </el-row>
          <el-row class="margin-b-20">
            <el-col :span="8"><span class="w100">存储容量</span> {{ detailData.volume }}</el-col>
            <el-col :span="8"><span class="w100">位置</span> {{ detailData.site }}</el-col>
          </el-row>
          <el-row class="margin-b-20">
            <el-col :span="8"><span class="w100">状态</span> <ProStatus :status="detailData.device_status" /> </el-col>
            <!-- <el-col :span="8"><span class="w100">位置</span> {{ detailData.site }}</el-col> -->
          </el-row>
          <el-row class="margin-b-20">
            <el-col :span="8"><span class="w100">序列号</span> {{ detailData.mac_address_1 }}</el-col>
          </el-row>
        </el-row>
      </el-tab-pane>
      <el-tab-pane v-if="roles[0] === 7 || isCeo || roles[0] === 8 || roles[0] === 9" label="活动记录" name="second">
        <el-table :data="detailData.device_requisitions" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
          <el-table-column align="center" label="日期">
            <template slot-scope="scope">
              <span> {{ Moment(scope.row.UpdatedAt).format('YYYY-MM-DD HH:mm:ss') }} </span>
            </template>
          </el-table-column>
          <el-table-column prop="outgoing_operator_name" align="center" label="操作人" />
          <el-table-column align="center" label="类别">
            <template slot-scope="scope">
              {{ retlowValue(scope.row.operator_category) }}
            </template>
          </el-table-column>
          <el-table-column prop="associate_employee_name" align="center" label="关联员工" />
          <el-table-column prop="comment" align="center" label="备注" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { deviceDetail } from '@/api/property'
import permission from '@/directive/permission/index.js' // 权限判断指令
import { mapGetters } from 'vuex'
import Moment from 'moment'
import ProStatus from '@/components/Property/ProStatus'
import { getToken } from '@/utils/auth'
import { retlowValue } from '@/utils/common'
export default {
  name: 'EquipmentDetail',
  components: {
    ProStatus
  },
  directives: { permission },
  data() {
    return {
      activeName: 'first',
      id: 0,
      email: '',
      detailData: {
        device_requisitions: []
      }
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
    this.id = this.$route.query.id
    this.init()
    console.log(this.roles)
  },
  methods: {
    Moment,
    retlowValue,
    async init() {
      const res = await deviceDetail(this.id)
      if (res.ret === 0) {
        this.detailData = res.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.equipmentdetail-container {
  background-color: white;
  .w100 {
    font-size: 14px;
      color: #808387;
      display: inline-block;
      width: 120px;
  }
}
</style>
