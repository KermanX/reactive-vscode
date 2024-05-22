import fs from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import fg from 'fast-glob'
import Git from 'simple-git'
import type { FunctionMetadata, Metadata } from '../src'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const METADATA_OUT = resolve(__dirname, '../metadata.json')
const DIR_ROOT = resolve(__dirname, '../../..')
const DIR_SRC = resolve(DIR_ROOT, 'packages/reactive-vscode/src')
const DIR_COMPOSABLES = resolve(DIR_SRC, 'composables')
const DIR_UTILS = resolve(DIR_SRC, 'utils')

const git = Git(DIR_ROOT)

function getOriginalAPI(ts: string) {
  return ts.match(/^ \* @reactive `(\S+?)`/m)?.[1]
}

function getCategory(ts: string) {
  return ts.match(/^ \* @category (\S+?)/m)?.[1]
}

function getDescription(ts: string) {
  const s = ts.match(/^ \* (.+)$/m)?.[1].trim()
  return s?.startsWith('@') ? undefined : s
}

async function getComposableMetadata(filename: string): Promise<FunctionMetadata> {
  const tsPath = resolve(DIR_COMPOSABLES, filename)
  const name = basename(filename, '.ts')
  const ts = await fs.readFile(tsPath, 'utf-8')
  const mdPath = `${name}.md`
  const _md = existsSync(mdPath) ? await fs.readFile(mdPath, 'utf-8') : undefined // TODO: md
  const original = getOriginalAPI(ts)
  const category = original ? original.split('.')[0] : getCategory(ts)
  const description = getDescription(ts) ?? (original ? `Reactive API for {{${original}}}.` : undefined)
  return {
    name,
    category,
    original,
    lastUpdated: +await git.raw(['log', '-1', '--format=%at', tsPath]) * 1000,
    description,
    deprecated: ts.includes('@deprecated') || (description?.includes('DEPRECATED') ?? false),
  }
}

async function run() {
  const composables = await fg('*.ts', { cwd: DIR_COMPOSABLES })
  const _utils = await fg('*.ts', { cwd: DIR_UTILS }) // TODO: utils
  const functions = await Promise.all([
    ...composables.map(getComposableMetadata),
    // ...utils.map(getUtilMetadata),
  ])
  const metadata: Metadata = {
    functions,
    categories: Array.from(new Set(functions.map(f => f.category!).filter(Boolean))),
  }
  await fs.writeFile(METADATA_OUT, JSON.stringify(metadata, null, 2))
  // eslint-disable-next-line no-console
  console.log('Metadata updated')
}

run()
