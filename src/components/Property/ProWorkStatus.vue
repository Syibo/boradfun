<template>
  <div>
    <span v-if="status === 'Approval'"> 审核通过</span>
    <span v-else-if="status === 'Approved'">审核通过</span>
    <span v-else-if="status === 'Completed'">已完成</span>
    <span v-else-if="status === 'Processing'">待审核</span>
    <span v-else-if="status === 'NA'">待审核</span>
    <span v-else-if="status === 'Rejected'">已驳回</span>
    <span v-else-if="status === 'Unpaid'">待支付</span>
    <span v-else-if="status === 'Paid'">已支付</span>
    <span v-else class="brof_status" />
  </div>
</template>

<script>

export default {
  name: 'ProWorkStatus',
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

</style>
