import { resolve } from 'node:path'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitepress'

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
      { text: 'Functions', link: '/functions' },
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
      Components({
        dirs: resolve(__dirname, 'theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: resolve(__dirname, 'components.d.ts'),
        transformer: 'vue3',
      }),
      UnoCSS({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            extraProperties: {
              'display': 'inline-block',
              'vertical-align': 'middle',
            },
          }),
        ],
        theme: {
          colors: {
            'primary': '#1F9CF0',
            'reactive': '#229863',
            'vscode': '#1F9CF0',
            'vscode-darker': '#007ACC',
          },
          fontFamily: {
            mono: 'var(--vp-font-family-mono)',
          },
        },
        shortcuts: {
          'border-main': 'border-$vp-c-divider',
          'bg-main': 'bg-gray-400',
          'bg-base': 'bg-white dark:bg-hex-1a1a1a',
        },
        transformers: [
          transformerDirectives(),
          transformerVariantGroup(),
        ],
      }),
    ],
  },
})
