<template>
  <div class="container">
    <div>计数结果：{{count}}</div>
    <a href="/pages/test1/main" class="navlink">进入计数器页面</a>
  </div>
</template>

<script>
import globalStore from '../../stores/global-store'

export default {
  computed: {
    count () {
      return globalStore.state.count
    }
  }
}
</script>

<style scoped>
.navlink {
  text-decoration: underline;
}
</style>

