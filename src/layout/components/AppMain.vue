<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style>
.container {
  min-height: calc(100vh - 70px);
  background: white;
  padding: 10px;
  position: relative;
  padding-bottom: 20px;
}
.table-top {
  display: flex;
  margin-bottom: 10px;
}
.table-top .left {
  display: flex;
}
.table-top .right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.baradfun-top {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.broadfun_block {
  position: absolute;
  bottom: 10px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
}
.header-class {
  background-color: #F7F8FA;
}
.form-label-slot {
  display: inline-block;
}
.form-label-slot span {
  color: #999999;
  font-weight: 400;
}
.bule-hover {
  color: #1F8DFB;
  cursor: pointer;
}
.dialog-container .el-dialog__header {
    padding: 0;
  }
</style>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  padding: 10px;
  background-color: #f2f2f2;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 60px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.dialog-title {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #D8D8D8;
  .dialog-title-left {
    color: #333333;
  }
  .dialog-title-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
