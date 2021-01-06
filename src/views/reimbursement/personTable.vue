<template>
  <div class="person-table">
    <div class="top">
      40001
      <el-divider direction="vertical" />
    </div>
    <div class="mid">
      <div class="header">
        <span>员工姓名</span>
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
  border: 1px solid #ccc;
  margin-bottom: 20px;
  .top {
    height: 50px;
    display: flex;
    align-items: center;
    border-left: 5px solid blue;
    padding-left: 20px;
    border-bottom: 1px solid #ccc;
  }
  .mid {
    padding: 0 20px;
    .header {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      color: #ccc;
      font-size: 14px;
    }
    .col {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      color: #666;
      font-size: 14px;
    }
  }
}
</style>
