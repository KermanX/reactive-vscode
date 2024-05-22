export interface FunctionMetadata {
  name: string
  category?: string
  original?: string
  lastUpdated?: number
  external?: string
  description?: string
  deprecated?: boolean
  internal?: boolean
}

export interface Metadata {
  categories: string[]
  functions: FunctionMetadata[]
}
