import process from 'node:process'

const userAgent = process.env.npm_config_user_agent ?? ''
export const packageManager = /pnpm/.test(userAgent)
  ? 'pnpm'
  : /yarn/.test(userAgent)
    ? 'yarn'
    : 'npm'

export const runCommand = packageManager === 'npm' ? 'npm run' : packageManager
