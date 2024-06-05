import { pauseTracking, resetTracking } from '@vue/reactivity'

export function warn(msg: string, ...args: any[]) {
  // avoid props formatting or warn handler tracking deps that might be mutated
  // during patch, leading to infinite recursion.
  pauseTracking()

  const warnArgs = [`[Vue warn]: ${msg}`, ...args]
  /* istanbul ignore if */
  console.warn(...warnArgs)

  resetTracking()
}
