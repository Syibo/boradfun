<template>
  <div class="person-table">
    <div class="top">
      40001
      <el-divider direction="vertical" class="line" />
      <div class="item">
        <span class="leb">员工数：</span>
        <span>4</span>
      </div>
      <div class="item">
        <span class="leb">员工数：</span>
        <span>4</span>
      </div>
      <div class="item">
        <span class="leb">员工数：</span>
        <span>4</span>
      </div>
    </div>
    <div class="mid">
      <div class="header">
        <p>员工姓名</p>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
        <span>20200701</span>
      </div>
      <div class="col">
        <span>员工1</span>
        <span>2</span>
        <span>33</span>
        <span>r3</span>
        <span>44</span>
        <span>5</span>
        <span>33</span>
        <span>98</span>
      </div>
      <div class="col">
        <span>员工1</span>
        <span>2</span>
        <span>33</span>
        <span>r3</span>
        <span>44</span>
        <span>5</span>
        <span>33</span>
        <span>98</span>
      </div>
      <div class="col">
        <span>员工1</span>
        <span>2</span>
        <span>33</span>
        <span>r3</span>
        <span>44</span>
        <span>5</span>
        <span>33</span>
        <span>98</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonTable',
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.person-table {
  background-color: white;
  min-height: 200px;
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
    padding: 0 20px;
    padding-bottom: 20px;
    overflow-x: auto;
    .header {
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #dee4e7;
      color: #bcc0c3;
      font-size: 14px;
      p {
        width: 200px;
      }
      span {
        display: inline-block;
        width: 200px;
        margin: 0 10px;
      }
    }
    .col {
      height: 43px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #dee4e7;
      color: #2b2b2b;
      font-size: 14px;
    }
  }
}
</style>
