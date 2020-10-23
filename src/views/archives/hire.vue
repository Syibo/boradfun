<template>
  <div class="container">
    <p v-for="item in list" :key="item.ID">
      <el-button size="medium" type="text" @click="downFile(item.download_url)"> {{ item.name }} </el-button>
    </p>
    <br>
  </div>
</template>

<script>
import { getSslist } from '@/api/employee'
import { DOWNURL } from '@/utils/const'
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const res = await getSslist()
      if (res.ret === 0) {
        this.list = res.data
      } else {
        this.list = []
      }
    },
    downFile(url) {
      window.open(`${DOWNURL}${url}`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
