<template>
  <div class="container">
    人员管理
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
export default {
  name: 'Personnel',
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
