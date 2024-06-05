<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  scope: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
})

const iconClass = computed(() => ({
  vscode: 'i-vscode-icons:file-type-vscode',
  vue: 'i-vscode-icons:file-type-vue',
  reactive: 'i-reactive-vscode:logo',
  npm: 'i-carbon:logo-npm color-$vp-c-npm',
}[props.scope]))

const linkUrl = computed(() => props.link ?? ({
  vscode: `https://code.visualstudio.com/api/references/vscode-api#${props.name}`,
  vue: null,
  reactive: `${import.meta.env.BASE_URL}functions/${props.name}`,
  npm: `https://www.npmjs.com/package/${props.name}`,
}[props.scope]))

const linkColor = computed(() => ({
  color: `var(--vp-c-${props.scope}) !important`,
}))
</script>

<template>
  <span class="api-link">
    <span :class="iconClass" class="mb-.5" />
    <a v-if="linkUrl" :href="linkUrl" :style="linkColor" target="_blank">
      {{ name }}
    </a>
    <span v-else :style="linkColor">
      {{ name }}
    </span>
  </span>
</template>

<style scoped>
.api-link {
  border-radius: 4px;
  background-color: var(--vp-code-bg);
  transition: color 0.25s, background-color 0.5s;
  font-size: var(--vp-code-font-size);
  color: var(--vp-code-color);
  font-family: var(--vp-font-family-mono);
  white-space: nowrap;
}

.api-link :nth-child(2) {
  font-size: 1.05em;
  padding-left: 4px;
}

.api-link a {
  text-decoration: underline;
  text-decoration-thickness: 0.5px;
}

.api-link:hover a {
  text-decoration-thickness: 1px;
}
</style>
