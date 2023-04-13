<script setup lang="ts">
import { NUpload, NUploadDragger, NIcon, NText, NButton, UploadInst, useMessage } from 'naive-ui'
import { Archive as ArchiveIcon } from '@vicons/ionicons5'
import { ref } from 'vue'
import { FileInfo } from 'naive-ui/es/upload/src/interface';
import { useUploadedFileStore } from '~/store';

const uploadRef = ref<UploadInst>()
const f = ref<FileInfo>()
const msgHandler = useMessage()

const uploadedStore = useUploadedFileStore()

async function handleUpload() {
  if (!f.value) return
  if (!f.value.file) return
  const response = await $fetch('/api/hello', { 
    method: 'post',
    body: {
      file: f.value.file,
      name: f.value.name,
    }
  })
  if (response.code === 200) {
    msgHandler.success('上传成功')
    uploadRef.value?.clear()
    uploadedStore.addUploadedFile(response.name, response.time)
  }
}

function handleChange({ fileList }: { fileList: FileInfo[] }) {
  console.log('file changed', fileList)
  f.value = fileList[0]
}
</script>

<template>
  <div style="padding: 10px">
    <n-upload 
      ref="uploadRef" 
      multiple 
      directory-dnd 
      :default-upload="false" 
      @change="handleChange"
    >
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <n-icon size="48" :depth="3">
            <archive-icon />
          </n-icon>
        </div>
        <n-text style="font-size: 16px">
          点击或者拖动文件到该区域来上传
        </n-text>
      </n-upload-dragger>
    </n-upload>
    <n-button style="width: 100%" @click="handleUpload">上传</n-button>
  </div>
</template>
