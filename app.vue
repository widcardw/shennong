<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
</script>

<template>
  <n-message-provider>
    <NuxtLayout>
      <MHeader />
      <NuxtPage/>
    </NuxtLayout>
  </n-message-provider>
</template>
