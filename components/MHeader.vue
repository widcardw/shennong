<script setup lang="ts">
import { NPageHeader } from 'naive-ui'
</script>

<template>
  <n-page-header
    style="padding: 20px"
  >
    <template #title>
      <NuxtLink class="lin" to="/">神农晓瞰</NuxtLink>
    </template>
    <template #avatar>
      <img src="/logo.png" style="height: 40px" />
    </template>
    <template #extra>
      <div class="space-x-4">
        <NuxtLink class="lin" to="/upload">上传药物</NuxtLink>
        <NuxtLink class="lin" to="/view-results">查看结果</NuxtLink>
      </div>
    </template>
  </n-page-header>
</template>

<style scoped>
.lin {
  text-decoration: none;
  color: black;
}
.lin:hover {
  color: #007fff;
}
.space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --space: 1rem;
  --tw-space-x-reverse: 0;
  margin-right: calc(var(--space) * var(--tw-space-x-reverse));
  margin-left: calc(var(--space) * calc(1 - var(--tw-space-x-reverse)));
}
</style>