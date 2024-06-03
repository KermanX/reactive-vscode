<template>
  <div class="example-container">
    <slot />
  </div>
</template>

<style>
.example-container {
  @apply flex flex-col w-full gap-2;
}

.example-container > .language-ts {
  @apply flex-grow !mt-0;
}

.example-container > .language-ts::before  {
  @apply block text-sm font-semibold text-gray-500 ml-2 mt-1 mb--3 text-md;
}

.example-container > .language-ts:first-child::before {
  content: 'Original VSCode API';
}

.example-container > .language-ts:nth-child(2)::before {
  content: 'With reactive-vscode';
}

.content-container:has(.example-container) {
  max-width: 80vw !important;
}

.aside:has(+ .content .example-container) {
  display: none !important;
}
</style>
