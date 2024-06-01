export function renderMarkdown(markdownText = '') {
  const htmlText = markdownText
    .replace(/`vscode::(\S+?)`/g, '<a class="api-link scope-vscode" target="_blank" href=\'https://code.visualstudio.com/api/references/vscode-api#$1\'>$1</a>')
    // eslint-disable-next-line node/prefer-global/process
    .replace(/`reactive::(\S+?)`/g, `<a class="api-link scope-reactive" target="_blank" href='${globalThis.process ? globalThis.process.env.BASE_URL : import.meta.env.BASE_URL}core/$1'>$1</a>`)
    .replace(/`vue::(\S+?)\((\S+?)\)`/g, `<a class="api-link scope-vue" target="_blank" href='$2'>$1</a>`)
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt=\'$1\' src=\'$2\' />')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href=\'$2\'>$1</a>')
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    .replace(/\n$/gim, '<br />')

  return htmlText.trim()
}

export function renderCommitMessage(msg: string) {
  return renderMarkdown(msg)
    .replace(/\#([0-9]+)/g, '<a href=\'https://github.com/vueuse/vueuse/issues/$1\'>#$1</a>')
}
