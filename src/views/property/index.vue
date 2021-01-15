<template>
  <div class="container myproperty-container">
    <div class="left">
      <div class="top">设备</div>
      <div class="bot">易耗品</div>
    </div>
    <div class="right">已归还</div>
  </div>
</template>

<script>
import { employeeOutgoing } from '@/api/property'
export default {
  name: 'MyProperty',
  data() {
    return {}
  },
  mounted() {
    // this.init()
  },
  methods: {
    async init() {
      const res = await employeeOutgoing()
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.myproperty-container {
  // background-color:#F7F8FA;
  background-color: white;
  display: flex;
  .left {
    background-color:#F7F8FA;
    flex: 1;
    border-right: 10px solid white;
    .top {
      min-height: 200px;
      border-bottom: 10px solid white;;
      padding: 10px;
    }
    .bot {
      padding: 10px;
    }
  }
  .right {
    width: 400px;
    background-color:#F7F8FA;
    padding: 10px;
  }
}
</style>
