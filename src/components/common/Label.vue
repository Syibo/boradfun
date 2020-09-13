<template>
  <span class="broad-label">
    <span class="left"><span /> {{ title }}</span>
    <slot name="right" />
  </span>
</template>

<script>

export default {
  name: 'Label',
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
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width:3px;
      height:15px;
      background:rgba(50,147,255,1);
      margin-right: 5px;
    }
  }
}
</style>
