import { defineStore } from 'pinia'
export const useMainStore = defineStore('main', {
  state: () => ({
    threeDLoaded: false,
    $3dmol: null,
  }),
  actions: {
    loadedThree() {
      // `this` is the store instance
      this.threeDLoaded = true
    },
  },
})

interface UploadedFileType {
    name: string
    time: number
}

export const useUploadedFileStore = defineStore('upload', {
    state: () => ({ list: [] as UploadedFileType[] }),
    actions: {
        addUploadedFile(name: string, time: number) {
            this.list.push({ name, time })
        }
    },
    persist: true
})