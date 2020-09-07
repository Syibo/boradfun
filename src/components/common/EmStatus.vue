<template>
  <span>
    <span v-if="status === 0" class="brof_status create_col">未入职</span>
    <span v-else-if="status === 1" class="brof_status confirm_col">拟入职</span>
    <span v-else-if="status === 2" class="brof_status frozen_col">已入职</span>
    <span v-else-if="status === 3" class="brof_status stop_col">申请离职</span>
    <span v-else-if="status === 4" class="brof_status b_col">已离职</span>
    <span v-else class="brof_status create_col" />
  </span>
</template>

<script>

export default {
  name: 'EmStatus',
  props: {
    status: {
      type: Number,
      default: 0
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
