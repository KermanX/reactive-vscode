import { $, fs } from 'zx'

await fs.copyFile('README.md', 'packages/core/README.md')
await $`pnpm -C packages/core exec npm publish --access public --no-git-checks`
await $`pnpm -C packages/metadata exec npm publish --access public --no-git-checks`
await $`pnpm -C packages/creator exec npm publish --access public --no-git-checks`
