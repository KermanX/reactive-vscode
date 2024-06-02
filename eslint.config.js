// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
  },
  {
    files: ['**/*.ts'],
    rules: {
      'node/no-exports-assign': 'off',
      'no-restricted-syntax': 'off',
    },
  },
)
