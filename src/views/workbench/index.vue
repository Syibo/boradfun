<template>
  <div class="container workbench-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="代办" name="first" />
      <el-tab-pane label="已完成" name="second" />
    </el-tabs>
    <div class="workbench-main">
      <div class="workbench-con">
        <div class="item">
          <div class="left">
            <el-button type="text">入职流程</el-button>
            <div class="status">待审核</div>
          </div>
          <div class="right">
            <span>创建人：shiwen</span>
            <span>创建时间：2020-09-08 20:20:20</span>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <el-button type="text">入职流程</el-button>
            <div class="status">待审核</div>
          </div>
          <div class="right">
            <span>创建人：shiwen</span>
            <span>创建时间：2020-09-08 20:20:20</span>
          </div>
        </div>
      </div>

      <div class="workbench-con">
        <div class="title">
          我申请的流程 (4）
        </div>
        <div class="item">
          <div class="left">
            <el-button type="text">入职流程</el-button>
            <div class="status">待审核</div>
          </div>
          <div class="right">
            <span>创建人：shiwen</span>
            <span>创建时间：2020-09-08 20:20:20</span>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <el-button type="text">入职流程</el-button>
            <div class="status">待审核</div>
          </div>
          <div class="right">
            <span>创建人：shiwen</span>
            <span>创建时间：2020-09-08 20:20:20</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="scss">
.workbench-container {
  .el-tabs__active-bar {
    background-color: black;
  }
  .el-tabs__item.is-active {
    font-weight:500;
    color: #2B2B2B;
    font-size:14px;
  }
  .el-tabs__item {
    color: #808387;
  }
}
</style>

<style lang="scss" scoped>
.workbench-container {
  .workbench-main {
    background-color: white;
    .workbench-con {
      background-color: #F7F8FA;
      padding: 12px;
      margin-bottom: 20px;
      .title {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        height: 30px;
        line-height: 30px;
        margin-bottom: 12px;
      }
      .item {
          display: flex;
          height: 55px;
          align-items: center;
          background-color: white;
          padding: 0 10px;
          border-bottom: 1px solid #D8D8D8;
          .left {
            flex: 1;
            display: flex;
            align-items: center;
            .status {
              width: 65px;
              height: 22px;
              background: rgba(147, 164, 173, 0.15);
              border-radius: 3px;
              text-align: center;
              line-height: 22px;
              color: #808387;
              font-size: 12px;
              margin-left: 65px;
            }
          }
          .right {
            color: #202D40;
            font-size: 14px;
            span {
              margin-right: 30px;
            }
            span:last-child {
              margin-right: 0;
            }
          }
      }
      .item:last-child {
        border: none;
      }
    }
  }
}
</style>
