<template>
  <div class="container consumable-container">
    <el-row class="table-top">
      <div class="left">
        <el-select v-model="seachValue.category" placeholder="类别" style="width: 150px" clearable>
          <el-option v-for="item in CATEGORY" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="seachValue.keyword" style="width: 150px;margin: 0 10px" placeholder="搜索" clearable />
        <el-button type="primary" @click="seachFun">搜索</el-button>
      </div>
      <div class="right">
        <el-button type="primary" @click="openFrom">易耗品入库</el-button>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
      <el-table-column prop="emp_no" align="center" label="序号">
        <template slot-scope="scope">
          <span class="bule-hover" @click="goDetail(scope.row.ID)">{{ scope.row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="low_price_article_category" align="center" label="类别" />
      <el-table-column prop="low_price_article_name" align="center" label="资产名称" />
      <el-table-column prop="brand" align="center" label="品牌" />
      <el-table-column prop="total_quantity" align="center" label="入库数量" />
      <el-table-column prop="ingoing_time" align="center" label="入库时间" />
      <el-table-column prop="create_time" align="center" label="操作人" />
      <el-table-column prop="outgoing_quantity" align="center" label="已借出" />
      <el-table-column prop="create_time" align="center" label="剩余可用" />
      <el-table-column prop="create_time" align="center" label="是否需要归还">
        <template slot-scope="scope">
          {{ scope.row.need_return === 0 ? '否' : '是' }}
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

    <ConsumableFrom :visible="consumableFromVisible" @close="close" @success="success" />
  </div>
</template>

<script>
import { getLowPriceArticle } from '@/api/property'
import ConsumableFrom from '@/components/Property/ConsumableFrom'
import { CATEGORY } from '@/utils/const'
export default {
  name: 'Consumable',
  components: {
    ConsumableFrom
  },
  data() {
    return {
      CATEGORY,
      consumableFromVisible: false,
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
    this.init()
  },
  methods: {
    async init() {
      const res = await getLowPriceArticle(this.seachValue)
      if (res.ret === 0) {
        this.tableData = res.data.list
        this.total = res.data.total
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    goDetail(id) {
      this.$router.push({
        path: '/property/comsumdetail',
        query: {
          id
        }
      })
    },
    openFrom() {
      this.consumableFromVisible = true
    },
    close() {
      this.consumableFromVisible = false
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
.consumable-container {
  background-color: white;
}
</style>
