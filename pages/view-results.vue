<script setup lang="ts">
import { NSpace, NCard, NImage, NModal, NSkeleton } from 'naive-ui';
import type { GLViewer } from '3dmol/build/types'
import { useMainStore } from '~/store'

const store = useMainStore()
const molRef = ref<HTMLDivElement>()
const loading = ref(false)

const response = await $fetch('/api/overview')
const proteins = ref<{name: string}[]>([])
if (response.code === 200) {
    proteins.value = response.data
}

const currentProtein = ref('')
const showModal = ref(false)
async function handleShowModal(name: string) {
  currentProtein.value = name
  showModal.value = true
  mount3DMol(currentProtein.value)
}

async function get3DMol(): Promise<any> {
  if (!store.threeDLoaded) {
    // @ts-expect-error no type definition
    store.$3dmol = await import('3dmol/build/3Dmol.js')
    store.loadedThree()
    console.log('load 3Dmol')
  }
  return store.$3dmol
}

async function mount3DMol(name: string) {
  // wait for modal to scale
  loading.value = true
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
      loading.value = false
    }, 500)
  })
  const $3Dmol = await get3DMol()
  const viewer: GLViewer = $3Dmol.createViewer(molRef.value)
  // get the suffix of the file, pdb/sdf/mol2
  const suffix = name.split('.').pop() as string
  // console.log(name)
  // console.log(suffix)
  // get the text content of pdb from static assets (can be found in public/)
  const content = await (await fetch('/plba-data' + name )).text()
  // add protein
  const m = viewer.addModel(content, suffix)
  m.setStyle({}, { cartoon: { color: 'spectrum' } })
  viewer.zoomTo()
  viewer.render()
}
</script>

<template>
  <div style="padding: 10px">
    <n-space vertical>
      <n-card 
        v-for="p in proteins" :key="p.name"
        :title="p.name.split('/')[1]"
        @click="handleShowModal(p.name)"
      >
        <n-image src="" />
      </n-card>
    </n-space>
  </div>
  <n-modal v-model:show="showModal">
    <n-card
      :title="currentProtein.split('/')[1]"
      style="width: 1200px; height: 80vh"
    >
      <n-skeleton v-if="loading" />
      <div ref="molRef" style="width: 100%; height: 100%; position: relative" />
    </n-card>
  </n-modal>
</template>
