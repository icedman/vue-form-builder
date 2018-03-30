<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    window.$app = this
  }
}
</script>

<style>
.padded {
    padding: 12px;
}
</style>