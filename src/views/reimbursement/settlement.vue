<template>
  <div class="container">
    项目结算
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  name: 'Settlement',
  directives: { permission },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 50px;
  .top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>
