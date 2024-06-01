import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

fs.copyFileSync(path.resolve(__dirname, '../README.md'), path.resolve(__dirname, '../packages/core/README.md'))
