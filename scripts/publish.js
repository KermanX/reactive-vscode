import { $, fs } from 'zx'

await fs.copyFile('README.md', 'packages/core/README.md')
await $`pnpm -r --filter "./packages/**" publish --access public --no-git-checks`
