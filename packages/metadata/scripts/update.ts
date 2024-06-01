import fs from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import fg from 'fast-glob'
import Git from 'simple-git'
import type { FunctionMetadata, Metadata } from '../index.d.ts'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const JSON_OUT = resolve(__dirname, '../metadata.json')
const JS_OUT = resolve(__dirname, '../index.js')
const DIR_ROOT = resolve(__dirname, '../../..')
const DIR_SRC = resolve(DIR_ROOT, 'packages/core/src')
const DIR_COMPOSABLES = resolve(DIR_SRC, 'composables')
const DIR_UTILS = resolve(DIR_SRC, 'utils')

const git = Git(DIR_ROOT)

function getOriginalAPI(ts: string) {
  return ts.match(/^ \* @reactive `(\S+?)`/m)?.[1]
}

function getCategory(ts: string) {
  return ts.match(/^ \* @category (\S+)/m)?.[1]
}

function getDescription(ts: string) {
  const commentBlock = ts.slice(ts.lastIndexOf('\n/**\n') + 1)
  const s = commentBlock?.match(/^ \* (.+)$/m)?.[1].trim()
  return s?.startsWith('@') ? undefined : s
}

function toCategoryName(api: string) {
  return api.split('.')[0]
}

async function getComposableMetadata(filename: string): Promise<FunctionMetadata> {
  const tsPath = resolve(DIR_COMPOSABLES, filename)
  const name = basename(filename, '.ts')
  const ts = await fs.readFile(tsPath, 'utf-8')
  const mdPath = `${name}.md`
  const _md = existsSync(mdPath) ? await fs.readFile(mdPath, 'utf-8') : undefined // TODO: md
  const original = getOriginalAPI(ts)
  const category = getCategory(ts) ?? (original ? toCategoryName(original) : undefined)
  const description = getDescription(ts) ?? (original ? `Reactive API for \`vscode::${original}\`.` : undefined)
  return {
    name,
    category,
    original,
    lastUpdated: +await git.raw(['log', '-1', '--format=%at', tsPath]) * 1000,
    description,
    deprecated: ts.includes('@deprecated') || (description?.includes('DEPRECATED') ?? false),
    isComposable: true,
  }
}

async function getUtilMetadata(filename: string): Promise<FunctionMetadata> {
  const tsPath = resolve(DIR_UTILS, filename)
  const name = basename(filename, '.ts')
  const ts = await fs.readFile(tsPath, 'utf-8')
  const mdPath = `${name}.md`
  const _md = existsSync(mdPath) ? await fs.readFile(mdPath, 'utf-8') : undefined // TODO: md
  const category = getCategory(ts)
  const description = getDescription(ts)
  return {
    name,
    category,
    lastUpdated: +await git.raw(['log', '-1', '--format=%at', tsPath]) * 1000,
    description,
    deprecated: ts.includes('@deprecated') || (description?.includes('DEPRECATED') ?? false),
    isComposable: false,
  }
}

async function run() {
  const composables = await fg('*.ts', { cwd: DIR_COMPOSABLES, ignore: ['index.ts'] })
  const utils = await fg('*.ts', { cwd: DIR_UTILS, ignore: ['index.ts', 'types.ts'] })
  const functions = await Promise.all([
    ...composables.map(getComposableMetadata),
    ...utils.map(getUtilMetadata),
  ])
  const metadata: Metadata = {
    functions,
    categories: Array.from(new Set(functions.map(f => f.category!).filter(Boolean))).sort(),
  }
  await fs.writeFile(JSON_OUT, JSON.stringify(metadata, null, 2))
  await fs.writeFile(JS_OUT, `export const metadata = ${JSON.stringify(metadata, null, 2)}`)
  // eslint-disable-next-line no-console
  console.log('Metadata updated')
}

run()
