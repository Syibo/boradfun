<template>
  <span class="broad-label">
    <span /> {{ title }}
  </span>
</template>

<script>

export default {
  name: 'Status',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.broad-label {
    display: flex;
    align-items: center;
    color: #333333;
    font-weight:500;
    margin: 5px 0;
    font-size: 16px;
    span {
        display: inline-block;
        width:3px;
        height:15px;
        background:rgba(50,147,255,1);
        margin-right: 5px;
    }
}
</style>
