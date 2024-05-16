import DefaultTheme from 'vitepress/theme'
import './styles.css'
import Layout from './Layout.vue'
import 'virtual:uno.css'

export default {
  extends: DefaultTheme,
  Layout,
}
