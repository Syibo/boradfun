<template>
  <div class="person-table">
    <div class="top">
      {{ data.engagement_code }}
      <el-divider direction="vertical" class="line" />
      <div class="item">
        <span class="leb">员工数：</span>
        <span>{{ data.employee_nums }}</span>
      </div>
      <div class="item">
        <span class="leb">总耗时：</span>
        <span>{{ data.hour_summary }}</span>
      </div>
      <div class="item">
        <span class="leb">任务成本：</span>
        <span>{{ data.cost_summary }}</span>
      </div>
    </div>
    <div class="mid">
      <el-table :data="diaData" style="width: 100%" :header-cell-style="{background:'#F7F8FA'}">
        <el-table-column prop="engagement_code" align="center" label="项目编号" />
        <el-table-column prop="employee_name" align="center" label="员工" />
        <el-table-column v-for="item in headerValue" :key="item" :prop="`date_field.${item}`" align="center" :label="item" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonTable',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    headerValue() {
      return Object.keys(this.data.engagement_list[0].date_field)
    },
    diaData() {
      return this.data.engagement_list
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.person-table {
  background-color: white;
  box-shadow: 0px 2px 0px 0px rgba(222, 228, 231, 0.3);
	border-radius: 2px;
	border: solid 1px #dee4e7;
  margin-bottom: 20px;
  overflow: hidden;
  .top {
    height: 54px;
    display: flex;
    align-items: center;
    border-left: 6px solid #3293ff;
    padding-left: 20px;
    border-bottom: 1px solid #dee4e7;
    color: #2b2b2b;
    .line {
      margin: 0 40px;
    }
    .item {
      font-size: 14px;
      color: #2b2b2b;
      margin-right: 40px;
      .leb {
        color: #808387;
        display: inline-block;
      }
    }
  }
  .mid {
    padding-bottom: 20px;
  }
}
</style>
