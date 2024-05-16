import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Reactive VSCode',
  description: 'Develop VSCode extension with Vue 3 Composition API',
  base: '/reactive-vscode/',
  lang: 'en-US',
  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Examples', link: '/examples/' },
    ],

    sidebar: {
      '/guide': [
        {
          text: 'Guide',
          items: [
            { text: 'Why reactive-vscode', link: '/guide/why' },
            { text: 'Getting Started', link: '/guide/' },
            { text: 'Extension Entry File', link: '/guide/entry' },
          ],
        },
        {
          items: [
            { text: 'Examples', link: '/examples/' },
          ],
        },
      ],
      '/examples': [
        {
          text: 'Examples',
          items: [
            { text: 'Index', link: '/examples/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/KermanX/reactive-vscode' },
    ],
  },
  head: [['link', { rel: 'icon', href: '/reactive-vscode/favicon.ico' }]],

  vite: {
    plugins: [
      UnoCSS({
        presets: [
          presetUno(),
          presetIcons({
            extraProperties: {
              'display': 'inline-block',
              'vertical-align': 'middle',
            },
          }),
        ],
        shortcuts: {
          'text-reactive': 'color-$vp-c-reactive',
          'text-vscode': 'color-$vp-c-vscode',
        },
      }),
    ],
  },
})
