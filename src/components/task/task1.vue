<template>
  <div class="broadfun_task">
    <div class="task_left">
      <div class="task_name">
        <div class="task_name_left"> 超级厉害娱乐信息公司 </div>
        <div class="task_name_btn">
          <el-button type="primary"> 取消任务 </el-button>
        </div>
      </div>

      <div class="task_type">
        <el-button>对接待确认</el-button>
      </div>

      <div class="task_label"> 基本信息 </div>

      <el-row class="task_info">
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 应用/游戏名称 </span>
          <span class="task_info_con"> 王者荣耀 </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 期望测试日期 </span>
          <span class="task_info_con"> 2020-02-03 </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务类型 </span>
          <span class="task_info_con"> 深度兼容-Android 300 </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 期望结单日期 </span>
          <span class="task_info_con"> 2020-02-03 </span>
        </el-col>
        <el-col :span="12" class="task_info_item">
          <span class="task_info_label"> 任务额度 </span>
          <span class="task_info_con"> 3 </span>
        </el-col>
      </el-row>

      <div class="task_label"> 需求信息 </div>

      <div class="task_demand">
        <i class="el-icon-circle-plus-outline" /> 填写需求
      </div>

    </div>
    <div class="task_right">
      <div class="task_label"> 基本信息 </div>
      <el-row class="task_info">
        <el-col :span="24" class="task_info_item">
          <span class="task_info_label"> 应用/游戏名称 </span>
          <span class="task_info_con"> 王者荣耀 </span>
        </el-col>
        <el-col :span="24" class="task_info_item">
          <span class="task_info_label"> 期望测试日期 </span>
          <span class="task_info_con"> 2020-02-03 </span>
        </el-col>
      </el-row>
      <div class="task_label"> 变更记录 </div>

      <div class="task_record">
        <span class="task_record_ra" />
        <div class="task_record_label">2020-06-25 20:20:20  </div>
        <div class="task_record_con">先旭创建任务</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task1'
}
</script>

<style lang="scss">
.broadfun_task {
    display: flex;
    min-height: calc(100vh - 100px);
    .task_left {
        flex: 1;
        padding: 15px;
        .task_name {
            display: flex;
            .task_name_left {
                flex: 1;
                font-size:22px;
                font-weight:500;
                color:rgba(32,45,64,1);
            }
        }
        .task_type {
            margin: 5px 0 25px 0;
        }
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
        .task_demand {
            height:42px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px dashed #E4E9EE;
            color: #BCC0C3;
            font-size: 14px;
            i {
                margin-right: 5px;
            }
        }
    }
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
                width: 140px;
            }
            .task_record_com {
                font-size:14px;
                font-weight:400;
                color: #202D40;
            }
        }
    }
}
</style>
