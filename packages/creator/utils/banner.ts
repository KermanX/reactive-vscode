import chalk from 'chalk'

function getColoredText(text: string, startColor: number[], endColor: number[]) {
  function getColor(index: number) {
    const percent = index / text.length
    const color = startColor.map((start, i) => {
      const end = endColor[i]
      const value = Math.round(start + (end - start) * percent)
      return value
    })
    return color as [number, number, number]
  }

  return text
    .split('')
    .map((char, index) => {
      const color = getColor(index)
      return chalk.rgb(...color)(char)
    })
    .join('')
}

const color1 = [34, 152, 99]
const color2 = [31, 156, 240]

export const banner = [
  getColoredText(`Reactive VSCode`, color1, color2),
  chalk.gray('-'),
  getColoredText(`Develop VSCode Extension with Vue Composition API`, color2, color1),
].join(' ')
