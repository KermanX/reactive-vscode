---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Reactive VSCode # '<span class="p1">Reactive</span> <span class="p2">VSCode</span>'
  text: "Extension API"
  tagline: |
    Develop <span class="i-vscode-icons:file-type-vscode text-2xl"></span> <span class="text-vscode">Extension</span> with <span class="i-vscode-icons:file-type-vue text-2xl"></span> <span class="text-reactive">Composition</span> API
  image: /logo.svg
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: Why?
      link: /guide/why
    - theme: alt
      text: Functions
      link: /functions
    - theme: alt
      text: Examples
      link: /examples/

features:
  - icon: 🚀
    title: Easy to use
    details: Familiar Vue Reactivity API
  - icon: 🦾
    title: Feature rich
    details: Most of the VSCode APIs included
  - icon: ⚡
    title: Fully tree shakeable
    details: Only take what you want
  - icon: <span class="i-logos-vueuse"></span>
    title: VueUse Integration
    details: A Collection of Vue composition utilities
    link: /guide/vueuse
---

<script setup>
import { withBase } from 'vitepress'
</script>

<div class="relative min-h-220">

::: code-group

<<< ./examples/editor-decoration/1.ts [<ReactiveVscode2 />]

<<< ./examples/editor-decoration/2.ts [Original VSCode API]

:::

<div class="absolute top-4 text-sm right-6 op-80 hidden sm:block">
<a :href="withBase('examples/index.html')" style="text-decoration: none">
<span class="i-carbon-launch mb-.5"></span> More examples
</a>
</div>

</div>
