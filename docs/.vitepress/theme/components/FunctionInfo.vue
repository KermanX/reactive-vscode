<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { computed } from 'vue'
import { metadata } from '@reactive-vscode/metadata'
import { withBase } from 'vitepress'

const props = defineProps<{ name: string }>()
const info = computed(() => metadata.functions.find(i => i.name === props.name)!)
const lastUpdated = useTimeAgo(new Date(info.value?.lastUpdated || 0))
const link = computed(() => withBase(`/functions\#category=${encodeURIComponent(info.value!.category!)}`))
</script>

<template>
  <div class="grid grid-cols-[100px_auto] gap-2 text-sm mt-4 mb-8 items-start">
    <div opacity="50">
      Category
    </div>
    <div><a :href="link">{{ info.category }}</a></div>
    <template v-if="info.lastUpdated">
      <div opacity="50">
        Last Changed
      </div>
      <div>{{ lastUpdated }}</div>
    </template>
    <template v-if="info.original">
      <div opacity="50">
        Original API
      </div>
      <div>
        <span class="i-vscode-icons:file-type-vscode mb-.5 mr-1" />
        <a :href="`https://code.visualstudio.com/api/references/vscode-api#${props.name}`" target="_blank">
          {{ info.original }}
        </a>
      </div>
    </template>
  </div>
</template>
