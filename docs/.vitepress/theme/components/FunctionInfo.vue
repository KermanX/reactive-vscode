<script setup lang="ts">
import { metadata } from '@reactive-vscode/metadata'
import { useTimeAgo } from '@vueuse/core'
import { withBase } from 'vitepress'
import { computed } from 'vue'

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
        <a class="api-link scope-vscode ml--1" :href="`https://code.visualstudio.com/api/references/vscode-api#${info.original}`" target="_blank">
          {{ info.original }}
        </a>
      </div>
    </template>
  </div>
</template>
