<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'info',
  },
  text: {
    type: String,
    default: 'Non-Proprietary',
  },
  tooltip: {
    type: String,
    default: 'This applys to any VSCode extension, not only those using reactive-vscode',
  },
})
</script>

<template>
  <span v-tooltip="tooltip">
    <Badge :type :text />
  </span>
</template>
