<template>
  <div class="task_right">
    <el-timeline>
      <el-timeline-item v-for="(item, index) in log" :key="item.id" :timestamp="item.createTime" placement="top">
        <el-card :class="act === index ? 'act' : 'p'" @click.native="change(item, index)">
          <p>{{ item.title }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: 'TaskHistory',
  props: {
    log: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      act: 0
    }
  },
  mounted() {

  },
  methods: {
    change(item, index) {
      this.act = index
      this.$emit('history', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.task_right {
    width: 390px;
    padding: 15px;
    border-left: 1px solid #D8D8D8;
    padding-left: 20px;
    .p {
      cursor: pointer;
    }
    .act {
      border: 1px solid #aac0db;
      background-color: #e1edf9;
      cursor: pointer;
    }
}
</style>
