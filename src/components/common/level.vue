<template>
  <span>
    <span v-if="level === 'S'" class="brof_level s_col">S</span>
    <span v-else-if="level === 'A'" class="brof_level a_col">A</span>
    <span v-else class="brof_level b_col">B</span>
  </span>
</template>

<script>

export default {
  name: 'Level',
  props: {
    level: {
      type: String,
      default: 'S'
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
.brof_level {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  line-height: 16px;
  text-align: center;
  font-weight: normal;
  color: white;
  font-size: 12px;
  margin-left: 10px;
}
.s_col {
    background-color: #B3924A;
}
.a_col {
    background-color: #4B4B4B;
}
.b_col {
    background-color: #BCC0C3;
}
</style>
