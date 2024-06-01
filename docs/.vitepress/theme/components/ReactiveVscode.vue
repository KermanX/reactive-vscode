<template>
  <span inline-block>
    <i i-reactive-vscode:logo mr-1 />
    <span>reactive-vscode</span>
  </span>
</template>

<style scoped>
span > span {
  color: transparent;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  background: linear-gradient( 90deg, var(--vp-c-reactive) 30%, var(--vp-c-vscode) 80%);
  -webkit-text-fill-color: transparent;
  font-weight: 500;
}
</style>
