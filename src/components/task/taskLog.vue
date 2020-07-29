<template>
  <div class="task_right">
    <div class="task_label"> 基本信息 </div>
    <el-row class="task_info">
      <el-col v-if="saleUser" :span="24" class="task_info_item">
        <span class="task_info_label"> 销售 </span>
        <el-popover
          placement="top-end"
          trigger="hover"
        >
          <div>
            <div>企业微信：{{ saleUser.wx || '' }}</div>
            <div>电话号码：{{ saleUser.phone || '' }}</div>
            <div>邮箱：{{ saleUser.email || '' }}</div>
          </div>
          <span slot="reference" class="task_info_con"> {{ saleUser.name || '' }} </span>
        </el-popover>
      </el-col>
      <el-col :span="24" class="task_info_item">
        <span class="task_info_label"> 客户服务经理 </span>
        <el-popover
          placement="bottom-end"
          trigger="hover"
        >
          <div>
            <div>企业微信：{{ manage.wx }}</div>
            <div>电话号码：{{ manage.phone }}</div>
            <div>邮箱：{{ manage.email }}</div>
          </div>
          <span slot="reference" class="task_info_con"> {{ manage.name }} </span>
        </el-popover>
      </el-col>
    </el-row>
    <div class="task_label"> 变更记录 </div>

    <div v-for="item in log" :key="item.id" class="task_record">
      <span class="task_record_ra" />
      <div class="task_record_label"> {{ item.createTime }}  </div>
      <div class="task_record_con"> {{ item.title }} </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskLog',
  props: {
    log: {
      type: Array,
      default: () => []
    },
    manage: {
      type: Object,
      default: () => {}
    },
    saleUser: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.task_right {
    width: 390px;
    padding: 15px;
    border-left: 1px solid #D8D8D8;
    padding-left: 20px;
    .task_label {
        font-weight:500;
        color:rgba(43,43,43,1);
        margin-bottom: 10px;
    }
    .task_info {
        margin-bottom: 50px;
        .task_info_item {
            margin: 4px 0;
            .task_info_label {
                display: inline-block;
                font-size:14px;
                font-weight:400;
                color:rgba(133,146,166,1);
                width: 120px;
            }
            .task_info_con {
                font-size:14px;
                font-weight:400;
                color: #202D40;
            }
        }

    }
    .task_record {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        .task_record_ra {
            width:8px;
            height:8px;
            background:rgba(216,216,216,1);
            border-radius: 8px;
            margin-right: 5px;
        }
        .task_record_label {
            font-size:14px;
            color:rgba(188,192,195,1);
            line-height:20px;
            width: 150px;
        }
        .task_record_con {
            font-size:14px;
            color: #202D40;
        }
    }
}
</style>
