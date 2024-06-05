// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'packages/core/src/reactivity/**/*.ts',
    ],
  },
  {
    files: ['**/*.ts'],
    rules: {
      'node/no-exports-assign': 'off',
      'no-restricted-syntax': 'off',
    },
  },
)
