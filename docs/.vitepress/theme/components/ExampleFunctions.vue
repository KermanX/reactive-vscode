<script setup lang="ts">
import { metadata } from 'reactive-vscode-metadata'
import { renderMarkdown } from '../utils'

const props = defineProps<{ fns: string[] }>()

const m = props.fns.map(n => metadata.functions.find(m => m.name === n)!)
</script>

<template>
  <div pb-3>
    <h4 mb--3>
      Used functions
    </h4>
    <ul>
      <li v-for="fn in m" :key="fn.name">
        <api-link scope="reactive" :name="fn.name" />
        <span op70> - </span>
        <span v-html="renderMarkdown(fn.description)" />
      </li>
    </ul>
  </div>
</template>
