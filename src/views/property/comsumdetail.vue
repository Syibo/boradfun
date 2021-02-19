<template>
  <div class="container comsumdetail-container">
    <div class="top">
      <span class="title">详情</span>
      <div>
        <el-button type="primary" @click="openFrom">借出</el-button>
        <el-button type="primary" @click="scrapFun">报废录入</el-button>
      </div>
    </div>
    <div class="info">
      <el-row class="margin-b-10">
        <el-col :span="5"><span class="label">物品名称：</span>{{ detail.low_price_article_name }}</el-col>
        <el-col :span="5"><span class="label">品牌：</span>{{ detail.brand }}</el-col>
        <el-col :span="5"><span class="label">价格：</span>{{ detail.purchase_price }}</el-col>
        <el-col :span="5"><span class="label">是否需归还：</span>{{ detail.need_return === 0 ? '否' : '是' }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><span class="label">零售商：</span>{{ detail.retailer }}</el-col>
        <el-col :span="5"><span class="label">数量：</span>{{ detail.total_quantity }}</el-col>
        <el-col :span="5"><span class="label">位置：</span>{{ detail.site }}</el-col>
      </el-row>
    </div>

    <div class="top">
      <span class="title">统计</span>
    </div>
    <el-row :gutter="20" class="three">
      <el-col :span="5">
        <div class="three-item">
          <div class="num">总数：{{ detail.total_quantity }}</div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="three-item">
          <div class="num">已借出：{{ detail.outgoing_quantity }}</div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="three-item">
          <div class="num">报废数量：{{ detail.scrap_quantity }}</div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="three-item">
          <div class="num">剩余可用：{{ detail.total_quantity - detail.outgoing_quantity - detail.scrap_quantity }}</div>
        </div>
      </el-col>
    </el-row>
    <div class="top">
      <span class="title">操作记录</span>
    </div>
    <el-row class="table-top">
      <div class="left">
        <el-select v-model="seachValue.category" placeholder="类别" class="top-search" clearable>
          <el-option v-for="item in LOWTYPE" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="seachValue.employee_name" class="top-search" placeholder="搜索" clearable />
        <el-button type="primary" @click="seachFun">搜索</el-button>
      </div>
      <div class="right">
        <el-button type="primary" @click="batchRet">批量归还</el-button>
      </div>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" :selectable="checkboxSelect" />
      <el-table-column align="center" label="操作时间">
        <template slot-scope="scope">
          <span> {{ Moment(scope.row.UpdatedAt).format('YYYY-MM-DD HH:mm:ss') }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="operator_name" align="center" label="操作人" />
      <el-table-column align="center" label="类别">
        <template slot-scope="scope">
          {{ retlowValue(scope.row.operator_category) }}
        </template>
      </el-table-column>
      <el-table-column prop="quantity" align="center" label="数量" />
      <el-table-column prop="associate_employee_name" align="center" label="关联员工" />
      <el-table-column prop="comment" align="center" label="备注" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.operator_category !== 'Outgoing' || scope.row.is_return === 1" type="text" @click="lowReturn(scope.row)">归还</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-cla">
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

    <ConsumOutFrom :id="id" :visible="consumableFromVisible" :info="detail" @close="close" @success="success" />
    <ConsumScrap :id="id" :visible="consumScrapVisible" :info="detail" @close="close" @success="success" />

    <el-dialog title="易耗品归还" :visible="retVisible" :close-on-click-modal="false" width="600px" @close="closeVisble">
      <el-row class="base-label">基本信息</el-row>
      <el-row class="base-info">
        <el-col class="margin-b-10" :span="5">归坏物品</el-col>
        <el-col class="margin-b-10" :span="19">{{ `${detail.low_price_article_name}-${detail.brand}` }}</el-col>
        <el-col :span="5">归还人</el-col>
        <el-col :span="19">{{ associateEmployeeName }}</el-col>
      </el-row>
      <el-row class="status">状态</el-row>
      <el-row>
        <el-radio v-model="retFrom.status" label="Ok">正常</el-radio>
        <el-radio v-model="retFrom.status" label="Scrap">报废</el-radio>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeVisble">取 消</el-button>
        <el-button type="primary" @click="checkBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { lowPriceArticleDetail, getLowPriceArticleList, postLowPriceArticleReturn, postLowPriceArticleReturnBatch } from '@/api/property'
import ConsumOutFrom from '@/components/Property/ConsumOutFrom'
import ConsumScrap from '@/components/Property/ConsumScrap'
import { LOWTYPE } from '@/utils/const'
import { retlowValue } from '@/utils/common'
import { parseTime } from '@/utils'
import Moment from 'moment'
import { TableSelections } from '@/mixins/TableSelections'
export default {
  name: 'Comsumdetail',
  components: {
    ConsumOutFrom,
    ConsumScrap
  },
  mixins: [TableSelections],
  data() {
    return {
      LOWTYPE,
      detail: {},
      consumableFromVisible: false,
      consumScrapVisible: false,
      retVisible: false,
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        category: '',
        low_price_article_id: 0,
        employee_name: ''
      },
      retFrom: {
        id: 0,
        status: 'Ok'
      },
      associateEmployeeName: '',
      tableData: [],
      total: 0,
      departmentList: [],
      id: 0
    }
  },
  watch: {
    'seachValue.pagenum': {
      handler() {
        this.pageSelection = []
      },
      deep: true
    }
  },
  mounted() {
    this.id = Number(this.$route.query.id)
    this.seachValue.low_price_article_id = this.id
    this.init()
    this.list()
  },
  methods: {
    retlowValue,
    parseTime,
    Moment,
    async init() {
      const res = await lowPriceArticleDetail(this.id)
      if (res.ret === 0) {
        this.detail = res.data
      }
    },
    async list() {
      const res = await getLowPriceArticleList(this.seachValue)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
        this.tableData = res.data.list.map((item) => {
          if (this.selectIds.includes(item.ID)) {
            item.CHECKED = true
          }
          return item
        })
        this.selectionAsDataSource()
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    /**
     * 选择对应的row (供父组件调用)
     * @param {Number} index 要选中的行
     */
    selectionRow(index) {
      this.$refs.multipleTable.toggleRowSelection(this.tableData[index], true)
    },
    /**
     * 遍历dataSource 选中
     * 用于参数配置了 CHECKED 属性之后默认选中
     */
    selectionAsDataSource() {
      this.tableData.forEach((item, index) => {
        if (item['CHECKED']) {
          this.$nextTick(() => this.selectionRow(index))
        }
      })
    },
    async batchRet() {
      if (this.selectIds.length === 0) {
        this.$message.error('当前没有选择归还数据')
        return
      }
      const ids = this.selectIds.join(',')
      const res = await postLowPriceArticleReturnBatch(ids)
      if (res.ret === 0) {
        this.$message.success('操作成功')
        this.selectIds = []
        this.list()
        this.init()
      }
    },
    openFrom() {
      this.consumableFromVisible = true
    },
    scrapFun() {
      this.consumScrapVisible = true
    },
    close() {
      this.consumableFromVisible = false
      this.consumScrapVisible = false
    },
    success() {
      this.consumableFromVisible = false
      this.consumScrapVisible = false
      this.list()
      this.init()
    },
    lowReturn(item) {
      this.associateEmployeeName = item.associate_employee_name
      this.retFrom.id = item.ID
      this.retVisible = true
    },
    async checkBtn() {
      const res = await postLowPriceArticleReturn(this.retFrom)
      if (res.ret === 0) {
        this.$message.success('归还成功')
        this.list()
        this.init()
      }
      this.retVisible = false
    },
    closeVisble() {
      this.retFrom.id = 0
      this.retFrom.status = 'Ok'
      this.associateEmployeeName = ''
      this.retVisible = false
    },
    handleClick() {},
    handleDel() {},
    seachFun() {
      this.list()
    },
    handleSizeChange(val) {
      this.seachValue.pagenum = 1
      this.seachValue.pagesize = val
      this.list()
    },
    handleCurrentChange(val) {
      this.seachValue.pagenum = val
      this.list()
    },
    handleSelectionChange(val) {
      this.selection(val, 'ID')
    },
    checkboxSelect(row, rowIndex) {
      if (row.operator_category !== 'Outgoing' || row.is_return === 1) {
        return false // 禁用
      } else {
        return true // 不禁用
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: rgba(0, 0, 0, 0.85);
}
.base-label {
  color: #2b2b2b;
  font-size: 16px;
  margin-bottom: 10px;
}
.base-info {
  background-color: rgba(228, 233, 238, 0.5);
  padding: 20px 10px;
}
.status {
  display: flex;
  margin-top: 30px;
  margin-bottom: 10px;
}
.status::before {
  content: "*";
  color: #ff4949;
  margin-right: 4px;
}
.comsumdetail-container {
  background-color: white;
  .top {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    span {
      flex: 1;
    }
  }
  .info {
    margin-bottom: 40px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    .label {
      color: #808387;
    }
    span {
      display: inline-block;
      width: 100px;
    }
  }
  .three {
   margin-bottom: 40px;
   color: #202d40;
   .three-item {
     min-height: 100px;
     background-color: rgba(228, 233, 238, 0.5);
     display: flex;
     padding: 0 20px;
     align-items: center;
   }
 }
 .pagination-cla {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
