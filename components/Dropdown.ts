import * as m from 'mithril'

interface Attrs {
  visible: boolean,
  options: Array<string>,
  filter: string
}

function includesNoCase(filter: string = ''): (str: string) => boolean {
  return function (str) {
    return str.toLowerCase().includes(filter.trim().toLowerCase())
  }
}

function matchIndex(filter: string, str: string): [number, number] {
  const startIndex = str.toLowerCase().indexOf(filter.trim().toLowerCase())
  const endIndex = startIndex + ((startIndex < 0) ? 0 : filter.trim().length)
  return [startIndex, endIndex]
}

function displayOption(filter: string): (str: string) => m.Lifecycle<{}, {}> {
  return function (str) {
    const [startIndex, endIndex] = matchIndex(filter, str)
    return m('div', [
      str.substring(0, startIndex),
      m('span', {
        style: {
          'font-weight': 600,
          'background-color': 'yellow'
        }
      }, str.substring(startIndex, endIndex)),
      str.substring(endIndex)
    ])
  }
}

export default {
  view (vnode: m.Vnode<Attrs>) {
    if (!vnode.attrs.visible) { return }
    return vnode.attrs.options
      .filter(includesNoCase(vnode.attrs.filter))
      .map(displayOption(vnode.attrs.filter))
  }
} as m.Component<Attrs>