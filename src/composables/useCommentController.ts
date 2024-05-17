import { comments } from 'vscode'
import { useDisposable } from './useDisposable'

export function useCommentController(id: string, label: string) {
  return useDisposable(comments.createCommentController(id, label))
}
