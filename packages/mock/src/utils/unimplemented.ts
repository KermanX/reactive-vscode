export function Unimplemented(msg: string): any {
  return Symbol(`Not implemented: ${msg}`)
}
