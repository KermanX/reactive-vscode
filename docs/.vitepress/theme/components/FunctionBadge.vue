<script setup lang="ts">
import { computed } from 'vue'
import type { FunctionMetadata } from 'reactive-vscode-metadata'
import { renderMarkdown } from '../utils'

const props = defineProps<{ fn: FunctionMetadata }>()

function styledName(name: string) {
  if (name.startsWith('use'))
    return `<span opacity="70">use</span>${name.slice(3)}`
  if (name.startsWith('try'))
    return `<span opacity="70">try</span>${name.slice(3)}`
  if (name.startsWith('on'))
    return `<span opacity="70">on</span>${name.slice(2)}`
  return name
}

const link = computed(() => {
  if (props.fn.external) {
    return {
      href: props.fn.external,
      target: '_blank',
    }
  }
  return {
    href: `${import.meta.env.BASE_URL}functions/${props.fn.name}`,
  }
})
</script>

<template>
  <div
    text="sm" flex="~ gap1" items-center
    :class="fn.deprecated ? 'op80 saturate-0' : ''"
  >
    <a
      v-bind="link"
      my-auto
      :class="fn.deprecated ? 'line-through !decoration-solid' : ''"
      style="text-decoration: none"
    >
      <code class="font-bold !text-reactive hover:bg-op-20 hover:bg-reactive" v-html="styledName(fn.name)" />
    </a>
    <i v-if="fn.external" i-carbon-launch class="opacity-50 text-0.7rem" />
    <span op50>-</span>
    <span class="whitespace-wrap" v-html="renderMarkdown(fn.description)" />
  </div>
</template>
