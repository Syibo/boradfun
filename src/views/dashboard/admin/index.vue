<template>
  <div class="dashboard-editor-container">
    <div class="dashboard1">
      home
    </div>
    <div class="dashboard1">
      home
    </div>
    <div class="dashboard1">
      home
    </div>
    <div class="dashboard1">
      home
    </div>
    <div class="dashboard1">
      home
    </div>
  </div>
</template>

<script>

export default {
  name: 'DashboardAdmin',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {

  .dashboard1 {
    height: 300px;
  }

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
