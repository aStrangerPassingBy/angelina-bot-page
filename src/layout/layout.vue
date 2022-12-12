<script setup lang="ts">

</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
  
</style>