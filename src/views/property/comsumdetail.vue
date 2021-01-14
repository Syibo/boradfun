<template>
  <div class="container comsumdetail-container">
    <div class="top">
      <span>详情</span>
      <div>
        <el-button type="primary" @click="openFrom">借出</el-button>
        <el-button type="primary" @click="scrapFun">报废录入</el-button>
      </div>
    </div>
    <div class="info">
      <el-row class="margin-b-10">
        <el-col :span="5"><span>物品名称：</span>{{ detail.low_price_article_name }}</el-col>
        <el-col :span="5"><span>品牌：</span>{{ detail.brand }}</el-col>
        <el-col :span="5"><span>价格：</span>{{ detail.purchase_price }}</el-col>
        <el-col :span="5"><span>是否需归还：</span>{{ detail.need_return === 0 ? '否' : '是' }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><span>零售商：</span>{{ detail.retailer }}</el-col>
        <el-col :span="5"><span>数量：</span>{{ detail.total_quantity }}</el-col>
        <el-col :span="5"><span>位置：</span>{{ detail.site }}</el-col>
      </el-row>
    </div>

    <div class="top">
      <span>统计</span>
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
      <span>操作记录</span>
    </div>
    <el-row class="table-top">
      <div class="left">
        <el-select v-model="seachValue.category" placeholder="类别" style="width: 150px" clearable>
          <el-option v-for="item in CATEGORY" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="seachValue.keyword" style="width: 150px;margin: 0 10px" placeholder="搜索" clearable />
        <el-button type="primary" @click="seachFun">搜索</el-button>
      </div>
      <div class="right">
        <el-button type="primary">批量归还</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <!-- <el-table-column prop="emp_no" align="center" label="序号">
        <template slot-scope="scope">
          <span class="bule-hover" @click="goDetail(scope.row.ID)">{{ scope.row.ID }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="low_price_article_category" align="center" label="操作时间" />
      <el-table-column prop="low_price_article_name" align="center" label="操作人" />
      <el-table-column prop="brand" align="center" label="类别" />
      <el-table-column prop="total_quantity" align="center" label="数量" />
      <el-table-column prop="ingoing_time" align="center" label="关联员工" />
      <el-table-column prop="create_time" align="center" label="备注" />
      <el-table-column prop="create_time" align="center" label="操作">
        <template slot-scope="">
          <el-button type="text">归还</el-button>
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

    <ConsumOutFrom :visible="consumableFromVisible" @close="close" @success="success" />
    <ConsumScrap :visible="consumScrapVisible" @close="close" @success="success" />
  </div>
</template>

<script>
import { lowPriceArticleDetail, lowPriceArticleUutgoing } from '@/api/property'
import ConsumOutFrom from '@/components/Property/ConsumOutFrom'
import ConsumScrap from '@/components/Property/ConsumScrap'
import { CATEGORY } from '@/utils/const'
export default {
  name: 'Comsumdetail',
  components: {
    ConsumOutFrom,
    ConsumScrap
  },
  data() {
    return {
      CATEGORY,
      detail: {},
      consumableFromVisible: false,
      consumScrapVisible: false,
      seachValue: {
        pagenum: 1,
        pagesize: 10,
        category: '',
        keyword: ''
      },
      tableData: [],
      total: 0,
      departmentList: []
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.init()
    this.list()
  },
  methods: {
    async init() {
      const res = await lowPriceArticleDetail(this.id)
      if (res.ret === 0) {
        this.detail = res.data
      }
    },
    async list() {
      const res = await lowPriceArticleUutgoing(this.seachValue)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
      } else {
        this.tableData = []
        this.total = 0
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
      this.init()
    },
    handleClick() {},
    handleDel() {},
    seachFun() {
      this.init()
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style lang="scss" scoped>
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
    span {
      display: inline-block;
      width: 100px;
    }
  }
  .three {
   margin-bottom: 40px;
   .three-item {
     min-height: 100px;
     background: #f0f3f6;
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
