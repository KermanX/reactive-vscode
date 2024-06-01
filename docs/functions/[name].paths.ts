import { metadata } from 'reactive-vscode-metadata'
import { renderMarkdown } from '../.vitepress/theme/utils'

export default {
  paths() {
    return metadata.functions.map(fn => ({
      content: renderMarkdown(fn.description),
      params: {
        name: fn.name,
      },
    }))
  },
}
