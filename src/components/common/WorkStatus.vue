<template>
  <div>
    <span v-if="status === 'Approval'" class="brof_status confirm_col">审核通过</span>
    <span v-else-if="status === 'Approved'" class="brof_status confirm_col">审核通过</span>
    <span v-else-if="status === 'Completed'" class="brof_status confirm_col">已完成</span>
    <span v-else-if="status === 'Processing'" class="brof_status">待审核</span>
    <span v-else-if="status === 'NA'" class="brof_status">待审核</span>
    <span v-else-if="status === 'Rejected'" class="brof_status stop_col">已驳回</span>
    <span v-else-if="status === 'Unpaid'" class="brof_status">待支付</span>
    <span v-else-if="status === 'Paid'" class="brof_status confirm_col">已支付</span>

    <span v-else-if="status === 'Revoked'" class="brof_status confirm_col"> 已撤销</span>
    <span v-else-if="status === 'Received'" class="brof_status confirm_col"> 已领用</span>
    <span v-else-if="status === 'Return'" class="brof_status confirm_col"> 已归还</span>
    <span v-else-if="status === 'UnReceived'" class="brof_status confirm_col"> 待领用</span>
    <span v-else-if="status === 'Distributed'" class="brof_status confirm_col"> 已分配</span>
    <span v-else class="brof_status" />
  </div>
</template>

<script>

export default {
  name: 'WorkStatus',
  props: {
    status: {
      type: String,
      default: ''
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
    width: 65px;
    height: 22px;
    background: rgba(147, 164, 173, 0.15);
    border-radius: 3px;
    text-align: center;
    line-height: 22px;
    font-size: 12px;
    margin-left: 65px;
    color: #808387;
}
.brof_status:hover {
    cursor: pointer;
}
.create_col {
    border: 1px solid #BCC0C3;
    color: #808387;
}
.confirm_col {
    background: rgba(77, 168, 159, 0.15);
    color: #4DA89F;
}
.stop_col {
    background: rgba(255, 92, 92, 0.15);
    color: #EF5E54;
}
</style>
