<template>
  <span>
    <span v-if="status === 'create'" class="brof_status create_col">对接待确认</span>
    <span v-else-if="status === 'cancel'" class="brof_status create_col">已取消</span>
    <span v-else-if="status === 'confirm'" class="brof_status confirm_col">需求对接中</span>
    <span v-else-if="status === 'frozen'" class="brof_status frozen_col">待分配</span>
    <span v-else-if="status === 'assign'" class="brof_status create_col">待执行</span>
    <span v-else-if="status === 'execute'" class="brof_status frozen_col">执行中</span>
    <span v-else-if="status === 'pause'" class="brof_status stop_col">已暂停</span>
    <span v-else-if="status === 'finish'" class="brof_status create_col">待审核</span>
    <span v-else-if="status === 'end'" class="brof_status confirm_col">已结单</span>
    <span v-else class="brof_status create_col" />
  </span>
</template>

<script>

export default {
  name: 'Status',
  props: {
    status: {
      type: String,
      default: 'create'
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
.brof_status {
  display: inline-block;
  width: 80px;
  height: 22px;
  border-radius: 2px;
  line-height: 22px;
  text-align: center;
  font-weight: normal;
  font-size: 12px;
}
.create_col {
    border: 1px solid #BCC0C3;
    color: #808387;
}
.confirm_col {
    border: 1px solid #4DA89F;
    color: #4DA89F;
}
.stop_col {
    border: 1px solid #FF5C5C;
    color: #FF5C5C;
}
.b_col {
    background-color: #BCC0C3;
}
.frozen_col {
    border: 1px solid #FFC069;
    color: #FFC069;
}
</style>
