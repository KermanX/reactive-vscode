import { defineConfigs } from 'reactive-vscode'

// Scoped config
export const { message } = defineConfigs('reactive-vscode-demo', {
  message: String,
})

// Top-level config
export const { 'editor.fontSize': fontSize } = defineConfigs(null, {
  'editor.fontSize': Number,
})
