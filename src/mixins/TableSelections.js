export const TableSelections = {
  data() {
    return {
      pageSelection: [],
      selectIds: []
    }
  },
  methods: {
    selection(rows, key) {
      /**
       * 修改时间20200519 shenyibo
       * const ids = rows.map((item) => Number(item[key]));
       * 去除Number 导致不为数字的筛选为Nan
      */
      const ids = rows.map((item) => (item[key]))
      let pageSelection = this.pageSelection
      let selectIds = this.selectIds
      let repeats = []

      // 在当前页 新增
      if (pageSelection.length === 0 || pageSelection.length <= rows.length) {
        pageSelection = ids
      }

      // 在当前页面 去除 repeats 是要从总数组删除的元素集合
      if (pageSelection.length > ids.length && ids.length !== 0) {
        pageSelection.forEach((item) => {
          const idsIndex = ids.indexOf(item)
          if (idsIndex === -1) {
            repeats.push(item)
          }
        })
        pageSelection = ids
      }

      if (ids.length === 0) {
        repeats = pageSelection.map((item) => item)
        pageSelection = []
      }
      selectIds = Array.from(new Set([...pageSelection, ...selectIds]))

      // 用一个新的数组 存放最后的集合
      const newResult = []
      selectIds.forEach((item, index) => {
        if (!repeats.includes(item)) {
          newResult.push(item)
        }
      })
      this.pageSelection = pageSelection
      this.selectIds = newResult
    }
  }
}
